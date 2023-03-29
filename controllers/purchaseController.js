import Purchase from './../common/models/Purchase.js';

// Create a new purchase
const createPurchase = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const purchase = await Purchase.create({
            user: userId,
            book: bookId,
            date: Date.now()
        });

        res.status(201).json({ data: purchase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a user's previous purchases
const getPurchases = async (req, res) => {
    const { userId } = req.params;

    try {
        const purchases = await Purchase.find({ user: userId }).populate('book');
        res.status(200).json({ data: purchases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default {
    getPurchases,
    createPurchase,
}