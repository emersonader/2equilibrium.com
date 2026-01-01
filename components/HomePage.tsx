import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PricingTier, TierLevel } from '../types';

const TIERS: PricingTier[] = [
  {
    id: 'circle',
    name: TierLevel.CIRCLE,
    monthlyPrice: 97,
    annualPrice: 930,
    tagline: 'The System.',
    features: ['Weekly dashboard review by Graziella', 'Monthly group Q&A', 'The 2Equilibrium Method™', 'Graziella\'s Private Vault'],
    cta: 'Join The Circle'
  },
  {
    id: 'mentorship',
    name: TierLevel.MENTORSHIP,
    monthlyPrice: 297,
    annualPrice: 2850,
    tagline: 'The Guidance.',
    features: ['Everything in Circle', '2× monthly 1:1 video calls', 'Priority Feedback Card', 'Direct Message Access'],
    cta: 'Apply for Mentorship',
    isPopular: true
  },
  {
    id: 'private',
    name: TierLevel.PRIVATE,
    monthlyPrice: 597,
    annualPrice: 5730,
    tagline: 'The Inner Circle.',
    features: ['Everything in Mentorship', 'Weekly 30-min strategy calls', 'Unlimited Voxer access', 'Personal plan adjustment weekly'],
    cta: 'Inquire for Private'
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-blue via-brand-cream to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-brand-navy mb-6">
              Welcome to <span className="text-brand-gold">2Equilibrium</span>
            </h1>
            <h2 className="text-2xl md:text-3xl uppercase tracking-wide font-bold text-brand-navy mb-8">
              ACHIEVE BALANCE IN EVERY STEP
            </h2>
            <p className="text-brand-navy/70 text-lg md:text-xl leading-relaxed max-w-lg mb-10 font-light border-l-2 border-brand-gold pl-6">
              Discover a new way to embrace wellness with personalized weight loss plans that fit effortlessly into your daily routine.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="bg-brand-navy text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-all duration-300 shadow-xl">
                Start Your Journey Now
              </button>
              <button className="bg-transparent text-brand-navy border border-brand-navy/20 hover:border-brand-navy px-10 py-4 uppercase tracking-widest text-xs font-bold transition-all">
                Get Your Free Video Call
              </button>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[600px] w-full mt-10 lg:mt-0">
            <div className="absolute inset-4 border border-brand-gold/30 z-20"></div>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2776&auto=format&fit=crop"
              alt="Wellness Journey"
              className="absolute inset-0 w-full h-full object-cover z-10 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-8 text-center">Our Philosophy</h2>
          <p className="text-brand-navy/70 text-lg leading-relaxed max-w-4xl mx-auto text-center">
            At 2Equilibrium, we believe that weight loss should be a harmonious part of your life, not a disruptive force. Our philosophy centers around creating personalized plans that adapt to your unique lifestyle, ensuring that your journey to wellness is both effective and sustainable. By focusing on your individual needs and preferences, we help you achieve your goals while maintaining balance and joy in your everyday activities.
          </p>
        </div>
      </section>

      {/* Graziella Bio Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] lg:h-[600px] w-full">
              <div className="absolute inset-4 border border-brand-gold/30 z-20"></div>
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2776&auto=format&fit=crop"
                alt="Graziella DeSouza"
                className="absolute inset-0 w-full h-full object-cover z-10 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl"
              />
            </div>

            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-6">Graziella DeSouza</h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-6">
                Hello, I am Graziella, a dedicated Health Coach with years of experience helping clients achieving lasting health and personal transformation. With a range of certifications, including Life Coach, NLP (Neuro Linguistic Programming), Positive Psychology, Personal Training, Elite Training, Nutrition, Genetics-based Program Design, and Weight Management Specialist, I offer a comprehensive approach to wellness.
              </p>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-8">
                I blend my expertise to guide and empower clients through personalized strategies that foster lasting change. By combining nutrition, fitness, mindset coaching, and tailored plans, I'll support you in overcoming barriers and building a healthier, happier life. Let's embark on your journey to success together!
              </p>
              <p className="font-serif text-xl italic text-brand-gold">— Graziella</p>
              <button
                onClick={() => navigate('/about')}
                className="mt-8 text-sm uppercase tracking-widest text-brand-navy hover:text-brand-gold transition-colors inline-flex items-center gap-2"
              >
                Full Bio
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - Features Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-4 text-center">What Sets Us Apart</h2>
          <p className="text-brand-gold uppercase tracking-widest text-xs text-center mb-16">Innovative Features</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-cream p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Tailored Nutrition Plans</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Our nutrition plans are customized to meet your dietary preferences and health goals, ensuring you enjoy every meal while progressing towards your ideal weight.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Mindful Eating Strategies</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Discover the power of mindful eating with our strategy that teaches you to listen to your body's needs and make better choices effortlessly.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Balanced Lifestyle Plan</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Our balanced lifestyle plan helps to integrate healthy habits into your routine, ensuring sustainable weight loss while managing your busy life.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Holistic Wellness Approach</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                We integrate mindfulness and stress management techniques to support your overall well-being, creating a balanced lifestyle that promotes long-term health.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Innovative Approach</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Our unique approach invites you to a journey of self-discovery. It combines personalized plans with an in-depth understanding of your preferences, ensuring your path to wellness by focusing on what works best for you.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Community Engagement</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Join a supportive community of like-minded individuals who share your goals, providing encouragement and inspiration throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl text-brand-navy mb-6">Choose Your Path</h2>
            <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto">
              Select the membership tier that aligns with your transformation goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`bg-brand-white p-8 shadow-xl relative ${tier.isPopular ? 'ring-2 ring-brand-gold scale-105' : ''}`}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 right-0 bg-brand-gold text-white text-xs uppercase tracking-widest px-4 py-2">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-serif text-3xl text-brand-navy mb-2">{tier.name}</h3>
                  <p className="text-brand-navy/60 italic">{tier.tagline}</p>
                </div>

                <div className="mb-8">
                  <p className="text-5xl font-bold text-brand-navy mb-2">
                    ${tier.monthlyPrice}
                    <span className="text-lg font-normal text-brand-navy/60">/mo</span>
                  </p>
                  <p className="text-sm text-brand-navy/60">
                    or ${tier.annualPrice} annually
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-brand-navy/70">
                      <Check className="w-5 h-5 text-brand-gold flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-brand-navy text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-all duration-300">
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Take the First Step Towards a Healthier You
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Embark on your path to wellness with 2Equilibrium. Our personalized plans are designed to seamlessly integrate into your daily routine, ensuring effective and sustainable weight loss. Don't wait to rethink, readjust, and rebalance your life. Join us today and take the first step towards achieving your weight loss goals.
          </p>
          <button className="bg-brand-gold text-brand-navy px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
