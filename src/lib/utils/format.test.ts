/**
 * Tests for formatting utilities
 */
import { describe, it, expect } from 'vitest';
import { formatPercentChange, getChangeClass } from './format';

describe('formatPercentChange', () => {
	it('should format positive percentage with + sign', () => {
		expect(formatPercentChange(5.67)).toBe('+5.67%');
	});

	it('should format negative percentage', () => {
		expect(formatPercentChange(-3.45)).toBe('-3.45%');
	});

	it('should format zero', () => {
		expect(formatPercentChange(0)).toBe('0.00%');
	});

	it('should handle custom decimal places', () => {
		expect(formatPercentChange(1.23456, 0)).toBe('+1%');
		expect(formatPercentChange(1.23456, 1)).toBe('+1.2%');
		expect(formatPercentChange(1.23456, 3)).toBe('+1.235%');
	});

	it('should return "—" for NaN', () => {
		expect(formatPercentChange(NaN)).toBe('—');
	});

	it('should return "—" for null', () => {
		expect(formatPercentChange(null as any)).toBe('—');
	});

	it('should return "—" for undefined', () => {
		expect(formatPercentChange(undefined as any)).toBe('—');
	});
});

describe('getChangeClass', () => {
	it('should return "up" for positive values', () => {
		expect(getChangeClass(1)).toBe('up');
		expect(getChangeClass(0.01)).toBe('up');
		expect(getChangeClass(100)).toBe('up');
	});

	it('should return "down" for negative values', () => {
		expect(getChangeClass(-1)).toBe('down');
		expect(getChangeClass(-0.01)).toBe('down');
		expect(getChangeClass(-100)).toBe('down');
	});

	it('should return "" for zero', () => {
		expect(getChangeClass(0)).toBe('');
	});

	it('should return "" for NaN', () => {
		expect(getChangeClass(NaN)).toBe('');
	});

	it('should return "" for null', () => {
		expect(getChangeClass(null as any)).toBe('');
	});

	it('should return "" for undefined', () => {
		expect(getChangeClass(undefined as any)).toBe('');
	});
});
