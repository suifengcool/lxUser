<template>
    <div id="dummyStatus">
        <div class="dummyStatus-box">
            <div class="img-box">
                <img :src="this.imgSrc || require('../assets/nostatus2.png')" alt="">
            </div>
            <p>{{this.text || '无记录'}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dummyStatus',

    props: [
        'text',    // 空状态提示语
        'imgSrc'   // 空状态提示图
    ]
}
</script>
<style lang="sass">
#dummyStatus
    background: #fff
    height: 20rem
    width: 18.75rem
    .dummyStatus-box 
        text-align: center
        z-index: 1000000
        position: absolute
        left: 50%
        top: 24%
        transform: translateX(-50%)
        .img-box
            overflow: hidden
            width: 7.2rem
            img
                width: 100% 
        p 
            font-size: .65rem
            color: #979797 
            margin-top: 1.15rem 
</style>