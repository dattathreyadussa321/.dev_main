import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const blogShareSchema = new Schema(
  {
    // String form of the BlogPost id (hex), matching how blog-db passes post.id.
    postId: { type: String, required: true },
    channel: { type: String, required: true },
    visitorHash: { type: String, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

blogShareSchema.index({ postId: 1 });

export type BlogShareDoc = InferSchemaType<typeof blogShareSchema>;

export const BlogShare: Model<BlogShareDoc> =
  (models.BlogShare as Model<BlogShareDoc>) ?? model<BlogShareDoc>("BlogShare", blogShareSchema);
