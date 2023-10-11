import { DefaultMeetingSession, MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { DeviceLabels, MeetingManager } from 'amazon-chime-sdk-component-library-react';

import { useStore } from '../store';
import ChimeService from '../services/chime.service';

interface TopicMessage {
  text: string;
}

const useChime = () => {
  const chimeService = new ChimeService();
  const { attendeeId, meetingData, meetingId, setAttendeeData, setAttendeeId } = useStore();

  const startMeetingSessionHandler = async (meetingManager: MeetingManager) => {
    if (meetingId || !attendeeId) {
      const attendeeData = await chimeService.createAttendee(meetingId);

      setAttendeeId(attendeeData.data.Attendee.AttendeeId);
      setAttendeeData(JSON.stringify(attendeeData.data.Attendee));
      const configuration = new MeetingSessionConfiguration(JSON.parse(meetingData), attendeeData.data.Attendee);

      // meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo);
      const options = {
        deviceLabels: DeviceLabels.AudioAndVideo,
      };
      await meetingManager.join(configuration, options);
    }
  };

  const setAudioHandler = async (meetingSession: DefaultMeetingSession) => {
    const audioInputDevices = await meetingSession.audioVideo.listAudioInputDevices();
    if (audioInputDevices[0]) {
      await meetingSession.audioVideo.startAudioInput(audioInputDevices[0]);
    }

    const audioOutputDevices = await meetingSession.audioVideo.listAudioOutputDevices();
    if (audioOutputDevices[0]) {
      await meetingSession.audioVideo.chooseAudioOutput(audioOutputDevices[0].deviceId);
    }
  };

  const setVideoHandler = async (meetingSession: DefaultMeetingSession) => {
    const videoInputDevices = await meetingSession.audioVideo.listVideoInputDevices();
    if (videoInputDevices[0]) {
      await meetingSession.audioVideo.startVideoInput(videoInputDevices[0]);
    }
  };

  const startScreenShareHandler = async (meetingSession: DefaultMeetingSession) => {
    await meetingSession.audioVideo.startContentShareFromScreenCapture();
  };

  const stopScreenShareHandler = async (meetingSession: DefaultMeetingSession) => {
    meetingSession.audioVideo.stopContentShare();
  };

  const stopAudioHandler = async (meetingSession: DefaultMeetingSession) => {
    await meetingSession.audioVideo.stopAudioInput();
  };

  const stopVideoHandler = async (meetingSession: DefaultMeetingSession) => {
    meetingSession.audioVideo.stopLocalVideoTile();
    meetingSession.audioVideo.removeLocalVideoTile();
    await meetingSession.audioVideo.stopVideoInput();
    meetingSession.audioVideo.stop();
  };

  const sendDataMsgHandler = (
    meetingSession: DefaultMeetingSession,
    customMessage: TopicMessage,
    topic: string = 'Custom-topic'
  ) => {
    meetingSession.audioVideo.realtimeSendDataMessage(topic, customMessage);
  };

  return {
    startMeetingSession: startMeetingSessionHandler,
    sendDataMsg: sendDataMsgHandler,
    setAudio: setAudioHandler,
    setVideo: setVideoHandler,
    startScreenShare: startScreenShareHandler,
    stopAudio: stopAudioHandler,
    stopVideo: stopVideoHandler,
    stopScreenShare: stopScreenShareHandler,
  };
};

export default useChime;
