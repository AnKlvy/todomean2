const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    account_id: { type: Number },
    transaction_count: { type: Number },
    bucket_start_date: { type: Date },
    bucket_end_date: { type: Date },
    transactions: [{
        date: { type: Date },
        amount: { type: Number },
        transaction_code: { type: String },
        symbol: { type: String },
        price: { type: String },
        total: { type: String }
    }]
});

module.exports = mongoose.model("Trans", transactionSchema);
