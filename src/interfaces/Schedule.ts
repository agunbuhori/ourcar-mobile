interface Schedule {
  id: number;
  unit_id: number;
  workshop_id: number;
  session: number;
  reservated_at: string;
  reservation_available_at: string;
  reservation_unavailable_at: string;
  finished_at?: any;
  total_payment?: any;
  reservation_times: number;
  created_at: string;
  updated_at: string;
  workshop?: Workshop;
  maintenance_items: Maintenanceitem[];
}

interface Workshop {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  picture?: any;
  created_at: string;
  updated_at: string;
}

interface Maintenanceitem {
  id: number;
  title: string;
  default_price: number;
  icon?: any;
  created_at: string;
  updated_at: string;
  price: number;
  pivot: Pivot;
}

interface Pivot {
  maintenance_schedule_id: number;
  maintenance_item_id: number;
  price?: number;
}