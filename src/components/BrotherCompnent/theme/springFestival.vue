/**
    春节氛围组件，包含对联，现年快乐图标等
*/
<template>
    <div class="springFestival">
        <img src="../../../static/img/theme/happyNewYear.jpg" :style="{ left: springIconLeft + 'px' }" />
        <div class="leftCouplet">
            <div class="coupletRoller">
                <div class="rollerBorder"></div>
                <div class="rollerContent"></div>
                <div class="rollerBorder"></div>
            </div>
            <div class="content">
                <div class="goldLine"></div>
                <div class="textDiv">屏</div>
                <div class="textDiv">中</div>
                <div class="textDiv">创</div>
                <div class="textDiv">造</div>
                <div class="textDiv">繁</div>
                <div class="textDiv">华</div>
                <div class="textDiv">事</div>
                <div class="goldLine"></div>
                <div class="goldLine glRight"></div>
            </div>
            <div class="coupletRoller move">
                <div class="rollerBorder"></div>
                <div class="rollerContent"></div>
                <div class="rollerBorder"></div>
            </div>
        </div>
        <div class="leftCouplet rightCouplet">
            <div class="coupletRoller">
                <div class="rollerBorder"></div>
                <div class="rollerContent"></div>
                <div class="rollerBorder"></div>
            </div>
            <div class="content">
                <div class="goldLine"></div>
                <div class="textDiv">指</div>
                <div class="textDiv">尖</div>
                <div class="textDiv">流</div>
                <div class="textDiv">转</div>
                <div class="textDiv">代</div>
                <div class="textDiv">码</div>
                <div class="textDiv">诗</div>
                <div class="goldLine glRight"></div>
            </div>
            <div class="coupletRoller move">
                <div class="rollerBorder"></div>
                <div class="rollerContent"></div>
                <div class="rollerBorder"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "springFestival",
    data() {
        return {
            screenWidth: 0,
            springIconLeft: 0,
        }
    },
    created() {
        this.screenWidth = window.screen.width;
        this.springIconLeft = this.screenWidth > 768 ? (this.screenWidth - 1200) / 2 + 120 : 110;
        console.log(this.springIconLeft);
    }
}
</script>


<style lang="less">// 此处特意不加scoped,让本主题的样式干扰/覆盖掉各组件原本的属性
@media only screen and(min-device-width:768px) {
    .springFestival {
        img {
            width: 95px;
            height: 60px;
            position: fixed;
            top: 0px;
            z-index: 10000;
        }

        .leftCouplet {
            position: fixed;
            left: 5%;
            top: 20%;
            text-align: center;
            width: 100px;
            z-index: 1000;
            display:none;

            .coupletRoller {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: -1px;

                .rollerBorder {
                    height: 18px;
                    width: 5px;
                    background-color: #D34F2F;
                    border-radius: 10px;
                }

                .rollerContent {
                    width: 80px;
                    height: 16px;
                    background-color: #FACCAB;
                    box-shadow: 0px 0px 4px 4px #E58B55 inset;
                }
            }

            .move {
                margin-top: -1px;
            }

            .content {
                position: relative;
                background-color: #D92223;
                display: flex;
                flex-direction: column;
                padding: 30px 0;
                margin: 0 auto;
                width: 70px;
                position: relative;

                .goldLine {
                    position: absolute;
                    width: 5px;
                    background-color: #FDD699;
                    height: 100%;
                    left: 3px;
                    top: 0;
                }

                .glRight {
                    left: unset;
                    right: 3px;
                }

                .textDiv {
                    background-color: #FFDBB7;
                    border-radius: 100%;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    color: #D92223;
                    font-weight: 1000;
                    margin: 10px auto;
                    font-size: 30px;
                    font-family: cursive;
                }
            }
        }

        .rightCouplet {
            left: unset;
            right: 5%;
        }
    }

    .MenuItemActive{
        border-bottom: 2px solid #D92223!important;
        color: #D92223!important;
    }
}

@media only screen and(max-device-width:768px) {
    .springFestival {
        display: none;

        img {
            width: 95px;
            height: 60px;
            position: fixed;
            top: 0px;
            z-index: 10000;
        }

        .leftCouplet {
            display: none;
        }
    }
}
</style>