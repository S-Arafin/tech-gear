'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      bg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      bg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      bg: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  return (
    <section className="relative h-[90vh] w-full">
      <Swiper
        spaceBetween={0}
        effect={'fade'}
        centeredSlides={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              <div className="absolute inset-0 bg-black/70" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-xl md:text-2xl font-bold text-secondary mb-4 tracking-widest uppercase">
            Welcome to TechGear
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 min-h-[160px] md:min-h-[auto]">
            Gear Up For{' '}
            <span className="text-primary block md:inline">
              <TypeAnimation
                sequence={[
                  'Gaming', 1500,
                  'Coding', 1500,
                  'Designing', 1500,
                  'Future', 2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Experience the pinnacle of performance with our curated collection of high-end hardware and accessories.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/items" className="btn btn-primary btn-lg shadow-lg shadow-primary/40 border-none hover:scale-105 transition-transform">
              Shop Catalog
            </Link>
            <Link href="/login" className="btn btn-outline btn-lg text-white hover:bg-white hover:text-black hover:border-white">
              Join Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}