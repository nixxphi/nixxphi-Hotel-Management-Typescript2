"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class GenericService {
    constructor(model) {
        this.model = model;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findById(id).exec();
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Return the created document using type assertion
            return yield this.model.create(data);
        });
    }
    update(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update with options and projection, return updated document or null
            return yield this.model.findOneAndUpdate(filter, data, { new: true })
                .select('-__v -updatedAt -deleted');
        });
    }
    delete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find and delete one document, return deleted document or null
            return yield this.model.findOneAndDelete(filter);
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            // Apply default filter for deleted documents and project desired fields
            filter = Object.assign({ deleted: false }, filter);
            return (yield this.model.findOne(filter).select('-__v -updatedAt -deleted')) || null;
        });
    }
    search(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = (filter === null || filter === void 0 ? void 0 : filter.page) ? parseInt(filter === null || filter === void 0 ? void 0 : filter.page) : 1;
            const perPage = (filter === null || filter === void 0 ? void 0 : filter.limit) ? parseInt(filter === null || filter === void 0 ? void 0 : filter.limit) : 0;
            filter === null || filter === void 0 ? true : delete filter.page;
            filter === null || filter === void 0 ? true : delete filter.limit;
            let data = [];
            let totalCount;
            if (filter) {
                // Handle filters with or without "deleted" property
                filter = (filter === null || filter === void 0 ? void 0 : filter.deleted)
                    ? filter
                    : filter.hasOwnProperty('deleted')
                        ? filter
                        : Object.assign({ deleted: false }, filter);
                totalCount = yield this.model.countDocuments(filter);
                data = yield this.model.find(filter)
                    .skip((page - 1) * perPage)
                    .limit(perPage)
                    .sort({ createdAt: -1 })
                    .select('-__v -updatedAt -deleted');
            }
            else {
                // Find non-deleted documents with pagination and sorting
                data = yield this.model.find()
                    .skip((page - 1) * perPage)
                    .limit(perPage)
                    .sort({ createdAt: 1 })
                    .select('-__v -updatedAt');
            }
            totalCount = yield this.model.countDocuments(filter);
            return {
                data,
                currentPage: page,
                totalPages: Math.ceil(totalCount / perPage),
            };
        });
    }
    handleDocumentResponse(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.model.findOne(filter).select('-__v -updatedAt -deleted');
            return doc || null;
        });
    }
}
exports.default = GenericService;
//# sourceMappingURL=generic.service.js.map