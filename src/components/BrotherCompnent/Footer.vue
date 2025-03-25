<template>
    <footer class="Footer" v-show="footerShow">
        <div>
            © 2025 SunQuan. All Rights Reserved.<span class="RecordNo"><a
                    href="https://beian.miit.gov.cn">豫ICP备2025116959号-1</a></span>
        </div>
        <div>Based on Java + Vue, Design by SunQuan</div>
    </footer>
</template>

<script>
import store from "../../store"
export default {
    name: "Footer",
    computed: {
        footerShow() {
            return store.state.footer.show;
        }
    }
}
</script>

<style scoped lang="less">
@import '../../static/css/base.less';
/*pc端*/
@media only screen and (min-device-width : 768px) {
    .Footer {
        text-align: center;
        background-color: @TranslucentWhitleBackg;
        color: @FontColorGray;
        padding: 2rem 1rem 1.6rem;
        margin-top: 1rem;
    }

    .RecordNo {
        margin-left: 0.5rem;
    }

    .Footer :nth-child(1) {
        margin-bottom: 1rem;
    }
}

/*移动端*/
@media only screen and (max-device-width : 768px) {
    .Footer {
        text-align: center;
        background-color: @fore_color;
        color: @footerColor;
        padding: 1.5rem;
        margin-top: 1rem;
    }

    .RecordNo {
        display: inline-block;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
    }
}

.Footer a {
    color: @FontColorGray;
}
</style>