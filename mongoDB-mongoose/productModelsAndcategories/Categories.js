import mongoose from 'mongoose';

const subcategory = new mongoose.Schema({
    title: { type: String, required: true }
})
const category = new mongoose.Schema({
    title: { type: String, required: true },
    subcategories: [subcategory]
});



module.exports = mongoose.model('Category', category);