
import React from 'react';

const mockFeedItems = [
  { id: 1, type: 'Article', title: '5 Tips for Better Client Communication', source: 'ProConnect Magazine', time: '2h ago' },
  { id: 2, type: 'Video', title: 'Mastering the Art of Negotiation', source: 'SkillUp Academy', time: '8h ago' },
  { id: 3, type: 'Course', title: 'Advanced Plumbing Techniques', source: 'Trade School Online', time: '1d ago' },
  { id: 4, type: 'Article', title: 'How to Market Your Freelance Business', source: 'Indie Weekly', time: '2d ago' },
];

const FeedPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Learning & Growth</h1>
      <div className="space-y-4">
        {mockFeedItems.map(item => (
          <div key={item.id} className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold bg-gradient-to-r from-brand-secondary to-brand-primary text-white px-2 py-1 rounded-full">{item.type}</span>
                <h2 className="text-lg font-semibold text-white mt-2">{item.title}</h2>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0">{item.time}</span>
            </div>
            <p className="text-sm text-slate-400 mt-2">{item.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
