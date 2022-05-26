import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file["filename"] = req.body.filename;
    req.file["userId"] = Number(req.body.userId);
    req.file["companyId"] = Number(req.body.companyId);
    req.file["classId"] = Number(req.body.classId);
    req.file["lessonId"] = Number(req.body.lessonId);
    req.file["type"] = Number(req.body.type);
    req.file["url"] = req.body.url;
    return next.handle();
  }
}
