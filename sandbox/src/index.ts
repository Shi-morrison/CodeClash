// don't forget to run this with --untrusted-code-mitigations

import { readFileSync } from "fs";
import ivm from "isolated-vm";

const {
	userSubmission,
	timeLimit,
	functionName,
	memoryLimit,
	checkerSource,
	testCase
} = JSON.parse(readFileSync(process.stdin.fd, "utf-8"));

let check: any;
eval(checkerSource);

const isolate = new ivm.Isolate({ memoryLimit });

enum Verdict {
	Accepted,
	WrongAnswer,
	RuntimeError,
	TimeLimitExceeded,
	MemoryLimitExceeded,
}

function verdict(v: Verdict) {
	process.exit(16 + v);
}

const context = isolate.createContextSync();

const jail = context.global;
jail.setSync("global", jail.derefInto());

jail.setSync("__INPUT__", JSON.stringify(testCase["input"]));

let finalVerdict: Verdict = Verdict.RuntimeError;

jail.setSync("__OUTPUT__", function(value: unknown) {
	if (typeof value === "string") {
		const userOutput = JSON.parse(value);
		if (check(userOutput, testCase["output"])) {
			finalVerdict = Verdict.Accepted;
		}
		else {
			finalVerdict = Verdict.WrongAnswer;
		}
	}
});

const hostile = isolate.compileScriptSync(`${userSubmission}
;__OUTPUT__(JSON.stringify(${functionName}(...JSON.parse(__INPUT__))))
`);

const timeout = setTimeout(() => {
	process.stderr.write("[TIME LIMIT EXCEEDED]");
	process.abort();
}, timeLimit);

hostile.run(context).then(() => {
	clearTimeout(timeout);
	verdict(finalVerdict);
}).catch((err: any) => {
	console.error(err);
	verdict(Verdict.RuntimeError);
});
