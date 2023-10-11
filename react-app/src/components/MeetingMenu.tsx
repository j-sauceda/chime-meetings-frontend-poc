import { ChangeEvent, FunctionComponent } from 'react';
import { useMutation } from 'react-query';
import { useStore } from '../store';

import ChimeService from '../services/chime.service';

export const MeetingMenu: FunctionComponent = () => {
  const { connect, joinId, meetingId, setJoinId, setMeetingData, setMeetingId } = useStore();

  const chimeService = new ChimeService();
  const createMeeting = useMutation({
    mutationFn: () => chimeService.createMeeting(),
    onSuccess: response => {
      setMeetingData(JSON.stringify(response.data.Meeting));
      setMeetingId(response.data.Meeting.MeetingId);
      connect();
    },
  });

  const getMeeting = useMutation({
    mutationFn: () => chimeService.getMeeting(joinId),
    onSuccess: response => {
      setMeetingData(JSON.stringify(response.data.Meeting));
      setMeetingId(response.data.Meeting.MeetingId);
      connect();
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setJoinId(e.target.value);
  };

  return (
    <div className="card">
      <h2 style={{ color: '#5ba9e4' }}>Chime Client POC</h2>
      <p>Select a start meeting option</p>
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={e => {
            e.preventDefault();
            createMeeting.mutate();
          }}
        >
          Create new meeting
        </button>
        &nbsp;&nbsp;OR&nbsp;&nbsp;
        <input type="text" placeholder="Enter a valid meeting ID" onChange={handleChange} value={joinId} />
        <button
          onClick={e => {
            e.preventDefault();
            getMeeting.mutate();
          }}
        >
          Join meeting by Id
        </button>
      </div>
      {meetingId && <p style={{ marginTop: '1rem' }}>Current chime meeting_id: {meetingId}</p>}
    </div>
  );
};
