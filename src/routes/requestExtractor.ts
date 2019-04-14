import { Request } from 'express';
import { FindAttributeOptions, FindOptions, Order } from 'sequelize/types';

export class RequestExtractor {
    public buildFindOptions(req: Request): FindOptions {
        const opt: FindOptions = {};
        opt.offset = this.getOffset(req);
        opt.limit = this.getLimit(req);
        opt.order = this.getSort(req);
        opt.attributes = this.getFields(req);
        return opt;
    }

    public getScope(req: Request): string {
        let result: string = null;
        if (req.query.scope) {
            result = req.query.scope;
        }
        return result;
    }

    private getOffset(req: Request): number {
        let result: number = 20;
        if (req.query.offset) {
            result = req.query.offset;
        }
        return result;
    }

    private getLimit(req: Request): number {
        let result: number = null;
        if (req.query.limit) {
            result = req.query.limit;
        }
        return result;
    }

    private getSort(req: Request): Order {
        let result: any[] = null;
        if (req.query.sort) {
            result = [];
            req.query.sort.split(',').forEach((item) => {
                let order = 'ASC';
                let prop = item.substr(1);
                if (item.startsWith('-')) {
                    order = 'DESC';
                } else if (item.startsWith('+') === false) {
                    prop = item;
                }
                result.push([prop, order]);
            });
        }
        return result;
    }

    private getFields(req: Request): FindAttributeOptions {
        let result: string[] = null;
        if (req.query.fields) {
            result = [];
            req.query.fields.split(',').forEach((field: string) => {
                result.push(field.trim());
            });
        }
        return result;
    }
}
