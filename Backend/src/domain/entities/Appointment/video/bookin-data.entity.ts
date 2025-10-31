import type { attendee } from "./attendee.entity";
import type { metadata } from "./metadata.entity";

export interface booking_data {
  start: string; // ISO UTC
  attendee: attendee;
  eventTypeId?: number;
  lengthInMinutes?: number;
  metadata?: metadata;
}
