const express = require('express');
const router = express.Router();

const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

// Bookmark routes
router.post('/add-bookmark', authMiddleware.verifyToken, bookmarkController.addBookmark);
router.delete('/delete-bookmark/:title', authMiddleware.verifyToken, bookmarkController.deleteBookmark);
router.get('/get-bookmark/:title', authMiddleware.verifyToken, bookmarkController.getBookmarkByTitle);
router.get('/show-all-bookmarks', authMiddleware.verifyToken, bookmarkController.showAllBookmarks);

module.exports = router;