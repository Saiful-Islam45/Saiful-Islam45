import fetch from 'node-fetch';
import fs from 'fs';

const mediumUsername = 'yourusername';

async function fetchLatestMediumPost() {
  const response = await fetch(`https://medium-rss-badge.vercel.app/api/user/${mediumUsername}`);
  const data = await response.json();

  const latestPost = data.items[0]; // Assuming the first item is the latest post

  return {
    title: latestPost.title,
    image: latestPost.thumbnail,
    url: latestPost.link,
  };
}

async function updateReadme() {
  // Read existing README content
  const existingReadme = fs.readFileSync('README.md', 'utf-8');

  // Fetch latest Medium post information
  const { title, image, url } = await fetchLatestMediumPost();

  // Construct updated content
  const updatedContent = `
  # Latest Blog Post
  [![Latest Blog Post](${image})](${url})
  
  Read the full post: [${title}](${url})
  
  ${existingReadme}
  `;

  // Write updated content back to README
  fs.writeFileSync('README.md', updatedContent);
}

updateReadme();
