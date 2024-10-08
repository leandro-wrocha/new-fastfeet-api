import { AggregateRoot } from 'src/core/entities/aggregate-root';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Role } from '../enums/role';

export interface AdminProps {
  id?: UniqueEntityId;
  name: string;
  cpf: string;
  password: string;
  role?: Role;
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

  isAdmin() {
    return this.props.role === Role.ADMIN;
  }

  static create(props: AdminProps, id?: UniqueEntityId) {
    return new Admin(
      {
        ...props,
        role: Role.ADMIN,
        createdAt: new Date(),
      },
      id,
    );
  }
}
