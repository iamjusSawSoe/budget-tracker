import "dotenv/config";
import process from "node:process";
import { ZodError, z } from "zod";

// Define the schema for environment variables
const configSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d{4,5}$/) // Port should be 4-5 digit numbers
    .optional()
    .default("3000"),
  API_BASE_URL: z.string().url().default("/api"),
  DB_URL: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith("postgres://") || url.startsWith("postgresql://"),
      "DB_URL must be a valid PostgreSQL URL"
    ),
  FROM_NAME: z.string().default("Verify"),
  FROM_EMAIL: z.string().email(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  JWT_SECRET: z.string(),
});

// Parse and validate the environment variables
let config: z.infer<typeof configSchema>;
try {
  config = configSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    console.error("❌ Invalid environment variables:", error.errors);
  }
  process.exit(1); // Exit if validation fails
}

// Export the validated environment variables
export const ENV = config;
