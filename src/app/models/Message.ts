export interface Message{
  _id?: string;
  content: string;
  senderId?: string;
  date: Date;
  recipientId?: string;
  sentByActualUser?: boolean;
  read?: boolean;
}
