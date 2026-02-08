'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';

interface EmailForm {
  email: string;
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>();

  const onSubmit = async (data: EmailForm) => {
    // TODO: Connect to Supabase or API
    console.log('Email submitted:', data.email);
    setSubmitted(true);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const features = [
    { 
      icon: '🔒', 
      title: '100% 로컬 실행', 
      desc: '회사 기밀문서도 안심. 데이터가 절대 외부로 나가지 않습니다.',
      highlight: '보안 걱정 끝'
    },
    { 
      icon: '📄', 
      title: 'HWP 완벽 지원', 
      desc: '한글 문서 드래그 한 번으로 요약, 분석, 번역까지.',
      highlight: '한글 문서 전문'
    },
    { 
      icon: '📧', 
      title: '이메일 3초 작성', 
      desc: '"김과장님께 회의 일정 변경 메일 써줘" 한 마디면 끝.',
      highlight: '퇴근 시간 앞당기기'
    },
    { 
      icon: '📊', 
      title: '엑셀 데이터 분석', 
      desc: 'CSV, XLSX 파일 던지면 인사이트를 뽑아드립니다.',
      highlight: '보고서 자동화'
    },
    { 
      icon: '💻', 
      title: '오프라인 작동', 
      desc: '인터넷 없어도 OK. 비행기에서도, 지하철에서도.',
      highlight: '어디서나 사용'
    },
    { 
      icon: '⚡', 
      title: '5분 설치', 
      desc: '복잡한 설정 없이 다운로드 → 실행. 끝.',
      highlight: 'IT팀 호출 불필요'
    },
  ];

  const painPoints = [
    { problem: 'ChatGPT 회사에서 막힘', solution: '로컬에서 돌아가서 차단 불가' },
    { problem: '기밀문서 AI에 넣기 무서움', solution: '데이터가 내 컴퓨터를 떠나지 않음' },
    { problem: 'HWP 파일 AI가 못 읽음', solution: '한글 문서 완벽 지원' },
    { problem: '매번 이메일 쓰는데 30분', solution: '3초면 초안 완성' },
  ];

  const steps = [
    { num: '01', title: '다운로드', desc: 'Dubai Crab 설치 파일 다운로드 (무료)', time: '1분' },
    { num: '02', title: '설치', desc: '더블클릭으로 자동 설치 (Ollama 포함)', time: '3분' },
    { num: '03', title: '사용', desc: '파일 드래그 또는 질문 입력. 끝!', time: '즉시' },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#10B981] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#F59E0B] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <div className="text-7xl md:text-8xl mb-6">🦀</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FBBF24] bg-clip-text text-transparent leading-tight">
              ChatGPT 막힌 회사에서도<br />
              <span className="text-[#10B981]">AI 쓰는 방법</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#FAFAF9] mb-2 font-medium">
              Dubai Crab — 한국 직장인을 위한 로컬 AI 비서
            </p>
            <p className="text-lg text-[#A8A29E] mb-8 max-w-2xl mx-auto">
              HWP 요약, 이메일 작성, 엑셀 분석까지.<br />
              <strong className="text-[#10B981]">100% 로컬</strong>이라 회사 보안팀도 OK.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-lg mx-auto mb-6"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="회사 이메일 주소"
                  {...register('email', { 
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '올바른 이메일 형식이 아닙니다'
                    }
                  })}
                  className="flex-1 px-6 py-4 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] text-[#FAFAF9] placeholder-[#78716C] focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl font-bold text-lg whitespace-nowrap bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#1C1917] hover:from-[#FBBF24] hover:to-[#F59E0B] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#F59E0B]/25"
                >
                  출시 알림 받기 🚀
                </button>
              </form>
            ) : (
              <div className="glass p-6 rounded-xl border border-[#10B981]/30">
                <p className="text-xl text-[#10B981] font-semibold">✅ 등록 완료!</p>
                <p className="text-[#A8A29E] mt-2">출시하면 가장 먼저 알려드릴게요</p>
              </div>
            )}
            {errors.email && (
              <p className="text-[#EF4444] mt-2 text-sm">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-4 mb-12"
          >
            <a
              href="https://github.com/HariFatherKR/DubaiCrab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub에서 보기</span>
            </a>
            <span className="flex items-center gap-2 px-4 py-2 text-[#A8A29E]">
              <span className="text-[#10B981]">●</span> 무료 & 오픈소스
            </span>
          </motion.div>

          {/* App Screenshot */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-2 max-w-4xl mx-auto shadow-2xl shadow-black/50 border border-[rgba(16,185,129,0.2)]">
              <Image
                src="/app-screenshot.png"
                alt="Dubai Crab 앱 스크린샷"
                width={1920}
                height={1080}
                className="rounded-xl w-full h-auto"
                priority
              />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 md:top-4 md:right-4 bg-[#10B981] text-[#1C1917] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              macOS / Windows
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[rgba(16,185,129,0.05)]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            이런 고민 있으셨죠?
          </motion.h2>
          <p className="text-[#A8A29E] text-center mb-12">
            Dubai Crab이 해결해드립니다
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {painPoints.map((item, index) => (
              <motion.div
                key={item.problem}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl border border-[rgba(16,185,129,0.1)] hover:border-[rgba(16,185,129,0.3)] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">😩</div>
                  <div className="flex-1">
                    <p className="text-[#EF4444] font-medium line-through opacity-60">{item.problem}</p>
                    <p className="text-[#10B981] font-semibold mt-1">→ {item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            왜 <span className="text-[#F59E0B]">Dubai Crab</span>인가요?
          </motion.h2>
          <p className="text-[#A8A29E] text-center mb-12">
            한국 직장인의 실제 업무 환경에 맞춘 기능들
          </p>

          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                className="glass p-6 rounded-2xl border border-[rgba(16,185,129,0.1)] hover:border-[#10B981]/50 transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#FAFAF9] group-hover:text-[#10B981] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#A8A29E] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[rgba(245,158,11,0.05)]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            설치부터 사용까지 <span className="text-[#10B981]">5분</span>
          </motion.h2>
          <p className="text-[#A8A29E] text-center mb-12">
            IT팀 도움 없이 혼자서 가능해요
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex-1 text-center relative"
              >
                <div className="text-6xl font-black text-[#F59E0B]/20 mb-2">{step.num}</div>
                <h3 className="text-2xl font-bold mb-2 text-[#FAFAF9]">{step.title}</h3>
                <p className="text-[#A8A29E] mb-2">{step.desc}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-sm font-medium">
                  {step.time}
                </span>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-[#A8A29E] text-2xl">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl border border-[rgba(16,185,129,0.2)]"
          >
            <p className="text-lg text-[#A8A29E] mb-4">🎯 타겟 사용자</p>
            <p className="text-2xl md:text-3xl font-bold text-[#FAFAF9] mb-6">
              "회사에서 ChatGPT 막혀서 답답했는데,<br />
              <span className="text-[#10B981]">이건 로컬이라 가능하네요!"</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
                🏢 대기업 직장인
              </span>
              <span className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
                🏛️ 공공기관
              </span>
              <span className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
                🏦 금융권
              </span>
              <span className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
                ⚖️ 법무법인
              </span>
              <span className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
                🏥 의료기관
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl overflow-hidden"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/20 via-[#1C1917] to-[#F59E0B]/20" />
            <div className="absolute inset-0 glass" />
            
            <div className="relative z-10">
              <div className="text-5xl mb-4">🦀</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                출시 알림 받기
              </h2>
              <p className="text-[#A8A29E] mb-8">
                곧 출시됩니다. 먼저 써보고 싶으시다면?
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="이메일 주소"
                    {...register('email', { required: true })}
                    className="flex-1 px-6 py-4 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] text-[#FAFAF9] placeholder-[#78716C] focus:outline-none focus:border-[#10B981] transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#1C1917] hover:from-[#FBBF24] hover:to-[#F59E0B] transition-all duration-200 hover:scale-105"
                  >
                    신청하기
                  </button>
                </form>
              ) : (
                <div className="text-xl text-[#10B981] font-semibold">
                  ✅ 등록 완료! 감사합니다 🦀
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[rgba(16,185,129,0.1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦀</span>
            <span className="font-bold text-[#FAFAF9]">Dubai Crab</span>
          </div>
          
          <p className="text-[#78716C] text-sm">
            © 2026 Snovium. Made with ❤️ in Korea
          </p>
          
          <div className="flex gap-4">
            <a
              href="https://github.com/HariFatherKR/DubaiCrab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8A29E] hover:text-[#10B981] transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@snovium.com"
              className="text-[#A8A29E] hover:text-[#10B981] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
