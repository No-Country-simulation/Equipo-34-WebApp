export interface create_medical_center_dto {
  name: string;
  description?: string;

  // Address
  address_street: string;
  address_city: string;
  address_state: string;
  address_country: string;
  address_postal_code: string;

  // Contact
  phone?: string;
  email?: string;
  website?: string;

  // Coordinates
  latitude?: number;
  longitude?: number;

  // Operating hours
  opening_time?: string;
  closing_time?: string;
}

export interface update_medical_center_dto {
  name?: string;
  description?: string;

  // Address
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_country?: string;
  address_postal_code?: string;

  // Contact
  phone?: string;
  email?: string;
  website?: string;

  // Coordinates
  latitude?: number;
  longitude?: number;

  // Operating hours
  opening_time?: string;
  closing_time?: string;
}
