import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ApproachPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I start a consultation with 2Equilibrium?',
      answer: 'To begin, simply reach out through our free video call to schedule an initial consultation. We\'ll discuss your goals and tailor a plan to suit your needs.'
    },
    {
      question: 'What communication methods are available?',
      answer: 'We offer multiple communication channels including video calls, email, and direct messaging to ensure you have the support you need when you need it.'
    },
    {
      question: 'How personalized are the plans?',
      answer: 'Every plan is completely customized to your unique lifestyle, preferences, dietary needs, and wellness goals. No two plans are the same.'
    },
    {
      question: 'Can I adjust my plan as my needs change?',
      answer: 'Absolutely! Your plan evolves with you. We provide ongoing support and make necessary adjustments to ensure your plan continues to meet your changing needs.'
    },
    {
      question: 'What support is available after the initial consultation?',
      answer: 'You\'ll receive continuous support through regular check-ins, progress reviews, and direct access to Graziella for guidance and accountability.'
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
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop"
              alt="Healthy Food and Wellness"
              className="absolute inset-0 w-full h-full object-cover z-10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-4 text-center">
            Crafting Your Personalized Plan
          </h2>
          <p className="text-brand-gold uppercase tracking-widest text-xs text-center mb-16">
            Our Process
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-brand-white p-8 shadow-lg relative">
              <div className="absolute -top-6 left-8 bg-brand-gold text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4 mt-4">Initial Consultation</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Our process begins with understanding your unique lifestyle, preferences, and goals. We believe that a one-size-fits-all approach doesn't work, which is why we take the time to get to know you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-brand-white p-8 shadow-lg relative">
              <div className="absolute -top-6 left-8 bg-brand-gold text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4 mt-4">Customized Plan Creation</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Next, we design a tailored plan that aligns with your daily routine and dietary preferences. This ensures that the plan is not only effective but also sustainable in the long run.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-brand-white p-8 shadow-lg relative">
              <div className="absolute -top-6 left-8 bg-brand-gold text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="font-serif text-2xl text-brand-navy mb-4 mt-4">Ongoing Support and Adjustment</h3>
              <p className="text-brand-navy/70 leading-relaxed">
                Finally, we provide ongoing support and make necessary adjustments to your plan, ensuring that it evolves with you and continues to meet your changing needs.
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
