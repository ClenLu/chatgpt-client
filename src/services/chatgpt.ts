import axios from 'axios';
import type { IChatGPTResponse, IMessage } from '@/types';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function sendMessage(opts: {
  messages: IMessage[];
  token: string;
}) {
  return await axios.post<IChatGPTResponse>(
    API_URL,
    {
      model: 'gpt-3.5-turbo',
      // TODO: more arguments
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${opts.token}`,
      },
    },
  );
}
