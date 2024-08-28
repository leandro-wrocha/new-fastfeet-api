import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository';
import { InMemoryDeliverersRepository } from 'test/repositories/in-memory-deliverers-repository';
import { CreateDelivererUseCase } from './create-deliverer';
import { makeAdmin } from 'test/factories/make-admin';
import { faker } from '@faker-js/faker';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let inMemoryDeliverersRepository: InMemoryDeliverersRepository;
let sut: CreateDelivererUseCase;

describe('Create Deliverer Use Case', () => {
  beforeAll(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository();
    sut = new CreateDelivererUseCase(
      inMemoryDeliverersRepository,
      inMemoryAdminsRepository,
    );
  });

  it('should be able a create deliverer', async () => {
    const admin = makeAdmin({});

    await inMemoryAdminsRepository.save(admin);

    const result = await sut.execute({
      id: admin.id.toString(),
      name: faker.person.fullName(),
      cpf: faker.string.numeric({ length: 11 }),
      password: faker.internet.password(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliverersRepository.items[0].cpf).toEqual(result.value?.deliverer.cpf);
  });
});
