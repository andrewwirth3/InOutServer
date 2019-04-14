import * as bcrypt from 'bcrypt-nodejs';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Length,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import Event from './event.model';
import User from './user.model';

@Table({
  timestamps: true,
  paranoid: false
})
export default class EventResponse extends Model<EventResponse> {
  // Relations
  @ForeignKey(() => Event)
  @Column
  public eventId: number;

  @BelongsTo(() => Event)
  public event: Event;

  @ForeignKey(() => User)
  @Column
  public username: string;

  @BelongsTo(() => User)
  public user: User;

  // Fields

  @Column
  public value: boolean;
}
