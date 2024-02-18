import { User } from '@shared/entities/user.entity';

export class LoginSerializer {
  phone: string;
  id: string;

  constructor(user: Partial<User>) {
    this.id = user.id;
  }
}
