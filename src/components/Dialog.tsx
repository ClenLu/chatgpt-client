import { Dialog as HUDialog, DialogProps } from '@headlessui/react';

const Dialog = (props: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <HUDialog className="" open={props.open} onClose={props.onClose}>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-80 transition-opacity flex items-center justify-center">
        <HUDialog.Panel className="bg-white px-4 py-4 rounded-lg max-w-sm w-full">
          {props.children}
        </HUDialog.Panel>
      </div>
    </HUDialog>
  );
};

const DialogTitle = (props: { children: React.ReactNode }) => {
  return (
    <HUDialog.Title className="text-center text-xl font-bold mb-6">
      {props.children}
    </HUDialog.Title>
  );
};

const DialogDescription = (props: { children: React.ReactNode }) => {
  return (
    <HUDialog.Description className="text-sm text-slate-500 mb-4">
      {props.children}
    </HUDialog.Description>
  );
};

const DialogBody = (props: { children: React.ReactNode }) => {
  return <div className="mb-6">{props.children}</div>;
};

const DialogFooter = (props: { children: React.ReactNode }) => {
  return <div className="flex justify-end gap-2">{props.children}</div>;
};

export { Dialog, DialogTitle, DialogFooter, DialogBody, DialogDescription };
