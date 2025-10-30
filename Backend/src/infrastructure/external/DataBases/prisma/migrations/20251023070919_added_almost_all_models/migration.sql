/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicalCenter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DoctorAffiliations` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('GENERAL', 'FOLLOW_UP', 'URGENT', 'ROUTINE_CHECKUP', 'SPECIALIST', 'TELECONSULTATION');

-- CreateEnum
CREATE TYPE "AppointmentPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- CreateEnum
CREATE TYPE "SmokingStatus" AS ENUM ('NEVER', 'FORMER', 'CURRENT');

-- CreateEnum
CREATE TYPE "AlcoholConsumption" AS ENUM ('NONE', 'OCCASIONAL', 'MODERATE', 'HEAVY');

-- CreateEnum
CREATE TYPE "ExerciseFrequency" AS ENUM ('NONE', 'RARELY', 'WEEKLY', 'DAILY');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('LAB_RESULT', 'IMAGE', 'XRAY', 'MRI', 'CT_SCAN', 'ULTRASOUND', 'PRESCRIPTION', 'MEDICAL_REPORT', 'CONSENT_FORM', 'INSURANCE', 'IDENTIFICATION', 'VACCINATION_RECORD', 'OTHER');

-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('VACATION', 'SICK_LEAVE', 'CONFERENCE', 'BREAK', 'UNAVAILABLE', 'OTHER');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('APPOINTMENT_REMINDER', 'APPOINTMENT_CONFIRMATION', 'APPOINTMENT_CANCELLATION', 'APPOINTMENT_RESCHEDULED', 'APPOINTMENT_STARTED', 'LAB_RESULT_READY', 'NEW_PRESCRIPTION', 'FOLLOW_UP_REMINDER', 'SECURITY_ALERT', 'ACCOUNT_VERIFICATION', 'PASSWORD_RESET', 'GENERAL', 'SYSTEM');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL', 'SMS', 'PUSH');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "FollowUpType" AS ENUM ('LAB_TEST', 'IMAGING_STUDY', 'SPECIALIST_VISIT', 'MEDICATION_REVIEW', 'SYMPTOM_MONITORING', 'VACCINATION', 'PHYSICAL_THERAPY', 'NUTRITION_CONSULT', 'PSYCHOLOGICAL_EVALUATION', 'GENERAL_CHECKUP');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "FollowUpPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('APPOINTMENT_STATS', 'PATIENT_DEMOGRAPHICS', 'MEDICAL_CONDITIONS', 'DOCTOR_PRODUCTIVITY', 'REVENUE_REPORT', 'MEDICAL_AUDIT', 'PATIENT_SATISFACTION', 'OPERATIONAL_METRICS', 'NO_SHOW_ANALYSIS');

-- CreateEnum
CREATE TYPE "FileFormat" AS ENUM ('PDF', 'EXCEL', 'CSV', 'JSON');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT', 'LOGIN', 'LOGOUT', 'LOGIN_FAILED', 'PASSWORD_CHANGE', 'PASSWORD_RESET', 'ACCOUNT_LOCKED', 'ACCOUNT_UNLOCKED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AppointmentStatus" ADD VALUE 'CONFIRMED';
ALTER TYPE "AppointmentStatus" ADD VALUE 'IN_PROGRESS';
ALTER TYPE "AppointmentStatus" ADD VALUE 'RESCHEDULED';

-- DropForeignKey
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_medical_center_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Doctor" DROP CONSTRAINT "Doctor_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Patient" DROP CONSTRAINT "Patient_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."_DoctorAffiliations" DROP CONSTRAINT "_DoctorAffiliations_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_DoctorAffiliations" DROP CONSTRAINT "_DoctorAffiliations_B_fkey";

-- DropTable
DROP TABLE "public"."Appointment";

-- DropTable
DROP TABLE "public"."Doctor";

-- DropTable
DROP TABLE "public"."MedicalCenter";

-- DropTable
DROP TABLE "public"."Patient";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."_DoctorAffiliations";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "dni" TEXT,
    "emergency_contact" TEXT,
    "gender" "Gender",
    "avatar_url" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PATIENT',
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "verification_token" TEXT,
    "verification_token_expires" TIMESTAMP(3),
    "password_reset_token" TEXT,
    "password_reset_expires" TIMESTAMP(3),
    "two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
    "two_factor_secret" TEXT,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "insurance_provider" TEXT,
    "insurance_number" TEXT,
    "insurance_expiry" TIMESTAMP(3),
    "emergency_name" TEXT,
    "emergency_phone" TEXT,
    "emergency_relation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "medical_license" TEXT NOT NULL,
    "specialty_id" TEXT,
    "bio" TEXT,
    "experience_years" INTEGER,
    "education" JSONB,
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "consultation_fee" DECIMAL(10,2),
    "accepts_insurance" BOOLEAN NOT NULL DEFAULT false,
    "rating_average" DECIMAL(3,2),
    "rating_count" INTEGER NOT NULL DEFAULT 0,
    "is_accepting_patients" BOOLEAN NOT NULL DEFAULT true,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_centers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address_street" TEXT NOT NULL,
    "address_city" TEXT NOT NULL,
    "address_state" TEXT NOT NULL,
    "address_country" TEXT NOT NULL,
    "address_postal_code" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "opening_time" TEXT,
    "closing_time" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_medical_centers" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "medical_center_id" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctor_medical_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    "appointment_type" "AppointmentType" NOT NULL DEFAULT 'GENERAL',
    "is_virtual" BOOLEAN NOT NULL DEFAULT false,
    "priority" "AppointmentPriority" NOT NULL DEFAULT 'NORMAL',
    "medical_center_id" TEXT,
    "consultation_room" TEXT,
    "teleconsult_url" TEXT,
    "teleconsult_id" TEXT,
    "reason" TEXT,
    "notes" TEXT,
    "patient_notes" TEXT,
    "cancellation_reason" TEXT,
    "cancelled_by" TEXT,
    "reminder_sent" BOOLEAN NOT NULL DEFAULT false,
    "reminder_sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "confirmed_at" TIMESTAMP(3),
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_histories" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "blood_type" "BloodType",
    "height" DECIMAL(5,2),
    "weight" DECIMAL(5,2),
    "allergies" TEXT,
    "chronic_conditions" TEXT,
    "current_medications" TEXT,
    "family_history" TEXT,
    "surgical_history" TEXT,
    "trauma_history" TEXT,
    "immunizations" JSONB,
    "habits" TEXT,
    "smoking_status" "SmokingStatus",
    "alcohol_consumption" "AlcoholConsumption",
    "exercise_frequency" "ExerciseFrequency",
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "chief_complaint" TEXT NOT NULL,
    "history_present_illness" TEXT,
    "symptoms" TEXT,
    "duration_minutes" INTEGER,
    "vital_signs" JSONB,
    "physical_exam" TEXT,
    "observations" TEXT,
    "diagnosis" TEXT,
    "diagnosis_codes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "treatment_plan" TEXT,
    "prescriptions" JSONB,
    "lab_orders" JSONB,
    "imaging_orders" JSONB,
    "recommendations" TEXT,
    "follow_up_required" BOOLEAN NOT NULL DEFAULT false,
    "follow_up_date" TIMESTAMP(3),
    "follow_up_notes" TEXT,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_documents" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "description" TEXT,
    "consultation_id" TEXT,
    "uploaded_by" TEXT NOT NULL,
    "is_sensitive" BOOLEAN NOT NULL DEFAULT false,
    "expiry_date" TIMESTAMP(3),
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medical_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_schedules" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "slot_duration" INTEGER NOT NULL DEFAULT 30,
    "break_time" INTEGER NOT NULL DEFAULT 0,
    "medical_center_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "valid_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_blocks" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "block_type" "BlockType" NOT NULL DEFAULT 'UNAVAILABLE',
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "is_recurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrence_pattern" TEXT,
    "recurrence_end" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "channel" "NotificationChannel" NOT NULL DEFAULT 'IN_APP',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "related_entity_type" TEXT,
    "related_entity_id" TEXT,
    "appointment_id" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "is_sent" BOOLEAN NOT NULL DEFAULT false,
    "scheduled_for" TIMESTAMP(3),
    "sent_at" TIMESTAMP(3),
    "read_at" TIMESTAMP(3),
    "priority" "NotificationPriority" NOT NULL DEFAULT 'NORMAL',
    "action_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_follow_ups" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "type" "FollowUpType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "due_date" TIMESTAMP(3) NOT NULL,
    "completed_date" TIMESTAMP(3),
    "notes" TEXT,
    "priority" "FollowUpPriority" NOT NULL DEFAULT 'MEDIUM',
    "consultation_id" TEXT,
    "assigned_to" TEXT,
    "status" "FollowUpStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_follow_ups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_reports" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "report_type" "ReportType" NOT NULL,
    "generated_by" TEXT NOT NULL,
    "parameters" JSONB,
    "data" JSONB NOT NULL,
    "file_url" TEXT,
    "file_format" "FileFormat",
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "shared_with" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "period_start" TIMESTAMP(3),
    "period_end" TIMESTAMP(3),
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "medical_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" "AuditAction" NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "old_values" JSONB,
    "new_values" JSONB,
    "description" TEXT,
    "request_id" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "error_message" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "data_type" TEXT NOT NULL DEFAULT 'string',
    "category" TEXT NOT NULL,
    "description" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_dni_key" ON "users"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "users_verification_token_key" ON "users"("verification_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_reset_token_key" ON "users"("password_reset_token");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "patients_user_id_key" ON "patients"("user_id");

-- CreateIndex
CREATE INDEX "patients_user_id_idx" ON "patients"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_user_id_key" ON "doctors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_medical_license_key" ON "doctors"("medical_license");

-- CreateIndex
CREATE INDEX "doctors_user_id_idx" ON "doctors"("user_id");

-- CreateIndex
CREATE INDEX "doctors_medical_license_idx" ON "doctors"("medical_license");

-- CreateIndex
CREATE INDEX "doctors_specialty_id_idx" ON "doctors"("specialty_id");

-- CreateIndex
CREATE INDEX "doctors_is_accepting_patients_idx" ON "doctors"("is_accepting_patients");

-- CreateIndex
CREATE INDEX "doctors_rating_average_idx" ON "doctors"("rating_average");

-- CreateIndex
CREATE UNIQUE INDEX "specialties_name_key" ON "specialties"("name");

-- CreateIndex
CREATE INDEX "specialties_is_active_idx" ON "specialties"("is_active");

-- CreateIndex
CREATE INDEX "specialties_display_order_idx" ON "specialties"("display_order");

-- CreateIndex
CREATE INDEX "medical_centers_name_idx" ON "medical_centers"("name");

-- CreateIndex
CREATE INDEX "medical_centers_address_city_idx" ON "medical_centers"("address_city");

-- CreateIndex
CREATE INDEX "medical_centers_is_active_idx" ON "medical_centers"("is_active");

-- CreateIndex
CREATE INDEX "doctor_medical_centers_doctor_id_idx" ON "doctor_medical_centers"("doctor_id");

-- CreateIndex
CREATE INDEX "doctor_medical_centers_medical_center_id_idx" ON "doctor_medical_centers"("medical_center_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_medical_centers_doctor_id_medical_center_id_key" ON "doctor_medical_centers"("doctor_id", "medical_center_id");

-- CreateIndex
CREATE INDEX "appointments_patient_id_start_time_idx" ON "appointments"("patient_id", "start_time");

-- CreateIndex
CREATE INDEX "appointments_doctor_id_start_time_idx" ON "appointments"("doctor_id", "start_time");

-- CreateIndex
CREATE INDEX "appointments_medical_center_id_idx" ON "appointments"("medical_center_id");

-- CreateIndex
CREATE INDEX "appointments_start_time_idx" ON "appointments"("start_time");

-- CreateIndex
CREATE INDEX "appointments_status_idx" ON "appointments"("status");

-- CreateIndex
CREATE INDEX "appointments_is_virtual_idx" ON "appointments"("is_virtual");

-- CreateIndex
CREATE INDEX "appointments_reminder_sent_idx" ON "appointments"("reminder_sent");

-- CreateIndex
CREATE UNIQUE INDEX "medical_histories_patient_id_key" ON "medical_histories"("patient_id");

-- CreateIndex
CREATE INDEX "medical_histories_patient_id_idx" ON "medical_histories"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "consultations_appointment_id_key" ON "consultations"("appointment_id");

-- CreateIndex
CREATE INDEX "consultations_appointment_id_idx" ON "consultations"("appointment_id");

-- CreateIndex
CREATE INDEX "consultations_doctor_id_idx" ON "consultations"("doctor_id");

-- CreateIndex
CREATE INDEX "consultations_patient_id_idx" ON "consultations"("patient_id");

-- CreateIndex
CREATE INDEX "consultations_created_at_idx" ON "consultations"("created_at");

-- CreateIndex
CREATE INDEX "medical_documents_patient_id_idx" ON "medical_documents"("patient_id");

-- CreateIndex
CREATE INDEX "medical_documents_document_type_idx" ON "medical_documents"("document_type");

-- CreateIndex
CREATE INDEX "medical_documents_upload_date_idx" ON "medical_documents"("upload_date");

-- CreateIndex
CREATE INDEX "medical_documents_consultation_id_idx" ON "medical_documents"("consultation_id");

-- CreateIndex
CREATE INDEX "doctor_schedules_doctor_id_idx" ON "doctor_schedules"("doctor_id");

-- CreateIndex
CREATE INDEX "doctor_schedules_day_of_week_idx" ON "doctor_schedules"("day_of_week");

-- CreateIndex
CREATE INDEX "doctor_schedules_medical_center_id_idx" ON "doctor_schedules"("medical_center_id");

-- CreateIndex
CREATE INDEX "doctor_schedules_is_active_idx" ON "doctor_schedules"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedules_doctor_id_day_of_week_medical_center_id_va_key" ON "doctor_schedules"("doctor_id", "day_of_week", "medical_center_id", "valid_from");

-- CreateIndex
CREATE INDEX "schedule_blocks_doctor_id_idx" ON "schedule_blocks"("doctor_id");

-- CreateIndex
CREATE INDEX "schedule_blocks_start_time_end_time_idx" ON "schedule_blocks"("start_time", "end_time");

-- CreateIndex
CREATE INDEX "schedule_blocks_is_active_idx" ON "schedule_blocks"("is_active");

-- CreateIndex
CREATE INDEX "notifications_user_id_is_read_idx" ON "notifications"("user_id", "is_read");

-- CreateIndex
CREATE INDEX "notifications_scheduled_for_idx" ON "notifications"("scheduled_for");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_is_sent_idx" ON "notifications"("is_sent");

-- CreateIndex
CREATE INDEX "patient_follow_ups_patient_id_idx" ON "patient_follow_ups"("patient_id");

-- CreateIndex
CREATE INDEX "patient_follow_ups_due_date_idx" ON "patient_follow_ups"("due_date");

-- CreateIndex
CREATE INDEX "patient_follow_ups_status_idx" ON "patient_follow_ups"("status");

-- CreateIndex
CREATE INDEX "patient_follow_ups_type_idx" ON "patient_follow_ups"("type");

-- CreateIndex
CREATE INDEX "patient_follow_ups_priority_idx" ON "patient_follow_ups"("priority");

-- CreateIndex
CREATE INDEX "medical_reports_report_type_idx" ON "medical_reports"("report_type");

-- CreateIndex
CREATE INDEX "medical_reports_generated_at_idx" ON "medical_reports"("generated_at");

-- CreateIndex
CREATE INDEX "medical_reports_generated_by_idx" ON "medical_reports"("generated_by");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_timestamp_idx" ON "audit_logs"("timestamp");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_key_key" ON "system_settings"("key");

-- CreateIndex
CREATE INDEX "system_settings_category_idx" ON "system_settings"("category");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_medical_centers" ADD CONSTRAINT "doctor_medical_centers_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_medical_centers" ADD CONSTRAINT "doctor_medical_centers_medical_center_id_fkey" FOREIGN KEY ("medical_center_id") REFERENCES "medical_centers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_medical_center_id_fkey" FOREIGN KEY ("medical_center_id") REFERENCES "medical_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_histories" ADD CONSTRAINT "medical_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_documents" ADD CONSTRAINT "medical_documents_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_documents" ADD CONSTRAINT "medical_documents_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_documents" ADD CONSTRAINT "medical_documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_medical_center_id_fkey" FOREIGN KEY ("medical_center_id") REFERENCES "medical_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_blocks" ADD CONSTRAINT "schedule_blocks_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_follow_ups" ADD CONSTRAINT "patient_follow_ups_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_follow_ups" ADD CONSTRAINT "patient_follow_ups_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
