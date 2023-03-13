import React, { useEffect, useRef } from 'react';
import { MessagesList } from '@/bizComponents/MessagesList';
import { InputForm } from '@/bizComponents/InputForm';
import { NewChatButton } from '@/bizComponents/NewChatButton';
import { ChatsList } from '@/bizComponents/ChatsList';
import { actions as uiActions } from '@/states/ui';
import { ChatTitleBar } from '@/bizComponents/ChatTitleBar';
import { TokenDialog } from '@/bizComponents/TokenDialog';
import { Button } from '@/components/Button';
import { SettingsPanel } from '@/bizComponents/SettingsPanel';

export default function Page() {
  return (
    <>
      <div className="hidden lg:flex lg:fixed lg:w-80 lg:h-full bg-gray-700 flex flex-col">
        <div className="mb-4 p-2">
          <NewChatButton />
        </div>
        <div className="flex-1 p-2">
          <ChatsList />
        </div>
        <div className="bg-gray-500 text-white text-sm py-2">
          <SettingsPanel />
        </div>
      </div>
      <div className="lg:pl-80 h-full">
        <div className="sticky top-0 bg-white border-b">
          <ChatTitleBar />
        </div>
        <div className="p-3">
          <MessagesList />
        </div>
        <div className="sticky left-0 bottom-0 right-0 bg-white">
          <hr className="mb-2" />
          <InputForm />
        </div>
      </div>
      <TokenDialog />
    </>
  );
}
