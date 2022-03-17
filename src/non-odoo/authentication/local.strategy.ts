import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { ReadUserDto } from "../users/dto/read-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthenticationService: AuthenticationService) {
    super({
      usernameField: "loginId",
    });
  }

  async validate(loginId: string, password: string): Promise<ReadUserDto> {
    return this.AuthenticationService.getAuthenticatedUser(loginId, password);
  }
}
