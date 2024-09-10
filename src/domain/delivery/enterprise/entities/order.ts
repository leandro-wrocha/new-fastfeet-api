import { AggregateRoot } from 'src/core/entities/aggregate-root';
import { OrderStatus } from '../enums/order-status';
import { Address } from './value-objects/address';
import { Optional } from 'src/core/types/optional';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export interface OrderProps {
  id?: UniqueEntityId;
  recipientId: string;
  delivererId: string;
  deliveryAddress: Address;
  status?: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order extends AggregateRoot<OrderProps> {
  constructor(props: OrderProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get delivererId() {
    return this.props.delivererId;
  }

  get deliveryAddress() {
    return this.props.deliveryAddress;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  set delivererId(delivererId: string) {
    this.props.delivererId = delivererId;
  }

  set deliveryAddress(deliveryAddress: Address) {
    this.props.deliveryAddress = deliveryAddress;
  }

  set status(status: OrderStatus) {
    this.props.status = status;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  static create(
    props: Optional<OrderProps, 'status' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? OrderStatus.PENDING,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return order;
  }
}
