export type MeetingType = {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Meeting: {
    MediaPlacement: {
      AudioFallbackUrl: string;
      AudioHostUrl: string;
      EventIngestionUrl: string;
      ScreenDataUrl: string;
      ScreenSharingUrl: string;
      ScreenViewingUrl: string;
      SignalingUrl: string;
      TurnControlUrl: string;
    };
    MediaRegion: string;
    MeetingId: string;
  };
};
