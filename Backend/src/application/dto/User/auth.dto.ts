import { Role } from "../../../domain/entities/enums/User/role.enum";
import { Gender } from "../../../domain/entities/enums/User/gender.enum";
export interface log_user_dto {
  email: string;
  password: string;
}

export interface register_user_dto {
  email: string;
  password: string;
  name: string;
  last_name: string;
  phone?: string;
  date_of_birth?: Date;
  dni?: string;
  emergency_contact?: string;
  gender?: Gender;
  role?: Role;
}

export interface update_user_dto {
  email?: string;
  phone?: string;
  dni?: string;
  emergency_contact?: string;
  gender?: Gender;
  avatar_url?: string;
}

export interface update_password_dto {
  current_password?: string;
  new_password?: string;
}
