const { describe, expect, test } = require('@jest/globals');
const { getRandomProblem, getProblemByTitle, judgeUserSubmission, Verdict } = require('../dist/judge');

describe('judge module', () => {
	test('fetch random problem', async () => {
		expect(await getRandomProblem()).not.toBe(undefined);
	});

	test('fetch "Two Sum"', async () => {
		expect(await getProblemByTitle("Two Sum")).toMatchObject({
			checkerSource: `check = function(userOutput, expectedOutput) {\n`
				+ `\tif (!(userOutput instanceof Array))\n`
				+ `\t\treturn false;\n`
				+ `\tif (userOutput.length !== 2)\n`
				+ `\t\treturn false;\n`
				+ `\tuserOutput.sort((a, b) => a - b);\n`
				+ `\texpectedOutput.sort((a, b) => a - b);\n`
				+ `\treturn userOutput.every((v, i) => v === expectedOutput[i]);\n`
				+ `};\n`
				+ ``,
			difficulty: "Easy",
			examples: [
				{
					"Explanation": "Because nums[0] + nums[1] == 9, we return [0, 1].",
					"Input": "nums = [2,7,11,15], target = 9", "Output": "[0,1]"
				}, {
					"Input": "nums = [3,2,4], target = 6",
					"Output": "[1,2]"
				}, {
					"Input": "nums = [3,3], target = 6",
					"Output": "[0,1]"
				}
			],
			memoryLimit: 256,
			problemStatement: `<p>Given an array of integers, nums, and an integer, target, return <i>indices of the two numbers such that they add up to target.</i></p>\n`
				+ `<p>You may assume that each input would have <b><i>exactly</i> one solution</b>, and you may not use the <i>same</i> element twice.</p>\n`
				+ `<p>You can return the answer in any order.</p>\n`
				+ ``,
			signature: {"name": "twoSum", "params": ["nums", "target"]},
			tests: [{"input": [[2, 7, 11, 15], 9], "output": [0, 1]}, {"input": [[3, 2, 4], 6], "output": [1, 2]}, {"input": [[3, 3], 6], "output": [0, 1]}],
			timeLimit: 1200,
			title: "Two Sum",
		});
	});

	test('test correct solution', async () => {
		const problem = await getProblemByTitle("Two Sum");
		const verdict = await judgeUserSubmission(problem, `
			function twoSum(nums, target) {
				for (let i = 0; i < nums.length; ++i) {
					for (let j = i + 1; j < nums.length; ++j) {
						if (nums[i] + nums[j] === target) {
							return [i, j];
						}
					}
				}
			}
		`);
		expect(verdict).toBe(Verdict.Accepted);
	});

	test('test incorrect solution', async () => {
		const problem = await getProblemByTitle("Two Sum");
		const verdict = await judgeUserSubmission(problem, `
			function twoSum(nums, target) {
				for (let i = 0; i < nums.length; ++i) {
					for (let j = 0; j < nums.length; ++j) {
						if (nums[i] + nums[j] === target) {
							return [i, j];
						}
					}
				}
			}
		`);
		expect(verdict).toBe(Verdict.WrongAnswer);
	});

	test('test runtime error', async () => {
		const problem = await getProblemByTitle("Two Sum");
		const verdict = await judgeUserSubmission(problem, `
			function twoSum(nums, target) {
				return nums.solveTwoSum();
			}
		`);
		expect(verdict).toBe(Verdict.RuntimeError);
	});

	test('test time limit exceeded', async () => {
		const problem = await getProblemByTitle("Two Sum");
		const verdict = await judgeUserSubmission(problem, `
			function twoSum(nums, target) {
				while (true) {}
			}
		`);
		expect(verdict).toBe(Verdict.TimeLimitExceeded);
	});
});
