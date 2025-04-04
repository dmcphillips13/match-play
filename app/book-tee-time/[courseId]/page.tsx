'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TeeTimeSlot {
  id: string;
  time: string;
  availableSpots: number;
  price: string;
}

// Mock data for golf courses
const courseData = {
  'pinehill': {
    name: 'Pine Hill Golf Club',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop',
  },
  'meadows': {
    name: 'The Meadows',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop',
  },
  'lakeside': {
    name: 'Lakeside Golf Course',
    imageUrl: 'https://images.unsplash.com/photo-1510534316479-a9b4893f7e5a?q=80&w=2069&auto=format&fit=crop',
  },
  'oakridge': {
    name: 'Oak Ridge Country Club',
    imageUrl: 'https://images.unsplash.com/photo-1611165334142-b8455843c91e?q=80&w=2070&auto=format&fit=crop',
  },
};

export default function CourseTeeTimes({ params }: { params: { courseId: string; }; }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState<TeeTimeSlot[]>([]);

  const courseId = params.courseId;
  const courseName = courseData[courseId as keyof typeof courseData]?.name || 'Course Not Found';
  const courseImage = courseData[courseId as keyof typeof courseData]?.imageUrl;

  // Get the next 7 days for date selection
  const getDateOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const dateStr = date.toISOString().split('T')[0];
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      options.push({ value: dateStr, label: formattedDate });
    }

    return options;
  };

  const dateOptions = getDateOptions();

  useEffect(() => {
    // Set default selected date to tomorrow
    setSelectedDate(dateOptions[0].value);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    setLoading(true);

    // Simulate API call to get available tee times for the selected date
    setTimeout(() => {
      // Generate mock tee time data
      const mockTimeSlots: TeeTimeSlot[] = [];

      // Start at 7 AM
      const startHour = 7;
      const endHour = 19; // 7 PM

      for (let hour = startHour; hour < endHour; hour++) {
        // Create tee times at 10-minute intervals
        for (let minute = 0; minute < 60; minute += 10) {
          if (Math.random() > 0.3) { // 70% chance of having a time slot
            const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const spots = Math.floor(Math.random() * 4) + 1; // 1-4 spots
            const basePrice = 45 + Math.floor(Math.random() * 30); // $45-$75

            // Morning premium
            const price = hour < 10 ? basePrice + 10 : basePrice;

            mockTimeSlots.push({
              id: `${courseId}-${selectedDate}-${timeStr}`,
              time: timeStr,
              availableSpots: spots,
              price: `$${price}`,
            });
          }
        }
      }

      setAvailableTimes(mockTimeSlots);
      setLoading(false);
    }, 500);
  }, [selectedDate, courseId]);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleBackToCoursesClick = () => {
    router.push('/book-tee-time');
  };

  const handleSelectTimeSlot = (timeSlot: TeeTimeSlot) => {
    // TODO: In a real app, this would take you to a booking form or confirmation page
    alert(`TODO: Book tee time at ${courseName} on ${selectedDate} at ${timeSlot.time}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070')] bg-cover bg-fixed bg-center p-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 -z-10" />

      <header className="w-full max-w-6xl">
        <div className="aero-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-primary">Match Play</h1>
            <button
              onClick={handleBackToCoursesClick}
              className="glass-button"
            >
              Back to Courses
            </button>
          </div>
        </div>

        <div
          className="w-full h-64 bg-cover bg-center rounded-2xl mb-6 overflow-hidden relative"
        >
          <img
            src={courseImage}
            alt={courseName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <div className="aero-card p-6 -mb-16 w-full max-w-md">
              <h2 className="text-3xl font-bold">{courseName}</h2>
              <p className="text-primary mt-2">{dateOptions[0]?.label}</p>
            </div>
          </div>
        </div>

        <div className="aero-card p-6 mb-8 mt-16">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-xl font-semibold mb-3 sm:mb-0">Available Tee Times</h3>
            <div className="w-full sm:w-auto">
              <select
                value={selectedDate}
                onChange={handleDateChange}
                className="glass-button w-full text-center sm:w-auto border-none"
              >
                {dateOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl">
        {loading ? (
          <div className="aero-card p-12 flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="aero-card p-8">
            {availableTimes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableTimes.map((timeSlot) => (
                  <div
                    key={timeSlot.id}
                    onClick={() => handleSelectTimeSlot(timeSlot)}
                    className="aero-card p-5 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="text-xl font-bold text-center group-hover:text-primary transition-colors">
                      {parseInt(timeSlot.time.split(':')[0]) > 12
                        ? `${parseInt(timeSlot.time.split(':')[0]) - 12}:${timeSlot.time.split(':')[1]} PM`
                        : `${timeSlot.time} AM`}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-foreground/70 text-sm">
                        {timeSlot.availableSpots} {timeSlot.availableSpots === 1 ? 'spot' : 'spots'}
                      </div>
                      <div className="font-medium text-primary">
                        {timeSlot.price}
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-3 group-hover:via-primary transition-colors" />
                    <div className="mt-2 text-center">
                      <button className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Select →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-light flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-foreground/80 mb-4">No tee times available for this date.</p>
                <p className="text-primary">Please select another date.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
