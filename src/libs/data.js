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
    $.ajax($.extend(false,{}, defaultParam, params)).done(data => {
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

store.getCreamList = () => {
  return new Promise((resolve, reject) => {
    ajax_get({
      url: '//back.fyq2yj.cn/blog/page/hot'
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.getBlogSlide = () => {
  return new Promise((resolve, reject) => {
    ajax_get({
      url: '//back.fyq2yj.cn/blog/recommend/slide'
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.getRecomTop5 = () => {
  return new Promise((resolve, reject) => {
    ajax_get({
      url: '//back.fyq2yj.cn/blog/recommend/top5'
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.getBlogInfo = (id) => {
  return new Promise((resolve, reject) => {
    ajax_get({
      url: `//back.fyq2yj.cn/blog/get_html/${id}`
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};
store.getBlogComment = (id) => {
  return new Promise((resolve, reject) => {
    ajax_get({
      url: `//back.fyq2yj.cn/comment/page/${id}`,
      data: {
        sortorder: 'asc'
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.postLogin = (userName, password) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `//back.fyq2yj.cn/user/login`,
      data: {
        name: userName,
        password: password
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.commitReply = (comment) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `//back.fyq2yj.cn/comment/new`,
      data: comment
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};
store.secondReply = (id, comment) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `//back.fyq2yj.cn/comment/reply/${id}`,
      data: comment
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

export default store;
