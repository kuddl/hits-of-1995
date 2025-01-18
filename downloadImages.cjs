const fs = require("fs");
const path = require("path");
const https = require("https"); // Use 'http' if the URL starts with 'http://'

// Read the JSON file
const songs = require("./src/data/songs.json").songs;

// Create a folder to save the images
const imagesFolder = path.join(__dirname, "images");
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder);
}

// Function to download an image
const downloadImage = async (url, filepath) => {
  const file = fs.createWriteStream(filepath);

  https
    .get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Failed to download image. Status Code: ${response.statusCode}`,
        );
        return;
      }

      response.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log("Image downloaded successfully");
      });
    })
    .on("error", (err) => {
      fs.unlink(filepath, () => {}); // Delete file if an error occurs
      console.error("Error downloading image:", err.message);
    });
};

// Download all images
const downloadAllImages = async () => {
  for (const song of songs) {
    const imageUrl = song.image;
    const imageFilename = path.basename(imageUrl);
    const imageFilepath = path.join(imagesFolder, imageFilename);
    try {
      await downloadImage(imageUrl, imageFilepath);
      console.log(`Downloaded: ${imageFilename}`);
    } catch (error) {
      console.error(`Failed to download ${imageFilename}:`, error.message);
    }
  }
};

downloadAllImages();
