var api_key = 'a086134c5625ebfd4e080d19749bc0cb736ad1d5';  // secret stripe API key
var shirtsio = require('../src/shirtsio.js')(api_key);

//shirtsio.products.list_categories(
//    function(err, response) {
//        if (err) {
//            console.log(err);
//            return;
//        }
//        console.log(response);
//        console.log(response.length);
//    }
//);
//
//shirtsio.products.list_products(1, function(err, result){
//       if(err){
//           console.log(err);
//           return;
//       }
//       console.log(result);
//});
//
//shirtsio.products.inventory_count(3, 'White', '',function(err, result){
//    if(err){
//        console.log(err);
//        return;
//    }
//    console.log(result);
//});
//
//shirtsio.account.get_balance(function(err, result) {
//    if(err){
//        console.log(err);
//        return;
//    }
//    console.log(result);
//});
//
//shirtsio.authentication.auth({username: 'deantest', password: 'Pa$$w0rd'},function(err, result) {
//    if(err) {
//        console.log(err);
//        return;
//    }
//    console.log(result);
//    console.log(result.api_key);
//});
//
//shirtsio.status.check_order_status("999", function(err, result) {
//    if(err) {
//        console.log(err);
//        return;
//    }
//    console.log(result);
//});
//
//var params = {'garment[0][product_id]': 3, 'garment[0][color]': 'White', 'garment[0][sizes][med]': 100,
//    'print[front][color_count]': 5}
//shirtsio.quote.get_quote(params, function(err, result) {
//    if(err) {
//        console.log(err);
//        return;
//    }
//    console.log(result);
//    console.log(result.subtotal);
//});

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
