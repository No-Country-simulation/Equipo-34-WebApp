'use client';

import { useState } from 'react';

export default function TestAuthPage() {
  const [result, setResult] = useState<any>(null);
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
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type:', contentType);

      if (contentType?.includes('application/json')) {
        const data = await response.json();
        console.log('✅ JSON Response:', data);
        setResult(data);
      } else {
        const text = await response.text();
        console.error('❌ HTML Response:', text.substring(0, 500));
        setError(`Received HTML instead of JSON. Status: ${response.status}\n\n${text.substring(0, 500)}`);
      }
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Test de Autenticación</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Diagnóstico</h2>

          <div className="space-y-4">
            <div>
              <p className="font-medium">🔍 MSW Status:</p>
              <p className="text-sm text-gray-600">
                Abre la consola del navegador (F12) y verifica si dice "✅ MSW iniciado correctamente"
              </p>
            </div>

            <div>
              <p className="font-medium">📡 Test Endpoint:</p>
              <p className="text-sm text-gray-600 mb-2">
                POST /api/auth/login
              </p>
              <pre className="bg-gray-100 p-3 rounded text-xs">
                {
                  `{
                    "email": "paciente@clinic.com",
                    "password": "password123"
                  }`
                }
              </pre>
            </div>

            <button
              onClick={testLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? '⏳ Testeando...' : '🚀 Probar Login'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
            <h3 className="text-red-800 font-semibold mb-2">❌ Error</h3>
            <pre className="text-xs text-red-700 overflow-auto whitespace-pre-wrap">
              {error}
            </pre>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-green-800 font-semibold mb-2">✅ Respuesta Exitosa</h3>
            <pre className="text-xs text-green-700 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mt-6">
          <h3 className="text-yellow-800 font-semibold mb-2">💡 Instrucciones</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
            <li>Abre las DevTools (F12)</li>
            <li>Ve a la pestaña "Console"</li>
            <li>Busca el mensaje "✅ MSW iniciado correctamente"</li>
            <li>Si NO aparece ese mensaje, MSW no está funcionando</li>
            <li>Haz clic en "Probar Login" y revisa los logs de la consola</li>
            <li>Revisa también la pestaña "Network" para ver la petición real</li>
          </ol>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-6">
          <h3 className="text-blue-800 font-semibold mb-2">🔧 Soluciones Posibles</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-700">
            <li><strong>Si MSW no inició:</strong> Recarga la página (F5)</li>
            <li><strong>Si sigue sin iniciar:</strong> Verifica que `public/mockServiceWorker.js` existe</li>
            <li><strong>Si recibe HTML:</strong> MSW no está interceptando las peticiones</li>
            <li><strong>Si recibe 404:</strong> La ruta del handler en MSW no coincide</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
//http://localhost:3000/test-auth