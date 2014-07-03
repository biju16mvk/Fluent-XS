/*global jQuery, body, NProgress*/
function ProfileApi(url, instanceName) {
    this.baseUrl = url;
    if (instanceName) {
        this.instanceName = instanceName;
    } else {
        this.instanceName = null;
    }
    this.serviceData = function(method, path, async, body, callback) {
        if (method === 'GET') {
            NProgress.start();
            return jQuery.ajax({
                type: 'GET',
                url: path,
                async: async,
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) { /*console.log(e); */ }
            });
        } else if (method === 'POST') {
            NProgress.start();
            return jQuery.ajax({
                url: path,
                type: 'POST',
                async: async,
                contentType: 'application/json',
                data: JSON.stringify(body),
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) { /*console.log(e);*/ }
            });
        } else if (method === 'DELETE') {
            NProgress.start();
            return jQuery.ajax({
                url: path,
                type: 'DELETE',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) { /*console.log(e);*/ }
            });
        }
    };
    this.managerecipient = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/managerecipient.{format}".replace(/{format}/g, 'json');

        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };

    this.managetenant = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/managetenant.{format}".replace(/{format}/g, 'json');

        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };

    this.editrecipient = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/managerecipient.{format}".replace(/{format}/g, 'json');

        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };

    this.edittenant = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/managetenant.{format}".replace(/{format}/g, 'json');

        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };

    this.deleteRecipient = function(id) {
        var dataTemplates;
        var httpMethod = 'DELETE';
        var path = this.baseUrl + "/api/recipient/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());

        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'DELETE') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'DELETE') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };

    this.deleteTenant = function(id) {
        var dataTemplates;
        var httpMethod = 'DELETE';
        var path = this.baseUrl + "/api/tenant/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());

        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'DELETE') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'DELETE') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };


    this.getrecipient = function(id) {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/getrecipient/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());

        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };
    this.gettenant = function(id) {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/gettenant/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());

        if (this.instanceName === null && httpMethod === 'GET') {
            this.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'GET') {
            instanceName.serviceData(httpMethod, path, false, null, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName === null && httpMethod === 'POST') {
            this.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        } else if (this.instanceName !== null && httpMethod === 'POST') {
            instanceName.serviceData(httpMethod, path, false, body, function(data) {
                dataTemplates = data;
            });
        }
        return dataTemplates;
    };
}