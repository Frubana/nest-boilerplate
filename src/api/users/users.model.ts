
import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from '../../commons/base-model';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { name: 'name' })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column('varchar', { name: 'email', unique: true })
  public email: string;

}
