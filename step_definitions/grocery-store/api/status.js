const { I } = inject();

const Joi = require('joi');
const expect = require('chai').expect

const userAuth = require('../../../pages/grocery-store/api/status')

When('I get grocery store status', async() =>{
    // Prepare the request
    const url = userAuth.url.grocery_store_status_endpoint
    // Send request
    const res = await I.sendGet(url)
    // Verify status code
    await I.seeResponseCodeIsSuccessful();
    await I.seeResponseCodeIs(200);
    expect(res.status).to.eql(200)
    // Return data
    process.env.status = res.data.status
})

Then('I see grocery store status is {string}', (status) =>{
    expect(process.env.status).to.eql(status)
})

When('I create a new card', async() =>{
    // Prepare the request
    const url = process.env.grocery_store_api_endpoint + '/carts'
    // Send request
    const res = await I.sendPost(url)
    // Verify status code
    I.seeResponseCodeIsSuccessful();
    I.seeResponseCodeIs(201);
    expect(res.status).to.eql(201)
    // Verify data inclusion
    I.seeResponseContainsJson({ created: true});
    // Verify data structure
    I.seeResponseContainsKeys(['created', 'cartId']);
    const schema = Joi.object().keys({
        created: Joi.string().equal(true).required(),
        cartId: Joi.string().pattern(new RegExp('^[a-zA-Z0-9-_]{10,30}$')).required()
      });
    I.seeResponseMatchesJsonSchema(schema);
    process.env.cartId = res.data.cartId
})

When('I can get the new created card', async() =>{
    // Prepare the request
    const url = process.env.grocery_store_api_endpoint + '/carts/' + process.env.cartId
    // Send request
    const res = await I.sendGet(url)
    // Verify status code
    I.seeResponseCodeIs(200);
    // Verify data structure
    I.seeResponseContainsKeys(['items', 'created']);
})

When('I get the first products', async() =>{
    // Prepare the request
    const url = process.env.grocery_store_api_endpoint + '/products'
    // Send request
    const res = await I.sendGet(url)
    // Verify status code
    await I.seeResponseCodeIsSuccessful();
    // Return data
    process.env.firstProduct = res.data[0].id
    console.log("NXT - ProductId: " + process.env.firstProduct)
})

Then('I add product to the created card with the quantity is {int}', async(quantity) =>{
    // Prepare the request
    const url = process.env.grocery_store_api_endpoint + '/carts/' + process.env.cartId + '/items'
    process.env.quantity = quantity
    const payload = {
        "productId": process.env.firstProduct,
        "quantity": quantity
    }
    // Send request
    const res = await I.sendPost(url, payload)
    // Verify status code
    await I.seeResponseCodeIsSuccessful();
    // Verify data structure
    const schema = Joi.object().keys({
        created: Joi.string().equal(true).required(),
        itemId: Joi.number().integer().required()
      });
    await I.seeResponseMatchesJsonSchema(schema);
    process.env.itemId = res.data.itemId
    console.log("NXT - ItemId: " + process.env.itemId)
})

When('I remove product from the card', async() =>{
    // Prepare the request
    const url = process.env.grocery_store_api_endpoint + '/carts/' + process.env.cartId + '/items/' + process.env.itemId
    // Send request
    const res = await I.sendDelete(url)
    // Verify status code
    await I.seeResponseCodeIsSuccessful();
})

Then('I dont see the product in card info', async() =>{
    // Prepare the request
    const url = process.env.grocery_store_api_endpoint + '/carts/' + process.env.cartId
    // Send request
    const res = await I.sendGet(url)
    // Verify status code
    I.seeResponseCodeIsSuccessful();
    // Verify data inclusion
    await I.dontSeeResponseContainsJson({ id: process.env.itemId, productId: process.env.firstProduct, quantity: process.env.quantity});
})