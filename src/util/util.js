import axios from 'axios'

let CommonFunction = {}
CommonFunction.install = function (Vue) {
  /*将UTC格式时间转为2018-09-09 下午 08：00*/
  Vue.prototype.DateFormat = function (UTCDate) {
    return (new Date(UTCDate)).toLocaleString( );
  }

  Vue.prototype.SQFrontAjax = function (Para) {
    var That = this;
    this.bus.$emit('Loading',true);

    if(!Para['UploadData']){
      Para['UploadData'] = {};
    }

    axios.post(Para['Url'], Para['UploadData']).then(function (response) {
      That.bus.$emit('Loading',false);

      if(response.data.status == '0'){
        Para['Success'](response.data.data);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

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
  }

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
  }
}

export default CommonFunction