import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Clinica NC
        </h1>
        <p className="text-lg text-gray-600">
          Next.js with App Router, TypeScript, and Clean Architecture
        </p>
      </main>
    </div>
  );
}

