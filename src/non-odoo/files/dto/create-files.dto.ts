export class CreateFilesDto {
  classId: number;
  userId: number;
  type: number;
  name: string;
  url?: string;
  filePath?: string;
  date: Date;
}
