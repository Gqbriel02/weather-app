// controllers/bookmarkController.js
const Bookmark = require('../models/Bookmark');

exports.addBookmark = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title } = req.body;

    const existingBookmark = await Bookmark.findOne({ where: { title } });

    if (existingBookmark) {
      res.status(201).json({ message: 'Bookmark already exists' });
    } else {
      const bookmark = await Bookmark.create({ title, user_id: userId });
      res.status(201).json(bookmark);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const userId = req.user.userId;
    const title = req.params.title;

    const existingBookmark = await Bookmark.findOne({ where: { title } });

    if (!existingBookmark) {
      res.status(404).json({ message: 'Bookmark not found' });
    } else {
    await Bookmark.destroy({ where: { title: title, user_id: userId } });
    res.json({ message: 'Bookmark deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getBookmarkByTitle = async (req, res) => {
  try {
    const userId = req.user.userId;
    const title = req.params.title;

    const bookmark = await Bookmark.findOne({
      where: { title: title, user_id: userId },
    });

    if (!bookmark) {
      return res.json({ error: 'Bookmark not found' });
    }

    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.showAllBookmarks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookmarks = await Bookmark.findAll({ where: { user_id:userId } });

    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
