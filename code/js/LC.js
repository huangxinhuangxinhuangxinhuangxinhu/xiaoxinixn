$(() => {
    new Promise(function(resolve, reject) {
        $.ajax({
            type: "get",
            url: "../server/indexCount.php",
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
            url: "../server/indexData.php",
            data: `page=${page}&sortType=${type}`,
            dataType: "json",
            success: (data) => renderUI(data)
        });
    }

    function renderUI(data) {
        console.log(data);

        let html = data.map((ele) => {
            return `
            <li>
            <img src=${ele.src}>
            <div class="title">${ele.title}</div>
            <div class="price">￥${ele.price}</div>
            <button class="buy">下单</button>
        </li> 
            `
        }).join("");
        $(".UI2").html(html);
    }

    /* 先给页面添加点击事件，当点击的时候获取页码值，根据该值发送网络请求 */
    // $("#page").on("click", "a", function() {
    //     getDataWithPage($(this).text());
    //     $(this).addClass("active").siblings().removeClass("active");
    // })

    /* 处理排序 */


    /* 实现点击添加商品到购物车的功能 */

    $(".cart").click(() => window.location.href = "./cart.html");
})