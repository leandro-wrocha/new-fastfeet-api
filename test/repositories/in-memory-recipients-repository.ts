import { PaginationParams } from 'src/core/repositories/pagination-params';
import { RecipientsRepository } from 'src/domain/people/application/repositories/recipients-repository';
import { Recipient } from 'src/domain/people/enterprise/entities/recipient';

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = [];

  async findMany({ page }: PaginationParams): Promise<Recipient[]> {
    const recipients = this.items
      .filter((item) => item.isRecipient())
      .slice((page - 1) * 20, page * 20);

    return recipients;
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = this.items.find((item) => item.id.toString() === id);

    return recipient ?? null;
  }

  async findByCpf(cpf: string): Promise<Recipient | null> {
    const recipient = this.items.find((item) => item.cpf === cpf);

    return recipient ?? null;
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient);
  }

  async save(recipient: Recipient): Promise<void> {
    const recipientIndex = this.items.findIndex((item) =>
      item.equals(recipient),
    );

    this.items[recipientIndex] = recipient;
  }

  async delete(recipient: Recipient): Promise<void> {
    const recipientIndex = this.items.findIndex((item) =>
      item.equals(recipient),
    );

    this.items.splice(recipientIndex, 1);
  }
}
