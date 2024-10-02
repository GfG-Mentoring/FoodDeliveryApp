interface Location {
  type: string; // Should typically be "Point"
  coordinates: [number, number]; // Longitude, Latitude
}

interface FoodItem {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  available: boolean;
  _id: string;
}

export interface Restaurant {
  location: Location;
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  cuisine: string;
  rating: number;
  deliveryAvailable: boolean;
  foodItems: FoodItem[];
}
