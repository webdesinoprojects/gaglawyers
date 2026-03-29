const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: {
        filename: req.file.filename,
        url: imageUrl,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};
