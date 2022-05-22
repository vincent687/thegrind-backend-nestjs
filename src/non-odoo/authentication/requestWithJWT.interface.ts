import { Request } from "express";

interface RequestWithJWT extends Request {
  userId: string;
  username: string;
}

export default RequestWithJWT;
