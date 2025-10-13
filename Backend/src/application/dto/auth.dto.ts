export interface log_user_dto {
  email: string;
  password: string;
}

export interface register_user_dto {
  //id?: string;
  email: string;
  name: string;
  last_name: string;
  password: string;
  phone: string;
  emergency_contact?: string | null;
  two_factor_auth?: Date | null;
  role_id: number;
}

export interface update_user_dto {
  name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
}
