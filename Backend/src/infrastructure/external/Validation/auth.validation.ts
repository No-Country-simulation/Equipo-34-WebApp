import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from "class-validator";
import type {
  log_user_dto,
  register_user_dto,
} from "../../../application/dto/auth.dto";

export class log_user_validation implements log_user_dto {
  @IsString()
  id!: string;

  @IsNotEmpty({ message: "The email must not be empty" })
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: "The password must not be empty" })
  @IsString()
  password!: string;
}

export class register_user_validation implements register_user_dto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsPhoneNumber()
  phone!: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  role_id!: number;
}
