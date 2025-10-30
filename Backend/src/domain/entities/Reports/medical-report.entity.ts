import { ReportType } from "../enums/Report/report-type.enum";
import { FileFormat } from "../enums/Files/files.enum";

export interface MedicalReport<T> {
  id: string;
  title: string;
  report_type: ReportType;
  generated_by: string;
  parameters?: T;
  data: T;
  file_url?: string;
  file_format?: FileFormat;
  is_public: boolean;
  shared_with: string[];
  period_start?: Date;
  period_end?: Date;
  generated_at: Date;
  expires_at?: Date;
}
