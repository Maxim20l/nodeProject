const Koa = require('koa');
const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    title: { type: String, required: true }
})
const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    subcategories: [subcategorySchema]
});
const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    images: [String],
});
const Product = mongoose.model('Product', productSchema);
const app = new Koa();


mongoose.set('strictQuery', true);
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/models');
        const childToys = await Category.create({
            title: "doors",
            subcategories: [
                {
                    title: "Прогулки и детская комната"
                },
                {
                    title: "Кормление и гигиена"
                },
                {
                    title: "Игрушки и развлечения"
                },
                {
                    title: "Активный отдых и улица"
                },
                {
                    title: 65
                },
                {
                    title: "Школьные товары"
                }
            ]
        })

        await Product.create({
            images: [
                "...", "..."
            ],
            title: "Коляска Adamex Barletta 2 in 1",
            description: "Универсальная модель, которая с легкостью заменит родителям сразу ...",
            price: 21230,
            category: childToys,
            subcategory: childToys.subcategories[0]
        })
    } catch (error) {
        console.log(error.message);
    }

})()


app.use(async (ctx, next) => {
    ctx.body = 'all was ok';
})

app.listen(27017);
module.exports = { Product, Category, productSchema };