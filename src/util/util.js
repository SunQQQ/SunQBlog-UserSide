import axios from 'axios';
import Store from '../store';

// 设置axios的超时重新请求，一共请求3次，每次请求间隔1秒
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if(!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if(config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
});

let CommonFunction = {};
CommonFunction.install = function (Vue) {
  /*将UTC格式时间转为2018-09-09 08：00*/
  Vue.prototype.DateFormat = function (UTCDate) {
    function AddZero(Num) {
      if (Num < 10) {
        return '0' + Num;
      } else {
        return Num;
      }
    }

    var DataObject, Year, Month, Day, Hour, Minute;
    DataObject = new Date(UTCDate);
    Year = DataObject.getFullYear();
    Month = DataObject.getMonth() + 1;
    Day = DataObject.getDate();
    Hour = DataObject.getHours();
    Minute = DataObject.getMinutes();

    return Year + '-' + AddZero(Month) + '-' + AddZero(Day) + ' ' + AddZero(Hour) + ':' + AddZero(Minute);
  };

  /**
   * 封装ajax，统一处理请求异常/loading等逻辑
   * @param Para
   * Para.Url 地址
   * Para.noLoading 非必传，参数值要求为任何非空字符串即可
   * Para.UploadData 参数
   * Para.Success 请求成功且反参正常的回调，回调函数接收response.data.data
   * @constructor
   */
  Vue.prototype.SQFrontAjax = function (Para) {
    // 如果设置了noLoading参数（有这个字段），则不再加载loading
    if(!Para.noLoading) Store.commit('ChangeLoading', true);

    if (!Para['UploadData']) {
      Para['UploadData'] = {};
    }

    axios.post(Para['Url'], Para['UploadData'],{timeout:10000}).then(function (response) {
      if(!Para.noLoading) Store.commit('ChangeLoading', false);

      if (response.data.status == '0') {
        Para['Success'](response.data.data);
      } else {
        Store.commit('ChangeTip', {
          Show: true,
          Title: response.data.data
        });
      }
    }).catch(function (error) {
      if(!Para.noLoading) Store.commit('ChangeLoading', false);

      if (error.response) { // 请求超时时，前端会终止http请求。故请求是没有响应值的，error.response为空
        if(error.response.status == '500'){
          Store.commit('ChangeTip', {
            Show: true,
            Title: '网络异常，请检查网络'
          });
        }else if(error.response.status == '404'){ // 404时也是有response的
          Store.commit('ChangeTip', {
            Show: true,
            Title: '您访问的接口不存在...'
          });
        }else { // 500和404之外的状态码直接弹框展示statusText
          Store.commit('ChangeTip', {
            Show: true,
            Title: error.response.statusText
          });
        }
      }else if (error.request && error.request.readyState==4 && error.request.status==0){
        Store.commit('ChangeTip', {
          Show: true,
          Title: '接口访问超时'
        });
      } else {
        Store.commit('ChangeTip', {
          Show: true,
          Title: error.message
        });
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
    if (Storage) {
      return JSON.parse(Storage);
    } else {
      return {};
    }
  };

  /**
   * 修改/存储 本地数据
   * @param StorageName Storage表名字
   * @param Value Object类型，需要Key，Value两个字段。
   * @constructor
   */
  Vue.prototype.SetLocalStorage = function (StorageName, Data) {
    var Storage = localStorage.getItem(StorageName);
    // 如果表存在，修改表中字段名
    if (Storage) {
      // 将表的值转为对象，并装入传入的字段
      var StorageObject = JSON.parse(Storage);
      StorageObject[Data.Key] = Data.Value;
      // 重新将存储
      localStorage.setItem(StorageName, JSON.stringify(StorageObject));
    }
    //如果表不存在直接存储
    else {
      var Object = {};
      Object[Data.Key] = Data.Value;
      localStorage.setItem(StorageName, JSON.stringify(Object));
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
    if (EmoticonChineseArray) {
      EmoticonChineseArray.forEach(function (Item) {
        Item = Item.replace(/\[|\]/g, '');// 将字符串中的项如 '[[微笑]]'，替换为'微笑'
        data = data.replace(/\[\[.*?\]\]/, '<img style="vertical-align:bottom" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + EmotionList.indexOf(Item) + '.gif">'); //将'微笑'替换为<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif">
      });
    }

    return data;
  };


  /**
   * 根据IP获取用户所在城市 ip非必传
   * @param func 获取成功后的回调函数，该参数将接受一个城市名称
   * @constructor
   */
  Vue.prototype.GetLocation = function (func) {
    let that = this,
      locationCookie = this.getSQCookie('sunqBlogLocation'),
      sunqBlogLocationCode = this.getSQCookie('sunqBlogLocationCode');

    // 如果用户多次访问，一周内不会重复请求定位接口
    if(locationCookie){
      func(locationCookie,sunqBlogLocationCode);
    }else {
      axios({
        url: 'https://restapi.amap.com/v3/ip',
        method: 'post',
        params: {
          key: 'ba5f9b69f0541123a4dbe142da230b4d'
        },
      }).then(function (resp) {
        func(resp.data.city,resp.data.adcode);
        that.setSQCookie('sunqBlogLocation',resp.data.city,3); // 相隔3小时同一浏览器再次访问时会重新定位
        that.setSQCookie('sunqBlogLocationCode',resp.data.adcode,3);
      }).catch();
    }
  };

  Vue.prototype.getIpLocation = function(func){
    axios({
      url: 'https://pv.sohu.com/cityjson?ie=utf-8',
      method: 'post'
    }).then(function (resp) {
      resp.cip = resp.cip.replace('::ffff:','');
      // resp.cname = resp.cname;
      func(resp.cname, resp.cip);
    }).catch();
  };

  /**
   * 获取当前时间
   * @returns {string:2021/11/18 16:45:39}
   */
  Vue.prototype.getSQTime = function () {
    let dateObject = new Date(),
      year = dateObject.getFullYear(),
      month = dateObject.getMonth() + 1,
      day = dateObject.getDate(),
      hour = dateObject.getHours(),
      min = dateObject.getMinutes(),
      second = dateObject.getSeconds(),
      result = '';

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hour < 10) hour = '0' + hour;
    if (min < 10) min = '0' + min;
    if (second < 10) second = '0' + second;

    result = '' + year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + second;
    return result;
  };

  /**
   * 种cookie
   * @param name cookie名称
   * @param value cookie值
   * @param exHour 过期时间,单位小时
   */
  Vue.prototype.setSQCookie = function (name, value, exHour) {
    var d = new Date();
    d.setTime(d.getTime() + exHour * 60 * 60 * 1000);
    var expires = 'expires=' + d.toGMTString(); // cookie的语法要求是这个标志，和这个时间格式
    document.cookie = name + '=' + value + '; ' + expires;
    console.log('种下cookie', name + '=' + value + '; ' + expires);
  };

  /**
   * 获取cookie
   * @param name cookie的名称
   */
  Vue.prototype.getSQCookie = function (cookName) {
    let name = cookName + '=',
      cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cleanItem = cookies[i].trim();
      if (cleanItem.indexOf(name) == 0) {
        return cleanItem.substring(name.length, cookies[i].length);
      }
    }
    return '';
  };
  Vue.prototype.getSQBrowser = function () {
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

  /**
   * 数组去重
   * @param array
   * @returns {any[]}
   */
  Vue.prototype.dedupe = function(array){
    return Array.from(new Set(array));
  };
  
  Vue.prototype.createLog = function (log){
    let that = this,
      dateString = this.getSQTime();
    that.GetLocation(function (LocationCityName) {
      that.SQFrontAjax({
        Url: '/api/visitCreate/foreend',
        UploadData: {
          location:LocationCityName,
          fromUrl:document.referrer,
          time:dateString,
          browser: window.navigator.platform.split(' ')[0] + '\n' + that.getSQBrowser() + '\n' + window.screen.width + "*" + window.screen.height,
          moduleType:log.moduleType,
          operateType:log.operateType,
          operateContent:log.operateContent ? log.operateContent : '',
        },
        Success: function () {
          that.setSQCookie('sunqBlog','统计访问量',12); // 12个小时内同一个浏览器算一个访问量
        }
      });
    });
  };
};

export default CommonFunction;
