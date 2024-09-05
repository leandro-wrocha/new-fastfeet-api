import { makeAdmin } from 'test/factories/make-admin';
import { makeRecipient } from 'test/factories/make-recipient';
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository';
import { EditRecipientUseCase } from './edit-recipient';
import { faker } from '@faker-js/faker';

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let inMemoryAdminsRepository: InMemoryAdminsRepository;
let sut: EditRecipientUseCase;

describe('Edit Recipient Use Case', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new EditRecipientUseCase(
      inMemoryAdminsRepository,
      inMemoryRecipientsRepository,
    );
  });

  it('should be able edit a recipient', async () => {
    const recipient = makeRecipient({});
    const admin = makeAdmin({});

    await inMemoryRecipientsRepository.create(recipient);
    await inMemoryAdminsRepository.create(admin);

    const result = await sut.execute({
      adminId: admin.id.toString(),
      recipientId: recipient.id.toString(),
      name: faker.person.fullName({
        firstName: 'Leandro',
        lastName: 'Ferreira',
      }),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientsRepository.items[0].name).toEqual(
      'Leandro Ferreira',
    );
    expect(inMemoryRecipientsRepository.items[0].cpf).toEqual(recipient.cpf);
  });
});
