import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository';
import { FetchRecipientsUseCase } from './fetch-recipients';
import { makeAdmin } from 'test/factories/make-admin';
import { makeRecipient } from 'test/factories/make-recipient';
import { Recipient } from '../../enterprise/entities/recipient';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: FetchRecipientsUseCase;

describe('Fetch Recipients Use Case', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new FetchRecipientsUseCase(
      inMemoryRecipientsRepository,
      inMemoryAdminsRepository,
    );
  });

  it('should be able fetch recipients', async () => {
    const admin = makeAdmin({});

    await inMemoryAdminsRepository.create(admin);

    for (let i = 1; i <= 22; i++) {
      const recipient = makeRecipient({});

      await inMemoryRecipientsRepository.create(recipient);
    }

    const result = await sut.execute({
      adminId: admin.id.toString(),
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(
      (result.value as { recipients: Recipient[] }).recipients.length,
    ).toEqual(2);
  });
});
