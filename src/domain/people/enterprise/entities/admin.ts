import { AggregateRoot } from 'src/core/entities/aggregate-root';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

interface AdminProps {
  id?: UniqueEntityId;
  name: string;
  cpf: string;
  password: string;
  createdAt?: Date;
}

export class Admin extends AggregateRoot<AdminProps> {
  constructor(props: AdminProps, id?: UniqueEntityId) {
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

  static create(props: AdminProps) {
    return new Admin({ ...props, createdAt: new Date() }, new UniqueEntityId());
  }
}
