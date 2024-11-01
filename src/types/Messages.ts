export type MessageResponse = {
  message: string;
};

export type ErrorResponse = MessageResponse & {
  stack?: string;
};
