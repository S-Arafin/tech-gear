'use client';
import { useState, useEffect, Suspense } from 'react';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'required') {
      setErrorMsg('Please sign in to access that page.');
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // Fake delay for UX

    if (email === 'admin@test.com' && password === '123456') {
      Cookies.set('mock_token', 'true', { expires: 1 });
      router.push('/add-item');
      router.refresh(); 
    } else {
      setErrorMsg('Invalid Credentials');
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="card w-full max-w-md bg-base-100/80 backdrop-blur-xl shadow-2xl border border-white/20"
    >
      <form onSubmit={handleLogin} className="card-body p-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Welcome Back
          </h2>
          <p className="text-sm opacity-60 mt-2">Enter your credentials to access the admin panel.</p>
        </div>
        
        {errorMsg && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="alert alert-error text-sm py-3 mb-4 shadow-lg"
          >
            <FaExclamationCircle />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold">Email</span>
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input 
              type="email" 
              placeholder="admin@test.com" 
              className="input input-bordered w-full pl-12 focus:input-primary transition-all bg-base-200/50" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control mb-8">
          <label className="label">
            <span className="label-text font-bold">Password</span>
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input 
              type="password" 
              placeholder="••••••" 
              className="input input-bordered w-full pl-12 focus:input-primary transition-all bg-base-200/50" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary w-full shadow-lg shadow-primary/30 group" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              Login <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="divider text-xs opacity-50 mt-6">Secure Access</div>
      </form>
    </motion.div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen relative flex justify-center items-center overflow-hidden bg-base-300">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 p-4 w-full flex justify-center">
        <Suspense fallback={<div className="loading loading-ring loading-lg text-primary"></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}