import {
  AllowNull,
  Column,
  Default,
  HasMany,
  HasOne,
  Length,
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
  @Default(true)
  @AllowNull(false)
  @Column
  public isActive: boolean;

  @AllowNull(false)
  @Length({ max: 50 })
  @Column
  public name: string;
}
