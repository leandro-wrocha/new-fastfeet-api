import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository';
import { InMemoryDeliverersRepository } from 'test/repositories/in-memory-deliverers-repository';
import { FetchDeliverersUseCase } from './fetch-deliverers';
import { makeAdmin } from 'test/factories/make-admin';
import { makeDeliverer } from 'test/factories/make-deliverer';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let inMemoryDeliverersRepository: InMemoryDeliverersRepository;
let sut: FetchDeliverersUseCase;

describe('Fetch Deliverers Use Case', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository();
    sut = new FetchDeliverersUseCase(
      inMemoryDeliverersRepository,
      inMemoryAdminsRepository,
    );
  });

  it('should be able fetch deliverers', async () => {
    const admin = makeAdmin({});

    await inMemoryAdminsRepository.create(admin);

    for (let i = 1; i <= 22; i++) {
      const deliverer = makeDeliverer({});

      await inMemoryDeliverersRepository.create(deliverer);
    }

    const result = await sut.execute({
      adminId: admin.id.toString(),
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.deliverers.length).toEqual(2);
  });
});
