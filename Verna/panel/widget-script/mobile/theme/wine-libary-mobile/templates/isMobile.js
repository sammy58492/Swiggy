var isMobile = {
    Android: function() {
		viewDevice = "Mobile";
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
		viewDevice = "Mobile";
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
		viewDevice = "Mobile";
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
		viewDevice = "Mobile";
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
		viewDevice = "Mobile";
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
		viewDevice = "Mobile";
        return false;
    }
};