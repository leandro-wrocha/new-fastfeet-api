import { PaginationParams } from 'src/core/repositories/pagination-params';
import { DeliverersRepository } from 'src/domain/people/application/repositories/deliverers-repository';
import { Deliverer } from 'src/domain/people/enterprise/entities/deliverer';

export class InMemoryDeliverersRepository implements DeliverersRepository {
  public items: Deliverer[] = [];

  async findMany({ page }: PaginationParams): Promise<Deliverer[]> {
    const deliverers = this.items
      .filter((item) => item.isDeliverer())
      .slice((page - 1) * 20, page * 20);

    return deliverers;
  }

  async findById(id: string): Promise<Deliverer | null> {
    const deliverer = this.items.find((item) => item.id.toString() === id);

    return deliverer ?? null;
  }

  async findByCpf(cpf: string): Promise<Deliverer | null> {
    const deliverer = this.items.find((item) => item.cpf === cpf);

    return deliverer ?? null;
  }

  async create(deliverer: Deliverer): Promise<void> {
    this.items.push(deliverer);
  }

  async save(deliverer: Deliverer): Promise<void> {
    const delivererIndex = this.items.findIndex((item) =>
      item.equals(deliverer),
    );

    this.items[delivererIndex] = deliverer;
  }

  async delete(deliverer: Deliverer): Promise<void> {
    const delivererIndex = this.items.findIndex((item) =>
      item.equals(deliverer),
    );

    this.items.splice(delivererIndex, 1);
  }
}
