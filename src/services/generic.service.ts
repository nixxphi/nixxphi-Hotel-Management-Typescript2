import { Model, Document } from 'mongoose';

class GenericService<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }
    
    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }
  async create(data: T): Promise<T> {
    // Return the created document using type assertion
    return await this.model.create(data);
  }

  async update(filter: any, data: Partial<T>): Promise<T | null> {
    // Update with options and projection, return updated document or null
    return await this.model.findOneAndUpdate(filter, data, { new: true })
  .select('-__v -updatedAt -deleted') as T | null; }

  async delete(filter: any): Promise<T | null> {
    // Find and delete one document, return deleted document or null
    return await this.model.findOneAndDelete(filter);
  }

  async find(filter: any): Promise<T | null> {
    // Apply default filter for deleted documents and project desired fields
    filter = { deleted: false, ...filter };
    return await this.model.findOne(filter).select('-__v -updatedAt -deleted') as T || null;}

  async search(filter: any): Promise<{ data: T[]; currentPage: number; totalPages: number }> {
    const page = filter?.page ? parseInt(filter?.page) : 1;
    const perPage = filter?.limit ? parseInt(filter?.limit) : 0;

    delete filter?.page;
    delete filter?.limit;

    let data: T[] = [];
    let totalCount: number;

    if (filter) {
      // Handle filters with or without "deleted" property
      filter = filter?.deleted
        ? filter
        : filter.hasOwnProperty('deleted')
          ? filter
          : { deleted: false, ...filter };

      totalCount = await this.model.countDocuments(filter);
      data = await this.model.find(filter)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 }) 
        .select('-__v -updatedAt -deleted');
        
    } else {
   // Find non-deleted documents with pagination and sorting
      data = await this.model.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: 1 })
      .select('-__v -updatedAt')
    }
    totalCount = await this.model.countDocuments(filter);
    return {
      data,
      currentPage: page,
      totalPages: Math.ceil(totalCount / perPage),
    };
  } private async handleDocumentResponse<U extends T>(filter: any): Promise<U | null> {
    const doc = await this.model.findOne(filter).select('-__v -updatedAt -deleted');
    return doc as U || null;
 }
}
export default GenericService;
