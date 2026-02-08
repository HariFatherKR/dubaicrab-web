'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

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

  const features = [
    { icon: '🔒', title: '100% 로컬 실행', desc: '민감한 업무 데이터가 외부로 나가지 않습니다' },
    { icon: '📄', title: 'HWP 지원', desc: '한글 문서 요약 및 분석 가능' },
    { icon: '📧', title: '이메일 작성', desc: '비즈니스 이메일 초안을 빠르게 생성' },
    { icon: '📊', title: '엑셀 분석', desc: 'CSV, XLSX 데이터 요약 및 인사이트' },
    { icon: '⚡', title: '5분 설치', desc: '복잡한 설정 없이 바로 시작' },
  ];

  const steps = [
    { num: '01', title: '설치', desc: 'Ollama와 Dubai Crab 설치 (5분)' },
    { num: '02', title: '드래그', desc: '파일을 채팅창에 드래그앤드롭' },
    { num: '03', title: '완료', desc: 'AI가 분석하고 작성해줍니다' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <div className="text-8xl mb-6">🦀</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[#D4A574] to-[#B8860B] bg-clip-text text-transparent">
              Dubai Crab
            </h1>
            <p className="text-xl md:text-2xl text-[#FFF8E1] mb-2">
              한국 사무직을 위한 로컬 AI 비서
            </p>
            <p className="text-lg text-[#BCAAA4] mb-12">
              데이터가 외부로 나가지 않는 100% 로컬 AI
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  {...register('email', { 
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '올바른 이메일 형식이 아닙니다'
                    }
                  })}
                  className="flex-1 px-6 py-4 rounded-xl bg-[rgba(74,124,89,0.2)] border border-[rgba(74,124,89,0.3)] text-[#FFF8E1] placeholder-[#BCAAA4] focus:outline-none focus:border-[#D4A574] transition-colors"
                />
                <button
                  type="submit"
                  className="btn-golden px-8 py-4 rounded-xl font-semibold text-lg whitespace-nowrap"
                >
                  사전예약 🚀
                </button>
              </form>
            ) : (
              <div className="glass p-6 rounded-xl">
                <p className="text-xl text-[#D4A574]">✅ 감사합니다!</p>
                <p className="text-[#BCAAA4] mt-2">출시 시 가장 먼저 알려드릴게요</p>
              </div>
            )}
            {errors.email && (
              <p className="text-red-400 mt-2 text-sm">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex justify-center gap-4"
          >
            <a
              href="https://github.com/HariFatherKR/DubaiCrab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </motion.div>

          {/* App Screenshot Placeholder */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16"
          >
            <div className="glass rounded-2xl p-4 max-w-4xl mx-auto shadow-2xl">
              <div className="bg-gradient-to-br from-[#3d6b4f] to-[#2d5a3f] rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">🦀</p>
                  <p className="text-[#BCAAA4]">앱 스크린샷 (Coming Soon)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            왜 <span className="text-[#D4A574]">Dubai Crab</span>인가요?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl hover:border-[#D4A574] transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#D4A574]">{feature.title}</h3>
                <p className="text-[#BCAAA4]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            어떻게 사용하나요?
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex-1 text-center"
              >
                <div className="text-5xl font-bold text-[#D4A574] mb-4">{step.num}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#BCAAA4]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-dark p-12 rounded-3xl"
          >
            <h2 className="text-3xl font-bold mb-4">출시 알림 받기</h2>
            <p className="text-[#BCAAA4] mb-8">
              Dubai Crab 출시 시 가장 먼저 알려드립니다
            </p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  {...register('email', { required: true })}
                  className="flex-1 px-6 py-4 rounded-xl bg-[rgba(74,124,89,0.2)] border border-[rgba(74,124,89,0.3)] text-[#FFF8E1] placeholder-[#BCAAA4] focus:outline-none focus:border-[#D4A574] transition-colors"
                />
                <button
                  type="submit"
                  className="btn-golden px-8 py-4 rounded-xl font-semibold"
                >
                  알림 받기
                </button>
              </form>
            ) : (
              <div className="text-xl text-[#D4A574]">
                ✅ 등록 완료! 감사합니다 🦀
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[rgba(74,124,89,0.2)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦀</span>
            <span className="font-semibold">Dubai Crab</span>
          </div>
          
          <p className="text-[#BCAAA4] text-sm">
            © 2026 Snovium. Made with ❤️ in Korea
          </p>
          
          <a
            href="https://github.com/HariFatherKR/DubaiCrab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#BCAAA4] hover:text-[#D4A574] transition-colors"
          >
            GitHub →
          </a>
        </div>
      </footer>
    </main>
  );
}
