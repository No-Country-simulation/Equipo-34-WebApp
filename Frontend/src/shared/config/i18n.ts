import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Idiomas soportados
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale existe
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
