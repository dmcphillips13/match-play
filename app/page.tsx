import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to profile page
  redirect('/profile');
}
