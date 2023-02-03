const Koa = require('koa');
const mongoose = require('mongoose');
const Router = require('koa-router');
const { productSchema, Product } = require('../productModelsAndcategories/index');
const correctProdductObj = require('../onlineStore/helpers/correctProdductObj');

const app = new Koa();
const router = new Router();

router.get('/api/products', async (ctx, next) => {
    try {
        const { query } = ctx.query;
        productSchema.index(
            {
                title: "text",
                description: "text"
            },
            {
                weights: {
                    title: 10,
                    description: 5
                },
                default_language: 'russian',
                name: 'TextSearchIndex'
            }
        )
        Product.createIndexes();
        const product = await Product.find(
            { $text: { $search: query } },
            {
                score: { $meta: "textScore" }
            }
        ).sort(
            { score: { $meta: 'textScore' } }
        ).limit(5)
        const correctProduct = product.map(element => {
            return correctProdductObj(element);
        })
        ctx.body = correctProduct;
    } catch (error) {
        ctx.body = error.message
    }

})

app.use(router.routes());
app.listen(3000, () => {
    console.log('server listen');
})