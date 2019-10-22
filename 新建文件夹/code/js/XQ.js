$(() => {
    var imgBox = document.querySelector('.imgbox'); //最外层大大的盒子
    var minBox = document.querySelector('.minImg'); //装小图片的盒子
    var minImg = document.querySelector('.minImg img'); //小盒子的图片
    var mask = document.querySelector('.img-mask'); //遮罩
    var maxBox = document.querySelector('.maxImg'); //大盒子
    var maxImg = document.querySelector('.maxImg img'); //大盒子的图片
    var XQCenter = document.querySelector('.XQcenter')
        // 小图片盒子绑定鼠标移入事件
        //鼠标移入 大盒子和遮罩出现
    minBox.onmouseenter = function() {
        mask.style.display = "block";
        maxBox.style.display = "block";
    }

    //鼠标在小盒子移动大盒子跟着移动
    minBox.onmousemove = function(ev) {
        // 为什么不用ev.clientY而用ev.pageY
        //console.log(ev.clientY, imgBox.offsetTop);
        var moveX = ev.pageX - XQCenter.offsetLeft - mask.offsetWidth / 2;
        var moveY = ev.pageY - XQCenter.offsetTop - mask.offsetHeight / 2;
        console.log(imgBox.offsetLeft, imgBox.offsetTop);

        // 遮罩可以运动的最大X方向的距离
        var maxX = minBox.offsetWidth - mask.offsetWidth;
        // 遮罩可以运动的最大Y方向的距离
        var maxY = minBox.offsetHeight - mask.offsetHeight;

        // 设置最大可以移动距离
        if (moveX >= maxX) {
            moveX = maxX;
        }
        if (moveY >= maxY) {
            moveY = maxY;
        }

        // 设置最小可以移动距离
        if (moveX <= 0) {
            moveX = 0;
        }

        if (moveY <= 0) {
            moveY = 0;
        }
        // 大图片可以移动的最大距离
        var biliX = (maxImg.offsetWidth - maxBox.offsetWidth) / maxX;
        // 这个比例相当于是 遮罩移动一像素，大图片需要移动的距离
        var biliY = (maxImg.offsetHeight - maxBox.offsetHeight) / maxY;

        // 给遮罩添加移动
        mask.style.top = moveY + 'px';
        mask.style.left = moveX + 'px';

        // 因为大图片移动的方向是相反的所以要加负号
        maxImg.style.top = -moveY * biliY + 'px';
        maxImg.style.left = -moveX * biliX + 'px';

    }
    minBox.onmouseleave = function() {
        mask.style.display = "none";
        maxBox.style.display = "none";
    }
})