import { model, Schema } from 'mongoose';
import { ITag, ITagModel } from './tag.interface';

const tagSchema = new Schema<ITag, ITagModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    short_code: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

tagSchema.index({ name: 1 });

export const Tag = model<ITag, ITagModel>('Tag', tagSchema);

