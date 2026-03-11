export class CreateTaskDto {
  title: string;
  projectId: string;
  description?: string;
  dueDate?: string;
  status?: string;
}
