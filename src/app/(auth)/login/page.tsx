'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          setError(signInError.message);
        }
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
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
          <h1 className="text-xl font-semibold mt-4 text-[var(--text-primary)]">로그인</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            계정에 로그인하여 API 키를 관리하세요
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
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          {error && (
            <p className="text-sm text-red-500 text-center" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            로그인
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-[var(--text-muted)]">계정이 없으신가요? </span>
          <Link
            href="/register"
            className="text-[var(--primary-light)] hover:underline font-medium"
          >
            회원가입
          </Link>
        </div>
      </Card>
    </main>
  );
}
