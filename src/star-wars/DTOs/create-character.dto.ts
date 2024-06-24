import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateStarWarsCharacterSchema = z.object({
  name: z.string().min(1).max(255),
  episodes: z.array(z.string()).min(1),
  planet: z.string().optional(),
});

export class CreateCharacterDto extends createZodDto(
  CreateStarWarsCharacterSchema,
) {}
