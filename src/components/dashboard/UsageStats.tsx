'use client';

import Card from '@/components/ui/Card';
import type { ApiKey } from '@/lib/types';

interface UsageStatsProps {
  keys: ApiKey[];
}

export default function UsageStats({ keys }: UsageStatsProps) {
  const totalUsed = keys.reduce((sum, key) => sum + key.used_this_month, 0);
  const totalQuota = keys.reduce((sum, key) => sum + key.monthly_quota, 0);
  const usagePercent = totalQuota > 0 ? (totalUsed / totalQuota) * 100 : 0;

  return (
    <Card variant="bordered">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">📊 이번 달 총 사용량</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--primary)]">{keys.length}</p>
          <p className="text-xs text-[var(--text-muted)]">API 키</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--text-primary)]">{totalUsed.toLocaleString()}</p>
          <p className="text-xs text-[var(--text-muted)]">사용 횟수</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--text-secondary)]">{totalQuota.toLocaleString()}</p>
          <p className="text-xs text-[var(--text-muted)]">총 쿼터</p>
        </div>
      </div>

      <div className="mb-2">
        <div className="h-3 bg-[var(--bg-main)] rounded-full overflow-hidden">
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
      <p className="text-sm text-[var(--text-muted)] text-center">
        {usagePercent.toFixed(1)}% 사용됨
      </p>
    </Card>
  );
}
