import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { StarWarsService } from './star-wars.service';

describe('StarWarsController (e2e)', () => {
  let app: INestApplication;
  let service: StarWarsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = app.get<StarWarsService>(StarWarsService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/star-wars (POST)', async () => {
    const characterData = {
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    };
    return request(app.getHttpServer())
      .post('/star-wars')
      .send(characterData)
      .expect(201)
      .then((response) => {
        expect(response.body.name).toBe('Luke Skywalker');
        expect(response.body.episodes).toEqual(
          expect.arrayContaining(['NEWHOPE', 'EMPIRE', 'JEDI']),
        );
      });
  });

  it('/star-wars (GET)', async () => {
    service.clearDatabase();

    await service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
    return request(app.getHttpServer())
      .get('/star-wars')
      .query({ page: 1, limit: 10 }) // Sending page and limit as query parameters
      .expect(200)
      .then((response) => {
        expect(response.body.total).toBe(1);
        expect(response.body.data.length).toBe(1);
      });
  });

  it('/star-wars/:id (GET)', async () => {
    const newCharacter = service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
    return request(app.getHttpServer())
      .get(`/star-wars/${newCharacter.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe('Luke Skywalker');
        expect(response.body.episodes).toEqual(
          expect.arrayContaining(['NEWHOPE', 'EMPIRE', 'JEDI']),
        );
      });
  });

  it('/star-wars/:id (PATCH)', async () => {
    const newCharacter = service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
    return request(app.getHttpServer())
      .patch(`/star-wars/${newCharacter.id}`)
      .send({ name: 'Luke Updated' })
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe('Luke Updated');
      });
  });

  it('/star-wars/:id (DELETE)', async () => {
    const newCharacter = service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    });
    return request(app.getHttpServer())
      .delete(`/star-wars/${newCharacter.id}`)
      .expect(200)
      .then((response) => {
        expect(response.text).toBe('Character removed');
      });
  });
});
