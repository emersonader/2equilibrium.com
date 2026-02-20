import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-blue via-brand-cream to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-brand-navy mb-6">
              Your 180-Day Guided <span className="text-brand-gold">Wellness Journey</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-brand-navy/80 mb-8 font-light">
              Daily lessons, journaling, nutrition tracking, and a supportive community — all in your pocket.
            </h2>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#download" className="bg-brand-navy text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-all duration-300 shadow-xl text-center">
                Download for iOS
              </a>
              <div className="bg-brand-navy/10 text-brand-navy px-10 py-4 uppercase tracking-widest text-xs font-bold text-center">
                Android Coming Soon
              </div>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[600px] w-full mt-10 lg:mt-0">
            <div className="absolute inset-4 border border-brand-gold/30 z-20"></div>
            <img
              src="/images/Florhome.png"
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
            Wellness isn't about restriction—it's about harmony. The 2Equilibrium app guides you through a gentle, sustainable transformation using daily lessons that unlock one at a time. No overwhelming information dumps. No punishing routines. Just progressive, nurturing guidance that adapts to your pace. Our approach combines mindful eating, gentle movement, and self-compassion to create lasting change that feels natural, not forced.
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
                src="/images/GraziellaBio.jpg"
                alt="Graziella DeSouza"
                className="absolute inset-0 w-full h-full object-cover z-10 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl"
              />
            </div>

            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-6">Meet Graziella</h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-6">
                Hi, I'm Graziella Cialone de Souza—a Nutrition and Lifestyle Coach who transformed my wellness system into the 2Equilibrium app. With certifications in Life Coaching, NLP, Positive Psychology, Personal Training, Nutrition, and Genetics-based Program Design, I've distilled decades of expertise into daily lessons you can access anytime, anywhere.
              </p>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-8">
                This app isn't just information—it's transformation. Every lesson, journal prompt, and movement suggestion comes from real experience helping people create sustainable change. I've taken everything that works and made it available to you in a format that respects your time, honors your pace, and meets you where you are.
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

      {/* 4-Phase Journey Overview */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-center">Your Complete Wellness Journey</h2>
          <p className="text-white/80 text-lg text-center mb-16 max-w-3xl mx-auto">
            The 2Equilibrium app is designed as a progressive journey through four transformative phases. Start with the 30-day Foundation, then continue growing through advanced phases (coming soon).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <div className="text-brand-gold text-sm font-bold mb-2">PHASE 1 • 30 DAYS</div>
              <h3 className="font-serif text-2xl mb-3">Foundation</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Building Your Wellness Base. Establish core habits and mindset through 6 chapters covering intention, nourishment, mindful eating, movement, and self-compassion.
              </p>
              <div className="mt-4 text-brand-gold font-bold text-xs">AVAILABLE NOW</div>
            </div>

            <div className="bg-white/5 backdrop-blur p-6 rounded-lg">
              <div className="text-white/50 text-sm font-bold mb-2">PHASE 2 • 60 DAYS</div>
              <h3 className="font-serif text-2xl mb-3 text-white/70">Momentum</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Deepening Your Practice. Build on your foundation with advanced strategies, deeper insights, and sustained progress.
              </p>
              <div className="mt-4 text-white/40 font-bold text-xs">COMING SOON</div>
            </div>

            <div className="bg-white/5 backdrop-blur p-6 rounded-lg">
              <div className="text-white/50 text-sm font-bold mb-2">PHASE 3 • 90 DAYS</div>
              <h3 className="font-serif text-2xl mb-3 text-white/70">Mastery</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Becoming Your Own Guide. Develop mastery and create your personalized wellness protocol for life.
              </p>
              <div className="mt-4 text-white/40 font-bold text-xs">COMING SOON</div>
            </div>

            <div className="bg-white/5 backdrop-blur p-6 rounded-lg">
              <div className="text-white/50 text-sm font-bold mb-2">PHASE 4 • 180 DAYS</div>
              <h3 className="font-serif text-2xl mb-3 text-white/70">Evolution</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Lifelong Wellness Integration. Integrate wellness as a permanent lifestyle and inspire others on their journey.
              </p>
              <div className="mt-4 text-white/40 font-bold text-xs">COMING SOON</div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Journey - 6 Chapters Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-4 text-center">Phase 1: Foundation</h2>
          <p className="text-brand-gold uppercase tracking-widest text-xs text-center mb-2">30 Days • 6 Chapters</p>
          <p className="text-brand-navy/60 text-center mb-16 max-w-2xl mx-auto">
            Your wellness journey begins here. Complete this foundational phase to unlock future phases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-cream p-8 shadow-lg">
              <div className="text-brand-gold text-sm font-bold mb-2">CHAPTER 1 • DAYS 1-5</div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Awakening Your Wellness Path</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Discover your 'why' and establish daily rhythms. Set intentions that resonate with your true desires and create a foundation for lasting change.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <div className="text-brand-gold text-sm font-bold mb-2">CHAPTER 2 • DAYS 6-10</div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Nourishment Fundamentals</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Learn the 70/30 rule, understand macronutrients, and discover how to nourish your body properly. Food becomes fuel, not fear.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <div className="text-brand-gold text-sm font-bold mb-2">CHAPTER 3 • DAYS 11-15</div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Mindful Eating Rituals</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                How we eat matters as much as what we eat. Master chewing, portions, and calorie density to transform your relationship with food.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <div className="text-brand-gold text-sm font-bold mb-2">CHAPTER 4 • DAYS 16-20</div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Meal Architecture</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Build balanced meals throughout the day. Create a sustainable structure for breakfast, lunch, dinner, and smart beverage choices.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <div className="text-brand-gold text-sm font-bold mb-2">CHAPTER 5 • DAYS 21-25</div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Gentle Movement Foundations</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Movement as self-care, not punishment. Embrace walking, post-meal movement, and joyful body flow that nurtures rather than depletes.
              </p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <div className="text-brand-gold text-sm font-bold mb-2">CHAPTER 6 • DAYS 26-30</div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Mindset & Self-Compassion</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                The inner work that sustains the outer changes. Cultivate self-talk, discipline, and compassion that support lifelong wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section id="download" className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-5xl md:text-6xl text-brand-navy mb-6">Your 180-Day Guided Wellness Journey</h2>
              <p className="text-brand-navy/70 text-xl leading-relaxed mb-8">
                Daily lessons, journaling, nutrition tracking, and a supportive community — all in your pocket.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-gold flex-shrink-0" />
                  <span className="text-brand-navy/80 text-lg">Daily lessons that unlock progressively</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-gold flex-shrink-0" />
                  <span className="text-brand-navy/80 text-lg">Guided journaling and reflection prompts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-gold flex-shrink-0" />
                  <span className="text-brand-navy/80 text-lg">Nutrition tracking made simple</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-gold flex-shrink-0" />
                  <span className="text-brand-navy/80 text-lg">Supportive community access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-gold flex-shrink-0" />
                  <span className="text-brand-navy/80 text-lg">Gentle movement suggestions</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="bg-brand-navy text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-all duration-300 shadow-xl text-center">
                  Download for iOS
                </a>
                <div className="bg-brand-navy/10 text-brand-navy px-8 py-4 uppercase tracking-widest text-xs font-bold text-center">
                  Android Coming Soon
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Phone mockup placeholder */}
              <div className="bg-gradient-to-br from-brand-navy via-brand-gold to-brand-cream p-8 rounded-3xl shadow-2xl max-w-md mx-auto">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-brand-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="font-serif text-2xl text-brand-navy mb-2">2EQUILIBRIUM</h4>
                  <p className="text-brand-navy/60 text-sm mb-4">Your wellness journey starts here</p>
                  <div className="space-y-2">
                    <div className="h-3 bg-brand-cream rounded-full"></div>
                    <div className="h-3 bg-brand-cream rounded-full w-3/4"></div>
                    <div className="h-3 bg-brand-cream rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Your Wellness Journey Starts Today
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Download the 2Equilibrium app and begin your transformation journey. With daily lessons that unlock one at a time, journaling tools to track your progress, and a gentle approach that honors your pace—transformation has never felt this natural.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#download" className="bg-brand-gold text-brand-navy px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300">
              Download for iOS
            </a>
            <div className="bg-white/10 text-white px-12 py-4 uppercase tracking-widest text-xs font-bold">
              Android Coming Soon
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
