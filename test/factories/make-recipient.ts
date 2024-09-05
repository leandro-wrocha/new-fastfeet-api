import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import {
  Recipient,
  RecipientProps,
} from 'src/domain/people/enterprise/entities/recipient';

export function makeRecipient(
  override: Partial<RecipientProps>,
  id?: UniqueEntityId,
): Recipient {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric({ length: 11 }),
      ...override,
    },
    id,
  );

  return recipient;
}
