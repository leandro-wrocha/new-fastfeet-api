import { AggregateRoot } from 'src/core/entities/aggregate-root';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Role } from '../enums/role';

export interface RecipientProps {
  name: string;
  cpf: string;
  role?: Role;
  createdAt?: Date;
}

export class Recipient extends AggregateRoot<RecipientProps> {
  constructor(props: RecipientProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
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

  isRecipient() {
    return this.props.role === Role.RECIPIENT;
  }

  static create(props: RecipientProps, id?: UniqueEntityId) {
    return new Recipient(
      { ...props, role: Role.RECIPIENT, createdAt: new Date() },
      id,
    );
  }
}
