/* 整体思路：表单验证 + 图形验证码 + 手机短信验证 + 注册请求 */
$(() => {
    $("#phoneID").keyup(function() {
        console.log("输入值:", $(this).val());

        let val = $(this).val().trim();
        if (/^1[3-9]\d{9}$/.test(val)) {
            $(this).parents(".phone").removeClass("form-group-error");
            $(this).siblings(".form-group__message").text("");
        } else {
            $(this).parents(".phone").addClass("form-group-error");
            $(this).siblings(".form-group__message").text("手机号码不正确");
        }
    })

    // /* 集成图像验证码 */
    let captcha1 = new CaptchaMini({
        fontSize: 30,
        length: 5,
        content: "adshdfsnf234j35uetege5",
        lineNum: 3,
        dotNum: 20
    });
    let imgCode;
    captcha1.draw(document.querySelector('#captcha'), r => {
        console.log("验证码 = " + r);
        imgCode = r;
    });


    /* 给手机号码发送短信： */
    /* 思路：给按钮添加点击事件，当点击按钮的时候，检查手机号码是否正确，如果手机号码正确，那么就短信，如果不正确那 */
    let randomNumber;

    function getRandom(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min
    }

    $("#msgCodeBtn").click(function() {
        $("#phoneID").trigger("keyup");
        let flag = $(".phone").hasClass("form-group-error");
        /* 如果flag的值是flase,那么我们就调用第三方平台发请求 发短信 */
        if (flag) return;

        randomNumber = getRandom(1000, 9999);
        console.log(randomNumber);
        /* $.ajax({
            type: 'post',
            url: 'http://route.showapi.com/28-1',
            dataType: 'json',
            data: {
                "showapi_appid": '91032', //这里需要改成自己的appid
                "showapi_sign": 'd57b19c8d2d44aef94aee464768a38d8', //这里需要改成自己的应用的密钥secret
                "mobile": $("#phoneID").val(),
                "content": `{"name":"文顶顶","code":${randomNumber},"minute":"3","comName":"脑子进水集团"}`,
                "tNum": "T150606060601",
            },
            success: (result) => console.log(result)
        }); */
    });


    /* 注册按钮的处理： */
    /* 思路：检查表单验证通过 && 图像验证码 && 手机短信验证码 && 是否勾选协议  把页面数据作为参数提交给服务器： */
    $("#loBtn").click(function() {
        // $("#phoneID").trigger("keyup");
        let val = $('#phoneID').val().trim();
        $.ajax({

            type: "post",
            url: "../server/zhuce.php",
            data: {
                val,
                fangfa: 'zhuce',
            },
            success: function(str) {
                if (str == 'yes') {
                    /* 注册成功： */

                    alert("注册成功，点击登录")

                } else if (str == 'no') {
                    /* 注册失败： */
                    console.log(111);
                    alert("注册失败")

                }


            }
        });

        if ($(".form-group-error").length != 0) return;
        if ($("#imageCode").val() != imgCode) {
            alert("图形验证码不正确!");
            return;
        }
        if ($("#msgCode").val() != randomNumber) {
            console.log($("#msgCode").val());
            console.log(randomNumber);


            alert("手机验证码不正确!");
            return;
        }

        if (!$("#protocol").is(":checked")) {
            alert("请阅读并同意注册协议");
            return;
        }

        /* 发请求给服务器  注册： */
        $.ajax({
            type: "post",
            url: "../server/zhuce.php",
            data: "data",
            // dataType: "json",
            success: function(response) {
                /* 注册成功： */
                /* 注册失败： */
            }
        });


    })

});