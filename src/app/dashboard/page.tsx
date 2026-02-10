'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import ApiKeyCard from '@/components/dashboard/ApiKeyCard';
import UsageStats from '@/components/dashboard/UsageStats';
import type { ApiKey } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [error, setError] = useState('');

  const fetchKeys = useCallback(async () => {
    try {
      const response = await fetch('/api/keys');
      if (!response.ok) throw new Error('Failed to fetch keys');
      const data = await response.json();
      setKeys(data.keys);
    } catch (err) {
      console.error('Error fetching keys:', err);
      setError('API 키를 불러오는데 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);
      await fetchKeys();
      setLoading(false);
    };

    checkUser();
  }, [supabase, router, fetchKeys]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');

    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName || 'Default Key' }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create key');
      }

      setNewKeyName('');
      setShowNewKeyForm(false);
      await fetchKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'API 키 생성에 실패했습니다.');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const response = await fetch(`/api/keys/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete key');
      await fetchKeys();
    } catch (err) {
      console.error('Error deleting key:', err);
      setError('API 키 삭제에 실패했습니다.');
    }
  };

  const handleRegenerateKey = async (id: string) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regenerate: true }),
      });
      if (!response.ok) throw new Error('Failed to regenerate key');
      await fetchKeys();
    } catch (err) {
      console.error('Error regenerating key:', err);
      setError('API 키 재발급에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[var(--text-primary)]">
            🦀 Dubai Crab
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--text-secondary)]">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">대시보드</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              API 키를 관리하고 사용량을 확인하세요
            </p>
          </div>
          {!showNewKeyForm && keys.length < 5 && (
            <Button onClick={() => setShowNewKeyForm(true)}>+ 새 API 키</Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6"
          >
            <p className="text-sm text-red-500">{error}</p>
          </motion.div>
        )}

        {/* New Key Form */}
        <AnimatePresence>
          {showNewKeyForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card variant="bordered">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">새 API 키 생성</h3>
                <form onSubmit={handleCreateKey} className="flex gap-3">
                  <Input
                    placeholder="키 이름 (예: Production)"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" loading={creating}>
                    생성
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowNewKeyForm(false)}
                  >
                    취소
                  </Button>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="mb-8">
          <UsageStats keys={keys} />
        </div>

        {/* API Keys Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">🔑 내 API 키</h2>

          {keys.length === 0 ? (
            <Card variant="bordered" className="text-center py-12">
              <p className="text-[var(--text-muted)] mb-4">아직 API 키가 없습니다</p>
              <Button onClick={() => setShowNewKeyForm(true)}>첫 번째 API 키 생성하기</Button>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <AnimatePresence>
                {keys.map((key) => (
                  <ApiKeyCard
                    key={key.id}
                    apiKey={key}
                    onDelete={handleDeleteKey}
                    onRegenerate={handleRegenerateKey}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* API Documentation */}
        <div className="mt-12">
          <Card variant="bordered">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">📚 API 사용법</h2>
            <div className="bg-[var(--bg-main)] rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-[var(--text-secondary)]">
{`# Dubai Crab 앱에서 API 키 설정
# 설정 → API 키 입력 → 연결

# 또는 릴레이 서버 직접 연결
curl -X POST https://relay.snvm.cc/v1/chat \\
  -H "Authorization: Bearer dcrab_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "안녕하세요"}'`}
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
