import React from 'react';
import { Blog } from '../../../../types';
import { mockBlogs } from '../../src/data/blogs';

const BlogsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">The Local Diary Blog</h1>
          <p className="mt-1 text-md text-gray-500">Insights, stories, and tips for our community of local professionals.</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-indigo-600 font-semibold">{blog.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">{blog.title}</h2>
                <p className="mt-3 text-gray-600">{blog.excerpt}</p>
                <div className="mt-4 flex items-center">
                  <p className="text-sm text-gray-500">{blog.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;
