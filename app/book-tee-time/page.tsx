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
    <div className="flex flex-col items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070')] bg-cover bg-fixed bg-center p-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 -z-10" />

      <header className="w-full max-w-6xl">
        <div className="aero-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-primary">Match Play</h1>
            <button
              onClick={handleBackToProfile}
              className="glass-button"
            >
              Back to Profile
            </button>
          </div>
          <h2 className="text-2xl mt-4">Select a Golf Course</h2>
        </div>
      </header>

      <main className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseSelect(course.id)}
              className="aero-card overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-72"
            >
              <div
                className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${course.imageUrl})` }}
              />
              <div className="p-5 flex-1 flex flex-col relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary-light rounded-bl-2xl flex items-center justify-center -mt-16 mr-4 aero-blur group-hover:bg-primary transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{course.name}</h3>
                <p className="text-foreground/80 mt-1 text-sm flex-1">{course.description}</p>
                <div className="mt-2 text-primary text-sm font-medium flex items-center">
                  View available tee times
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
