const Koa = require('koa');
const mongoose = require('mongoose');
const url = require('url');
const Router = require('koa-router');
const { Category } = require('../productModelsAndcategories/index');
const { Product } = require('../productModelsAndcategories/index');
const correctCategoryObj = require('./helpers/correctCategoryObj');
const querystring = require('node:querystring');
const correctProductObj = require('./helpers/correctProdductObj')

const app = new Koa();
const router = new Router();

router.get('/api/categories', async (ctx, next) => {
    try {
        const path = url.parse(ctx.url).pathname.slice(5);

        let user;
        if (path === 'categories') {
            user = await Category.find();
        }
        const updateUser = user.map(element => {
            return correctCategoryObj(element);
        })
        ctx.body = updateUser
    } catch (error) {
        console.log(error.message);
    }

})

router.get('/api/products', async (ctx, next) => {
    try {
        const { subcategory } = querystring.parse(url.parse(ctx.url).query);
        let product = await Product.find({ subcategory: subcategory });
        const body = product.map(element => {
            return correctProductObj(element)
        })
        ctx.body = body;
    } catch (error) {
        console.log(error.message);
        ctx.body = 'category not found'
    }
})

router.get('/api/products/:id', async (ctx, next) => {
    try {
        const path = url.parse(ctx.url).path;
        const id = path.slice(path.lastIndexOf('/') + 1);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            ctx.throw(400, 'not valid id')
        }
        const product = await Product.findById(id);
        if (product === null) {
            ctx.throw(404, 'product not found by id');
        }
        const corectProduct = correctProductObj(product);
        ctx.body = corectProduct;
    } catch (error) {
        ctx.body = error.message;
    }

})


app.use(router.routes());

app.listen(3000, () => {
    console.log('listen server');
})