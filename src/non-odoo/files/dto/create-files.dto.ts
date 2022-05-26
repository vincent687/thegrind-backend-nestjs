export class CreateFilesDto {
  classId: number;
  userId: number;
  companyId: number;
  lessonId: number;
  type: number;
  name: string;
  url?: string;
  filePath?: string;
  date: Date;
}
