import { Test, TestingModule } from '@nestjs/testing';
import { StarWarsService } from './star-wars.service';
import { IStarWarsCharacter } from './interfaces/star-wars-character.interface';
import { NotFoundException } from '@nestjs/common';

describe('StarWarsService', () => {
  let service: StarWarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarWarsService],
    }).compile();

    service = module.get<StarWarsService>(StarWarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a character', () => {
    const newCharacterBody: Omit<IStarWarsCharacter, 'id'> = {
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    };
    const character = service.create(newCharacterBody);
    expect(character).toEqual({
      id: 1,
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
  });

  it('should find all characters', () => {
    service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
    const characters = service.findAll(1, 10);
    expect(characters.total).toBe(1);
    expect(characters.data.length).toBe(1);
  });

  it('should find one character by id', () => {
    const newCharacter = service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
    const character = service.findOne(newCharacter.id);
    expect(character).toEqual(newCharacter);
  });

  it('should update a character', () => {
    const newCharacter = service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
    const updatedCharacter = service.update(newCharacter.id, {
      name: 'Luke Updated',
    });
    expect(updatedCharacter.name).toBe('Luke Updated');
  });

  it('should remove a character', () => {
    const newCharacter = service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
    const message = service.remove(newCharacter.id);
    expect(message).toBe('Character removed');
    expect(() => service.findOne(newCharacter.id)).toThrow(NotFoundException);
  });

  it('should throw NotFoundException if character not found', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });
});
