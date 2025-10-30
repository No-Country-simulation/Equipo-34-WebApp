export interface create_patient_dto {
  user_id: string;
}

export interface update_patient_dto {
  insurance_provider?: string;
  insurance_number?: string;
  insurance_expiry?: Date;

  // Emergency contact details
  emergency_name?: string;
  emergency_phone?: string;
  emergency_relation?: string;
}
