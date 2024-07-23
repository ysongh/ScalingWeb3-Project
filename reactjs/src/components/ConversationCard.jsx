import React from 'react';
import { useLastMessage } from "@xmtp/react-sdk";

function ConversationCard({ topic }) {
  const lastMessage = useLastMessage(topic);
  console.log(lastMessage);
  return (
    <div>
      <p>{lastMessage.content}</p>
    </div>
  )
}

export default ConversationCard;