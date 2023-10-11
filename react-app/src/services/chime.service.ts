import AxiosBase from './axiosBase';

import { MeetingType } from '../types/MeetingType';
import { AttendeeType } from '../types/AttendeeType';

const CREATE_ATTENDEE_URL = 'createAttendee';
const CREATE_MEETING_URL = 'createMeeting';
const GET_ATTENDEE_URL = 'getAttendee';
const GET_MEETING_URL = 'getMeeting';
const LIST_ATTENDEES_URL = 'listAttendees';
const DELETE_ATTENDEE_URL = 'deleteAttendee';
const DELETE_MEETING_URL = 'deleteMeeting';

class ChimeService extends AxiosBase {
  async createAttendee(meetingId: string) {
    const params = { meetingId };
    return this.axiosInstance.post<AttendeeType>(CREATE_ATTENDEE_URL, params);
  }

  async createMeeting(mediaRegion?: string) {
    const params = {
      clientToken: crypto.randomUUID(),
      mediaRegion: mediaRegion ?? 'us-east-1',
    };
    return this.axiosInstance.post<MeetingType>(CREATE_MEETING_URL, params);
  }

  async getAttendee(attendeeId: string, meetingId: string) {
    return this.axiosInstance.get<AttendeeType>(`${GET_ATTENDEE_URL}?meetingId=${meetingId}&attendeeId=${attendeeId}`);
  }

  async getMeeting(meetingId: string) {
    return this.axiosInstance.get<MeetingType>(`${GET_MEETING_URL}/${meetingId}`);
  }

  async listAttendees(meetingId: string) {
    return this.axiosInstance.get<AttendeeType[]>(`${LIST_ATTENDEES_URL}/${meetingId}`);
  }

  async deleteAttendee(attendeeId: string, meetingId: string) {
    const params = { attendeeId, meetingId };
    return this.axiosInstance.delete(DELETE_ATTENDEE_URL, { data: { ...params } });
  }

  async deleteMeeting(meetingId: string) {
    return this.axiosInstance.delete(`${DELETE_MEETING_URL}/${meetingId}`);
  }
}

export default ChimeService;
