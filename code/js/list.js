$(() => {

    new Promise(function(resolve, reject) {
        $.ajax({
            type: "get",
            url: "../server/getPageCount.php",
            dataType: "json",
            success: (data) => {
                let res = "";
                for (let i = 0; i < data.count; i++) {
                    res += `<a href="javascript:;">${i + 1}</a>`
                }
                $("#page").html(res);
                $("#page").children().eq(0).addClass("active");

                resolve();
            }
        });
    }).then(function() {
        getDataWithPage(1, 0);
    })


    /* type ==0 默认排序  id */
    /* type ==1 升序排列  价格 */
    /* type ==2 降序排列  价格 */
    function getDataWithPage(page, type) {
        $.ajax({
            type: "get",
            url: "../server/getGoodsData.php",
            data: `page=${page}&sortType=${type}`,
            dataType: "json",
            success: (data) => renderUI(data)
        });
    }

    function renderUI(data) {


        let html = data.map((ele) => {
            return `
                <li class="item" data-id=${ele.good_id}>
                    <div class="item-box">
                        <img src=${ele.src}>
                        <div class="price ">￥ ${ele.price}</div> 
                        <div class="dis ">${ele.disCount}</div>
                        <div class="storeName ">${ele.shopName}</div>
                    </div>
                   <div class="addCart">加入购物车</div>
                </li>
            `
        }).join("");
        $(".box-list").html(html);
    }

    /* 先给页面添加点击事件，当点击的时候获取页码值，根据该值发送网络请求 */
    $("#page").on("click", "a", function() {
        getDataWithPage($(this).text());
        $(this).addClass("active").siblings().removeClass("active");
    })

    /* 处理排序 */
    $(".typeBtn").click(function() {
        getDataWithPage(1, $(this).index());
    })

    /* 实现点击添加商品到购物车的功能 */
    $(".box-list").on("click", ".addCart", function() {
        /* 获取当前商品的ID */
        let good_id = $(this).parents("li").data().id;
        let src = $(this).parents("li").children(".item-box").children("img").attr("src");
        let title = $(this).parents("li").children(".item-box").children(".storeName").text();
        let num = 1

        /* 发送网络请求把当前数据添加到购物车表中 */
        /* 数据库表 cart_id  good_id  num isChecked */
        /* 添加数据： */
        /* 删除数据： */
        /* 更新数据： */
        $.ajax({
            url: "../server/cart.php",
            data: {
                type: "add",
                good_id: good_id,
                src: src,
                title: title,
                num: num

            },
            dataType: "json",
            success: function(response) {
                if (response.status == "success") {
                    $(".cart_total").text($(".cart_total").text() * 1 + 1);
                }
            }
        });
    })

    /* 发请求获取购物车中商品的数量 */
    $.ajax({
        url: "../server/getTotalCount.php",
        dataType: "json",
        success: function({
            total
        }) {
            // console.log(total);
            $(".cart_total").text(total);
        }
    });

    /* 打开购物车页面 */
    $(".cart").click(() => window.location.href = "./cart.html");
    $("body").on("click", ".item-box", function() {
        /* console.log(this); */
        window.location.href = `./XiangQing.html?id=${$(this).attr("good_id")}`;

    })
})