import axios from "axios";
import type { booking_data } from "../../../domain/entities/Appointment/video/bookin-data.entity";
import type { booking_response } from "../../../domain/entities/Appointment/video/booking-response.entity";

export class cal_api_service {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly apiVersion: string;

  constructor() {
    this.apiUrl = process.env.CAL_API_URL || "https://api.cal.com/v2";
    this.apiKey = process.env.CAL_COM_API_KEY!;
    this.apiVersion = process.env.CAL_API_VERSION || "2024-08-13";
  }

  async createBooking(payload: booking_data): Promise<booking_response> {
    try {
      const { data } = await axios.post(`${this.apiUrl}/bookings`, payload, {
        headers: {
          "Content-Type": "application/json",
          "cal-api-version": this.apiVersion,
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      const booking = data.data || data;

      return {
        uid: booking.uid,
        start: booking.start,
        end: booking.end,
        meetingUrl: booking.meetingUrl || booking.location || null,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
