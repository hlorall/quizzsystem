import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {

@PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ name: 'password', type: 'char', length: 255 })
  password: string;

    @Column()
    role: string;

    @Column({name : 'created_at'})
    created_at: Date;

    @Column({name : 'updated_at'})
    updated_at: Date;

    @Column({name : 'created_by'})
    created_by: string;

    @Column({name : 'updated_by'})
    updated_by: string;
    
}