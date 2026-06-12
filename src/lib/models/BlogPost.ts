import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const blogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    content: { type: String, required: true },
    coverImage: { type: String, default: null },
    author: { type: String, default: "Patashala.Dev Team" },
    readingTime: { type: String, default: null },
    published: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    metaTitle: { type: String, default: null },
    metaDescription: { type: String, default: null },
    ogImage: { type: String, default: null },
  },
  { timestamps: true },
);

blogPostSchema.index({ published: 1, date: -1 });
blogPostSchema.index({ category: 1 });

export type BlogPostDoc = InferSchemaType<typeof blogPostSchema>;

export const BlogPost: Model<BlogPostDoc> =
  (models.BlogPost as Model<BlogPostDoc>) ?? model<BlogPostDoc>("BlogPost", blogPostSchema);
