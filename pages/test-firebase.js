import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase/firebase';

export default function TestFirebase() {
  const [status, setStatus] = useState('Testing...');
  const [config, setConfig] = useState(null);

  useEffect(() => {
    try {
      // Firebase config'i kontrol et
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      setConfig(firebaseConfig);

      if (auth) {
        setStatus('✅ Firebase Auth initialized successfully');
        console.log('Firebase Auth:', auth);
        console.log('Firebase Config:', firebaseConfig);
      } else {
        setStatus('❌ Firebase Auth not initialized');
      }
    } catch (error) {
      setStatus(`❌ Firebase Error: ${error.message}`);
      console.error('Firebase test error:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Firebase Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Status:</h2>
          <p className="text-lg">{status}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Environment Variables:</h2>
          <div className="space-y-2 font-mono text-sm">
            {config && Object.entries(config).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="w-64 text-gray-600">{key}:</span>
                <span className={value ? 'text-green-600' : 'text-red-600'}>
                  {value ? (key.includes('API_KEY') ? `${value.substring(0, 10)}...` : value) : 'Missing'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <a href="/" className="text-blue-600 hover:text-blue-800">← Ana sayfaya dön</a>
        </div>
      </div>
    </div>
  );
} 