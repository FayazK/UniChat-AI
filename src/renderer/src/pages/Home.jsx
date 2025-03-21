import React from 'react';
import ChatContainer from '../components/Chat/ChatContainer';

const Home = () => {
  return (
    <div className="container mx-auto h-full flex flex-col p-2 md:p-4">
      <div className="bg-base-100 rounded-lg shadow-sm border border-base-300/50 h-full overflow-hidden flex flex-col">
        <ChatContainer />
      </div>
    </div>
  );
};

export default Home;
