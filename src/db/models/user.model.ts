import * as bcrypt from 'bcrypt-nodejs';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import EventResponse from './eventresponse.model';
import SquadMember from './squadmember.model';

@Table({
  timestamps: true,
  paranoid: false
})
export default class User extends Model<User> {
  // Relations

  @HasMany(() => EventResponse)
  public responses: EventResponse[];

  @HasMany(() => SquadMember)
  public memberships: SquadMember[];

  // Fields
  @Column
  @PrimaryKey
  @AllowNull(false)
  public username: string;

  @Column({
    type: DataType.VIRTUAL
  })
  set password(value: string) {
    this.setDataValue('password', value);
    this.setDataValue('passwordHash', value);
  }

  @Column
  public passwordHash: string;

  @Column
  @Length({ max: 50 })
  @AllowNull(false)
  public name: string;

  @Column({
    type: DataType.UUID
  })
  public userId: string;

  @Column
  @Length({ max: 256 })
  public email: string;

  @Column
  @Length({ max: 15 })
  public phone: string;

  @Column
  @Default(true)
  @AllowNull(false)
  public isActive: boolean;
}
