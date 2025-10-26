import React from 'react';
import Header from '../Header';
import { Blog } from '../../../shared/types';

interface BlogsPageProps {
  onLoginClick: () => void;
  onNavigate: (page: 'landing' | 'search' | 'blogs') => void;
}

const mockBlogs: Blog[] = [
  {
    id: '1',
    title: "What's Next for Local Diary: Exciting Features on the Horizon!",
    excerpt: "We're constantly working to improve your experience. Get a sneak peek at the groundbreaking features we're launching soon, including real-time chat translation and project management tools.",
    imageUrl: 'https://picsum.photos/seed/features/800/400',
    category: 'Announcement',
    date: 'July 28, 2024',
  },
  {
    id: '2',
    title: 'How to Create a Standout Profile that Attracts Clients',
    excerpt: 'Your profile is your digital storefront. Learn the top 5 tips for crafting a compelling profile that turns visitors into paying customers.',
    imageUrl: 'https://picsum.photos/seed/profile/800/400',
    category: 'Tips & Tricks',
    date: 'July 25, 2024',
  },
  {
    id: '3',
    title: 'The Future of Local Work: A Post-Pandemic Analysis',
    excerpt: "The world of work has changed forever. Explore the trends shaping the future of local and freelance work, and how you can stay ahead of the curve.",
    imageUrl: 'https://picsum.photos/seed/future/800/400',
    category: 'Industry Insights',
    date: 'July 22, 2024',
  },
    {
    id: '4',
    title: 'A Day in the Life of a Local Electrician',
    excerpt: "Ever wondered what it's like to be an electrician? Follow along with an experienced pro as they navigate a typical day of challenges and triumphs.",
    imageUrl: 'https://picsum.photos/seed/electrician/800/400',
    category: 'Community Story',
    date: 'July 19, 2024',
  },
];

const BlogsPage: React.FC<BlogsPageProps> = ({ onLoginClick, onNavigate }) => {
  return (
    <div className="relative min-h-screen bg-brand-dark">
      <Header onLoginClick={onLoginClick} onNavigate={onNavigate} />
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">
            Insights & <span className="bg-clip-text text-transparent bg-gradient-primary">Updates</span>
          </h1>
          <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto mb-12">
            Stay informed with the latest news, tips, and stories from the Local Diary community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockBlogs.map(blog => (
              <div key={blog.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 flex flex-col group">
                <div className="overflow-hidden">
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold bg-gradient-to-r from-brand-secondary to-brand-primary text-white px-2 py-1 rounded-full">{blog.category}</span>
                    <span className="text-xs text-slate-400">{blog.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-2 flex-grow">{blog.title}</h2>
                  <p className="text-sm text-slate-300 mt-2 mb-4">{blog.excerpt}</p>
                  <a href="#" className="font-semibold text-brand-primary hover:underline self-start">Read More &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;