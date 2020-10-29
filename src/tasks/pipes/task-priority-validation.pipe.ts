import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskPriority } from '../enums/task-priority.enum';

export class TaskPriorityValidationPipe implements PipeTransform {
  readonly allowedPriorities = [
    TaskPriority.CRITICAL,
    TaskPriority.MAINTENANCE,
    TaskPriority.PRESSING
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isPriorityValid(value)) {
      throw new BadRequestException(`"${value}" is not a valid priority.`);
    }
    return value;
  }

  private isPriorityValid(priority: any) {
    const index = this.allowedPriorities.indexOf(priority);
    return index !== -1; // If priority isn't found it will return an index of -1
  }
}
