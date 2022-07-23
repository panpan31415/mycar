import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
@Injectable()
export class UsersService {
  /**
   * Notes:
   * The code 'private repo: Repository<User>'
   * defines a private property 'repo' with a type 'Repository'
   * and later assign it with a Repository object
   * which is already created by DJ container in run time.
   *
   * the generic type <User> tells typeorm that this repository only
   * contain User instances.
   *
   * @InjectRepository(User)
   * helps DI to understand that we need a 'User' Repository, DI uses
   * Repository as a type to create instances at run time, but it doesn't
   * know generic type well. So it needs the decorator 'InjectRepository'
   * to tell DI what type of Instances that Repository instances will hold.
   *
   * in short: when a Repository dependency use generic types, we need use
   * to decorator InjectRepository
   *
   */

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // this.repo.create return User entity instance
    const user = this.repo.create({ email, password });
    // save the instance to db
    return this.repo.save(user);
  }
}
