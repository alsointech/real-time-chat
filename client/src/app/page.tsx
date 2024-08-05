'use client'
import { useState } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import Messages from './components/messages';


const users = [
  { name: 'John', id: '1' },
  { name: 'Jane', id: '2' },
  { name: 'Alex', id: '3' },
  { name: 'Martha', id: '3' },
];

const rooms = [
  { name: 'Room 1', id: '1' },
  { name: 'Room 2', id: '2' },
];

const data = {
  messages: [
    { sender: "John", content: "Hey Jane, how are you doing?", timestamp: "2023-05-05T14:48:00.000Z" },
    { sender: "Jane", content: "Hi John! I'm doing well, thanks for asking. How about you?", timestamp: "2023-05-05T14:49:00.000Z" },
    { sender: "John", content: "I'm good too. Did you hear about the new project we're starting next week?", timestamp: "2023-05-05T14:50:00.000Z" },
    { sender: "Jane", content: "No, I haven't. What's it about?", timestamp: "2023-05-05T14:51:00.000Z" },
    { sender: "John", content: "It's a big data analysis project for a major client. We'll be using machine learning algorithms.", timestamp: "2023-05-05T14:52:00.000Z" },
    { sender: "Jane", content: "That sounds exciting! I've been wanting to work on something like that.", timestamp: "2023-05-05T14:53:00.000Z" },
    { sender: "John", content: "Great! I'll recommend you for the team. We could use your expertise.", timestamp: "2023-05-05T14:54:00.000Z" },
    { sender: "Jane", content: "Thanks, John! I really appreciate that. Let me know if there's anything I should prepare.", timestamp: "2023-05-05T14:55:00.000Z" },
    { sender: "John", content: "Will do. How about we grab coffee later and I can fill you in on more details?", timestamp: "2023-05-05T14:56:00.000Z" },
    { sender: "Jane", content: "Sounds perfect. See you at the usual spot at 3?", timestamp: "2023-05-05T14:57:00.000Z" },
    { sender: "John", content: "See you then!", timestamp: "2023-05-05T14:58:00.000Z" },
  ]
};

if (process.env.NODE_ENV === 'development') {
  // Adds messages only in a dev environment
  console.log(loadDevMessages());
  console.log(loadErrorMessages());

}

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded($room: String!) {
    messageAdded(room: $room) {
      sender
      content
      timestamp
    }
  }
`;

const room = 'general';

const Home = () => {
  const [currentSender, setCurrentSender] = useState('');

  useState(() => {
    const storedSender = sessionStorage.getItem('sender');
    if (storedSender) {
      setCurrentSender(storedSender);
    }
  });

  // const { data: subscriptionData } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { room } });

  return (
    <div className='flex flex-col h-screen'>
      {currentSender && (
        <div className='flex flex-row w-full'>
          <div className='flex flex-col w-1/4 p-4'>
            <h2 className='text-2xl font-bold'>Rooms</h2>
            <ul>
              {rooms.map((room) => <li key={room.id} className='text-lg hover:bg-gray-200 hover:text-black p-2 rounded-md'>{room.name}</li>)}
            </ul>
          </div>
          <div className='flex flex-col border-l-2 border-yellow-500 w-3/4 p-4 h-full'>
            <h2 className='text-2xl font-bold text-center'>Room1</h2>
            <div className="flex flex-col space-y-4 p-4 overflow-y-auto">
              {/* <Messages /> */}
              {data?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === currentSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === currentSender
                      ? 'bg-yellow-600 text-black'
                      : 'bg-gray-800 text-ggray-200'
                      }`}
                  >
                    <p className="font-light text-xs">{message.sender === currentSender ? '' : message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1 flex justify-end">
                      {new Date(message.timestamp).getHours() + ':' + new Date(message.timestamp).getMinutes()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!currentSender && <div className='flex flex-col justify-center items-center h-full'>
        <div className='flex flex-col rounded-md w-2/4'>
          <h2 className='text-2xl font-bold text-center h-10'>Login</h2>
          <select className='h-10 text-black rounded-sm' defaultValue={'0'} onChange={(e) => {
            const selectedSender = e.target.value;
            setCurrentSender(selectedSender);
            sessionStorage.setItem('sender', selectedSender);
          }}>
            <option value="" className='text-black rounded-none' hidden>Select a user</option>
            {users.map((user) => <option className='text-black p-4' key={user.id} value={user.name}>{user.name}</option>)}
          </select>
        </div>
      </div>
      }

    </div>
  );
}
export default Home