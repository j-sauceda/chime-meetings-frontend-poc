import { create } from 'zustand';

interface ConnectedState {
  attendeeId: string;
  attendeeData: string;
  isConnected: boolean;
  joinId: string;
  meetingId: string;
  meetingData: string;
  connect: () => void;
  reset: () => void;
  setAttendeeId: (id: string) => void;
  setAttendeeData: (data: string) => void;
  setJoinId: (id: string) => void;
  setMeetingId: (id: string) => void;
  setMeetingData: (data: string) => void;
}

export const useStore = create<ConnectedState>(set => ({
  attendeeId: '',
  attendeeData: '',
  isConnected: false,
  joinId: '',
  meetingId: '',
  meetingData: '',
  connect: () => set((state) => ({ ...state, isConnected: true })),
  reset: () => set(() => ({ attendeeId: '', attendeeData: '', isConnected: false, joinId: '', meetingId: '', meetingData: '' })),
  setAttendeeId: (id) => set((state) => ({ ...state, attendeeId: id })),
  setAttendeeData: (data) => set((state) => ({ ...state, attendeeData: data })),
  setJoinId: (id) => set((state) => ({ ...state, joinId: id })),
  setMeetingId: (id) => set((state) => ({ ...state, meetingId: id })),
  setMeetingData: (data) => set((state) => ({ ...state, meetingData: data })),
}));
