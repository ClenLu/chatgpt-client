import { Button } from '@/components/Button';
import { Message } from '@/components/Message';
import { Textarea } from '@/components/Textarea';
import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/Dialog';
import { Input } from '@/components/Input';

export default function Component() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div>
        <Button>Test</Button>
        <Button variant="ghost">Test</Button>
        <Button size="large">Test</Button>
        <Button size="small">Test</Button>
      </div>
      <div>
        <Textarea placeholder="Your question here..." />
      </div>
      <div>
        <Message>Ping</Message>
      </div>
      <div>
        <Message variant="assistant">Pong</Message>
      </div>
      <div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Dialog
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Test</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogBody>
            <Input placeholder="Your token here..." />
          </DialogBody>
          <DialogFooter>
            <Button>Submit</Button>
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}
