export const throttle = (action, delay = 1000) => {
  let timeout = null;
  let lastRun = 0;
  return function () {
    if (timeout) {
      return;
    }
    let elapsed = (+new Date()) - lastRun;
    let args = arguments;
    let runCallback = () => {
      lastRun = + new Date();
      clearTimeout(timeout);
      timeout = null;
      action.apply(this, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay - elapsed);
    }
  }
};

if (!Array.prototype.$remove) {
  Array.prototype.$remove = function (item) {
    if (!this.length) return;
    const index = this.indexOf(item);
    if (index > -1) {
      return this.splice(index, 1);
    }
  }
}

exports.lazyLoad = {
  DEFAULT_URL: '',
  ERROR_URL: '',
  Listeners: [],
  imageCache: [],
  init(el, Options) {
    this.Init = {
      preLoad: Options.preLoad || 1.3,
      error: Options.error || this.DEFAULT_URL,
      loading: Options.loading || this.ERROR_URL,
      attempt: Options.attempt || 3,
      zoom: Options.zoom || 1
    };
    if (el.getAttribute('lazy') === 'loaded') return;
    if (this.checkElExist(el)) return;

    let imageSrc = binding.value;
    let imageLoading = this.Init.loading;
    let imageError = this.Init.error;

    this.setElRender(el, imageLoading, 'loading');
    this.Listeners.push({
      attempt: 0,
      el: el,
      error: imageError,
      src: imageSrc
    });
    this.lazyLoadHandler();
    window.addEventListener('scroll', this.lazyLoadHandler);
    window.addEventListener('wheel', this.lazyLoadHandler);
    window.addEventListener('mousewheel', this.lazyLoadHandler);
    window.addEventListener('resize', this.lazyLoadHandler);
    window.addEventListener('animationend', this.lazyLoadHandler);
    window.addEventListener('transitionend', this.lazyLoadHandler);
  },
  checkElExist(el) {
    let hasIt = false;
    this.Listeners.forEach((item) => {
      if (item.el === el) hasIt = true;
    });
    if (hasIt) {
      this.lazyLoadHandler();
    }
    return hasIt;
  },
  lazyLoadHandler: throttle(() => {
    for (let i = 0, len = this.Listeners.length; i < len; ++i) {
      this.checkCanShow(this.Listeners[i]);
    }
  }, 300),
  setElRender(el, src, state) {
    el.setAttribute('src', src);
    el.setAttribute('lazy', state);
  },
  checkCanShow(listener) {
    if (this.imageCache.indexOf(listener.src) > -1) {
      return setElRender(listener.el, listener.src, 'loaded');
    }
    let rect = listener.el.getBoundingClientRect();
    if (rect.top < window.innerHeight * this.Init.preLoad / this.Init.zoom && rect.bottom > 0) {
      this.render(listener);
    }
  },
  render(item) {
    if (item.attempt >= this.Init.attempt) return false;
    item.attempt ++;
    let image = new Image();
    image.src = item.src;

    image.onload = () => {
      this.setElRender(item.el, item.src, 'loaded');
      this.imageCache.push(item.src);
      this.Listeners.$remove(item);
    };
    image.onerror = () => {
      this.setElRender(item.el, item.error, 'error');
    };
  }
};
