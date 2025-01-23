define(
    [
        'jquery',
        'Magento_Ui/js/modal/modal',
        'mage/cookies',
        'domReady!'
    ],
    function ($, modal) {
        var verpage = {
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },

            getCookie: function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },

            checkCookie: function (cname) {
                var user = verpage.getCookie(cname);
                return user !== "" ? "1" : "0";
            }
        };

        var popupShow = verpage.checkCookie("signup_popup_home");
        if (popupShow !== "1") {
            var modalOptions = {
                type: 'popup',
                modalClass: 'modal-popup',
                responsive: true,
                innerScroll: false,
                clickableOverlay: false,
                buttons: [],
                title: 'Simple Modal'
            };

            var callForOption = modal(modalOptions, $('#home-popup'));
            $('#home-popup').modal('openModal').on('modalclosed', function () {
                verpage.setCookie("signup_popup_home", 1, 1);
            });
        }
    }
);
