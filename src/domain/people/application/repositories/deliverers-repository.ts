import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Deliverer } from '../../enterprise/entities/deliverer';

export interface DeliverersRepository {
  findMany: (params: PaginationParams) => Promise<Deliverer[]>;
  findById: (id: string) => Promise<Deliverer | null>;
  findByCpf: (cpf: string) => Promise<Deliverer | null>;
  create: (deliverer: Deliverer) => Promise<void>;
  save: (deliverer: Deliverer) => Promise<void>;
  delete: (deliverer: Deliverer) => Promise<void>;
}
