/*global jQuery, body, NProgress*/
function ConfigurationApi(url, instanceName) {
    this.baseUrl = url;
    if (instanceName) {
        this.instanceName = instanceName;
    } else {
        this.instanceName = null;
    }
    this.serviceData = function (method, path, async, body, callback) {
        if (method === 'GET') {
            NProgress.start();
            return jQuery.ajax({
                url: path,
                async: async,
                dataType: 'json',
                success: function (data) {callback(data); NProgress.done();},
                error: function (e) {/*console.log(e);*/ }
            });
        } else if (method === 'POST') {
            NProgress.start();
            return jQuery.ajax({
                url: path,
                type : 'POST',
                async: async,
                contentType : 'application/json',
                data: JSON.stringify(body),
                dataType: 'json',
                success: function (data) {callback(data); NProgress.done();},
                error: function (e) {/*console.log(e); */}
            });
        }
    };

    this.getConfiguration = function () {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/configuration/list/ldap.{format}".replace(/{format}/g, 'json');
        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function (data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function (data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function (data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function (data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };
}

