import axios from 'axios';
import type { IChatGPTResponse, IMessage } from '@/types';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function sendMessage(opts: {
  messages: IMessage[];
  token: string;
}) {
  const res = await axios.post<IChatGPTResponse>(
    API_URL,
    {
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      top_p: 0.8,
      presence_penalty: 1.0,
      max_tokens: 500,
      messages: opts.messages,
      stream: false,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${opts.token}`,
      },
      validateStatus: () => true,
    },
  );
  if (!res) {
    throw new Error('Network Error');
  }
  if (res.data.error) {
    throw new Error(res.data.error.message);
  }
  return res;
}
