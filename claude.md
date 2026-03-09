# Project: iaintreadingallthat.com
**Tagline:** Daily AI slop, decoded.

## 1. Vision
A daily AI news aggregator that cuts through the technical jargon and "hype-beast" LinkedIn posts to give users a Gen-Z flavored TL;DR of the last 24 hours in AI.

## 2. Core Features
- **The "Morning Drop":** A fresh list of 3-5 major AI updates, published daily at 8:00 AM EST.
- **Vibe-Check Summaries:** Headlines and bullet points written in Gen-Z/Internet slang (e.g., "OpenAI just dropped a new model and it's actually cracked," "Google's latest demo was a nothingburger").
- **"Deep Lore" Sections:** Expandable cards for each news item containing a 2-3 sentence technical description and links to original sources/ArXiv papers.
- **Calendar/Archive:** A simple "rewind" feature to see news from previous days.

## 3. Tech Stack
- **Frontend:** React/Next.js (Tailwind CSS for styling).
- **Backend:** Supabase (Database + Auth).
- **Automation:** Python script running on a CRON job (8:00 AM) that:
    1. Scrapes news from X, TechCrunch, and Hugging Face.
    2. Uses Gemini/Claude API to summarize into the "Gen-Z" persona.
    3. Pushes the JSON to the database.

## 4. UI/UX "The Vibe"
- **Design System:** High-contrast "Neo-Brutalism" (bold borders, bright shadows, thick fonts).
- **Mobile First:** Designed to look like a social media feed or a group chat.