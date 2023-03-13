import {
  actions as globalActions,
  state as globalState,
} from '@/states/global';
import { actions as uiActions, state as uiState } from '@/states/ui';
import React, { useState } from 'react';
import { sendMessage } from '@/services/chatgpt';
import {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/Dialog';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useMutation, useSnapshot } from 'umi';

export function TokenDialog() {
  const { token: originToken } = useSnapshot(globalState);
  const [token, setToken] = useState(originToken);
  const { showTokenDialog } = useSnapshot(uiState);

  function onClose() {
    uiActions.update({ showTokenDialog: false });
  }

  const mutation = useMutation({
    async mutationFn() {
      return await sendMessage({
        messages: [{ role: 'system', content: 'ping' }],
        token,
      });
    },
  });

  async function handleSubmit() {
    if (mutation.isLoading) {
      return;
    }
    await mutation.mutateAsync();
    globalActions.update({ token });
    onClose();
  }

  return (
    <>
      <Dialog open={showTokenDialog} onClose={onClose}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <DialogTitle>Input Your API KEY</DialogTitle>
          <DialogDescription>
            You need an OpenAI API Key to work with this app. API key is stored
            locally.{' '}
            <a
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
            >
              Create one on OpenAI.
            </a>
          </DialogDescription>
          <DialogBody>
            {mutation.isError && (
              <div className="text-red-600 mb-4">
                {(mutation.error as Error).message}
              </div>
            )}
            <Input
              autoFocus={true}
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              onChange={(e) => {
                setToken(e.target.value);
              }}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  await handleSubmit();
                }
              }}
              value={token}
            />
          </DialogBody>
          <DialogFooter>
            <Button className="mr-2" type="submit">
              {mutation.isLoading ? 'Loading...' : 'Submit'}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
