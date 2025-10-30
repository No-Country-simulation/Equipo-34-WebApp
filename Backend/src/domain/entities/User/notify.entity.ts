import type { User } from "./user.entity";
import type { Appointment } from "../Appointment/appointment.entity";
import { NotificationType } from "../enums/Report/notification-type.enum";
import { NotificationChannel } from "../enums/Report/notification-channel.enum";
import { NotificationPriority } from "../enums/Report/notification-priority.enum";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  related_entity_type?: string;
  related_entity_id?: string;
  appointment_id?: string;
  is_read: boolean;
  is_sent: boolean;
  scheduled_for?: Date;
  sent_at?: Date;
  read_at?: Date;
  priority: NotificationPriority;
  action_url?: string;
  created_at: Date;

  user?: User;
  appointment?: Appointment;
}
