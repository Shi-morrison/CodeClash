import { spawn } from "child_process";
import { readFile, readdir } from "fs/promises";
import { join } from "path";

const PROBLEM_DIR = "../problems";
const SANDBOX_DIR = "../sandbox";

interface TestCase {
	input: unknown[];
	output: unknown;
}

export enum Verdict {
	Accepted,
	WrongAnswer,
	RuntimeError,
	TimeLimitExceeded,
	MemoryLimitExceeded,

	/** The total number of possible verdicts */
	N,
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

	/** The time limit for the user's submission, in milliseconds */
	timeLimit: number;

	/** The memory limit for the user's submission, in megabytes */
	memoryLimit: number;

	/** The problem statement, in HTML format */
	problemStatement: string;

	examples: { [x: string]: string }[];

	checkerSource: string;

	tests: TestCase[];

}

const problems: ProblemData[] = [];
const problemCache = (async () => {
	const files = await readdir(PROBLEM_DIR);
	files.sort();
	for (const file of files) {
		const problem: ProblemData = JSON.parse(await readFile(join(PROBLEM_DIR, file, "metadata.json"), "utf-8"));
		problem.examples = JSON.parse(await readFile(join(PROBLEM_DIR, file, "examples.json"), "utf-8"));
		problem.tests = JSON.parse(await readFile(join(PROBLEM_DIR, file, "tests.json"), "utf-8"));
		problem.checkerSource = await readFile(join(PROBLEM_DIR, file, "checker.js"), "utf-8");
		problem.problemStatement = await readFile(join(PROBLEM_DIR, file, "statement.html"), "utf-8");
		problems.push(problem);
	}
})();

export async function getRandomProblem() {
	await problemCache;
	return problems[Math.random() * problems.length | 0];
}

export async function judgeUserSubmission(problem: ProblemData, submission: string) {
	for (const testCase of problem.tests) {
		const input = {
			userSubmission: submission,
			timeLimit: problem.timeLimit,
			functionName: problem.signature.name,
			memoryLimit: problem.memoryLimit,
			checkerSource: problem.checkerSource,
			testCase,
		};

		const proc = spawn("node", ["."], {
			cwd: SANDBOX_DIR,
			stdio: "pipe",
		});

		proc.stdin.write(JSON.stringify(input));
		proc.stdin.end();

		const chunks: any[] = [];
		proc.stderr.on("data", data => { chunks.push(data); });

		const verdict: Verdict = await new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				proc.kill("SIGKILL");
				reject(new Error("internal error"));
			}, problem.timeLimit + 1000);
			proc.on("exit", code => {
				const stderr = Buffer.concat(chunks).toString("utf-8");
				if (stderr.includes("Isolate was disposed during execution due to memory limit")) {
					resolve(Verdict.MemoryLimitExceeded);
				}
				else if (stderr.includes("[TIME LIMIT EXCEEDED]")) {
					resolve(Verdict.TimeLimitExceeded);
				}
				else if (code && code >= 16 && code < 16 + Verdict.N) {
					clearTimeout(timeout);
					resolve(code - 16);
				}
				else {
					resolve(Verdict.RuntimeError);
				}
			});
		});

		if (verdict !== Verdict.Accepted)
			return verdict;
	}

	return Verdict.Accepted;
}
