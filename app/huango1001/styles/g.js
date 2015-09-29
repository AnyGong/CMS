/**
 * Created by AnyGong on 2015/9/28.
 */
(function () {
    'use strict';
    var $iconToggle = $('.module-icon');
    var $login = $('#J_Login');
    var $floatModule = $('#J_FloatModule');
    var $toggleModule = $('#J_ToggleModule');
    $toggleModule.on('click', function () {
        $iconToggle.find('.show-active.active').removeClass('active');
        $floatModule.animate({right: '-300px'}, 300);
    });
    $iconToggle.on({
        mouseenter:function(){
            $(this).addClass('active').parent().find('.hover-status').show().animate({right: '60px',opacity:'1'}, 300);
        }
    },'.module-status').on({
        mouseleave: function () {
            $(this).find('.module-status').removeClass('active');
            $(this).find('.hover-status').animate({right: '120px',opacity:'0'}, 300,function(){
                $(this).hide();
            });
        },
        click:function(){
            if ($floatModule.hasClass('login-enable')) {
                $floatModule.find('.show-active.active').removeClass('active');
                $(this).trigger('mouseleave').find('.show-active').addClass('active');
                $('#J_FloatContainer').find('.module-content').hide();
                $($(this).data('content')).show();
                if(($(window).width()-$floatModule.offset().left)<=60){
                    $floatModule.animate({right: '0'}, 300);
                }
                else{
                    //if()
                    //$toggleModule.trigger('click');
                }
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