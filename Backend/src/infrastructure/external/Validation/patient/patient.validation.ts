import { IsDate, IsPhoneNumber, IsString } from "class-validator";
import type { update_patient_dto } from "../../../../application/dto/Patient/patient.dto";

export class update_patient_validation implements update_patient_dto {
  @IsString()
  insurance_provider?: string;
  @IsString()
  insurance_number?: string;

  @IsDate()
  insurance_expiry?: Date;

  // Emergency contact details
  @IsString()
  emergency_name?: string;
  @IsPhoneNumber()
  emergency_phone?: string;
  @IsString()
  emergency_relation?: string;
}
