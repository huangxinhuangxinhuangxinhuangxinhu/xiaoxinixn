//回到顶部
$('.to-top').click(function() {
    $('html').animate({
        scrollTop: 0
    }, 600, 'swing');
})