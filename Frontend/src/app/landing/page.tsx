'use client';

import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { useTranslations } from '@/shared/hooks/useTranslations';

export default function LandingPage() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
        <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{t('common.appName')}</h1>
          
          {/* Controles: Theme + Language + Login */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
            >
              {t('common.login')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
              {t('landing.hero.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('landing.hero.subtitle')}
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🩺</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('landing.features.medical_history.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('landing.features.medical_history.description')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">📅</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('landing.features.appointments.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('landing.features.appointments.description')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">💻</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('landing.features.teleconsultation.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('landing.features.teleconsultation.description')}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push('/auth/login')}
              className="px-8 py-4 bg-indigo-600 dark:bg-indigo-500 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition transform hover:scale-105 mt-6"
            >
              {t('common.startNow')} →
            </button>
          </div>

          {/* Right side - Image/Illustration */}
          <div className="hidden md:block">
            <div className="bg-linear-to-br from-indigo-200 to-blue-200 dark:from-indigo-900 dark:to-blue-900 rounded-2xl p-12 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">{t('landing.illustration.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 transition-colors">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="text-3xl font-bold text-center mb-12 dark:text-white">{t('landing.whyChoose.title')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">{t('landing.whyChoose.secure.title')}</h4>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.whyChoose.secure.description')}</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">{t('landing.whyChoose.fast.title')}</h4>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.whyChoose.fast.description')}</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">{t('landing.whyChoose.accessible.title')}</h4>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.whyChoose.accessible.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h3 className="text-3xl font-bold mb-4 dark:text-white">{t('landing.cta.title')}</h3>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {t('landing.cta.subtitle')}
        </p>
        <button
          onClick={() => router.push('/auth/login')}
          className="px-8 py-4 bg-indigo-600 dark:bg-indigo-500 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition transform hover:scale-105"
        >
          {t('landing.cta.action')}
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8 transition-colors">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p>{t('landing.footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
