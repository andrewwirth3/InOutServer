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
  @PrimaryKey
  @AllowNull(false)
  @Column
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

  @Length({ max: 50 })
  @AllowNull(false)
  @Column
  public name: string;

  @Column({
    type: DataType.UUID
  })
  public userId: string;

  @Length({ max: 256 })
  @Column
  public email: string;

  @Length({ max: 15 })
  @Column
  public phone: string;

  @Default(true)
  @AllowNull(false)
  @Column
  public isActive: boolean;
}
