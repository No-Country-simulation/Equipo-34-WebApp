'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">🏥 Clínica NC</h1>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Ingresar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-900">
              Tu salud es nuestra prioridad
            </h2>
            <p className="text-xl text-gray-600">
              Accede a tu historial médico, agenda citas y realiza teleconsultas desde cualquier lugar.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🩺</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Historial Médico</h3>
                  <p className="text-gray-600">Acceso completo a tu información médica</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">📅</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Agendar Citas</h3>
                  <p className="text-gray-600">Reserva citas con nuestros especialistas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-2xl">💻</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Teleconsultas</h3>
                  <p className="text-gray-600">Consulta desde la comodidad de tu hogar</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push('/auth/login')}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 mt-6"
            >
              Comenzar Ahora →
            </button>
          </div>

          {/* Right side - Image/Illustration */}
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-indigo-200 to-blue-200 rounded-2xl p-12 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <p className="text-gray-700 font-semibold">Portal de Salud Integral</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="text-3xl font-bold text-center mb-12">¿Por qué elegir Clínica NC?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-2">Seguro</h4>
              <p className="text-gray-600">Tus datos médicos están protegidos con encriptación de nivel empresarial.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-semibold mb-2">Rápido</h4>
              <p className="text-gray-600">Interfaz intuitiva para acceder rápidamente a toda tu información.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="text-xl font-semibold mb-2">Accesible</h4>
              <p className="text-gray-600">Disponible desde cualquier dispositivo, en cualquier momento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h3 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h3>
        <p className="text-xl text-gray-600 mb-8">
          Accede a tu cuenta o crea una nueva en segundos
        </p>
        <button
          onClick={() => router.push('/auth/login')}
          className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
        >
          Ir al Login
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p>&copy; 2025 Clínica NC. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
