var api_key = 'your api key';  // secret Shirts.io API key
var shirtsio = require('../src/shirtsio.js')(api_key);

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

shirtsio.products.list_products(1, function(err, result){
       if(err){
           console.log(err);
           return;
       }
       console.log(result);
});

shirtsio.products.inventory_count(3, 'White', '',function(err, result){
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
});

shirtsio.status.check_order_status({order_id: 999999}, function(err, result) {
    if(err) {
        console.log(err);
        return;
    }
    console.log(result);
});

var params = {'garment[0][product_id]': 3, 'garment[0][color]': 'White', 'garment[0][sizes][med]': 100,
    'print[front][color_count]': 5};
shirtsio.quote.get_quote(params, function(err, result) {
    if(err) {
        console.log(err);
        return;
    }
    console.log(result);
    console.log(result.subtotal);
});

TEST_CHECK_PAYMENT = {
    'name': 'John Doe',
    'company': 'Acme Corp',
    'address1': '1 Test Drive',
    'city': 'Test Town',
    'state': 'New York',
    'zip': '99999',
    'amount': '500.23',
    'payment_type': 'check',
    'account_number': '39494949',
    'routing_number': '5903495',
    'account_type': 'C'
};

TEST_CREDIT_PAYMENT = {
    'name': 'Johnny Appleseed',
    'company': 'Bigcorp',
    'address1': '1 Hope Lane',
    'city': 'Big city',
    'state': 'Iowa',
    'zip': '99999',
    'amount': '1000',
    'payment_type': 'credit_card',
    'card_number': '4242424242424242',
    'expiration': '0215',
    'cvc': '123'
};

shirtsio.billing.payment(TEST_CREDIT_PAYMENT, function(err, result) {
    if(err) {
        console.log(err);
        return;
    }
    console.log(result);
});

var data = {'test': 'True', 'price': 79.28,
    'print[back][color_count]': 4, 'print[back][colors][0]': "101C", 'print[back][colors][1]': '107U',
    'addresses[0][name]': 'John Doe', 'addresses[0][address]': '123 Hope Ln.',
    'addresses[0][city]': 'Las Vegas', 'addresses[0][state]': 'Nevada', 'addresses[0][country]': 'US',
    'addresses[0][zipcode]': '12345', 'addresses[0][batch]': 1, 'addresses[0][sizes][med]': 2,
    'addresses[0][sizes][lrg]': 2,
    'print_type': 'Digital Print', 'ship_type': 'Standard',
    'garment[0][product_id]': 2, 'garment[0][color]': "White",
    'garment[0][sizes][med]': 2, 'garment[0][sizes][lrg]': 2, 'print[front][color_count]': 5,
    'print[front][artwork]': {file: "front.png", content_type: "image/png"},'print[front][proof]': {file: "front.jpg", content_type: "image/jpg"},
    'print[back][artwork]': {file: "back.png", content_type: "image/png"},'print[back][proof]': {file: "back.jpg", content_type: "image/jpg"}
};
shirtsio.order.place_order(data, function(err, result) {
    if(err) {
        console.log(err);
        return;
    }
    console.log(result);
});
