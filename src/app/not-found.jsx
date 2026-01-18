import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-9xl font-black text-primary opacity-20">404</h1>
      <h2 className="text-3xl font-bold -mt-10 mb-4">Page Not Found</h2>
      <p className="max-w-md opacity-60 mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been removed or renamed.
      </p>
      
      <Link href="/" className="btn btn-primary btn-wide shadow-xl">
        <FaSearch /> Back to Home
      </Link>
    </div>
  );
}