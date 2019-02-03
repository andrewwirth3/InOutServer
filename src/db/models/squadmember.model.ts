import * as bcrypt from 'bcrypt-nodejs';
import {
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
import Squad from './squad.model';
import User from './user.model';

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
  public userId: number;

  @BelongsTo(() => User)
  public user: User;

  // Fields

  @Column
  @Default(true)
  public isActive: boolean;
}