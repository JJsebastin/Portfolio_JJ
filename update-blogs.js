const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'public', 'blogs');
const outputFile = path.join(__dirname, 'public', 'blogs.json');

if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir);
}

const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

const blogs = files.map(file => {
  const content = fs.readFileSync(path.join(blogsDir, file), 'utf-8');
  
  // Extract metadata from frontmatter-like format at the top of the MD file
  const titleMatch = content.match(/^Title:\s*(.*)/m);
  const dateMatch = content.match(/^Date:\s*(.*)/m);
  const tagsMatch = content.match(/^Tags:\s*(.*)/m);
  const excerptMatch = content.match(/^Excerpt:\s*(.*)/m);
  
  return {
    slug: file.replace('.md', ''),
    title: titleMatch ? titleMatch[1] : file.replace('.md', ''),
    date: dateMatch ? dateMatch[1] : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : [],
    excerpt: excerptMatch ? excerptMatch[1] : ''
  };
});

// Sort blogs by date descending (optional, assumes parseable date format)
blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(blogs, null, 2));
console.log(`Successfully generated blogs.json with ${blogs.length} posts!`);
