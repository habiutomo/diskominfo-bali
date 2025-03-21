import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewsSchema = createInsertSchema(news).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  category: true,
  imageUrl: true,
});

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: text("file_size").notNull(),
  downloadUrl: text("download_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPublicationSchema = createInsertSchema(publications).pick({
  title: true,
  description: true,
  fileType: true,
  fileSize: true,
  downloadUrl: true,
});

export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type Publication = typeof publications.$inferSelect;
