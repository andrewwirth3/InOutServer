import * as bcrypt from 'bcrypt-nodejs';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import EventResponse from './eventresponse.model';
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

  @HasMany(() => EventResponse)
  public responses: EventResponse[];

  // Fields

  @Column
  @Default(true)
  public isActive: boolean;

  @Column
  @Length({ max: 100 })
  public description: string;

  @Column
  @Length({ max: 100 })
  public location: string;

  @Column
  public start: Date;

  @Column
  public end: Date;

  @Column
  @AllowNull(false)
  @Default(0)
  public min: number;

  @Column
  @AllowNull(false)
  @Default(5)
  public max: number;
}
