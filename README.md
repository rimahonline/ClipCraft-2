# ClipCraft | AI Social Media Generator

This is a professional Next.js application built for creating social media reels and posts using Genkit AI.

## Getting Started

1. **Environment Variables:** Ensure your `.env` file is configured with your `GOOGLE_GENAI_API_KEY`.
2. **Development:** Run `npm run dev` to start the development server.
3. **AI Flows:** Explore Genkit flows in `src/ai/flows/`.

## How to Export to GitHub

If you want to move this project to your own GitHub account:

1. **Create a new repository** on GitHub (do not initialize with README or License).
2. **Open the terminal** in this environment.
3. **Run the following commands**:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit from ClipCraft"

# Link to your GitHub repo (Replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main
git branch -M main
git push -u origin main
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **AI:** Genkit with Google Gemini
- **Styling:** Tailwind CSS + ShadCN UI
- **Icons:** Lucide React
