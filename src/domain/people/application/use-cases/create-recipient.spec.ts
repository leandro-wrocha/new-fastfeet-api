import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository';
import { CreateRecipientUseCase } from './create-recipient';
import { makeAdmin } from 'test/factories/make-admin';
import { faker } from '@faker-js/faker';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: CreateRecipientUseCase;

describe('Create Recipient Use Case', () => {
  beforeAll(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new CreateRecipientUseCase(
      inMemoryRecipientsRepository,
      inMemoryAdminsRepository,
    );
  });

  it('should be able a create recipient', async () => {
    const admin = makeAdmin({});

    await inMemoryAdminsRepository.create(admin);

    const cpf = faker.string.numeric({ length: 11 });

    const result = await sut.execute({
      adminId: admin.id.toString(),
      name: faker.person.fullName(),
      cpf,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientsRepository.items[0].cpf).toEqual(cpf);
  });
});
