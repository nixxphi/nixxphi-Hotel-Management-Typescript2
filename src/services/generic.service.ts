import { Document, Model, FilterQuery } from 'mongoose';

class GenericService<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: any): Promise<T> {
        return this.model.create(data);
    }

    async update(filter: FilterQuery<T>, data: any): Promise<T | null> {
        return await this.model.findOneAndUpdate(filter, data, { new: true })
            .select('-__v -updatedAt -deleted');
    }

    async delete(filter: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOneAndDelete(filter);
    }

    async find(filter: FilterQuery<T>): Promise<T | null> {
        filter = { deleted: false, ...filter };
        return await this.model.findOne(filter)
            .select('-__v -updatedAt -deleted');
    }

    async search(filter?: FilterQuery<T>): Promise<{ data: T[]; currentPage: number; totalPages: number }> {
        const page: number = filter?.page ? parseInt(filter.page.toString()) : 1;
        const perPage: number = filter?.limit ? parseInt(filter.limit.toString()) : 0;

        delete filter?.page;
        delete filter?.limit;

        let data: T[] = [];
        let totalCount: number;

        if (filter) {
            filter = filter?.deleted ? filter : filter.hasOwnProperty('deleted') ? filter : { deleted: false, ...filter };

            totalCount = await this.model.countDocuments(filter);
            data = await this.model.find(filter)
                .skip((page - 1) * perPage)
                .limit(perPage)
                .sort({ createdAt: -1 })
                .select('-__v -updatedAt -deleted');
        } else {
            totalCount = await this.model.countDocuments({ deleted: false });
            data = await this.model.find({ deleted: false })
                .skip((page - 1) * perPage)
                .limit(perPage)
                .sort({ createdAt: 1 })
                .select('-__v -updatedAt -deleted');
        }

        return {
            data,
            currentPage: page,
            totalPages: Math.ceil(totalCount / perPage)
        };
    }
}

export default GenericService;
