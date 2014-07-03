/*global jQuery, NProgress, body */
function ActivityApi(mainActivityUrl, instanceName) {
    if (instanceName) {
        this.instanceName = instanceName;
    } else {
        this.instanceName = null;
    }
    var activityParam = this;
    this.activityUrl = mainActivityUrl || 'http://activity.netspective.loc/';
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
        }
    };
    this.recordActivity = function(activity, activityType, unique_id, status) {
        NProgress.start();
        var activityTypeProcessUrl = this.activityUrl + "/s/api/activity-type/";
        var activityProcessUrl = this.activityUrl + "/s/api/activity";
        //var dataResult=this.activityExistanceCheck(actvity, activityType,activityProcessUrl);
        var PostData = {
            "activity": activity,
            "activityType": activityType,
            "unique_id": unique_id,
            "status": status
        };
        var url = activityProcessUrl + "/ExistanceCheck.json";
        jQuery.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(PostData),
            async: false,
            contentType: "json",
            error: function(jq, status, message) {
                //alert(message+status);
            },
            success: function(data) {
                var activityVal = data.results.activityTypeId;
                activityParam.activityId = data.results.activityId;
                activityParam.activityTypeId = data.results.activityTypeId;
                NProgress.done();
            }
        });

    };

    this.getLastActivity = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.activityUrl + "/api/activity/getlastactivity.{format}".replace(/{format}/g, 'json');
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
    this.getActivityCount = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.activityUrl + "/api/activity/getactivitycount.{format}".replace(/{format}/g, 'json');
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
    this.getActivityData = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.activityUrl + "/api/activity/getactivity.{format}".replace(/{format}/g, 'json');
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
    this.getAllActivityData = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.activityUrl + "/api/activity/getallactivity.{format}".replace(/{format}/g, 'json');
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
    this.getActivityDataGraph = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.activityUrl + "/api/activity/getactivitygraph.{format}".replace(/{format}/g, 'json');
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
    this.getActivityGraphDate = function() {
        var dataTemplates;
        var httpMethod = 'GET';
        var path = this.activityUrl + "/api/activity/getactivitydate.{format}".replace(/{format}/g, 'json');
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
}