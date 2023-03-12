import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';
import React from 'react';
import { useSnapshot, Icon } from 'umi';
import {
  state as globalState,
  actions as globalActions,
} from '@/states/global';
import { state as chatsState, actions as chatsActions } from '@/states/chats';
import { Message } from '@/components/Message';

function Messages() {
  const { config, ui } = useSnapshot(globalState);
  const { chats, chatsById } = useSnapshot(chatsState);
  const chat = ui.activeChatId ? chatsById[ui.activeChatId] : null;

  if (!chat) return null;

  return (
    <div>
      {chat.messages.map((message, index) => {
        const isAssistant = message.role === 'assistant';
        return (
          <div className="mb-2">
            <Message
              key={index}
              variant={isAssistant ? 'assistant' : 'default'}
            >
              {message.content}
            </Message>
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  const { config, ui } = useSnapshot(globalState);
  const { chats, chatsById } = useSnapshot(chatsState);
  const [text, setText] = React.useState('');
  const lineCount = text.split('\n').length;

  return (
    <>
      <div className="hidden lg:flex lg:fixed lg:w-80 lg:h-full bg-gray-700 p-2">
        <Button className="w-full bg-gray-600 hover:bg-gray-500">
          <Icon icon="ri:chat-3-fill" className="text-lg" />
          <span>New Chat</span>
        </Button>
      </div>
      <div className="lg:pl-80 h-full">
        <div className="sticky top-0 bg-white border-b">
          <div className="text-center py-2 font-bold text-lg">New Chat</div>
        </div>
        <div className="p-3">
          <Messages />
        </div>
        <div className="sticky left-0 bottom-0 right-0 bg-white">
          <hr className="mb-2" />
          <div className="flex gap-1 items-end">
            <Textarea
              placeholder="Your message here..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              style={{
                height: `${40 + 24 * (lineCount - 1)}px`,
              }}
            />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </>
  );
}
