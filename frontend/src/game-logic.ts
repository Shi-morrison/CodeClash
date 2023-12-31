import m from "mithril";
import { Socket, io } from "socket.io-client";
import * as monaco from 'monaco-editor';
import axios from "axios";
import { fetchUserData } from "./user-data";

export enum Verdict {
	Accepted,
	WrongAnswer,
	RuntimeError,
	TimeLimitExceeded,
	MemoryLimitExceeded,
}

export interface ProblemData {

	/** The human-readable title of the problem */
	title: string;

	/** The difficulty of the problem */
	difficulty: "Easy" | "Medium" | "Hard";

	/** Describes the function signature for the user's submission */
	signature: {
		/** The name of the function */
		name: string,

		/** Stores the names for each parameter */
		params: string[],
	};

	/** The problem statement, in HTML format */
	problemStatement: string;

	examples: { [x: string]: string }[];

}

let editor: monaco.editor.IStandaloneCodeEditor | undefined;
export function exposeEditor(value: monaco.editor.IStandaloneCodeEditor) {
	editor = value;
}

export class GameConnection {

	static instance?: GameConnection;

	waiting: boolean = true;
	newRating: number | undefined;
	didIWin: boolean | undefined;
	socket: Socket;
	oppCode: string = "";
	problem: ProblemData | undefined;

	constructor(token: string) {
		this.socket = io();
		this.socket.on("start-game", (problem: ProblemData) => {
			this.waiting = false;
			this.problem = problem;
			editor?.setValue(`function ${problem.signature.name}(${
				problem.signature.params.join(", ")
			}) {\n    // Type your code here\n    \n}\n`);
			m.route.set("/gameinstance");
			m.redraw();
		});
		this.socket.on("game-over", ({ didIWin, newRating }: { didIWin: boolean, newRating: number }) => {
			fetchUserData();
			this.didIWin = didIWin;
			this.newRating = newRating;
			m.redraw();
		});
		this.socket.on("opp-update", (code: string) => {
			this.oppCode = code;
			m.redraw();
		});
		this.socket.on("verdict", (verdict: Verdict) => {
			let verdictMsg = "?";
			switch (verdict) {
				case Verdict.Accepted: verdictMsg = "Accepted"; break;
				case Verdict.WrongAnswer: verdictMsg = "Wrong Answer"; break;
				case Verdict.RuntimeError: verdictMsg = "Runtime Error"; break;
				case Verdict.TimeLimitExceeded: verdictMsg = "Time Limit Exceeded"; break;
				case Verdict.MemoryLimitExceeded: verdictMsg = "Memory Limit Exceeded"; break;
			}
			alert(verdictMsg);
		});
		this.socket.on("disconnect", () => {
			if (GameConnection.instance === this) {
				this.socket.disconnect();
				alert("Connection lost");
				GameConnection.instance = undefined;
				m.route.set("/mainmenu");
				m.redraw();
			}
		});
		this.socket.emit("authenticate", token);
	}

	emit(type: string, ...args: any[]) {
		this.socket.emit(type, ...args);
	}

	kill() {
		this.socket.disconnect();
		GameConnection.instance = undefined;
	}

}

export async function connect(): Promise<GameConnection | false> {
	disconnect();
	try {
		const res = await axios.get('/api/get_temporary_auth_token', { withCredentials: true });
		if ("token" in res.data) {
			const token: string = res.data.token;
			return GameConnection.instance = new GameConnection(token);
		}
		else {
			return false;
		}
	}
	catch (e) {
		return false;
	}
}

export function disconnect() {
	const ins = GameConnection.instance;
	GameConnection.instance = undefined;
	ins?.kill();
}
