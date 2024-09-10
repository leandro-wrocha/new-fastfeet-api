interface AddressProps {
  zipCode: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export class Address {
  constructor(
    public zipCode: string,
    public street: string,
    public number: number,
    public complement: string,
    public neighborhood: string,
    public city: string,
    public state: string,
  ) {}

  static create({
    zipCode,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
  }: AddressProps) {
    return new Address(
      zipCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
    );
  }
}
