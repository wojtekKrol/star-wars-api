import { Injectable, NotFoundException } from '@nestjs/common';
import { IStarWarsCharacter } from './interfaces/star-wars-character.interface';

@Injectable()
export class StarWarsService {
  private characters: IStarWarsCharacter[] = [];
  private idCounter = 1;

  create(newCharacterBody: Omit<IStarWarsCharacter, 'id'>) {
    const newCharacter: IStarWarsCharacter = {
      id: this.idCounter++,
      ...newCharacterBody,
    };
    this.characters.push(newCharacter);

    return newCharacter;
  }

  findAll(
    page: number = 1,
    limit: number = 10,
  ): { data: IStarWarsCharacter[]; total: number } {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return {
      data: this.characters.slice(startIndex, endIndex),
      total: this.characters.length,
    };
  }

  findOne(id: number): IStarWarsCharacter {
    const character = this.characters.find((char) => char.id === id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }

  update(
    id: number,
    characterBody: Partial<IStarWarsCharacter>,
  ): IStarWarsCharacter {
    const character = this.findOne(id);
    Object.assign(character, characterBody);

    return character;
  }

  remove(id: number): string {
    const index = this.characters.findIndex((char) => char.id === id);
    if (index === -1) {
      throw new NotFoundException('Character not found');
    }
    this.characters.splice(index, 1);

    return 'Character removed';
  }

  clearDatabase() {
    this.characters = [];
    this.idCounter = 1;

    return 'Database cleared';
  }
}
