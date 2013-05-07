var api_key = 'a086134c5625ebfd4e080d19749bc0cb736ad1d5';  // secret stripe API key
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
})
