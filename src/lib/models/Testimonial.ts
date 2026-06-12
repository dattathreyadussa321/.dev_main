import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const testimonialSchema = new Schema(
  {
    author: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type TestimonialDoc = InferSchemaType<typeof testimonialSchema>;

export const Testimonial: Model<TestimonialDoc> =
  (models.Testimonial as Model<TestimonialDoc>) ??
  model<TestimonialDoc>("Testimonial", testimonialSchema);
