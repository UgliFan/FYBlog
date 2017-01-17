import { Promise } from 'es6-promise';
import $ from 'jquery';

let store = {};

var ajax_get = (params) => {
  var defaultParam = {
    type: 'get',
    dataType: 'json',
    timeout: 10000
  };
  return new Promise((resolve, reject) => {
    $.ajax($.extend(false,{}, defaultParam, params)).done((data, status, xhr) => {
      data = typeof data === 'string' ? $.parseJSON(data) : data;
      resolve(data);
    }).fail(() => {
      reject('网络请求异常,请刷新重试');
    }).always((xhr, textStatus) => {
      if (textStatus.toLowerCase() === 'timeout') {
        reject('网络请求异常,请刷新重试');
      }
    });
  });
};

var ajax_post = (params) => {
  var defaultParam = {
    type: 'post'
  };
  return new Promise((resolve,reject)=>{
    $.ajax($.extend(false,{}, defaultParam, params)).success(data => {
      data = typeof data === 'string' ? $.parseJSON(data) : data;
      resolve(data);
    }).fail(() => {
      reject('网络请求异常,请刷新重试');
    });
  });
};

var ajax_upload = (params) => {
  var defaultParam = {
    type: 'post',
    cache: false,
    contentType: false,
    processData: false
  };
  return new Promise((resolve,reject)=>{
    $.ajax($.extend(false,{}, defaultParam, params)).success(data => {
      data = typeof data === 'string' ? $.parseJSON(data) : data;
      resolve(data);
    }).fail(() => {
      reject('网络请求异常,请刷新重试');
    });
  });
};

store.getBlogList = () => {
  return new Promise((resolve, reject) => {
    ajax_get({
      url: '//back.fyq2yj.cn/blog/page'
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

export default store;
