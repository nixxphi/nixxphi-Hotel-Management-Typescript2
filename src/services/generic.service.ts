import { Document, Model, FilterQuery, Types } from 'mongoose';

class GenericService<T extends Document> {
  constructor(private model: Model<T>) {}

  async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  async update(filter: FilterQuery<T>, data: Partial<T>): Promise<T | null> {
    return await this.model.findOneAndUpdate(filter, data, { new: true })
      .select('-__v -updatedAt -deleted');
  }

  async delete(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOneAndDelete(filter);
  }

  async find(filter: FilterQuery<T>): Promise<T | null> {
    filter = { deleted: false, ...filter }; // Ensure deleted: false
    return await this.model.findOne(filter)
      .select('-__v -updatedAt -deleted');
  }

  async search(filter?: FilterQuery<T>): Promise<{ data: T[]; currentPage: number; totalPages: number }> {
    const page = filter?.page ? parseInt(filter.page.toString()) : 1;
    const perPage = filter?.limit ? parseInt(filter.limit.toString()) : 0;

    delete filter?.page;
    delete filter?.limit;

    let data: T[] = [];
    let totalCount: number;

    if (filter) {
      const filterQuery: FilterQuery<T> = filter as FilterQuery<T>; 
      totalCount = await this.model.countDocuments(filterQuery);
      data = await this.model.find(filterQuery)
          .skip((page - 1) * perPage)
          .limit(perPage)
          .sort({ createdAt: -1 })
          .select('-__v -updatedAt -deleted');
  } else {
    const deletedFilter: FilterQuery<T> = { deleted: false } as unknown as FilterQuery<T>;
      totalCount = await this.model.countDocuments(deletedFilter);
      data = await this.model.find(deletedFilter)
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
