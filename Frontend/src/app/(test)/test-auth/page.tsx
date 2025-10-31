'use client';

import { useState } from 'react';

export default function TestAuthPage() {
  const [result, setResult] = useState<string | undefined | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🔍 Enviando petición a /api/auth/login...');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'paciente@clinic.com',
          password: 'password123',
        }),
      });

      console.log('📡 Response status:', response.status);
      console.log(
        '📡 Response headers:',
        Object.fromEntries(response.headers.entries())
      );

      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type:', contentType);

      if (contentType?.includes('application/json')) {
        const data = await response.json();
        console.log('✅ JSON Response:', data);
        setResult(data);
      } else {
        const text = await response.text();
        console.error('❌ HTML Response:', text.substring(0, 500));
        setError(
          `Received HTML instead of JSON. Status: ${response.status}\n\n${text.substring(0, 500)}`
        );
      }
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">🧪 Test de Autenticación</h1>

        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Diagnóstico</h2>

          <div className="space-y-4">
            <div>
              <p className="font-medium">🔍 MSW Status:</p>
              <p className="text-sm text-gray-600">
                Abre la consola del navegador (F12) y verifica si dice "✅ MSW
                iniciado correctamente"
              </p>
            </div>

            <div>
              <p className="font-medium">📡 Test Endpoint:</p>
              <p className="mb-2 text-sm text-gray-600">POST /api/auth/login</p>
              <pre className="rounded bg-gray-100 p-3 text-xs">
                {`{
                    "email": "paciente@clinic.com",
                    "password": "password123"
                  }`}
              </pre>
            </div>

            <button
              onClick={testLogin}
              disabled={loading}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? '⏳ Testeando...' : '🚀 Probar Login'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-6">
            <h3 className="mb-2 font-semibold text-red-800">❌ Error</h3>
            <pre className="overflow-auto text-xs whitespace-pre-wrap text-red-700">
              {error}
            </pre>
          </div>
        )}

        {result && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <h3 className="mb-2 font-semibold text-green-800">
              ✅ Respuesta Exitosa
            </h3>
            <pre className="overflow-auto text-xs text-green-700">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h3 className="mb-2 font-semibold text-yellow-800">
            💡 Instrucciones
          </h3>
          <ol className="list-inside list-decimal space-y-2 text-sm text-yellow-700">
            <li>Abre las DevTools (F12)</li>
            <li>Ve a la pestaña "Console"</li>
            <li>Busca el mensaje "✅ MSW iniciado correctamente"</li>
            <li>Si NO aparece ese mensaje, MSW no está funcionando</li>
            <li>Haz clic en "Probar Login" y revisa los logs de la consola</li>
            <li>
              Revisa también la pestaña "Network" para ver la petición real
            </li>
          </ol>
        </div>

        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 font-semibold text-blue-800">
            🔧 Soluciones Posibles
          </h3>
          <ul className="list-inside list-disc space-y-2 text-sm text-blue-700">
            <li>
              <strong>Si MSW no inició:</strong> Recarga la página (F5)
            </li>
            <li>
              <strong>Si sigue sin iniciar:</strong> Verifica que
              `public/mockServiceWorker.js` existe
            </li>
            <li>
              <strong>Si recibe HTML:</strong> MSW no está interceptando las
              peticiones
            </li>
            <li>
              <strong>Si recibe 404:</strong> La ruta del handler en MSW no
              coincide
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
//http://localhost:3000/test-auth
