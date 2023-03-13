import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'umi';
import {
  actions as globalActions,
  state as globalState,
} from '@/states/global';
import { actions as chatsActions, state as chatsState } from '@/states/chats';
import { actions as uiActions, state as uiState } from '@/states/ui';
import invariant from 'invariant';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { sendMessage } from '@/services/chatgpt';
import { IChat } from '@/types';

export function InputForm() {
  const textareaRef = React.createRef<HTMLTextAreaElement>();
  const { token, activeChatId } = useSnapshot(globalState);
  const { chatsById } = useSnapshot(chatsState);
  const { sending } = useSnapshot(uiState);
  const [text, setText] = useState('');
  const chat = activeChatId ? chatsById[activeChatId] : null;

  useEffect(() => {
    textareaRef.current?.focus();
  }, [chat]);

  async function submit() {
    if (!token) {
      uiActions.update({ showTokenDialog: true });
      return;
    }
    if (sending) {
      return;
    }
    invariant(text, 'text is required');
    let newChat = chat;
    if (!newChat) {
      newChat = chatsActions.create();
      globalActions.update({
        activeChatId: newChat.id,
      });
    }

    setText('');
    chatsActions.addMessage(newChat!.id, {
      role: 'user',
      content: text,
    });
    uiActions.update({ sending: true });
    const { data } = await sendMessage({
      messages: [
        { role: 'system', content: newChat!.systemMessage },
        ...newChat!.messages,
      ],
      token,
    });
    if (data.error) {
      chatsActions.addMessage(newChat!.id, {
        role: 'assistant',
        content: data.error.message,
      });
    } else {
      chatsActions.addMessage(newChat!.id, data.choices[0].message);
    }
    uiActions.update({ sending: false });
  }

  return (
    <form
      className="flex items-end space-x-2"
      onSubmit={async (e) => {
        e.preventDefault();
        await submit();
      }}
    >
      <Textarea
        ref={textareaRef}
        autoFocus={true}
        placeholder="Your Questions Here..."
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            await submit();
          }
        }}
        className="max-h-[400px]"
        style={{
          height: `${44 + (text.split('\n').length - 1) * 24}px`,
        }}
        value={text}
      />
      <Button type="submit" style={{ height: '44px' }}>
        Send
      </Button>
    </form>
  );
}
