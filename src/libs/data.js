import { Promise } from 'es6-promise';
import $ from 'jquery';

const origin = '//back.fyq2yj.cn';
// const origin = '//localhost:8823';

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
    $.ajax($.extend(false,{}, defaultParam, params)).done(data => {
      data = typeof data === 'string' ? $.parseJSON(data) : data;
      resolve(data);
    }).fail(() => {
      reject('网络请求异常,请刷新重试');
    });
  });
};

store.getBlogList = (page) => {
  return new Promise((resolve, reject) => {
    ajax_get({
      url: `${origin}/blog/page`,
      data: {
        pagenum: page || 0
      }
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
      url: `${origin}/blog/page/hot`
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
      url: `${origin}/blog/recommend/slide`
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
      url: `${origin}/blog/recommend/top5`
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
      url: `${origin}/blog/get_html/${id}`
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.zanBlog = (id) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `${origin}/blog/zan/${id}`
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
      url: `${origin}/comment/page/${id}`,
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

store.saveBlog = (postData) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `${origin}/blog/new`,
      data: postData
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
      url: `${origin}/user/login`,
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
      url: `${origin}/comment/new`,
      data: comment
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.zanComment = (id) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `${origin}/comment/zan/${id}`
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.caiComment = (id) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `${origin}/comment/cai/${id}`
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
      url: `${origin}/comment/reply/${id}`,
      data: comment
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.getIssueList = (page) => {
  return new Promise((resolve, reject) => {
    ajax_get({
      url: `${origin}/issue/page`,
      data: {
        pagenum: page || 0
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.saveIssue = (postData) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `${origin}/issue/new`,
      data: postData
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.replyIssue = (id, postData) => {
  return new Promise((resolve, reject) => {
    ajax_post({
      url: `${origin}/issue/reply/${id}`,
      data: postData
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.register = (postData) => {
  return new Promise((resolve, reject) => {
    ajax_upload({
      url: `${origin}/user/register`,
      data: postData
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

store.uploadImage = (postData) => {
  return new Promise((resolve, reject) => {
    ajax_upload({
      url: `${origin}/file/upload`,
      data: postData
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

export default store;
