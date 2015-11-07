var Utilities = {

    URL: {
        Information: {
            urlContains: function (pathArray, keepQueryString) {
                var url, baseurl;

                if (!keepQueryString || typeof keepQueryString === "undefined") {
                    url = window.location.href;
                    baseurl = url.split("?")[0];
                } else {
                    baseurl = window.location.href;
                }

                for (var i = 0; i < pathArray.length; i++) {
                    if (baseurl.indexOf(pathArray[i]) === -1 && baseurl.indexOf(pathArray[i].toLowerCase()) === -1) {
                        return false;
                    }
                }
                return true; // did we reach the end? everything passed
            },
            hasParameter: function (name) {

                var fullQString = window.location.search.substring(1);

                if (fullQString.length > 0) {

                    var paramArray = fullQString.split("&");

                    for (var i = 0; i < paramArray.length; i++) {
                        var currentParameter = paramArray[i].split("=");
                        if (currentParameter[0] === name) {
                            return true;
                        }
                    }
                }

                return false;
            },
            getParameter: function (name) {
                var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            }            
        }        
    },
    Files: {
        Information: {
            getFileNameWithoutExtension: function(filename){
                return filename.substring(0,filename.lastIndexOf("."));                
            },
            getFileExtension: function(filename){
                var i = filename.lastIndexOf('.');
                return (i < 0) ? '' : filename.substr(i);                
            }
        }
    },
    Dates: {
        getFormattedDate: function(date){
            var month = date.getMonth() + 1; // getMonth() returns 0 -11
            if(month <= 9)
                month = '0'+month;

            var day= date.getDate();
            if(day <= 9)
                day = '0'+day;    

            return date.getFullYear() + '/' + month + '/' + day;            
        }
    },
    Cookies: {
        
        createCookie: function (name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }, 
        readCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
                if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
            }
            return null;
        },
        destroyCookie: function (name) {
            this.createCookie(name, "", -1);
        }        
    },
    Validation: {
        isEqual: function(one, two){
            if(one == two)
                return true;
            else
                return false;            
        },
        isIdentical: function(one,two){
            if(one === two)
                return true;
            else
                return false;            
        },        
        isNullOrEmpty: function(check){
            var errors = false;

            if(Object.prototype.toString.call(check) === '[object Array]') {
                for(var i=0; i < check.length; i++){

                    if(!check[i]) {
                        errors = true;
                    }
                    if(check[i].trim() === '') {
                        errors = true;
                    }
                }
            }
            else if(typeof check === 'string') {
                if(!check) {
                    errors = true;
                }
                if(check.trim() === '') {
                    errors = true;
                }
            }

            return errors;            
        },
        validateEmail: function(email){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);            
        },
        validateDate: function(dateString){
            // Check pattern
            if(!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateString))
                return false;

            // Parse the date parts to integers
            var parts = dateString.split("/");
            var year = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10);
            var day = parseInt(parts[2], 10);

            if(year < 1000 || year > 3000 || month === 0 || month > 12)
                return false;

            var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

            // Adjust for leap years
            if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
                monthLength[1] = 29;

            return day > 0 && day <= monthLength[month - 1];            
        }
    },
    Miscellaneous: {
        generateRandomString: function(strLength){
            if(typeof strLength === 'undefined') 
                strLength = 8;

            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < strLength; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            
            return text;        
        }
    }
};