var Cookielaw = {

    createCookie: function (name, value, days) {
        var date = new Date(),
            expires = '';
        if (days) {
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    getCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0, c; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return "";
    },

    cookieLawAccepted: function() {
        return Cookielaw.getCookie('cookielaw_accepted') === '1';
    },

    createCookielawCookie: function () {
        this.createCookie('cookielaw_accepted', '1', 10 * 365);

        if (typeof (window.jQuery) === 'function') {
            jQuery('#CookielawBanner').slideUp();
        } else {
            document.querySelector('#CookielawBanner').style.display = 'none';
        }
    },

    keepOrHideBanner: function() {
        document.querySelector('#CookielawBanner .hidden-unless-js').classList.remove('hidden-unless-js');
        if(Cookielaw.cookieLawAccepted()) document.querySelector('#CookielawBanner').style.display = 'none';
    }

};

if(document.querySelector('#CookielawBanner')) Cookielaw.keepOrHideBanner();
