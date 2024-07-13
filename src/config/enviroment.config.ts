/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
export const DATABASE_URI = process.env.DATABASE_URI;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const OPENAI_KEY = process.env.OPENAI_KEY;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const CSV_FILE_PATH = process.env.CSV_FILE_PATH;
