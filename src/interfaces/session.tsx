export interface Session {
  id?: string;
  title?: string;
  ticket_number?: string;
  summary?: string;
  note?: string;
  status?: "active" | "finished" | "";
  messages?: any[];
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    photo?: string;
  }
  tags?: string[]; 
}