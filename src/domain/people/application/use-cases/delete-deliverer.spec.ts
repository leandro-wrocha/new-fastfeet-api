import { makeAdmin } from 'test/factories/make-admin';
import { makeDeliverer } from 'test/factories/make-deliverer';
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository';
import { DeleteDelivererUseCase } from './delete-deliverer';
import { InMemoryDeliverersRepository } from 'test/repositories/in-memory-deliverers-repository';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let inMemoryDeliverersRepository: InMemoryDeliverersRepository;
let sut: DeleteDelivererUseCase;

describe('Delete Deliverer Use Case', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository();
    sut = new DeleteDelivererUseCase(
      inMemoryAdminsRepository,
      inMemoryDeliverersRepository,
    );
  });

  it('should be able delete a deliverer', async () => {
    const admin = makeAdmin({});
    const deliverer = makeDeliverer({});

    await inMemoryAdminsRepository.create(admin);
    await inMemoryDeliverersRepository.create(deliverer);

    const result = await sut.execute({
      adminId: admin.id.toString(),
      delivererId: deliverer.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliverersRepository.items.length).toEqual(0);
  });
});
