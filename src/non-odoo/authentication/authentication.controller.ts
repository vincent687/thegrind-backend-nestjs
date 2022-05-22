import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
  Logger,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthenticationService } from "./authentication.service";
import { CreateAuthenticationDto } from "./dto/create-authentication.dto";
import { RegisterDto } from "./dto/registration.dto";
import { UpdateAuthenticationDto } from "./dto/update-authentication.dto";
import { LocalAuthenticationGuard } from "./localAuthentication.guard";
import RequestWithUser from "./requestWithUser.interface";

@ApiTags("Authenticaton")
@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("register")
  async register(@Body() registrationData: RegisterDto) {
    Logger.log(registrationData);
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("login")
  async login(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return await this.authenticationService.login(user);
    // user.password = undefined;
    // return user;
  }
}
