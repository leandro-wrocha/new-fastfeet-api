import { Admin } from '../../enterprise/entities/admin';

export interface AdminsRepository {
  findAdminById: (id: string) => Promise<Admin | null>;
  save: (admin: Admin) => Promise<void>;
}
