export interface CarProps {
  vihicle_type?: string;
  vihicle_name?: string;
  hire_price?: number;
  postStatus?: string;
  year_manufatured?: number;
  no_of_passengers?: number;
  vihicle_images?: any
  vihicle_image?: any;
  isAvailable?:boolean;
  createdAt?: String;
  owner?:any
  _id?: string;
  location?: "Nairobi" | "Mombasa" | "Nakuru";
  transmission_type?: "manual" | "auto";
  badge?: "Hire" | "Sale";
  features?: string[];
  description?: string;
  fuel_consumption?: string;
}

export interface CarTypeProps {
  type: string;
  image?: any;
}

export interface UserProps {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  active: boolean;
  tnc: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackagesProps {
  _id?:string,
  title:string,
  price:string,
  limit:string,
  leads:boolean,
  promoted:boolean,
  packages?:any
}

export const make = [
  "sedan",
  "suv",
  "hatchback",
  "stationWagon",
  "sickUp",
  "van",
  "coupe",
];
export const features = [
  "Air Conditioning",
  "FM Radio",
  "Sunroof",
  "Bluetooth",
  "Power Windows",
  "Tinted Windows",
  "Reverse Camera",
];



