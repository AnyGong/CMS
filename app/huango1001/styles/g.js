/**
 * Created by AnyGong on 2015/9/28.
 */
(function () {
    'use strict';
    var $hoverStatus = $('.module-status');
    var $login = $('#J_Login');
    var $floatModule = $('#J_FloatModule');
    var $toggleModule = $('#J_ToggleModule');
    $toggleModule.on('click', function () {
        hidefloatModule();
    });
    function hidefloatModule() {
        $floatModule.animate({right: '-300px'}, 300);
    }

    $hoverStatus.on({
        mouseover: function () {
            $(this).find('.hover-status').show().animate({right: '60px',opacity:'1'}, 300);
        },
        mouseout: function () {
            $(this).find('.hover-status').animate({right: '120px',opacity:'0'}, 300).show();
        },
        click: function () {
            var className = $(this).data('module');
            $(this).find('.hover-status').animate({right: '120px'}, 300).hide();
            if ($floatModule.hasClass('login-enable')) {
                $floatModule.animate({right: '0'}, 300);
            }
            else if (!$login.hasClass(className)) {
                $(this).find('.hover-status').hide().animate({right: '120px'}, 300);
                $login.removeClass('user-info-login user-huanbi-login user-attendance-login user-order-login user-pay-login user-search-login').addClass($(this).data('module')).show();
            }

        }
    });
})();
(function () {
    $('.j_Scroll').perfectScrollbar();
})();