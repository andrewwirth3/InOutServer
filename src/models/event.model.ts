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

  @Default(true)
  @Column
  public isActive: boolean;

  @Length({ max: 100 })
  @Column
  public description: string;

  @Length({ max: 100 })
  @Column
  public location: string;

  @Column
  public start: Date;

  @Column
  public end: Date;

  @AllowNull(false)
  @Default(0)
  @Column
  public min: number;

  @AllowNull(false)
  @Default(5)
  @Column
  public max: number;
}
