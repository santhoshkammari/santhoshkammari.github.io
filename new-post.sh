#!/bin/bash

# Script to create a new blog post
# Usage: ./new-post.sh "Your Post Title"

if [ $# -eq 0 ]; then
    echo "Usage: ./new-post.sh \"Your Post Title\""
    exit 1
fi

# Get the title from command line argument
TITLE="$1"

# Create filename from title (lowercase, replace spaces with hyphens)
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')

# Get current date
DATE=$(date +%Y-%m-%d)

# Create the full filename
FULL_FILENAME="_posts/${DATE}-${FILENAME}.md"

# Create the post content
cat > "$FULL_FILENAME" << EOF
---
layout: post
title: "$TITLE"
date: $DATE
author: Santhosh Kammari
summary: "Add a brief summary of your post here."
tags: [AI, Machine Learning]
read_time: 5
---

## Introduction

Write your blog post content here using markdown.

## Key Points

- Point 1
- Point 2
- Point 3

## Conclusion

Summarize your main points here.

---

*Add any additional notes or references here.*
EOF

echo "Created new post: $FULL_FILENAME"
echo "Don't forget to:"
echo "1. Edit the summary, tags, and read_time in the frontmatter"
echo "2. Replace the template content with your actual post"
echo "3. Commit and push to deploy to GitHub Pages"