import axios from 'axios';
import Store from '../store';

let CommonFunction = {};
CommonFunction.install = function (Vue) {
  /*将UTC格式时间转为2018-09-09 08：00*/
  Vue.prototype.DateFormat = function (UTCDate) {
    function AddZero(Num) {
      if(Num < 10){
        return '0' + Num;
      }else {
        return Num;
      }
    }

    var DataObject,Year,Month,Day,Hour,Minute;
    DataObject = new Date(UTCDate);
    Year = DataObject.getFullYear();
    Month = DataObject.getMonth() + 1;
    Day = DataObject.getDate();
    Hour = DataObject.getHours();
    Minute = DataObject.getMinutes();

    return Year + '-' + AddZero(Month) + '-' + AddZero(Day) + ' ' + AddZero(Hour) + ':' + AddZero(Minute);
  };

  Vue.prototype.SQFrontAjax = function (Para) {
    Store.commit('ChangeLoading',true)

    if(!Para['UploadData']){
      Para['UploadData'] = {};
    }

    axios.post(Para['Url'], Para['UploadData']).then(function (response) {
      Store.commit('ChangeLoading',false);

      if(response.data.status == '0'){
        Para['Success'](response.data.data);
      }else {
        Store.commit('ChangeTip', {
          Show: true,
          Title: response.data.data
        });
      }
    }).catch(function (error) {
      if(error.response){
        console.log(error.response);
      }else if(error.request){
        console.log(error.request);
      }else {
        console.log('SQFrontAjax Error:',error.message);
      }
  });
  };

  /**
   * 获取本地数据
   * @param StorageName
   * @constructor
   * 返回对象类型
   */
  Vue.prototype.GetLocalStorage = function (StorageName) {
    var Storage = localStorage.getItem(StorageName);
    if(Storage){
      return JSON.parse(Storage);
    }else {
      return {};
    }
  };

  /**
   * 修改/存储 本地数据
   * @param StorageName Storage表名字
   * @param Value Object类型，需要Key，Value两个字段。
   * @constructor
   */
  Vue.prototype.SetLocalStorage = function (StorageName,Data) {
    var Storage = localStorage.getItem(StorageName);
    // 如果表存在，修改表中字段名
    if(Storage){
      // 将表的值转为对象，并装入传入的字段
      var StorageObject = JSON.parse(Storage);
      StorageObject[Data.Key] = Data.Value;
      // 重新将存储
      localStorage.setItem(StorageName,JSON.stringify(StorageObject));
    }
    //如果表不存在直接存储
    else {
      var Object = {};
      Object[Data.Key] = Data.Value;
      localStorage.setItem(StorageName,JSON.stringify(Object));
    }
  };

  /**
   * 正则表达匹配数据中是否有表情文字，将表情文字转成图片
   * @param data 需要匹配的数据
   * @returns { data:匹配后的数据}
   * @constructor
   */
  Vue.prototype.MatchEmotion = function (data) {
    var EmotionList = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭',
      '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱',
      '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘',
      '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
      '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒',
      '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹',
      '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
      '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
      '激动', '街舞', '献吻', '左太极', '右太极'];

    //获取由所有双中括号的汉语组成的数组
    var EmoticonChineseArray = data.match(/\[\[.*?\]\]/g);  //如果匹配到返回数据，匹配不到返回null,如[ '[[微笑]]','[[撇嘴]]' ]。因为es6不支持断言，只能处理成这样
    // 将数组中的各项，替换为<img src='1.gif'>
    if(EmoticonChineseArray){
      EmoticonChineseArray.forEach(function (Item) {
        Item = Item.replace(/\[|\]/g,'');// 将字符串中的项如 '[[微笑]]'，替换为'微笑'
        data = data.replace(/\[\[.*?\]\]/,'<img style="vertical-align:bottom" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + EmotionList.indexOf(Item) + '.gif">'); //将'微笑'替换为<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif">
      });
    }

    return data;
  };


  /**
   * 根据IP获取用户所在城市
   * @param func 获取成功后的回调函数，该参数将接受一个城市名称
   * @constructor
   */
  Vue.prototype.GetLocation = function (func) {
    this.SQFrontAjax({
      Url: '/api/GetUserIp',
      Success: function (data) {
        axios({
          url: 'https://restapi.amap.com/v3/ip',
          method: 'post',
          params: {
            // ip: '101.88.147.146',
            ip: data.IpAdress,
            key:'ba5f9b69f0541123a4dbe142da230b4d'
          },
        }).then(function (resp) {
          func(resp.data.city,data.IpAdress);
        }).catch();
      }
    });
  };

  /**
   * 获取当前时间
   * @returns {string:2021/11/18 16:45:39}
   */
  Vue.prototype.getSQTime = function (){
    let dateObject = new Date(),
      year = dateObject.getFullYear(),
      month = dateObject.getMonth() + 1,
      day = dateObject.getDate(),
      hour = dateObject.getHours(),
      min = dateObject.getMinutes(),
      second = dateObject.getSeconds(),
      result = '';

      if(min<10) min = '0' + min;
      if(second<10) second = '0' + second;

      result = ''+ year +'/'+month+'/'+ day +' '+ hour +':'+ min +':' + second;
    return result;
  };

  /**
   * 种cookie
   * @param name cookie名称
   * @param value cookie值
   * @param exHour 过期时间,单位小时
   */
  Vue.prototype.setSQCookie = function (name,value,exHour){
    var d = new Date();
    d.setTime(d.getTime() + exHour*60*60*1000);
    var expires = 'expires=' + d.toGMTString(); // cookie的语法要求是这个标志，和这个时间格式
    document.cookie = name + '=' + value + '; ' + expires;
    console.log('种下cookie',name + '=' + value + '; ' + expires);
  };

  /**
   * 获取cookie
   * @param name cookie的名称
   */
  Vue.prototype.getSQCookie = function (cookName){
    let name = cookName + '=',
      cookies = document.cookie.split(';');
    for(let i=0;i<cookies.length;i++){
      let cleanItem = cookies[i].trim();
      if(cleanItem.indexOf(name) == 0){
        return cleanItem.substring(name.length,cookies[i].length);
      }
    }
    return '';
  };
  Vue.prototype.getSQBrowser = function (){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf('compatible') > -1
      && userAgent.indexOf('MSIE') > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf('Edge') > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf('Firefox') > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf('Safari') > -1
      && userAgent.indexOf('Chrome') == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf('Chrome') > -1
      && userAgent.indexOf('Safari') > -1; //判断Chrome浏览器

    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      if (fIEVersion == 7) {
        return 'IE7';
      } else if (fIEVersion == 8) {
        return 'IE8';
      } else if (fIEVersion == 9) {
        return 'IE9';
      } else if (fIEVersion == 10) {
        return 'IE10';
      } else if (fIEVersion == 11) {
        return 'IE11';
      } else {
        return '0';
      }//IE版本过低
      return 'IE';
    }
    if (isOpera) {
      return 'Opera';
    }
    if (isEdge) {
      return 'Edge';
    }
    if (isFF) {
      return 'FireFox';
    }
    if (isSafari) {
      return 'Safari';
    }
    if (isChrome) {
      return 'Chrome';
    }
  };
};

export default CommonFunction;
