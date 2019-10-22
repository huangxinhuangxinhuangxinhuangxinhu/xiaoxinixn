$(() => {
    console.log($("#usernameID"));

    $("#usernameID").keyup(function() {
        let val = $(this).val().trim();
        if (/^[a-zA-Z]{2,6}$/.test(val)) {
            $(this).parents(".username").removeClass("form-group-error");
            $(this).siblings(".form-group__message").text("");
        } else {
            $(this).parents(".username").addClass("form-group-error");
            $(this).siblings(".form-group__message").text("用户名不规范！");
        }
    })
    $("#password").keyup(function() {
        let val = $(this).val().trim();
        /*密码长度6-10字符（大小写字母和数字）  */
        if (/^[0-9a-zA-Z]{6,10}$/.test(val)) {
            $(this).parents(".passwordA").removeClass("form-group-error");
            $(this).siblings(".form-group__message").text("");
        } else {
            $(this).parents(".passwordA").addClass("form-group-error");
            $(this).siblings(".form-group__message").text("密码不符合规范");
        }
    })


    /* 登录按钮的处理： */
    $("#registerBtn").click(function() {

        $("#usernameID").trigger("keyup");
        $("#password").trigger("keyup");

        if (!$("#protocol").is(":checked")) {
            alert("请阅读并同意注册协议");
            return;
        }
        /* 发请求给服务器  登录： */
        $.ajax({
            type: "post",
            url: "../server/register.php",
            data: "data",
            dataType: "json",
            success: function(response) {
                /* 登录成功： */
                /* 登录失败： */
            }
        });
    })

});