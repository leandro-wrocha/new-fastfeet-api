import { makeAdmin } from 'test/factories/make-admin';
import { makeDeliverer } from 'test/factories/make-deliverer';
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository';
import { InMemoryDeliverersRepository } from 'test/repositories/in-memory-deliverers-repository';
import { EditDelivererUseCase } from './edit-deliverer';
import { faker } from '@faker-js/faker';

let inMemoryDeliverersRepository: InMemoryDeliverersRepository;
let inMemoryAdminsRepository: InMemoryAdminsRepository;
let sut: EditDelivererUseCase;

describe('Edit Deliverer Use Case', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository();
    sut = new EditDelivererUseCase(
      inMemoryAdminsRepository,
      inMemoryDeliverersRepository,
    );
  });

  it('should be able edit a deliverer', async () => {
    const deliverer = makeDeliverer({});
    const admin = makeAdmin({});

    await inMemoryDeliverersRepository.create(deliverer);
    await inMemoryAdminsRepository.create(admin);

    const result = await sut.execute({
      adminId: admin.id.toString(),
      delivererId: deliverer.id.toString(),
      name: faker.person.fullName({
        firstName: 'Leandro',
        lastName: 'Ferreira',
      }),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliverersRepository.items[0].name).toEqual(
      'Leandro Ferreira',
    );
    expect(inMemoryDeliverersRepository.items[0].cpf).toEqual(deliverer.cpf);
  });
});
