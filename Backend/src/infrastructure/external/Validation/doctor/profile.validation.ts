import {
  IsBoolean,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from "class-validator";
import type {
  // create_doctor_dto,
  update_doctor_dto,
} from "../../../../application/dto/Doctor/doctor.dto";
import type { education_item } from "../../../../domain/entities/Doctor/education.entity";

export class create_doctor_profile_validation {
  //   @IsNotEmpty({ message: "User id is required" })
  //   @IsString()
  //   user_id!: string;

  @IsNotEmpty()
  @IsString()
  medical_license!: string;

  @IsString()
  specialty_id?: string;
  @IsString()
  bio?: string;

  @IsNumber()
  experience_years?: number;

  @IsJSON()
  education?: education_item[];

  @IsString()
  languages?: string[];

  @IsNumber()
  @IsPositive()
  consultation_fee?: number;

  @IsBoolean()
  accepts_insurance?: boolean;
  @IsBoolean()
  is_accepting_patients?: boolean;
}

export class update_doctor_profile_validation implements update_doctor_dto {
  @IsString()
  medical_license?: string;

  @IsString()
  specialty_id?: string;

  @IsString()
  bio?: string;

  @IsNumber()
  experience_years?: number;

  @IsJSON()
  education?: education_item[];

  @IsString()
  languages?: string[];

  @IsNumber()
  @IsPositive()
  consultation_fee?: number;

  @IsBoolean()
  accepts_insurance?: boolean;

  @IsBoolean()
  is_accepting_patients?: boolean;
}
