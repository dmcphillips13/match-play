'use client';

import { useRouter } from 'next/navigation';

interface TeeTime {
  id: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  date: string;
  time: string;
  players: number;
  confirmed: boolean;
}

export default function UserTeeTimes() {
  const router = useRouter();

  // Mock data for user's tee times
  const upcomingTeeTimes: TeeTime[] = [
    {
      id: '123abc',
      courseId: 'pinehill',
      courseName: 'Pine Hill Golf Club',
      courseImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop',
      date: '2024-04-15',
      time: '09:30 AM',
      players: 4,
      confirmed: true,
    },
    {
      id: '456def',
      courseId: 'meadows',
      courseName: 'The Meadows',
      courseImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop',
      date: '2024-04-22',
      time: '10:15 AM',
      players: 3,
      confirmed: false,
    },
  ];

  const pastTeeTimes: TeeTime[] = [
    {
      id: '789ghi',
      courseId: 'lakeside',
      courseName: 'Lakeside Golf Course',
      courseImage: 'https://images.unsplash.com/photo-1510534316479-a9b4893f7e5a?q=80&w=2069&auto=format&fit=crop',
      date: '2024-03-28',
      time: '08:00 AM',
      players: 2,
      confirmed: true,
    },
  ];

  // Format date to a more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleBookNew = () => {
    router.push('/golf-courses');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="aero-card p-6 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Tee Times</h1>
          <button
            onClick={handleBookNew}
            className="glass-button primary-gradient text-white"
          >
            Book New Tee Time
          </button>
        </div>
      </div>

      {/* Upcoming Tee Times */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Upcoming Tee Times</h2>
        {upcomingTeeTimes.length > 0 ? (
          <div className="space-y-4">
            {upcomingTeeTimes.map((teeTime) => (
              <div key={teeTime.id} className="aero-card p-0 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${teeTime.courseImage})` }}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold">{teeTime.courseName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${teeTime.confirmed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {teeTime.confirmed ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-primary mt-2">
                        {formatDate(teeTime.date)} at {teeTime.time}
                      </p>
                      <p className="text-sm text-foreground/70 mt-1">
                        {teeTime.players} {teeTime.players === 1 ? 'player' : 'players'}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button className="glass-button text-sm">View Details</button>
                      {!teeTime.confirmed && (
                        <button className="glass-button text-sm">Confirm</button>
                      )}
                      <button className="glass-button text-sm text-red-500">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="aero-card p-8 text-center">
            <p className="text-foreground/70">You don&apos;t have any upcoming tee times.</p>
          </div>
        )}
      </div>

      {/* Past Tee Times */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Tee Times</h2>
        {pastTeeTimes.length > 0 ? (
          <div className="space-y-4">
            {pastTeeTimes.map((teeTime) => (
              <div key={teeTime.id} className="aero-card p-0 overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <div
                      className="w-full h-full bg-cover bg-center grayscale"
                      style={{ backgroundImage: `url(${teeTime.courseImage})` }}
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-bold">{teeTime.courseName}</h3>
                    <p className="text-lg font-medium mt-2">
                      {formatDate(teeTime.date)} at {teeTime.time}
                    </p>
                    <p className="text-sm text-foreground/70 mt-1">
                      {teeTime.players} {teeTime.players === 1 ? 'player' : 'players'}
                    </p>
                    <div className="mt-4">
                      <button className="glass-button text-sm">View Scorecard</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="aero-card p-8 text-center">
            <p className="text-foreground/70">You don&apos;t have any past tee times.</p>
          </div>
        )}
      </div>
    </div>
  );
}
