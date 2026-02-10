'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useNewsletterSignup } from '../hooks/useNewsletterSignup';

export default function Home() {
	const { email, setEmail, submitted, isLoading, error, handleSubmit } = useNewsletterSignup();

	const fadeIn = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	};

	const features = [
		{
			icon: '🔒',
			title: '100% 로컬',
			desc: '데이터가 외부로 나가지 않습니다',
		},
		{
			icon: '📄',
			title: 'HWP 지원',
			desc: '한글 문서 요약 및 분석',
		},
		{
			icon: '📧',
			title: '이메일 작성',
			desc: '비즈니스 이메일 초안 생성',
		},
		{
			icon: '📊',
			title: '엑셀 분석',
			desc: 'CSV, XLSX 데이터 요약',
		},
		{
			icon: '💻',
			title: '오프라인 OK',
			desc: '인터넷 없이도 작동',
		},
		{
			icon: '⚡',
			title: '5분 설치',
			desc: '복잡한 설정 없음',
		},
	];

	const steps = [
		{ num: '1', title: '다운로드', desc: 'Dubai Crab 설치' },
		{ num: '2', title: '실행', desc: '자동 설정 완료' },
		{ num: '3', title: '사용', desc: '바로 시작' },
	];

	const targetUsers = ['대기업', '공공기관', '금융권', '법무법인', '의료기관'];

	return (
		<main className="min-h-screen">
			{/* Hero */}
			<section className="px-4 py-16 md:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.4 }}>
						<p className="text-[var(--primary-light)] font-medium mb-3 text-sm md:text-base">
							ChatGPT 막힌 회사에서도
						</p>
						<h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">AI 쓰는 방법</h1>
						<p className="text-base md:text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto px-4">
							Dubai Crab은 100% 로컬에서 실행되는 AI 비서입니다. HWP 요약, 이메일 작성, 엑셀 분석까지.
						</p>
					</motion.div>

					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeIn}
						transition={{ duration: 0.4, delay: 0.1 }}
						className="max-w-md mx-auto mb-8"
					>
						{!submitted ? (
							<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
								<input
									type="email"
									placeholder="이메일 주소"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="input flex-1 px-4 py-3 text-center sm:text-left"
									disabled={isLoading}
									aria-label="이메일 주소"
									aria-describedby={error ? 'email-error' : undefined}
								/>
								<button
									type="submit"
									className="btn-primary px-6 py-3 w-full sm:w-auto disabled:opacity-50"
									disabled={isLoading}
								>
									{isLoading ? '등록 중...' : '알림 받기'}
								</button>
							</form>
						) : (
							<div className="card p-4 text-center">
								<p className="text-[var(--primary-light)]">✓ 등록 완료! 출시되면 알려드릴게요 🦀</p>
							</div>
						)}
						{error && (
							<p id="email-error" className="text-red-500 mt-2 text-sm" role="alert">
								{error}
							</p>
						)}
					</motion.div>

					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeIn}
						transition={{ duration: 0.4, delay: 0.2 }}
						className="flex flex-col items-center gap-4"
					>
						<a
							href="https://github.com/HariFatherKR/DubaiCrab/releases/download/v0.2.0/DubaiCrab-v0.2.0-macOS-arm64.pkg"
							className="btn-primary px-8 py-3 text-base font-semibold inline-flex items-center gap-2"
						>
							<span>🍎</span> Mac 다운로드 (v0.2.0)
						</a>
						<div className="flex justify-center gap-4 text-sm text-[var(--text-muted)]">
							<a
								href="https://github.com/HariFatherKR/DubaiCrab"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--text-secondary)] transition-colors"
							>
								GitHub →
							</a>
							<span>무료 & 오픈소스</span>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Screenshot */}
			<section className="px-4 pb-24">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="card p-2 relative"
					>
						<Image
							src="/app-screenshot.png"
							alt="Dubai Crab"
							width={1920}
							height={1080}
							className="rounded w-full h-auto"
							priority
						/>
						<span className="absolute top-4 right-4 badge">macOS / Windows</span>
					</motion.div>
				</div>
			</section>

			{/* Features */}
			<section className="px-4 py-24 border-t border-[var(--border)]">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-2xl font-bold text-center mb-12">주요 기능</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.05 }}
								className="card p-4 md:p-5"
							>
								<div className="text-xl md:text-2xl mb-2 md:mb-3">{feature.icon}</div>
								<h3 className="font-semibold text-sm md:text-base mb-1">{feature.title}</h3>
								<p className="text-xs md:text-sm text-[var(--text-secondary)]">{feature.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="px-4 py-24 border-t border-[var(--border)]">
				<div className="max-w-2xl mx-auto">
					<h2 className="text-2xl font-bold text-center mb-12">시작하기</h2>
					<div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8 sm:gap-4">
						{steps.map((step, index) => (
							<motion.div
								key={step.num}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="text-center flex-1"
							>
								<div className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center mx-auto mb-3 text-[var(--primary-light)] font-semibold">
									{step.num}
								</div>
								<h3 className="font-semibold mb-1">{step.title}</h3>
								<p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Target users */}
			<section className="px-4 py-24 border-t border-[var(--border)]">
				<div className="max-w-2xl mx-auto text-center">
					<p className="text-[var(--text-muted)] mb-4">이런 분들을 위해 만들었습니다</p>
					<div className="flex flex-wrap justify-center gap-2">
						{targetUsers.map((tag) => (
							<span
								key={tag}
								className="px-3 py-1.5 text-sm bg-[var(--bg-card)] border border-[var(--border)] rounded"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="px-4 py-24 border-t border-[var(--border)]">
				<div className="max-w-md mx-auto text-center">
					<h2 className="text-2xl font-bold mb-4">출시 알림 받기</h2>
					<p className="text-[var(--text-secondary)] mb-6">출시되면 가장 먼저 알려드립니다</p>
					{!submitted ? (
						<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
							<input
								type="email"
								placeholder="이메일 주소"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="input flex-1 px-4 py-3 text-center sm:text-left"
								disabled={isLoading}
								aria-label="이메일 주소"
							/>
							<button
								type="submit"
								className="btn-primary px-6 py-3 w-full sm:w-auto disabled:opacity-50"
								disabled={isLoading}
							>
								{isLoading ? '등록 중...' : '신청'}
							</button>
						</form>
					) : (
						<p className="text-[var(--primary-light)]">✓ 등록 완료! 출시되면 알려드릴게요 🦀</p>
					)}
				</div>
			</section>

			{/* Footer */}
			<footer className="px-4 py-8 border-t border-[var(--border)]">
				<div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-[var(--text-muted)]">
					<span>Dubai Crab</span>
					<span>© 2026 Snovium</span>
					<a
						href="https://github.com/HariFatherKR/DubaiCrab"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-[var(--text-secondary)]"
					>
						GitHub
					</a>
				</div>
			</footer>
		</main>
	);
}
