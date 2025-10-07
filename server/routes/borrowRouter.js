import express from 'express';
import { borrowedBooks, recordBorrowedBook, getBorrowedBooksForAdmin , returnBorrowBook } from '../controllers/borrowController.js';
import { isAuthenticated ,isAuthorized} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/my-borrowed-books', isAuthenticated, borrowedBooks);
router.post('/record-borrow-book/:id', isAuthenticated, isAuthorized("admin"), recordBorrowedBook);
router.get('/borrowed-books-by-users', isAuthenticated, isAuthorized("admin"), getBorrowedBooksForAdmin);
router.put('/return-borrowed-book/:bookId', isAuthenticated,isAuthorized("admin"), returnBorrowBook);

export default router;