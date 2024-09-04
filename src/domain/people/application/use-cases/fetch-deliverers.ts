import { Either, left, right } from 'src/core/either';
import { AdminsRepository } from '../repositories/admins-repository';
import { DeliverersRepository } from '../repositories/deliverers-repository';
import { UnauthorizedError } from './errors/unauthorized-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { Deliverer } from '../../enterprise/entities/deliverer';

interface FetchDeliverersUseCaseRequest {
  adminId: string;
  page: number;
}

type FetchDeliverersUseCaseResponse = Either<
  UnauthorizedError | ResourceNotFoundError,
  { deliverers: Deliverer[] }
>;

export class FetchDeliverersUseCase {
  constructor(
    private deliverersRepository: DeliverersRepository,
    private adminsRepository: AdminsRepository,
  ) {}

  async execute({
    adminId,
    page,
  }: FetchDeliverersUseCaseRequest): Promise<FetchDeliverersUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    if (!admin.isAdmin()) {
      return left(new UnauthorizedError());
    }

    const deliverers = await this.deliverersRepository.findMany({ page });

    return right({ deliverers });
  }
}
