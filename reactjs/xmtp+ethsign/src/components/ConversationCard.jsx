import React from 'react';
import { useMessages, useLastMessage } from "@xmtp/react-sdk";

function ConversationCard({ topic, conversation }) {
  const lastMessage = useLastMessage(topic);
  const { messages, isLoading } = useMessages(conversation);

  console.log(lastMessage, messages);
  return (
    <div>
      <p>{lastMessage?.content}</p>
      <div>
        {messages?.map(m => (
          <div key={m.id}>
            <p>{m.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversationCard;