import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { ITag } from './tag.interface';
import { Tag } from './tag.model';
import { tagSearchableFields } from './tag.constant';

const createTag = async (payload: ITag) => {
  const tag = await Tag.create(payload);
  return tag;
};

const getAllTags = async (query: Record<string, any>) => {
  const tagQuery = new QueryBuilder(Tag.find(), query)
    .search(tagSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    const data = await tagQuery.modelQuery.lean();
    const pagination = await tagQuery.getPaginationInfo();

  return { data, pagination };
};

const getSingleTag = async (id: string) => {
  const tag = await Tag.findById(id).lean();

  if (!tag) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Tag not found');
  }

  return tag;
};

const updateTag = async (id: string, payload: Partial<ITag>) => {
  const updated = await Tag.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();

  if (!updated) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Tag not found');
  }

  return updated;
};

const deleteTag = async (id: string) => {
  const deleted = await Tag.findByIdAndDelete(id).lean();

  if (!deleted) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Tag not found');
  }

  return deleted;
};

export const TagService = {
  createTag,
  getAllTags,
  getSingleTag,
  updateTag,
  deleteTag,
};

