import React from 'react';
import { Check, Sparkles, BookOpen, Brain, Utensils, Trophy, Bell } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue via-brand-cream to-brand-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-navy mb-6">
            Start Your <span className="text-brand-gold">Transformation</span>
          </h1>
          <p className="text-brand-navy/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            180 days of expert-guided wellness lessons, journaling, quizzes, and nutrition tracking — all for less than a coffee a day.
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-lg mx-auto px-6">
          <div className="bg-brand-cream border-2 border-brand-gold/30 shadow-2xl relative overflow-hidden">
            {/* Badge */}
            <div className="bg-brand-gold text-brand-navy text-center py-3 px-6">
              <p className="text-xs uppercase tracking-[0.2em] font-bold">
                Full Access — Cancel Anytime
              </p>
            </div>

            <div className="p-10 md:p-12 text-center">
              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-brand-navy/50 text-2xl font-medium">$</span>
                  <span className="font-serif text-7xl md:text-8xl font-bold text-brand-navy">19</span>
                  <span className="text-brand-navy/50 text-2xl font-medium">.99</span>
                </div>
                <p className="text-brand-navy/60 text-sm uppercase tracking-[0.15em] mt-2">per month</p>
              </div>

              {/* Divider */}
              <div className="w-16 h-1 bg-brand-gold mx-auto mb-8" />

              {/* Features */}
              <ul className="text-left space-y-4 mb-10">
                {[
                  'New lesson unlocked every day',
                  '180 expert-crafted daily lessons',
                  '36 chapter quizzes to test your progress',
                  'Guided journaling with mood & energy tracking',
                  'Nutrition tracking tools',
                  'Daily push notification reminders',
                  'Subscription ends when you complete the program',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-brand-navy/80 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#download"
                className="block w-full bg-brand-navy text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 text-center"
              >
                Download & Start Free
              </a>

              <p className="text-brand-navy/40 text-xs mt-4">
                Download the app free. Subscribe when you're ready.
              </p>
            </div>
          </div>

          {/* Trust line */}
          <p className="text-center text-brand-navy/50 text-sm mt-8">
            No contracts. No hidden fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy text-center mb-4">
            What You Get
          </h2>
          <p className="text-brand-navy/60 text-center text-lg mb-16 max-w-2xl mx-auto">
            Everything you need for a complete wellness transformation, designed by a certified nutrition and lifestyle coach.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: '180 Daily Lessons',
                description: 'One lesson per day, progressively building your knowledge across 6 phases — from Foundation to Legacy.',
              },
              {
                icon: Brain,
                title: '36 Chapter Quizzes',
                description: 'Test your understanding at the end of each chapter. Reinforce what you\'ve learned and track your growth.',
              },
              {
                icon: Sparkles,
                title: 'Guided Journaling',
                description: 'Daily prompts for reflection, gratitude, and self-discovery. Track your mood and energy levels over time.',
              },
              {
                icon: Utensils,
                title: 'Nutrition Tracking',
                description: 'Log meals and understand your eating patterns. Build awareness around what nourishes your body best.',
              },
              {
                icon: Trophy,
                title: 'Progress & Badges',
                description: 'Earn badges as you hit milestones. Visual reminders of how far you\'ve come on your wellness journey.',
              },
              {
                icon: Bell,
                title: 'Daily Reminders',
                description: 'Customizable push notifications to keep you on track. Gentle nudges, not nagging — wellness on your schedule.',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-brand-white p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="w-10 h-10 text-brand-gold mb-5" />
                <h3 className="font-serif text-xl text-brand-navy mb-3">{feature.title}</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 6 Phases Overview */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-4">
            Your 180-Day Journey
          </h2>
          <p className="text-brand-navy/60 text-lg mb-16 max-w-2xl mx-auto">
            Six phases, each 30 days. A structured path from building your wellness base to creating a lasting legacy of health.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { phase: 1, name: 'Foundation', subtitle: 'Building Your Wellness Base', days: 'Days 1–30' },
              { phase: 2, name: 'Momentum', subtitle: 'Deepening Your Practice', days: 'Days 31–60' },
              { phase: 3, name: 'Integration', subtitle: 'Lifestyle Design', days: 'Days 61–90' },
              { phase: 4, name: 'Mastery', subtitle: 'Resilience & Recovery', days: 'Days 91–120' },
              { phase: 5, name: 'Excellence', subtitle: 'Peak Performance', days: 'Days 121–150' },
              { phase: 6, name: 'Legacy', subtitle: 'Lifelong Wellness', days: 'Days 151–180' },
            ].map((phase) => (
              <div key={phase.phase} className="bg-brand-cream p-6 text-left border border-brand-navy/5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-3 py-1 rounded-full">
                    Phase {phase.phase}
                  </span>
                  <span className="text-brand-navy/40 text-xs uppercase tracking-wider">{phase.days}</span>
                </div>
                <h3 className="font-serif text-lg text-brand-navy mb-1">{phase.name}</h3>
                <p className="text-brand-navy/50 text-sm">{phase.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy text-center mb-16">
            Common Questions
          </h2>

          <div className="space-y-8">
            {[
              {
                q: 'Is there a free trial?',
                a: 'The app is free to download. You can explore the interface and sign up when you\'re ready to begin your 180-day journey.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Cancel your subscription at any time with no penalties or hidden fees. Your access continues until the end of your current billing period.',
              },
              {
                q: 'What happens when I finish all 180 lessons?',
                a: 'Your subscription automatically ends when you complete the program — you won\'t be charged after that. The full journey is yours.',
              },
              {
                q: 'Can I go at my own pace?',
                a: 'One new lesson unlocks each day. This intentional pacing prevents overwhelm and gives you time to practice and reflect on each lesson before moving forward.',
              },
              {
                q: 'Who created the program?',
                a: 'Graziella Cialone de Souza — a certified Nutrition and Lifestyle Coach with certifications in Life Coaching, NLP, Positive Psychology, Personal Training, and Genetics-based Program Design.',
              },
              {
                q: 'Is this available on Android?',
                a: 'Currently available on iOS. Android is coming soon.',
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-brand-navy/10 pb-8">
                <h3 className="font-serif text-xl text-brand-navy mb-3">{faq.q}</h3>
                <p className="text-brand-navy/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Ready to Begin?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            180 days from now, you could have a completely new relationship with food, movement, and yourself.
          </p>
          <p className="text-brand-gold text-3xl font-serif font-bold mb-8">
            $19.99/month
          </p>
          <a
            href="#download"
            className="inline-block bg-brand-gold text-brand-navy px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300"
          >
            Download for iOS
          </a>
          <p className="text-white/40 text-sm mt-4">Cancel anytime. No contracts.</p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
