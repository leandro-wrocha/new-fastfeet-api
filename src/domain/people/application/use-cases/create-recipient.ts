import { Either, left, right } from 'src/core/either';
import { Recipient } from '../../enterprise/entities/recipient';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { AdminsRepository } from '../repositories/admins-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { AlreadyExistsError } from './errors/already-exists-error';

interface CreateRecipientUseCaseRequest {
  adminId: string;
  name: string;
  cpf: string;
}

export type CreateRecipientUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  { recipient: Recipient }
>;

export class CreateRecipientUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private adminsRepository: AdminsRepository,
  ) {}

  async execute({
    adminId,
    name,
    cpf,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    if (!admin.isAdmin()) {
      return left(new UnauthorizedError());
    }

    const alreadyExists = await this.recipientsRepository.findByCpf(cpf);

    if (alreadyExists) {
      return left(new AlreadyExistsError());
    }

    const recipient = new Recipient({
      name,
      cpf,
    });

    await this.recipientsRepository.create(recipient);

    return right({ recipient });
  }
}
