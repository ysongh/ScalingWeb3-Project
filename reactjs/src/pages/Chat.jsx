import { useClient } from '@xmtp/react-sdk';

function Chat() {
  const { client, error, isLoading, initialize } = useClient();

  console.log(client, initialize);

  if (error) {
    return "An error occurred while initializing the client";
  }

  if (isLoading) {
    return "Awaiting signatures...";
  }

  return "Chats";
}

export default Chat;