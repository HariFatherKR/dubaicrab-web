'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import type { ApiKey } from '@/lib/types';

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onDelete: (id: string) => Promise<void>;
  onRegenerate: (id: string) => Promise<void>;
}

export default function ApiKeyCard({ apiKey, onDelete, onRegenerate }: ApiKeyCardProps) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const usagePercent = (apiKey.used_this_month / apiKey.monthly_quota) * 100;
  const maskedKey = apiKey.key.substring(0, 10) + '••••••••••••••••••';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm('정말 이 API 키를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(apiKey.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRegenerate = async () => {
    if (!confirm('API 키를 재발급하시겠습니까? 기존 키는 더 이상 사용할 수 없습니다.')) {
      return;
    }
    setIsRegenerating(true);
    try {
      await onRegenerate(apiKey.id);
    } finally {
      setIsRegenerating(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '사용 기록 없음';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--text-primary)]">{apiKey.name}</h3>
        <span className="text-xs text-[var(--text-muted)]">
          생성: {formatDate(apiKey.created_at)}
        </span>
      </div>

      {/* API Key */}
      <div className="bg-[var(--bg-main)] rounded p-3 mb-4 font-mono text-sm break-all">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[var(--text-secondary)]">
            {showKey ? apiKey.key : maskedKey}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-1.5 hover:bg-[var(--bg-card)] rounded transition-colors"
              aria-label={showKey ? '숨기기' : '보기'}
            >
              {showKey ? '🙈' : '👁️'}
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-[var(--bg-card)] rounded transition-colors"
              aria-label="복사"
            >
              {copied ? '✅' : '📋'}
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="text-[var(--text-secondary)]">이번 달 사용량</span>
          <span className="text-[var(--text-primary)]">
            {apiKey.used_this_month.toLocaleString()} / {apiKey.monthly_quota.toLocaleString()}
          </span>
        </div>
        <div className="h-2 bg-[var(--bg-main)] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              usagePercent > 90
                ? 'bg-red-500'
                : usagePercent > 70
                ? 'bg-yellow-500'
                : 'bg-[var(--primary)]'
            }`}
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Last used */}
      <p className="text-xs text-[var(--text-muted)] mb-4">
        마지막 사용: {formatDate(apiKey.last_used_at)}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRegenerate}
          loading={isRegenerating}
        >
          🔄 재발급
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          loading={isDeleting}
        >
          🗑️ 삭제
        </Button>
      </div>
    </motion.div>
  );
}
