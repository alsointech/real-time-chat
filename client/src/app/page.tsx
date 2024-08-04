'use client'

// import { useState } from 'react';
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
import { useState } from 'react';

const users = [
  { name: 'John', id: '1' },
  { name: 'Jane', id: '2' },
];

const rooms = [
  { name: 'Room 1', id: '1' },
  { name: 'Room 2', id: '2' },
];

const data = {
  messages: [
    { sender: 'John', content: 'Hello', timestamp: '2021-05-05T14:48:00.000Z' },
    { sender: 'Jane', content: 'World world from machupchu', timestamp: '2021-05-05T14:49:00.000Z' },
  ]
};

const room = 'general';

const GET_MESSAGES = gql`
  query GetMessages($room: String!) {
    messages(room: $room) {
      sender
      content
      timestamp
    }
  }
`;

const POST_MESSAGE = gql`
  mutation PostMessage($sender: String!, $room: String!, $content: String!) {
    postMessage(sender: $sender, room: $room, content: $content) {
      sender
      content
      timestamp
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded($room: String!) {
    messageAdded(room: $room) {
      sender
      content
      timestamp
    }
  }
`;

const { data: subscriptionData } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { room } });

const Home = () => {
  const [currentSender, setCurrentSender] = useState('');

  useState(() => {
    const storedSender = sessionStorage.getItem('sender');
    if (storedSender) {
      setCurrentSender(storedSender);
    }
  });

  // const [room, setRoom] = useState('');
  // const [content, setContent] = useState('');

  // const { data, loading } = useQuery(GET_MESSAGES, { variables: { room } });
  // const [postMessage] = useMutation(POST_MESSAGE);
  // const { data: subscriptionData } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { room } });

  /* const handleSendMessage = () => {
    postMessage({ variables: { sender, room, content } });
    setContent('');
  }; */

  // if (loading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col h-screen'>
      {currentSender && <div className='flex flex-row w-full'>
        <div className='flex flex-col border border-gray-2000 rounded-md w-1/4'>
          <h2 className='text-2xl font-bold'>Rooms</h2>
          <ul>
            {rooms.map((room) => <li key={room.id}>{room.name}</li>)}
          </ul>
        </div>
        <div className='flex flex-col border border-yellow-500 rounded-md w-3/4'>
          <h2 className='text-2xl font-bold'>Room1</h2>
          <div className="flex flex-col space-y-4 p-4">
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
                  <p className="font-bold">{message.sender === currentSender ? '' : message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}
      {!currentSender && <div className='flex flex-col border border-gray-2000 rounded-md w-full'>
        <h2 className='text-2xl font-bold'>Who are you?</h2>
        <select onChange={(e) => {
          const selectedSender = e.target.value;
          setCurrentSender(selectedSender);
          sessionStorage.setItem('sender', selectedSender);
        }}>
          <option value="">Select a user</option>
          {users.map((user) => <option key={user.id} value={user.name}>{user.name}</option>)}
        </select>
      </div>}
    </div>
  );
};

export default Home