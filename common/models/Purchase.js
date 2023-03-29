import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},    { collection: 'purchases' });


const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;