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
import Series from './series.model';

@Table({
  timestamps: true,
  paranoid: false
})
export default class Event extends Model<Event> {
  // Relations
  @ForeignKey(() => Series)
  @Column
  public seriesId: number;

  @BelongsTo(() => Series)
  public series: Series;

  // Fields

  @Column
  @Default(true)
  public isActive: boolean;
}
