const { describe, expect, test } = require('@jest/globals');
const { calculateEloRating, determineRank } = require('../dist/api/rating');

describe('rating module', () => {
	test('bronze rank', () => { expect(determineRank(1400)).toBe('bronze'); });
	test('silver rank', () => { expect(determineRank(1500)).toBe('silver'); });
	test('gold rank', () => { expect(determineRank(2000)).toBe('gold'); });

	test('elo calculation', () => {
		expect(calculateEloRating(2000, 1400, 1)).toMatchObject({
			newRating1: 2001,
			newRating2: 1399,
		});
	});
});
