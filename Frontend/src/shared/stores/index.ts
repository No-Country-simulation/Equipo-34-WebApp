/**
 * Barrel export de todos los stores
 * Facilita imports: import { useAuthStore, useThemeStore } from '@/shared/stores'
 */

export { useAuthStore } from './auth.store';
export { useThemeStore, initializeTheme, type Theme } from './theme.store';
export {
  useLocaleStore,
  initializeLocale,
  getBrowserLocale,
  type Locale,
} from './locale.store';
