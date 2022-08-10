interface Unit {
  id: number;
  customer_id: number;
  vehicle_id: number;
  police_number: string;
  date_of_buy: string;
  condition: string;
  color: string;
  chassis_number: string;
  real_kilometer: number;
  predicted_kilometer: number;
  vehicle: Vehicle;
  created_at: string;
  updated_at: string;
}

interface Vehicle {
  id: number;
  manufacture_id: number;
  brand: string;
  type: string;
  year: string;
  cc: number;
  picture?: any;
  created_at: string;
  updated_at: string;
  manufacture: Manufacture;
}

interface Manufacture {
  id: number;
  name: string;
  country_of_manufacture?: any;
  logo: string;
  created_at: string;
  updated_at: string;
}

interface MaintenanceItem {
  id: number;
  title: string;
  default_price: number;
  icon?: any;
  created_at: string;
  updated_at: string;
  progress: Progress;
}

interface Progress {
  total: number;
  finished: number;
}