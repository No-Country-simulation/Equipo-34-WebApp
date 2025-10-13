export interface create_role_dto {
  role_name: string;
  description: string;
  permissions_id: number;
  created_at: Date;
}

export interface update_role_dto {
  role_name: string;
  description: string;
  permissions_id: number;
}
