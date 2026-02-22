import React from 'react';
import { Check } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-brand-blue via-brand-cream to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] lg:h-[600px] w-full order-2 lg:order-1">
            <div className="absolute inset-4 border border-brand-gold/30 z-20"></div>
            <img
              src="/images/GraziellaBio.jpg"
              alt="Graziella DeSouza"
              className="absolute inset-0 w-full h-full object-cover z-10 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl"
            />
          </div>

          <div className="animate-fade-in-up order-1 lg:order-2">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-brand-navy mb-8">
              About <span className="text-brand-gold italic">Graziella</span>
            </h1>
            <p className="text-brand-navy/70 text-lg leading-relaxed font-light italic border-l-2 border-brand-gold pl-6">
              A passionate and dedicated Health Coach with a mission to empower individuals to achieve their best selves.
            </p>
          </div>
        </div>
      </section>

      {/* Welcome & Mission Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-8">Welcome!</h2>
          <div className="space-y-6 text-brand-navy/70 text-lg leading-relaxed">
            <p>
              I'm Graziella Cialone de Souza—a Nutrition and Lifestyle Coach who spent years helping clients one-on-one before realizing I could reach more people through technology. The 2Equilibrium app is my wellness system transformed into an accessible, lifetime companion that empowers you to transform at your own pace.
            </p>
            <p>
              With extensive certifications across multiple disciplines, I've distilled decades of knowledge into daily lessons designed for busy lives. This isn't generic advice—it's proven strategies that worked for hundreds of clients, now available in your pocket whenever you need them.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-12 text-center">My Qualifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Certified Life Coach',
              'NLP Practitioner',
              'Positive Psychology',
              'Certified Personal and Elite Trainer',
              'Nutritionist',
              'Genetics-based Program Designer',
              'Weight Management Specialist',
            ].map((credential, index) => (
              <div key={index} className="flex items-center gap-4 bg-brand-white p-6 shadow-md">
                <Check className="w-6 h-6 text-brand-gold flex-shrink-0" />
                <span className="text-brand-navy font-medium">{credential}</span>
              </div>
            ))}
          </div>

          <p className="text-brand-navy/70 text-lg leading-relaxed mt-12 text-center">
            These credentials allow me to provide a comprehensive, holistic approach that goes beyond conventional programs.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-8">My Philosophy</h2>
          <div className="space-y-6 text-brand-navy/70 text-lg leading-relaxed">
            <p>
              True transformation starts from within. That's why every lesson in the 2Equilibrium app integrates life coaching principles, positive psychology, and mindfulness alongside nutrition and movement guidance. You're not just learning what to eat—you're building the mindset that sustains lifelong wellness.
            </p>
            <p>
              The app uses intelligent frameworks informed by genetics-based program design, but delivers it in a gentle, nurturing way. Each daily lesson is designed to feel like having a supportive coach in your corner—one who respects your pace, celebrates small wins, and never makes you feel guilty for being human.
            </p>
            <p className="font-serif text-2xl text-brand-navy/90 italic border-l-4 border-brand-gold pl-6 py-4">
              "I created this app to be the supportive companion I wish everyone had—available 24/7, judgment-free, and designed around your real life."
            </p>
          </div>
        </div>
      </section>

      {/* App Features Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-8">What You'll Experience</h2>
          <div className="space-y-6 text-brand-navy/70 text-lg leading-relaxed">
            <p>
              The 2Equilibrium app is designed as a 6-month transformative journey through six progressive phases. You'll begin with the 30-day Foundation phase—6 chapters with daily lessons that unlock progressively—no overwhelm, just steady growth. Journal your mood and energy, track progress with visual analytics, and complete chapter quizzes to reinforce learning.
            </p>
            <p>
              Every lesson includes action steps, reflection prompts, movement suggestions, daily affirmations, and nourishment tips. It's comprehensive yet manageable—designed for real people with busy lives who want sustainable transformation, not quick fixes that fade. As you complete Foundation, future phases (Momentum, Integration, Mastery, Excellence, and Legacy) will deepen your practice.
            </p>
            <p className="font-serif text-xl text-brand-gold italic mt-8">
              Here's to your wellness journey,<br />
              Graziella
            </p>
          </div>
        </div>
      </section>

      {/* Professional Certifications Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-12 text-center">Professional Certifications</h2>

          <div className="space-y-8">
            <div className="bg-brand-cream p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-navy mb-2">Certified Life Coach</h3>
              <p className="text-brand-navy/70">International Coaching Federation</p>
              <p className="text-brand-gold text-sm mt-2">Awarded March 2020</p>
            </div>

            <div className="bg-brand-cream p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-navy mb-2">Positive Psychology Practitioner Certificate</h3>
              <p className="text-brand-navy/70">The Flourishing Center</p>
              <p className="text-brand-gold text-sm mt-2">Obtained September 2019</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Start Your Transformation Today
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Download the 2Equilibrium app and begin your transformation journey. Join thousands discovering that sustainable wellness doesn't require sacrifice—just the right guidance at the right pace.
          </p>
          <button className="bg-brand-gold text-brand-navy px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300">
            Download the App
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
