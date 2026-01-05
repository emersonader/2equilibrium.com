# How to Add/Edit Blog Posts

Blog posts are super easy to add or update! Just edit one simple JSON file.

## Adding a New Blog Post

1. Open the file: `data/blogPosts.json`

2. Add a new blog post object to the array. Copy this template:

```json
{
  "id": "your-post-url-slug",
  "title": "Your Blog Post Title",
  "author": "Graziella De Souza",
  "date": "2026-01-04",
  "image": "/images/your-image.jpg",
  "excerpt": "A short summary of your post (1-2 sentences).",
  "content": [
    {
      "type": "text",
      "value": "Your first paragraph goes here..."
    },
    {
      "type": "heading",
      "value": "Section Heading"
    },
    {
      "type": "text",
      "value": "More text content..."
    },
    {
      "type": "image",
      "src": "/images/your-image.jpg",
      "alt": "Image description",
      "caption": "Optional image caption"
    },
    {
      "type": "video",
      "src": "https://www.youtube.com/embed/VIDEO_ID",
      "alt": "Video description",
      "caption": "Optional video caption"
    }
  ],
  "tags": ["wellness", "nutrition", "movement"]
}
```

## Content Block Types

You can use these content types in any order:

### Text Block
```json
{
  "type": "text",
  "value": "Your paragraph text. You can use \n for line breaks."
}
```

### Heading Block
```json
{
  "type": "heading",
  "value": "Your Section Title"
}
```

### Image Block
```json
{
  "type": "image",
  "src": "/images/your-image.jpg",
  "alt": "Description of image",
  "caption": "Optional caption below the image"
}
```

### Video Block (YouTube, Vimeo, etc.)
```json
{
  "type": "video",
  "src": "https://www.youtube.com/embed/VIDEO_ID",
  "alt": "Video title",
  "caption": "Optional video caption"
}
```

**For YouTube videos:**
- Go to your YouTube video
- Click "Share" → "Embed"
- Copy the URL from `src="..."`
- Example: `https://www.youtube.com/embed/dQw4w9WgXcQ`

**For Vimeo videos:**
- Example: `https://player.vimeo.com/video/VIDEO_ID`

## Important Notes

1. **ID**: Must be unique and URL-friendly (lowercase, hyphens only)
   - Good: `my-wellness-journey`
   - Bad: `My Wellness Journey!`

2. **Date**: Format as `YYYY-MM-DD` (e.g., `2026-01-04`)

3. **Images**:
   - Place images in `/public/images/` folder
   - Reference them as `/images/filename.jpg`

4. **Order**: Blog posts are automatically sorted by date (newest first)

5. **Commas**: Make sure to add commas between blog post objects in the array!

## Example: Complete Blog Post

```json
{
  "id": "my-wellness-journey",
  "title": "My Personal Wellness Journey",
  "author": "Graziella De Souza",
  "date": "2026-01-04",
  "image": "/images/wellness-journey.jpg",
  "excerpt": "Sharing my story of transformation and how I discovered the power of sustainable wellness.",
  "content": [
    {
      "type": "text",
      "value": "Ten years ago, I was struggling with my health..."
    },
    {
      "type": "heading",
      "value": "The Turning Point"
    },
    {
      "type": "text",
      "value": "Everything changed when I discovered mindful eating..."
    },
    {
      "type": "image",
      "src": "/images/before-after.jpg",
      "alt": "Wellness transformation",
      "caption": "My transformation over 6 months"
    },
    {
      "type": "heading",
      "value": "What I Learned"
    },
    {
      "type": "text",
      "value": "Here are the three biggest lessons:\n1. Consistency beats intensity\n2. Self-compassion is essential\n3. Small changes create big results"
    },
    {
      "type": "video",
      "src": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "alt": "My wellness routine",
      "caption": "Watch my daily wellness routine"
    }
  ],
  "tags": ["personal story", "transformation", "inspiration"]
}
```

## Quick Tips

- Keep excerpts short (1-2 sentences)
- Use descriptive IDs that match your title
- Add 2-5 relevant tags per post
- Break long posts into sections with headings
- Add images to make posts visually engaging
- Videos should be embedded URLs (not direct file links)

## After Adding a Post

Just save the file! The blog will automatically update on refresh. No compilation or build step needed during development.

---

Need help? The existing blog posts in `blogPosts.json` are great examples to learn from!
