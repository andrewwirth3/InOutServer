import { FindOptions, Model, UpdateOptions } from 'sequelize/types';

export interface IBaseRepo<T> {
    add<M extends Model>(item: M): Promise<M>;
    update<M extends Model>(item: M, options?: UpdateOptions): Promise<M>;
    delete<M extends Model>(item: M): Promise<M>;
    find<M extends Model>(options: FindOptions, scope?: string): Promise<M[]>;
    findOne<M extends Model>(
        id: number,
        scope?: string,
        options?: FindOptions
    ): Promise<M>;
}
