import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MessageResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create and retrieve messages', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createMessage(sender: "testUser", room: "testRoom", content: "Test Message") {
              sender
              room
              content
              timestamp
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createMessage.sender).toBe('testUser');
        expect(res.body.data.createMessage.content).toBe('Test Message');
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: `
              query {
                messages(room: "testRoom") {
                  id
                  sender
                  content
                  timestamp
                }
              }
            `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.messages).toHaveLength(1);
            expect(res.body.data.messages[0].sender).toBe('testUser');
            expect(res.body.data.messages[0].content).toBe('Test Message');
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
