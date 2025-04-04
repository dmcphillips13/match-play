'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getGolfCourses } from '../api/data';

// Define a type that matches what comes from the API
interface GolfCourse {
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
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function GolfCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState<GolfCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const coursesData = await getGolfCourses();
        // Cast to the local GolfCourse type
        setCourses(coursesData as unknown as GolfCourse[]);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load golf courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const handleCourseSelect = (courseId: string) => {
    router.push(`/golf-courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="aero-card p-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading golf courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="aero-card p-8 max-w-md">
          <div className="flex flex-col items-center text-center">
            <div className="text-red-500 mb-4 text-2xl">⚠️</div>
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="glass-button primary-gradient text-white"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070')] bg-cover bg-fixed bg-center p-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 -z-10" />

      <header className="w-full max-w-6xl">
        <div className="aero-card p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Golf Courses</h1>
          <p className="text-foreground/80">Select a course to book a tee time</p>
        </div>
      </header>

      <main className="w-full max-w-6xl">
        {courses.length === 0 ? (
          <div className="aero-card p-8 text-center">
            <p>No golf courses available at the moment.</p>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
}
