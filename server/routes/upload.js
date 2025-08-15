const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for PDFs only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Only allow 1 file per request
  }
});

// Validation middleware
const validateUpload = [
  body('schemeName').optional().isString().trim().isLength({ min: 1, max: 200 }),
  body('description').optional().isString().trim().isLength({ max: 1000 }),
  body('language').optional().isIn(['en', 'hi', 'te', 'auto'])
];

// Upload single PDF file
router.post('/pdf', upload.single('pdf'), validateUpload, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: true,
        message: 'Validation failed',
        details: errors.array()
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: 'No PDF file uploaded'
      });
    }

    // Extract file information
    const fileInfo = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadDate: new Date(),
      schemeName: req.body.schemeName || 'Untitled Scheme',
      description: req.body.description || '',
      language: req.body.language || 'auto'
    };

    // Log successful upload
    console.log(`PDF uploaded successfully: ${fileInfo.filename}`);

    // Return success response
    res.status(200).json({
      error: false,
      message: 'PDF uploaded successfully',
      data: {
        fileId: fileInfo.filename,
        originalName: fileInfo.originalName,
        size: fileInfo.size,
        uploadDate: fileInfo.uploadDate,
        schemeName: fileInfo.schemeName,
        status: 'ready_for_analysis'
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to upload PDF',
      details: error.message
    });
  }
});

// Get upload status
router.get('/status/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const filePath = path.join(uploadsDir, fileId);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: true,
        message: 'File not found'
      });
    }

    const stats = fs.statSync(filePath);
    const fileInfo = {
      fileId,
      size: stats.size,
      uploadDate: stats.birthtime,
      lastModified: stats.mtime,
      status: 'uploaded'
    };

    res.status(200).json({
      error: false,
      data: fileInfo
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to get file status'
    });
  }
});

// Delete uploaded file
router.delete('/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const filePath = path.join(uploadsDir, fileId);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: true,
        message: 'File not found'
      });
    }

    // Delete file
    fs.unlinkSync(filePath);
    console.log(`File deleted: ${fileId}`);

    res.status(200).json({
      error: false,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to delete file'
    });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: true,
        message: 'File too large. Maximum size is 10MB'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: true,
        message: 'Too many files. Only 1 file allowed per request'
      });
    }
  }
  
  if (error.message === 'Only PDF files are allowed') {
    return res.status(400).json({
      error: true,
      message: 'Only PDF files are allowed'
    });
  }

  next(error);
});

module.exports = router;
