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
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <header className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-700">Match Play</h1>
          <button
            onClick={handleBackToCoursesClick}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Courses
          </button>
        </div>

        <div
          className="w-full h-48 bg-cover bg-center rounded-lg mb-6"
          style={{
            backgroundImage: `url(${courseData[courseId as keyof typeof courseData]?.imageUrl})`,
            backgroundPosition: 'center 30%'
          }}
        >
          <div className="w-full h-full flex items-end bg-gradient-to-t from-black/70 to-transparent p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-white">{courseName}</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-xl font-semibold mb-3 sm:mb-0">Available Tee Times</h3>
            <div className="w-full sm:w-auto">
              <select
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex justify-center py-12">
            <p className="text-gray-600">Loading available tee times...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {availableTimes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableTimes.map((timeSlot) => (
                  <div
                    key={timeSlot.id}
                    onClick={() => handleSelectTimeSlot(timeSlot)}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer flex flex-col items-center text-center"
                  >
                    <div className="text-xl font-bold">
                      {parseInt(timeSlot.time.split(':')[0]) > 12
                        ? `${parseInt(timeSlot.time.split(':')[0]) - 12}:${timeSlot.time.split(':')[1]} PM`
                        : `${timeSlot.time} AM`}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      {timeSlot.availableSpots} {timeSlot.availableSpots === 1 ? 'spot' : 'spots'} available
                    </div>
                    <div className="font-medium text-blue-600 mt-2">
                      {timeSlot.price}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No tee times available for this date. Please select another date.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
