import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ApproachPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does the 2Equilibrium app work?',
      answer: 'The 2Equilibrium app is your comprehensive wellness companion. Through six progressive phases, you\'ll learn how to create your own wellness plan tailored to your goals, preferences, and lifestyle. The app guides you through daily lessons, mindful eating practices, progress tracking, journaling, and educational content—all designed to create sustainable transformation.'
    },
    {
      question: 'Is this another diet program?',
      answer: 'No. 2Equilibrium is a holistic wellness system, not a restrictive diet. We focus on building sustainable habits, understanding your relationship with food, and integrating wellness into your lifestyle. The app teaches you principles of balanced nutrition, mindful eating, and stress management that last a lifetime—not just weeks.'
    },
    {
      question: 'How does the app guide me without personal coaching?',
      answer: 'The app is built on evidence-based frameworks developed by a certified Nutrition and Lifestyle Coach. Through six progressive phases, daily lessons teach you how to understand your own body, build healthy habits, and create a wellness approach that works for your life. With journaling prompts, chapter quizzes, and actionable steps, you\'ll develop the knowledge and skills to become your own wellness guide.'
    },
    {
      question: 'Can I track my progress in the app?',
      answer: 'Absolutely! The 2Equilibrium app includes comprehensive tracking features for weight, energy levels, mood, measurements, and daily habits. Visual charts and progress analytics help you see your transformation over time. Weekly check-ins allow you to reflect on what\'s working and adjust your approach as needed.'
    },
    {
      question: 'What if I need help or have questions while using the app?',
      answer: 'The app includes an extensive knowledge library with articles, videos, and guides covering nutrition, wellness practices, and common challenges. You\'ll also find FAQ sections, troubleshooting tips, and community forums where you can connect with others on similar journeys. The app is designed to be your complete wellness resource.'
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-brand-blue via-brand-cream to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-brand-navy mb-6">
              Discover Your Path to <span className="text-brand-gold italic">Wellness</span>
            </h1>
            <h2 className="text-2xl md:text-3xl uppercase tracking-wide font-bold text-brand-navy mb-8">
              Achieve Balance with 2Equilibrium
            </h2>
            <p className="text-brand-navy/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light">
              Embrace a transformative journey that aligns with your lifestyle and wellness goals.
            </p>
          </div>
        </div>
      </section>

      {/* Approach Image Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative h-[400px] md:h-[500px] w-full">
            <div className="absolute inset-4 border border-brand-gold/30 z-20"></div>
            <img
              src="/images/Florhome.png"
              alt="Healthy Food and Wellness"
              className="absolute inset-0 w-full h-full object-cover z-10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-4 text-center">
            The 2Equilibrium Method
          </h2>
          <p className="text-brand-gold uppercase tracking-widest text-xs text-center mb-16">
            Six Pillars of Transformation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-brand-white p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Balanced Lifestyle Plan</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                We don't believe in restrictive diets or unsustainable habits. Our approach integrates wellness seamlessly into your existing life, creating harmony between your health goals and daily responsibilities. This means real, lasting transformation without burnout.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-brand-white p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Mindful Eating Strategies</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Learn to reconnect with your body's natural signals and develop a healthier relationship with food. Through mindfulness techniques, you'll discover how to make intuitive choices that support both your physical health and emotional well-being.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-brand-white p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Tailored Nutrition Plans</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                You will learn how to design a specific nutritional plan—considering your preferences, lifestyle, genetic predispositions, and health objectives. No cookie-cutter meal plans here. Every recommendation is crafted to ensure you actually enjoy the process.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-brand-white p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Holistic Wellness Approach</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                True transformation extends beyond the scale. We address stress management, sleep quality, mindset shifts, and emotional health alongside nutrition and movement. When all aspects of wellness align, sustainable change becomes inevitable.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="bg-brand-white p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Community Engagement</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                You're not alone on this journey. Join a supportive community of like-minded individuals who understand your challenges and celebrate your wins. Shared experiences, accountability, and encouragement create momentum that individual effort alone cannot achieve.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="bg-brand-white p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-serif text-2xl text-brand-navy mb-4">Innovative Approach</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Combining cutting-edge science with proven coaching methodologies, we leverage genetics-based insights, positive psychology, and personalized strategies. This isn't another fad diet—it's an evidence-based system designed for your unique biology and psychology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-12 text-center">
            Your Questions Answered
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-brand-cream border border-brand-navy/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-brand-cream/50 transition-colors"
                >
                  <span className="font-medium text-brand-navy pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-gold flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6 text-brand-navy/70 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Take the Next Step in Your Journey
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Ready to transform your lifestyle and achieve your wellness goals? Contact 2Equilibrium today to discover a personalized weight loss plan tailored just for you. Embrace the change and start your journey towards a healthier, balanced life.
          </p>
          <button className="bg-brand-gold text-brand-navy px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300">
            Get Your Plan
          </button>
        </div>
      </section>
    </div>
  );
};

export default ApproachPage;
