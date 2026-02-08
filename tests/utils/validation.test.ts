import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../../src/utils/validation';

describe('isValidEmail', () => {
	it('should return true for valid email addresses', () => {
		expect(isValidEmail('test@example.com')).toBe(true);
		expect(isValidEmail('user.name@domain.co.kr')).toBe(true);
		expect(isValidEmail('user+tag@example.org')).toBe(true);
		expect(isValidEmail('a@b.io')).toBe(true);
	});

	it('should return false for invalid email addresses', () => {
		expect(isValidEmail('')).toBe(false);
		expect(isValidEmail('not-an-email')).toBe(false);
		expect(isValidEmail('@missing.local')).toBe(false);
		expect(isValidEmail('missing@')).toBe(false);
		expect(isValidEmail('spaces in@email.com')).toBe(false);
		expect(isValidEmail('missing.domain@')).toBe(false);
	});

	it('should return false for emails without domain extension', () => {
		expect(isValidEmail('test@domain')).toBe(false);
	});
});
