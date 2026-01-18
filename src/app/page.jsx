'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRocket, FaShieldAlt, FaTruck, FaStar, FaQuoteRight } from 'react-icons/fa';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection'; 
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 overflow-x-hidden">
      
      <HeroSection />

      <section className="py-20 relative z-30 -mt-20 px-4">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: FaRocket, title: 'Ultra Fast', desc: 'Next-day delivery on all premium orders.', color: 'text-primary', border: 'border-primary' },
            { icon: FaShieldAlt, title: 'Secure Warranty', desc: '2-year comprehensive protection included.', color: 'text-secondary', border: 'border-secondary' },
            { icon: FaTruck, title: 'Global Shipping', desc: 'We ship to over 50 countries worldwide.', color: 'text-accent', border: 'border-accent' }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className={`card bg-base-100 shadow-xl border-t-4 ${feature.border}`}
            >
              <div className="card-body items-center text-center">
                <feature.icon className={`text-5xl mb-4 ${feature.color}`} />
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-base-content/70">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <FeaturedSection />

      <section className="py-20 bg-neutral text-neutral-content relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 z-10">
            <h2 className="text-4xl md:text-5xl font-bold">Built for Performance,<br/>Designed for You.</h2>
            <p className="text-lg opacity-80">
              We started TechGear with a simple mission: to provide developers and gamers with the hardware they deserve. 
              Our rigorous testing ensures every product meets the highest standards of quality and durability.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <span className="text-4xl font-bold text-primary block">50k+</span>
                <span className="text-sm opacity-70">Happy Customers</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-secondary block">100%</span>
                <span className="text-sm opacity-70">Satisfaction Rate</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-accent block">24/7</span>
                <span className="text-sm opacity-70">Expert Support</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-2xl translate-y-8" alt="Tech Office" />
              <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-2xl" alt="Gaming Setup" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Community Feedback</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card bg-base-200 p-8 hover:bg-base-300 transition-colors">
                <FaQuoteRight className="text-3xl text-primary mb-6 opacity-20 mx-auto" />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, s) => <FaStar key={s} className="text-yellow-400 text-sm" />)}
                </div>
                <p className="text-lg italic mb-6">"Absolutely incredible quality. The shipping was fast and the packaging was secure. Will definitely buy again."</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      <span>U{i}</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold">Alex Johnson</h4>
                    <span className="text-xs opacity-70">Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-primary-content text-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Upgrade?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of tech enthusiasts who have elevated their setup with TechGear.</p>
          <Link href="/items" className="btn btn-lg bg-white text-primary border-none hover:bg-gray-100 px-10">
            Start Shopping Now
          </Link>
        </motion.div>
      </section>

      <section className="py-16 bg-base-300 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-base-100 rounded-3xl p-10 shadow-xl border border-base-content/5">
            <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
            <p className="text-base-content/70 mb-8">Get exclusive deals, early access to drops, and tech news.</p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="input input-bordered flex-1" required />
              <button className="btn btn-primary">Subscribe</button>
            </form>
            <p className="text-xs opacity-50 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}