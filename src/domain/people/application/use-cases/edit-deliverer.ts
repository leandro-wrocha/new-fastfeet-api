import { Either, left, right } from 'src/core/either';
import { AdminsRepository } from '../repositories/admins-repository';
import { DeliverersRepository } from '../repositories/deliverers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { Deliverer } from '../../enterprise/entities/deliverer';

interface EditDelivererUseCaseRequest {
  adminId: string;
  delivererId: string;
  name?: string;
  cpf?: string;
  password?: string;
}

type EditDelivererUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  { deliverer: Deliverer }
>;

export class EditDelivererUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private deliverersRepository: DeliverersRepository,
  ) {}

  async execute({
    adminId,
    delivererId,
    name,
    cpf,
    password,
  }: EditDelivererUseCaseRequest): Promise<EditDelivererUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId);
    const deliverer = await this.deliverersRepository.findById(delivererId);

    if (!admin || !deliverer) {
      return left(new ResourceNotFoundError());
    }

    if (!admin.isAdmin()) {
      return left(new UnauthorizedError());
    }

    deliverer.name = name ?? deliverer.name;
    deliverer.cpf = cpf ?? deliverer.cpf;
    deliverer.password = password ?? deliverer.cpf;

    this.deliverersRepository.save(deliverer);

    return right({ deliverer });
  }
}
