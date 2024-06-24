import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UpdateCharacterCharacterSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  episodes: z.array(z.string().min(1)).optional(),
  planet: z.string().optional().optional(),
});

export class UpdateCharacterDto extends createZodDto(
  UpdateCharacterCharacterSchema,
) {}
