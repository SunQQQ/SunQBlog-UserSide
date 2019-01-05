//表情包组件
<template>
    <transition name="Fade">
        <div class="EmoticonListCover" v-if="EmotionShow" @click="OpenEmotion(false)">
            <div class="EmoticonList">
                <div class="PicItem" v-for="(item,i) in EmotionList" @click="ClickEmoticon(i)" :key="i">
                    <img :src=" 'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + i + '.gif'">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import Store from '../../store'
  export default {
    name: "Emotion",
    computed:{
      EmotionShow(){
        return Store.state.EmotionShow;
      }
    },
    data:function(){
      return {
        // EmotionShow:false,
        EmotionList:['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭',
          '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱',
          '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘',
          '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
          '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒',
          '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹',
          '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
          '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
          '激动', '街舞', '献吻', '左太极', '右太极'],
      }
    },
    methods:{
      //选中表情
      ClickEmoticon:function (EmoticonNo) {
        var That = this;

        Store.commit('ChangeEmotionShow',false);
        Store.commit('AppendMessageText','[[' + That.EmotionList[EmoticonNo] + ']]');

        That.$emit('AppendInputValue');
      },
      OpenEmotion:function (Value) {
        Store.commit('ChangeEmotionShow',Value);
      },
    },
  }
</script>

<style scoped lang="less">
    @import "../../static/css/base.less";
    .EmoticonListCover{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1000000;
    }

    .EmoticonList{
        .myflex(center);
        flex-wrap: wrap;
        width: 272px;
        height: 238px;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;

        background-color: @fore_color;
        padding: 10px;
        text-align: center;
        border: 1px solid @BorderColor;
        box-shadow: 2px 3px 10px rgba(0,0,0,0.6);;
        /*box-shadow: 3px 0px 2px 2px @BorderColor,-3px 0px 2px 2px @BorderColor,0px 3px 2px 2px @BorderColor,0px -3px 2px 2px @BorderColor*/;
        overflow-y: scroll;
    }
    .PicItem{
        width: 34px;
        text-align: center;
        cursor:pointer;
    }
    .PicItem img{
        width: 24px;
        height: 24px;
        margin-top: 5px;
    }

    .Fade-enter-active, .fade-leave-active {
        transition: opacity 0.8s;
    }
    .Fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
