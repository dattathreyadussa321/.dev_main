import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const blogLikeSchema = new Schema(
  {
    // String form of the BlogPost id (hex), matching how blog-db passes post.id.
    postId: { type: String, required: true },
    visitorHash: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

blogLikeSchema.index({ postId: 1, visitorHash: 1 }, { unique: true });
blogLikeSchema.index({ postId: 1 });

export type BlogLikeDoc = InferSchemaType<typeof blogLikeSchema>;

export const BlogLike: Model<BlogLikeDoc> =
  (models.BlogLike as Model<BlogLikeDoc>) ?? model<BlogLikeDoc>("BlogLike", blogLikeSchema);
