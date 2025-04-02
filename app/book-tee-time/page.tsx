'use client';

import { useRouter } from 'next/navigation';

interface GolfCourse {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export default function BookTeeTimePage() {
  const router = useRouter();

  // Golf course data with images and descriptions
  const courses: GolfCourse[] = [
    {
      id: 'pinehill',
      name: 'Pine Hill Golf Club',
      imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop',
      description: 'Scenic 18-hole championship course nestled among towering pines.'
    },
    {
      id: 'meadows',
      name: 'The Meadows',
      imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop',
      description: 'Open layout with rolling fairways and challenging water features.'
    },
    {
      id: 'lakeside',
      name: 'Lakeside Golf Course',
      imageUrl: 'https://images.unsplash.com/photo-1510534316479-a9b4893f7e5a?q=80&w=2069&auto=format&fit=crop',
      description: 'Stunning waterfront views with signature holes along the lakefront.'
    },
    {
      id: 'oakridge',
      name: 'Oak Ridge Country Club',
      imageUrl: 'https://images.unsplash.com/photo-1611165334142-b8455843c91e?q=80&w=2070&auto=format&fit=crop',
      description: 'Premium private club featuring meticulously maintained greens.'
    },
  ];

  const handleCourseSelect = (courseId: string) => {
    // In a real app, this would navigate to a page showing available tee times
    router.push(`/book-tee-time/${courseId}`);
  };

  const handleBackToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <header className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-700">Match Play</h1>
          <button
            onClick={handleBackToProfile}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Profile
          </button>
        </div>
        <h2 className="text-2xl text-gray-700 mb-8">Select a Golf Course</h2>
      </header>

      <main className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseSelect(course.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-64 flex flex-col"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.imageUrl})` }}
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800">{course.name}</h3>
                <p className="text-gray-600 mt-1 text-sm flex-1">{course.description}</p>
                <div className="mt-2 text-blue-600 text-sm font-medium">
                  View available tee times →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
