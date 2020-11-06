(function ($) {
    /*
     * 折叠菜单
     * @params: className
     * Type: String
     * return undefined => click event
     * */
    $.fn.lhMenu = function (className) {
        $('#lhMenu').find(className).children('li').each(function () {
            $(this).css('cursor', 'pointer');
            $(this).children('div').on('click', function () {
                var iName = $(this).find('.icon-xiaotuziCduan_1').attr('class');
                if (iName === 'iconfont icon-xiaotuziCduan_1') {
                    $(this).find('.icon-xiaotuziCduan_1').attr('class', 'iconfont icon-xiaotuziCduan_');
                    $(this).siblings(':first').stop(false, true).show(500);
                    // 添加鼠标点击激活样式
                    $(this).next('.menu-third').children('li').each(function () {
                        $(this).on('click', function () {
                            $(this).prop('class') === 'active' ? $(this).removeAttr('class', 'active')
                                : $(this).attr('class', 'active');
                        })
                    });
                } else {
                    $(this).find('.icon-xiaotuziCduan_').attr('class', 'iconfont icon-xiaotuziCduan_1');
                    $(this).siblings(':first').stop(false, true).hide(500);
                }
            })
        });
    }
})(jQuery);