import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
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

    @Default(false)
    @AllowNull(false)
    @Column
    public isRecurring: boolean;

    @Default(true)
    @AllowNull(false)
    @Column
    public isActive: boolean;

    @Column
    public repeatCount: number;

    @Column(DataType.ENUM('DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR'))
    public repeatType: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';

    @Column
    public endDate: Date;

    @Column
    public endCount: number;

    @Column
    public repeatSunday: boolean;

    @Column
    public repeatMonday: boolean;

    @Column
    public repeatTuesday: boolean;

    @Column
    public repeatWednesday: boolean;

    @Column
    public repeatThursday: boolean;

    @Column
    public repeatFriday: boolean;

    @Column
    public repeatSaturday: boolean;

    @Column
    // first, last, # ('8' would equal 8th day of the month)
    public repeatMonthly: string;
}
