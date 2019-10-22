$(() => {
    /* 实现切换的功能 */
    console.log(1111111111111);
    $(".tab-login-item").click(function() {
        /* 设置当前标签选中，并且排它处理 */
        $(this).addClass("active").siblings().removeClass("active");
        $(".loginView").eq($(this).index()).addClass("loginViewCurrent").siblings().removeClass("loginViewCurrent");
    })

    /* 登录按钮的点击事件 */
    $("#registerBtn").click(function() {
        console.log(22222222);
        let usernameVal = $("#usernameID").val();
        let passwordVal = $("#passwordID").val();
        console.log(usernameVal, passwordVal)
        $.ajax({
            type: "post",
            url: "../server/DL.php",
            data: `username=${usernameVal}&password=${passwordVal}`,
            dataType: "json",
            success: function(response) {
                /* 登录成功 */
                console.log(response);
                if (response.status == "success") {
                    /* 跳转到首页 */
                    window.location.href = "http://127.0.0.1/hx1910/NanShiGou/31/code/html/";
                } else {
                    /* 注册失败： */
                    alert(response.msg);
                }

                /* 登录失败 */
            }
        });

    })
})