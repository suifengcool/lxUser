export default {
    // 设置 title
    title(title) {
        document.title = title
            // hack在ios微信等webview中无法修改document.title的情况
        if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
            var i = document.createElement('iframe')
            i.src = '//m.baidu.com/favicon.ico'
            i.style.display = 'none'
            i.onload = () => {
                setTimeout(() => {
                    i.remove()
                }, 9)
            }
            document.body.appendChild(i)
        }
    },

    // 当前域名
    origin: location.origin,

    // token name
    tokenName: 'access_token',

    getCookie(name) {
        let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
        let arr = document.cookie.match(reg)
        return arr ? unescape(arr[2]) : null
    }
}