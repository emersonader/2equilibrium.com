import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import blogPosts from '../data/blogPosts.json';

interface ContentBlock {
  type: 'text' | 'heading' | 'image' | 'video';
  value?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        return (
          <h2 key={index} className="font-serif text-3xl md:text-4xl text-brand-navy mt-12 mb-6">
            {block.value}
          </h2>
        );

      case 'text':
        return (
          <p key={index} className="text-brand-navy/80 text-lg leading-relaxed mb-6 whitespace-pre-line">
            {block.value}
          </p>
        );

      case 'image':
        return (
          <figure key={index} className="my-12">
            <div className="relative overflow-hidden shadow-2xl">
              <img
                src={block.src}
                alt={block.alt || ''}
                className="w-full h-auto"
              />
            </div>
            {block.caption && (
              <figcaption className="text-center text-brand-navy/60 text-sm mt-4 italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'video':
        return (
          <figure key={index} className="my-12">
            <div className="relative overflow-hidden shadow-2xl aspect-video">
              <iframe
                src={block.src}
                title={block.alt || 'Video'}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {block.caption && (
              <figcaption className="text-center text-brand-navy/60 text-sm mt-4 italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-20">
      {/* Back to Blog Link */}
      <div className="bg-brand-cream py-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest text-xs font-bold">Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Post Header */}
      <article className="py-16 bg-brand-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Meta Info */}
          <div className="flex items-center gap-6 text-sm text-brand-navy/60 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-navy mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-brand-gold/20 text-brand-gold text-xs px-4 py-2 rounded-full uppercase tracking-wide font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Featured Image */}
          {post.image && (
            <div className="mb-12 shadow-2xl overflow-hidden mx-auto" style={{ maxWidth: '600px' }}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((block, index) => renderContentBlock(block, index))}
          </div>

          {/* Divider */}
          <div className="border-t border-brand-navy/10 my-16"></div>

          {/* Author Bio */}
          <div className="bg-brand-cream p-8 rounded-lg">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="/images/GraziellaBio.jpg"
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-brand-navy mb-2">About {post.author}</h3>
                <p className="text-brand-navy/70 leading-relaxed">
                  Certified Life Coach, Nutrition Expert, and creator of 2Equilibrium. With certifications in NLP, Positive Psychology, Personal Training, and Genetics-based Program Design, Graziella brings decades of expertise to help you achieve sustainable wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Want a guided 180-day wellness journey?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Download 2Equilibrium and start your wellness journey today.
          </p>
          
          <div className="bg-brand-gold/20 text-brand-gold px-6 py-3 rounded-full inline-block mb-10">
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

export default BlogPost;
