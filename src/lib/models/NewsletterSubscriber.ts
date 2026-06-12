import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const newsletterSubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type NewsletterSubscriberDoc = InferSchemaType<typeof newsletterSubscriberSchema>;

export const NewsletterSubscriber: Model<NewsletterSubscriberDoc> =
  (models.NewsletterSubscriber as Model<NewsletterSubscriberDoc>) ??
  model<NewsletterSubscriberDoc>("NewsletterSubscriber", newsletterSubscriberSchema);
