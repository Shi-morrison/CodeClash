const { describe, expect, test } = require('@jest/globals');
const { getTempToken } = require('../dist/websocket');

describe('websocket module', () => {
	test('temporary token generation', async () => {
		expect(getTempToken()).not.toBe(undefined);
	});

	test('temporary token format', async () => {
		expect(getTempToken()).toMatch(/^[0-9a-f]{32,32}$/);
	});
});
