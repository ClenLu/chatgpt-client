import { Icon, useSnapshot } from 'umi';
import { state as chatsState } from '@/states/chats';
import type { IChat } from '@/types';
import {
  state as globalState,
  actions as globalActions,
} from '@/states/global';
import { actions as chatsActions } from '@/states/chats';
import clsx from 'clsx';
import { useRef, useState } from 'react';

function Chat(props: { chat: IChat }) {
  const { activeChatId } = useSnapshot(globalState);
  const { chat } = props;
  const isActive = activeChatId === chat.id;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={clsx('px-2 py-2 mb-2 flex gap-2 text-gray-200 items-center', {
        'bg-gray-600': isActive,
        'hover:bg-gray-500': !isActive,
      })}
    >
      <Icon icon="ri:chat-smile-3-line" className="" />
      <div
        className="flex-1 text-sm "
        onClick={() => {
          globalActions.update({ activeChatId: chat.id });
        }}
      >
        <h3>
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              ref={inputRef}
              autoFocus={true}
              className="bg-transparent text-white outline outline-cyan-50"
              onBlur={() => {
                chatsActions.update(chat.id, {
                  title,
                });
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  chatsActions.update(chat.id, {
                    title,
                  });
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            chat.title
          )}
        </h3>
      </div>
      <Icon
        icon="ri:edit-2-fill"
        className="text-gray-400 hover:text-white"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing((isEditing) => !isEditing);
        }}
      />
      <Icon
        icon="ri:delete-bin-5-fill"
        className="text-gray-400 hover:text-white"
        onClick={() => {
          if (confirm(`Delete chat ${chat.title}?`)) {
            chatsActions.delete(chat.id);
          }
        }}
      />
    </div>
  );
}

export function ChatsList() {
  const { chats, chatsById } = useSnapshot(chatsState);
  return (
    <div>
      {chats.map((chatId: string) => (
        <Chat key={chatId} chat={chatsById[chatId] as IChat} />
      ))}
    </div>
  );
}
