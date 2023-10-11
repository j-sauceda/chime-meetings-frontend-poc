export type AttendeeType = {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Attendee: {
    AttendeeId: string;
    ExternalUserId: string;
    JoinToken: string;
  };
};
