import { CreateChecklistDTO } from './create-checklist.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateChecklistDTO extends PartialType(CreateChecklistDTO){}