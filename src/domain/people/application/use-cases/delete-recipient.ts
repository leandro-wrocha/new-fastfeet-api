import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { AdminsRepository } from '../repositories/admins-repository';
import { RecipientsRepository } from '../repositories/recipients-repository';

interface DeleteRecipientUseCaseRequest {
  adminId: string;
  recipientId: string;
}

type DeleteRecipientUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  null
>;

export class DeleteRecipientUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    adminId,
    recipientId,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId);
    const recipient = await this.recipientsRepository.findById(recipientId);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    if (!admin.isAdmin()) {
      return left(new UnauthorizedError());
    }

    await this.recipientsRepository.delete(recipient);

    return right(null);
  }
}
