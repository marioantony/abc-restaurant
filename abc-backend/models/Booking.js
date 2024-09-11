const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    vacatingInSeconds: { type: Number, default: 0 },
    childrenCount: { type: Number, default: 0 },
    adultCount: { type: Number, required: true },
    roomCategory: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);