interface Auth {
  token: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: string;
  updated_at: string;
  customer: Customer;
}

interface Customer {
  id: number;
  user_id: number;
  name: string;
  family_name?: any;
  phone_number?: any;
  birthdate: string;
  gender: string;
  address?: any;
  units_count?: number;
  active_unit: number;
  created_at: string;
  updated_at: string;
}