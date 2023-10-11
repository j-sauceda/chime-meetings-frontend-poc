// Libraries
import { FunctionComponent, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  AudioInputControl,
  AudioOutputControl,
  Chat,
  ContentShareControl,
  ControlBar,
  ControlBarButton,
  Grid,
  LocalVideo,
  Phone,
  RemoteVideo,
  useContentShareState,
  useLocalVideo,
  useMeetingManager,
  useRemoteVideoTileState,
  VideoInputBackgroundBlurControl,
} from 'amazon-chime-sdk-component-library-react';

// Custom hooks
import { useStore } from '../store';
import useChime from '../hooks/useChime';

// CSS
import 'react-toastify/dist/ReactToastify.css';

export const MeetingPanel: FunctionComponent = () => {
  const contentShare = useContentShareState();
  const localVideo = useLocalVideo();
  const meetingManager = useMeetingManager();
  const { tiles } = useRemoteVideoTileState();
  const { isConnected, meetingId, reset } = useStore();
  const { setAudio, setVideo, startMeetingSession } = useChime();

  const setPanel = async () => {
    await startMeetingSession(meetingManager);
    // Audio and Video setup
    await setAudio(meetingManager?.meetingSession!);
    await setVideo(meetingManager?.meetingSession!);

    // Starting session and local video sharing
    meetingManager?.meetingSession!.audioVideo.start();
    meetingManager?.meetingSession!.audioVideo.startLocalVideoTile();
    if (!localVideo.isVideoEnabled) {
      await localVideo.toggleVideo();
    }

    // Subscribe to real time data messages
    meetingManager?.meetingSession!.audioVideo.realtimeSubscribeToReceiveDataMessage('Custom-topic', dataMessage => {
      console.log('*** Data Message: ', dataMessage.json());
      toast.info(dataMessage.json().text, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  const sendMsg = async () => {
    meetingManager?.meetingSession!.audioVideo.realtimeSendDataMessage('Custom-topic', { text: 'Hello world!' });
  };

  useEffect(() => {
    if (meetingId) {
      setPanel().then(() => {
        console.log('*** Connected to Chime! ***');
      });
    }
  }, [isConnected]);

  if (!meetingId) {
    return (
      <div style={{ marginTop: '-0.5rem' }}>
        <h3>No meeting session has been established yet</h3>
      </div>
    );
  }

  return (
    <>
      {meetingManager && (
        <div className="card" style={{ marginTop: '-3rem' }}>
          <ControlBar css={'padding: 5px; borderRadius: 2px;'} layout="undocked-horizontal" showLabels>
            <AudioInputControl data-tooltip />
            <AudioOutputControl label={'Speaker'} data-tooltip />
            <VideoInputBackgroundBlurControl label={'Camera'} data-tooltip />
            <ContentShareControl label={'Content'} data-tooltip />
            <ControlBarButton icon={<Chat />} label={'Send Text'} onClick={() => sendMsg()} data-tooltip />
          </ControlBar>
          <ControlBar
            css={'padding: 5px; background-color: lightcoral; borderRadius: 2px;'}
            layout="undocked-horizontal"
            showLabels
          >
            <ControlBarButton
              icon={<Phone />}
              label={'Hang up'}
              onClick={() => {
                meetingManager.leave();
                reset();
              }}
              data-tooltip
            />
          </ControlBar>
        </div>
      )}
      <>
        <Grid
          gridGap=".5rem"
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="auto"
          gridAutoFlow=""
          style={{ height: '30vh' }}
          responsive
        >
          {contentShare.tileId ? (
            <RemoteVideo css={'height: 300px; width: 450px;'} tileId={contentShare.tileId} name={'Screen share'} />
          ) : (
            <></>
          )}
          {localVideo.tileId && localVideo.isVideoEnabled ? (
            <LocalVideo css={'height: 300px; width: 450px;'} nameplate={'Local Camera'} />
          ) : (
            <p>Local video is not being broadcasted</p>
          )}
          {tiles ? (
            tiles.map(tileId => (
              <RemoteVideo css={'height: 300px; width: 450px;'} key={tileId} tileId={tileId} name={'Remote video'} />
            ))
          ) : (
            <></>
          )}
        </Grid>
      </>

      <ToastContainer />
    </>
  );
};
