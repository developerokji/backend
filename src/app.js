const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ENV } = require('./constants');
const { errorMiddleware } = require('./middlewares/error.middleware');
const { requestLoggerMiddleware } = require('./middlewares/logger.middleware');
const { requestIdMiddleware } = require('./middlewares/requestId.middleware');

// Routes
const userRoutes = require('./routes/user.routes');
const storyRoutes = require('./routes/story.routes');
const stateRoutes = require('./routes/state.routes');
const cityRoutes = require('./routes/city.routes');
const localityRoutes = require('./routes/locality.routes');
const bannerRoutes = require('./routes/banner.routes');
const categoryRoutes = require('./routes/category.routes');
const subCategoryRoutes = require('./routes/sub-category.routes');

const app = express();

// Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Request ID and logging
app.use(requestIdMiddleware);
app.use(requestLoggerMiddleware);

// Routes definition
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    data: null,
    error: null,
  });
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stories', storyRoutes);
app.use('/api/v1/states',     stateRoutes);
app.use('/api/v1/cities',     cityRoutes);
app.use('/api/v1/localities',     localityRoutes);
app.use('/api/v1/banners',        bannerRoutes);
app.use('/api/v1/categories',     categoryRoutes);
app.use('/api/v1/sub-categories', subCategoryRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    data: null,
    error: null,
  });
});

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;
