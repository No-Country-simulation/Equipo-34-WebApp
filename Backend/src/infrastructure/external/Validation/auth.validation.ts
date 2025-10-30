import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import type {
  log_user_dto,
  register_user_dto,
} from "../../../application/dto/User/auth.dto";
import { Role } from "../../../domain/entities/enums/User/role.enum";

export class log_user_validation implements log_user_dto {
  @IsNotEmpty({ message: "The email must not be empty" })
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: "The password must not be empty" })
  @IsString()
  password!: string;
}

export class register_user_validation implements register_user_dto {
  @IsNotEmpty({ message: "Name must not be empty" })
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  last_name!: string;

  @IsNotEmpty({ message: "The email must not be empty" })
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: "The password must not be empty" })
  @IsString()
  password!: string;

  @IsPhoneNumber()
  phone?: string;

  @IsDate()
  date_of_birth?: Date;

  @IsPhoneNumber()
  emergency_contact?: string;

  dni?: string;

  @IsEnum(Role)
  role?: Role;
}
