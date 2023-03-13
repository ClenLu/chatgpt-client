export interface IMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface IChatGPTResponse {
  error?: {
    type: string;
    code: string;
    message: string;
  };
  created: number;
  choices: {
    index: number;
    message: IMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  // TODO: error
}

export interface IChat {
  id: string;
  createdAt: number;
  title: string;
  messages: IMessage[];
  systemMessage: string;
}
