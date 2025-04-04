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
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="aero-card p-12 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
          <h1 className="text-3xl font-bold">Loading your tee times...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070')] bg-cover bg-center bg-no-repeat p-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 -z-10" />

      <header className="w-full max-w-4xl mb-12">
        <div className="aero-card p-6 mb-6">
          <h1 className="text-4xl font-bold text-primary mb-2">Match Play</h1>
          <h2 className="text-2xl">Your Profile</h2>
        </div>
      </header>

      <main className="w-full max-w-4xl aero-card p-8">
        <h3 className="text-xl font-semibold mb-6">Your Tee Times</h3>

        {teeTimes.length > 0 ? (
          <div className="space-y-4">
            {teeTimes.map((teeTime) => (
              <div
                key={teeTime.id}
                className="aero-card p-4 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{teeTime.course}</h4>
                    <p className="text-foreground/80">{teeTime.date} at {teeTime.time}</p>
                    <p className="text-sm text-foreground/60">{teeTime.players} players</p>
                  </div>
                  <button className="glass-button">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-light flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
              </svg>
            </div>
            <p className="text-foreground/80 mb-8 text-lg">You don&apos;t have any tee times scheduled.</p>
            <button
              onClick={handleBookTeeTime}
              className="primary-gradient text-white font-bold py-3 px-8 rounded-full shadow-lg hover:translate-y-[-2px] transition-all duration-300"
            >
              Book a Tee Time
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
