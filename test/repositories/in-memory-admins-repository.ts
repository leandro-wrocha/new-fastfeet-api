import { AdminsRepository } from 'src/domain/people/application/repositories/admins-repository';
import { Admin } from 'src/domain/people/enterprise/entities/admin';

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = [];

  async findById(id: string): Promise<Admin | null> {
    const admin = this.items.find(
      (item) => item.id.toString() === id && item.isAdmin(),
    );

    return admin ?? null;
  }

  async create(admin: Admin): Promise<void> {
    this.items.push(admin);
  }
}
