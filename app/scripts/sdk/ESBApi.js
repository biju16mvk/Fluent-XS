/*global jQuery, body, NProgress, btoa*/
function ESBApi(url, instanceName) {
    this.client_id = '60jq8i1jioQhWso5T3jr1Zknposa';
    this.client_secret = 'dZuOv3otFeW87QiwGa8Qah4Oa8Ea';
    this.baseUrl = url;
    //this.client_id = 'kcvboTR2eyjJGkJMxf__L7sI_Q0a';
    //this.client_secret = 'wu5gglFLEOqzulc5DWfqilbB2BMa';
    this.serviceData = function(method, path, contentType, async, body, callback) {
        if (method === 'GET') {
            NProgress.start();
            return jQuery.ajax({
                url: path,
                async: async,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + body);
                },
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
                //beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa('admin' + ":" + 'admin')); },
                url: path,
                type: 'POST',
                async: async,
                contentType: contentType,
                data: body,
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) {
                    callback(e); /*console.log(e); */
                }
            });
        }
    };

    this.createUserData = function(method, path, contentType, async, body, adminuser, adminpassword, callback) {
        if (method === 'GET') {
            NProgress.start();
            return jQuery.ajax({
                url: path,
                async: async,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) {
                    callback(e); /*console.log(e);*/
                }
            });
        } else if (method === 'POST' || method === 'PUT') {
            NProgress.start();
            return jQuery.ajax({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(adminuser + ":" + adminpassword));
                },
                url: path,
                type: method,
                async: async,
                contentType: contentType,
                data: body,
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) {
                    callback(e); /*console.log(e); */
                }
            });
        }
    };

    this.userData = function(method, path, contentType, async, body, access_token, callback) {
        if (method === 'GET') {
            NProgress.start();
            return jQuery.ajax({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                url: path,
                async: async,
                type: 'GET',
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
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                url: path,
                type: 'POST',
                async: async,
                contentType: contentType,
                data: body,
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) { /*console.log(e); */ }
            });
        }
    };

    this.recipientData = function(method, path, contentType, async, body, access_token, callback) {
        if (method === 'GET') {
            NProgress.start();
            return jQuery.ajax({
                /*                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },*/
                url: path,
                async: async,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) { /*console.log(e);*/ }
            });
        }
    };


    this.passwordData = function(method, path, contentType, async, body, callback) {
        if (method === 'GET') {
            NProgress.start();
            var el = document.getElementById('container');
            App.blockUI(el);
            return jQuery.ajax({
                url: path,
                async: async,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    setTimeout(function() {
                        App.unblockUI(el);
                    }, 1000);
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
                contentType: contentType,
                data: body,
                dataType: 'json',
                success: function(data) {
                    callback(data);
                    NProgress.done();
                },
                error: function(e) {
                    callback(e); /*console.log(e); */
                }
            });
        }
    };

    this.login = function(body) {
        var dataTemplates;
        var path = this.baseUrl + "/oauth2/token";
        var httpMethod = 'POST';
        var contentType = 'application/x-www-form-urlencoded';
        var formdata = "client_id=" + this.client_id + "&client_secret=" + this.client_secret + "&grant_type=password&" + body;
        this.serviceData(httpMethod, path, contentType, false, formdata, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };

    this.validateToken = function(body) {
        var dataTemplates;
        var path = this.baseUrl + '/search';
        var httpMethod = 'GET';
        this.serviceData(httpMethod, path, null, false, body, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };

    this.createuser = function(body) {
        var dataTemplates;
        var path = this.baseUrl + '/wso2/scim/Users';
        var httpMethod = 'POST';
        var contentType = 'application/json';
        var userid = 'ldap/' + body.uid;
        var password = body.userpassword;
        var data = '{"schemas":[],"userName":"' + userid + '","password":' + password + '}';
        var formdata = data;
        this.createUserData(httpMethod, path, contentType, false, formdata, this.adminuser, this.adminpassword, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;

    };

    this.changeLDAPPassword = function(body) {
        var dataTemplates;
        var path = this.baseUrl + '/wso2/scim/Users/' + body.usertoken;
        var httpMethod = 'PUT';
        var contentType = 'application/json';
        var userid = 'ldap/' + body.username;
        var password = body.newpass;
        var data = '{"schemas":[],"userName":"' + userid + '","password":' + password + '}';
        var formdata = data;
        this.createUserData(httpMethod, path, contentType, false, formdata, this.adminuser, this.adminpassword, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };

    this.registerUser = function(body, access_token) {
        var dataTemplates;
        var path = this.baseUrl + '/api/user/registration.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'POST';
        var contentType = 'application/json';
        var formdata = JSON.stringify(body);
        this.userData(httpMethod, path, contentType, false, formdata, access_token, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };

    this.updateProfile = function(body, access_token) {
        var dataTemplates;
        var path = this.baseUrl + '/api/user/update.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'POST';
        var contentType = 'application/json';
        var formdata = JSON.stringify(body);
        this.userData(httpMethod, path, contentType, false, formdata, access_token, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };

    this.forgotPassword = function(body) {
        var dataTemplates;
        var path = this.baseUrl + '/api/user/forgotpassword.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'POST';
        var contentType = 'application/json';
        var formdata = JSON.stringify(body);
        this.passwordData(httpMethod, path, contentType, false, formdata, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };

    this.resetPassword = function(body) {
        var dataTemplates;
        var path = this.baseUrl + '/api/user/resetpassword.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'POST';
        var contentType = 'application/json';
        var formdata = JSON.stringify(body);
        this.passwordData(httpMethod, path, contentType, false, formdata, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };

    this.changePassword = function(body, access_token) {
        var dataTemplates;
        var path = this.baseUrl + '/api/user/changepassword.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'POST';
        var contentType = 'application/json';
        var formdata = JSON.stringify(body);
        this.userData(httpMethod, path, contentType, false, formdata, access_token, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };

    this.getRecipientDetails = function(access_token) {
        var dataTemplates;
        var path = this.baseUrl + '/api/recipient.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'GET';
        this.recipientData(httpMethod, path, null, false, null, access_token, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };
    this.getLivingDetails = function(access_token) {
        var dataTemplates;
        var path = this.baseUrl + '/api/livingarrangement.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'GET';
        this.userData(httpMethod, path, null, false, null, access_token, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };
    this.getEducationDetails = function(access_token) {
        var dataTemplates;
        var path = this.baseUrl + '/api/education.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'GET';
        this.userData(httpMethod, path, null, false, null, access_token, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };
    this.getCountryDetails = function(access_token) {
        var dataTemplates;
        var path = this.baseUrl + '/api/country.{format}'.replace(/{format}/g, 'json');
        var httpMethod = 'GET';
        this.userData(httpMethod, path, null, false, null, access_token, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };
    this.getUserDetails = function(id, access_token) {
        var dataTemplates;
        var path = this.baseUrl + "/api/user/profile/{id}.{format}".replace(/{format}/g, 'json').replace(/{([id}]+)}/g, id.toString());
        var httpMethod = 'GET';
        this.userData(httpMethod, path, null, false, null, access_token, function(data) {
            dataTemplates = data;
        });
        return dataTemplates;
    };
}