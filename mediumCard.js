const fetch = require('node-fetch');
const fs = require('fs');

const mediumUsername = '@saiful-islam-ice-45';

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
  const { title, image, url } = await fetchLatestMediumPost();

  const readmeContent = `# Latest Blog Post
  [![Latest Blog Post](${image})](${url})
  
  Read the full post: [${title}](${url})
  `;

  fs.writeFileSync('README.md', readmeContent);
}

updateReadme();
