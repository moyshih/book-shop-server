import Book from './../common/models/Book.js';

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get book
const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        let book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ data: book });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new book
const createBook = async (req, res) => {
    const { title, author, publisher, price } = req.body;

    if (!title || !price)
        return res.status(401).json({ message: 'Book title or price missing' });

    try {
        const book = await Book.create({
            title,
            author,
            publisher,
            price
        });

        res.status(201).json({ data: book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a book
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, publisher, price } = req.body;

    try {
        let book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = title;
        book.author = author;
        book.publisher = publisher;
        book.price = price;

        await book.save();

        res.status(200).json({ data: book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.deleteOne();

        res.status(200).json({ data: book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });

    }
}

export default {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
}