import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // when an entity that returned by repository,
  // we don't want password to be returned to client,
  // so when, user controller turns user entity to an plain
  // object, we use @Exclude decorator to trim password away from
  // the plain user object
  //@Exclude({ toPlainOnly: true })
  // 
  password: string;

  //hook methods
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('removed user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated user with id', this.id);
  }
}
