import { Icon } from 'umi';
import { Button } from '@/components/Button';
import React from 'react';
import { actions as globalActions } from '@/states/global';

export function NewChatButton() {
  return (
    <Button
      className="w-full bg-gray-600 hover:bg-gray-500"
      onClick={() => {
        globalActions.update({ activeChatId: '' });
      }}
    >
      <Icon icon="ri:chat-3-fill" className="text-lg" />
      <span>New Chat</span>
    </Button>
  );
}
