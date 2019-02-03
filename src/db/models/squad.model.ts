import {
  Column,
  Default,
  HasMany,
  HasOne,
  Model,
  Table
} from 'sequelize-typescript';
import Series from './series.model';
import SquadMember from './squadmember.model';

@Table({
  timestamps: true,
  paranoid: false
})
export default class Squad extends Model<Squad> {
  // Relations

  @HasMany(() => SquadMember)
  public events: SquadMember[];

  @HasMany(() => Series)
  public series: Series[];

  // Fields
  @Column
  @Default(true)
  public isActive: boolean;
}
