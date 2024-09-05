import { Either, left, right } from 'src/core/either';
import { AdminsRepository } from '../repositories/admins-repository';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { UnauthorizedError } from './errors/unauthorized-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { Recipient } from '../../enterprise/entities/recipient';

interface FetchRecipientsUseCaseRequest {
  adminId: string;
  page: number;
}

type FetchRecipientsUseCaseResponse = Either<
  UnauthorizedError | ResourceNotFoundError,
  { recipients: Recipient[] }
>;

export class FetchRecipientsUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private adminsRepository: AdminsRepository,
  ) {}

  async execute({
    adminId,
    page,
  }: FetchRecipientsUseCaseRequest): Promise<FetchRecipientsUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    if (!admin.isAdmin()) {
      return left(new UnauthorizedError());
    }

    const recipients = await this.recipientsRepository.findMany({ page });

    return right({ recipients });
  }
}
