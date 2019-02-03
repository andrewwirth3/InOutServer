import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table
} from 'sequelize-typescript';
import Event from './event.model';
import Squad from './squad.model';

@Table({
  timestamps: true,
  paranoid: false
})
export default class Series extends Model<Series> {
  // Relations

  @HasMany(() => Event)
  public events: Event[];

  @ForeignKey(() => Squad)
  public squadId: number;

  @BelongsTo(() => Squad)
  public squad: Squad;

  // Fields

  @Column
  @Default(false)
  public hasSchedule: boolean;

  @Column
  @Default(true)
  public isActive: boolean;
}
