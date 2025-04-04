'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseRedirector({ params }: { params: { courseId: string; }; }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the correct route in the golf-courses section
    router.push(`/golf-courses/${params.courseId}`);
  }, [params.courseId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="aero-card p-8">
        <p>Redirecting to golf course tee time booking...</p>
      </div>
    </div>
  );
}
