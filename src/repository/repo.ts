import { FindOptions, Model, UpdateOptions } from 'sequelize/types';
import { IBaseRepo } from './../interfaces/baseRepo';

export class Repo<T> implements IBaseRepo<T> {
    private model: (new () => T) & typeof Model;

    constructor(model: (new () => T) & typeof Model) {
        this.model = model;
    }
    public async add<M extends Model>(item: M): Promise<M> {
        const result: M = this.model.create(item);
        return result;
    }
    public async update<M extends Model<any, any>>(
        item: M,
        options?: UpdateOptions
    ): Promise<M> {
        const result: M = this.model.update(item, options);
        return result;
    }
    public async delete<M extends Model<any, any>>(item: M): Promise<M> {
        // set status to D
        return this.update(item);
    }
    public async find<M extends Model<any, any>>(
        options: FindOptions
    ): Promise<M[]> {
        const result: M[] = this.model.findAll(options);
        return result;
    }
    public async findOne<M extends Model<any, any>>(
        id: number,
        options?: FindOptions
    ): Promise<M> {
        const result: M = this.model.findByPk(id, options);
        return result;
    }
}
