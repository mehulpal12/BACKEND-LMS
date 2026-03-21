export interface IJwtUserPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}