import { useSnapshot } from 'umi';
import { state as globalState } from '@/states/global';
import { state as chatsState } from '@/states/chats';
import { state as uiState } from '@/states/ui';
import { IMessage } from '@/types';
import { Message } from '@/components/Message';
import React, { useEffect, useRef } from 'react';

export function MessagesList() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { activeChatId } = useSnapshot(globalState);
  const { chatsById } = useSnapshot(chatsState);
  const { sending } = useSnapshot(uiState);
  const chat = activeChatId ? chatsById[activeChatId] : null;

  useEffect(() => {
    // why setTimeout?
    // since it's conflict with focus() in InputForm.tsx
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [chat]);

  if (!chat) return null;

  return (
    <div>
      {(chat.messages as IMessage[]).map((message, index) => {
        const isAssistant = message.role === 'assistant';
        return (
          <div className="mb-2" key={index}>
            <Message variant={isAssistant ? 'assistant' : 'default'}>
              {message.content}
            </Message>
          </div>
        );
      })}
      {sending && (
        <Message key="sending" variant="assistant">
          Thinking...
        </Message>
      )}
      <div key="ending" ref={messagesEndRef} />
    </div>
  );
}
