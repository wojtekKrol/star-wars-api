import { Module } from '@nestjs/common';
import { StarWarsService } from './star-wars.service';
import { StarWarsController } from './star-wars.controller';

@Module({
  providers: [StarWarsService],
  controllers: [StarWarsController],
})
export class StarWarsModule {}
