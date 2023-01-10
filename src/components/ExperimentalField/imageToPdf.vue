<!--
 * @Author: ke.xue
 * @Date: 2022-12-24 12:55:54
 * @LastEditors: ke.xue
 * @LastEditTime: 2022-12-26 14:58:12
 * @FilePath: \SunQBlog-UserSide\src\components\experimentalField\imageToPdf.vue
 * @Description: 文件描述
-->
<template>
  <transition name="fade" mode="out-in">
    <div class="toPdf">
      <input v-if="showInput" type="file" accept="image/*" multiple="multiple" @change="inputChange">
      <div class="buttonBox">        
        <button class="button" @click="clearAll">清空</button>
        <button class="button" @click="download">下载</button>
      </div>
      <div ref="imgs" class="imgsBox">
        <img v-for="(item, index) in imgs" :key="index" :src="item" alt="">
      </div>
      <div v-if="showToast" class="shadow">
        <div class="myToast">
          <h1>警告</h1>
          <p>该操作将清空页面上的全部图片并无法恢复；确定要清空吗? 点击确认继续清空，点击取消关闭当前弹框</p>
          <div class="buttonList">
            <div class="confirm button" @click="confirmClear">确认</div>
            <div class="cancel button" @click="showToast = false">取消</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// npm install --save html2canvas
// npm install jspdf --save
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default {
  name: 'ToPdf',
  data () {
    return {
      imgs: [],
      showToast: false,
      showInput: true
    }
  },
  methods: {
    downloadPDF (page) {
      html2canvas(page).then(canvas => {
        this.canvas2PDF(canvas)
      })
    },
    canvas2PDF (canvas) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height

      // 一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 841.89
      // 未生成pdf的html页面高度
      var leftHeight = contentHeight
      // 页面偏移
      var position = 0
      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28
      var imgHeight = 592.28 / contentWidth * contentHeight

      var pageData = canvas.toDataURL('image/jpeg', 1.0)

      // eslint-disable-next-line new-cap
      var pdf = new jsPDF('', 'pt', 'a4')

      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage()
          }
        }
      }
      pdf.save(new Date().getTime() + '合成.pdf')
    },
    download () {
      if (!this.imgs.length) return
      this.downloadPDF(this.$refs.imgs)
    },
    inputChange (e) {
      const arr = [],
        that = this,
        filesArray = Array.from(e.target.files); // e.target.files是个类数组，需转化
            
      filesArray.forEach((item)=>{
        arr.push(that.fileToUrl(item));
      });

      Promise.all(arr).then(res => {
        this.imgs = [...this.imgs, ...res]
        this.updateInput()
      })
    },
    updateInput () {
      this.showInput = false
      this.$nextTick(() => {
        this.showInput = true
      })
    },
    fileToUrl (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (res) {
          resolve(res.target.result)
        }
      })
    },
    clearAll () {
      if (!this.imgs.length) return
      this.showToast = true
    },
    confirmClear () {
      this.imgs = []
      this.showToast = false
    }
  }
}
</script>

<style lang="less" scoped>
.toPdf {
  margin-top: 100px;
  padding: 0 20px 20px;
  .imgsBox {
    margin: 10px auto;
    width: 600px;
    font-size: 0;
    img {
      width: 600px;
    }
  }
  .buttonBox {
    margin-top: 30px;
  }
  .button {
    min-width: 100px;
    border: 1px solid #2472c8;
    padding: 0 20px;
    height: 40px;
    line-height: 38px;
    border-radius: 8px;
    font-size: 16px;
    text-align: center;
  }
  .shadow {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
  }
  .myToast {
    position: absolute;
    top: 20vh;
    left: 50%;
    width: 80vw;
    max-width: 300px;
    text-align: center;
    border-radius: 12px;
    transform: translate(-50%,0);
    background: #fff;
    p {
      padding: 10px;
    }
    .buttonList {
      margin-top: 10px;
      display: flex;
      .button {
        flex: 1;
        &.confirm {
          background: #2472c8;
          color: #fff;
        }
      }
    }
  }
}
</style>
