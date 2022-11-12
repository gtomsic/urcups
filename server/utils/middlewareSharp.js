const sharp = require('sharp');
const fs = require('fs');

module.exports.imageResize = async (data) => {
   // Create a user folder
   // Link to users_id
   let dir = `./users/${data.user_id}/${data.album}`;
   if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
   }
   await sharp(data.path)
      .resize({
         width: data.width,
         height: data.height,
         fit: sharp.fit.cover,
         position: sharp.strategy.entropy,
      })
      .toFormat('jpeg')
      .jpeg({ quality: data.quality })
      .toFile(data.location);
};
