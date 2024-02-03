const uploadImage = (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
      }
  
      const imageUrl = `/uploads/${req.file.filename}`;
      res.status(200).json({ success: true, message: "Image uploaded successfully", imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  module.exports = {
    uploadImage,
  };
  