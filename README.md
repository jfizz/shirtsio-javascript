<h2>shirtsio-javascript</h2>
Access to the <a href="https://www.shirts.io/docs/overview/">Shirtsio API</a>.
<h2>Installation</h2>
<b>Base on nodejs</b><br/>
<h2>Usage overview</h2>
<pre>
var api_key = 'abc'; // secret stripe API key
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
<h6>Detail see <a href="https://github.com/ooshirts/shirtsio-javascript/blob/master/test/example.js">example.js</a></h6>
<h2>API</h2>
<p>
All methods takes a callback as their last parameter. The callback is called with a Javascript
<code>Error</code>
(if any) and then the response.
</p>
<ul>
<li><code>shirtio.products</code> - retrieve categories, products and inventory
    <ul><li><code>.list_categories</code> - <a href="https://www.shirts.io/docs/products_reference/">retrieve categories</a></li></ul>
    <ul><li><code>.list_products(category_id)</code> - <a href="https://www.shirts.io/docs/products_reference/">retrieve products</a></li></ul>
    <ul><li><code>.get_product(product_id)</code> - <a href="https://www.shirts.io/docs/products_reference/">retrieve product</a></li></ul>
    <ul><li><code>.inventory_count(product_id, color, state)</code> - <a href="https://www.shirts.io/docs/products_reference/">retrieve inventory count</a></li></ul>
</li>
<li><code>shirtio.account</code> - retrieve balance
    <ul><li><code>.get_balance</code> - <a href="#">retrieve balance</a></li></ul>
</li>
<li><code>shirtio.authentication</code> - retrieve balance
    <ul><li><code>.get_balance(paramters)</code> - <a href="#">retrieve api key</a></li></ul>
</li>
<li><code>shirtio.status</code> - retrieve status information
    <ul><li><code>.check_order_status(order_id)</code> - <a href="https://www.shirts.io/docs/status_reference/">retrieve current status on the order</a></li></ul>
</li>
<li><code>shirtio.quote</code> - retrieve quote
    <ul><li><code>.get_quote(parameters)</code> - <a href="https://www.shirts.io/docs/quote_reference/">retrieve quote</a></li></ul>
</li>
<li><code>shirtio.billing</code> - retrieve payment information and update payment status
    <ul><li><code>.payment(parameters)</code> - <a href="#">retrieve payment information</a></li></ul>
    <ul><li><code>.update_payment_status(parameters)</code> - <a href="#">update payment status</a></li></ul>
</li>
<li><code>shirtio.webHook</code> - add, delete, retrieve webhook(s) and add payment webhook
    <ul><li><code>.add_webhook(parameters)</code> - <a href="#">add webhook</a></li></ul>
    <ul><li><code>.delete_webhook(url)</code> - <a href="#">delete webhook</a></li></ul>
    <ul><li><code>.list_webhook</code> - <a href="#">retrieve webhooks</a></li></ul>
    <ul><li><code>.add_payment_webhook(url)</code> - <a href="#">add payment webhook</a></li></ul>
</li>
<li><code>shirtio.order</code> - Placing an Order
    <ul><li><code>.place_order(parameters)</code> - <a href="https://www.shirts.io/docs/order_reference/">placing an Order</a></li></ul>
</li>
</ul>
