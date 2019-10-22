$(() => {
    loadCart();

    function loadCart() {
        $(".cartBox").remove();
        $.ajax({ //获取商品数据
            data: {
                type: "get"
            },
            url: "../server/cart.php",
            dataType: "json",
            success: function(res) {
                console.log(res);
                totalMoney()
                $(res.data).each((index, ele) => {
                    renderUI(ele);
                    totalMoney()
                })
            }
        });
    }
    /* 渲染购物车 */
    function renderUI(data) {
        let tmp = data.goods.map(item => {
            return `
            <ul class="order_lists order_item" gid=${item.good_id}>
                <li class="list_chk">
                  <input type="checkbox" id="checkbox_${item.good_id}" class="son_check">
                  <label for="checkbox_${item.good_id}"></label>
                </li>
                <li class="list_con">
                  <div class="list_img"><a href="./detail.html?product/${item.good_id}"><img src=${item.src} alt=""></a></div>
                  <div class="list_text"><a href="./detail.html?product/${item.good_id}">${item.title}</a></div>
                </li>
                <li class="list_price">
                  <p class="price">￥${item.price}</p>
                </li>
                <li class="list_amount">
                  <div class="amount_box">
                    <a href="javascript:;" class="reduce">-</a>
                    <input type="text" value="${item.num}" class="sum">
                    <a href="javascript:;" class="plus">+</a>
                  </div>
                </li>
                <li class="list_sum">
                  <p class="sum_price" data-price=${item.price}>￥${Math.round(item.price * item.num * 100) / 100}</p>
                </li>
                <li class="list_op">
                  <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                </li>
              </ul>`
        }).join('');

        let html = `
                <div class="cartBox">
                  <div class="shop_info">
                    <div class="all_check">
                      <input type="checkbox" id="shop_a" class="shopChoice">
                      <label for="shop_a" class="shop"></label>
                    </div>
                    <div class="shop_name">
                      店铺：<a href="">${data.store}</a>
                    </div>
                  </div>
                  <div class="order_content">${tmp}</div>
                </div>`;
        $(html).insertAfter('.cartMain_hd');
    }

    $("body").on("click", "#all", function() {
        // $(this).next("label").toggleClass("mark");
        /* 设置页面中所有的复选框都选中 */
        $("body").find("input[type=checkbox]").next("label").toggleClass("mark");
        totalMoney();
    })

    $("body").on("click", ".plus,.reduce", function() {
        /* 更改数量|发送网络请求 */
        let count;
        if (this.className == "plus") {
            count = $(this).prev().val() * 1 + 1;
            $(this).prev().val(count);
        } else {
            count = $(this).next().val() * 1 - 1;
            $(this).next().val(count);


        }

        let price = $(this).parents(".order_item").find(".sum_price").data().price;
        $(this).parents(".order_item").find(".sum_price").text("￥" + price * count);

        let gid = $(this).parents(".order_item").attr("gid");
        updateCartData(this.className, gid);
        totalMoney();

    });


    function updateCartData(flag, good_id) {
        $.ajax({
            url: "../server/cart.php",
            data: {
                type: "update",
                flag,
                good_id
            },
            success: function(response) {

            }
        });
    }

    /* 删除功能 */
    $("body").on("click", ".delBtn", function() {
        console.log("+++");
        let good_id = $(this).parents(".order_item").attr("gid");
        $.ajax({
            url: "../server/cart.php",
            data: {
                type: "del",
                good_id
            },
            dataType: "json",
            success: function(response) {
                console.log(response);
                loadCart();

            }
        });
    })



    function totalMoney() {
        let total_count = 0;
        let total_price = 0;

        $(".order_item").each((index, ele) => {
            // console.log("-----------");

            let count = $(ele).find(".sum").val() * 1;


            let price = $(ele).find(".price").text().substr(1) * 1;

            total_count += count;
            total_price += count * price;
        });

        $(".piece_num").text(total_count);
        $(".total_text").text("￥" + total_price);
        $(".reduce").click(function() {
            // console.log($(this).siblings(".sum").val() - 1);


        })


    };


})