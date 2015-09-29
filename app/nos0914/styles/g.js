/**
 * Created by AnyGong on 2015/9/14.
 */
window.onload = function () {
    var $wrap = document.getElementById('J_Wrap');
    var mainHeight = $wrap.clientHeight;
    var winHeight = 0;

    function findDimensions() {
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            winHeight = document.documentElement.clientHeight;
        }
        $wrap.style.height = winHeight + 'px';
        if (mainHeight > winHeight) {
            $wrap.style.height = mainHeight + 'px';
        }
    }

    findDimensions();
    window.onresize = findDimensions;
}
