interface Event {
  id: number;
  title: string;
  type: string;
  description?: string;
  available_at: string;
  unavailable_at: string;
  limit: number;
  workshops?: any;
  picture: string;
  created_at: string;
  updated_at: string;
  customer_id?: number;
  engagement_id?: number;
  claimed_at?: string;
  interested: number;
}