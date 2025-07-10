
export interface User {
  id: string;
  username: string;
  name: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Symptom {
  id: string;
  name: string;
  description?: string;
  severity?: 'low' | 'medium' | 'high';
}