check = function(userOutput, expectedOutput) {
	if (!(userOutput instanceof Array))
		return false;
	if (userOutput.length !== 2)
		return false;
	userOutput.sort((a, b) => a - b);
	expectedOutput.sort((a, b) => a - b);
	return userOutput.every((v, i) => v === expectedOutput[i]);
};
