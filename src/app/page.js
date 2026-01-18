'use client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRocket, FaShieldAlt, FaCogs, FaMicrochip } from 'react-icons/fa';

export default function Home() {
  return (
    <main data-theme="tech-gear" className="min-h-screen bg-base-200">
      <Navbar />

      {/* 1. Hero */}
      <div className="hero min-h-[70vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-primary"
            >
              Gear Up Future
            </motion.h1>
            <p className="py-6">High-performance tech gear for the modern developer.</p>
            <Link href="/items" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
      </div>

      {/* 2. Features */}
      <section className="py-20 px-4">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[FaRocket, FaShieldAlt, FaCogs].map((Icon, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="card bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <Icon className="text-4xl text-secondary mb-2"/>
                        <h2 className="card-title">Feature {i+1}</h2>
                        <p>Optimized performance.</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* 3. About */}
      <section className="hero py-20 bg-neutral text-neutral-content">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">About TechGear</h1>
            <p className="py-6">Built with Next.js 16 and Mongo Native Driver.</p>
          </div>
        </div>
      </section>

      {/* 4. Stats */}
      <div className="flex justify-center bg-base-100 py-10">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
                <div className="stat-title">Items</div>
                <div className="stat-value text-primary">500+</div>
            </div>
            <div className="stat">
                <div className="stat-title">Users</div>
                <div className="stat-value text-secondary">2K</div>
            </div>
        </div>
      </div>

      {/* 5. Testimonials */}
      <section className="py-20 bg-base-200">
          <h2 className="text-3xl text-center font-bold mb-10">Feedback</h2>
          <div className="flex justify-center gap-4 flex-wrap">
             {[1, 2].map((i) => (
                <div key={i} className="card w-80 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <p>"Best gear I've ever used."</p>
                        <div className="badge badge-accent">Verified</div>
                    </div>
                </div>
             ))}
          </div>
      </section>

      {/* 6. CTA */}
      <section className="py-20 text-center bg-primary text-primary-content">
        <h2 className="text-3xl font-bold mb-4">Join the Revolution</h2>
        <Link href="/login" className="btn btn-secondary btn-wide">Get Started</Link>
      </section>

      {/* 7. Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
            <FaMicrochip className="text-4xl"/>
            <p>TechGear Industries<br/>Providing reliable tech since 2024</p>
        </aside> 
        <nav>
            <h6 className="footer-title">Social</h6> 
            <a className="link link-hover">Twitter</a>
            <a className="link link-hover">Instagram</a>
        </nav>
      </footer>
    </main>
  );
}