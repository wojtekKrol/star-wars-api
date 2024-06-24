import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { StarWarsService } from './star-wars.service';
import { CreateCharacterDto } from './DTOs/create-character.dto';
import { UpdateCharacterDto } from './DTOs/update-character.dto';

@Controller('star-wars')
export class StarWarsController {
  constructor(private readonly starWarsService: StarWarsService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.starWarsService.create(createCharacterDto);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    return this.starWarsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.starWarsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.starWarsService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.starWarsService.remove(id);
  }
}
