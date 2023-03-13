import { Button } from '@/components/Button';
import { actions as uiActions } from '@/states/ui';
import React from 'react';

export function SettingsPanel() {
  return (
    <div className="flex gap-1 justify-center items-center">
      <span>OpenAI API Key</span>
      <Button
        size="tiny"
        className="bg-gray-400 hover:bg-gray-300"
        onClick={() => {
          uiActions.update({ showTokenDialog: true });
        }}
      >
        Configuration
      </Button>
    </div>
  );
}
