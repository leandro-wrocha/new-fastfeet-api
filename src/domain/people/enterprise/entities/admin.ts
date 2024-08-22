import { randomUUID } from 'node:crypto';

interface AdminProps {
  id?: string;
  name: string;
  cpf: string;
  password: string;
  createdAt?: Date;
}

export class Admin {
  constructor(private adminProps: AdminProps) {}

  get id() {
    return this.adminProps.id;
  }

  get name() {
    return this.adminProps.name;
  }

  get cpf() {
    return this.adminProps.cpf;
  }

  get password() {
    return this.adminProps.password;
  }

  get createdAt() {
    return this.adminProps.createdAt;
  }

  set name(value: string) {
    this.adminProps.name = value;
  }

  set cpf(value: string) {
    this.adminProps.cpf = value;
  }

  set password(value: string) {
    this.adminProps.password = value;
  }

  static create(props: AdminProps) {
    return new Admin({ ...props, id: randomUUID(), createdAt: new Date() });
  }
}
