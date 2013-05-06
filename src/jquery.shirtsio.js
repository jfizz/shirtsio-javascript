    var defaultSetting = {
        url_base: "https://www.shirts.io/api/v1/",
        url_custom: "",
        params: {api_key: "a086134c5625ebfd4e080d19749bc0cb736ad1d5"},
        method: "GET"
    }

    var Base = {
        crateNew: function() {
            var base = {};
            base.request = function(options) {
                var settings = $.extend({}, defaultSetting, options || {});
//                alert(typeof settings);
//                alert(settings);
               return $.ajax({
                    url: settings.url_base + settings.url_custom,
                    type: settings.method,
                    data: settings.params,
					xhrFields: {withCredentials: true},
					dataType: "jsonp",
					success:function(json){
					alert(json);
					if(json.actionErrors.length!=0){
					alert(json.actionErrors);
                    }
					},
					error: function(a,b,c){
					    alert(a);
						alert(b);
						alert(c);
					}
                })
            };
            return base;
        }
    };

    var url_category = "products/category/", url_products = "products/";
    var Products =  {
        createNew: function () {
            var products = Base.crateNew();
            products.list_categories = function() {
                var options = {'url_custom': url_category};
                return products.request(options);
            };
            products.list_products = function(categoryId) {
                var options = {'url_custom': url_products + categoryId+"/"};
                return products.request(options);
            };
            return products;
        }
    };


