'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 8) {
      setError('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('이미 등록된 이메일입니다.');
        } else {
          setError(signUpError.message);
        }
        return;
      }

      // Auto sign in after registration (Supabase default)
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card variant="bordered" className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[var(--text-primary)]">
            🦀 Dubai Crab
          </Link>
          <h1 className="text-xl font-semibold mt-4 text-[var(--text-primary)]">회원가입</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            계정을 생성하고 API 키를 발급받으세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <Input
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="최소 8자 이상"
            required
            autoComplete="new-password"
          />

          <Input
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            required
            autoComplete="new-password"
          />

          {error && (
            <p className="text-sm text-red-500 text-center" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            회원가입
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-[var(--text-muted)]">이미 계정이 있으신가요? </span>
          <Link
            href="/login"
            className="text-[var(--primary-light)] hover:underline font-medium"
          >
            로그인
          </Link>
        </div>
      </Card>
    </main>
  );
}
