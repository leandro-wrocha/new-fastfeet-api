import { makeAdmin } from 'test/factories/make-admin';
import { makeRecipient } from 'test/factories/make-recipient';
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository';
import { DeleteRecipientUseCase } from './delete-recipient';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: DeleteRecipientUseCase;

describe('Delete Recipient Use Case', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new DeleteRecipientUseCase(
      inMemoryAdminsRepository,
      inMemoryRecipientsRepository,
    );
  });

  it('should be able delete a recipient', async () => {
    const admin = makeAdmin({});
    const recipient = makeRecipient({});

    await inMemoryAdminsRepository.create(admin);
    await inMemoryRecipientsRepository.create(recipient);

    const result = await sut.execute({
      adminId: admin.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientsRepository.items.length).toEqual(0);
  });
});
