export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Tailwind Test Page</h1>
        <p className="text-gray-600 mb-4">
          This is a simple test page to verify if TailwindCSS is working properly.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Test Button
        </button>
      </div>
    </div>
  );
} 