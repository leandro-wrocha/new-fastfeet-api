import { AggregateRoot } from 'src/core/entities/aggregate-root';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Role } from '../enums/role';

export interface DelivererProps {
  name: string;
  cpf: string;
  password: string;
  role?: Role;
  createdAt?: Date;
}

export class Deliverer extends AggregateRoot<DelivererProps> {
  constructor(props: DelivererProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set cpf(value: string) {
    this.props.cpf = value;
  }

  set password(value: string) {
    this.props.password = value;
  }

  isDeliverer() {
    return this.props.role === Role.DELIVERER;
  }

  static create(props: DelivererProps, id?: UniqueEntityId) {
    return new Deliverer(
      { ...props, role: Role.DELIVERER, createdAt: new Date() },
      id,
    );
  }
}
