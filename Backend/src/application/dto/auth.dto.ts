export interface log_user_dto {
  email: string;
  password: string;
}

export interface register_user_dto {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role_id: number;
}
