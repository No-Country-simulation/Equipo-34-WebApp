/**
 * Página principal del área pública
 * Esta será la landing page del sistema
 */

import { redirect } from 'next/navigation';

export default function PublicHomePage() {
  // Redirigir temporalmente a /landing hasta que se implemente la landing definitiva
  redirect('/landing');
}
