import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import {
  Deliverer,
  DelivererProps,
} from 'src/domain/people/enterprise/entities/deliverer';

export function makeDeliverer(
  override: Partial<DelivererProps>,
  id?: UniqueEntityId,
): Deliverer {
  const deliverer = Deliverer.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric({ length: 11 }),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return deliverer;
}
