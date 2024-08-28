import { Either, left, right } from 'src/core/either';
import { Deliverer } from '../../enterprise/entities/deliverer';
import { DeliverersRepository } from '../repositories/deliverers-repository';
import { AdminsRepository } from '../repositories/admins-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { hash } from 'bcrypt';
import { AlreadyExistsError } from './errors/already-exists-error';

interface CreateDelivererUseCaseRequest {
  id: string;
  name: string;
  cpf: string;
  password: string;
}

export type CreateDelivererUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  { deliverer: Deliverer }
>;

export class CreateDelivererUseCase {
  constructor(
    private deliverersRepository: DeliverersRepository,
    private adminsRepository: AdminsRepository,
  ) {}

  async execute({
    id,
    name,
    cpf,
    password,
  }: CreateDelivererUseCaseRequest): Promise<CreateDelivererUseCaseResponse> {
    const admin = await this.adminsRepository.findAdminById(id);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    if (!admin.isAdmin()) {
      return left(new UnauthorizedError());
    }

    const alreadyExists = await this.deliverersRepository.findByCpf(cpf);

    if (alreadyExists) {
      return left(new AlreadyExistsError());
    }

    const deliverer = new Deliverer({
      name,
      cpf,
      password: await hash(password, 12),
    });

    await this.deliverersRepository.save(deliverer);

    return right({ deliverer });
  }
}
