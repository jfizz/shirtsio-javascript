"use strict";

var https = require('https');
var querystring = require('querystring');
var util = require('util');
var needle = require('needle');

function setup_response_handler(req, callback) {
    if (typeof callback !== "function") {
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
                        var response_json = JSON.parse(response);
                        result = response_json.result;
                        if(200 != res.statusCode) {
                            err = new Error(response_json.error);
                            result = null;
                        }
                    }
                    catch(e) {
                        err = new Error(response);
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
    var defaults = options || {};
    function _request(method, path, data, callback) {
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
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': request_data.length
            }
        };
        request_options = util._extend(request_options, defaults);
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
                get(url_prefix + "products/category/?" + default_query_params_string, {}, cb);
            },
            list_products: function(category_id, cb) {
                // https://shirts.io/api/v1/products/category/{category_id}/
                get(url_prefix + "products/" + category_id + "/?" + default_query_params_string, {}, cb);
            },
            get_product: function(product_id, cb) {
                // https://shirts.io/api/v1/products/{Product_id}/
                get(url_prefix + "products/"+product_id+"/?" + default_query_params_string, {}, cb);
            },
            inventory_count: function(product_id, color, state, cb) {
                var query_param = util._extend(default_query_params, {'color': color, 'state': state});
                get(url_prefix+ "products/"+product_id+"/?"+ querystring.stringify(query_param), {}, cb);
            }
        },
        account: {
            get_balance: function(cb) {
                get(url_prefix + "internal/integration/balance/?"+ default_query_params_string, {}, cb);
            }
        },
        authentication: {
            auth: function(query_data, cb) {
                var query_param = util._extend(default_query_params, query_data);
                get(url_prefix + "internal/integration/auth/?"+ querystring.stringify(query_param), {}, cb);
            }
        },
        status: {
            check_order_status: function(query_data, cb) {
                var query_param = util._extend(default_query_params, query_data);
                get(url_prefix + "status/?" + querystring.stringify(query_param), {}, cb);
            }
        },
        quote: {
            get_quote: function(query_data, cb) {
                var query_param = util._extend(default_query_params, query_data);
                get(url_prefix + "quote/?"+ querystring.stringify(query_param), {}, cb);
            }
        },
        billing: {
            payment: function(data, cb) {
                post(url_prefix + "payment/?"+ default_query_params_string, data, cb);
            },
            update_payment_status: function(data, cb) {
                post(url_prefix + "payment_status/?"+ default_query_params_string, data, cb);
            }
        },
        webHook: {
            add_webhook: function(data, cb) {
                post(url_prefix + "webhook/register/?"+ default_query_params_string, data, cb);
            },
            delete_webhook: function(listener_url, cb) {
                var query_param = util._extend(default_query_params, {url: listener_url});
                get(url_prefix + "webhook/delete/?" + querystring.stringify(query_param), {}, cb);
            },
            list_webhook: function(cb) {
                get(url_prefix + "webhook/list/?" + default_query_params_string, {}, cb);
            },
            add_payment_webhook: function(url, cb) {
                var query_param = util._extend(default_query_params, {url: url});
                post(url_prefix + "shirtsio_webhook/payments/?"+ querystring.stringify(query_param), {}, cb);
            }
        },
        order: {
            place_order: function(data, cb) {
                var data = util._extend(default_query_params, data);
                needle.post("https://www.shirts.io/api/v1/order/", data, { timeout: 20000, multipart : true }, function(err, resp, body){
                    var result = null;
                    var error = null;
                    try {
                        if(200 != resp.statusCode) {
                            error = body.error;
                            result = null;
                        }else {
                            result = body.result;
                        }
                    } catch(e) {
                        error = new Error(body);
                        result = null;
                    }
                    cb(error, result);

                });
            }
        }

    };

}



