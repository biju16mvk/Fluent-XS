/*global jQuery, body, NProgress*/
function FluentXSApi(url, instanceName) {
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
                url: path,
                async: async,
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) { /*console.log(e);*/ }
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
                error: function(e) { /*console.log(e); */ }
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



    this.getProductInfo = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/productinformation.{format}".replace(/{format}/g, 'json');
        //alert(path);
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
    this.signup = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/signup.{format}".replace(/{format}/g, 'json');
        //alert(path);
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
    this.forgotPassword = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/forgotpassword.{format}".replace(/{format}/g, 'json');
        //alert(path);
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
    this.resetPassword = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/resetpassword.{format}".replace(/{format}/g, 'json');
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
    this.login = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/authentication.{format}".replace(/{format}/g, 'json');
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
    this.getUserDetails = function(id) {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/user/profile/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());
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
    this.getAvailability = function(id) {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/user/isUsernameExist/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());
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
    this.changePassword = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/changepassword.{format}".replace(/{format}/g, 'json');
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
    this.updateUser = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/update.{format}".replace(/{format}/g, 'json');
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
    this.logout = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/user/logout.{format}".replace(/{format}/g, 'json');
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
    this.getLivingDetails = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/livingarrangement.{format}".replace(/{format}/g, 'json');
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
    this.getEducationDetails = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/education.{format}".replace(/{format}/g, 'json');
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
    this.getCountryDetails = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/country.{format}".replace(/{format}/g, 'json');
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
    this.getRecipientDetails = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/recipient.{format}".replace(/{format}/g, 'json');
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
    this.getTenantDetails = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/tenant.{format}".replace(/{format}/g, 'json');
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
    this.getTokenData = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/getTokenDetails.{format}".replace(/{format}/g, 'json');
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
    this.createuser = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/createldapuser.{format}".replace(/{format}/g, 'json');
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
    this.changeLDAPPassword = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/user/ldappassword.{format}".replace(/{format}/g, 'json');
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

    this.getServerDetails = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/list/server.{format}".replace(/{format}/g, 'json');
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

    this.getServer = function(id) {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/server/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());
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
    this.getUserCount = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/user/count.{format}".replace(/{format}/g, 'json');
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
    this.getUserData = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/user/data.{format}".replace(/{format}/g, 'json');
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
    this.getAllUserData = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.baseUrl + "/api/user/data/all.{format}".replace(/{format}/g, 'json');
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
    this.manageserver = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/manageserver.{format}".replace(/{format}/g, 'json');
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
    this.getRecipientByID = function(body) {
        var dataTemplates;
        var httpMethod = 'POST';
        var path = this.baseUrl + "/api/recipientbyid.{format}".replace(/{format}/g, 'json');
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
    this.deleteUser = function(id) {
        var dataTemplates;
        var httpMethod = 'DELETE';
        var path = this.baseUrl + "/api/user/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());

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
}