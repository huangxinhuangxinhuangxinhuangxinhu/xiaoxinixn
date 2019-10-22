$(() => {
    class Manager {
        constructor(data) {
            this.data = data;
            this.root = null;
        }
        init() {
            this.renderHeader();
        }
        renderHeader() {
            let Html = `
            <div class="page-explain">
            <div class="wrapper">
                您好，欢迎来到潮男购物网站！
                <div class="page-explain-link fr">
                    <a rel="nofollow" href="" target="_blank" class="nsglogin">请登录</a>
                    <a rel="nofollow" href="" target="_blank">免费注册</a>
                    <a href="" title="QQ账号登录" class="qq">用QQ账号登录</a>
                    <a href="" title="新浪微博" class="sina">用微博账号登录</a>
                </div>
            </div>
        </div> 
        `
            $("body").append(Html);
            console.log(Html);
            return Html;
        }
    }
    let p1 = new Manager();
    p1.init();
})