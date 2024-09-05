import { Either, left, right } from 'src/core/either';
import { AdminsRepository } from '../repositories/admins-repository';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { Recipient } from '../../enterprise/entities/recipient';

interface EditRecipientUseCaseRequest {
  adminId: string;
  recipientId: string;
  name?: string;
  cpf?: string;
}

type EditRecipientUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  { recipient: Recipient }
>;

export class EditRecipientUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    adminId,
    recipientId,
    name,
    cpf,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId);
    const recipient = await this.recipientsRepository.findById(recipientId);

    if (!admin || !recipient) {
      return left(new ResourceNotFoundError());
    }

    if (!admin.isAdmin()) {
      return left(new UnauthorizedError());
    }

    recipient.name = name ?? recipient.name;
    recipient.cpf = cpf ?? recipient.cpf;

    this.recipientsRepository.save(recipient);

    return right({ recipient });
  }
}
