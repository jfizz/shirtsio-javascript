"use strict";

var https = require('https');
var querystring = require('querystring');
var util = require('util');

function setup_response_handler(req, callback) {
    if (typeof callback !== "function") {
        //console.log("missing callback");
        return;
    }
    req.on('response',
        function(res) {
            var response = '';
            res.setEncoding('utf8');
            res.on('data',
                function(chunk) {
                    response += chunk;
                });
            res.on('end',
                function() {
                    var err = null;
                    var result = null;
                    try {
                        response = JSON.parse(response);
                        result = response.result;
                        if(200 != res.statusCode) {
                            err = new Error(response.error);
                            result = null;
                        }
                    }
                    catch(e) {
                        err = new Error("Invalid JSON from shirtsio.com");
                        result = null;
                    }
                    callback(err, result);
                });
        });
    req.on('error', function(error) {
        callback(error);
    });
}

module.exports = function (api_key, options) {
//    var defaults = options || {};

    //var auth = 'Basic ' + new Buffer(api_key + ":").toString('base64');

    function _request(method, path, data, callback) {

        //console.log("data", typeof data, data);

        // convert first level of deep data structures to foo[bar]=baz syntax
        Object.keys(data).forEach(function(key) {
            if (typeof data[key] === 'object' && data[key] !== null) {
                var o = data[key];
                delete data[key];
                Object.keys(o).forEach(function(k) {
                    var new_key = key + "[" + k + "]";
                    data[new_key] = o[k];
                });
            }
        });

        var request_data = querystring.stringify(data);

        //console.log(method, "request for", path);
        //console.log("http request", request_data);
        var request_options = {
            host: 'www.shirts.io',
            port: '443',
            path: path,
            method: method,
            headers: {
                //'Authorization': auth,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': request_data.length
            }
        };

        var req = https.request(request_options);
        setup_response_handler(req, callback);
        req.write(request_data);
        req.end();
    }

    function post(path, data, callback) {
        _request('POST', path, data, callback);
    }

    function get(path, data, callback) {
        _request('GET', path, data, callback);
    }
    var url_prefix = "/api/v1/";
    var default_query_params = {api_key: api_key};
    var default_query_params_string = querystring.stringify(default_query_params);
    return {
        products: {
            list_categories: function(cb) {
                //https://shirts.io/api/v1/products/category/
                get(url_prefix + "products/category/?"+default_query_params_string, {}, cb);
            },
            list_products: function(category_id, cb) {
                // https://shirts.io/api/v1/products/category/{category_id}/
                get(url_prefix + "products/" + category_id + "/?"+default_query_params_string, {}, cb);
            },
            get_product: function(product_id, cb) {
                // https://shirts.io/api/v1/products/{Product_id}/
                get(url_prefix + "products/"+product_id+"/?"+default_query_params_string, {}, cb);
            },
            inventory_count: function(product_id, color, state, cb) {
                var query_param = util._extend(default_query_params, {'color': color, 'state': state});
                get(url_prefix+ "products/"+product_id+"/?"+ querystring.stringify(query_param), {}, cb);
            }
        }
    };

}



