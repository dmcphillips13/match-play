'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Temporary type for TeeTimes
interface TeeTime {
  id: string;
  date: string;
  time: string;
  course: string;
  players: number;
}

export default function ProfilePage() {
  const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simulate loading tee times (in a real app, this would be an API call)
  useEffect(() => {
    // Simulating API call delay
    const timer = setTimeout(() => {
      // Currently returning empty array to simulate no tee times
      setTeeTimes([]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle booking a new tee time
  const handleBookTeeTime = () => {
    router.push('/book-tee-time');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Loading your tee times...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <header className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Match Play</h1>
        <h2 className="text-2xl text-gray-700 mb-8">Your Profile</h2>
      </header>

      <main className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Your Tee Times</h3>

        {teeTimes.length > 0 ? (
          <div className="space-y-4">
            {teeTimes.map((teeTime) => (
              <div
                key={teeTime.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{teeTime.course}</h4>
                    <p className="text-gray-600">{teeTime.date} at {teeTime.time}</p>
                    <p className="text-sm text-gray-500">{teeTime.players} players</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-6">You don&apos;t have any tee times scheduled.</p>
            <button
              onClick={handleBookTeeTime}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Book a Tee Time
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
