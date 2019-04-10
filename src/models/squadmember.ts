import * as bcrypt from 'bcrypt-nodejs';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import Squad from './squad';
import User from './user';

@Table({
  timestamps: true,
  paranoid: false
})
export default class SquadMember extends Model<SquadMember> {
  // Relations
  @ForeignKey(() => Squad)
  @Column
  public squadId: number;

  @BelongsTo(() => Squad)
  public series: Squad;

  @ForeignKey(() => User)
  @Column
  public username: string;

  @BelongsTo(() => User)
  public user: User;

  // Fields
  @Default(true)
  @AllowNull(false)
  @Column
  public isActive: boolean;

  @AllowNull(false)
  @Default(1)
  @Column
  public sequence: number;
}
