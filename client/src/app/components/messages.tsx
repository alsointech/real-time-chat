'use client'

import React, { useEffect, useState } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const GET_MESSAGES = gql`
  query GetMessages($room: String!) {
    messages(room: $room) {
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

if (process.env.NODE_ENV === 'development') {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const room = 'general';

function Messages() {
  const [messages, setMessages] = useState([]);

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { room },
  });

  const { data: subscriptionData } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { room },
  });

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData) {
      setMessages((prevMessages) => [...prevMessages, subscriptionData.messageAdded]);
    }
  }, [subscriptionData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <b>{message.sender}</b>: {message.content}
        </div>
      ))}
    </div>
  );
}

export default Messages;