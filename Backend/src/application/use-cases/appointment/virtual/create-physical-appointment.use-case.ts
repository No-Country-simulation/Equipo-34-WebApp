import { AppointmentPriority } from "../../../../domain/entities/enums/Appointment/appointment-priority.enum";
import { AppointmentStatus } from "../../../../domain/entities/enums/Appointment/appointment-statu.enum";
import { AppointmentType } from "../../../../domain/entities/enums/Appointment/appointment-type.enum";
import { user_not_found } from "../../../../domain/exceptions/user/not-found.exception";
import type { appointment_repository } from "../../../../domain/repositories/appointment/appointment.repository";
import type { doctor_repository } from "../../../../domain/repositories/doctor/doctor.repository";
import type { patient_repository } from "../../../../domain/repositories/patient/patient.repository";
import type { create_appointment_dto } from "../../../dto/Appointment/appointment.dto";

export class CreateVirtualAppointmentUseCase {
  private readonly doctor_repo;
  private readonly patient_repo;
  private readonly appointment_repo;

  constructor(
    doctor_repo_injection: doctor_repository,
    patient_repo_injection: patient_repository,
    appointment_repo_injection: appointment_repository
  ) {
    this.doctor_repo = doctor_repo_injection;
    this.patient_repo = patient_repo_injection;
    this.appointment_repo = appointment_repo_injection;
  }

  async execute(input: create_appointment_dto) {
    const doctor = await this.doctor_repo.find_by_id(input.doctor_id);
    const patient = await this.patient_repo.find_patient(input.patient_id);

    if (!doctor || !patient) throw new user_not_found();

    const appointment_data: create_appointment_dto = {
      patient_id: input.patient_id,
      doctor_id: input.doctor_id,
      start_time: new Date(input.start_time),
      end_time: new Date(input.end_time),
      duration_minutes: input.duration_minutes,
      is_virtual: false,
      reason: input.reason,
      status: AppointmentStatus.SCHEDULED,
      appointment_type: AppointmentType.TELECONSULTATION,
      reminder_sent: false,
      priority: AppointmentPriority.NORMAL,
    };
    // Save the Appointment
    const appointment = await this.appointment_repo.create_appointment(
      appointment_data
    );

    return appointment;
  }
}
