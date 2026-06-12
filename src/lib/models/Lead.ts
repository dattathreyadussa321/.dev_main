import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "WON",
  "LOST",
] as const;

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    company: { type: String, default: null },
    serviceInterest: { type: String, required: true },
    budget: { type: String, default: null },
    timeline: { type: String, default: null },
    message: { type: String, required: true },
    status: { type: String, enum: LEAD_STATUSES, default: "NEW" },
    source: { type: String, default: "website" },
    notes: { type: String, default: null },
  },
  { timestamps: true },
);

leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: 1 });

export type LeadDoc = InferSchemaType<typeof leadSchema>;

export const Lead: Model<LeadDoc> =
  (models.Lead as Model<LeadDoc>) ?? model<LeadDoc>("Lead", leadSchema);
