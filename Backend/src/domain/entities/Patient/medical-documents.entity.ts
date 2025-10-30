import type { Patient } from "./patient.entity";
import type { Consultation } from "../Consults/consultation.entity";
import type { User } from "../User/user.entity";
import type { DocumentType } from "../enums/Documents/Medical-document.enum";

export interface MedicalDocument {
  id: string;
  patient_id: string;
  title: string;
  document_type: DocumentType;
  file_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  description?: string;
  consultation_id?: string;
  uploaded_by: string;
  is_sensitive: boolean;
  expiry_date?: Date;
  upload_date: Date;

  patient?: Patient;
  consultation?: Consultation;
  uploader?: User;
}
