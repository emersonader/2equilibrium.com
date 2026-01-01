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
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2776&auto=format&fit=crop"
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
              I'm Graziella, a passionate and dedicated Health Coach with a mission to empower individuals to achieve their best selves. Over the years, I have had the privilege of helping countless clients transform their lives, guiding them on a journey to better health, sustainable weight management, and profound personal growth.
            </p>
            <p>
              With an extensive background and multiple certifications in the health and wellness industry, I bring a unique blend of expertise and empathy to each client I work with.
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
            These credentials allow me to provide a comprehensive, personalized approach that goes beyond conventional programs.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-8">My Philosophy</h2>
          <div className="space-y-6 text-brand-navy/70 text-lg leading-relaxed">
            <p>
              I believe that true transformation starts from within, which is why I integrate life coaching and positive psychology to help clients build lasting habits, boost self-confidence, and foster a mindset geared toward success.
            </p>
            <p>
              Whether we're focusing on developing a nutrition plan tailored to your unique needs, creating a fitness regimen that you'll love, or exploring genetics-based insights for more effective results, I'm here to guide you every step of the way.
            </p>
            <p className="font-serif text-2xl text-brand-navy/90 italic border-l-4 border-brand-gold pl-6 py-4">
              "My goal is to create a supportive and encouraging environment where you feel heard, motivated, and empowered to make lasting changes."
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Approach Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-8">Working Together</h2>
          <div className="space-y-6 text-brand-navy/70 text-lg leading-relaxed">
            <p>
              My approach centers on building a partnership with my clients. Together we identify and overcome any barriers holding you back, leveraging your strengths and aspirations to create a path toward your personal vision of health and well-being.
            </p>
            <p>
              If you're ready to take control of your health and experience a true transformation, I'm here to help. Let's embark on this journey together, unlocking your potential and paving the way for a healthier, happier, and more fulfilled life.
            </p>
            <p className="font-serif text-xl text-brand-gold italic mt-8">
              Here's to your success and well-being,<br />
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
            Unlock New Opportunities with 2Equilibrium
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Ready to begin your transformation journey? Let's work together to unlock your full potential and create the life you deserve.
          </p>
          <button className="bg-brand-gold text-brand-navy px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300">
            Join Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
