import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Admin, AdminProps } from 'src/domain/people/enterprise/entities/admin';
import { faker } from '@faker-js/faker';

export function makeAdmin(
  override: Partial<AdminProps>,
  id?: UniqueEntityId,
): Admin {
  const admin = Admin.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric({ length: 11 }),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return admin;
}
