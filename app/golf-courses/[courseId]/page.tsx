'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getGolfCourse } from '../../api/data';

interface Course {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  phone: string | null;
  website: string | null;
  par: number | null;
  holes: number;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: Date;
  dateString: string;
  times: TimeSlot[];
}

// Generate mock tee times for today and the next 6 days
const generateTeeTimes = (): DaySchedule[] => {
  const days: DaySchedule[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    // Generate 5 tee times for each day
    const times: TimeSlot[] = [];
    for (let hour = 7; hour < 17; hour += 2) {
      times.push({
        id: `time-${i}-${hour}`,
        time: `${hour}:00 AM`,
        available: Math.random() > 0.3, // 70% chance of being available
      });
    }

    days.push({
      date,
      dateString: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      times,
    });
  }

  return days;
};

export default function CourseTeeTimes({ params }: { params: { courseId: string; }; }) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [teeTimes, setTeeTimes] = useState<DaySchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [players, setPlayers] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        setLoading(true);
        // Fetch the course from the API
        const courseData = await getGolfCourse(params.courseId);
        setCourse(courseData);
        setTeeTimes(generateTeeTimes());
        setSelectedDate(new Date()); // Default to today
        setError(null);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course information. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (params.courseId) {
      fetchCourseData();
    } else {
      // No course ID provided
      router.push('/golf-courses');
    }
  }, [params.courseId, router]);

  const handleBookTeeTime = () => {
    // In a real app, this would make an API call to book the tee time
    alert(`Booking confirmed at ${course?.name} for ${selectedDate?.toLocaleDateString()} at ${selectedTime} for ${players} players`);
    router.push('/book-tee-time');
  };

  const handleBack = () => {
    router.push('/golf-courses');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="aero-card p-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading course information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="aero-card p-8 max-w-md">
          <div className="flex flex-col items-center text-center">
            <div className="text-red-500 mb-4 text-2xl">⚠️</div>
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => router.push('/golf-courses')}
              className="glass-button primary-gradient text-white"
            >
              Return to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="aero-card p-8">
          <p>Course not found. <button onClick={handleBack} className="text-primary">Return to Courses</button></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div
          className="h-64 rounded-xl bg-cover bg-center mb-6 relative overflow-hidden"
          style={{ backgroundImage: `url(${course.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <button
              onClick={handleBack}
              className="glass-button mb-4"
            >
              Back to Courses
            </button>
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <p className="text-xl opacity-90">Book a Tee Time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="aero-card p-6">
              <h2 className="text-xl font-bold mb-4">Available Tee Times</h2>

              {/* Date selector */}
              <div className="flex overflow-x-auto pb-4 mb-6 space-x-2">
                {teeTimes.map((day) => (
                  <button
                    key={day.dateString}
                    onClick={() => setSelectedDate(day.date)}
                    className={`py-2 px-4 rounded-lg whitespace-nowrap flex-shrink-0 transition-colors ${selectedDate && selectedDate.toDateString() === day.date.toDateString()
                      ? 'bg-primary text-white'
                      : 'bg-primary-light text-foreground hover:bg-primary/20'
                      }`}
                  >
                    {day.dateString}
                  </button>
                ))}
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {teeTimes.find(d => d.date.toDateString() === selectedDate.toDateString())?.times.map((slot: TimeSlot) => (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 rounded-lg text-center transition-all ${!slot.available
                        ? 'bg-foreground/10 text-foreground/40 cursor-not-allowed'
                        : selectedTime === slot.time
                          ? 'bg-primary text-white'
                          : 'bg-primary-light text-foreground hover:bg-primary/20'
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="aero-card p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground/70">Course</h3>
                  <p className="text-lg">{course.name}</p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground/70">Date</h3>
                  <p className="text-lg">
                    {selectedDate
                      ? selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })
                      : 'Select a date'}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground/70">Time</h3>
                  <p className="text-lg">{selectedTime || 'Select a time'}</p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground/70">Players</h3>
                  <div className="flex items-center mt-1 space-x-3">
                    <button
                      onClick={() => setPlayers(Math.max(1, players - 1))}
                      className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center"
                      disabled={players <= 1}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-6 text-center">{players}</span>
                    <button
                      onClick={() => setPlayers(Math.min(4, players + 1))}
                      className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center"
                      disabled={players >= 4}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleBookTeeTime}
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-3 rounded-lg mt-8 font-medium transition-all ${selectedDate && selectedTime
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-foreground/20 text-foreground/40 cursor-not-allowed'
                    }`}
                >
                  Book Tee Time
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
