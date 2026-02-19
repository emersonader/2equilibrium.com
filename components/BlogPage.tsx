import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import blogPosts from '../data/blogPosts.json';

const BlogPage: React.FC = () => {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue via-brand-cream to-brand-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-navy mb-6">
            Wellness <span className="text-brand-gold">Insights</span>
          </h1>
          <p className="text-brand-navy/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Expert guidance, inspiration, and practical tips for your wellness journey from Graziella and the 2Equilibrium team.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <article key={post.id} className="bg-brand-cream shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                {/* Featured Image */}
                {post.image && (
                  <div className="h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-brand-navy/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-2xl text-brand-navy mb-3 hover:text-brand-gold transition-colors">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-brand-navy/70 leading-relaxed mb-4 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-brand-gold/20 text-brand-gold text-xs px-3 py-1 rounded-full uppercase tracking-wide font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-brand-navy font-bold uppercase tracking-widest text-xs hover:text-brand-gold transition-colors group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {sortedPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-brand-navy/60 text-lg">
                No blog posts yet. Check back soon for wellness insights and tips!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Want a guided 180-day wellness journey?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Download 2Equilibrium — your first 30 days are free.
          </p>
          
          <div className="bg-brand-gold/20 text-brand-gold px-6 py-3 rounded-full inline-block mb-10">
            <span className="font-bold text-sm uppercase tracking-widest">First 30 Days Free</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="bg-brand-gold text-brand-navy px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300">
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

export default BlogPage;
