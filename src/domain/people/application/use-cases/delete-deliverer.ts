import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { AdminsRepository } from '../repositories/admins-repository';
import { DeliverersRepository } from '../repositories/deliverers-repository';

interface DeleteDelivererUseCaseRequest {
  adminId: string;
  delivererId: string;
}

type DeleteDelivererUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  null
>;

export class DeleteDelivererUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private deliverersRepository: DeliverersRepository,
  ) {}

  async execute({
    adminId,
    delivererId,
  }: DeleteDelivererUseCaseRequest): Promise<DeleteDelivererUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId);
    const deliverer = await this.deliverersRepository.findById(delivererId);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    if (!admin.isAdmin()) {
      return left(new UnauthorizedError());
    }

    await this.deliverersRepository.delete(deliverer);

    return right(null);
  }
}
