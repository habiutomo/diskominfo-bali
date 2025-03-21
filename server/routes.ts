import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { validateRequest } from "./middleware";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/news', async (req: Request, res: Response) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ message: 'Failed to fetch news articles' });
    }
  });

  app.get('/api/news/category/:category', async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const news = await storage.getNewsByCategory(category);
      res.json(news);
    } catch (error) {
      console.error(`Error fetching news for category ${req.params.category}:`, error);
      res.status(500).json({ message: 'Failed to fetch news articles by category' });
    }
  });

  app.get('/api/news/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const newsItem = await storage.getNewsBySlug(slug);
      
      if (!newsItem) {
        return res.status(404).json({ message: 'News article not found' });
      }
      
      res.json(newsItem);
    } catch (error) {
      console.error(`Error fetching news article with slug ${req.params.slug}:`, error);
      res.status(500).json({ message: 'Failed to fetch news article' });
    }
  });

  app.get('/api/publications', async (req: Request, res: Response) => {
    try {
      const publications = await storage.getPublications();
      res.json(publications);
    } catch (error) {
      console.error('Error fetching publications:', error);
      res.status(500).json({ message: 'Failed to fetch publications' });
    }
  });

  app.get('/api/publications/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid publication ID' });
      }
      
      const publication = await storage.getPublication(id);
      
      if (!publication) {
        return res.status(404).json({ message: 'Publication not found' });
      }
      
      res.json(publication);
    } catch (error) {
      console.error(`Error fetching publication with ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to fetch publication' });
    }
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const result = await storage.createContactSubmission(validatedData);
      res.status(201).json({
        message: 'Contact form submitted successfully',
        id: result.id
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: 'Validation error',
          errors: validationError.details
        });
      }
      
      res.status(500).json({ message: 'Failed to submit contact form' });
    }
  });

  // Middleware for request body validation
  function validateRequest(schema: any) {
    return (req: Request, res: Response, next: Function) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ 
            message: 'Validation error',
            errors: validationError.details
          });
        }
        
        next(error);
      }
    };
  }

  const httpServer = createServer(app);
  return httpServer;
}
