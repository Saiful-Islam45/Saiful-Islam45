const axios = require('axios');
const fs = require('fs');

const mediumUsername = '@saiful-islam-ice-45';

async function fetchLatestMediumPost() {
  try {
    const response = await axios.get(`https://medium-rss-badge.vercel.app/api/user/${mediumUsername}`);
    const data = response.data;

    const latestPost = data.items[0]; // Assuming the first item is the latest post

    return {
      title: latestPost.title,
      image: latestPost.thumbnail,
      url: latestPost.link,
    };
  } catch (error) {
    console.error('Error fetching Medium post:', error.message);
    throw error;
  }
}

async function updateReadme() {
  try {
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
  } catch (error) {
    console.error('Error updating README:', error.message);
    throw error;
  }
}

updateReadme();
