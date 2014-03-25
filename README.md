# Shirts.io Javascript Wrapper


## Introduction

Shirts.io is a t-shirt printing and fulfillment platform that lets you print and ship shirts anywhere in the world on demand.

### Create an Account

Creating an account is simple and quick! <a href="https://shirts.io/accounts/register">Create an account here.</a>

After creating an account, you will be given a unique API key to grant you access to the Shirts.io API.

### How it works

The Shirts.io API is broken up into four main components:

<ul>
<li><a href="https://shirts.io/docs/products_reference">Products API</a>
<ul>
<li>View our entire product selection</li>
<li>Access thousands of high-quality product images</li>
<li>View product specifications, available colors, available sizes</li>
<li>Check stock levels before placing an order</li>
</ul></li>
<li><a href="https://shirts.io/docs/quote_reference">Quote API</a>
<ul>
<li>Get an exact quote before placing an order</li>
</ul></li>
<li><a href="https://shirts.io/docs/order_reference">Order API</a>
<ul>
<li>Place an order</li>
<li>Upload artwork and all order details</li>
</ul></li>
<li><a href="https://shirts.io/docs/status_reference">Status API</a>
<ul>
<li>Check the current status of your order</li>
<li>Receive tracking numbers when available</li>
</ul></li>
</ul>

You can learn more by reading the <a href="https://www.shirts.io/docs/api_basics">API Manual</a>


## Installation

### Requirements
<ul>
    <li>Node.js</li>
    <li>npm (Node.js Package Manager)</li>
</ul>
### Dependency
<ul>
    <li><a href="https://www.npmjs.org/package/needle">needle</a></li>
</ul>
<p><code>npm install needle</code></p>
<p>clone source <code>shirtsio.js</code></p>


## Usage
<pre>
var api_key = 'abc'; // secret Shirts.io API key
var shirtsio = require('shirtsio.js')(api_key);
shirtsio.products.list_categories(
    function(err, response) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(response);
        console.log(response.length);
    }
);
</pre>
Detail see <a href="https://github.com/ooshirts/shirtsio-javascript/blob/master/test/example.js">example.js</a>


## API Basics

### Authentication

Our API uses an API key authentication system. When you create an account, you will be given a unique API key. Every call you make through the shirts.io API must include this key.

### Errors

    HTTP Status Code Summary
    200 OK - Request successfully delivered.
    400 Bad Request - Parameters invalid.
    401 Unauthorized - API key was invalid or deactivated.
    402 Request Failed - Request failed on server end.
    
### Product Sizes

    xxsml - 2XSmall
    xsml - XSmall
    sml - Small
    med - Medium
    lrg - Large
    xlg - XLarge
    xxl - 2XLarge
    xxxl - 3XLarge
    xxxxl - 4XLarge
    xxxxxl - 5XLarge
    xxxxxxl - 6XLarge

Please see https://www.shirts.io/docs/getting_started/ for the most up-to-date documentation.


## API Specifics

<p>
All methods takes a callback as their last parameter. The callback is called with a Javascript
<code>Error</code>
(if any) and then the response.
</p>
<ul>
<li><code>shirtio.products</code> - retrieve categories, products and inventory
    <ul>
    <li><code>.list_categories</code> - <a href="https://www.shirts.io/docs/products_reference/">retrieve categories</a></li>
    <li><code>.list_products(category_id)</code> - <a href="https://www.shirts.io/docs/products_reference/">retrieve products</a></li>
    <li><code>.get_product(product_id)</code> - <a href="https://www.shirts.io/docs/products_reference/">retrieve product</a></li>
    <li><code>.inventory_count(product_id, color, state)</code> - <a href="https://www.shirts.io/docs/products_reference/">retrieve inventory count</a></li>
    </ul>
</li>
<li><code>shirtio.status</code> - retrieve status information
    <ul><li><code>.check_order_status(parameter)</code> - <a href="https://www.shirts.io/docs/status_reference/">retrieve current status on the order</a></li></ul>
</li>
<li><code>shirtio.quote</code> - retrieve quote
    <ul><li><code>.get_quote(parameters)</code> - <a href="https://www.shirts.io/docs/quote_reference/">retrieve quote</a></li></ul>
</li>
<li><code>shirtio.billing</code> - retrieve payment information and update payment status
    <ul>
    <li><code>.payment(parameters)</code> - <a href="#">retrieve payment information</a></li>
    <li><code>.update_payment_status(parameters)</code> - <a href="#">update payment status</a></li>
    </ul>
</li>
<li><code>shirtio.webHook</code> - add, delete, retrieve webhook(s) and add payment webhook
    <ul>
       <li><code>.add_webhook(parameters)</code> - <a href="#">add webhook</a></li>
       <li><code>.delete_webhook(url)</code> - <a href="#">delete webhook</a></li>
       <li><code>.list_webhook</code> - <a href="#">retrieve webhooks</a></li>
       <li><code>.add_payment_webhook(url)</code> - <a href="#">add payment webhook</a></li>
    </ul>
</li>
<li><code>shirtio.order</code> - Placing an Order
    <ul><li><code>.place_order(parameters)</code> - <a href="https://www.shirts.io/docs/order_reference/">placing an Order</a></li></ul>
</li>
</ul>


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
