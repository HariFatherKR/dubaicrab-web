'use client';

import { useState, FormEvent } from 'react';
import { isValidEmail } from '../utils/validation';

const GOOGLE_SCRIPT_URL =
	process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
	'https://script.google.com/macros/s/AKfycbz3NZeMu1jH1HVlbNNEkgoJSSt9VI6mfABCixxxA4bTW6CTa23CEdhfJn5IuziHffAr3w/exec';

export interface UseNewsletterSignupResult {
	email: string;
	setEmail: (email: string) => void;
	submitted: boolean;
	isLoading: boolean;
	error: string | null;
	handleSubmit: (e: FormEvent) => Promise<void>;
}

/**
 * 뉴스레터 구독 훅
 */
export function useNewsletterSignup(): UseNewsletterSignupResult {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);

		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			setError('이메일을 입력해주세요');
			return;
		}

		if (!isValidEmail(trimmedEmail)) {
			setError('올바른 이메일 주소를 입력해주세요');
			return;
		}

		setIsLoading(true);
		try {
			await fetch(GOOGLE_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: trimmedEmail }),
			});
			setSubmitted(true);
		} catch {
			setError('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
		} finally {
			setIsLoading(false);
		}
	};

	return { email, setEmail, submitted, isLoading, error, handleSubmit };
}
