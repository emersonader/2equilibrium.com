import React, { useState } from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PHASES_DATA = [
  {
    number: 1,
    name: 'Foundation',
    subtitle: 'Building Your Wellness Base',
    description: 'Establish core habits and mindset through 6 chapters covering intention, nourishment, mindful eating, movement, and self-compassion.',
    status: 'AVAILABLE NOW',
    daysLabel: '30 DAYS',
    detailSubtitle: 'Your wellness journey begins here. Complete this foundational phase to unlock future phases.',
    chapters: [
      { number: 1, days: '1-5', title: 'Awakening Your Wellness Path', description: "Discover your 'why' and establish daily rhythms. Set intentions that resonate with your true desires and create a foundation for lasting change." },
      { number: 2, days: '6-10', title: 'Nourishment Fundamentals', description: 'Learn the 70/30 rule, understand macronutrients, and discover how to nourish your body properly. Food becomes fuel, not fear.' },
      { number: 3, days: '11-15', title: 'Mindful Eating Rituals', description: 'How we eat matters as much as what we eat. Master chewing, portions, and calorie density to transform your relationship with food.' },
      { number: 4, days: '16-20', title: 'Meal Architecture', description: 'Build balanced meals throughout the day. Create a sustainable structure for breakfast, lunch, dinner, and smart beverage choices.' },
      { number: 5, days: '21-25', title: 'Gentle Movement Foundations', description: 'Movement as self-care, not punishment. Embrace walking, post-meal movement, and joyful body flow that nurtures rather than depletes.' },
      { number: 6, days: '26-30', title: 'Mindset & Self-Compassion', description: 'The inner work that sustains the outer changes. Cultivate self-talk, discipline, and compassion that support lifelong wellness.' },
    ],
  },
  {
    number: 2,
    name: 'Momentum',
    subtitle: 'Deepening Your Practice',
    description: 'Build on your foundation with advanced strategies, deeper insights, and sustained progress.',
    status: 'COMING SOON',
    daysLabel: '30 DAYS',
    detailSubtitle: 'Deepen your practice and build unstoppable momentum toward your wellness goals.',
    chapters: [
      { number: 1, days: '1-5', title: 'Habit Stacking', description: 'Layer new wellness habits onto existing routines for effortless integration into your daily life.' },
      { number: 2, days: '6-10', title: 'Emotional Eating Mastery', description: 'Understand triggers, develop awareness, and create healthy coping strategies that replace emotional eating patterns.' },
      { number: 3, days: '11-15', title: 'Movement & Energy', description: 'Exercise basics and energy optimization. Build a sustainable movement practice that energizes rather than drains.' },
      { number: 4, days: '16-20', title: 'Sleep & Recovery', description: 'Optimize your sleep environment and routines for deeper rest, better recovery, and more energy throughout the day.' },
      { number: 5, days: '21-25', title: 'Stress Management', description: 'Practical techniques for managing daily stress including breathwork, mindfulness, and boundary setting.' },
      { number: 6, days: '26-30', title: 'Progress & Reflection', description: 'Assess your journey, celebrate wins, recalibrate goals, and prepare mentally for the next phase of growth.' },
    ],
  },
  {
    number: 3,
    name: 'Integration',
    subtitle: 'Lifestyle Design',
    description: 'Optimize your environment, master advanced eating strategies, unlock metabolic wisdom, and achieve mental mastery.',
    status: 'COMING SOON',
    daysLabel: '30 DAYS',
    detailSubtitle: 'Design a lifestyle that makes wellness your natural way of being.',
    chapters: [
      { number: 1, days: '1-5', title: 'Lifestyle Design', description: 'Environment and routine optimization. Create spaces and systems that support your wellness goals automatically.' },
      { number: 2, days: '6-10', title: 'Advanced Eating Strategies', description: 'Timing, social eating, and flexibility. Navigate real-world food situations with confidence and joy.' },
      { number: 3, days: '11-15', title: 'Metabolic Wisdom', description: 'Hormones, nutrients, and optimization. Understand how your body processes food and energy at a deeper level.' },
      { number: 4, days: '16-20', title: 'Mental Mastery', description: 'Mindset, motivation, and breakthrough thinking. Overcome mental barriers that hold you back from your full potential.' },
      { number: 5, days: '21-25', title: 'Body Awareness', description: 'Understanding your unique needs. Learn to listen to and interpret your body\'s signals for optimal wellness.' },
      { number: 6, days: '26-30', title: 'Sustainable Routines', description: 'Build routines that last. Create systems that keep you on track even when motivation fluctuates.' },
    ],
  },
  {
    number: 4,
    name: 'Mastery',
    subtitle: 'Resilience & Recovery',
    description: 'Build nutritional intelligence, master functional movement, and optimize your energy and vitality for life.',
    status: 'COMING SOON',
    daysLabel: '30 DAYS',
    detailSubtitle: 'Become your own wellness expert with advanced knowledge and intuitive self-care.',
    chapters: [
      { number: 1, days: '1-5', title: 'Resilience & Recovery', description: 'Bouncing back stronger from challenges. Develop mental and physical resilience for lifelong wellness.' },
      { number: 2, days: '6-10', title: 'Nutritional Intelligence', description: 'Advanced food science and application. Understand nutrients at a deeper level to fuel your unique body optimally.' },
      { number: 3, days: '11-15', title: 'Movement Mastery', description: 'Advanced fitness and functional movement. Build strength, flexibility, and endurance that serves your daily life.' },
      { number: 4, days: '16-20', title: 'Energy & Vitality', description: 'Optimizing energy throughout your life. Master the art of sustained energy without burnout.' },
      { number: 5, days: '21-25', title: 'Intuitive Living', description: 'Trust your body\'s wisdom. Develop intuitive eating, movement, and self-care practices.' },
      { number: 6, days: '26-30', title: 'Becoming Your Own Expert', description: 'Becoming your own wellness expert. Synthesize everything you\'ve learned into your personal wellness protocol.' },
    ],
  },
  {
    number: 5,
    name: 'Excellence',
    subtitle: 'Peak Performance',
    description: 'Advanced metabolic optimization, performance and recovery techniques, lifestyle medicine, and environmental mastery.',
    status: 'COMING SOON',
    daysLabel: '30 DAYS',
    detailSubtitle: 'Push beyond good health into peak performance and advanced wellness mastery.',
    chapters: [
      { number: 1, days: '1-5', title: 'Metabolic Optimization', description: 'Advanced metabolism and body composition. Fine-tune your metabolic health for peak performance.' },
      { number: 2, days: '6-10', title: 'Performance & Recovery', description: 'Peak performance and advanced recovery. Balance intensity with restoration for sustainable excellence.' },
      { number: 3, days: '11-15', title: 'Lifestyle Medicine', description: 'Advanced wellness and longevity practices. Incorporate evidence-based strategies for long-term health.' },
      { number: 4, days: '16-20', title: 'Environmental Mastery', description: 'Creating your optimal wellness environment. Design every space in your life to support your goals.' },
      { number: 5, days: '21-25', title: 'Advanced Mind-Body Connection', description: 'Deepen the connection between mental and physical wellness for holistic peak performance.' },
      { number: 6, days: '26-30', title: 'Excellence Integration', description: 'Bring all advanced practices together into a seamless daily protocol that feels effortless.' },
    ],
  },
  {
    number: 6,
    name: 'Legacy',
    subtitle: 'Lifelong Wellness Integration',
    description: 'Manage social influences, embrace continuous evolution, and become a leader who inspires wellness in others.',
    status: 'COMING SOON',
    daysLabel: '30 DAYS',
    detailSubtitle: 'Transform your personal wellness journey into a lasting legacy that inspires others.',
    chapters: [
      { number: 1, days: '1-5', title: 'Lifestyle Integration', description: 'Wellness as your natural way of life. Make every healthy choice feel automatic and joyful.' },
      { number: 2, days: '6-10', title: 'Social Influence', description: 'Managing social pressures and influences. Navigate relationships and social situations while staying true to your wellness path.' },
      { number: 3, days: '11-15', title: 'Continuous Evolution', description: 'Adapting and growing throughout life. Build a mindset of lifelong learning and continuous improvement.' },
      { number: 4, days: '16-20', title: 'Leadership & Service', description: 'Inspiring wellness in others. Share your journey and become a positive influence in your community.' },
      { number: 5, days: '21-25', title: 'Legacy Building', description: 'Create lasting impact beyond yourself. Define what wellness legacy means to you and your loved ones.' },
      { number: 6, days: '26-30', title: 'The Journey Continues', description: 'Celebrate your transformation and set intentions for the lifelong wellness journey ahead.' },
    ],
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPhase, setSelectedPhase] = useState(0);

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

      {/* 6-Phase Journey Overview */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-center">Your Complete Wellness Journey</h2>
          <p className="text-white/80 text-lg text-center mb-16 max-w-3xl mx-auto">
            The 2Equilibrium app is designed as a progressive journey through six transformative phases. Start with the 30-day Foundation, then continue growing through advanced phases (coming soon).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHASES_DATA.map((phase, index) => {
              const isSelected = selectedPhase === index;
              const isAvailable = phase.status === 'AVAILABLE NOW';
              return (
                <button
                  key={phase.number}
                  onClick={() => setSelectedPhase(index)}
                  className={`text-left backdrop-blur p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 ring-2 ring-brand-gold scale-[1.02]'
                      : isAvailable
                      ? 'bg-white/10 hover:bg-white/15'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`text-sm font-bold mb-2 ${isSelected || isAvailable ? 'text-brand-gold' : 'text-white/50'}`}>
                    PHASE {phase.number} • {phase.daysLabel}
                  </div>
                  <h3 className={`font-serif text-2xl mb-3 ${isSelected ? 'text-white' : isAvailable ? 'text-white' : 'text-white/70'}`}>
                    {phase.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/80' : isAvailable ? 'text-white/70' : 'text-white/50'}`}>
                    {phase.subtitle}. {phase.description}
                  </p>
                  <div className={`mt-4 font-bold text-xs ${isSelected || isAvailable ? 'text-brand-gold' : 'text-white/40'}`}>
                    {phase.status}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Phase Detail - 6 Chapters Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy mb-4 text-center">
            Phase {PHASES_DATA[selectedPhase].number}: {PHASES_DATA[selectedPhase].name}
          </h2>
          <p className="text-brand-gold uppercase tracking-widest text-xs text-center mb-2">30 Days • 6 Chapters</p>
          <p className="text-brand-navy/60 text-center mb-16 max-w-2xl mx-auto">
            {PHASES_DATA[selectedPhase].detailSubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PHASES_DATA[selectedPhase].chapters.map((chapter) => (
              <div key={chapter.number} className="bg-brand-cream p-8 shadow-lg">
                <div className="text-brand-gold text-sm font-bold mb-2">CHAPTER {chapter.number} • DAYS {chapter.days}</div>
                <h3 className="font-serif text-2xl text-brand-navy mb-4">{chapter.title}</h3>
                <p className="text-brand-navy/70 leading-relaxed">{chapter.description}</p>
              </div>
            ))}
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
