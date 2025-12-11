import { model, Schema } from 'mongoose';
import { CloseAccountRequestModel, CLOSING_STATUS, ICloseAccountRequest } from './close_account_request.interface';

const closeAccountRequestSchema = new Schema<ICloseAccountRequest, CloseAccountRequestModel>(
  {
    marketing_permission: {
      type: Boolean,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    closing_status: {
      type: String,
      required: true,
      default: CLOSING_STATUS.PENDING,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requested_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const CloseAccountRequest = model<ICloseAccountRequest>('CloseAccountRequest', closeAccountRequestSchema);
