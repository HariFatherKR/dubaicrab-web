import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNewsletterSignup } from '../../src/hooks/useNewsletterSignup';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useNewsletterSignup', () => {
	beforeEach(() => {
		mockFetch.mockReset();
		mockFetch.mockResolvedValue({ ok: true });
	});

	it('should initialize with default values', () => {
		const { result } = renderHook(() => useNewsletterSignup());

		expect(result.current.email).toBe('');
		expect(result.current.submitted).toBe(false);
		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBe(null);
	});

	it('should update email when setEmail is called', () => {
		const { result } = renderHook(() => useNewsletterSignup());

		act(() => {
			result.current.setEmail('test@example.com');
		});

		expect(result.current.email).toBe('test@example.com');
	});

	it('should show error for empty email', async () => {
		const { result } = renderHook(() => useNewsletterSignup());

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
		});

		expect(result.current.error).toBe('이메일을 입력해주세요');
		expect(result.current.submitted).toBe(false);
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it('should show error for invalid email format', async () => {
		const { result } = renderHook(() => useNewsletterSignup());

		act(() => {
			result.current.setEmail('invalid-email');
		});

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
		});

		expect(result.current.error).toBe('올바른 이메일 주소를 입력해주세요');
		expect(result.current.submitted).toBe(false);
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it('should submit valid email successfully', async () => {
		const { result } = renderHook(() => useNewsletterSignup());

		act(() => {
			result.current.setEmail('test@example.com');
		});

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
		});

		expect(result.current.submitted).toBe(true);
		expect(result.current.error).toBe(null);
		expect(mockFetch).toHaveBeenCalledOnce();
		expect(mockFetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify({ email: 'test@example.com' }),
			})
		);
	});

	it('should handle fetch error', async () => {
		mockFetch.mockRejectedValueOnce(new Error('Network error'));

		const { result } = renderHook(() => useNewsletterSignup());

		act(() => {
			result.current.setEmail('test@example.com');
		});

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
		});

		expect(result.current.error).toBe('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
		expect(result.current.submitted).toBe(false);
	});

	it('should trim email before submission', async () => {
		const { result } = renderHook(() => useNewsletterSignup());

		act(() => {
			result.current.setEmail('  test@example.com  ');
		});

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
		});

		expect(mockFetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				body: JSON.stringify({ email: 'test@example.com' }),
			})
		);
	});
});
