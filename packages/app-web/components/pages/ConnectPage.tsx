import React from 'react';
import { Conversation } from '../../../shared/types';

const mockConversations: Conversation[] = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/alice/200', lastMessage: 'Great, see you tomorrow at 10 AM.', timestamp: '10m ago' },
  { id: '2', name: 'Ben Carter', avatar: 'https://picsum.photos/seed/ben/200', lastMessage: 'I have a quick question about the faucet.', timestamp: '1h ago' },
  { id: '3', name: 'Chloe Davis', avatar: 'https://picsum.photos/seed/chloe/200', lastMessage: 'Thank you for the session!', timestamp: '3h ago' },
];

const ConnectPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Connect</h1>
      <div className="space-y-2">
        {mockConversations.map(convo => (
          <div key={convo.id} className="bg-slate-800 rounded-lg p-3 flex items-center space-x-4 shadow-lg border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer">
            <img src={convo.avatar} alt={convo.name} className="w-14 h-14 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-bold text-white">{convo.name}</h3>
                <span className="text-xs text-slate-400">{convo.timestamp}</span>
              </div>
              <p className="text-sm text-slate-300 truncate">{convo.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectPage;