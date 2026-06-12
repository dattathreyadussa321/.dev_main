import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const caseStudySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    challenge: { type: String, required: true },
    approach: { type: String, required: true },
    results: { type: [String], default: [] },
    stack: { type: [String], default: [] },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type CaseStudyDoc = InferSchemaType<typeof caseStudySchema>;

export const CaseStudy: Model<CaseStudyDoc> =
  (models.CaseStudy as Model<CaseStudyDoc>) ??
  model<CaseStudyDoc>("CaseStudy", caseStudySchema);
