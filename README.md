# Personal Blog

A clean, minimal blog built with Jekyll and GitHub Pages, inspired by Anthropic's design aesthetics.

## Features

- 🎨 **Anthropic-inspired design** with orange accents and clean typography
- 📱 **Responsive design** that works on all devices
- 📝 **Easy blog posting** with markdown support
- 🏠 **Home page** with recent posts preview
- 📄 **Resume/About page** for professional information
- 🚀 **GitHub Pages deployment** with automatic builds

## Quick Start

### 1. Setup Repository
1. Create a new repository named `yourusername.github.io`
2. Clone this repository or copy all files to your new repo
3. Update `_config.yml` with your information

### 2. Customize Content
1. Edit `_config.yml` with your personal information
2. Update `index.html` hero section with your name and description
3. Edit `resume.html` with your experience and skills
4. Replace the sample blog post with your own content

### 3. Deploy to GitHub Pages
1. Go to your repository Settings → Pages
2. Select "GitHub Actions" as the source
3. Push changes to the `main` branch
4. Your site will be live at `https://yourusername.github.io`

## Adding New Blog Posts

Create a new file in the `_posts` directory with the format:
```
YYYY-MM-DD-title-of-your-post.md
```

Example post structure:
```markdown
---
layout: post
title: "Your Post Title"
date: 2024-01-15
author: Your Name
summary: "A brief summary of your post that appears on the blog listing."
tags: [AI, Machine Learning, Programming]
read_time: 5
---

Your blog post content here using markdown...
```

## File Structure

```
├── _config.yml           # Site configuration
├── _layouts/             # HTML templates
│   ├── default.html      # Main site layout
│   └── post.html         # Blog post layout
├── _posts/               # Blog posts (markdown)
├── assets/css/           # Stylesheets
├── .github/workflows/    # GitHub Actions for deployment
├── index.html            # Home page
├── blog.html             # Blog listing page
├── resume.html           # Resume/About page
└── README.md             # This file
```

## Customization

### Colors
Edit the CSS variables in `assets/css/main.css`:
```css
:root {
  --orange-primary: #E67E22;   /* Main orange color */
  --orange-light: #F39C12;     /* Lighter orange */
  --orange-dark: #D35400;      /* Darker orange */
  /* ... other colors */
}
```

### Typography
The site uses Inter font by default. You can change this in the CSS:
```css
--font-family: 'Your Font', sans-serif;
```

### Layout
- Modify `_layouts/default.html` for site-wide changes
- Edit individual page files for page-specific content
- Customize `_layouts/post.html` for blog post appearance

## Local Development

1. Install Ruby and Bundler
2. Run `bundle install`
3. Run `bundle exec jekyll serve`
4. Open `http://localhost:4000`

## License

This theme is open source and available under the MIT License.