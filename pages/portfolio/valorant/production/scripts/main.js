(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Swiper 8.4.3
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 6, 2022
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Swiper = factory());
})(this, (function () { 'use strict';

    /**
     * SSR Window 4.0.2
     * Better handling for window object in SSR environment
     * https://github.com/nolimits4web/ssr-window
     *
     * Copyright 2021, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: December 13, 2021
     */

    /* eslint-disable no-param-reassign */
    function isObject$1(obj) {
      return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
    }

    function extend$1(target, src) {
      if (target === void 0) {
        target = {};
      }

      if (src === void 0) {
        src = {};
      }

      Object.keys(src).forEach(key => {
        if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0) {
          extend$1(target[key], src[key]);
        }
      });
    }

    const ssrDocument = {
      body: {},

      addEventListener() {},

      removeEventListener() {},

      activeElement: {
        blur() {},

        nodeName: ''
      },

      querySelector() {
        return null;
      },

      querySelectorAll() {
        return [];
      },

      getElementById() {
        return null;
      },

      createEvent() {
        return {
          initEvent() {}

        };
      },

      createElement() {
        return {
          children: [],
          childNodes: [],
          style: {},

          setAttribute() {},

          getElementsByTagName() {
            return [];
          }

        };
      },

      createElementNS() {
        return {};
      },

      importNode() {
        return null;
      },

      location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: ''
      }
    };

    function getDocument() {
      const doc = typeof document !== 'undefined' ? document : {};
      extend$1(doc, ssrDocument);
      return doc;
    }

    const ssrWindow = {
      document: ssrDocument,
      navigator: {
        userAgent: ''
      },
      location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: ''
      },
      history: {
        replaceState() {},

        pushState() {},

        go() {},

        back() {}

      },
      CustomEvent: function CustomEvent() {
        return this;
      },

      addEventListener() {},

      removeEventListener() {},

      getComputedStyle() {
        return {
          getPropertyValue() {
            return '';
          }

        };
      },

      Image() {},

      Date() {},

      screen: {},

      setTimeout() {},

      clearTimeout() {},

      matchMedia() {
        return {};
      },

      requestAnimationFrame(callback) {
        if (typeof setTimeout === 'undefined') {
          callback();
          return null;
        }

        return setTimeout(callback, 0);
      },

      cancelAnimationFrame(id) {
        if (typeof setTimeout === 'undefined') {
          return;
        }

        clearTimeout(id);
      }

    };

    function getWindow() {
      const win = typeof window !== 'undefined' ? window : {};
      extend$1(win, ssrWindow);
      return win;
    }

    /**
     * Dom7 4.0.4
     * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
     * https://framework7.io/docs/dom7.html
     *
     * Copyright 2022, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: January 11, 2022
     */
    /* eslint-disable no-proto */

    function makeReactive(obj) {
      const proto = obj.__proto__;
      Object.defineProperty(obj, '__proto__', {
        get() {
          return proto;
        },

        set(value) {
          proto.__proto__ = value;
        }

      });
    }

    class Dom7 extends Array {
      constructor(items) {
        if (typeof items === 'number') {
          super(items);
        } else {
          super(...(items || []));
          makeReactive(this);
        }
      }

    }

    function arrayFlat(arr) {
      if (arr === void 0) {
        arr = [];
      }

      const res = [];
      arr.forEach(el => {
        if (Array.isArray(el)) {
          res.push(...arrayFlat(el));
        } else {
          res.push(el);
        }
      });
      return res;
    }

    function arrayFilter(arr, callback) {
      return Array.prototype.filter.call(arr, callback);
    }

    function arrayUnique(arr) {
      const uniqueArray = [];

      for (let i = 0; i < arr.length; i += 1) {
        if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
      }

      return uniqueArray;
    }


    function qsa(selector, context) {
      if (typeof selector !== 'string') {
        return [selector];
      }

      const a = [];
      const res = context.querySelectorAll(selector);

      for (let i = 0; i < res.length; i += 1) {
        a.push(res[i]);
      }

      return a;
    }

    function $(selector, context) {
      const window = getWindow();
      const document = getDocument();
      let arr = [];

      if (!context && selector instanceof Dom7) {
        return selector;
      }

      if (!selector) {
        return new Dom7(arr);
      }

      if (typeof selector === 'string') {
        const html = selector.trim();

        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          let toCreate = 'div';
          if (html.indexOf('<li') === 0) toCreate = 'ul';
          if (html.indexOf('<tr') === 0) toCreate = 'tbody';
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
          if (html.indexOf('<tbody') === 0) toCreate = 'table';
          if (html.indexOf('<option') === 0) toCreate = 'select';
          const tempParent = document.createElement(toCreate);
          tempParent.innerHTML = html;

          for (let i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          arr = qsa(selector.trim(), context || document);
        } // arr = qsa(selector, document);

      } else if (selector.nodeType || selector === window || selector === document) {
        arr.push(selector);
      } else if (Array.isArray(selector)) {
        if (selector instanceof Dom7) return selector;
        arr = selector;
      }

      return new Dom7(arrayUnique(arr));
    }

    $.fn = Dom7.prototype; // eslint-disable-next-line

    function addClass() {
      for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
      }

      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        el.classList.add(...classNames);
      });
      return this;
    }

    function removeClass() {
      for (var _len2 = arguments.length, classes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        el.classList.remove(...classNames);
      });
      return this;
    }

    function toggleClass() {
      for (var _len3 = arguments.length, classes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        classes[_key3] = arguments[_key3];
      }

      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        classNames.forEach(className => {
          el.classList.toggle(className);
        });
      });
    }

    function hasClass() {
      for (var _len4 = arguments.length, classes = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        classes[_key4] = arguments[_key4];
      }

      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      return arrayFilter(this, el => {
        return classNames.filter(className => el.classList.contains(className)).length > 0;
      }).length > 0;
    }

    function attr(attrs, value) {
      if (arguments.length === 1 && typeof attrs === 'string') {
        // Get attr
        if (this[0]) return this[0].getAttribute(attrs);
        return undefined;
      } // Set attrs


      for (let i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i].setAttribute(attrs, value);
        } else {
          // Object
          for (const attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
          }
        }
      }

      return this;
    }

    function removeAttr(attr) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].removeAttribute(attr);
      }

      return this;
    }

    function transform(transform) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].style.transform = transform;
      }

      return this;
    }

    function transition$1(duration) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
      }

      return this;
    }

    function on() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      let [eventType, targetSelector, listener, capture] = args;

      if (typeof args[1] === 'function') {
        [eventType, listener, capture] = args;
        targetSelector = undefined;
      }

      if (!capture) capture = false;

      function handleLiveEvent(e) {
        const target = e.target;
        if (!target) return;
        const eventData = e.target.dom7EventData || [];

        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }

        if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
          const parents = $(target).parents(); // eslint-disable-line

          for (let k = 0; k < parents.length; k += 1) {
            if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
          }
        }
      }

      function handleEvent(e) {
        const eventData = e && e.target ? e.target.dom7EventData || [] : [];

        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }

        listener.apply(this, eventData);
      }

      const events = eventType.split(' ');
      let j;

      for (let i = 0; i < this.length; i += 1) {
        const el = this[i];

        if (!targetSelector) {
          for (j = 0; j < events.length; j += 1) {
            const event = events[j];
            if (!el.dom7Listeners) el.dom7Listeners = {};
            if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
            el.dom7Listeners[event].push({
              listener,
              proxyListener: handleEvent
            });
            el.addEventListener(event, handleEvent, capture);
          }
        } else {
          // Live events
          for (j = 0; j < events.length; j += 1) {
            const event = events[j];
            if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
            if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
            el.dom7LiveListeners[event].push({
              listener,
              proxyListener: handleLiveEvent
            });
            el.addEventListener(event, handleLiveEvent, capture);
          }
        }
      }

      return this;
    }

    function off() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      let [eventType, targetSelector, listener, capture] = args;

      if (typeof args[1] === 'function') {
        [eventType, listener, capture] = args;
        targetSelector = undefined;
      }

      if (!capture) capture = false;
      const events = eventType.split(' ');

      for (let i = 0; i < events.length; i += 1) {
        const event = events[i];

        for (let j = 0; j < this.length; j += 1) {
          const el = this[j];
          let handlers;

          if (!targetSelector && el.dom7Listeners) {
            handlers = el.dom7Listeners[event];
          } else if (targetSelector && el.dom7LiveListeners) {
            handlers = el.dom7LiveListeners[event];
          }

          if (handlers && handlers.length) {
            for (let k = handlers.length - 1; k >= 0; k -= 1) {
              const handler = handlers[k];

              if (listener && handler.listener === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (!listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              }
            }
          }
        }
      }

      return this;
    }

    function trigger() {
      const window = getWindow();

      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      const events = args[0].split(' ');
      const eventData = args[1];

      for (let i = 0; i < events.length; i += 1) {
        const event = events[i];

        for (let j = 0; j < this.length; j += 1) {
          const el = this[j];

          if (window.CustomEvent) {
            const evt = new window.CustomEvent(event, {
              detail: eventData,
              bubbles: true,
              cancelable: true
            });
            el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
            el.dispatchEvent(evt);
            el.dom7EventData = [];
            delete el.dom7EventData;
          }
        }
      }

      return this;
    }

    function transitionEnd$1(callback) {
      const dom = this;

      function fireCallBack(e) {
        if (e.target !== this) return;
        callback.call(this, e);
        dom.off('transitionend', fireCallBack);
      }

      if (callback) {
        dom.on('transitionend', fireCallBack);
      }

      return this;
    }

    function outerWidth(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          const styles = this.styles();
          return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
        }

        return this[0].offsetWidth;
      }

      return null;
    }

    function outerHeight(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          const styles = this.styles();
          return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
        }

        return this[0].offsetHeight;
      }

      return null;
    }

    function offset() {
      if (this.length > 0) {
        const window = getWindow();
        const document = getDocument();
        const el = this[0];
        const box = el.getBoundingClientRect();
        const body = document.body;
        const clientTop = el.clientTop || body.clientTop || 0;
        const clientLeft = el.clientLeft || body.clientLeft || 0;
        const scrollTop = el === window ? window.scrollY : el.scrollTop;
        const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
        return {
          top: box.top + scrollTop - clientTop,
          left: box.left + scrollLeft - clientLeft
        };
      }

      return null;
    }

    function styles() {
      const window = getWindow();
      if (this[0]) return window.getComputedStyle(this[0], null);
      return {};
    }

    function css(props, value) {
      const window = getWindow();
      let i;

      if (arguments.length === 1) {
        if (typeof props === 'string') {
          // .css('width')
          if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
        } else {
          // .css({ width: '100px' })
          for (i = 0; i < this.length; i += 1) {
            for (const prop in props) {
              this[i].style[prop] = props[prop];
            }
          }

          return this;
        }
      }

      if (arguments.length === 2 && typeof props === 'string') {
        // .css('width', '100px')
        for (i = 0; i < this.length; i += 1) {
          this[i].style[props] = value;
        }

        return this;
      }

      return this;
    }

    function each(callback) {
      if (!callback) return this;
      this.forEach((el, index) => {
        callback.apply(el, [el, index]);
      });
      return this;
    }

    function filter(callback) {
      const result = arrayFilter(this, callback);
      return $(result);
    }

    function html(html) {
      if (typeof html === 'undefined') {
        return this[0] ? this[0].innerHTML : null;
      }

      for (let i = 0; i < this.length; i += 1) {
        this[i].innerHTML = html;
      }

      return this;
    }

    function text(text) {
      if (typeof text === 'undefined') {
        return this[0] ? this[0].textContent.trim() : null;
      }

      for (let i = 0; i < this.length; i += 1) {
        this[i].textContent = text;
      }

      return this;
    }

    function is(selector) {
      const window = getWindow();
      const document = getDocument();
      const el = this[0];
      let compareWith;
      let i;
      if (!el || typeof selector === 'undefined') return false;

      if (typeof selector === 'string') {
        if (el.matches) return el.matches(selector);
        if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
        if (el.msMatchesSelector) return el.msMatchesSelector(selector);
        compareWith = $(selector);

        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      if (selector === document) {
        return el === document;
      }

      if (selector === window) {
        return el === window;
      }

      if (selector.nodeType || selector instanceof Dom7) {
        compareWith = selector.nodeType ? [selector] : selector;

        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      return false;
    }

    function index() {
      let child = this[0];
      let i;

      if (child) {
        i = 0; // eslint-disable-next-line

        while ((child = child.previousSibling) !== null) {
          if (child.nodeType === 1) i += 1;
        }

        return i;
      }

      return undefined;
    }

    function eq(index) {
      if (typeof index === 'undefined') return this;
      const length = this.length;

      if (index > length - 1) {
        return $([]);
      }

      if (index < 0) {
        const returnIndex = length + index;
        if (returnIndex < 0) return $([]);
        return $([this[returnIndex]]);
      }

      return $([this[index]]);
    }

    function append() {
      let newChild;
      const document = getDocument();

      for (let k = 0; k < arguments.length; k += 1) {
        newChild = k < 0 || arguments.length <= k ? undefined : arguments[k];

        for (let i = 0; i < this.length; i += 1) {
          if (typeof newChild === 'string') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;

            while (tempDiv.firstChild) {
              this[i].appendChild(tempDiv.firstChild);
            }
          } else if (newChild instanceof Dom7) {
            for (let j = 0; j < newChild.length; j += 1) {
              this[i].appendChild(newChild[j]);
            }
          } else {
            this[i].appendChild(newChild);
          }
        }
      }

      return this;
    }

    function prepend(newChild) {
      const document = getDocument();
      let i;
      let j;

      for (i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;

          for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
          }
        } else if (newChild instanceof Dom7) {
          for (j = 0; j < newChild.length; j += 1) {
            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
          }
        } else {
          this[i].insertBefore(newChild, this[i].childNodes[0]);
        }
      }

      return this;
    }

    function next(selector) {
      if (this.length > 0) {
        if (selector) {
          if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
            return $([this[0].nextElementSibling]);
          }

          return $([]);
        }

        if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
        return $([]);
      }

      return $([]);
    }

    function nextAll(selector) {
      const nextEls = [];
      let el = this[0];
      if (!el) return $([]);

      while (el.nextElementSibling) {
        const next = el.nextElementSibling; // eslint-disable-line

        if (selector) {
          if ($(next).is(selector)) nextEls.push(next);
        } else nextEls.push(next);

        el = next;
      }

      return $(nextEls);
    }

    function prev(selector) {
      if (this.length > 0) {
        const el = this[0];

        if (selector) {
          if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
            return $([el.previousElementSibling]);
          }

          return $([]);
        }

        if (el.previousElementSibling) return $([el.previousElementSibling]);
        return $([]);
      }

      return $([]);
    }

    function prevAll(selector) {
      const prevEls = [];
      let el = this[0];
      if (!el) return $([]);

      while (el.previousElementSibling) {
        const prev = el.previousElementSibling; // eslint-disable-line

        if (selector) {
          if ($(prev).is(selector)) prevEls.push(prev);
        } else prevEls.push(prev);

        el = prev;
      }

      return $(prevEls);
    }

    function parent(selector) {
      const parents = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        if (this[i].parentNode !== null) {
          if (selector) {
            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
          } else {
            parents.push(this[i].parentNode);
          }
        }
      }

      return $(parents);
    }

    function parents(selector) {
      const parents = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        let parent = this[i].parentNode; // eslint-disable-line

        while (parent) {
          if (selector) {
            if ($(parent).is(selector)) parents.push(parent);
          } else {
            parents.push(parent);
          }

          parent = parent.parentNode;
        }
      }

      return $(parents);
    }

    function closest(selector) {
      let closest = this; // eslint-disable-line

      if (typeof selector === 'undefined') {
        return $([]);
      }

      if (!closest.is(selector)) {
        closest = closest.parents(selector).eq(0);
      }

      return closest;
    }

    function find(selector) {
      const foundElements = [];

      for (let i = 0; i < this.length; i += 1) {
        const found = this[i].querySelectorAll(selector);

        for (let j = 0; j < found.length; j += 1) {
          foundElements.push(found[j]);
        }
      }

      return $(foundElements);
    }

    function children(selector) {
      const children = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        const childNodes = this[i].children;

        for (let j = 0; j < childNodes.length; j += 1) {
          if (!selector || $(childNodes[j]).is(selector)) {
            children.push(childNodes[j]);
          }
        }
      }

      return $(children);
    }

    function remove() {
      for (let i = 0; i < this.length; i += 1) {
        if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }

      return this;
    }

    const Methods = {
      addClass,
      removeClass,
      hasClass,
      toggleClass,
      attr,
      removeAttr,
      transform,
      transition: transition$1,
      on,
      off,
      trigger,
      transitionEnd: transitionEnd$1,
      outerWidth,
      outerHeight,
      styles,
      offset,
      css,
      each,
      html,
      text,
      is,
      index,
      eq,
      append,
      prepend,
      next,
      nextAll,
      prev,
      prevAll,
      parent,
      parents,
      closest,
      find,
      children,
      filter,
      remove
    };
    Object.keys(Methods).forEach(methodName => {
      Object.defineProperty($.fn, methodName, {
        value: Methods[methodName],
        writable: true
      });
    });

    function deleteProps(obj) {
      const object = obj;
      Object.keys(object).forEach(key => {
        try {
          object[key] = null;
        } catch (e) {// no getter for object
        }

        try {
          delete object[key];
        } catch (e) {// something got wrong
        }
      });
    }

    function nextTick(callback, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      return setTimeout(callback, delay);
    }

    function now() {
      return Date.now();
    }

    function getComputedStyle$1(el) {
      const window = getWindow();
      let style;

      if (window.getComputedStyle) {
        style = window.getComputedStyle(el, null);
      }

      if (!style && el.currentStyle) {
        style = el.currentStyle;
      }

      if (!style) {
        style = el.style;
      }

      return style;
    }

    function getTranslate(el, axis) {
      if (axis === void 0) {
        axis = 'x';
      }

      const window = getWindow();
      let matrix;
      let curTransform;
      let transformMatrix;
      const curStyle = getComputedStyle$1(el);

      if (window.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;

        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
        } // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case


        transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
        else curTransform = parseFloat(matrix[4]);
      }

      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
        else curTransform = parseFloat(matrix[5]);
      }

      return curTransform || 0;
    }

    function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
    }

    function isNode(node) {
      // eslint-disable-next-line
      if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
        return node instanceof HTMLElement;
      }

      return node && (node.nodeType === 1 || node.nodeType === 11);
    }

    function extend() {
      const to = Object(arguments.length <= 0 ? undefined : arguments[0]);
      const noExtend = ['__proto__', 'constructor', 'prototype'];

      for (let i = 1; i < arguments.length; i += 1) {
        const nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];

        if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
          const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);

          for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            const nextKey = keysArray[nextIndex];
            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
                if (nextSource[nextKey].__swiper__) {
                  to[nextKey] = nextSource[nextKey];
                } else {
                  extend(to[nextKey], nextSource[nextKey]);
                }
              } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
                to[nextKey] = {};

                if (nextSource[nextKey].__swiper__) {
                  to[nextKey] = nextSource[nextKey];
                } else {
                  extend(to[nextKey], nextSource[nextKey]);
                }
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }

      return to;
    }

    function setCSSProperty(el, varName, varValue) {
      el.style.setProperty(varName, varValue);
    }

    function animateCSSModeScroll(_ref) {
      let {
        swiper,
        targetPosition,
        side
      } = _ref;
      const window = getWindow();
      const startPosition = -swiper.translate;
      let startTime = null;
      let time;
      const duration = swiper.params.speed;
      swiper.wrapperEl.style.scrollSnapType = 'none';
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      const dir = targetPosition > startPosition ? 'next' : 'prev';

      const isOutOfBound = (current, target) => {
        return dir === 'next' && current >= target || dir === 'prev' && current <= target;
      };

      const animate = () => {
        time = new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }

        const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
        let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

        if (isOutOfBound(currentPosition, targetPosition)) {
          currentPosition = targetPosition;
        }

        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });

        if (isOutOfBound(currentPosition, targetPosition)) {
          swiper.wrapperEl.style.overflow = 'hidden';
          swiper.wrapperEl.style.scrollSnapType = '';
          setTimeout(() => {
            swiper.wrapperEl.style.overflow = '';
            swiper.wrapperEl.scrollTo({
              [side]: currentPosition
            });
          });
          window.cancelAnimationFrame(swiper.cssModeFrameID);
          return;
        }

        swiper.cssModeFrameID = window.requestAnimationFrame(animate);
      };

      animate();
    }

    let support;

    function calcSupport() {
      const window = getWindow();
      const document = getDocument();
      return {
        smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
        touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        passiveListener: function checkPassiveListener() {
          let supportsPassive = false;

          try {
            const opts = Object.defineProperty({}, 'passive', {
              // eslint-disable-next-line
              get() {
                supportsPassive = true;
              }

            });
            window.addEventListener('testPassiveListener', null, opts);
          } catch (e) {// No support
          }

          return supportsPassive;
        }(),
        gestures: function checkGestures() {
          return 'ongesturestart' in window;
        }()
      };
    }

    function getSupport() {
      if (!support) {
        support = calcSupport();
      }

      return support;
    }

    let deviceCached;

    function calcDevice(_temp) {
      let {
        userAgent
      } = _temp === void 0 ? {} : _temp;
      const support = getSupport();
      const window = getWindow();
      const platform = window.navigator.platform;
      const ua = userAgent || window.navigator.userAgent;
      const device = {
        ios: false,
        android: false
      };
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

      let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      const windows = platform === 'Win32';
      let macos = platform === 'MacIntel'; // iPadOs 13 fix

      const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];

      if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
        ipad = ua.match(/(Version)\/([\d.]+)/);
        if (!ipad) ipad = [0, 1, '13_0_0'];
        macos = false;
      } // Android


      if (android && !windows) {
        device.os = 'android';
        device.android = true;
      }

      if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
      } // Export object


      return device;
    }

    function getDevice(overrides) {
      if (overrides === void 0) {
        overrides = {};
      }

      if (!deviceCached) {
        deviceCached = calcDevice(overrides);
      }

      return deviceCached;
    }

    let browser;

    function calcBrowser() {
      const window = getWindow();

      function isSafari() {
        const ua = window.navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
      }

      return {
        isSafari: isSafari(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
      };
    }

    function getBrowser() {
      if (!browser) {
        browser = calcBrowser();
      }

      return browser;
    }

    function Resize(_ref) {
      let {
        swiper,
        on,
        emit
      } = _ref;
      const window = getWindow();
      let observer = null;
      let animationFrame = null;

      const resizeHandler = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        emit('beforeResize');
        emit('resize');
      };

      const createObserver = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        observer = new ResizeObserver(entries => {
          animationFrame = window.requestAnimationFrame(() => {
            const {
              width,
              height
            } = swiper;
            let newWidth = width;
            let newHeight = height;
            entries.forEach(_ref2 => {
              let {
                contentBoxSize,
                contentRect,
                target
              } = _ref2;
              if (target && target !== swiper.el) return;
              newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
              newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
            });

            if (newWidth !== width || newHeight !== height) {
              resizeHandler();
            }
          });
        });
        observer.observe(swiper.el);
      };

      const removeObserver = () => {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }

        if (observer && observer.unobserve && swiper.el) {
          observer.unobserve(swiper.el);
          observer = null;
        }
      };

      const orientationChangeHandler = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        emit('orientationchange');
      };

      on('init', () => {
        if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
          createObserver();
          return;
        }

        window.addEventListener('resize', resizeHandler);
        window.addEventListener('orientationchange', orientationChangeHandler);
      });
      on('destroy', () => {
        removeObserver();
        window.removeEventListener('resize', resizeHandler);
        window.removeEventListener('orientationchange', orientationChangeHandler);
      });
    }

    function Observer(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const observers = [];
      const window = getWindow();

      const attach = function (target, options) {
        if (options === void 0) {
          options = {};
        }

        const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
        const observer = new ObserverFunc(mutations => {
          // The observerUpdate event should only be triggered
          // once despite the number of mutations.  Additional
          // triggers are redundant and are very costly
          if (mutations.length === 1) {
            emit('observerUpdate', mutations[0]);
            return;
          }

          const observerUpdate = function observerUpdate() {
            emit('observerUpdate', mutations[0]);
          };

          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(observerUpdate);
          } else {
            window.setTimeout(observerUpdate, 0);
          }
        });
        observer.observe(target, {
          attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
          childList: typeof options.childList === 'undefined' ? true : options.childList,
          characterData: typeof options.characterData === 'undefined' ? true : options.characterData
        });
        observers.push(observer);
      };

      const init = () => {
        if (!swiper.params.observer) return;

        if (swiper.params.observeParents) {
          const containerParents = swiper.$el.parents();

          for (let i = 0; i < containerParents.length; i += 1) {
            attach(containerParents[i]);
          }
        } // Observe container


        attach(swiper.$el[0], {
          childList: swiper.params.observeSlideChildren
        }); // Observe wrapper

        attach(swiper.$wrapperEl[0], {
          attributes: false
        });
      };

      const destroy = () => {
        observers.forEach(observer => {
          observer.disconnect();
        });
        observers.splice(0, observers.length);
      };

      extendParams({
        observer: false,
        observeParents: false,
        observeSlideChildren: false
      });
      on('init', init);
      on('destroy', destroy);
    }

    /* eslint-disable no-underscore-dangle */
    var eventsEmitter = {
      on(events, handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;
        const method = priority ? 'unshift' : 'push';
        events.split(' ').forEach(event => {
          if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
          self.eventsListeners[event][method](handler);
        });
        return self;
      },

      once(events, handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;

        function onceHandler() {
          self.off(events, onceHandler);

          if (onceHandler.__emitterProxy) {
            delete onceHandler.__emitterProxy;
          }

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          handler.apply(self, args);
        }

        onceHandler.__emitterProxy = handler;
        return self.on(events, onceHandler, priority);
      },

      onAny(handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;
        const method = priority ? 'unshift' : 'push';

        if (self.eventsAnyListeners.indexOf(handler) < 0) {
          self.eventsAnyListeners[method](handler);
        }

        return self;
      },

      offAny(handler) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsAnyListeners) return self;
        const index = self.eventsAnyListeners.indexOf(handler);

        if (index >= 0) {
          self.eventsAnyListeners.splice(index, 1);
        }

        return self;
      },

      off(events, handler) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsListeners) return self;
        events.split(' ').forEach(event => {
          if (typeof handler === 'undefined') {
            self.eventsListeners[event] = [];
          } else if (self.eventsListeners[event]) {
            self.eventsListeners[event].forEach((eventHandler, index) => {
              if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
                self.eventsListeners[event].splice(index, 1);
              }
            });
          }
        });
        return self;
      },

      emit() {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsListeners) return self;
        let events;
        let data;
        let context;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (typeof args[0] === 'string' || Array.isArray(args[0])) {
          events = args[0];
          data = args.slice(1, args.length);
          context = self;
        } else {
          events = args[0].events;
          data = args[0].data;
          context = args[0].context || self;
        }

        data.unshift(context);
        const eventsArray = Array.isArray(events) ? events : events.split(' ');
        eventsArray.forEach(event => {
          if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
            self.eventsAnyListeners.forEach(eventHandler => {
              eventHandler.apply(context, [event, ...data]);
            });
          }

          if (self.eventsListeners && self.eventsListeners[event]) {
            self.eventsListeners[event].forEach(eventHandler => {
              eventHandler.apply(context, data);
            });
          }
        });
        return self;
      }

    };

    function updateSize() {
      const swiper = this;
      let width;
      let height;
      const $el = swiper.$el;

      if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
        width = swiper.params.width;
      } else {
        width = $el[0].clientWidth;
      }

      if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
        height = swiper.params.height;
      } else {
        height = $el[0].clientHeight;
      }

      if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
        return;
      } // Subtract paddings


      width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);
      height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);
      if (Number.isNaN(width)) width = 0;
      if (Number.isNaN(height)) height = 0;
      Object.assign(swiper, {
        width,
        height,
        size: swiper.isHorizontal() ? width : height
      });
    }

    function updateSlides() {
      const swiper = this;

      function getDirectionLabel(property) {
        if (swiper.isHorizontal()) {
          return property;
        } // prettier-ignore


        return {
          'width': 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          'marginRight': 'marginBottom'
        }[property];
      }

      function getDirectionPropertyValue(node, label) {
        return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
      }

      const params = swiper.params;
      const {
        $wrapperEl,
        size: swiperSize,
        rtlTranslate: rtl,
        wrongRTL
      } = swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
      const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
      const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
      let snapGrid = [];
      const slidesGrid = [];
      const slidesSizesGrid = [];
      let offsetBefore = params.slidesOffsetBefore;

      if (typeof offsetBefore === 'function') {
        offsetBefore = params.slidesOffsetBefore.call(swiper);
      }

      let offsetAfter = params.slidesOffsetAfter;

      if (typeof offsetAfter === 'function') {
        offsetAfter = params.slidesOffsetAfter.call(swiper);
      }

      const previousSnapGridLength = swiper.snapGrid.length;
      const previousSlidesGridLength = swiper.slidesGrid.length;
      let spaceBetween = params.spaceBetween;
      let slidePosition = -offsetBefore;
      let prevSlideSize = 0;
      let index = 0;

      if (typeof swiperSize === 'undefined') {
        return;
      }

      if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
      }

      swiper.virtualSize = -spaceBetween; // reset margins

      if (rtl) slides.css({
        marginLeft: '',
        marginBottom: '',
        marginTop: ''
      });else slides.css({
        marginRight: '',
        marginBottom: '',
        marginTop: ''
      }); // reset cssMode offsets

      if (params.centeredSlides && params.cssMode) {
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', '');
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', '');
      }

      const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

      if (gridEnabled) {
        swiper.grid.initSlides(slidesLength);
      } // Calc slides


      let slideSize;
      const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
        return typeof params.breakpoints[key].slidesPerView !== 'undefined';
      }).length > 0;

      for (let i = 0; i < slidesLength; i += 1) {
        slideSize = 0;
        const slide = slides.eq(i);

        if (gridEnabled) {
          swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
        }

        if (slide.css('display') === 'none') continue; // eslint-disable-line

        if (params.slidesPerView === 'auto') {
          if (shouldResetSlideSize) {
            slides[i].style[getDirectionLabel('width')] = ``;
          }

          const slideStyles = getComputedStyle(slide[0]);
          const currentTransform = slide[0].style.transform;
          const currentWebKitTransform = slide[0].style.webkitTransform;

          if (currentTransform) {
            slide[0].style.transform = 'none';
          }

          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = 'none';
          }

          if (params.roundLengths) {
            slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
          } else {
            // eslint-disable-next-line
            const width = getDirectionPropertyValue(slideStyles, 'width');
            const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
            const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
            const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
            const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
            const boxSizing = slideStyles.getPropertyValue('box-sizing');

            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              const {
                clientWidth,
                offsetWidth
              } = slide[0];
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
            }
          }

          if (currentTransform) {
            slide[0].style.transform = currentTransform;
          }

          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = currentWebKitTransform;
          }

          if (params.roundLengths) slideSize = Math.floor(slideSize);
        } else {
          slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
          if (params.roundLengths) slideSize = Math.floor(slideSize);

          if (slides[i]) {
            slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
          }
        }

        if (slides[i]) {
          slides[i].swiperSlideSize = slideSize;
        }

        slidesSizesGrid.push(slideSize);

        if (params.centeredSlides) {
          slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
          if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
          if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
          if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
          if (params.roundLengths) slidePosition = Math.floor(slidePosition);
          if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
          slidesGrid.push(slidePosition);
        } else {
          if (params.roundLengths) slidePosition = Math.floor(slidePosition);
          if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
          slidesGrid.push(slidePosition);
          slidePosition = slidePosition + slideSize + spaceBetween;
        }

        swiper.virtualSize += slideSize + spaceBetween;
        prevSlideSize = slideSize;
        index += 1;
      }

      swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

      if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
        $wrapperEl.css({
          width: `${swiper.virtualSize + params.spaceBetween}px`
        });
      }

      if (params.setWrapperSize) {
        $wrapperEl.css({
          [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`
        });
      }

      if (gridEnabled) {
        swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
      } // Remove last grid elements depending on width


      if (!params.centeredSlides) {
        const newSlidesGrid = [];

        for (let i = 0; i < snapGrid.length; i += 1) {
          let slidesGridItem = snapGrid[i];
          if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

          if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
            newSlidesGrid.push(slidesGridItem);
          }
        }

        snapGrid = newSlidesGrid;

        if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
          snapGrid.push(swiper.virtualSize - swiperSize);
        }
      }

      if (snapGrid.length === 0) snapGrid = [0];

      if (params.spaceBetween !== 0) {
        const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
        slides.filter((_, slideIndex) => {
          if (!params.cssMode) return true;

          if (slideIndex === slides.length - 1) {
            return false;
          }

          return true;
        }).css({
          [key]: `${spaceBetween}px`
        });
      }

      if (params.centeredSlides && params.centeredSlidesBounds) {
        let allSlidesSize = 0;
        slidesSizesGrid.forEach(slideSizeValue => {
          allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize -= params.spaceBetween;
        const maxSnap = allSlidesSize - swiperSize;
        snapGrid = snapGrid.map(snap => {
          if (snap < 0) return -offsetBefore;
          if (snap > maxSnap) return maxSnap + offsetAfter;
          return snap;
        });
      }

      if (params.centerInsufficientSlides) {
        let allSlidesSize = 0;
        slidesSizesGrid.forEach(slideSizeValue => {
          allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize -= params.spaceBetween;

        if (allSlidesSize < swiperSize) {
          const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
          snapGrid.forEach((snap, snapIndex) => {
            snapGrid[snapIndex] = snap - allSlidesOffset;
          });
          slidesGrid.forEach((snap, snapIndex) => {
            slidesGrid[snapIndex] = snap + allSlidesOffset;
          });
        }
      }

      Object.assign(swiper, {
        slides,
        snapGrid,
        slidesGrid,
        slidesSizesGrid
      });

      if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
        const addToSnapGrid = -swiper.snapGrid[0];
        const addToSlidesGrid = -swiper.slidesGrid[0];
        swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
        swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
      }

      if (slidesLength !== previousSlidesLength) {
        swiper.emit('slidesLengthChange');
      }

      if (snapGrid.length !== previousSnapGridLength) {
        if (swiper.params.watchOverflow) swiper.checkOverflow();
        swiper.emit('snapGridLengthChange');
      }

      if (slidesGrid.length !== previousSlidesGridLength) {
        swiper.emit('slidesGridLengthChange');
      }

      if (params.watchSlidesProgress) {
        swiper.updateSlidesOffset();
      }

      if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
        const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
        const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);

        if (slidesLength <= params.maxBackfaceHiddenSlides) {
          if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
        } else if (hasClassBackfaceClassAdded) {
          swiper.$el.removeClass(backFaceHiddenClass);
        }
      }
    }

    function updateAutoHeight(speed) {
      const swiper = this;
      const activeSlides = [];
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      let newHeight = 0;
      let i;

      if (typeof speed === 'number') {
        swiper.setTransition(speed);
      } else if (speed === true) {
        swiper.setTransition(swiper.params.speed);
      }

      const getSlideByIndex = index => {
        if (isVirtual) {
          return swiper.slides.filter(el => parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index)[0];
        }

        return swiper.slides.eq(index)[0];
      }; // Find slides currently in view


      if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
        if (swiper.params.centeredSlides) {
          (swiper.visibleSlides || $([])).each(slide => {
            activeSlides.push(slide);
          });
        } else {
          for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
          }
        }
      } else {
        activeSlides.push(getSlideByIndex(swiper.activeIndex));
      } // Find new height from highest slide in view


      for (i = 0; i < activeSlides.length; i += 1) {
        if (typeof activeSlides[i] !== 'undefined') {
          const height = activeSlides[i].offsetHeight;
          newHeight = height > newHeight ? height : newHeight;
        }
      } // Update Height


      if (newHeight || newHeight === 0) swiper.$wrapperEl.css('height', `${newHeight}px`);
    }

    function updateSlidesOffset() {
      const swiper = this;
      const slides = swiper.slides;

      for (let i = 0; i < slides.length; i += 1) {
        slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
      }
    }

    function updateSlidesProgress(translate) {
      if (translate === void 0) {
        translate = this && this.translate || 0;
      }

      const swiper = this;
      const params = swiper.params;
      const {
        slides,
        rtlTranslate: rtl,
        snapGrid
      } = swiper;
      if (slides.length === 0) return;
      if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
      let offsetCenter = -translate;
      if (rtl) offsetCenter = translate; // Visible Slides

      slides.removeClass(params.slideVisibleClass);
      swiper.visibleSlidesIndexes = [];
      swiper.visibleSlides = [];

      for (let i = 0; i < slides.length; i += 1) {
        const slide = slides[i];
        let slideOffset = slide.swiperSlideOffset;

        if (params.cssMode && params.centeredSlides) {
          slideOffset -= slides[0].swiperSlideOffset;
        }

        const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
        const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
        const slideBefore = -(offsetCenter - slideOffset);
        const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }

        slide.progress = rtl ? -slideProgress : slideProgress;
        slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
      }

      swiper.visibleSlides = $(swiper.visibleSlides);
    }

    function updateProgress(translate) {
      const swiper = this;

      if (typeof translate === 'undefined') {
        const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

        translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
      }

      const params = swiper.params;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      let {
        progress,
        isBeginning,
        isEnd
      } = swiper;
      const wasBeginning = isBeginning;
      const wasEnd = isEnd;

      if (translatesDiff === 0) {
        progress = 0;
        isBeginning = true;
        isEnd = true;
      } else {
        progress = (translate - swiper.minTranslate()) / translatesDiff;
        isBeginning = progress <= 0;
        isEnd = progress >= 1;
      }

      Object.assign(swiper, {
        progress,
        isBeginning,
        isEnd
      });
      if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);

      if (isBeginning && !wasBeginning) {
        swiper.emit('reachBeginning toEdge');
      }

      if (isEnd && !wasEnd) {
        swiper.emit('reachEnd toEdge');
      }

      if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
        swiper.emit('fromEdge');
      }

      swiper.emit('progress', progress);
    }

    function updateSlidesClasses() {
      const swiper = this;
      const {
        slides,
        params,
        $wrapperEl,
        activeIndex,
        realIndex
      } = swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
      let activeSlide;

      if (isVirtual) {
        activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
      } else {
        activeSlide = slides.eq(activeIndex);
      } // Active classes


      activeSlide.addClass(params.slideActiveClass);

      if (params.loop) {
        // Duplicate to all looped slides
        if (activeSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        }
      } // Next Slide


      let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);

      if (params.loop && nextSlide.length === 0) {
        nextSlide = slides.eq(0);
        nextSlide.addClass(params.slideNextClass);
      } // Prev Slide


      let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);

      if (params.loop && prevSlide.length === 0) {
        prevSlide = slides.eq(-1);
        prevSlide.addClass(params.slidePrevClass);
      }

      if (params.loop) {
        // Duplicate to all looped slides
        if (nextSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
        }

        if (prevSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
        }
      }

      swiper.emitSlidesClasses();
    }

    function updateActiveIndex(newActiveIndex) {
      const swiper = this;
      const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      const {
        slidesGrid,
        snapGrid,
        params,
        activeIndex: previousIndex,
        realIndex: previousRealIndex,
        snapIndex: previousSnapIndex
      } = swiper;
      let activeIndex = newActiveIndex;
      let snapIndex;

      if (typeof activeIndex === 'undefined') {
        for (let i = 0; i < slidesGrid.length; i += 1) {
          if (typeof slidesGrid[i + 1] !== 'undefined') {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
              activeIndex = i;
            } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
              activeIndex = i + 1;
            }
          } else if (translate >= slidesGrid[i]) {
            activeIndex = i;
          }
        } // Normalize slideIndex


        if (params.normalizeSlideIndex) {
          if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
        }
      }

      if (snapGrid.indexOf(translate) >= 0) {
        snapIndex = snapGrid.indexOf(translate);
      } else {
        const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
        snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
      }

      if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

      if (activeIndex === previousIndex) {
        if (snapIndex !== previousSnapIndex) {
          swiper.snapIndex = snapIndex;
          swiper.emit('snapIndexChange');
        }

        return;
      } // Get real index


      const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
      Object.assign(swiper, {
        snapIndex,
        realIndex,
        previousIndex,
        activeIndex
      });
      swiper.emit('activeIndexChange');
      swiper.emit('snapIndexChange');

      if (previousRealIndex !== realIndex) {
        swiper.emit('realIndexChange');
      }

      if (swiper.initialized || swiper.params.runCallbacksOnInit) {
        swiper.emit('slideChange');
      }
    }

    function updateClickedSlide(e) {
      const swiper = this;
      const params = swiper.params;
      const slide = $(e).closest(`.${params.slideClass}`)[0];
      let slideFound = false;
      let slideIndex;

      if (slide) {
        for (let i = 0; i < swiper.slides.length; i += 1) {
          if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
          }
        }
      }

      if (slide && slideFound) {
        swiper.clickedSlide = slide;

        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
        } else {
          swiper.clickedIndex = slideIndex;
        }
      } else {
        swiper.clickedSlide = undefined;
        swiper.clickedIndex = undefined;
        return;
      }

      if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
        swiper.slideToClickedSlide();
      }
    }

    var update = {
      updateSize,
      updateSlides,
      updateAutoHeight,
      updateSlidesOffset,
      updateSlidesProgress,
      updateProgress,
      updateSlidesClasses,
      updateActiveIndex,
      updateClickedSlide
    };

    function getSwiperTranslate(axis) {
      if (axis === void 0) {
        axis = this.isHorizontal() ? 'x' : 'y';
      }

      const swiper = this;
      const {
        params,
        rtlTranslate: rtl,
        translate,
        $wrapperEl
      } = swiper;

      if (params.virtualTranslate) {
        return rtl ? -translate : translate;
      }

      if (params.cssMode) {
        return translate;
      }

      let currentTranslate = getTranslate($wrapperEl[0], axis);
      if (rtl) currentTranslate = -currentTranslate;
      return currentTranslate || 0;
    }

    function setTranslate(translate, byController) {
      const swiper = this;
      const {
        rtlTranslate: rtl,
        params,
        $wrapperEl,
        wrapperEl,
        progress
      } = swiper;
      let x = 0;
      let y = 0;
      const z = 0;

      if (swiper.isHorizontal()) {
        x = rtl ? -translate : translate;
      } else {
        y = translate;
      }

      if (params.roundLengths) {
        x = Math.floor(x);
        y = Math.floor(y);
      }

      if (params.cssMode) {
        wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
      } else if (!params.virtualTranslate) {
        $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
      }

      swiper.previousTranslate = swiper.translate;
      swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

      let newProgress;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (translate - swiper.minTranslate()) / translatesDiff;
      }

      if (newProgress !== progress) {
        swiper.updateProgress(translate);
      }

      swiper.emit('setTranslate', swiper.translate, byController);
    }

    function minTranslate() {
      return -this.snapGrid[0];
    }

    function maxTranslate() {
      return -this.snapGrid[this.snapGrid.length - 1];
    }

    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
      if (translate === void 0) {
        translate = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (translateBounds === void 0) {
        translateBounds = true;
      }

      const swiper = this;
      const {
        params,
        wrapperEl
      } = swiper;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
      }

      const minTranslate = swiper.minTranslate();
      const maxTranslate = swiper.maxTranslate();
      let newTranslate;
      if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

      swiper.updateProgress(newTranslate);

      if (params.cssMode) {
        const isH = swiper.isHorizontal();

        if (speed === 0) {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
        } else {
          if (!swiper.support.smoothScroll) {
            animateCSSModeScroll({
              swiper,
              targetPosition: -newTranslate,
              side: isH ? 'left' : 'top'
            });
            return true;
          }

          wrapperEl.scrollTo({
            [isH ? 'left' : 'top']: -newTranslate,
            behavior: 'smooth'
          });
        }

        return true;
      }

      if (speed === 0) {
        swiper.setTransition(0);
        swiper.setTranslate(newTranslate);

        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionEnd');
        }
      } else {
        swiper.setTransition(speed);
        swiper.setTranslate(newTranslate);

        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionStart');
        }

        if (!swiper.animating) {
          swiper.animating = true;

          if (!swiper.onTranslateToWrapperTransitionEnd) {
            swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
              if (!swiper || swiper.destroyed) return;
              if (e.target !== this) return;
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
              swiper.onTranslateToWrapperTransitionEnd = null;
              delete swiper.onTranslateToWrapperTransitionEnd;

              if (runCallbacks) {
                swiper.emit('transitionEnd');
              }
            };
          }

          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
        }
      }

      return true;
    }

    var translate = {
      getTranslate: getSwiperTranslate,
      setTranslate,
      minTranslate,
      maxTranslate,
      translateTo
    };

    function setTransition(duration, byController) {
      const swiper = this;

      if (!swiper.params.cssMode) {
        swiper.$wrapperEl.transition(duration);
      }

      swiper.emit('setTransition', duration, byController);
    }

    function transitionEmit(_ref) {
      let {
        swiper,
        runCallbacks,
        direction,
        step
      } = _ref;
      const {
        activeIndex,
        previousIndex
      } = swiper;
      let dir = direction;

      if (!dir) {
        if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
      }

      swiper.emit(`transition${step}`);

      if (runCallbacks && activeIndex !== previousIndex) {
        if (dir === 'reset') {
          swiper.emit(`slideResetTransition${step}`);
          return;
        }

        swiper.emit(`slideChangeTransition${step}`);

        if (dir === 'next') {
          swiper.emit(`slideNextTransition${step}`);
        } else {
          swiper.emit(`slidePrevTransition${step}`);
        }
      }
    }

    function transitionStart(runCallbacks, direction) {
      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params
      } = swiper;
      if (params.cssMode) return;

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      transitionEmit({
        swiper,
        runCallbacks,
        direction,
        step: 'Start'
      });
    }

    function transitionEnd(runCallbacks, direction) {
      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params
      } = swiper;
      swiper.animating = false;
      if (params.cssMode) return;
      swiper.setTransition(0);
      transitionEmit({
        swiper,
        runCallbacks,
        direction,
        step: 'End'
      });
    }

    var transition = {
      setTransition,
      transitionStart,
      transitionEnd
    };

    function slideTo(index, speed, runCallbacks, internal, initial) {
      if (index === void 0) {
        index = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (typeof index !== 'number' && typeof index !== 'string') {
        throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
      }

      if (typeof index === 'string') {
        /**
         * The `index` argument converted from `string` to `number`.
         * @type {number}
         */
        const indexAsNumber = parseInt(index, 10);
        /**
         * Determines whether the `index` argument is a valid `number`
         * after being converted from the `string` type.
         * @type {boolean}
         */

        const isValidNumber = isFinite(indexAsNumber);

        if (!isValidNumber) {
          throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
        } // Knowing that the converted `index` is a valid number,
        // we can update the original argument's value.


        index = indexAsNumber;
      }

      const swiper = this;
      let slideIndex = index;
      if (slideIndex < 0) slideIndex = 0;
      const {
        params,
        snapGrid,
        slidesGrid,
        previousIndex,
        activeIndex,
        rtlTranslate: rtl,
        wrapperEl,
        enabled
      } = swiper;

      if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
        return false;
      }

      const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
      let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
      if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
      const translate = -snapGrid[snapIndex]; // Normalize slideIndex

      if (params.normalizeSlideIndex) {
        for (let i = 0; i < slidesGrid.length; i += 1) {
          const normalizedTranslate = -Math.floor(translate * 100);
          const normalizedGrid = Math.floor(slidesGrid[i] * 100);
          const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

          if (typeof slidesGrid[i + 1] !== 'undefined') {
            if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
              slideIndex = i;
            } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
              slideIndex = i + 1;
            }
          } else if (normalizedTranslate >= normalizedGrid) {
            slideIndex = i;
          }
        }
      } // Directions locks


      if (swiper.initialized && slideIndex !== activeIndex) {
        if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
          return false;
        }

        if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
          if ((activeIndex || 0) !== slideIndex) return false;
        }
      }

      if (slideIndex !== (previousIndex || 0) && runCallbacks) {
        swiper.emit('beforeSlideChangeStart');
      } // Update progress


      swiper.updateProgress(translate);
      let direction;
      if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

      if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
        swiper.updateActiveIndex(slideIndex); // Update Height

        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }

        swiper.updateSlidesClasses();

        if (params.effect !== 'slide') {
          swiper.setTranslate(translate);
        }

        if (direction !== 'reset') {
          swiper.transitionStart(runCallbacks, direction);
          swiper.transitionEnd(runCallbacks, direction);
        }

        return false;
      }

      if (params.cssMode) {
        const isH = swiper.isHorizontal();
        const t = rtl ? translate : -translate;

        if (speed === 0) {
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

          if (isVirtual) {
            swiper.wrapperEl.style.scrollSnapType = 'none';
            swiper._immediateVirtual = true;
          }

          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;

          if (isVirtual) {
            requestAnimationFrame(() => {
              swiper.wrapperEl.style.scrollSnapType = '';
              swiper._swiperImmediateVirtual = false;
            });
          }
        } else {
          if (!swiper.support.smoothScroll) {
            animateCSSModeScroll({
              swiper,
              targetPosition: t,
              side: isH ? 'left' : 'top'
            });
            return true;
          }

          wrapperEl.scrollTo({
            [isH ? 'left' : 'top']: t,
            behavior: 'smooth'
          });
        }

        return true;
      }

      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);

      if (speed === 0) {
        swiper.transitionEnd(runCallbacks, direction);
      } else if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }

      return true;
    }

    function slideToLoop(index, speed, runCallbacks, internal) {
      if (index === void 0) {
        index = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (typeof index === 'string') {
        /**
         * The `index` argument converted from `string` to `number`.
         * @type {number}
         */
        const indexAsNumber = parseInt(index, 10);
        /**
         * Determines whether the `index` argument is a valid `number`
         * after being converted from the `string` type.
         * @type {boolean}
         */

        const isValidNumber = isFinite(indexAsNumber);

        if (!isValidNumber) {
          throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
        } // Knowing that the converted `index` is a valid number,
        // we can update the original argument's value.


        index = indexAsNumber;
      }

      const swiper = this;
      let newIndex = index;

      if (swiper.params.loop) {
        newIndex += swiper.loopedSlides;
      }

      return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideNext(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        animating,
        enabled,
        params
      } = swiper;
      if (!enabled) return swiper;
      let perGroup = params.slidesPerGroup;

      if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
      }

      const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;

      if (params.loop) {
        if (animating && params.loopPreventsSlide) return false;
        swiper.loopFix(); // eslint-disable-next-line

        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }

      if (params.rewind && swiper.isEnd) {
        return swiper.slideTo(0, speed, runCallbacks, internal);
      }

      return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slidePrev(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params,
        animating,
        snapGrid,
        slidesGrid,
        rtlTranslate,
        enabled
      } = swiper;
      if (!enabled) return swiper;

      if (params.loop) {
        if (animating && params.loopPreventsSlide) return false;
        swiper.loopFix(); // eslint-disable-next-line

        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }

      const translate = rtlTranslate ? swiper.translate : -swiper.translate;

      function normalize(val) {
        if (val < 0) return -Math.floor(Math.abs(val));
        return Math.floor(val);
      }

      const normalizedTranslate = normalize(translate);
      const normalizedSnapGrid = snapGrid.map(val => normalize(val));
      let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

      if (typeof prevSnap === 'undefined' && params.cssMode) {
        let prevSnapIndex;
        snapGrid.forEach((snap, snapIndex) => {
          if (normalizedTranslate >= snap) {
            // prevSnap = snap;
            prevSnapIndex = snapIndex;
          }
        });

        if (typeof prevSnapIndex !== 'undefined') {
          prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
      }

      let prevIndex = 0;

      if (typeof prevSnap !== 'undefined') {
        prevIndex = slidesGrid.indexOf(prevSnap);
        if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

        if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
          prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
          prevIndex = Math.max(prevIndex, 0);
        }
      }

      if (params.rewind && swiper.isBeginning) {
        const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
        return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
      }

      return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideReset(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideToClosest(speed, runCallbacks, internal, threshold) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (threshold === void 0) {
        threshold = 0.5;
      }

      const swiper = this;
      let index = swiper.activeIndex;
      const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
      const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
      const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      if (translate >= swiper.snapGrid[snapIndex]) {
        // The current translate is on or after the current snap index, so the choice
        // is between the current index and the one after it.
        const currentSnap = swiper.snapGrid[snapIndex];
        const nextSnap = swiper.snapGrid[snapIndex + 1];

        if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
          index += swiper.params.slidesPerGroup;
        }
      } else {
        // The current translate is before the current snap index, so the choice
        // is between the current index and the one before it.
        const prevSnap = swiper.snapGrid[snapIndex - 1];
        const currentSnap = swiper.snapGrid[snapIndex];

        if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
          index -= swiper.params.slidesPerGroup;
        }
      }

      index = Math.max(index, 0);
      index = Math.min(index, swiper.slidesGrid.length - 1);
      return swiper.slideTo(index, speed, runCallbacks, internal);
    }

    function slideToClickedSlide() {
      const swiper = this;
      const {
        params,
        $wrapperEl
      } = swiper;
      const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
      let slideToIndex = swiper.clickedIndex;
      let realIndex;

      if (params.loop) {
        if (swiper.animating) return;
        realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

        if (params.centeredSlides) {
          if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
            swiper.loopFix();
            slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
            nextTick(() => {
              swiper.slideTo(slideToIndex);
            });
          } else {
            swiper.slideTo(slideToIndex);
          }
        } else if (slideToIndex > swiper.slides.length - slidesPerView) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
          nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else {
        swiper.slideTo(slideToIndex);
      }
    }

    var slide = {
      slideTo,
      slideToLoop,
      slideNext,
      slidePrev,
      slideReset,
      slideToClosest,
      slideToClickedSlide
    };

    function loopCreate() {
      const swiper = this;
      const document = getDocument();
      const {
        params,
        $wrapperEl
      } = swiper; // Remove duplicated slides

      const $selector = $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
      $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
      let slides = $selector.children(`.${params.slideClass}`);

      if (params.loopFillGroupWithBlank) {
        const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

        if (blankSlidesNum !== params.slidesPerGroup) {
          for (let i = 0; i < blankSlidesNum; i += 1) {
            const blankNode = $(document.createElement('div')).addClass(`${params.slideClass} ${params.slideBlankClass}`);
            $selector.append(blankNode);
          }

          slides = $selector.children(`.${params.slideClass}`);
        }
      }

      if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
      swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
      swiper.loopedSlides += params.loopAdditionalSlides;

      if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) {
        swiper.loopedSlides = slides.length;
      }

      const prependSlides = [];
      const appendSlides = [];
      slides.each((el, index) => {
        const slide = $(el);
        slide.attr('data-swiper-slide-index', index);
      });

      for (let i = 0; i < swiper.loopedSlides; i += 1) {
        const index = i - Math.floor(i / slides.length) * slides.length;
        appendSlides.push(slides.eq(index)[0]);
        prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
      }

      for (let i = 0; i < appendSlides.length; i += 1) {
        $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
      }

      for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
        $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
      }
    }

    function loopFix() {
      const swiper = this;
      swiper.emit('beforeLoopFix');
      const {
        activeIndex,
        slides,
        loopedSlides,
        allowSlidePrev,
        allowSlideNext,
        snapGrid,
        rtlTranslate: rtl
      } = swiper;
      let newIndex;
      swiper.allowSlidePrev = true;
      swiper.allowSlideNext = true;
      const snapTranslate = -snapGrid[activeIndex];
      const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

      if (activeIndex < loopedSlides) {
        newIndex = slides.length - loopedSlides * 3 + activeIndex;
        newIndex += loopedSlides;
        const slideChanged = swiper.slideTo(newIndex, 0, false, true);

        if (slideChanged && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      } else if (activeIndex >= slides.length - loopedSlides) {
        // Fix For Positive Oversliding
        newIndex = -slides.length + activeIndex + loopedSlides;
        newIndex += loopedSlides;
        const slideChanged = swiper.slideTo(newIndex, 0, false, true);

        if (slideChanged && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      }

      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit('loopFix');
    }

    function loopDestroy() {
      const swiper = this;
      const {
        $wrapperEl,
        params,
        slides
      } = swiper;
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
      slides.removeAttr('data-swiper-slide-index');
    }

    var loop = {
      loopCreate,
      loopFix,
      loopDestroy
    };

    function setGrabCursor(moving) {
      const swiper = this;
      if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
      const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
      el.style.cursor = 'move';
      el.style.cursor = moving ? 'grabbing' : 'grab';
    }

    function unsetGrabCursor() {
      const swiper = this;

      if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
        return;
      }

      swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
    }

    var grabCursor = {
      setGrabCursor,
      unsetGrabCursor
    };

    function closestElement(selector, base) {
      if (base === void 0) {
        base = this;
      }

      function __closestFrom(el) {
        if (!el || el === getDocument() || el === getWindow()) return null;
        if (el.assignedSlot) el = el.assignedSlot;
        const found = el.closest(selector);

        if (!found && !el.getRootNode) {
          return null;
        }

        return found || __closestFrom(el.getRootNode().host);
      }

      return __closestFrom(base);
    }

    function onTouchStart(event) {
      const swiper = this;
      const document = getDocument();
      const window = getWindow();
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        enabled
      } = swiper;
      if (!enabled) return;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return;
      }

      if (!swiper.animating && params.cssMode && params.loop) {
        swiper.loopFix();
      }

      let e = event;
      if (e.originalEvent) e = e.originalEvent;
      let $targetEl = $(e.target);

      if (params.touchEventsTarget === 'wrapper') {
        if (!$targetEl.closest(swiper.wrapperEl).length) return;
      }

      data.isTouchEvent = e.type === 'touchstart';
      if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
      if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
      if (data.isTouched && data.isMoved) return; // change target el for shadow root component

      const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== ''; // eslint-disable-next-line

      const eventPath = event.composedPath ? event.composedPath() : event.path;

      if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
        $targetEl = $(eventPath[0]);
      }

      const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
      const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

      if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
        swiper.allowClick = true;
        return;
      }

      if (params.swipeHandler) {
        if (!$targetEl.closest(params.swipeHandler)[0]) return;
      }

      touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      const startX = touches.currentX;
      const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

      const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
      const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

      if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
        if (edgeSwipeDetection === 'prevent') {
          event.preventDefault();
        } else {
          return;
        }
      }

      Object.assign(data, {
        isTouched: true,
        isMoved: false,
        allowTouchCallbacks: true,
        isScrolling: undefined,
        startMoving: undefined
      });
      touches.startX = startX;
      touches.startY = startY;
      data.touchStartTime = now();
      swiper.allowClick = true;
      swiper.updateSize();
      swiper.swipeDirection = undefined;
      if (params.threshold > 0) data.allowThresholdMove = false;

      if (e.type !== 'touchstart') {
        let preventDefault = true;

        if ($targetEl.is(data.focusableElements)) {
          preventDefault = false;

          if ($targetEl[0].nodeName === 'SELECT') {
            data.isTouched = false;
          }
        }

        if (document.activeElement && $(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) {
          document.activeElement.blur();
        }

        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
          e.preventDefault();
        }
      }

      if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
        swiper.freeMode.onTouchStart();
      }

      swiper.emit('touchStart', e);
    }

    function onTouchMove(event) {
      const document = getDocument();
      const swiper = this;
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        rtlTranslate: rtl,
        enabled
      } = swiper;
      if (!enabled) return;
      let e = event;
      if (e.originalEvent) e = e.originalEvent;

      if (!data.isTouched) {
        if (data.startMoving && data.isScrolling) {
          swiper.emit('touchMoveOpposite', e);
        }

        return;
      }

      if (data.isTouchEvent && e.type !== 'touchmove') return;
      const targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
      const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
      const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

      if (e.preventedByNestedSwiper) {
        touches.startX = pageX;
        touches.startY = pageY;
        return;
      }

      if (!swiper.allowTouchMove) {
        if (!$(e.target).is(data.focusableElements)) {
          swiper.allowClick = false;
        }

        if (data.isTouched) {
          Object.assign(touches, {
            startX: pageX,
            startY: pageY,
            currentX: pageX,
            currentY: pageY
          });
          data.touchStartTime = now();
        }

        return;
      }

      if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
        if (swiper.isVertical()) {
          // Vertical
          if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
            data.isTouched = false;
            data.isMoved = false;
            return;
          }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
          return;
        }
      }

      if (data.isTouchEvent && document.activeElement) {
        if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
          data.isMoved = true;
          swiper.allowClick = false;
          return;
        }
      }

      if (data.allowTouchCallbacks) {
        swiper.emit('touchMove', e);
      }

      if (e.targetTouches && e.targetTouches.length > 1) return;
      touches.currentX = pageX;
      touches.currentY = pageY;
      const diffX = touches.currentX - touches.startX;
      const diffY = touches.currentY - touches.startY;
      if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;

      if (typeof data.isScrolling === 'undefined') {
        let touchAngle;

        if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
          data.isScrolling = false;
        } else {
          // eslint-disable-next-line
          if (diffX * diffX + diffY * diffY >= 25) {
            touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
            data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
          }
        }
      }

      if (data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }

      if (typeof data.startMoving === 'undefined') {
        if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
          data.startMoving = true;
        }
      }

      if (data.isScrolling) {
        data.isTouched = false;
        return;
      }

      if (!data.startMoving) {
        return;
      }

      swiper.allowClick = false;

      if (!params.cssMode && e.cancelable) {
        e.preventDefault();
      }

      if (params.touchMoveStopPropagation && !params.nested) {
        e.stopPropagation();
      }

      if (!data.isMoved) {
        if (params.loop && !params.cssMode) {
          swiper.loopFix();
        }

        data.startTranslate = swiper.getTranslate();
        swiper.setTransition(0);

        if (swiper.animating) {
          swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
        }

        data.allowMomentumBounce = false; // Grab Cursor

        if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
          swiper.setGrabCursor(true);
        }

        swiper.emit('sliderFirstMove', e);
      }

      swiper.emit('sliderMove', e);
      data.isMoved = true;
      let diff = swiper.isHorizontal() ? diffX : diffY;
      touches.diff = diff;
      diff *= params.touchRatio;
      if (rtl) diff = -diff;
      swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
      data.currentTranslate = diff + data.startTranslate;
      let disableParentSwiper = true;
      let resistanceRatio = params.resistanceRatio;

      if (params.touchReleaseOnEdges) {
        resistanceRatio = 0;
      }

      if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }

      if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
      } // Directions locks


      if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }

      if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }

      if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
        data.currentTranslate = data.startTranslate;
      } // Threshold


      if (params.threshold > 0) {
        if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
          if (!data.allowThresholdMove) {
            data.allowThresholdMove = true;
            touches.startX = touches.currentX;
            touches.startY = touches.currentY;
            data.currentTranslate = data.startTranslate;
            touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
            return;
          }
        } else {
          data.currentTranslate = data.startTranslate;
          return;
        }
      }

      if (!params.followFinger || params.cssMode) return; // Update active index in free mode

      if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
        swiper.freeMode.onTouchMove();
      } // Update progress


      swiper.updateProgress(data.currentTranslate); // Update translate

      swiper.setTranslate(data.currentTranslate);
    }

    function onTouchEnd(event) {
      const swiper = this;
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        rtlTranslate: rtl,
        slidesGrid,
        enabled
      } = swiper;
      if (!enabled) return;
      let e = event;
      if (e.originalEvent) e = e.originalEvent;

      if (data.allowTouchCallbacks) {
        swiper.emit('touchEnd', e);
      }

      data.allowTouchCallbacks = false;

      if (!data.isTouched) {
        if (data.isMoved && params.grabCursor) {
          swiper.setGrabCursor(false);
        }

        data.isMoved = false;
        data.startMoving = false;
        return;
      } // Return Grab Cursor


      if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(false);
      } // Time diff


      const touchEndTime = now();
      const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

      if (swiper.allowClick) {
        const pathTree = e.path || e.composedPath && e.composedPath();
        swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
        swiper.emit('tap click', e);

        if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
          swiper.emit('doubleTap doubleClick', e);
        }
      }

      data.lastClickTime = now();
      nextTick(() => {
        if (!swiper.destroyed) swiper.allowClick = true;
      });

      if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        return;
      }

      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      let currentPos;

      if (params.followFinger) {
        currentPos = rtl ? swiper.translate : -swiper.translate;
      } else {
        currentPos = -data.currentTranslate;
      }

      if (params.cssMode) {
        return;
      }

      if (swiper.params.freeMode && params.freeMode.enabled) {
        swiper.freeMode.onTouchEnd({
          currentPos
        });
        return;
      } // Find current slide


      let stopIndex = 0;
      let groupSize = swiper.slidesSizesGrid[0];

      for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
        const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

        if (typeof slidesGrid[i + increment] !== 'undefined') {
          if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
            stopIndex = i;
            groupSize = slidesGrid[i + increment] - slidesGrid[i];
          }
        } else if (currentPos >= slidesGrid[i]) {
          stopIndex = i;
          groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
        }
      }

      let rewindFirstIndex = null;
      let rewindLastIndex = null;

      if (params.rewind) {
        if (swiper.isBeginning) {
          rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
        } else if (swiper.isEnd) {
          rewindFirstIndex = 0;
        }
      } // Find current slide size


      const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
      const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

      if (timeDiff > params.longSwipesMs) {
        // Long touches
        if (!params.longSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }

        if (swiper.swipeDirection === 'next') {
          if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
        }

        if (swiper.swipeDirection === 'prev') {
          if (ratio > 1 - params.longSwipesRatio) {
            swiper.slideTo(stopIndex + increment);
          } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
            swiper.slideTo(rewindLastIndex);
          } else {
            swiper.slideTo(stopIndex);
          }
        }
      } else {
        // Short swipes
        if (!params.shortSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }

        const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

        if (!isNavButtonTarget) {
          if (swiper.swipeDirection === 'next') {
            swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
          }

          if (swiper.swipeDirection === 'prev') {
            swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
          }
        } else if (e.target === swiper.navigation.nextEl) {
          swiper.slideTo(stopIndex + increment);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    }

    function onResize() {
      const swiper = this;
      const {
        params,
        el
      } = swiper;
      if (el && el.offsetWidth === 0) return; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      } // Save locks


      const {
        allowSlideNext,
        allowSlidePrev,
        snapGrid
      } = swiper; // Disable locks on resize

      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateSlidesClasses();

      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }

      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.run();
      } // Return locks after resize


      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;

      if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
    }

    function onClick(e) {
      const swiper = this;
      if (!swiper.enabled) return;

      if (!swiper.allowClick) {
        if (swiper.params.preventClicks) e.preventDefault();

        if (swiper.params.preventClicksPropagation && swiper.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    }

    function onScroll() {
      const swiper = this;
      const {
        wrapperEl,
        rtlTranslate,
        enabled
      } = swiper;
      if (!enabled) return;
      swiper.previousTranslate = swiper.translate;

      if (swiper.isHorizontal()) {
        swiper.translate = -wrapperEl.scrollLeft;
      } else {
        swiper.translate = -wrapperEl.scrollTop;
      } // eslint-disable-next-line


      if (swiper.translate === 0) swiper.translate = 0;
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
      let newProgress;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
      }

      if (newProgress !== swiper.progress) {
        swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
      }

      swiper.emit('setTranslate', swiper.translate, false);
    }

    let dummyEventAttached = false;

    function dummyEventListener() {}

    const events = (swiper, method) => {
      const document = getDocument();
      const {
        params,
        touchEvents,
        el,
        wrapperEl,
        device,
        support
      } = swiper;
      const capture = !!params.nested;
      const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
      const swiperMethod = method; // Touch Events

      if (!support.touch) {
        el[domMethod](touchEvents.start, swiper.onTouchStart, false);
        document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
        document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
      } else {
        const passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
        el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
          passive: false,
          capture
        } : capture);
        el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

        if (touchEvents.cancel) {
          el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
      } // Prevent Links Clicks


      if (params.preventClicks || params.preventClicksPropagation) {
        el[domMethod]('click', swiper.onClick, true);
      }

      if (params.cssMode) {
        wrapperEl[domMethod]('scroll', swiper.onScroll);
      } // Resize handler


      if (params.updateOnWindowResize) {
        swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
      } else {
        swiper[swiperMethod]('observerUpdate', onResize, true);
      }
    };

    function attachEvents() {
      const swiper = this;
      const document = getDocument();
      const {
        params,
        support
      } = swiper;
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);

      if (params.cssMode) {
        swiper.onScroll = onScroll.bind(swiper);
      }

      swiper.onClick = onClick.bind(swiper);

      if (support.touch && !dummyEventAttached) {
        document.addEventListener('touchstart', dummyEventListener);
        dummyEventAttached = true;
      }

      events(swiper, 'on');
    }

    function detachEvents() {
      const swiper = this;
      events(swiper, 'off');
    }

    var events$1 = {
      attachEvents,
      detachEvents
    };

    const isGridEnabled = (swiper, params) => {
      return swiper.grid && params.grid && params.grid.rows > 1;
    };

    function setBreakpoint() {
      const swiper = this;
      const {
        activeIndex,
        initialized,
        loopedSlides = 0,
        params,
        $el
      } = swiper;
      const breakpoints = params.breakpoints;
      if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters

      const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
      if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
      const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
      const breakpointParams = breakpointOnlyParams || swiper.originalParams;
      const wasMultiRow = isGridEnabled(swiper, params);
      const isMultiRow = isGridEnabled(swiper, breakpointParams);
      const wasEnabled = params.enabled;

      if (wasMultiRow && !isMultiRow) {
        $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
        swiper.emitContainerClasses();
      } else if (!wasMultiRow && isMultiRow) {
        $el.addClass(`${params.containerModifierClass}grid`);

        if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
          $el.addClass(`${params.containerModifierClass}grid-column`);
        }

        swiper.emitContainerClasses();
      } // Toggle navigation, pagination, scrollbar


      ['navigation', 'pagination', 'scrollbar'].forEach(prop => {
        const wasModuleEnabled = params[prop] && params[prop].enabled;
        const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;

        if (wasModuleEnabled && !isModuleEnabled) {
          swiper[prop].disable();
        }

        if (!wasModuleEnabled && isModuleEnabled) {
          swiper[prop].enable();
        }
      });
      const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      extend(swiper.params, breakpointParams);
      const isEnabled = swiper.params.enabled;
      Object.assign(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });

      if (wasEnabled && !isEnabled) {
        swiper.disable();
      } else if (!wasEnabled && isEnabled) {
        swiper.enable();
      }

      swiper.currentBreakpoint = breakpoint;
      swiper.emit('_beforeBreakpoint', breakpointParams);

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }

    function getBreakpoint(breakpoints, base, containerEl) {
      if (base === void 0) {
        base = 'window';
      }

      if (!breakpoints || base === 'container' && !containerEl) return undefined;
      let breakpoint = false;
      const window = getWindow();
      const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
      const points = Object.keys(breakpoints).map(point => {
        if (typeof point === 'string' && point.indexOf('@') === 0) {
          const minRatio = parseFloat(point.substr(1));
          const value = currentHeight * minRatio;
          return {
            value,
            point
          };
        }

        return {
          value: point,
          point
        };
      });
      points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

      for (let i = 0; i < points.length; i += 1) {
        const {
          point,
          value
        } = points[i];

        if (base === 'window') {
          if (window.matchMedia(`(min-width: ${value}px)`).matches) {
            breakpoint = point;
          }
        } else if (value <= containerEl.clientWidth) {
          breakpoint = point;
        }
      }

      return breakpoint || 'max';
    }

    var breakpoints = {
      setBreakpoint,
      getBreakpoint
    };

    function prepareClasses(entries, prefix) {
      const resultClasses = [];
      entries.forEach(item => {
        if (typeof item === 'object') {
          Object.keys(item).forEach(classNames => {
            if (item[classNames]) {
              resultClasses.push(prefix + classNames);
            }
          });
        } else if (typeof item === 'string') {
          resultClasses.push(prefix + item);
        }
      });
      return resultClasses;
    }

    function addClasses() {
      const swiper = this;
      const {
        classNames,
        params,
        rtl,
        $el,
        device,
        support
      } = swiper; // prettier-ignore

      const suffixes = prepareClasses(['initialized', params.direction, {
        'pointer-events': !support.touch
      }, {
        'free-mode': swiper.params.freeMode && params.freeMode.enabled
      }, {
        'autoheight': params.autoHeight
      }, {
        'rtl': rtl
      }, {
        'grid': params.grid && params.grid.rows > 1
      }, {
        'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
      }, {
        'android': device.android
      }, {
        'ios': device.ios
      }, {
        'css-mode': params.cssMode
      }, {
        'centered': params.cssMode && params.centeredSlides
      }, {
        'watch-progress': params.watchSlidesProgress
      }], params.containerModifierClass);
      classNames.push(...suffixes);
      $el.addClass([...classNames].join(' '));
      swiper.emitContainerClasses();
    }

    function removeClasses() {
      const swiper = this;
      const {
        $el,
        classNames
      } = swiper;
      $el.removeClass(classNames.join(' '));
      swiper.emitContainerClasses();
    }

    var classes = {
      addClasses,
      removeClasses
    };

    function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
      const window = getWindow();
      let image;

      function onReady() {
        if (callback) callback();
      }

      const isPicture = $(imageEl).parent('picture')[0];

      if (!isPicture && (!imageEl.complete || !checkForComplete)) {
        if (src) {
          image = new window.Image();
          image.onload = onReady;
          image.onerror = onReady;

          if (sizes) {
            image.sizes = sizes;
          }

          if (srcset) {
            image.srcset = srcset;
          }

          if (src) {
            image.src = src;
          }
        } else {
          onReady();
        }
      } else {
        // image already loaded...
        onReady();
      }
    }

    function preloadImages() {
      const swiper = this;
      swiper.imagesToLoad = swiper.$el.find('img');

      function onReady() {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
        if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

        if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
          if (swiper.params.updateOnImagesReady) swiper.update();
          swiper.emit('imagesReady');
        }
      }

      for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
        const imageEl = swiper.imagesToLoad[i];
        swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
      }
    }

    var images = {
      loadImage,
      preloadImages
    };

    function checkOverflow() {
      const swiper = this;
      const {
        isLocked: wasLocked,
        params
      } = swiper;
      const {
        slidesOffsetBefore
      } = params;

      if (slidesOffsetBefore) {
        const lastSlideIndex = swiper.slides.length - 1;
        const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
        swiper.isLocked = swiper.size > lastSlideRightEdge;
      } else {
        swiper.isLocked = swiper.snapGrid.length === 1;
      }

      if (params.allowSlideNext === true) {
        swiper.allowSlideNext = !swiper.isLocked;
      }

      if (params.allowSlidePrev === true) {
        swiper.allowSlidePrev = !swiper.isLocked;
      }

      if (wasLocked && wasLocked !== swiper.isLocked) {
        swiper.isEnd = false;
      }

      if (wasLocked !== swiper.isLocked) {
        swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
      }
    }

    var checkOverflow$1 = {
      checkOverflow
    };

    var defaults = {
      init: true,
      direction: 'horizontal',
      touchEventsTarget: 'wrapper',
      initialSlide: 0,
      speed: 300,
      cssMode: false,
      updateOnWindowResize: true,
      resizeObserver: true,
      nested: false,
      createElements: false,
      enabled: true,
      focusableElements: 'input, select, option, textarea, button, video, label',
      // Overrides
      width: null,
      height: null,
      //
      preventInteractionOnTransition: false,
      // ssr
      userAgent: null,
      url: null,
      // To support iOS's swipe-to-go-back gesture (when being used in-app).
      edgeSwipeDetection: false,
      edgeSwipeThreshold: 20,
      // Autoheight
      autoHeight: false,
      // Set wrapper width
      setWrapperSize: false,
      // Virtual Translate
      virtualTranslate: false,
      // Effects
      effect: 'slide',
      // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
      // Breakpoints
      breakpoints: undefined,
      breakpointsBase: 'window',
      // Slides grid
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: false,
      centeredSlides: false,
      centeredSlidesBounds: false,
      slidesOffsetBefore: 0,
      // in px
      slidesOffsetAfter: 0,
      // in px
      normalizeSlideIndex: true,
      centerInsufficientSlides: false,
      // Disable swiper and hide navigation when container not overflow
      watchOverflow: true,
      // Round length
      roundLengths: false,
      // Touches
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      allowTouchMove: true,
      threshold: 0,
      touchMoveStopPropagation: false,
      touchStartPreventDefault: true,
      touchStartForcePreventDefault: false,
      touchReleaseOnEdges: false,
      // Unique Navigation Elements
      uniqueNavElements: true,
      // Resistance
      resistance: true,
      resistanceRatio: 0.85,
      // Progress
      watchSlidesProgress: false,
      // Cursor
      grabCursor: false,
      // Clicks
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,
      // Images
      preloadImages: true,
      updateOnImagesReady: true,
      // loop
      loop: false,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopedSlidesLimit: true,
      loopFillGroupWithBlank: false,
      loopPreventsSlide: true,
      // rewind
      rewind: false,
      // Swiping/no swiping
      allowSlidePrev: true,
      allowSlideNext: true,
      swipeHandler: null,
      // '.swipe-handler',
      noSwiping: true,
      noSwipingClass: 'swiper-no-swiping',
      noSwipingSelector: null,
      // Passive Listeners
      passiveListeners: true,
      maxBackfaceHiddenSlides: 10,
      // NS
      containerModifierClass: 'swiper-',
      // NEW
      slideClass: 'swiper-slide',
      slideBlankClass: 'swiper-slide-invisible-blank',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',
      // Callbacks
      runCallbacksOnInit: true,
      // Internals
      _emitClasses: false
    };

    function moduleExtendParams(params, allModulesParams) {
      return function extendParams(obj) {
        if (obj === void 0) {
          obj = {};
        }

        const moduleParamName = Object.keys(obj)[0];
        const moduleParams = obj[moduleParamName];

        if (typeof moduleParams !== 'object' || moduleParams === null) {
          extend(allModulesParams, obj);
          return;
        }

        if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
          params[moduleParamName] = {
            auto: true
          };
        }

        if (!(moduleParamName in params && 'enabled' in moduleParams)) {
          extend(allModulesParams, obj);
          return;
        }

        if (params[moduleParamName] === true) {
          params[moduleParamName] = {
            enabled: true
          };
        }

        if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
          params[moduleParamName].enabled = true;
        }

        if (!params[moduleParamName]) params[moduleParamName] = {
          enabled: false
        };
        extend(allModulesParams, obj);
      };
    }

    /* eslint no-param-reassign: "off" */
    const prototypes = {
      eventsEmitter,
      update,
      translate,
      transition,
      slide,
      loop,
      grabCursor,
      events: events$1,
      breakpoints,
      checkOverflow: checkOverflow$1,
      classes,
      images
    };
    const extendedDefaults = {};

    class Swiper {
      constructor() {
        let el;
        let params;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
          params = args[0];
        } else {
          [el, params] = args;
        }

        if (!params) params = {};
        params = extend({}, params);
        if (el && !params.el) params.el = el;

        if (params.el && $(params.el).length > 1) {
          const swipers = [];
          $(params.el).each(containerEl => {
            const newParams = extend({}, params, {
              el: containerEl
            });
            swipers.push(new Swiper(newParams));
          }); // eslint-disable-next-line no-constructor-return

          return swipers;
        } // Swiper Instance


        const swiper = this;
        swiper.__swiper__ = true;
        swiper.support = getSupport();
        swiper.device = getDevice({
          userAgent: params.userAgent
        });
        swiper.browser = getBrowser();
        swiper.eventsListeners = {};
        swiper.eventsAnyListeners = [];
        swiper.modules = [...swiper.__modules__];

        if (params.modules && Array.isArray(params.modules)) {
          swiper.modules.push(...params.modules);
        }

        const allModulesParams = {};
        swiper.modules.forEach(mod => {
          mod({
            swiper,
            extendParams: moduleExtendParams(params, allModulesParams),
            on: swiper.on.bind(swiper),
            once: swiper.once.bind(swiper),
            off: swiper.off.bind(swiper),
            emit: swiper.emit.bind(swiper)
          });
        }); // Extend defaults with modules params

        const swiperParams = extend({}, defaults, allModulesParams); // Extend defaults with passed params

        swiper.params = extend({}, swiperParams, extendedDefaults, params);
        swiper.originalParams = extend({}, swiper.params);
        swiper.passedParams = extend({}, params); // add event listeners

        if (swiper.params && swiper.params.on) {
          Object.keys(swiper.params.on).forEach(eventName => {
            swiper.on(eventName, swiper.params.on[eventName]);
          });
        }

        if (swiper.params && swiper.params.onAny) {
          swiper.onAny(swiper.params.onAny);
        } // Save Dom lib


        swiper.$ = $; // Extend Swiper

        Object.assign(swiper, {
          enabled: swiper.params.enabled,
          el,
          // Classes
          classNames: [],
          // Slides
          slides: $(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],

          // isDirection
          isHorizontal() {
            return swiper.params.direction === 'horizontal';
          },

          isVertical() {
            return swiper.params.direction === 'vertical';
          },

          // Indexes
          activeIndex: 0,
          realIndex: 0,
          //
          isBeginning: true,
          isEnd: false,
          // Props
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: false,
          // Locks
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev,
          // Touch Events
          touchEvents: function touchEvents() {
            const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
            const desktop = ['pointerdown', 'pointermove', 'pointerup'];
            swiper.touchEventsTouch = {
              start: touch[0],
              move: touch[1],
              end: touch[2],
              cancel: touch[3]
            };
            swiper.touchEventsDesktop = {
              start: desktop[0],
              move: desktop[1],
              end: desktop[2]
            };
            return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
          }(),
          touchEventsData: {
            isTouched: undefined,
            isMoved: undefined,
            allowTouchCallbacks: undefined,
            touchStartTime: undefined,
            isScrolling: undefined,
            currentTranslate: undefined,
            startTranslate: undefined,
            allowThresholdMove: undefined,
            // Form elements to match
            focusableElements: swiper.params.focusableElements,
            // Last click time
            lastClickTime: now(),
            clickTimeout: undefined,
            // Velocities
            velocities: [],
            allowMomentumBounce: undefined,
            isTouchEvent: undefined,
            startMoving: undefined
          },
          // Clicks
          allowClick: true,
          // Touches
          allowTouchMove: swiper.params.allowTouchMove,
          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          },
          // Images
          imagesToLoad: [],
          imagesLoaded: 0
        });
        swiper.emit('_swiper'); // Init

        if (swiper.params.init) {
          swiper.init();
        } // Return app instance
        // eslint-disable-next-line no-constructor-return


        return swiper;
      }

      enable() {
        const swiper = this;
        if (swiper.enabled) return;
        swiper.enabled = true;

        if (swiper.params.grabCursor) {
          swiper.setGrabCursor();
        }

        swiper.emit('enable');
      }

      disable() {
        const swiper = this;
        if (!swiper.enabled) return;
        swiper.enabled = false;

        if (swiper.params.grabCursor) {
          swiper.unsetGrabCursor();
        }

        swiper.emit('disable');
      }

      setProgress(progress, speed) {
        const swiper = this;
        progress = Math.min(Math.max(progress, 0), 1);
        const min = swiper.minTranslate();
        const max = swiper.maxTranslate();
        const current = (max - min) * progress + min;
        swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      emitContainerClasses() {
        const swiper = this;
        if (!swiper.params._emitClasses || !swiper.el) return;
        const cls = swiper.el.className.split(' ').filter(className => {
          return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
        });
        swiper.emit('_containerClasses', cls.join(' '));
      }

      getSlideClasses(slideEl) {
        const swiper = this;
        if (swiper.destroyed) return '';
        return slideEl.className.split(' ').filter(className => {
          return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
        }).join(' ');
      }

      emitSlidesClasses() {
        const swiper = this;
        if (!swiper.params._emitClasses || !swiper.el) return;
        const updates = [];
        swiper.slides.each(slideEl => {
          const classNames = swiper.getSlideClasses(slideEl);
          updates.push({
            slideEl,
            classNames
          });
          swiper.emit('_slideClass', slideEl, classNames);
        });
        swiper.emit('_slideClasses', updates);
      }

      slidesPerViewDynamic(view, exact) {
        if (view === void 0) {
          view = 'current';
        }

        if (exact === void 0) {
          exact = false;
        }

        const swiper = this;
        const {
          params,
          slides,
          slidesGrid,
          slidesSizesGrid,
          size: swiperSize,
          activeIndex
        } = swiper;
        let spv = 1;

        if (params.centeredSlides) {
          let slideSize = slides[activeIndex].swiperSlideSize;
          let breakLoop;

          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }

          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }
        } else {
          // eslint-disable-next-line
          if (view === 'current') {
            for (let i = activeIndex + 1; i < slides.length; i += 1) {
              const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;

              if (slideInView) {
                spv += 1;
              }
            }
          } else {
            // previous
            for (let i = activeIndex - 1; i >= 0; i -= 1) {
              const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;

              if (slideInView) {
                spv += 1;
              }
            }
          }
        }

        return spv;
      }

      update() {
        const swiper = this;
        if (!swiper || swiper.destroyed) return;
        const {
          snapGrid,
          params
        } = swiper; // Breakpoints

        if (params.breakpoints) {
          swiper.setBreakpoint();
        }

        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        function setTranslate() {
          const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
          const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
          swiper.setTranslate(newTranslate);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }

        let translated;

        if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
          setTranslate();

          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        } else {
          if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
            translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
          } else {
            translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
          }

          if (!translated) {
            setTranslate();
          }
        }

        if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
          swiper.checkOverflow();
        }

        swiper.emit('update');
      }

      changeDirection(newDirection, needUpdate) {
        if (needUpdate === void 0) {
          needUpdate = true;
        }

        const swiper = this;
        const currentDirection = swiper.params.direction;

        if (!newDirection) {
          // eslint-disable-next-line
          newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
        }

        if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
          return swiper;
        }

        swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
        swiper.emitContainerClasses();
        swiper.params.direction = newDirection;
        swiper.slides.each(slideEl => {
          if (newDirection === 'vertical') {
            slideEl.style.width = '';
          } else {
            slideEl.style.height = '';
          }
        });
        swiper.emit('changeDirection');
        if (needUpdate) swiper.update();
        return swiper;
      }

      changeLanguageDirection(direction) {
        const swiper = this;
        if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
        swiper.rtl = direction === 'rtl';
        swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;

        if (swiper.rtl) {
          swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
          swiper.el.dir = 'rtl';
        } else {
          swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
          swiper.el.dir = 'ltr';
        }

        swiper.update();
      }

      mount(el) {
        const swiper = this;
        if (swiper.mounted) return true; // Find el

        const $el = $(el || swiper.params.el);
        el = $el[0];

        if (!el) {
          return false;
        }

        el.swiper = swiper;

        const getWrapperSelector = () => {
          return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
        };

        const getWrapper = () => {
          if (el && el.shadowRoot && el.shadowRoot.querySelector) {
            const res = $(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items

            res.children = options => $el.children(options);

            return res;
          }

          if (!$el.children) {
            return $($el).children(getWrapperSelector());
          }

          return $el.children(getWrapperSelector());
        }; // Find Wrapper


        let $wrapperEl = getWrapper();

        if ($wrapperEl.length === 0 && swiper.params.createElements) {
          const document = getDocument();
          const wrapper = document.createElement('div');
          $wrapperEl = $(wrapper);
          wrapper.className = swiper.params.wrapperClass;
          $el.append(wrapper);
          $el.children(`.${swiper.params.slideClass}`).each(slideEl => {
            $wrapperEl.append(slideEl);
          });
        }

        Object.assign(swiper, {
          $el,
          el,
          $wrapperEl,
          wrapperEl: $wrapperEl[0],
          mounted: true,
          // RTL
          rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
          rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
          wrongRTL: $wrapperEl.css('display') === '-webkit-box'
        });
        return true;
      }

      init(el) {
        const swiper = this;
        if (swiper.initialized) return swiper;
        const mounted = swiper.mount(el);
        if (mounted === false) return swiper;
        swiper.emit('beforeInit'); // Set breakpoint

        if (swiper.params.breakpoints) {
          swiper.setBreakpoint();
        } // Add Classes


        swiper.addClasses(); // Create loop

        if (swiper.params.loop) {
          swiper.loopCreate();
        } // Update size


        swiper.updateSize(); // Update slides

        swiper.updateSlides();

        if (swiper.params.watchOverflow) {
          swiper.checkOverflow();
        } // Set Grab Cursor


        if (swiper.params.grabCursor && swiper.enabled) {
          swiper.setGrabCursor();
        }

        if (swiper.params.preloadImages) {
          swiper.preloadImages();
        } // Slide To Initial Slide


        if (swiper.params.loop) {
          swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
        } else {
          swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
        } // Attach events


        swiper.attachEvents(); // Init Flag

        swiper.initialized = true; // Emit

        swiper.emit('init');
        swiper.emit('afterInit');
        return swiper;
      }

      destroy(deleteInstance, cleanStyles) {
        if (deleteInstance === void 0) {
          deleteInstance = true;
        }

        if (cleanStyles === void 0) {
          cleanStyles = true;
        }

        const swiper = this;
        const {
          params,
          $el,
          $wrapperEl,
          slides
        } = swiper;

        if (typeof swiper.params === 'undefined' || swiper.destroyed) {
          return null;
        }

        swiper.emit('beforeDestroy'); // Init Flag

        swiper.initialized = false; // Detach events

        swiper.detachEvents(); // Destroy loop

        if (params.loop) {
          swiper.loopDestroy();
        } // Cleanup styles


        if (cleanStyles) {
          swiper.removeClasses();
          $el.removeAttr('style');
          $wrapperEl.removeAttr('style');

          if (slides && slides.length) {
            slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');
          }
        }

        swiper.emit('destroy'); // Detach emitter events

        Object.keys(swiper.eventsListeners).forEach(eventName => {
          swiper.off(eventName);
        });

        if (deleteInstance !== false) {
          swiper.$el[0].swiper = null;
          deleteProps(swiper);
        }

        swiper.destroyed = true;
        return null;
      }

      static extendDefaults(newDefaults) {
        extend(extendedDefaults, newDefaults);
      }

      static get extendedDefaults() {
        return extendedDefaults;
      }

      static get defaults() {
        return defaults;
      }

      static installModule(mod) {
        if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
        const modules = Swiper.prototype.__modules__;

        if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
          modules.push(mod);
        }
      }

      static use(module) {
        if (Array.isArray(module)) {
          module.forEach(m => Swiper.installModule(m));
          return Swiper;
        }

        Swiper.installModule(module);
        return Swiper;
      }

    }

    Object.keys(prototypes).forEach(prototypeGroup => {
      Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
        Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
      });
    });
    Swiper.use([Resize, Observer]);

    function Virtual(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      extendParams({
        virtual: {
          enabled: false,
          slides: [],
          cache: true,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: true,
          addSlidesBefore: 0,
          addSlidesAfter: 0
        }
      });
      let cssModeTimeout;
      swiper.virtual = {
        cache: {},
        from: undefined,
        to: undefined,
        slides: [],
        offset: 0,
        slidesGrid: []
      };

      function renderSlide(slide, index) {
        const params = swiper.params.virtual;

        if (params.cache && swiper.virtual.cache[index]) {
          return swiper.virtual.cache[index];
        }

        const $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`);
        if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
        if (params.cache) swiper.virtual.cache[index] = $slideEl;
        return $slideEl;
      }

      function update(force) {
        const {
          slidesPerView,
          slidesPerGroup,
          centeredSlides
        } = swiper.params;
        const {
          addSlidesBefore,
          addSlidesAfter
        } = swiper.params.virtual;
        const {
          from: previousFrom,
          to: previousTo,
          slides,
          slidesGrid: previousSlidesGrid,
          offset: previousOffset
        } = swiper.virtual;

        if (!swiper.params.cssMode) {
          swiper.updateActiveIndex();
        }

        const activeIndex = swiper.activeIndex || 0;
        let offsetProp;
        if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
        let slidesAfter;
        let slidesBefore;

        if (centeredSlides) {
          slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
          slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        } else {
          slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
          slidesBefore = slidesPerGroup + addSlidesBefore;
        }

        const from = Math.max((activeIndex || 0) - slidesBefore, 0);
        const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
        const offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
        Object.assign(swiper.virtual, {
          from,
          to,
          offset,
          slidesGrid: swiper.slidesGrid
        });

        function onRendered() {
          swiper.updateSlides();
          swiper.updateProgress();
          swiper.updateSlidesClasses();

          if (swiper.lazy && swiper.params.lazy.enabled) {
            swiper.lazy.load();
          }

          emit('virtualUpdate');
        }

        if (previousFrom === from && previousTo === to && !force) {
          if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
            swiper.slides.css(offsetProp, `${offset}px`);
          }

          swiper.updateProgress();
          emit('virtualUpdate');
          return;
        }

        if (swiper.params.virtual.renderExternal) {
          swiper.params.virtual.renderExternal.call(swiper, {
            offset,
            from,
            to,
            slides: function getSlides() {
              const slidesToRender = [];

              for (let i = from; i <= to; i += 1) {
                slidesToRender.push(slides[i]);
              }

              return slidesToRender;
            }()
          });

          if (swiper.params.virtual.renderExternalUpdate) {
            onRendered();
          } else {
            emit('virtualUpdate');
          }

          return;
        }

        const prependIndexes = [];
        const appendIndexes = [];

        if (force) {
          swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();
        } else {
          for (let i = previousFrom; i <= previousTo; i += 1) {
            if (i < from || i > to) {
              swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`).remove();
            }
          }
        }

        for (let i = 0; i < slides.length; i += 1) {
          if (i >= from && i <= to) {
            if (typeof previousTo === 'undefined' || force) {
              appendIndexes.push(i);
            } else {
              if (i > previousTo) appendIndexes.push(i);
              if (i < previousFrom) prependIndexes.push(i);
            }
          }
        }

        appendIndexes.forEach(index => {
          swiper.$wrapperEl.append(renderSlide(slides[index], index));
        });
        prependIndexes.sort((a, b) => b - a).forEach(index => {
          swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
        });
        swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, `${offset}px`);
        onRendered();
      }

      function appendSlide(slides) {
        if (typeof slides === 'object' && 'length' in slides) {
          for (let i = 0; i < slides.length; i += 1) {
            if (slides[i]) swiper.virtual.slides.push(slides[i]);
          }
        } else {
          swiper.virtual.slides.push(slides);
        }

        update(true);
      }

      function prependSlide(slides) {
        const activeIndex = swiper.activeIndex;
        let newActiveIndex = activeIndex + 1;
        let numberOfNewSlides = 1;

        if (Array.isArray(slides)) {
          for (let i = 0; i < slides.length; i += 1) {
            if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
          }

          newActiveIndex = activeIndex + slides.length;
          numberOfNewSlides = slides.length;
        } else {
          swiper.virtual.slides.unshift(slides);
        }

        if (swiper.params.virtual.cache) {
          const cache = swiper.virtual.cache;
          const newCache = {};
          Object.keys(cache).forEach(cachedIndex => {
            const $cachedEl = cache[cachedIndex];
            const cachedElIndex = $cachedEl.attr('data-swiper-slide-index');

            if (cachedElIndex) {
              $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
            }

            newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
          });
          swiper.virtual.cache = newCache;
        }

        update(true);
        swiper.slideTo(newActiveIndex, 0);
      }

      function removeSlide(slidesIndexes) {
        if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
        let activeIndex = swiper.activeIndex;

        if (Array.isArray(slidesIndexes)) {
          for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
            swiper.virtual.slides.splice(slidesIndexes[i], 1);

            if (swiper.params.virtual.cache) {
              delete swiper.virtual.cache[slidesIndexes[i]];
            }

            if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
            activeIndex = Math.max(activeIndex, 0);
          }
        } else {
          swiper.virtual.slides.splice(slidesIndexes, 1);

          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes];
          }

          if (slidesIndexes < activeIndex) activeIndex -= 1;
          activeIndex = Math.max(activeIndex, 0);
        }

        update(true);
        swiper.slideTo(activeIndex, 0);
      }

      function removeAllSlides() {
        swiper.virtual.slides = [];

        if (swiper.params.virtual.cache) {
          swiper.virtual.cache = {};
        }

        update(true);
        swiper.slideTo(0, 0);
      }

      on('beforeInit', () => {
        if (!swiper.params.virtual.enabled) return;
        swiper.virtual.slides = swiper.params.virtual.slides;
        swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;

        if (!swiper.params.initialSlide) {
          update();
        }
      });
      on('setTranslate', () => {
        if (!swiper.params.virtual.enabled) return;

        if (swiper.params.cssMode && !swiper._immediateVirtual) {
          clearTimeout(cssModeTimeout);
          cssModeTimeout = setTimeout(() => {
            update();
          }, 100);
        } else {
          update();
        }
      });
      on('init update resize', () => {
        if (!swiper.params.virtual.enabled) return;

        if (swiper.params.cssMode) {
          setCSSProperty(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
        }
      });
      Object.assign(swiper.virtual, {
        appendSlide,
        prependSlide,
        removeSlide,
        removeAllSlides,
        update
      });
    }

    /* eslint-disable consistent-return */
    function Keyboard(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const document = getDocument();
      const window = getWindow();
      swiper.keyboard = {
        enabled: false
      };
      extendParams({
        keyboard: {
          enabled: false,
          onlyInViewport: true,
          pageUpDown: true
        }
      });

      function handle(event) {
        if (!swiper.enabled) return;
        const {
          rtlTranslate: rtl
        } = swiper;
        let e = event;
        if (e.originalEvent) e = e.originalEvent; // jquery fix

        const kc = e.keyCode || e.charCode;
        const pageUpDown = swiper.params.keyboard.pageUpDown;
        const isPageUp = pageUpDown && kc === 33;
        const isPageDown = pageUpDown && kc === 34;
        const isArrowLeft = kc === 37;
        const isArrowRight = kc === 39;
        const isArrowUp = kc === 38;
        const isArrowDown = kc === 40; // Directions locks

        if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
          return false;
        }

        if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
          return false;
        }

        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
          return undefined;
        }

        if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
          return undefined;
        }

        if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
          let inView = false; // Check that swiper should be inside of visible area of window

          if (swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 && swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0) {
            return undefined;
          }

          const $el = swiper.$el;
          const swiperWidth = $el[0].clientWidth;
          const swiperHeight = $el[0].clientHeight;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const swiperOffset = swiper.$el.offset();
          if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
          const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];

          for (let i = 0; i < swiperCoord.length; i += 1) {
            const point = swiperCoord[i];

            if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
              if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

              inView = true;
            }
          }

          if (!inView) return undefined;
        }

        if (swiper.isHorizontal()) {
          if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
            if (e.preventDefault) e.preventDefault();else e.returnValue = false;
          }

          if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
          if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
        } else {
          if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
            if (e.preventDefault) e.preventDefault();else e.returnValue = false;
          }

          if (isPageDown || isArrowDown) swiper.slideNext();
          if (isPageUp || isArrowUp) swiper.slidePrev();
        }

        emit('keyPress', kc);
        return undefined;
      }

      function enable() {
        if (swiper.keyboard.enabled) return;
        $(document).on('keydown', handle);
        swiper.keyboard.enabled = true;
      }

      function disable() {
        if (!swiper.keyboard.enabled) return;
        $(document).off('keydown', handle);
        swiper.keyboard.enabled = false;
      }

      on('init', () => {
        if (swiper.params.keyboard.enabled) {
          enable();
        }
      });
      on('destroy', () => {
        if (swiper.keyboard.enabled) {
          disable();
        }
      });
      Object.assign(swiper.keyboard, {
        enable,
        disable
      });
    }

    /* eslint-disable consistent-return */
    function Mousewheel(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const window = getWindow();
      extendParams({
        mousewheel: {
          enabled: false,
          releaseOnEdges: false,
          invert: false,
          forceToAxis: false,
          sensitivity: 1,
          eventsTarget: 'container',
          thresholdDelta: null,
          thresholdTime: null
        }
      });
      swiper.mousewheel = {
        enabled: false
      };
      let timeout;
      let lastScrollTime = now();
      let lastEventBeforeSnap;
      const recentWheelEvents = [];

      function normalize(e) {
        // Reasonable defaults
        const PIXEL_STEP = 10;
        const LINE_HEIGHT = 40;
        const PAGE_HEIGHT = 800;
        let sX = 0;
        let sY = 0; // spinX, spinY

        let pX = 0;
        let pY = 0; // pixelX, pixelY
        // Legacy

        if ('detail' in e) {
          sY = e.detail;
        }

        if ('wheelDelta' in e) {
          sY = -e.wheelDelta / 120;
        }

        if ('wheelDeltaY' in e) {
          sY = -e.wheelDeltaY / 120;
        }

        if ('wheelDeltaX' in e) {
          sX = -e.wheelDeltaX / 120;
        } // side scrolling on FF with DOMMouseScroll


        if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
          sX = sY;
          sY = 0;
        }

        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;

        if ('deltaY' in e) {
          pY = e.deltaY;
        }

        if ('deltaX' in e) {
          pX = e.deltaX;
        }

        if (e.shiftKey && !pX) {
          // if user scrolls with shift he wants horizontal scroll
          pX = pY;
          pY = 0;
        }

        if ((pX || pY) && e.deltaMode) {
          if (e.deltaMode === 1) {
            // delta in LINE units
            pX *= LINE_HEIGHT;
            pY *= LINE_HEIGHT;
          } else {
            // delta in PAGE units
            pX *= PAGE_HEIGHT;
            pY *= PAGE_HEIGHT;
          }
        } // Fall-back if spin cannot be determined


        if (pX && !sX) {
          sX = pX < 1 ? -1 : 1;
        }

        if (pY && !sY) {
          sY = pY < 1 ? -1 : 1;
        }

        return {
          spinX: sX,
          spinY: sY,
          pixelX: pX,
          pixelY: pY
        };
      }

      function handleMouseEnter() {
        if (!swiper.enabled) return;
        swiper.mouseEntered = true;
      }

      function handleMouseLeave() {
        if (!swiper.enabled) return;
        swiper.mouseEntered = false;
      }

      function animateSlider(newEvent) {
        if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
          // Prevent if delta of wheel scroll delta is below configured threshold
          return false;
        }

        if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
          // Prevent if time between scrolls is below configured threshold
          return false;
        } // If the movement is NOT big enough and
        // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
        //   Don't go any further (avoid insignificant scroll movement).


        if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
          // Return false as a default
          return true;
        } // If user is scrolling towards the end:
        //   If the slider hasn't hit the latest slide or
        //   if the slider is a loop and
        //   if the slider isn't moving right now:
        //     Go to next slide and
        //     emit a scroll event.
        // Else (the user is scrolling towards the beginning) and
        // if the slider hasn't hit the first slide or
        // if the slider is a loop and
        // if the slider isn't moving right now:
        //   Go to prev slide and
        //   emit a scroll event.


        if (newEvent.direction < 0) {
          if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
            swiper.slideNext();
            emit('scroll', newEvent.raw);
          }
        } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
          swiper.slidePrev();
          emit('scroll', newEvent.raw);
        } // If you got here is because an animation has been triggered so store the current time


        lastScrollTime = new window.Date().getTime(); // Return false as a default

        return false;
      }

      function releaseScroll(newEvent) {
        const params = swiper.params.mousewheel;

        if (newEvent.direction < 0) {
          if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
            // Return true to animate scroll on edges
            return true;
          }
        } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }

        return false;
      }

      function handle(event) {
        let e = event;
        let disableParentSwiper = true;
        if (!swiper.enabled) return;
        const params = swiper.params.mousewheel;

        if (swiper.params.cssMode) {
          e.preventDefault();
        }

        let target = swiper.$el;

        if (swiper.params.mousewheel.eventsTarget !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarget);
        }

        if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;
        if (e.originalEvent) e = e.originalEvent; // jquery fix

        let delta = 0;
        const rtlFactor = swiper.rtlTranslate ? -1 : 1;
        const data = normalize(e);

        if (params.forceToAxis) {
          if (swiper.isHorizontal()) {
            if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
          } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
        } else {
          delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
        }

        if (delta === 0) return true;
        if (params.invert) delta = -delta; // Get the scroll positions

        let positions = swiper.getTranslate() + delta * params.sensitivity;
        if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
        if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate(); // When loop is true:
        //     the disableParentSwiper will be true.
        // When loop is false:
        //     if the scroll positions is not on edge,
        //     then the disableParentSwiper will be true.
        //     if the scroll on edge positions,
        //     then the disableParentSwiper will be false.

        disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
        if (disableParentSwiper && swiper.params.nested) e.stopPropagation();

        if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
          // Register the new event in a variable which stores the relevant data
          const newEvent = {
            time: now(),
            delta: Math.abs(delta),
            direction: Math.sign(delta),
            raw: event
          }; // Keep the most recent events

          if (recentWheelEvents.length >= 2) {
            recentWheelEvents.shift(); // only store the last N events
          }

          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
          //   If direction has changed or
          //   if the scroll is quicker than the previous one:
          //     Animate the slider.
          // Else (this is the first time the wheel is moved):
          //     Animate the slider.

          if (prevEvent) {
            if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
              animateSlider(newEvent);
            }
          } else {
            animateSlider(newEvent);
          } // If it's time to release the scroll:
          //   Return now so you don't hit the preventDefault.


          if (releaseScroll(newEvent)) {
            return true;
          }
        } else {
          // Freemode or scrollContainer:
          // If we recently snapped after a momentum scroll, then ignore wheel events
          // to give time for the deceleration to finish. Stop ignoring after 500 msecs
          // or if it's a new scroll (larger delta or inverse sign as last event before
          // an end-of-momentum snap).
          const newEvent = {
            time: now(),
            delta: Math.abs(delta),
            direction: Math.sign(delta)
          };
          const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;

          if (!ignoreWheelEvents) {
            lastEventBeforeSnap = undefined;

            if (swiper.params.loop) {
              swiper.loopFix();
            }

            let position = swiper.getTranslate() + delta * params.sensitivity;
            const wasBeginning = swiper.isBeginning;
            const wasEnd = swiper.isEnd;
            if (position >= swiper.minTranslate()) position = swiper.minTranslate();
            if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
            swiper.setTransition(0);
            swiper.setTranslate(position);
            swiper.updateProgress();
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();

            if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
              swiper.updateSlidesClasses();
            }

            if (swiper.params.freeMode.sticky) {
              // When wheel scrolling starts with sticky (aka snap) enabled, then detect
              // the end of a momentum scroll by storing recent (N=15?) wheel events.
              // 1. do all N events have decreasing or same (absolute value) delta?
              // 2. did all N events arrive in the last M (M=500?) msecs?
              // 3. does the earliest event have an (absolute value) delta that's
              //    at least P (P=1?) larger than the most recent event's delta?
              // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
              // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
              // Snap immediately and ignore remaining wheel events in this scroll.
              // See comment above for "remaining wheel events in this scroll" determination.
              // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
              clearTimeout(timeout);
              timeout = undefined;

              if (recentWheelEvents.length >= 15) {
                recentWheelEvents.shift(); // only store the last N events
              }

              const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
              const firstEvent = recentWheelEvents[0];
              recentWheelEvents.push(newEvent);

              if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
                // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
                recentWheelEvents.splice(0);
              } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
                // We're at the end of the deceleration of a momentum scroll, so there's no need
                // to wait for more events. Snap ASAP on the next tick.
                // Also, because there's some remaining momentum we'll bias the snap in the
                // direction of the ongoing scroll because it's better UX for the scroll to snap
                // in the same direction as the scroll instead of reversing to snap.  Therefore,
                // if it's already scrolled more than 20% in the current direction, keep going.
                const snapToThreshold = delta > 0 ? 0.8 : 0.2;
                lastEventBeforeSnap = newEvent;
                recentWheelEvents.splice(0);
                timeout = nextTick(() => {
                  swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                }, 0); // no delay; move on next tick
              }

              if (!timeout) {
                // if we get here, then we haven't detected the end of a momentum scroll, so
                // we'll consider a scroll "complete" when there haven't been any wheel events
                // for 500ms.
                timeout = nextTick(() => {
                  const snapToThreshold = 0.5;
                  lastEventBeforeSnap = newEvent;
                  recentWheelEvents.splice(0);
                  swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                }, 500);
              }
            } // Emit event


            if (!ignoreWheelEvents) emit('scroll', e); // Stop autoplay

            if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions

            if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
          }
        }

        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        return false;
      }

      function events(method) {
        let target = swiper.$el;

        if (swiper.params.mousewheel.eventsTarget !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarget);
        }

        target[method]('mouseenter', handleMouseEnter);
        target[method]('mouseleave', handleMouseLeave);
        target[method]('wheel', handle);
      }

      function enable() {
        if (swiper.params.cssMode) {
          swiper.wrapperEl.removeEventListener('wheel', handle);
          return true;
        }

        if (swiper.mousewheel.enabled) return false;
        events('on');
        swiper.mousewheel.enabled = true;
        return true;
      }

      function disable() {
        if (swiper.params.cssMode) {
          swiper.wrapperEl.addEventListener(event, handle);
          return true;
        }

        if (!swiper.mousewheel.enabled) return false;
        events('off');
        swiper.mousewheel.enabled = false;
        return true;
      }

      on('init', () => {
        if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
          disable();
        }

        if (swiper.params.mousewheel.enabled) enable();
      });
      on('destroy', () => {
        if (swiper.params.cssMode) {
          enable();
        }

        if (swiper.mousewheel.enabled) disable();
      });
      Object.assign(swiper.mousewheel, {
        enable,
        disable
      });
    }

    function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
      const document = getDocument();

      if (swiper.params.createElements) {
        Object.keys(checkProps).forEach(key => {
          if (!params[key] && params.auto === true) {
            let element = swiper.$el.children(`.${checkProps[key]}`)[0];

            if (!element) {
              element = document.createElement('div');
              element.className = checkProps[key];
              swiper.$el.append(element);
            }

            params[key] = element;
            originalParams[key] = element;
          }
        });
      }

      return params;
    }

    function Navigation(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      extendParams({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: false,
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
          lockClass: 'swiper-button-lock',
          navigationDisabledClass: 'swiper-navigation-disabled'
        }
      });
      swiper.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null
      };

      function getEl(el) {
        let $el;

        if (el) {
          $el = $(el);

          if (swiper.params.uniqueNavElements && typeof el === 'string' && $el.length > 1 && swiper.$el.find(el).length === 1) {
            $el = swiper.$el.find(el);
          }
        }

        return $el;
      }

      function toggleEl($el, disabled) {
        const params = swiper.params.navigation;

        if ($el && $el.length > 0) {
          $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);
          if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;

          if (swiper.params.watchOverflow && swiper.enabled) {
            $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
          }
        }
      }

      function update() {
        // Update Navigation Buttons
        if (swiper.params.loop) return;
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;
        toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
        toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
      }

      function onPrevClick(e) {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
        swiper.slidePrev();
        emit('navigationPrev');
      }

      function onNextClick(e) {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
        swiper.slideNext();
        emit('navigationNext');
      }

      function init() {
        const params = swiper.params.navigation;
        swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
          nextEl: 'swiper-button-next',
          prevEl: 'swiper-button-prev'
        });
        if (!(params.nextEl || params.prevEl)) return;
        const $nextEl = getEl(params.nextEl);
        const $prevEl = getEl(params.prevEl);

        if ($nextEl && $nextEl.length > 0) {
          $nextEl.on('click', onNextClick);
        }

        if ($prevEl && $prevEl.length > 0) {
          $prevEl.on('click', onPrevClick);
        }

        Object.assign(swiper.navigation, {
          $nextEl,
          nextEl: $nextEl && $nextEl[0],
          $prevEl,
          prevEl: $prevEl && $prevEl[0]
        });

        if (!swiper.enabled) {
          if ($nextEl) $nextEl.addClass(params.lockClass);
          if ($prevEl) $prevEl.addClass(params.lockClass);
        }
      }

      function destroy() {
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;

        if ($nextEl && $nextEl.length) {
          $nextEl.off('click', onNextClick);
          $nextEl.removeClass(swiper.params.navigation.disabledClass);
        }

        if ($prevEl && $prevEl.length) {
          $prevEl.off('click', onPrevClick);
          $prevEl.removeClass(swiper.params.navigation.disabledClass);
        }
      }

      on('init', () => {
        if (swiper.params.navigation.enabled === false) {
          // eslint-disable-next-line
          disable();
        } else {
          init();
          update();
        }
      });
      on('toEdge fromEdge lock unlock', () => {
        update();
      });
      on('destroy', () => {
        destroy();
      });
      on('enable disable', () => {
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;

        if ($nextEl) {
          $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
        }

        if ($prevEl) {
          $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
        }
      });
      on('click', (_s, e) => {
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;
        const targetEl = e.target;

        if (swiper.params.navigation.hideOnClick && !$(targetEl).is($prevEl) && !$(targetEl).is($nextEl)) {
          if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
          let isHidden;

          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }

          if (isHidden === true) {
            emit('navigationShow');
          } else {
            emit('navigationHide');
          }

          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }

          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      });

      const enable = () => {
        swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
        init();
        update();
      };

      const disable = () => {
        swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
        destroy();
      };

      Object.assign(swiper.navigation, {
        enable,
        disable,
        update,
        init,
        destroy
      });
    }

    function classesToSelector(classes) {
      if (classes === void 0) {
        classes = '';
      }

      return `.${classes.trim().replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.')}`;
    }

    function Pagination(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const pfx = 'swiper-pagination';
      extendParams({
        pagination: {
          el: null,
          bulletElement: 'span',
          clickable: false,
          hideOnClick: false,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: false,
          type: 'bullets',
          // 'bullets' or 'progressbar' or 'fraction' or 'custom'
          dynamicBullets: false,
          dynamicMainBullets: 1,
          formatFractionCurrent: number => number,
          formatFractionTotal: number => number,
          bulletClass: `${pfx}-bullet`,
          bulletActiveClass: `${pfx}-bullet-active`,
          modifierClass: `${pfx}-`,
          currentClass: `${pfx}-current`,
          totalClass: `${pfx}-total`,
          hiddenClass: `${pfx}-hidden`,
          progressbarFillClass: `${pfx}-progressbar-fill`,
          progressbarOppositeClass: `${pfx}-progressbar-opposite`,
          clickableClass: `${pfx}-clickable`,
          lockClass: `${pfx}-lock`,
          horizontalClass: `${pfx}-horizontal`,
          verticalClass: `${pfx}-vertical`,
          paginationDisabledClass: `${pfx}-disabled`
        }
      });
      swiper.pagination = {
        el: null,
        $el: null,
        bullets: []
      };
      let bulletSize;
      let dynamicBulletIndex = 0;

      function isPaginationDisabled() {
        return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0;
      }

      function setSideBullets($bulletEl, position) {
        const {
          bulletActiveClass
        } = swiper.params.pagination;
        $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
      }

      function update() {
        // Render || Update Pagination bullets/items
        const rtl = swiper.rtl;
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        const $el = swiper.pagination.$el; // Current/Total

        let current;
        const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

        if (swiper.params.loop) {
          current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

          if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
            current -= slidesLength - swiper.loopedSlides * 2;
          }

          if (current > total - 1) current -= total;
          if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
        } else if (typeof swiper.snapIndex !== 'undefined') {
          current = swiper.snapIndex;
        } else {
          current = swiper.activeIndex || 0;
        } // Types


        if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
          const bullets = swiper.pagination.bullets;
          let firstIndex;
          let lastIndex;
          let midIndex;

          if (params.dynamicBullets) {
            bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
            $el.css(swiper.isHorizontal() ? 'width' : 'height', `${bulletSize * (params.dynamicMainBullets + 4)}px`);

            if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
              dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);

              if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
                dynamicBulletIndex = params.dynamicMainBullets - 1;
              } else if (dynamicBulletIndex < 0) {
                dynamicBulletIndex = 0;
              }
            }

            firstIndex = Math.max(current - dynamicBulletIndex, 0);
            lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
            midIndex = (lastIndex + firstIndex) / 2;
          }

          bullets.removeClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`).join(' '));

          if ($el.length > 1) {
            bullets.each(bullet => {
              const $bullet = $(bullet);
              const bulletIndex = $bullet.index();

              if (bulletIndex === current) {
                $bullet.addClass(params.bulletActiveClass);
              }

              if (params.dynamicBullets) {
                if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                  $bullet.addClass(`${params.bulletActiveClass}-main`);
                }

                if (bulletIndex === firstIndex) {
                  setSideBullets($bullet, 'prev');
                }

                if (bulletIndex === lastIndex) {
                  setSideBullets($bullet, 'next');
                }
              }
            });
          } else {
            const $bullet = bullets.eq(current);
            const bulletIndex = $bullet.index();
            $bullet.addClass(params.bulletActiveClass);

            if (params.dynamicBullets) {
              const $firstDisplayedBullet = bullets.eq(firstIndex);
              const $lastDisplayedBullet = bullets.eq(lastIndex);

              for (let i = firstIndex; i <= lastIndex; i += 1) {
                bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
              }

              if (swiper.params.loop) {
                if (bulletIndex >= bullets.length) {
                  for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
                    bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                  }

                  bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                } else {
                  setSideBullets($firstDisplayedBullet, 'prev');
                  setSideBullets($lastDisplayedBullet, 'next');
                }
              } else {
                setSideBullets($firstDisplayedBullet, 'prev');
                setSideBullets($lastDisplayedBullet, 'next');
              }
            }
          }

          if (params.dynamicBullets) {
            const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
            const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
            const offsetProp = rtl ? 'right' : 'left';
            bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
          }
        }

        if (params.type === 'fraction') {
          $el.find(classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
          $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
        }

        if (params.type === 'progressbar') {
          let progressbarDirection;

          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
          } else {
            progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
          }

          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;

          if (progressbarDirection === 'horizontal') {
            scaleX = scale;
          } else {
            scaleY = scale;
          }

          $el.find(classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
        }

        if (params.type === 'custom' && params.renderCustom) {
          $el.html(params.renderCustom(swiper, current + 1, total));
          emit('paginationRender', $el[0]);
        } else {
          emit('paginationUpdate', $el[0]);
        }

        if (swiper.params.watchOverflow && swiper.enabled) {
          $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
        }
      }

      function render() {
        // Render Container
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        const $el = swiper.pagination.$el;
        let paginationHTML = '';

        if (params.type === 'bullets') {
          let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

          if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {
            numberOfBullets = slidesLength;
          }

          for (let i = 0; i < numberOfBullets; i += 1) {
            if (params.renderBullet) {
              paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
            } else {
              paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
          }

          $el.html(paginationHTML);
          swiper.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
        }

        if (params.type === 'fraction') {
          if (params.renderFraction) {
            paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
          } else {
            paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
          }

          $el.html(paginationHTML);
        }

        if (params.type === 'progressbar') {
          if (params.renderProgressbar) {
            paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
          } else {
            paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
          }

          $el.html(paginationHTML);
        }

        if (params.type !== 'custom') {
          emit('paginationRender', swiper.pagination.$el[0]);
        }
      }

      function init() {
        swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
          el: 'swiper-pagination'
        });
        const params = swiper.params.pagination;
        if (!params.el) return;
        let $el = $(params.el);
        if ($el.length === 0) return;

        if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
          $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper

          if ($el.length > 1) {
            $el = $el.filter(el => {
              if ($(el).parents('.swiper')[0] !== swiper.el) return false;
              return true;
            });
          }
        }

        if (params.type === 'bullets' && params.clickable) {
          $el.addClass(params.clickableClass);
        }

        $el.addClass(params.modifierClass + params.type);
        $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

        if (params.type === 'bullets' && params.dynamicBullets) {
          $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
          dynamicBulletIndex = 0;

          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }

        if (params.type === 'progressbar' && params.progressbarOpposite) {
          $el.addClass(params.progressbarOppositeClass);
        }

        if (params.clickable) {
          $el.on('click', classesToSelector(params.bulletClass), function onClick(e) {
            e.preventDefault();
            let index = $(this).index() * swiper.params.slidesPerGroup;
            if (swiper.params.loop) index += swiper.loopedSlides;
            swiper.slideTo(index);
          });
        }

        Object.assign(swiper.pagination, {
          $el,
          el: $el[0]
        });

        if (!swiper.enabled) {
          $el.addClass(params.lockClass);
        }
      }

      function destroy() {
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const $el = swiper.pagination.$el;
        $el.removeClass(params.hiddenClass);
        $el.removeClass(params.modifierClass + params.type);
        $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);

        if (params.clickable) {
          $el.off('click', classesToSelector(params.bulletClass));
        }
      }

      on('init', () => {
        if (swiper.params.pagination.enabled === false) {
          // eslint-disable-next-line
          disable();
        } else {
          init();
          render();
          update();
        }
      });
      on('activeIndexChange', () => {
        if (swiper.params.loop) {
          update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          update();
        }
      });
      on('snapIndexChange', () => {
        if (!swiper.params.loop) {
          update();
        }
      });
      on('slidesLengthChange', () => {
        if (swiper.params.loop) {
          render();
          update();
        }
      });
      on('snapGridLengthChange', () => {
        if (!swiper.params.loop) {
          render();
          update();
        }
      });
      on('destroy', () => {
        destroy();
      });
      on('enable disable', () => {
        const {
          $el
        } = swiper.pagination;

        if ($el) {
          $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);
        }
      });
      on('lock unlock', () => {
        update();
      });
      on('click', (_s, e) => {
        const targetEl = e.target;
        const {
          $el
        } = swiper.pagination;

        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !$(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
          if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
          const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);

          if (isHidden === true) {
            emit('paginationShow');
          } else {
            emit('paginationHide');
          }

          $el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      });

      const enable = () => {
        swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);

        if (swiper.pagination.$el) {
          swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
        }

        init();
        render();
        update();
      };

      const disable = () => {
        swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);

        if (swiper.pagination.$el) {
          swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
        }

        destroy();
      };

      Object.assign(swiper.pagination, {
        enable,
        disable,
        render,
        update,
        init,
        destroy
      });
    }

    function Scrollbar(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const document = getDocument();
      let isTouched = false;
      let timeout = null;
      let dragTimeout = null;
      let dragStartPos;
      let dragSize;
      let trackSize;
      let divider;
      extendParams({
        scrollbar: {
          el: null,
          dragSize: 'auto',
          hide: false,
          draggable: false,
          snapOnRelease: true,
          lockClass: 'swiper-scrollbar-lock',
          dragClass: 'swiper-scrollbar-drag',
          scrollbarDisabledClass: 'swiper-scrollbar-disabled',
          horizontalClass: `swiper-scrollbar-horizontal`,
          verticalClass: `swiper-scrollbar-vertical`
        }
      });
      swiper.scrollbar = {
        el: null,
        dragEl: null,
        $el: null,
        $dragEl: null
      };

      function setTranslate() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        const {
          scrollbar,
          rtlTranslate: rtl,
          progress
        } = swiper;
        const {
          $dragEl,
          $el
        } = scrollbar;
        const params = swiper.params.scrollbar;
        let newSize = dragSize;
        let newPos = (trackSize - dragSize) * progress;

        if (rtl) {
          newPos = -newPos;

          if (newPos > 0) {
            newSize = dragSize - newPos;
            newPos = 0;
          } else if (-newPos + dragSize > trackSize) {
            newSize = trackSize + newPos;
          }
        } else if (newPos < 0) {
          newSize = dragSize + newPos;
          newPos = 0;
        } else if (newPos + dragSize > trackSize) {
          newSize = trackSize - newPos;
        }

        if (swiper.isHorizontal()) {
          $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
          $dragEl[0].style.width = `${newSize}px`;
        } else {
          $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
          $dragEl[0].style.height = `${newSize}px`;
        }

        if (params.hide) {
          clearTimeout(timeout);
          $el[0].style.opacity = 1;
          timeout = setTimeout(() => {
            $el[0].style.opacity = 0;
            $el.transition(400);
          }, 1000);
        }
      }

      function setTransition(duration) {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        swiper.scrollbar.$dragEl.transition(duration);
      }

      function updateSize() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        const {
          scrollbar
        } = swiper;
        const {
          $dragEl,
          $el
        } = scrollbar;
        $dragEl[0].style.width = '';
        $dragEl[0].style.height = '';
        trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
        divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));

        if (swiper.params.scrollbar.dragSize === 'auto') {
          dragSize = trackSize * divider;
        } else {
          dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
        }

        if (swiper.isHorizontal()) {
          $dragEl[0].style.width = `${dragSize}px`;
        } else {
          $dragEl[0].style.height = `${dragSize}px`;
        }

        if (divider >= 1) {
          $el[0].style.display = 'none';
        } else {
          $el[0].style.display = '';
        }

        if (swiper.params.scrollbar.hide) {
          $el[0].style.opacity = 0;
        }

        if (swiper.params.watchOverflow && swiper.enabled) {
          scrollbar.$el[swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
        }
      }

      function getPointerPosition(e) {
        if (swiper.isHorizontal()) {
          return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientX : e.clientX;
        }

        return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientY : e.clientY;
      }

      function setDragPosition(e) {
        const {
          scrollbar,
          rtlTranslate: rtl
        } = swiper;
        const {
          $el
        } = scrollbar;
        let positionRatio;
        positionRatio = (getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
        positionRatio = Math.max(Math.min(positionRatio, 1), 0);

        if (rtl) {
          positionRatio = 1 - positionRatio;
        }

        const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
        swiper.updateProgress(position);
        swiper.setTranslate(position);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      function onDragStart(e) {
        const params = swiper.params.scrollbar;
        const {
          scrollbar,
          $wrapperEl
        } = swiper;
        const {
          $el,
          $dragEl
        } = scrollbar;
        isTouched = true;
        dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
        e.preventDefault();
        e.stopPropagation();
        $wrapperEl.transition(100);
        $dragEl.transition(100);
        setDragPosition(e);
        clearTimeout(dragTimeout);
        $el.transition(0);

        if (params.hide) {
          $el.css('opacity', 1);
        }

        if (swiper.params.cssMode) {
          swiper.$wrapperEl.css('scroll-snap-type', 'none');
        }

        emit('scrollbarDragStart', e);
      }

      function onDragMove(e) {
        const {
          scrollbar,
          $wrapperEl
        } = swiper;
        const {
          $el,
          $dragEl
        } = scrollbar;
        if (!isTouched) return;
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        setDragPosition(e);
        $wrapperEl.transition(0);
        $el.transition(0);
        $dragEl.transition(0);
        emit('scrollbarDragMove', e);
      }

      function onDragEnd(e) {
        const params = swiper.params.scrollbar;
        const {
          scrollbar,
          $wrapperEl
        } = swiper;
        const {
          $el
        } = scrollbar;
        if (!isTouched) return;
        isTouched = false;

        if (swiper.params.cssMode) {
          swiper.$wrapperEl.css('scroll-snap-type', '');
          $wrapperEl.transition('');
        }

        if (params.hide) {
          clearTimeout(dragTimeout);
          dragTimeout = nextTick(() => {
            $el.css('opacity', 0);
            $el.transition(400);
          }, 1000);
        }

        emit('scrollbarDragEnd', e);

        if (params.snapOnRelease) {
          swiper.slideToClosest();
        }
      }

      function events(method) {
        const {
          scrollbar,
          touchEventsTouch,
          touchEventsDesktop,
          params,
          support
        } = swiper;
        const $el = scrollbar.$el;
        if (!$el) return;
        const target = $el[0];
        const activeListener = support.passiveListener && params.passiveListeners ? {
          passive: false,
          capture: false
        } : false;
        const passiveListener = support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        if (!target) return;
        const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';

        if (!support.touch) {
          target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);
          document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);
          document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);
        } else {
          target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);
          target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
          target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
        }
      }

      function enableDraggable() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        events('on');
      }

      function disableDraggable() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        events('off');
      }

      function init() {
        const {
          scrollbar,
          $el: $swiperEl
        } = swiper;
        swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
          el: 'swiper-scrollbar'
        });
        const params = swiper.params.scrollbar;
        if (!params.el) return;
        let $el = $(params.el);

        if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
          $el = $swiperEl.find(params.el);
        }

        $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);

        if ($dragEl.length === 0) {
          $dragEl = $(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
          $el.append($dragEl);
        }

        Object.assign(scrollbar, {
          $el,
          el: $el[0],
          $dragEl,
          dragEl: $dragEl[0]
        });

        if (params.draggable) {
          enableDraggable();
        }

        if ($el) {
          $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
        }
      }

      function destroy() {
        const params = swiper.params.scrollbar;
        const $el = swiper.scrollbar.$el;

        if ($el) {
          $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        }

        disableDraggable();
      }

      on('init', () => {
        if (swiper.params.scrollbar.enabled === false) {
          // eslint-disable-next-line
          disable();
        } else {
          init();
          updateSize();
          setTranslate();
        }
      });
      on('update resize observerUpdate lock unlock', () => {
        updateSize();
      });
      on('setTranslate', () => {
        setTranslate();
      });
      on('setTransition', (_s, duration) => {
        setTransition(duration);
      });
      on('enable disable', () => {
        const {
          $el
        } = swiper.scrollbar;

        if ($el) {
          $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
        }
      });
      on('destroy', () => {
        destroy();
      });

      const enable = () => {
        swiper.$el.removeClass(swiper.params.scrollbar.scrollbarDisabledClass);

        if (swiper.scrollbar.$el) {
          swiper.scrollbar.$el.removeClass(swiper.params.scrollbar.scrollbarDisabledClass);
        }

        init();
        updateSize();
        setTranslate();
      };

      const disable = () => {
        swiper.$el.addClass(swiper.params.scrollbar.scrollbarDisabledClass);

        if (swiper.scrollbar.$el) {
          swiper.scrollbar.$el.addClass(swiper.params.scrollbar.scrollbarDisabledClass);
        }

        destroy();
      };

      Object.assign(swiper.scrollbar, {
        enable,
        disable,
        updateSize,
        setTranslate,
        init,
        destroy
      });
    }

    function Parallax(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        parallax: {
          enabled: false
        }
      });

      const setTransform = (el, progress) => {
        const {
          rtl
        } = swiper;
        const $el = $(el);
        const rtlFactor = rtl ? -1 : 1;
        const p = $el.attr('data-swiper-parallax') || '0';
        let x = $el.attr('data-swiper-parallax-x');
        let y = $el.attr('data-swiper-parallax-y');
        const scale = $el.attr('data-swiper-parallax-scale');
        const opacity = $el.attr('data-swiper-parallax-opacity');

        if (x || y) {
          x = x || '0';
          y = y || '0';
        } else if (swiper.isHorizontal()) {
          x = p;
          y = '0';
        } else {
          y = p;
          x = '0';
        }

        if (x.indexOf('%') >= 0) {
          x = `${parseInt(x, 10) * progress * rtlFactor}%`;
        } else {
          x = `${x * progress * rtlFactor}px`;
        }

        if (y.indexOf('%') >= 0) {
          y = `${parseInt(y, 10) * progress}%`;
        } else {
          y = `${y * progress}px`;
        }

        if (typeof opacity !== 'undefined' && opacity !== null) {
          const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
          $el[0].style.opacity = currentOpacity;
        }

        if (typeof scale === 'undefined' || scale === null) {
          $el.transform(`translate3d(${x}, ${y}, 0px)`);
        } else {
          const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
          $el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);
        }
      };

      const setTranslate = () => {
        const {
          $el,
          slides,
          progress,
          snapGrid
        } = swiper;
        $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {
          setTransform(el, progress);
        });
        slides.each((slideEl, slideIndex) => {
          let slideProgress = slideEl.progress;

          if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
            slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
          }

          slideProgress = Math.min(Math.max(slideProgress, -1), 1);
          $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {
            setTransform(el, slideProgress);
          });
        });
      };

      const setTransition = function (duration) {
        if (duration === void 0) {
          duration = swiper.params.speed;
        }

        const {
          $el
        } = swiper;
        $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(parallaxEl => {
          const $parallaxEl = $(parallaxEl);
          let parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) parallaxDuration = 0;
          $parallaxEl.transition(parallaxDuration);
        });
      };

      on('beforeInit', () => {
        if (!swiper.params.parallax.enabled) return;
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      });
      on('init', () => {
        if (!swiper.params.parallax.enabled) return;
        setTranslate();
      });
      on('setTranslate', () => {
        if (!swiper.params.parallax.enabled) return;
        setTranslate();
      });
      on('setTransition', (_swiper, duration) => {
        if (!swiper.params.parallax.enabled) return;
        setTransition(duration);
      });
    }

    function Zoom(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const window = getWindow();
      extendParams({
        zoom: {
          enabled: false,
          maxRatio: 3,
          minRatio: 1,
          toggle: true,
          containerClass: 'swiper-zoom-container',
          zoomedSlideClass: 'swiper-slide-zoomed'
        }
      });
      swiper.zoom = {
        enabled: false
      };
      let currentScale = 1;
      let isScaling = false;
      let gesturesEnabled;
      let fakeGestureTouched;
      let fakeGestureMoved;
      const gesture = {
        $slideEl: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        $imageEl: undefined,
        $imageWrapEl: undefined,
        maxRatio: 3
      };
      const image = {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {}
      };
      const velocity = {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined
      };
      let scale = 1;
      Object.defineProperty(swiper.zoom, 'scale', {
        get() {
          return scale;
        },

        set(value) {
          if (scale !== value) {
            const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;
            const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;
            emit('zoomChange', value, imageEl, slideEl);
          }

          scale = value;
        }

      });

      function getDistanceBetweenTouches(e) {
        if (e.targetTouches.length < 2) return 1;
        const x1 = e.targetTouches[0].pageX;
        const y1 = e.targetTouches[0].pageY;
        const x2 = e.targetTouches[1].pageX;
        const y2 = e.targetTouches[1].pageY;
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return distance;
      } // Events


      function onGestureStart(e) {
        const support = swiper.support;
        const params = swiper.params.zoom;
        fakeGestureTouched = false;
        fakeGestureMoved = false;

        if (!support.gestures) {
          if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
            return;
          }

          fakeGestureTouched = true;
          gesture.scaleStart = getDistanceBetweenTouches(e);
        }

        if (!gesture.$slideEl || !gesture.$slideEl.length) {
          gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
          if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
          gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
          gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

          if (gesture.$imageWrapEl.length === 0) {
            gesture.$imageEl = undefined;
            return;
          }
        }

        if (gesture.$imageEl) {
          gesture.$imageEl.transition(0);
        }

        isScaling = true;
      }

      function onGestureChange(e) {
        const support = swiper.support;
        const params = swiper.params.zoom;
        const zoom = swiper.zoom;

        if (!support.gestures) {
          if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
            return;
          }

          fakeGestureMoved = true;
          gesture.scaleMove = getDistanceBetweenTouches(e);
        }

        if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
          if (e.type === 'gesturechange') onGestureStart(e);
          return;
        }

        if (support.gestures) {
          zoom.scale = e.scale * currentScale;
        } else {
          zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
        }

        if (zoom.scale > gesture.maxRatio) {
          zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
        }

        if (zoom.scale < params.minRatio) {
          zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
        }

        gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
      }

      function onGestureEnd(e) {
        const device = swiper.device;
        const support = swiper.support;
        const params = swiper.params.zoom;
        const zoom = swiper.zoom;

        if (!support.gestures) {
          if (!fakeGestureTouched || !fakeGestureMoved) {
            return;
          }

          if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !device.android) {
            return;
          }

          fakeGestureTouched = false;
          fakeGestureMoved = false;
        }

        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
        gesture.$imageEl.transition(swiper.params.speed).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
        currentScale = zoom.scale;
        isScaling = false;
        if (zoom.scale === 1) gesture.$slideEl = undefined;
      }

      function onTouchStart(e) {
        const device = swiper.device;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        if (image.isTouched) return;
        if (device.android && e.cancelable) e.preventDefault();
        image.isTouched = true;
        image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      }

      function onTouchMove(e) {
        const zoom = swiper.zoom;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        swiper.allowClick = false;
        if (!image.isTouched || !gesture.$slideEl) return;

        if (!image.isMoved) {
          image.width = gesture.$imageEl[0].offsetWidth;
          image.height = gesture.$imageEl[0].offsetHeight;
          image.startX = getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
          image.startY = getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
          gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
          gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
          gesture.$imageWrapEl.transition(0);
        } // Define if we need image drag


        const scaledWidth = image.width * zoom.scale;
        const scaledHeight = image.height * zoom.scale;
        if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
        image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
        image.maxX = -image.minX;
        image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
        image.maxY = -image.minY;
        image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (!image.isMoved && !isScaling) {
          if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
            image.isTouched = false;
            return;
          }

          if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
            image.isTouched = false;
            return;
          }
        }

        if (e.cancelable) {
          e.preventDefault();
        }

        e.stopPropagation();
        image.isMoved = true;
        image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
        image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

        if (image.currentX < image.minX) {
          image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
        }

        if (image.currentX > image.maxX) {
          image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
        }

        if (image.currentY < image.minY) {
          image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
        }

        if (image.currentY > image.maxY) {
          image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
        } // Velocity


        if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
        if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
        if (!velocity.prevTime) velocity.prevTime = Date.now();
        velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
        velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
        if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
        if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
        velocity.prevPositionX = image.touchesCurrent.x;
        velocity.prevPositionY = image.touchesCurrent.y;
        velocity.prevTime = Date.now();
        gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
      }

      function onTouchEnd() {
        const zoom = swiper.zoom;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

        if (!image.isTouched || !image.isMoved) {
          image.isTouched = false;
          image.isMoved = false;
          return;
        }

        image.isTouched = false;
        image.isMoved = false;
        let momentumDurationX = 300;
        let momentumDurationY = 300;
        const momentumDistanceX = velocity.x * momentumDurationX;
        const newPositionX = image.currentX + momentumDistanceX;
        const momentumDistanceY = velocity.y * momentumDurationY;
        const newPositionY = image.currentY + momentumDistanceY; // Fix duration

        if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
        if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
        const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        image.currentX = newPositionX;
        image.currentY = newPositionY; // Define if we need image drag

        const scaledWidth = image.width * zoom.scale;
        const scaledHeight = image.height * zoom.scale;
        image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
        image.maxX = -image.minX;
        image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
        image.maxY = -image.minY;
        image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
        image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
        gesture.$imageWrapEl.transition(momentumDuration).transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
      }

      function onTransitionEnd() {
        const zoom = swiper.zoom;

        if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
          if (gesture.$imageEl) {
            gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
          }

          if (gesture.$imageWrapEl) {
            gesture.$imageWrapEl.transform('translate3d(0,0,0)');
          }

          zoom.scale = 1;
          currentScale = 1;
          gesture.$slideEl = undefined;
          gesture.$imageEl = undefined;
          gesture.$imageWrapEl = undefined;
        }
      }

      function zoomIn(e) {
        const zoom = swiper.zoom;
        const params = swiper.params.zoom;

        if (!gesture.$slideEl) {
          if (e && e.target) {
            gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
          }

          if (!gesture.$slideEl) {
            if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
              gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
            } else {
              gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
            }
          }

          gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
          gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
        }

        if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;

        if (swiper.params.cssMode) {
          swiper.wrapperEl.style.overflow = 'hidden';
          swiper.wrapperEl.style.touchAction = 'none';
        }

        gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);
        let touchX;
        let touchY;
        let offsetX;
        let offsetY;
        let diffX;
        let diffY;
        let translateX;
        let translateY;
        let imageWidth;
        let imageHeight;
        let scaledWidth;
        let scaledHeight;
        let translateMinX;
        let translateMinY;
        let translateMaxX;
        let translateMaxY;
        let slideWidth;
        let slideHeight;

        if (typeof image.touchesStart.x === 'undefined' && e) {
          touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
          touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
        } else {
          touchX = image.touchesStart.x;
          touchY = image.touchesStart.y;
        }

        zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

        if (e) {
          slideWidth = gesture.$slideEl[0].offsetWidth;
          slideHeight = gesture.$slideEl[0].offsetHeight;
          offsetX = gesture.$slideEl.offset().left + window.scrollX;
          offsetY = gesture.$slideEl.offset().top + window.scrollY;
          diffX = offsetX + slideWidth / 2 - touchX;
          diffY = offsetY + slideHeight / 2 - touchY;
          imageWidth = gesture.$imageEl[0].offsetWidth;
          imageHeight = gesture.$imageEl[0].offsetHeight;
          scaledWidth = imageWidth * zoom.scale;
          scaledHeight = imageHeight * zoom.scale;
          translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
          translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
          translateMaxX = -translateMinX;
          translateMaxY = -translateMinY;
          translateX = diffX * zoom.scale;
          translateY = diffY * zoom.scale;

          if (translateX < translateMinX) {
            translateX = translateMinX;
          }

          if (translateX > translateMaxX) {
            translateX = translateMaxX;
          }

          if (translateY < translateMinY) {
            translateY = translateMinY;
          }

          if (translateY > translateMaxY) {
            translateY = translateMaxY;
          }
        } else {
          translateX = 0;
          translateY = 0;
        }

        gesture.$imageWrapEl.transition(300).transform(`translate3d(${translateX}px, ${translateY}px,0)`);
        gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
      }

      function zoomOut() {
        const zoom = swiper.zoom;
        const params = swiper.params.zoom;

        if (!gesture.$slideEl) {
          if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
            gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
          } else {
            gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          }

          gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
          gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
        }

        if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;

        if (swiper.params.cssMode) {
          swiper.wrapperEl.style.overflow = '';
          swiper.wrapperEl.style.touchAction = '';
        }

        zoom.scale = 1;
        currentScale = 1;
        gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
        gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
        gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
        gesture.$slideEl = undefined;
      } // Toggle Zoom


      function zoomToggle(e) {
        const zoom = swiper.zoom;

        if (zoom.scale && zoom.scale !== 1) {
          // Zoom Out
          zoomOut();
        } else {
          // Zoom In
          zoomIn(e);
        }
      }

      function getListeners() {
        const support = swiper.support;
        const passiveListener = swiper.touchEvents.start === 'touchstart' && support.passiveListener && swiper.params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        const activeListenerWithCapture = support.passiveListener ? {
          passive: false,
          capture: true
        } : true;
        return {
          passiveListener,
          activeListenerWithCapture
        };
      }

      function getSlideSelector() {
        return `.${swiper.params.slideClass}`;
      }

      function toggleGestures(method) {
        const {
          passiveListener
        } = getListeners();
        const slideSelector = getSlideSelector();
        swiper.$wrapperEl[method]('gesturestart', slideSelector, onGestureStart, passiveListener);
        swiper.$wrapperEl[method]('gesturechange', slideSelector, onGestureChange, passiveListener);
        swiper.$wrapperEl[method]('gestureend', slideSelector, onGestureEnd, passiveListener);
      }

      function enableGestures() {
        if (gesturesEnabled) return;
        gesturesEnabled = true;
        toggleGestures('on');
      }

      function disableGestures() {
        if (!gesturesEnabled) return;
        gesturesEnabled = false;
        toggleGestures('off');
      } // Attach/Detach Events


      function enable() {
        const zoom = swiper.zoom;
        if (zoom.enabled) return;
        zoom.enabled = true;
        const support = swiper.support;
        const {
          passiveListener,
          activeListenerWithCapture
        } = getListeners();
        const slideSelector = getSlideSelector(); // Scale image

        if (support.gestures) {
          swiper.$wrapperEl.on(swiper.touchEvents.start, enableGestures, passiveListener);
          swiper.$wrapperEl.on(swiper.touchEvents.end, disableGestures, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
          swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
          swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
          swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

          if (swiper.touchEvents.cancel) {
            swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
          }
        } // Move image


        swiper.$wrapperEl.on(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);
      }

      function disable() {
        const zoom = swiper.zoom;
        if (!zoom.enabled) return;
        const support = swiper.support;
        zoom.enabled = false;
        const {
          passiveListener,
          activeListenerWithCapture
        } = getListeners();
        const slideSelector = getSlideSelector(); // Scale image

        if (support.gestures) {
          swiper.$wrapperEl.off(swiper.touchEvents.start, enableGestures, passiveListener);
          swiper.$wrapperEl.off(swiper.touchEvents.end, disableGestures, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
          swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
          swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
          swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

          if (swiper.touchEvents.cancel) {
            swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
          }
        } // Move image


        swiper.$wrapperEl.off(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);
      }

      on('init', () => {
        if (swiper.params.zoom.enabled) {
          enable();
        }
      });
      on('destroy', () => {
        disable();
      });
      on('touchStart', (_s, e) => {
        if (!swiper.zoom.enabled) return;
        onTouchStart(e);
      });
      on('touchEnd', (_s, e) => {
        if (!swiper.zoom.enabled) return;
        onTouchEnd();
      });
      on('doubleTap', (_s, e) => {
        if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          zoomToggle(e);
        }
      });
      on('transitionEnd', () => {
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          onTransitionEnd();
        }
      });
      on('slideChange', () => {
        if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
          onTransitionEnd();
        }
      });
      Object.assign(swiper.zoom, {
        enable,
        disable,
        in: zoomIn,
        out: zoomOut,
        toggle: zoomToggle
      });
    }

    function Lazy(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      extendParams({
        lazy: {
          checkInView: false,
          enabled: false,
          loadPrevNext: false,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: false,
          scrollingElement: '',
          elementClass: 'swiper-lazy',
          loadingClass: 'swiper-lazy-loading',
          loadedClass: 'swiper-lazy-loaded',
          preloaderClass: 'swiper-lazy-preloader'
        }
      });
      swiper.lazy = {};
      let scrollHandlerAttached = false;
      let initialImageLoaded = false;

      function loadInSlide(index, loadInDuplicate) {
        if (loadInDuplicate === void 0) {
          loadInDuplicate = true;
        }

        const params = swiper.params.lazy;
        if (typeof index === 'undefined') return;
        if (swiper.slides.length === 0) return;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        const $slideEl = isVirtual ? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index="${index}"]`) : swiper.slides.eq(index);
        const $images = $slideEl.find(`.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`);

        if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
          $images.push($slideEl[0]);
        }

        if ($images.length === 0) return;
        $images.each(imageEl => {
          const $imageEl = $(imageEl);
          $imageEl.addClass(params.loadingClass);
          const background = $imageEl.attr('data-background');
          const src = $imageEl.attr('data-src');
          const srcset = $imageEl.attr('data-srcset');
          const sizes = $imageEl.attr('data-sizes');
          const $pictureEl = $imageEl.parent('picture');
          swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
            if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;

            if (background) {
              $imageEl.css('background-image', `url("${background}")`);
              $imageEl.removeAttr('data-background');
            } else {
              if (srcset) {
                $imageEl.attr('srcset', srcset);
                $imageEl.removeAttr('data-srcset');
              }

              if (sizes) {
                $imageEl.attr('sizes', sizes);
                $imageEl.removeAttr('data-sizes');
              }

              if ($pictureEl.length) {
                $pictureEl.children('source').each(sourceEl => {
                  const $source = $(sourceEl);

                  if ($source.attr('data-srcset')) {
                    $source.attr('srcset', $source.attr('data-srcset'));
                    $source.removeAttr('data-srcset');
                  }
                });
              }

              if (src) {
                $imageEl.attr('src', src);
                $imageEl.removeAttr('data-src');
              }
            }

            $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
            $slideEl.find(`.${params.preloaderClass}`).remove();

            if (swiper.params.loop && loadInDuplicate) {
              const slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

              if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
                const originalSlide = swiper.$wrapperEl.children(`[data-swiper-slide-index="${slideOriginalIndex}"]:not(.${swiper.params.slideDuplicateClass})`);
                loadInSlide(originalSlide.index(), false);
              } else {
                const duplicatedSlide = swiper.$wrapperEl.children(`.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${slideOriginalIndex}"]`);
                loadInSlide(duplicatedSlide.index(), false);
              }
            }

            emit('lazyImageReady', $slideEl[0], $imageEl[0]);

            if (swiper.params.autoHeight) {
              swiper.updateAutoHeight();
            }
          });
          emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
        });
      }

      function load() {
        const {
          $wrapperEl,
          params: swiperParams,
          slides,
          activeIndex
        } = swiper;
        const isVirtual = swiper.virtual && swiperParams.virtual.enabled;
        const params = swiperParams.lazy;
        let slidesPerView = swiperParams.slidesPerView;

        if (slidesPerView === 'auto') {
          slidesPerView = 0;
        }

        function slideExist(index) {
          if (isVirtual) {
            if ($wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`).length) {
              return true;
            }
          } else if (slides[index]) return true;

          return false;
        }

        function slideIndex(slideEl) {
          if (isVirtual) {
            return $(slideEl).attr('data-swiper-slide-index');
          }

          return $(slideEl).index();
        }

        if (!initialImageLoaded) initialImageLoaded = true;

        if (swiper.params.watchSlidesProgress) {
          $wrapperEl.children(`.${swiperParams.slideVisibleClass}`).each(slideEl => {
            const index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
            loadInSlide(index);
          });
        } else if (slidesPerView > 1) {
          for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
            if (slideExist(i)) loadInSlide(i);
          }
        } else {
          loadInSlide(activeIndex);
        }

        if (params.loadPrevNext) {
          if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
            const amount = params.loadPrevNextAmount;
            const spv = Math.ceil(slidesPerView);
            const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
            const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

            for (let i = activeIndex + spv; i < maxIndex; i += 1) {
              if (slideExist(i)) loadInSlide(i);
            } // Prev Slides


            for (let i = minIndex; i < activeIndex; i += 1) {
              if (slideExist(i)) loadInSlide(i);
            }
          } else {
            const nextSlide = $wrapperEl.children(`.${swiperParams.slideNextClass}`);
            if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));
            const prevSlide = $wrapperEl.children(`.${swiperParams.slidePrevClass}`);
            if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
          }
        }
      }

      function checkInViewOnLoad() {
        const window = getWindow();
        if (!swiper || swiper.destroyed) return;
        const $scrollElement = swiper.params.lazy.scrollingElement ? $(swiper.params.lazy.scrollingElement) : $(window);
        const isWindow = $scrollElement[0] === window;
        const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
        const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
        const swiperOffset = swiper.$el.offset();
        const {
          rtlTranslate: rtl
        } = swiper;
        let inView = false;
        if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
        const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];

        for (let i = 0; i < swiperCoord.length; i += 1) {
          const point = swiperCoord[i];

          if (point[0] >= 0 && point[0] <= scrollElementWidth && point[1] >= 0 && point[1] <= scrollElementHeight) {
            if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

            inView = true;
          }
        }

        const passiveListener = swiper.touchEvents.start === 'touchstart' && swiper.support.passiveListener && swiper.params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;

        if (inView) {
          load();
          $scrollElement.off('scroll', checkInViewOnLoad, passiveListener);
        } else if (!scrollHandlerAttached) {
          scrollHandlerAttached = true;
          $scrollElement.on('scroll', checkInViewOnLoad, passiveListener);
        }
      }

      on('beforeInit', () => {
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      });
      on('init', () => {
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.checkInView) {
            checkInViewOnLoad();
          } else {
            load();
          }
        }
      });
      on('scroll', () => {
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky) {
          load();
        }
      });
      on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.checkInView) {
            checkInViewOnLoad();
          } else {
            load();
          }
        }
      });
      on('transitionStart', () => {
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded) {
            if (swiper.params.lazy.checkInView) {
              checkInViewOnLoad();
            } else {
              load();
            }
          }
        }
      });
      on('transitionEnd', () => {
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          if (swiper.params.lazy.checkInView) {
            checkInViewOnLoad();
          } else {
            load();
          }
        }
      });
      on('slideChange', () => {
        const {
          lazy,
          cssMode,
          watchSlidesProgress,
          touchReleaseOnEdges,
          resistanceRatio
        } = swiper.params;

        if (lazy.enabled && (cssMode || watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0))) {
          load();
        }
      });
      on('destroy', () => {
        if (!swiper.$el) return;
        swiper.$el.find(`.${swiper.params.lazy.loadingClass}`).removeClass(swiper.params.lazy.loadingClass);
      });
      Object.assign(swiper.lazy, {
        load,
        loadInSlide
      });
    }

    /* eslint no-bitwise: ["error", { "allow": [">>"] }] */
    function Controller(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        controller: {
          control: undefined,
          inverse: false,
          by: 'slide' // or 'container'

        }
      });
      swiper.controller = {
        control: undefined
      };

      function LinearSpline(x, y) {
        const binarySearch = function search() {
          let maxIndex;
          let minIndex;
          let guess;
          return (array, val) => {
            minIndex = -1;
            maxIndex = array.length;

            while (maxIndex - minIndex > 1) {
              guess = maxIndex + minIndex >> 1;

              if (array[guess] <= val) {
                minIndex = guess;
              } else {
                maxIndex = guess;
              }
            }

            return maxIndex;
          };
        }();

        this.x = x;
        this.y = y;
        this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
        // (x1,y1) is the known point before given value,
        // (x3,y3) is the known point after given value.

        let i1;
        let i3;

        this.interpolate = function interpolate(x2) {
          if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

          i3 = binarySearch(this.x, x2);
          i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
          // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

          return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
        };

        return this;
      } // xxx: for now i will just save one spline function to to


      function getInterpolateFunction(c) {
        if (!swiper.controller.spline) {
          swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
        }
      }

      function setTranslate(_t, byController) {
        const controlled = swiper.controller.control;
        let multiplier;
        let controlledTranslate;
        const Swiper = swiper.constructor;

        function setControlledTranslate(c) {
          // this will create an Interpolate function based on the snapGrids
          // x is the Grid of the scrolled scroller and y will be the controlled scroller
          // it makes sense to create this only once and recall it for the interpolation
          // the function does a lot of value caching for performance
          const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;

          if (swiper.params.controller.by === 'slide') {
            getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
            // but it did not work out

            controlledTranslate = -swiper.controller.spline.interpolate(-translate);
          }

          if (!controlledTranslate || swiper.params.controller.by === 'container') {
            multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
            controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
          }

          if (swiper.params.controller.inverse) {
            controlledTranslate = c.maxTranslate() - controlledTranslate;
          }

          c.updateProgress(controlledTranslate);
          c.setTranslate(controlledTranslate, swiper);
          c.updateActiveIndex();
          c.updateSlidesClasses();
        }

        if (Array.isArray(controlled)) {
          for (let i = 0; i < controlled.length; i += 1) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTranslate(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTranslate(controlled);
        }
      }

      function setTransition(duration, byController) {
        const Swiper = swiper.constructor;
        const controlled = swiper.controller.control;
        let i;

        function setControlledTransition(c) {
          c.setTransition(duration, swiper);

          if (duration !== 0) {
            c.transitionStart();

            if (c.params.autoHeight) {
              nextTick(() => {
                c.updateAutoHeight();
              });
            }

            c.$wrapperEl.transitionEnd(() => {
              if (!controlled) return;

              if (c.params.loop && swiper.params.controller.by === 'slide') {
                c.loopFix();
              }

              c.transitionEnd();
            });
          }
        }

        if (Array.isArray(controlled)) {
          for (i = 0; i < controlled.length; i += 1) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTransition(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTransition(controlled);
        }
      }

      function removeSpline() {
        if (!swiper.controller.control) return;

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      }

      on('beforeInit', () => {
        swiper.controller.control = swiper.params.controller.control;
      });
      on('update', () => {
        removeSpline();
      });
      on('resize', () => {
        removeSpline();
      });
      on('observerUpdate', () => {
        removeSpline();
      });
      on('setTranslate', (_s, translate, byController) => {
        if (!swiper.controller.control) return;
        swiper.controller.setTranslate(translate, byController);
      });
      on('setTransition', (_s, duration, byController) => {
        if (!swiper.controller.control) return;
        swiper.controller.setTransition(duration, byController);
      });
      Object.assign(swiper.controller, {
        setTranslate,
        setTransition
      });
    }

    function A11y(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        a11y: {
          enabled: true,
          notificationClass: 'swiper-notification',
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}',
          slideLabelMessage: '{{index}} / {{slidesLength}}',
          containerMessage: null,
          containerRoleDescriptionMessage: null,
          itemRoleDescriptionMessage: null,
          slideRole: 'group',
          id: null
        }
      });
      swiper.a11y = {
        clicked: false
      };
      let liveRegion = null;

      function notify(message) {
        const notification = liveRegion;
        if (notification.length === 0) return;
        notification.html('');
        notification.html(message);
      }

      function getRandomNumber(size) {
        if (size === void 0) {
          size = 16;
        }

        const randomChar = () => Math.round(16 * Math.random()).toString(16);

        return 'x'.repeat(size).replace(/x/g, randomChar);
      }

      function makeElFocusable($el) {
        $el.attr('tabIndex', '0');
      }

      function makeElNotFocusable($el) {
        $el.attr('tabIndex', '-1');
      }

      function addElRole($el, role) {
        $el.attr('role', role);
      }

      function addElRoleDescription($el, description) {
        $el.attr('aria-roledescription', description);
      }

      function addElControls($el, controls) {
        $el.attr('aria-controls', controls);
      }

      function addElLabel($el, label) {
        $el.attr('aria-label', label);
      }

      function addElId($el, id) {
        $el.attr('id', id);
      }

      function addElLive($el, live) {
        $el.attr('aria-live', live);
      }

      function disableEl($el) {
        $el.attr('aria-disabled', true);
      }

      function enableEl($el) {
        $el.attr('aria-disabled', false);
      }

      function onEnterOrSpaceKey(e) {
        if (e.keyCode !== 13 && e.keyCode !== 32) return;
        const params = swiper.params.a11y;
        const $targetEl = $(e.target);

        if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
          if (!(swiper.isEnd && !swiper.params.loop)) {
            swiper.slideNext();
          }

          if (swiper.isEnd) {
            notify(params.lastSlideMessage);
          } else {
            notify(params.nextSlideMessage);
          }
        }

        if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
          if (!(swiper.isBeginning && !swiper.params.loop)) {
            swiper.slidePrev();
          }

          if (swiper.isBeginning) {
            notify(params.firstSlideMessage);
          } else {
            notify(params.prevSlideMessage);
          }
        }

        if (swiper.pagination && $targetEl.is(classesToSelector(swiper.params.pagination.bulletClass))) {
          $targetEl[0].click();
        }
      }

      function updateNavigation() {
        if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;

        if ($prevEl && $prevEl.length > 0) {
          if (swiper.isBeginning) {
            disableEl($prevEl);
            makeElNotFocusable($prevEl);
          } else {
            enableEl($prevEl);
            makeElFocusable($prevEl);
          }
        }

        if ($nextEl && $nextEl.length > 0) {
          if (swiper.isEnd) {
            disableEl($nextEl);
            makeElNotFocusable($nextEl);
          } else {
            enableEl($nextEl);
            makeElFocusable($nextEl);
          }
        }
      }

      function hasPagination() {
        return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
      }

      function hasClickablePagination() {
        return hasPagination() && swiper.params.pagination.clickable;
      }

      function updatePagination() {
        const params = swiper.params.a11y;
        if (!hasPagination()) return;
        swiper.pagination.bullets.each(bulletEl => {
          const $bulletEl = $(bulletEl);

          if (swiper.params.pagination.clickable) {
            makeElFocusable($bulletEl);

            if (!swiper.params.pagination.renderBullet) {
              addElRole($bulletEl, 'button');
              addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
            }
          }

          if ($bulletEl.is(`.${swiper.params.pagination.bulletActiveClass}`)) {
            $bulletEl.attr('aria-current', 'true');
          } else {
            $bulletEl.removeAttr('aria-current');
          }
        });
      }

      const initNavEl = ($el, wrapperId, message) => {
        makeElFocusable($el);

        if ($el[0].tagName !== 'BUTTON') {
          addElRole($el, 'button');
          $el.on('keydown', onEnterOrSpaceKey);
        }

        addElLabel($el, message);
        addElControls($el, wrapperId);
      };

      const handlePointerDown = () => {
        swiper.a11y.clicked = true;
      };

      const handlePointerUp = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            swiper.a11y.clicked = false;
          });
        });
      };

      const handleFocus = e => {
        if (swiper.a11y.clicked) return;
        const slideEl = e.target.closest(`.${swiper.params.slideClass}`);
        if (!slideEl || !swiper.slides.includes(slideEl)) return;
        const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
        const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
        if (isActive || isVisible) return;

        if (swiper.isHorizontal()) {
          swiper.el.scrollLeft = 0;
        } else {
          swiper.el.scrollTop = 0;
        }

        swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
      };

      const initSlides = () => {
        const params = swiper.params.a11y;

        if (params.itemRoleDescriptionMessage) {
          addElRoleDescription($(swiper.slides), params.itemRoleDescriptionMessage);
        }

        if (params.slideRole) {
          addElRole($(swiper.slides), params.slideRole);
        }

        const slidesLength = swiper.params.loop ? swiper.slides.filter(el => !el.classList.contains(swiper.params.slideDuplicateClass)).length : swiper.slides.length;

        if (params.slideLabelMessage) {
          swiper.slides.each((slideEl, index) => {
            const $slideEl = $(slideEl);
            const slideIndex = swiper.params.loop ? parseInt($slideEl.attr('data-swiper-slide-index'), 10) : index;
            const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
            addElLabel($slideEl, ariaLabelMessage);
          });
        }
      };

      const init = () => {
        const params = swiper.params.a11y;
        swiper.$el.append(liveRegion); // Container

        const $containerEl = swiper.$el;

        if (params.containerRoleDescriptionMessage) {
          addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);
        }

        if (params.containerMessage) {
          addElLabel($containerEl, params.containerMessage);
        } // Wrapper


        const $wrapperEl = swiper.$wrapperEl;
        const wrapperId = params.id || $wrapperEl.attr('id') || `swiper-wrapper-${getRandomNumber(16)}`;
        const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
        addElId($wrapperEl, wrapperId);
        addElLive($wrapperEl, live); // Slide

        initSlides(); // Navigation

        let $nextEl;
        let $prevEl;

        if (swiper.navigation && swiper.navigation.$nextEl) {
          $nextEl = swiper.navigation.$nextEl;
        }

        if (swiper.navigation && swiper.navigation.$prevEl) {
          $prevEl = swiper.navigation.$prevEl;
        }

        if ($nextEl && $nextEl.length) {
          initNavEl($nextEl, wrapperId, params.nextSlideMessage);
        }

        if ($prevEl && $prevEl.length) {
          initNavEl($prevEl, wrapperId, params.prevSlideMessage);
        } // Pagination


        if (hasClickablePagination()) {
          swiper.pagination.$el.on('keydown', classesToSelector(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);
        } // Tab focus


        swiper.$el.on('focus', handleFocus, true);
        swiper.$el.on('pointerdown', handlePointerDown, true);
        swiper.$el.on('pointerup', handlePointerUp, true);
      };

      function destroy() {
        if (liveRegion && liveRegion.length > 0) liveRegion.remove();
        let $nextEl;
        let $prevEl;

        if (swiper.navigation && swiper.navigation.$nextEl) {
          $nextEl = swiper.navigation.$nextEl;
        }

        if (swiper.navigation && swiper.navigation.$prevEl) {
          $prevEl = swiper.navigation.$prevEl;
        }

        if ($nextEl) {
          $nextEl.off('keydown', onEnterOrSpaceKey);
        }

        if ($prevEl) {
          $prevEl.off('keydown', onEnterOrSpaceKey);
        } // Pagination


        if (hasClickablePagination()) {
          swiper.pagination.$el.off('keydown', classesToSelector(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);
        } // Tab focus


        swiper.$el.off('focus', handleFocus, true);
        swiper.$el.off('pointerdown', handlePointerDown, true);
        swiper.$el.off('pointerup', handlePointerUp, true);
      }

      on('beforeInit', () => {
        liveRegion = $(`<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
      });
      on('afterInit', () => {
        if (!swiper.params.a11y.enabled) return;
        init();
      });
      on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
        if (!swiper.params.a11y.enabled) return;
        initSlides();
      });
      on('fromEdge toEdge afterInit lock unlock', () => {
        if (!swiper.params.a11y.enabled) return;
        updateNavigation();
      });
      on('paginationUpdate', () => {
        if (!swiper.params.a11y.enabled) return;
        updatePagination();
      });
      on('destroy', () => {
        if (!swiper.params.a11y.enabled) return;
        destroy();
      });
    }

    function History(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        history: {
          enabled: false,
          root: '',
          replaceState: false,
          key: 'slides',
          keepQuery: false
        }
      });
      let initialized = false;
      let paths = {};

      const slugify = text => {
        return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
      };

      const getPathValues = urlOverride => {
        const window = getWindow();
        let location;

        if (urlOverride) {
          location = new URL(urlOverride);
        } else {
          location = window.location;
        }

        const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');
        const total = pathArray.length;
        const key = pathArray[total - 2];
        const value = pathArray[total - 1];
        return {
          key,
          value
        };
      };

      const setHistory = (key, index) => {
        const window = getWindow();
        if (!initialized || !swiper.params.history.enabled) return;
        let location;

        if (swiper.params.url) {
          location = new URL(swiper.params.url);
        } else {
          location = window.location;
        }

        const slide = swiper.slides.eq(index);
        let value = slugify(slide.attr('data-history'));

        if (swiper.params.history.root.length > 0) {
          let root = swiper.params.history.root;
          if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
          value = `${root}/${key}/${value}`;
        } else if (!location.pathname.includes(key)) {
          value = `${key}/${value}`;
        }

        if (swiper.params.history.keepQuery) {
          value += location.search;
        }

        const currentState = window.history.state;

        if (currentState && currentState.value === value) {
          return;
        }

        if (swiper.params.history.replaceState) {
          window.history.replaceState({
            value
          }, null, value);
        } else {
          window.history.pushState({
            value
          }, null, value);
        }
      };

      const scrollToSlide = (speed, value, runCallbacks) => {
        if (value) {
          for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
            const slide = swiper.slides.eq(i);
            const slideHistory = slugify(slide.attr('data-history'));

            if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
              const index = slide.index();
              swiper.slideTo(index, speed, runCallbacks);
            }
          }
        } else {
          swiper.slideTo(0, speed, runCallbacks);
        }
      };

      const setHistoryPopState = () => {
        paths = getPathValues(swiper.params.url);
        scrollToSlide(swiper.params.speed, paths.value, false);
      };

      const init = () => {
        const window = getWindow();
        if (!swiper.params.history) return;

        if (!window.history || !window.history.pushState) {
          swiper.params.history.enabled = false;
          swiper.params.hashNavigation.enabled = true;
          return;
        }

        initialized = true;
        paths = getPathValues(swiper.params.url);
        if (!paths.key && !paths.value) return;
        scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);

        if (!swiper.params.history.replaceState) {
          window.addEventListener('popstate', setHistoryPopState);
        }
      };

      const destroy = () => {
        const window = getWindow();

        if (!swiper.params.history.replaceState) {
          window.removeEventListener('popstate', setHistoryPopState);
        }
      };

      on('init', () => {
        if (swiper.params.history.enabled) {
          init();
        }
      });
      on('destroy', () => {
        if (swiper.params.history.enabled) {
          destroy();
        }
      });
      on('transitionEnd _freeModeNoMomentumRelease', () => {
        if (initialized) {
          setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      });
      on('slideChange', () => {
        if (initialized && swiper.params.cssMode) {
          setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      });
    }

    function HashNavigation(_ref) {
      let {
        swiper,
        extendParams,
        emit,
        on
      } = _ref;
      let initialized = false;
      const document = getDocument();
      const window = getWindow();
      extendParams({
        hashNavigation: {
          enabled: false,
          replaceState: false,
          watchState: false
        }
      });

      const onHashChange = () => {
        emit('hashChange');
        const newHash = document.location.hash.replace('#', '');
        const activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');

        if (newHash !== activeSlideHash) {
          const newIndex = swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-hash="${newHash}"]`).index();
          if (typeof newIndex === 'undefined') return;
          swiper.slideTo(newIndex);
        }
      };

      const setHash = () => {
        if (!initialized || !swiper.params.hashNavigation.enabled) return;

        if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
          window.history.replaceState(null, null, `#${swiper.slides.eq(swiper.activeIndex).attr('data-hash')}` || '');
          emit('hashSet');
        } else {
          const slide = swiper.slides.eq(swiper.activeIndex);
          const hash = slide.attr('data-hash') || slide.attr('data-history');
          document.location.hash = hash || '';
          emit('hashSet');
        }
      };

      const init = () => {
        if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
        initialized = true;
        const hash = document.location.hash.replace('#', '');

        if (hash) {
          const speed = 0;

          for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
            const slide = swiper.slides.eq(i);
            const slideHash = slide.attr('data-hash') || slide.attr('data-history');

            if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
              const index = slide.index();
              swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
            }
          }
        }

        if (swiper.params.hashNavigation.watchState) {
          $(window).on('hashchange', onHashChange);
        }
      };

      const destroy = () => {
        if (swiper.params.hashNavigation.watchState) {
          $(window).off('hashchange', onHashChange);
        }
      };

      on('init', () => {
        if (swiper.params.hashNavigation.enabled) {
          init();
        }
      });
      on('destroy', () => {
        if (swiper.params.hashNavigation.enabled) {
          destroy();
        }
      });
      on('transitionEnd _freeModeNoMomentumRelease', () => {
        if (initialized) {
          setHash();
        }
      });
      on('slideChange', () => {
        if (initialized && swiper.params.cssMode) {
          setHash();
        }
      });
    }

    /* eslint no-underscore-dangle: "off" */
    function Autoplay(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      let timeout;
      swiper.autoplay = {
        running: false,
        paused: false
      };
      extendParams({
        autoplay: {
          enabled: false,
          delay: 3000,
          waitForTransition: true,
          disableOnInteraction: true,
          stopOnLastSlide: false,
          reverseDirection: false,
          pauseOnMouseEnter: false
        }
      });

      function run() {
        if (!swiper.size) {
          swiper.autoplay.running = false;
          swiper.autoplay.paused = false;
          return;
        }

        const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
        let delay = swiper.params.autoplay.delay;

        if ($activeSlideEl.attr('data-swiper-autoplay')) {
          delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
        }

        clearTimeout(timeout);
        timeout = nextTick(() => {
          let autoplayResult;

          if (swiper.params.autoplay.reverseDirection) {
            if (swiper.params.loop) {
              swiper.loopFix();
              autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
              emit('autoplay');
            } else if (!swiper.isBeginning) {
              autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
              emit('autoplay');
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
              emit('autoplay');
            } else {
              stop();
            }
          } else if (swiper.params.loop) {
            swiper.loopFix();
            autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
            emit('autoplay');
          } else if (!swiper.isEnd) {
            autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
            emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
            emit('autoplay');
          } else {
            stop();
          }

          if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
            run();
          }
        }, delay);
      }

      function start() {
        if (typeof timeout !== 'undefined') return false;
        if (swiper.autoplay.running) return false;
        swiper.autoplay.running = true;
        emit('autoplayStart');
        run();
        return true;
      }

      function stop() {
        if (!swiper.autoplay.running) return false;
        if (typeof timeout === 'undefined') return false;

        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }

        swiper.autoplay.running = false;
        emit('autoplayStop');
        return true;
      }

      function pause(speed) {
        if (!swiper.autoplay.running) return;
        if (swiper.autoplay.paused) return;
        if (timeout) clearTimeout(timeout);
        swiper.autoplay.paused = true;

        if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
          swiper.autoplay.paused = false;
          run();
        } else {
          ['transitionend', 'webkitTransitionEnd'].forEach(event => {
            swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
          });
        }
      }

      function onVisibilityChange() {
        const document = getDocument();

        if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
          pause();
        }

        if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
          run();
          swiper.autoplay.paused = false;
        }
      }

      function onTransitionEnd(e) {
        if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
        if (e.target !== swiper.$wrapperEl[0]) return;
        ['transitionend', 'webkitTransitionEnd'].forEach(event => {
          swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
        });
        swiper.autoplay.paused = false;

        if (!swiper.autoplay.running) {
          stop();
        } else {
          run();
        }
      }

      function onMouseEnter() {
        if (swiper.params.autoplay.disableOnInteraction) {
          stop();
        } else {
          emit('autoplayPause');
          pause();
        }

        ['transitionend', 'webkitTransitionEnd'].forEach(event => {
          swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
        });
      }

      function onMouseLeave() {
        if (swiper.params.autoplay.disableOnInteraction) {
          return;
        }

        swiper.autoplay.paused = false;
        emit('autoplayResume');
        run();
      }

      function attachMouseEvents() {
        if (swiper.params.autoplay.pauseOnMouseEnter) {
          swiper.$el.on('mouseenter', onMouseEnter);
          swiper.$el.on('mouseleave', onMouseLeave);
        }
      }

      function detachMouseEvents() {
        swiper.$el.off('mouseenter', onMouseEnter);
        swiper.$el.off('mouseleave', onMouseLeave);
      }

      on('init', () => {
        if (swiper.params.autoplay.enabled) {
          start();
          const document = getDocument();
          document.addEventListener('visibilitychange', onVisibilityChange);
          attachMouseEvents();
        }
      });
      on('beforeTransitionStart', (_s, speed, internal) => {
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            stop();
          }
        }
      });
      on('sliderFirstMove', () => {
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            stop();
          } else {
            pause();
          }
        }
      });
      on('touchEnd', () => {
        if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
          run();
        }
      });
      on('destroy', () => {
        detachMouseEvents();

        if (swiper.autoplay.running) {
          stop();
        }

        const document = getDocument();
        document.removeEventListener('visibilitychange', onVisibilityChange);
      });
      Object.assign(swiper.autoplay, {
        pause,
        run,
        start,
        stop
      });
    }

    function Thumb(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: true,
          autoScrollOffset: 0,
          slideThumbActiveClass: 'swiper-slide-thumb-active',
          thumbsContainerClass: 'swiper-thumbs'
        }
      });
      let initialized = false;
      let swiperCreated = false;
      swiper.thumbs = {
        swiper: null
      };

      function onThumbClick() {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed) return;
        const clickedIndex = thumbsSwiper.clickedIndex;
        const clickedSlide = thumbsSwiper.clickedSlide;
        if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
        if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
        let slideToIndex;

        if (thumbsSwiper.params.loop) {
          slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
        } else {
          slideToIndex = clickedIndex;
        }

        if (swiper.params.loop) {
          let currentIndex = swiper.activeIndex;

          if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
            swiper.loopFix(); // eslint-disable-next-line

            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            currentIndex = swiper.activeIndex;
          }

          const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
          const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
          if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;
        }

        swiper.slideTo(slideToIndex);
      }

      function init() {
        const {
          thumbs: thumbsParams
        } = swiper.params;
        if (initialized) return false;
        initialized = true;
        const SwiperClass = swiper.constructor;

        if (thumbsParams.swiper instanceof SwiperClass) {
          swiper.thumbs.swiper = thumbsParams.swiper;
          Object.assign(swiper.thumbs.swiper.originalParams, {
            watchSlidesProgress: true,
            slideToClickedSlide: false
          });
          Object.assign(swiper.thumbs.swiper.params, {
            watchSlidesProgress: true,
            slideToClickedSlide: false
          });
        } else if (isObject(thumbsParams.swiper)) {
          const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
          Object.assign(thumbsSwiperParams, {
            watchSlidesProgress: true,
            slideToClickedSlide: false
          });
          swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
          swiperCreated = true;
        }

        swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
        swiper.thumbs.swiper.on('tap', onThumbClick);
        return true;
      }

      function update(initial) {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed) return;
        const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView; // Activate thumbs

        let thumbsToActivate = 1;
        const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

        if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
          thumbsToActivate = swiper.params.slidesPerView;
        }

        if (!swiper.params.thumbs.multipleActiveThumbs) {
          thumbsToActivate = 1;
        }

        thumbsToActivate = Math.floor(thumbsToActivate);
        thumbsSwiper.slides.removeClass(thumbActiveClass);

        if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
          for (let i = 0; i < thumbsToActivate; i += 1) {
            thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass);
          }
        } else {
          for (let i = 0; i < thumbsToActivate; i += 1) {
            thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
          }
        }

        const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
        const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;

        if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
          let currentThumbsIndex = thumbsSwiper.activeIndex;
          let newThumbsIndex;
          let direction;

          if (thumbsSwiper.params.loop) {
            if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
              thumbsSwiper.loopFix(); // eslint-disable-next-line

              thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
              currentThumbsIndex = thumbsSwiper.activeIndex;
            } // Find actual thumbs index to slide to


            const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
            const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();

            if (typeof prevThumbsIndex === 'undefined') {
              newThumbsIndex = nextThumbsIndex;
            } else if (typeof nextThumbsIndex === 'undefined') {
              newThumbsIndex = prevThumbsIndex;
            } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
              newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
            } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
              newThumbsIndex = nextThumbsIndex;
            } else {
              newThumbsIndex = prevThumbsIndex;
            }

            direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
          } else {
            newThumbsIndex = swiper.realIndex;
            direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
          }

          if (useOffset) {
            newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
          }

          if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
            if (thumbsSwiper.params.centeredSlides) {
              if (newThumbsIndex > currentThumbsIndex) {
                newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
              } else {
                newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
              }
            } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;

            thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
          }
        }
      }

      on('beforeInit', () => {
        const {
          thumbs
        } = swiper.params;
        if (!thumbs || !thumbs.swiper) return;
        init();
        update(true);
      });
      on('slideChange update resize observerUpdate', () => {
        update();
      });
      on('setTransition', (_s, duration) => {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed) return;
        thumbsSwiper.setTransition(duration);
      });
      on('beforeDestroy', () => {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed) return;

        if (swiperCreated) {
          thumbsSwiper.destroy();
        }
      });
      Object.assign(swiper.thumbs, {
        init,
        update
      });
    }

    function freeMode(_ref) {
      let {
        swiper,
        extendParams,
        emit,
        once
      } = _ref;
      extendParams({
        freeMode: {
          enabled: false,
          momentum: true,
          momentumRatio: 1,
          momentumBounce: true,
          momentumBounceRatio: 1,
          momentumVelocityRatio: 1,
          sticky: false,
          minimumVelocity: 0.02
        }
      });

      function onTouchStart() {
        const translate = swiper.getTranslate();
        swiper.setTranslate(translate);
        swiper.setTransition(0);
        swiper.touchEventsData.velocities.length = 0;
        swiper.freeMode.onTouchEnd({
          currentPos: swiper.rtl ? swiper.translate : -swiper.translate
        });
      }

      function onTouchMove() {
        const {
          touchEventsData: data,
          touches
        } = swiper; // Velocity

        if (data.velocities.length === 0) {
          data.velocities.push({
            position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
            time: data.touchStartTime
          });
        }

        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
          time: now()
        });
      }

      function onTouchEnd(_ref2) {
        let {
          currentPos
        } = _ref2;
        const {
          params,
          $wrapperEl,
          rtlTranslate: rtl,
          snapGrid,
          touchEventsData: data
        } = swiper; // Time diff

        const touchEndTime = now();
        const timeDiff = touchEndTime - data.touchStartTime;

        if (currentPos < -swiper.minTranslate()) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }

        if (currentPos > -swiper.maxTranslate()) {
          if (swiper.slides.length < snapGrid.length) {
            swiper.slideTo(snapGrid.length - 1);
          } else {
            swiper.slideTo(swiper.slides.length - 1);
          }

          return;
        }

        if (params.freeMode.momentum) {
          if (data.velocities.length > 1) {
            const lastMoveEvent = data.velocities.pop();
            const velocityEvent = data.velocities.pop();
            const distance = lastMoveEvent.position - velocityEvent.position;
            const time = lastMoveEvent.time - velocityEvent.time;
            swiper.velocity = distance / time;
            swiper.velocity /= 2;

            if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
              swiper.velocity = 0;
            } // this implies that the user stopped moving a finger then released.
            // There would be no events with distance zero, so the last event is stale.


            if (time > 150 || now() - lastMoveEvent.time > 300) {
              swiper.velocity = 0;
            }
          } else {
            swiper.velocity = 0;
          }

          swiper.velocity *= params.freeMode.momentumVelocityRatio;
          data.velocities.length = 0;
          let momentumDuration = 1000 * params.freeMode.momentumRatio;
          const momentumDistance = swiper.velocity * momentumDuration;
          let newPosition = swiper.translate + momentumDistance;
          if (rtl) newPosition = -newPosition;
          let doBounce = false;
          let afterBouncePosition;
          const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
          let needsLoopFix;

          if (newPosition < swiper.maxTranslate()) {
            if (params.freeMode.momentumBounce) {
              if (newPosition + swiper.maxTranslate() < -bounceAmount) {
                newPosition = swiper.maxTranslate() - bounceAmount;
              }

              afterBouncePosition = swiper.maxTranslate();
              doBounce = true;
              data.allowMomentumBounce = true;
            } else {
              newPosition = swiper.maxTranslate();
            }

            if (params.loop && params.centeredSlides) needsLoopFix = true;
          } else if (newPosition > swiper.minTranslate()) {
            if (params.freeMode.momentumBounce) {
              if (newPosition - swiper.minTranslate() > bounceAmount) {
                newPosition = swiper.minTranslate() + bounceAmount;
              }

              afterBouncePosition = swiper.minTranslate();
              doBounce = true;
              data.allowMomentumBounce = true;
            } else {
              newPosition = swiper.minTranslate();
            }

            if (params.loop && params.centeredSlides) needsLoopFix = true;
          } else if (params.freeMode.sticky) {
            let nextSlide;

            for (let j = 0; j < snapGrid.length; j += 1) {
              if (snapGrid[j] > -newPosition) {
                nextSlide = j;
                break;
              }
            }

            if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
              newPosition = snapGrid[nextSlide];
            } else {
              newPosition = snapGrid[nextSlide - 1];
            }

            newPosition = -newPosition;
          }

          if (needsLoopFix) {
            once('transitionEnd', () => {
              swiper.loopFix();
            });
          } // Fix duration


          if (swiper.velocity !== 0) {
            if (rtl) {
              momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
            } else {
              momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
            }

            if (params.freeMode.sticky) {
              // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
              // event, then durations can be 20+ seconds to slide one (or zero!) slides.
              // It's easy to see this when simulating touch with mouse events. To fix this,
              // limit single-slide swipes to the default slide duration. This also has the
              // nice side effect of matching slide speed if the user stopped moving before
              // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
              // For faster swipes, also apply limits (albeit higher ones).
              const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
              const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

              if (moveDistance < currentSlideSize) {
                momentumDuration = params.speed;
              } else if (moveDistance < 2 * currentSlideSize) {
                momentumDuration = params.speed * 1.5;
              } else {
                momentumDuration = params.speed * 2.5;
              }
            }
          } else if (params.freeMode.sticky) {
            swiper.slideToClosest();
            return;
          }

          if (params.freeMode.momentumBounce && doBounce) {
            swiper.updateProgress(afterBouncePosition);
            swiper.setTransition(momentumDuration);
            swiper.setTranslate(newPosition);
            swiper.transitionStart(true, swiper.swipeDirection);
            swiper.animating = true;
            $wrapperEl.transitionEnd(() => {
              if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
              emit('momentumBounce');
              swiper.setTransition(params.speed);
              setTimeout(() => {
                swiper.setTranslate(afterBouncePosition);
                $wrapperEl.transitionEnd(() => {
                  if (!swiper || swiper.destroyed) return;
                  swiper.transitionEnd();
                });
              }, 0);
            });
          } else if (swiper.velocity) {
            emit('_freeModeNoMomentumRelease');
            swiper.updateProgress(newPosition);
            swiper.setTransition(momentumDuration);
            swiper.setTranslate(newPosition);
            swiper.transitionStart(true, swiper.swipeDirection);

            if (!swiper.animating) {
              swiper.animating = true;
              $wrapperEl.transitionEnd(() => {
                if (!swiper || swiper.destroyed) return;
                swiper.transitionEnd();
              });
            }
          } else {
            swiper.updateProgress(newPosition);
          }

          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        } else if (params.freeMode.sticky) {
          swiper.slideToClosest();
          return;
        } else if (params.freeMode) {
          emit('_freeModeNoMomentumRelease');
        }

        if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
      }

      Object.assign(swiper, {
        freeMode: {
          onTouchStart,
          onTouchMove,
          onTouchEnd
        }
      });
    }

    function Grid(_ref) {
      let {
        swiper,
        extendParams
      } = _ref;
      extendParams({
        grid: {
          rows: 1,
          fill: 'column'
        }
      });
      let slidesNumberEvenToRows;
      let slidesPerRow;
      let numFullColumns;

      const initSlides = slidesLength => {
        const {
          slidesPerView
        } = swiper.params;
        const {
          rows,
          fill
        } = swiper.params.grid;
        slidesPerRow = slidesNumberEvenToRows / rows;
        numFullColumns = Math.floor(slidesLength / rows);

        if (Math.floor(slidesLength / rows) === slidesLength / rows) {
          slidesNumberEvenToRows = slidesLength;
        } else {
          slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
        }

        if (slidesPerView !== 'auto' && fill === 'row') {
          slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
        }
      };

      const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
        const {
          slidesPerGroup,
          spaceBetween
        } = swiper.params;
        const {
          rows,
          fill
        } = swiper.params.grid; // Set slides order

        let newSlideOrderIndex;
        let column;
        let row;

        if (fill === 'row' && slidesPerGroup > 1) {
          const groupIndex = Math.floor(i / (slidesPerGroup * rows));
          const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
          const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
          row = Math.floor(slideIndexInGroup / columnsInGroup);
          column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
          newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
          slide.css({
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex
          });
        } else if (fill === 'column') {
          column = Math.floor(i / rows);
          row = i - column * rows;

          if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
            row += 1;

            if (row >= rows) {
              row = 0;
              column += 1;
            }
          }
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - row * slidesPerRow;
        }

        slide.css(getDirectionLabel('margin-top'), row !== 0 ? spaceBetween && `${spaceBetween}px` : '');
      };

      const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
        const {
          spaceBetween,
          centeredSlides,
          roundLengths
        } = swiper.params;
        const {
          rows
        } = swiper.params.grid;
        swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
        swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
        swiper.$wrapperEl.css({
          [getDirectionLabel('width')]: `${swiper.virtualSize + spaceBetween}px`
        });

        if (centeredSlides) {
          snapGrid.splice(0, snapGrid.length);
          const newSlidesGrid = [];

          for (let i = 0; i < snapGrid.length; i += 1) {
            let slidesGridItem = snapGrid[i];
            if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
            if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
          }

          snapGrid.push(...newSlidesGrid);
        }
      };

      swiper.grid = {
        initSlides,
        updateSlide,
        updateWrapperSize
      };
    }

    function appendSlide(slides) {
      const swiper = this;
      const {
        $wrapperEl,
        params
      } = swiper;

      if (params.loop) {
        swiper.loopDestroy();
      }

      if (typeof slides === 'object' && 'length' in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) $wrapperEl.append(slides[i]);
        }
      } else {
        $wrapperEl.append(slides);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!params.observer) {
        swiper.update();
      }
    }

    function prependSlide(slides) {
      const swiper = this;
      const {
        params,
        $wrapperEl,
        activeIndex
      } = swiper;

      if (params.loop) {
        swiper.loopDestroy();
      }

      let newActiveIndex = activeIndex + 1;

      if (typeof slides === 'object' && 'length' in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) $wrapperEl.prepend(slides[i]);
        }

        newActiveIndex = activeIndex + slides.length;
      } else {
        $wrapperEl.prepend(slides);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!params.observer) {
        swiper.update();
      }

      swiper.slideTo(newActiveIndex, 0, false);
    }

    function addSlide(index, slides) {
      const swiper = this;
      const {
        $wrapperEl,
        params,
        activeIndex
      } = swiper;
      let activeIndexBuffer = activeIndex;

      if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides;
        swiper.loopDestroy();
        swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
      }

      const baseLength = swiper.slides.length;

      if (index <= 0) {
        swiper.prependSlide(slides);
        return;
      }

      if (index >= baseLength) {
        swiper.appendSlide(slides);
        return;
      }

      let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
      const slidesBuffer = [];

      for (let i = baseLength - 1; i >= index; i -= 1) {
        const currentSlide = swiper.slides.eq(i);
        currentSlide.remove();
        slidesBuffer.unshift(currentSlide);
      }

      if (typeof slides === 'object' && 'length' in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) $wrapperEl.append(slides[i]);
        }

        newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
      } else {
        $wrapperEl.append(slides);
      }

      for (let i = 0; i < slidesBuffer.length; i += 1) {
        $wrapperEl.append(slidesBuffer[i]);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!params.observer) {
        swiper.update();
      }

      if (params.loop) {
        swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
      } else {
        swiper.slideTo(newActiveIndex, 0, false);
      }
    }

    function removeSlide(slidesIndexes) {
      const swiper = this;
      const {
        params,
        $wrapperEl,
        activeIndex
      } = swiper;
      let activeIndexBuffer = activeIndex;

      if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides;
        swiper.loopDestroy();
        swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
      }

      let newActiveIndex = activeIndexBuffer;
      let indexToRemove;

      if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
        for (let i = 0; i < slidesIndexes.length; i += 1) {
          indexToRemove = slidesIndexes[i];
          if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
          if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
        }

        newActiveIndex = Math.max(newActiveIndex, 0);
      } else {
        indexToRemove = slidesIndexes;
        if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
        if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
        newActiveIndex = Math.max(newActiveIndex, 0);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!params.observer) {
        swiper.update();
      }

      if (params.loop) {
        swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
      } else {
        swiper.slideTo(newActiveIndex, 0, false);
      }
    }

    function removeAllSlides() {
      const swiper = this;
      const slidesIndexes = [];

      for (let i = 0; i < swiper.slides.length; i += 1) {
        slidesIndexes.push(i);
      }

      swiper.removeSlide(slidesIndexes);
    }

    function Manipulation(_ref) {
      let {
        swiper
      } = _ref;
      Object.assign(swiper, {
        appendSlide: appendSlide.bind(swiper),
        prependSlide: prependSlide.bind(swiper),
        addSlide: addSlide.bind(swiper),
        removeSlide: removeSlide.bind(swiper),
        removeAllSlides: removeAllSlides.bind(swiper)
      });
    }

    function effectInit(params) {
      const {
        effect,
        swiper,
        on,
        setTranslate,
        setTransition,
        overwriteParams,
        perspective,
        recreateShadows,
        getEffectParams
      } = params;
      on('beforeInit', () => {
        if (swiper.params.effect !== effect) return;
        swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);

        if (perspective && perspective()) {
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        }

        const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
        Object.assign(swiper.params, overwriteParamsResult);
        Object.assign(swiper.originalParams, overwriteParamsResult);
      });
      on('setTranslate', () => {
        if (swiper.params.effect !== effect) return;
        setTranslate();
      });
      on('setTransition', (_s, duration) => {
        if (swiper.params.effect !== effect) return;
        setTransition(duration);
      });
      on('transitionEnd', () => {
        if (swiper.params.effect !== effect) return;

        if (recreateShadows) {
          if (!getEffectParams || !getEffectParams().slideShadows) return; // remove shadows

          swiper.slides.each(slideEl => {
            const $slideEl = swiper.$(slideEl);
            $slideEl.find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').remove();
          }); // create new one

          recreateShadows();
        }
      });
      let requireUpdateOnVirtual;
      on('virtualUpdate', () => {
        if (swiper.params.effect !== effect) return;

        if (!swiper.slides.length) {
          requireUpdateOnVirtual = true;
        }

        requestAnimationFrame(() => {
          if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
            setTranslate();
            requireUpdateOnVirtual = false;
          }
        });
      });
    }

    function effectTarget(effectParams, $slideEl) {
      if (effectParams.transformEl) {
        return $slideEl.find(effectParams.transformEl).css({
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden'
        });
      }

      return $slideEl;
    }

    function effectVirtualTransitionEnd(_ref) {
      let {
        swiper,
        duration,
        transformEl,
        allSlides
      } = _ref;
      const {
        slides,
        activeIndex,
        $wrapperEl
      } = swiper;

      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        let $transitionEndTarget;

        if (allSlides) {
          $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
        } else {
          $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
        }

        $transitionEndTarget.transitionEnd(() => {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          eventTriggered = true;
          swiper.animating = false;
          const triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (let i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }

    function EffectFade(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        fadeEffect: {
          crossFade: false,
          transformEl: null
        }
      });

      const setTranslate = () => {
        const {
          slides
        } = swiper;
        const params = swiper.params.fadeEffect;

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset = $slideEl[0].swiperSlideOffset;
          let tx = -offset;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;

          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }

          const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.css({
            opacity: slideOpacity
          }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.fadeEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration);
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformEl,
          allSlides: true
        });
      };

      effectInit({
        effect: 'fade',
        swiper,
        on,
        setTranslate,
        setTransition,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }

    function EffectCube(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 20,
          shadowScale: 0.94
        }
      });

      const createSlideShadows = ($slideEl, progress, isHorizontal) => {
        let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

        if (shadowBefore.length === 0) {
          shadowBefore = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
          $slideEl.append(shadowBefore);
        }

        if (shadowAfter.length === 0) {
          shadowAfter = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
          $slideEl.append(shadowAfter);
        }

        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      };

      const recreateShadows = () => {
        // create new ones
        const isHorizontal = swiper.isHorizontal();
        swiper.slides.each(slideEl => {
          const progress = Math.max(Math.min(slideEl.progress, 1), -1);
          createSlideShadows($(slideEl), progress, isHorizontal);
        });
      };

      const setTranslate = () => {
        const {
          $el,
          $wrapperEl,
          slides,
          width: swiperWidth,
          height: swiperHeight,
          rtlTranslate: rtl,
          size: swiperSize,
          browser
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');

            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }

            $cubeShadowEl.css({
              height: `${swiperWidth}px`
            });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');

            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;

          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }

          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);

          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }

          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;

          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + round * 4 * swiperSize;
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = 3 * swiperSize + swiperSize * 4 * round;
          }

          if (rtl) {
            tx = -tx;
          }

          if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }

          const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;

          if (progress <= 1 && progress > -1) {
            wrapperRotate = slideIndex * 90 + progress * 90;
            if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
          }

          $slideEl.transform(transform);

          if (params.slideShadows) {
            createSlideShadows($slideEl, progress, isHorizontal);
          }
        }

        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`
        });

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(`translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
          } else {
            const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
            const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset = params.shadowOffset;
            $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
          }
        }

        const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
        $wrapperEl.transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
        $wrapperEl[0].style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);
      };

      const setTransition = duration => {
        const {
          $el,
          slides
        } = swiper;
        slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      };

      effectInit({
        effect: 'cube',
        swiper,
        on,
        setTranslate,
        setTransition,
        recreateShadows,
        getEffectParams: () => swiper.params.cubeEffect,
        perspective: () => true,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true
        })
      });
    }

    function createShadow(params, $slideEl, side) {
      const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}`;
      const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
      let $shadowEl = $shadowContainer.children(`.${shadowClass}`);

      if (!$shadowEl.length) {
        $shadowEl = $(`<div class="swiper-slide-shadow${side ? `-${side}` : ''}"></div>`);
        $shadowContainer.append($shadowEl);
      }

      return $shadowEl;
    }

    function EffectFlip(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        flipEffect: {
          slideShadows: true,
          limitRotation: true,
          transformEl: null
        }
      });

      const createSlideShadows = ($slideEl, progress, params) => {
        let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

        if (shadowBefore.length === 0) {
          shadowBefore = createShadow(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');
        }

        if (shadowAfter.length === 0) {
          shadowAfter = createShadow(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
        }

        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      };

      const recreateShadows = () => {
        // Set shadows
        const params = swiper.params.flipEffect;
        swiper.slides.each(slideEl => {
          const $slideEl = $(slideEl);
          let progress = $slideEl[0].progress;

          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min(slideEl.progress, 1), -1);
          }

          createSlideShadows($slideEl, progress, params);
        });
      };

      const setTranslate = () => {
        const {
          slides,
          rtlTranslate: rtl
        } = swiper;
        const params = swiper.params.flipEffect;

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;

          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }

          const offset = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
          let ty = 0;

          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (params.slideShadows) {
            createSlideShadows($slideEl, progress, params);
          }

          const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.transform(transform);
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.flipEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformEl
        });
      };

      effectInit({
        effect: 'flip',
        swiper,
        on,
        setTranslate,
        setTransition,
        recreateShadows,
        getEffectParams: () => swiper.params.flipEffect,
        perspective: () => true,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }

    function EffectCoverflow(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: true,
          transformEl: null
        }
      });

      const setTranslate = () => {
        const {
          width: swiperWidth,
          height: swiperHeight,
          slides,
          slidesSizesGrid
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform = swiper.translate;
        const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth; // Each slide offset from center

        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
          const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

          let translateZ = -translate * Math.abs(offsetMultiplier);
          let stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

          if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
            stretch = parseFloat(params.stretch) / 100 * slideSize;
          }

          let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
          let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
          let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
          if (Math.abs(scale) < 0.001) scale = 0;
          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = createShadow(params, $slideEl, isHorizontal ? 'left' : 'top');
            }

            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = createShadow(params, $slideEl, isHorizontal ? 'right' : 'bottom');
            }

            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
          }
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.coverflowEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
      };

      effectInit({
        effect: 'coverflow',
        swiper,
        on,
        setTranslate,
        setTransition,
        perspective: () => true,
        overwriteParams: () => ({
          watchSlidesProgress: true
        })
      });
    }

    function EffectCreative(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        creativeEffect: {
          transformEl: null,
          limitProgress: 1,
          shadowPerProgress: false,
          progressMultiplier: 1,
          perspective: true,
          prev: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1
          },
          next: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1
          }
        }
      });

      const getTranslateValue = value => {
        if (typeof value === 'string') return value;
        return `${value}px`;
      };

      const setTranslate = () => {
        const {
          slides,
          $wrapperEl,
          slidesSizesGrid
        } = swiper;
        const params = swiper.params.creativeEffect;
        const {
          progressMultiplier: multiplier
        } = params;
        const isCenteredSlides = swiper.params.centeredSlides;

        if (isCenteredSlides) {
          const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
          $wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);
        }

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideProgress = $slideEl[0].progress;
          const progress = Math.min(Math.max($slideEl[0].progress, -params.limitProgress), params.limitProgress);
          let originalProgress = progress;

          if (!isCenteredSlides) {
            originalProgress = Math.min(Math.max($slideEl[0].originalProgress, -params.limitProgress), params.limitProgress);
          }

          const offset = $slideEl[0].swiperSlideOffset;
          const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
          const r = [0, 0, 0];
          let custom = false;

          if (!swiper.isHorizontal()) {
            t[1] = t[0];
            t[0] = 0;
          }

          let data = {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: 1,
            opacity: 1
          };

          if (progress < 0) {
            data = params.next;
            custom = true;
          } else if (progress > 0) {
            data = params.prev;
            custom = true;
          } // set translate


          t.forEach((value, index) => {
            t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
          }); // set rotates

          r.forEach((value, index) => {
            r[index] = data.rotate[index] * Math.abs(progress * multiplier);
          });
          $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
          const translateString = t.join(', ');
          const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
          const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
          const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
          const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`; // Set shadows

          if (custom && data.shadow || !custom) {
            let $shadowEl = $slideEl.children('.swiper-slide-shadow');

            if ($shadowEl.length === 0 && data.shadow) {
              $shadowEl = createShadow(params, $slideEl);
            }

            if ($shadowEl.length) {
              const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
              $shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
            }
          }

          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.transform(transform).css({
            opacity: opacityString
          });

          if (data.origin) {
            $targetEl.css('transform-origin', data.origin);
          }
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.creativeEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformEl,
          allSlides: true
        });
      };

      effectInit({
        effect: 'creative',
        swiper,
        on,
        setTranslate,
        setTransition,
        perspective: () => swiper.params.creativeEffect.perspective,
        overwriteParams: () => ({
          watchSlidesProgress: true,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }

    function EffectCards(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        cardsEffect: {
          slideShadows: true,
          transformEl: null,
          rotate: true,
          perSlideRotate: 2,
          perSlideOffset: 8
        }
      });

      const setTranslate = () => {
        const {
          slides,
          activeIndex
        } = swiper;
        const params = swiper.params.cardsEffect;
        const {
          startTranslate,
          isTouched
        } = swiper.touchEventsData;
        const currentTranslate = swiper.translate;

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideProgress = $slideEl[0].progress;
          const progress = Math.min(Math.max(slideProgress, -4), 4);
          let offset = $slideEl[0].swiperSlideOffset;

          if (swiper.params.centeredSlides && !swiper.params.cssMode) {
            swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
          }

          if (swiper.params.centeredSlides && swiper.params.cssMode) {
            offset -= slides[0].swiperSlideOffset;
          }

          let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
          let tY = 0;
          const tZ = -100 * Math.abs(progress);
          let scale = 1;
          let rotate = -params.perSlideRotate * progress;
          let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
          const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
          const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
          const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;

          if (isSwipeToNext || isSwipeToPrev) {
            const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
            rotate += -28 * progress * subProgress;
            scale += -0.5 * subProgress;
            tXAdd += 96 * subProgress;
            tY = `${-25 * subProgress * Math.abs(progress)}%`;
          }

          if (progress < 0) {
            // next
            tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
          } else if (progress > 0) {
            // prev
            tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
          } else {
            tX = `${tX}px`;
          }

          if (!swiper.isHorizontal()) {
            const prevY = tY;
            tY = tX;
            tX = prevY;
          }

          const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
          const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rotate : 0}deg)
        scale(${scaleString})
      `;

          if (params.slideShadows) {
            // Set shadows
            let $shadowEl = $slideEl.find('.swiper-slide-shadow');

            if ($shadowEl.length === 0) {
              $shadowEl = createShadow(params, $slideEl);
            }

            if ($shadowEl.length) $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.transform(transform);
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.cardsEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformEl
        });
      };

      effectInit({
        effect: 'cards',
        swiper,
        on,
        setTranslate,
        setTransition,
        perspective: () => true,
        overwriteParams: () => ({
          watchSlidesProgress: true,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }

    // Swiper Class
    const modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
    Swiper.use(modules);

    return Swiper;

}));


},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _swiperBundle = _interopRequireDefault(require("../../node_modules/swiper/swiper-bundle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

//import VanillaTilt from "../../node_modules/vanilla-tilt/dist/vanilla-tilt";
var Header = /*#__PURE__*/function () {
  function Header() {
    var _this = this;

    _classCallCheck(this, Header);

    this.swiper = null;
    this.classMain = {
      agentItem: '.js-header__agent-item',
      headerAgents: '.js-header-agents',
      headerSkills: '.js-header-skills',
      headerTitle: '.js-header-title'
    };
    this.allAgentsItems = document.querySelectorAll(this.classMain.agentItem);
    this.agentSkills = document.querySelector(this.classMain.headerSkills);
    this.headerTitle = document.querySelector(this.classMain.headerTitle);
    window.addEventListener('resize', this.eventsResize.bind(this));
    this.allAgentsItems.forEach(function (item) {
      return item.addEventListener('mouseover', function (e) {
        return _this.agentItemOver(e);
      });
    });
    this.skillsInfo = {
      phoenix: {
        one: {
          title: 'Twisted feed',
          text: 'When exploded, the orb blinds all players who were looking at it at the time of the explosion.'
        },
        two: {
          title: 'Hot hands',
          text: 'Fireball that explodes after a delay or when it hits the ground.'
        },
        three: {
          title: 'Return',
          text: 'If the skill expires, or if Phoenix dies while it is active.'
        },
        four: {
          title: 'Inferno',
          text: 'It obscures vision and deals damage to players passing through it.'
        }
      },
      jett: {
        one: {
          title: 'Vortex',
          text: 'Instantly launches a projectile that transforms into a cloud that briefly obscures vision on impact with the ground.'
        },
        two: {
          title: 'Climb',
          text: 'Jett instantly takes off into the air.'
        },
        three: {
          title: 'Favourable wind',
          text: 'Jett instantly makes a quick dash in the direction of travel.'
        },
        four: {
          title: 'Blade Storm',
          text: 'Armed with a set of precision throwing daggers, which are reloaded after the elimination of the enemy.'
        }
      },
      sova: {
        one: {
          title: 'Shock Bolt',
          text: 'EQUIP a bow with shock bolt. FIRE to send the explosive bolt forward, detonating upon collision and damaging players nearby.'
        },
        two: {
          title: 'Owl Drone',
          text: 'EQUIP an owl drone. FIRE to deploy and take control of movement of the drone.'
        },
        three: {
          title: 'Recon Bolt',
          text: 'FIRE to send the recon bolt forward, activating upon collision, enemies caught in the line of sight of the bolt.'
        },
        four: {
          title: 'Hunter’s Fury',
          text: 'EQUIP a bow with three long-range, wall-piercing energy blasts.'
        }
      },
      sage: {
        one: {
          title: 'Slow Orb',
          text: 'EQUIP a slowing orb. FIRE to throw a slowing orb forward that detonates upon landing, slows players caught inside of it.'
        },
        two: {
          title: 'Barrier Orb',
          text: 'EQUIP a barrier orb. FIRE places a wall that fortifies after a few seconds. ALT FIRE rotates the targeter.'
        },
        three: {
          title: 'Resurrection',
          text: 'EQUIP a resurrection ability. FIRE with your crosshairs placed over a dead ally to begin resurrecting them.'
        },
        four: {
          title: 'Healing Orb',
          text: 'EQUIP a healing orb. FIRE with your crosshairs over a damaged ally to activate a heal-over-time on them.'
        }
      }
    };
    this.titleAgents = 'GENTS';
    this.init();
  }

  _createClass(Header, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (window.innerWidth < 1280) this.swiperInit();

      window.onload = function () {
        _this2.titleInit();
      };
    }
  }, {
    key: "eventsResize",
    value: function eventsResize() {
      if (this.swiper && window.innerWidth >= 1280) this.swiperEventDestroy();

      if (!this.swiper && window.innerWidth < 1280) {
        this.swiperInit();
      }
    }
  }, {
    key: "agentItemOver",
    value: function agentItemOver(_ref) {
      var target = _ref.target;
      var itemCurrent = target.closest(this.classMain.agentItem);

      if (itemCurrent) {
        this.changeDataAgents(itemCurrent);
      }
    }
  }, {
    key: "changeDataAgents",
    value: function changeDataAgents(itemCurrent) {
      var _this3 = this;

      this.allAgentsItems.forEach(function (item) {
        item.classList.remove('header__agent-item--active');

        _this3.agentSkills.classList.remove("header__skills--".concat(item.dataset.agentName));

        if (item === itemCurrent) {
          item.classList.add('header__agent-item--active');

          _this3.agentSkills.classList.add("header__skills--".concat(item.dataset.agentName));

          _this3.agentSkills.querySelectorAll('.header__skill-item').forEach(function (itemSkillBlock, iter) {
            switch (iter) {
              case 0:
                itemSkillBlock.querySelector('.header__skill-item-subtitle').innerText = _this3.skillsInfo[item.dataset.agentName]['one'].title;
                itemSkillBlock.querySelector('.header__skill-item-text').innerText = _this3.skillsInfo[item.dataset.agentName]['one'].text;
                break;

              case 1:
                itemSkillBlock.querySelector('.header__skill-item-subtitle').innerText = _this3.skillsInfo[item.dataset.agentName]['two'].title;
                itemSkillBlock.querySelector('.header__skill-item-text').innerText = _this3.skillsInfo[item.dataset.agentName]['two'].text;
                break;

              case 2:
                itemSkillBlock.querySelector('.header__skill-item-subtitle').innerText = _this3.skillsInfo[item.dataset.agentName]['three'].title;
                itemSkillBlock.querySelector('.header__skill-item-text').innerText = _this3.skillsInfo[item.dataset.agentName]['three'].text;
                break;

              case 3:
                itemSkillBlock.querySelector('.header__skill-item-subtitle').innerText = _this3.skillsInfo[item.dataset.agentName]['four'].title;
                itemSkillBlock.querySelector('.header__skill-item-text').innerText = _this3.skillsInfo[item.dataset.agentName]['four'].text;
                break;

              default:
                break;
            }
          });
        }
      });
    }
  }, {
    key: "swiperInit",
    value: function swiperInit() {
      var _this4 = this;

      this.swiper = new _swiperBundle["default"](this.classMain.headerAgents, {
        breakpoints: {
          320: {
            slidesPerView: 1.1,
            spaceBetween: 20
          },
          440: {
            slidesPerView: 1.2,
            spaceBetween: 20
          },
          550: {
            slidesPerView: 1.5,
            spaceBetween: 20
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 30
          },
          950: {
            slidesPerView: 2.7,
            spaceBetween: 30
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        },
        on: {
          activeIndexChange: function activeIndexChange() {
            _this4.changeDataAgents(_this4.allAgentsItems[_this4.swiper.activeIndex]);
          }
        }
      });
    }
  }, {
    key: "swiperEventDestroy",
    value: function swiperEventDestroy() {
      this.swiper.destroy();
      this.swiper = null;
    }
  }, {
    key: "titleInit",
    value: function titleInit() {
      var sum = 1;

      var _iterator = _createForOfIteratorHelper(this.titleAgents),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _char = _step.value;
          this.symbolSealTitle(_char, sum);
          sum++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "symbolSealTitle",
    value: function symbolSealTitle(_char2, sum) {
      var _this5 = this;

      setTimeout(function () {
        _this5.headerTitle.innerText += _char2;
      }, 100 * sum);
    }
  }]);

  return Header;
}();

exports["default"] = Header;

},{"../../node_modules/swiper/swiper-bundle.js":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Parallax = /*#__PURE__*/function () {
  function Parallax(options) {
    _classCallCheck(this, Parallax);

    this.mainSelector = options.mainSelector || '';
    this.mainPhotoSelector = options.mainPhotoSelector || '';
    this.selectorDecor = options.selectorDecor || [];
    this.type = options.type || 'all';
    this.initDelegation();
  }

  _createClass(Parallax, [{
    key: "initDelegation",
    value: function initDelegation() {
      if (this.eventError()) return;
      if (this.type === 'horizon') this.initHorizonParallax();
      if (this.type === 'horizonScroll') this.initScrollParallax();
    }
  }, {
    key: "initHorizonParallax",
    value: function initHorizonParallax() {
      var _this = this;

      this.mainElement = document.querySelector(this.mainSelector);
      this.mainElement.addEventListener('mousemove', function (e) {
        var x = e.clientX / window.innerWidth;
        document.querySelector(_this.mainPhotoSelector).style.transform = 'translate(-' + x * 50 + 'px)';

        _this.selectorDecor.forEach(function (item) {
          document.querySelector(item.selector).style.transform = 'translate(+' + x * 50 + 'px)' + item.transformDefault;
        });
      });
    }
  }, {
    key: "initScrollParallax",
    value: function initScrollParallax() {
      var _this2 = this;

      this.mainElement = document.querySelector(this.mainSelector);
      document.addEventListener('scroll', function (e) {
        var mainRect = _this2.mainElement.getBoundingClientRect();

        var percentRect = mainRect.top * 100 / window.innerHeight / 2;

        _this2.selectorDecor.forEach(function (item) {
          document.querySelector(item.selector).style.top = "".concat(percentRect, "%");
        });
      });
    }
  }, {
    key: "eventError",
    value: function eventError() {
      if (!this.mainSelector.length) {
        console.error('you didn\'t pass mainSelector');
        return true;
      }
    }
  }]);

  return Parallax;
}();

exports["default"] = Parallax;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Popup = /*#__PURE__*/function () {
  function Popup(options) {
    _classCallCheck(this, Popup);

    this.popupSelector = options.popupSelector;
    this.callSelector = options.callSelector;
    this.callElement = document.querySelector(this.callSelector);
    this.popupElement = document.querySelector(this.popupSelector);
    this.bodyContainer = document.querySelector('body');
    this.popupContainer = null;
    this.init();
  }

  _createClass(Popup, [{
    key: "init",
    value: function init() {
      this.makePopupContainer();
      this.popupShowEvent();
    }
  }, {
    key: "popupShowEvent",
    value: function popupShowEvent() {
      var _this = this;

      this.callElement.addEventListener('click', function () {
        _this.addMarkup();
      });
    }
  }, {
    key: "popupCloseEvent",
    value: function popupCloseEvent() {
      var _this2 = this;

      this.popupContainer.querySelector('.popup-close').addEventListener('click', function () {
        _this2.popupContainer.remove();

        _this2.bodyContainer.classList.remove('limited');
      });
    }
  }, {
    key: "makePopupContainer",
    value: function makePopupContainer() {
      this.popupContainer = document.createElement('div');
      this.popupContainer.classList.add('popup-wrapper');
      this.popupContainer.insertAdjacentHTML('beforeend', '<span class="popup-close"></span>');
      this.popupContainer.append(this.popupElement);
    }
  }, {
    key: "addMarkup",
    value: function addMarkup() {
      this.bodyContainer.append(this.popupContainer);
      this.popupElement.classList.remove('popup-hide');
      this.bodyContainer.classList.add('limited');
      this.popupCloseEvent();
    }
  }]);

  return Popup;
}();

exports["default"] = Popup;

},{}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _Header = _interopRequireDefault(require("./Header.js"));

var _Parallax = _interopRequireDefault(require("./Parallax.js"));

var _Popup = _interopRequireDefault(require("./Popup.js"));

var _showTitle = require("./showTitle.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Main = /*#__PURE__*/function () {
  function Main() {
    _classCallCheck(this, Main);

    _defineProperty(this, "popupInit", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var popup;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              popup = new _Popup["default"]({
                popupSelector: '.js-about-video-popup',
                callSelector: '.js-section-about-video-play'
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  }

  _createClass(Main, [{
    key: "init",
    value: function init() {
      this.menuEvent();
      this.headerInit();
      this.parallaxInit();
      this.popupInit();
      this.titlesInit();
    }
  }, {
    key: "menuEvent",
    value: function menuEvent() {
      this.menuOpenClose();
      this.scrollBlock();
    }
  }, {
    key: "menuOpenClose",
    value: function menuOpenClose() {
      var menuBtn = document.querySelector('.js-nav-btn');
      var menuLinks = document.querySelector('.js-nav-links');
      menuBtn.addEventListener('click', function () {
        menuLinks.classList[menuLinks.classList.contains('open-links') ? 'remove' : 'add']('open-links');
      });
    }
  }, {
    key: "scrollBlock",
    value: function scrollBlock() {
      var anchors = document.querySelectorAll('a[href*="#"]');
      anchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          var blockID = anchor.getAttribute('href').substr(1);
          document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      });
    }
  }, {
    key: "headerInit",
    value: function headerInit() {
      var header = new _Header["default"]();
    }
  }, {
    key: "parallaxInit",
    value: function parallaxInit() {
      var parallax = new _Parallax["default"]({
        mainSelector: '.js-parallax-container',
        mainPhotoSelector: '.js-main__photo',
        selectorDecor: [{
          selector: '.js-one-main-decor',
          transformDefault: 'rotate(90deg)'
        }, {
          selector: '.js-two-main-decor',
          transformDefault: 'rotate(-90deg)'
        }],
        type: 'horizon'
      });
      var parallaxTwo = new _Parallax["default"]({
        mainSelector: '.js-parallax-container-agents',
        mainPhotoSelector: '.js-main__photo-agents',
        selectorDecor: [{
          selector: '.js-one-main-decor-agents',
          transformDefault: 'rotate(90deg)  translateY(calc(-50% - 527px))'
        }],
        type: 'horizon'
      });
      var parallaxThree = new _Parallax["default"]({
        mainSelector: '.js-section-maps',
        selectorDecor: [{
          selector: '.js-section-maps-birds',
          transformDefault: ''
        }],
        type: 'horizonScroll'
      });
    }
  }, {
    key: "titlesInit",
    value: function titlesInit() {
      var titles = new _showTitle.ShowTitle(['.js-title-about-animation', '.js-title-agents-animation', '.js-title-guns-animation', '.js-title-maps-animation']);
    }
  }]);

  return Main;
}();

var main = new Main();
main.init();

},{"./Header.js":2,"./Parallax.js":3,"./Popup.js":4,"./showTitle.js":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowTitle = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ShowTitle = /*#__PURE__*/function () {
  function ShowTitle(selectors) {
    _classCallCheck(this, ShowTitle);

    this.allSelectors = selectors || [];
    this.init();
  }

  _createClass(ShowTitle, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (this.allSelectors.length === 0) {
        console.warn('Not found selectors for titles animation');
        return;
      }

      document.addEventListener('scroll', function () {
        return _this.searchTitle();
      });
    }
  }, {
    key: "searchTitle",
    value: function searchTitle() {
      this.allSelectors.forEach(function (item) {
        var titleElement = document.querySelector(item);
        var titleElementTop = titleElement.getBoundingClientRect().top;

        if (titleElementTop <= window.innerHeight - 30) {
          titleElement.classList.remove('title-close');
        }
      });
    }
  }]);

  return ShowTitle;
}();

exports.ShowTitle = ShowTitle;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc3dpcGVyL3N3aXBlci1idW5kbGUuanMiLCJzcmMvc2NyaXB0cy9IZWFkZXIuanMiLCJzcmMvc2NyaXB0cy9QYXJhbGxheC5qcyIsInNyYy9zY3JpcHRzL1BvcHVwLmpzIiwic3JjL3NjcmlwdHMvbWFpbi5qcyIsInNyYy9zY3JpcHRzL3Nob3dUaXRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzM4VUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQUVxQixNO0VBQ2pCLGtCQUFjO0lBQUE7O0lBQUE7O0lBQ1YsS0FBSyxNQUFMLEdBQWMsSUFBZDtJQUVBLEtBQUssU0FBTCxHQUFpQjtNQUNiLFNBQVMsRUFBRSx3QkFERTtNQUViLFlBQVksRUFBRSxtQkFGRDtNQUdiLFlBQVksRUFBRSxtQkFIRDtNQUliLFdBQVcsRUFBRTtJQUpBLENBQWpCO0lBT0EsS0FBSyxjQUFMLEdBQXNCLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixLQUFLLFNBQUwsQ0FBZSxTQUF6QyxDQUF0QjtJQUNBLEtBQUssV0FBTCxHQUFtQixRQUFRLENBQUMsYUFBVCxDQUF1QixLQUFLLFNBQUwsQ0FBZSxZQUF0QyxDQUFuQjtJQUNBLEtBQUssV0FBTCxHQUFtQixRQUFRLENBQUMsYUFBVCxDQUF1QixLQUFLLFNBQUwsQ0FBZSxXQUF0QyxDQUFuQjtJQUVBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbEM7SUFDQSxLQUFLLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBNEIsVUFBQSxJQUFJO01BQUEsT0FBSSxJQUFJLENBQUMsZ0JBQUwsQ0FBc0IsV0FBdEIsRUFBbUMsVUFBQSxDQUFDO1FBQUEsT0FBSSxLQUFJLENBQUMsYUFBTCxDQUFtQixDQUFuQixDQUFKO01BQUEsQ0FBcEMsQ0FBSjtJQUFBLENBQWhDO0lBRUEsS0FBSyxVQUFMLEdBQWtCO01BQ2QsT0FBTyxFQUFFO1FBQ0wsR0FBRyxFQUFFO1VBQ0QsS0FBSyxFQUFFLGNBRE47VUFFRCxJQUFJLEVBQUU7UUFGTCxDQURBO1FBS0wsR0FBRyxFQUFFO1VBQ0QsS0FBSyxFQUFFLFdBRE47VUFFRCxJQUFJLEVBQUU7UUFGTCxDQUxBO1FBU0wsS0FBSyxFQUFFO1VBQ0gsS0FBSyxFQUFFLFFBREo7VUFFSCxJQUFJLEVBQUU7UUFGSCxDQVRGO1FBYUwsSUFBSSxFQUFFO1VBQ0YsS0FBSyxFQUFFLFNBREw7VUFFRixJQUFJLEVBQUU7UUFGSjtNQWJELENBREs7TUFtQmQsSUFBSSxFQUFFO1FBQ0YsR0FBRyxFQUFFO1VBQ0QsS0FBSyxFQUFFLFFBRE47VUFFRCxJQUFJLEVBQUU7UUFGTCxDQURIO1FBS0YsR0FBRyxFQUFFO1VBQ0QsS0FBSyxFQUFFLE9BRE47VUFFRCxJQUFJLEVBQUU7UUFGTCxDQUxIO1FBU0YsS0FBSyxFQUFFO1VBQ0gsS0FBSyxFQUFFLGlCQURKO1VBRUgsSUFBSSxFQUFFO1FBRkgsQ0FUTDtRQWFGLElBQUksRUFBRTtVQUNGLEtBQUssRUFBRSxhQURMO1VBRUYsSUFBSSxFQUFFO1FBRko7TUFiSixDQW5CUTtNQXFDZCxJQUFJLEVBQUU7UUFDRixHQUFHLEVBQUU7VUFDRCxLQUFLLEVBQUUsWUFETjtVQUVELElBQUksRUFBRTtRQUZMLENBREg7UUFLRixHQUFHLEVBQUU7VUFDRCxLQUFLLEVBQUUsV0FETjtVQUVELElBQUksRUFBRTtRQUZMLENBTEg7UUFTRixLQUFLLEVBQUU7VUFDSCxLQUFLLEVBQUUsWUFESjtVQUVILElBQUksRUFBRTtRQUZILENBVEw7UUFhRixJQUFJLEVBQUU7VUFDRixLQUFLLEVBQUUsZUFETDtVQUVGLElBQUksRUFBRTtRQUZKO01BYkosQ0FyQ1E7TUF1RGQsSUFBSSxFQUFFO1FBQ0YsR0FBRyxFQUFFO1VBQ0QsS0FBSyxFQUFFLFVBRE47VUFFRCxJQUFJLEVBQUU7UUFGTCxDQURIO1FBS0YsR0FBRyxFQUFFO1VBQ0QsS0FBSyxFQUFFLGFBRE47VUFFRCxJQUFJLEVBQUU7UUFGTCxDQUxIO1FBU0YsS0FBSyxFQUFFO1VBQ0gsS0FBSyxFQUFFLGNBREo7VUFFSCxJQUFJLEVBQUU7UUFGSCxDQVRMO1FBYUYsSUFBSSxFQUFFO1VBQ0YsS0FBSyxFQUFFLGFBREw7VUFFRixJQUFJLEVBQUU7UUFGSjtNQWJKO0lBdkRRLENBQWxCO0lBMEVBLEtBQUssV0FBTCxHQUFtQixPQUFuQjtJQUVBLEtBQUssSUFBTDtFQUNIOzs7O1dBRUQsZ0JBQU87TUFBQTs7TUFDSCxJQUFJLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLElBQXhCLEVBQThCLEtBQUssVUFBTDs7TUFFOUIsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsWUFBTTtRQUNsQixNQUFJLENBQUMsU0FBTDtNQUNILENBRkQ7SUFHSDs7O1dBRUQsd0JBQWU7TUFDWCxJQUFHLEtBQUssTUFBTCxJQUFlLE1BQU0sQ0FBQyxVQUFQLElBQXFCLElBQXZDLEVBQTZDLEtBQUssa0JBQUw7O01BQzdDLElBQUcsQ0FBQyxLQUFLLE1BQU4sSUFBZ0IsTUFBTSxDQUFDLFVBQVAsR0FBb0IsSUFBdkMsRUFBNkM7UUFDeEMsS0FBSyxVQUFMO01BQ0o7SUFDSjs7O1dBRUQsNkJBQXdCO01BQUEsSUFBVCxNQUFTLFFBQVQsTUFBUztNQUNwQixJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBUCxDQUFlLEtBQUssU0FBTCxDQUFlLFNBQTlCLENBQXBCOztNQUVBLElBQUcsV0FBSCxFQUFnQjtRQUNaLEtBQUssZ0JBQUwsQ0FBc0IsV0FBdEI7TUFDSDtJQUNKOzs7V0FFRCwwQkFBaUIsV0FBakIsRUFBOEI7TUFBQTs7TUFDMUIsS0FBSyxjQUFMLENBQW9CLE9BQXBCLENBQTRCLFVBQUEsSUFBSSxFQUFJO1FBQ2hDLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZixDQUFzQiw0QkFBdEI7O1FBQ0EsTUFBSSxDQUFDLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsTUFBM0IsMkJBQXFELElBQUksQ0FBQyxPQUFMLENBQWEsU0FBbEU7O1FBR0EsSUFBRyxJQUFJLEtBQUssV0FBWixFQUF5QjtVQUNyQixJQUFJLENBQUMsU0FBTCxDQUFlLEdBQWYsQ0FBbUIsNEJBQW5COztVQUNBLE1BQUksQ0FBQyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLEdBQTNCLDJCQUFrRCxJQUFJLENBQUMsT0FBTCxDQUFhLFNBQS9EOztVQUVBLE1BQUksQ0FBQyxXQUFMLENBQWlCLGdCQUFqQixDQUFrQyxxQkFBbEMsRUFBeUQsT0FBekQsQ0FBaUUsVUFBQyxjQUFELEVBQWlCLElBQWpCLEVBQTBCO1lBQ3ZGLFFBQVEsSUFBUjtjQUNJLEtBQUssQ0FBTDtnQkFDSSxjQUFjLENBQUMsYUFBZixDQUE2Qiw4QkFBN0IsRUFBNkQsU0FBN0QsR0FBeUUsTUFBSSxDQUFDLFVBQUwsQ0FBZ0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUE3QixFQUF3QyxLQUF4QyxFQUErQyxLQUF4SDtnQkFDQSxjQUFjLENBQUMsYUFBZixDQUE2QiwwQkFBN0IsRUFBeUQsU0FBekQsR0FBcUUsTUFBSSxDQUFDLFVBQUwsQ0FBZ0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUE3QixFQUF3QyxLQUF4QyxFQUErQyxJQUFwSDtnQkFDQTs7Y0FFSixLQUFLLENBQUw7Z0JBQ0ksY0FBYyxDQUFDLGFBQWYsQ0FBNkIsOEJBQTdCLEVBQTZELFNBQTdELEdBQXlFLE1BQUksQ0FBQyxVQUFMLENBQWdCLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBN0IsRUFBd0MsS0FBeEMsRUFBK0MsS0FBeEg7Z0JBQ0EsY0FBYyxDQUFDLGFBQWYsQ0FBNkIsMEJBQTdCLEVBQXlELFNBQXpELEdBQXFFLE1BQUksQ0FBQyxVQUFMLENBQWdCLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBN0IsRUFBd0MsS0FBeEMsRUFBK0MsSUFBcEg7Z0JBQ0E7O2NBRUosS0FBSyxDQUFMO2dCQUNJLGNBQWMsQ0FBQyxhQUFmLENBQTZCLDhCQUE3QixFQUE2RCxTQUE3RCxHQUF5RSxNQUFJLENBQUMsVUFBTCxDQUFnQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQTdCLEVBQXdDLE9BQXhDLEVBQWlELEtBQTFIO2dCQUNBLGNBQWMsQ0FBQyxhQUFmLENBQTZCLDBCQUE3QixFQUF5RCxTQUF6RCxHQUFxRSxNQUFJLENBQUMsVUFBTCxDQUFnQixJQUFJLENBQUMsT0FBTCxDQUFhLFNBQTdCLEVBQXdDLE9BQXhDLEVBQWlELElBQXRIO2dCQUNBOztjQUVKLEtBQUssQ0FBTDtnQkFDSSxjQUFjLENBQUMsYUFBZixDQUE2Qiw4QkFBN0IsRUFBNkQsU0FBN0QsR0FBeUUsTUFBSSxDQUFDLFVBQUwsQ0FBZ0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUE3QixFQUF3QyxNQUF4QyxFQUFnRCxLQUF6SDtnQkFDQSxjQUFjLENBQUMsYUFBZixDQUE2QiwwQkFBN0IsRUFBeUQsU0FBekQsR0FBcUUsTUFBSSxDQUFDLFVBQUwsQ0FBZ0IsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUE3QixFQUF3QyxNQUF4QyxFQUFnRCxJQUFySDtnQkFDQTs7Y0FFSjtnQkFDSTtZQXRCUjtVQXdCSCxDQXpCRDtRQTBCSDtNQUNKLENBcENEO0lBcUNIOzs7V0FFRCxzQkFBYTtNQUFBOztNQUNULEtBQUssTUFBTCxHQUFjLElBQUksd0JBQUosQ0FBVyxLQUFLLFNBQUwsQ0FBZSxZQUExQixFQUF3QztRQUNsRCxXQUFXLEVBQUU7VUFDVCxLQUFLO1lBQ0QsYUFBYSxFQUFFLEdBRGQ7WUFFRCxZQUFZLEVBQUU7VUFGYixDQURJO1VBS1QsS0FBSztZQUNELGFBQWEsRUFBRSxHQURkO1lBRUQsWUFBWSxFQUFFO1VBRmIsQ0FMSTtVQVNULEtBQUs7WUFDRCxhQUFhLEVBQUUsR0FEZDtZQUVELFlBQVksRUFBRTtVQUZiLENBVEk7VUFhVCxLQUFLO1lBQ0QsYUFBYSxFQUFFLENBRGQ7WUFFRCxZQUFZLEVBQUU7VUFGYixDQWJJO1VBaUJULEtBQUs7WUFDRCxhQUFhLEVBQUUsR0FEZDtZQUVELFlBQVksRUFBRTtVQUZiLENBakJJO1VBcUJULEtBQUs7WUFDRCxhQUFhLEVBQUUsR0FEZDtZQUVELFlBQVksRUFBRTtVQUZiLENBckJJO1VBeUJULE1BQU07WUFDRixhQUFhLEVBQUUsQ0FEYjtZQUVGLFlBQVksRUFBRTtVQUZaO1FBekJHLENBRHFDO1FBZ0NsRCxFQUFFLEVBQUU7VUFDQSxpQkFBaUIsRUFBRSw2QkFBTTtZQUNyQixNQUFJLENBQUMsZ0JBQUwsQ0FBc0IsTUFBSSxDQUFDLGNBQUwsQ0FBb0IsTUFBSSxDQUFDLE1BQUwsQ0FBWSxXQUFoQyxDQUF0QjtVQUNIO1FBSEQ7TUFoQzhDLENBQXhDLENBQWQ7SUFzQ0g7OztXQUVELDhCQUFxQjtNQUNqQixLQUFLLE1BQUwsQ0FBWSxPQUFaO01BQ0EsS0FBSyxNQUFMLEdBQWMsSUFBZDtJQUNIOzs7V0FFRCxxQkFBWTtNQUNSLElBQUksR0FBRyxHQUFHLENBQVY7O01BRFEsMkNBRVMsS0FBSyxXQUZkO01BQUE7O01BQUE7UUFFUixvREFBbUM7VUFBQSxJQUExQixLQUEwQjtVQUMvQixLQUFLLGVBQUwsQ0FBcUIsS0FBckIsRUFBMkIsR0FBM0I7VUFDQSxHQUFHO1FBQ047TUFMTztRQUFBO01BQUE7UUFBQTtNQUFBO0lBTVg7OztXQUVELHlCQUFnQixNQUFoQixFQUFzQixHQUF0QixFQUEwQjtNQUFBOztNQUN0QixVQUFVLENBQUMsWUFBTTtRQUNiLE1BQUksQ0FBQyxXQUFMLENBQWlCLFNBQWpCLElBQThCLE1BQTlCO01BQ0gsQ0FGUyxFQUVQLE1BQU0sR0FGQyxDQUFWO0lBR0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM3TmdCLFE7RUFDakIsa0JBQVksT0FBWixFQUFxQjtJQUFBOztJQUNqQixLQUFLLFlBQUwsR0FBb0IsT0FBTyxDQUFDLFlBQVIsSUFBd0IsRUFBNUM7SUFDQSxLQUFLLGlCQUFMLEdBQXlCLE9BQU8sQ0FBQyxpQkFBUixJQUE2QixFQUF0RDtJQUNBLEtBQUssYUFBTCxHQUFxQixPQUFPLENBQUMsYUFBUixJQUF5QixFQUE5QztJQUNBLEtBQUssSUFBTCxHQUFZLE9BQU8sQ0FBQyxJQUFSLElBQWdCLEtBQTVCO0lBRUEsS0FBSyxjQUFMO0VBQ0g7Ozs7V0FFRCwwQkFBaUI7TUFFYixJQUFHLEtBQUssVUFBTCxFQUFILEVBQXNCO01BRXRCLElBQUcsS0FBSyxJQUFMLEtBQWMsU0FBakIsRUFBNEIsS0FBSyxtQkFBTDtNQUM1QixJQUFHLEtBQUssSUFBTCxLQUFjLGVBQWpCLEVBQWtDLEtBQUssa0JBQUw7SUFFckM7OztXQUVELCtCQUFzQjtNQUFBOztNQUNsQixLQUFLLFdBQUwsR0FBbUIsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBSyxZQUE1QixDQUFuQjtNQUVBLEtBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsV0FBbEMsRUFBK0MsVUFBQSxDQUFDLEVBQUk7UUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQUYsR0FBWSxNQUFNLENBQUMsVUFBM0I7UUFDQSxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUFJLENBQUMsaUJBQTVCLEVBQStDLEtBQS9DLENBQXFELFNBQXJELEdBQWlFLGdCQUFnQixDQUFDLEdBQUcsRUFBcEIsR0FBeUIsS0FBMUY7O1FBRUEsS0FBSSxDQUFDLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsVUFBQSxJQUFJLEVBQUk7VUFFL0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBSSxDQUFDLFFBQTVCLEVBQXNDLEtBQXRDLENBQTRDLFNBQTVDLEdBQXdELGdCQUFnQixDQUFDLEdBQUcsRUFBcEIsR0FBeUIsS0FBekIsR0FBaUMsSUFBSSxDQUFDLGdCQUE5RjtRQUNILENBSEQ7TUFJSCxDQVJEO0lBU0g7OztXQUVELDhCQUFxQjtNQUFBOztNQUNqQixLQUFLLFdBQUwsR0FBbUIsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBSyxZQUE1QixDQUFuQjtNQUVBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixFQUFvQyxVQUFBLENBQUMsRUFBSTtRQUNyQyxJQUFNLFFBQVEsR0FBRyxNQUFJLENBQUMsV0FBTCxDQUFpQixxQkFBakIsRUFBakI7O1FBRUEsSUFBTSxXQUFXLEdBQUksUUFBUSxDQUFDLEdBQVQsR0FBZSxHQUFoQixHQUF1QixNQUFNLENBQUMsV0FBOUIsR0FBNEMsQ0FBaEU7O1FBRUEsTUFBSSxDQUFDLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsVUFBQSxJQUFJLEVBQUk7VUFFL0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBSSxDQUFDLFFBQTVCLEVBQXNDLEtBQXRDLENBQTRDLEdBQTVDLGFBQXFELFdBQXJEO1FBQ0gsQ0FIRDtNQUtILENBVkQ7SUFXSDs7O1dBRUQsc0JBQWE7TUFFVCxJQUFHLENBQUMsS0FBSyxZQUFMLENBQWtCLE1BQXRCLEVBQTZCO1FBQ3pCLE9BQU8sQ0FBQyxLQUFSLENBQWMsK0JBQWQ7UUFDQSxPQUFPLElBQVA7TUFDSDtJQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDdkRnQixLO0VBQ2pCLGVBQVksT0FBWixFQUFxQjtJQUFBOztJQUNqQixLQUFLLGFBQUwsR0FBcUIsT0FBTyxDQUFDLGFBQTdCO0lBQ0EsS0FBSyxZQUFMLEdBQW9CLE9BQU8sQ0FBQyxZQUE1QjtJQUVBLEtBQUssV0FBTCxHQUFtQixRQUFRLENBQUMsYUFBVCxDQUF1QixLQUFLLFlBQTVCLENBQW5CO0lBQ0EsS0FBSyxZQUFMLEdBQW9CLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQUssYUFBNUIsQ0FBcEI7SUFDQSxLQUFLLGFBQUwsR0FBcUIsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBckI7SUFFQSxLQUFLLGNBQUwsR0FBc0IsSUFBdEI7SUFFQSxLQUFLLElBQUw7RUFDSDs7OztXQUVELGdCQUFPO01BQ0gsS0FBSyxrQkFBTDtNQUNBLEtBQUssY0FBTDtJQUNIOzs7V0FFRCwwQkFBaUI7TUFBQTs7TUFDYixLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLFlBQU07UUFDN0MsS0FBSSxDQUFDLFNBQUw7TUFDSCxDQUZEO0lBR0g7OztXQUVELDJCQUFrQjtNQUFBOztNQUNkLEtBQUssY0FBTCxDQUFvQixhQUFwQixDQUFrQyxjQUFsQyxFQUFrRCxnQkFBbEQsQ0FBbUUsT0FBbkUsRUFBNEUsWUFBTTtRQUM5RSxNQUFJLENBQUMsY0FBTCxDQUFvQixNQUFwQjs7UUFDQSxNQUFJLENBQUMsYUFBTCxDQUFtQixTQUFuQixDQUE2QixNQUE3QixDQUFvQyxTQUFwQztNQUNILENBSEQ7SUFJSDs7O1dBRUQsOEJBQXFCO01BQ2pCLEtBQUssY0FBTCxHQUFzQixRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUF0QjtNQUNBLEtBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixHQUE5QixDQUFrQyxlQUFsQztNQUNBLEtBQUssY0FBTCxDQUFvQixrQkFBcEIsQ0FBdUMsV0FBdkMsRUFBb0QsbUNBQXBEO01BRUEsS0FBSyxjQUFMLENBQW9CLE1BQXBCLENBQTJCLEtBQUssWUFBaEM7SUFDSDs7O1dBRUQscUJBQVk7TUFDUixLQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsS0FBSyxjQUEvQjtNQUNBLEtBQUssWUFBTCxDQUFrQixTQUFsQixDQUE0QixNQUE1QixDQUFtQyxZQUFuQztNQUNBLEtBQUssYUFBTCxDQUFtQixTQUFuQixDQUE2QixHQUE3QixDQUFpQyxTQUFqQztNQUVBLEtBQUssZUFBTDtJQUNIOzs7Ozs7Ozs7Ozs7O0FDOUNMOztBQUNBOztBQUNBOztBQUNBOzs7OytDQUZBLG9KOzs7Ozs7Ozs7Ozs7OztJQUlNLEk7RUFDRixnQkFBYztJQUFBOztJQUFBLDJHQWlGRjtNQUFBO01BQUE7UUFBQTtVQUFBO1lBQUE7Y0FDRixLQURFLEdBQ00sSUFBSSxpQkFBSixDQUFVO2dCQUNwQixhQUFhLEVBQUUsdUJBREs7Z0JBRXBCLFlBQVksRUFBRTtjQUZNLENBQVYsQ0FETjs7WUFBQTtZQUFBO2NBQUE7VUFBQTtRQUFBO01BQUE7SUFBQSxDQWpGRTtFQUNiOzs7O1dBRUQsZ0JBQU07TUFDRixLQUFLLFNBQUw7TUFDQSxLQUFLLFVBQUw7TUFDQSxLQUFLLFlBQUw7TUFDQSxLQUFLLFNBQUw7TUFDQSxLQUFLLFVBQUw7SUFDSDs7O1dBRUQscUJBQVk7TUFDUixLQUFLLGFBQUw7TUFFQSxLQUFLLFdBQUw7SUFDSDs7O1dBRUQseUJBQWdCO01BQ1osSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBaEI7TUFDQSxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixDQUFsQjtNQUVBLE9BQU8sQ0FBQyxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxZQUFNO1FBQ3BDLFNBQVMsQ0FBQyxTQUFWLENBQW9CLFNBQVMsQ0FBQyxTQUFWLENBQW9CLFFBQXBCLENBQTZCLFlBQTdCLElBQTZDLFFBQTdDLEdBQXdELEtBQTVFLEVBQW1GLFlBQW5GO01BQ0gsQ0FGRDtJQUdIOzs7V0FFRCx1QkFBYztNQUNWLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixjQUExQixDQUFoQjtNQUVBLE9BQU8sQ0FBQyxPQUFSLENBQWdCLFVBQUMsTUFBRCxFQUFZO1FBQ3hCLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFVLENBQVYsRUFBYTtVQUMxQyxDQUFDLENBQUMsY0FBRjtVQUVBLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFQLENBQW9CLE1BQXBCLEVBQTRCLE1BQTVCLENBQW1DLENBQW5DLENBQWhCO1VBRUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUMsY0FBakMsQ0FBZ0Q7WUFDNUMsUUFBUSxFQUFFLFFBRGtDO1lBRTVDLEtBQUssRUFBRTtVQUZxQyxDQUFoRDtRQUlILENBVEQ7TUFVSCxDQVhEO0lBWUg7OztXQUVELHNCQUFhO01BQ1QsSUFBTSxNQUFNLEdBQUUsSUFBSSxrQkFBSixFQUFkO0lBQ0g7OztXQUVELHdCQUFlO01BQ1gsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBSixDQUFhO1FBQzFCLFlBQVksRUFBRSx3QkFEWTtRQUUxQixpQkFBaUIsRUFBRSxpQkFGTztRQUcxQixhQUFhLEVBQUUsQ0FBQztVQUNaLFFBQVEsRUFBRSxvQkFERTtVQUVaLGdCQUFnQixFQUFFO1FBRk4sQ0FBRCxFQUdaO1VBQ0MsUUFBUSxFQUFFLG9CQURYO1VBRUMsZ0JBQWdCLEVBQUU7UUFGbkIsQ0FIWSxDQUhXO1FBVTFCLElBQUksRUFBRTtNQVZvQixDQUFiLENBQWpCO01BYUEsSUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBSixDQUFhO1FBQzdCLFlBQVksRUFBRSwrQkFEZTtRQUU3QixpQkFBaUIsRUFBRSx3QkFGVTtRQUc3QixhQUFhLEVBQUUsQ0FBQztVQUNaLFFBQVEsRUFBRSwyQkFERTtVQUVaLGdCQUFnQixFQUFFO1FBRk4sQ0FBRCxDQUhjO1FBTzdCLElBQUksRUFBRTtNQVB1QixDQUFiLENBQXBCO01BVUEsSUFBTSxhQUFhLEdBQUcsSUFBSSxvQkFBSixDQUFhO1FBQy9CLFlBQVksRUFBRSxrQkFEaUI7UUFFL0IsYUFBYSxFQUFFLENBQUM7VUFDWixRQUFRLEVBQUUsd0JBREU7VUFFWixnQkFBZ0IsRUFBRTtRQUZOLENBQUQsQ0FGZ0I7UUFNL0IsSUFBSSxFQUFFO01BTnlCLENBQWIsQ0FBdEI7SUFRSDs7O1dBU0Qsc0JBQWE7TUFDVCxJQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFKLENBQWMsQ0FBQywyQkFBRCxFQUE4Qiw0QkFBOUIsRUFBNEQsMEJBQTVELEVBQXdGLDBCQUF4RixDQUFkLENBQWY7SUFDSDs7Ozs7O0FBR0wsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFKLEVBQWI7QUFDQSxJQUFJLENBQUMsSUFBTDs7Ozs7Ozs7Ozs7Ozs7OztJQ3BHYSxTO0VBQ1QsbUJBQVksU0FBWixFQUF1QjtJQUFBOztJQUNuQixLQUFLLFlBQUwsR0FBb0IsU0FBUyxJQUFJLEVBQWpDO0lBRUEsS0FBSyxJQUFMO0VBQ0g7Ozs7V0FFRCxnQkFBTztNQUFBOztNQUNILElBQUcsS0FBSyxZQUFMLENBQWtCLE1BQWxCLEtBQTZCLENBQWhDLEVBQW1DO1FBQy9CLE9BQU8sQ0FBQyxJQUFSLENBQWEsMENBQWI7UUFDQTtNQUNIOztNQUVGLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixFQUFvQztRQUFBLE9BQU0sS0FBSSxDQUFDLFdBQUwsRUFBTjtNQUFBLENBQXBDO0lBQ0Y7OztXQUVELHVCQUFjO01BQ1YsS0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLFVBQUEsSUFBSSxFQUFJO1FBQzlCLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXJCO1FBQ0EsSUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLHFCQUFiLEdBQXFDLEdBQTdEOztRQUVBLElBQUcsZUFBZSxJQUFJLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLEVBQTNDLEVBQStDO1VBQzNDLFlBQVksQ0FBQyxTQUFiLENBQXVCLE1BQXZCLENBQThCLGFBQTlCO1FBQ0g7TUFFSixDQVJEO0lBU0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIFN3aXBlciA4LjQuM1xuICogTW9zdCBtb2Rlcm4gbW9iaWxlIHRvdWNoIHNsaWRlciBhbmQgZnJhbWV3b3JrIHdpdGggaGFyZHdhcmUgYWNjZWxlcmF0ZWQgdHJhbnNpdGlvbnNcbiAqIGh0dHBzOi8vc3dpcGVyanMuY29tXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAyMiBWbGFkaW1pciBLaGFybGFtcGlkaVxuICpcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICpcbiAqIFJlbGVhc2VkIG9uOiBPY3RvYmVyIDYsIDIwMjJcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5Td2lwZXIgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogU1NSIFdpbmRvdyA0LjAuMlxuICAgICAqIEJldHRlciBoYW5kbGluZyBmb3Igd2luZG93IG9iamVjdCBpbiBTU1IgZW52aXJvbm1lbnRcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbm9saW1pdHM0d2ViL3Nzci13aW5kb3dcbiAgICAgKlxuICAgICAqIENvcHlyaWdodCAyMDIxLCBWbGFkaW1pciBLaGFybGFtcGlkaVxuICAgICAqXG4gICAgICogTGljZW5zZWQgdW5kZXIgTUlUXG4gICAgICpcbiAgICAgKiBSZWxlYXNlZCBvbjogRGVjZW1iZXIgMTMsIDIwMjFcbiAgICAgKi9cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgZnVuY3Rpb24gaXNPYmplY3QkMShvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvYmogJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kJDEodGFyZ2V0LCBzcmMpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuICAgICAgICB0YXJnZXQgPSB7fTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNyYyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHNyYyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHRhcmdldFtrZXldID0gc3JjW2tleV07ZWxzZSBpZiAoaXNPYmplY3QkMShzcmNba2V5XSkgJiYgaXNPYmplY3QkMSh0YXJnZXRba2V5XSkgJiYgT2JqZWN0LmtleXMoc3JjW2tleV0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBleHRlbmQkMSh0YXJnZXRba2V5XSwgc3JjW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBzc3JEb2N1bWVudCA9IHtcbiAgICAgIGJvZHk6IHt9LFxuXG4gICAgICBhZGRFdmVudExpc3RlbmVyKCkge30sXG5cbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fSxcblxuICAgICAgYWN0aXZlRWxlbWVudDoge1xuICAgICAgICBibHVyKCkge30sXG5cbiAgICAgICAgbm9kZU5hbWU6ICcnXG4gICAgICB9LFxuXG4gICAgICBxdWVyeVNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG5cbiAgICAgIHF1ZXJ5U2VsZWN0b3JBbGwoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0sXG5cbiAgICAgIGdldEVsZW1lbnRCeUlkKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG5cbiAgICAgIGNyZWF0ZUV2ZW50KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluaXRFdmVudCgpIHt9XG5cbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgIGNoaWxkTm9kZXM6IFtdLFxuICAgICAgICAgIHN0eWxlOiB7fSxcblxuICAgICAgICAgIHNldEF0dHJpYnV0ZSgpIHt9LFxuXG4gICAgICAgICAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBjcmVhdGVFbGVtZW50TlMoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0sXG5cbiAgICAgIGltcG9ydE5vZGUoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcblxuICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgaGFzaDogJycsXG4gICAgICAgIGhvc3Q6ICcnLFxuICAgICAgICBob3N0bmFtZTogJycsXG4gICAgICAgIGhyZWY6ICcnLFxuICAgICAgICBvcmlnaW46ICcnLFxuICAgICAgICBwYXRobmFtZTogJycsXG4gICAgICAgIHByb3RvY29sOiAnJyxcbiAgICAgICAgc2VhcmNoOiAnJ1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXREb2N1bWVudCgpIHtcbiAgICAgIGNvbnN0IGRvYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IHt9O1xuICAgICAgZXh0ZW5kJDEoZG9jLCBzc3JEb2N1bWVudCk7XG4gICAgICByZXR1cm4gZG9jO1xuICAgIH1cblxuICAgIGNvbnN0IHNzcldpbmRvdyA9IHtcbiAgICAgIGRvY3VtZW50OiBzc3JEb2N1bWVudCxcbiAgICAgIG5hdmlnYXRvcjoge1xuICAgICAgICB1c2VyQWdlbnQ6ICcnXG4gICAgICB9LFxuICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgaGFzaDogJycsXG4gICAgICAgIGhvc3Q6ICcnLFxuICAgICAgICBob3N0bmFtZTogJycsXG4gICAgICAgIGhyZWY6ICcnLFxuICAgICAgICBvcmlnaW46ICcnLFxuICAgICAgICBwYXRobmFtZTogJycsXG4gICAgICAgIHByb3RvY29sOiAnJyxcbiAgICAgICAgc2VhcmNoOiAnJ1xuICAgICAgfSxcbiAgICAgIGhpc3Rvcnk6IHtcbiAgICAgICAgcmVwbGFjZVN0YXRlKCkge30sXG5cbiAgICAgICAgcHVzaFN0YXRlKCkge30sXG5cbiAgICAgICAgZ28oKSB7fSxcblxuICAgICAgICBiYWNrKCkge31cblxuICAgICAgfSxcbiAgICAgIEN1c3RvbUV2ZW50OiBmdW5jdGlvbiBDdXN0b21FdmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuXG4gICAgICBhZGRFdmVudExpc3RlbmVyKCkge30sXG5cbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fSxcblxuICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBnZXRQcm9wZXJ0eVZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgSW1hZ2UoKSB7fSxcblxuICAgICAgRGF0ZSgpIHt9LFxuXG4gICAgICBzY3JlZW46IHt9LFxuXG4gICAgICBzZXRUaW1lb3V0KCkge30sXG5cbiAgICAgIGNsZWFyVGltZW91dCgpIHt9LFxuXG4gICAgICBtYXRjaE1lZGlhKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9LFxuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgICB9LFxuXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShpZCkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgIH1cblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gICAgICBjb25zdCB3aW4gPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9O1xuICAgICAgZXh0ZW5kJDEod2luLCBzc3JXaW5kb3cpO1xuICAgICAgcmV0dXJuIHdpbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb203IDQuMC40XG4gICAgICogTWluaW1hbGlzdGljIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgRE9NIG1hbmlwdWxhdGlvbiwgd2l0aCBhIGpRdWVyeS1jb21wYXRpYmxlIEFQSVxuICAgICAqIGh0dHBzOi8vZnJhbWV3b3JrNy5pby9kb2NzL2RvbTcuaHRtbFxuICAgICAqXG4gICAgICogQ29weXJpZ2h0IDIwMjIsIFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gICAgICpcbiAgICAgKiBMaWNlbnNlZCB1bmRlciBNSVRcbiAgICAgKlxuICAgICAqIFJlbGVhc2VkIG9uOiBKYW51YXJ5IDExLCAyMDIyXG4gICAgICovXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuICAgIGZ1bmN0aW9uIG1ha2VSZWFjdGl2ZShvYmopIHtcbiAgICAgIGNvbnN0IHByb3RvID0gb2JqLl9fcHJvdG9fXztcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX3Byb3RvX18nLCB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgcHJvdG8uX19wcm90b19fID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xhc3MgRG9tNyBleHRlbmRzIEFycmF5IHtcbiAgICAgIGNvbnN0cnVjdG9yKGl0ZW1zKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgc3VwZXIoaXRlbXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyKC4uLihpdGVtcyB8fCBbXSkpO1xuICAgICAgICAgIG1ha2VSZWFjdGl2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJyYXlGbGF0KGFycikge1xuICAgICAgaWYgKGFyciA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgIGFyci5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKSB7XG4gICAgICAgICAgcmVzLnB1c2goLi4uYXJyYXlGbGF0KGVsKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzLnB1c2goZWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJyYXlGaWx0ZXIoYXJyLCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChhcnIsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcnJheVVuaXF1ZShhcnIpIHtcbiAgICAgIGNvbnN0IHVuaXF1ZUFycmF5ID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh1bmlxdWVBcnJheS5pbmRleE9mKGFycltpXSkgPT09IC0xKSB1bmlxdWVBcnJheS5wdXNoKGFycltpXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmlxdWVBcnJheTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHFzYShzZWxlY3RvciwgY29udGV4dCkge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIFtzZWxlY3Rvcl07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGEgPSBbXTtcbiAgICAgIGNvbnN0IHJlcyA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGEucHVzaChyZXNbaV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiAkKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGxldCBhcnIgPSBbXTtcblxuICAgICAgaWYgKCFjb250ZXh0ICYmIHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb203KGFycik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBzZWxlY3Rvci50cmltKCk7XG5cbiAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPCcpID49IDAgJiYgaHRtbC5pbmRleE9mKCc+JykgPj0gMCkge1xuICAgICAgICAgIGxldCB0b0NyZWF0ZSA9ICdkaXYnO1xuICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxsaScpID09PSAwKSB0b0NyZWF0ZSA9ICd1bCc7XG4gICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRyJykgPT09IDApIHRvQ3JlYXRlID0gJ3Rib2R5JztcbiAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dGQnKSA9PT0gMCB8fCBodG1sLmluZGV4T2YoJzx0aCcpID09PSAwKSB0b0NyZWF0ZSA9ICd0cic7XG4gICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRib2R5JykgPT09IDApIHRvQ3JlYXRlID0gJ3RhYmxlJztcbiAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8b3B0aW9uJykgPT09IDApIHRvQ3JlYXRlID0gJ3NlbGVjdCc7XG4gICAgICAgICAgY29uc3QgdGVtcFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodG9DcmVhdGUpO1xuICAgICAgICAgIHRlbXBQYXJlbnQuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcFBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh0ZW1wUGFyZW50LmNoaWxkTm9kZXNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnIgPSBxc2Eoc2VsZWN0b3IudHJpbSgpLCBjb250ZXh0IHx8IGRvY3VtZW50KTtcbiAgICAgICAgfSAvLyBhcnIgPSBxc2Eoc2VsZWN0b3IsIGRvY3VtZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciA9PT0gd2luZG93IHx8IHNlbGVjdG9yID09PSBkb2N1bWVudCkge1xuICAgICAgICBhcnIucHVzaChzZWxlY3Rvcik7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0b3IpKSB7XG4gICAgICAgIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHJldHVybiBzZWxlY3RvcjtcbiAgICAgICAgYXJyID0gc2VsZWN0b3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgRG9tNyhhcnJheVVuaXF1ZShhcnIpKTtcbiAgICB9XG5cbiAgICAkLmZuID0gRG9tNy5wcm90b3R5cGU7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG4gICAgZnVuY3Rpb24gYWRkQ2xhc3MoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2xhc3NlcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgY2xhc3Nlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IGFycmF5RmxhdChjbGFzc2VzLm1hcChjID0+IGMuc3BsaXQoJyAnKSkpO1xuICAgICAgdGhpcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNsYXNzZXMgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgY2xhc3Nlc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjbGFzc05hbWVzID0gYXJyYXlGbGF0KGNsYXNzZXMubWFwKGMgPT4gYy5zcGxpdCgnICcpKSk7XG4gICAgICB0aGlzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzTmFtZXMpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVDbGFzcygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgY2xhc3NlcyA9IG5ldyBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICBjbGFzc2VzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBhcnJheUZsYXQoY2xhc3Nlcy5tYXAoYyA9PiBjLnNwbGl0KCcgJykpKTtcbiAgICAgIHRoaXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGNsYXNzTmFtZXMuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNDbGFzcygpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgY2xhc3NlcyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBjbGFzc2VzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBhcnJheUZsYXQoY2xhc3Nlcy5tYXAoYyA9PiBjLnNwbGl0KCcgJykpKTtcbiAgICAgIHJldHVybiBhcnJheUZpbHRlcih0aGlzLCBlbCA9PiB7XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzLmZpbHRlcihjbGFzc05hbWUgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpLmxlbmd0aCA+IDA7XG4gICAgICB9KS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF0dHIoYXR0cnMsIHZhbHVlKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXR0cnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIEdldCBhdHRyXG4gICAgICAgIGlmICh0aGlzWzBdKSByZXR1cm4gdGhpc1swXS5nZXRBdHRyaWJ1dGUoYXR0cnMpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfSAvLyBTZXQgYXR0cnNcblxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAvLyBTdHJpbmdcbiAgICAgICAgICB0aGlzW2ldLnNldEF0dHJpYnV0ZShhdHRycywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE9iamVjdFxuICAgICAgICAgIGZvciAoY29uc3QgYXR0ck5hbWUgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgIHRoaXNbaV1bYXR0ck5hbWVdID0gYXR0cnNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgdGhpc1tpXS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJzW2F0dHJOYW1lXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0dHIoYXR0cikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXNbaV0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpc1tpXS5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb24kMShkdXJhdGlvbikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXNbaV0uc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gdHlwZW9mIGR1cmF0aW9uICE9PSAnc3RyaW5nJyA/IGAke2R1cmF0aW9ufW1zYCA6IGR1cmF0aW9uO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbigpIHtcbiAgICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNSksIF9rZXk1ID0gMDsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgICBhcmdzW19rZXk1XSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gICAgICB9XG5cbiAgICAgIGxldCBbZXZlbnRUeXBlLCB0YXJnZXRTZWxlY3RvciwgbGlzdGVuZXIsIGNhcHR1cmVdID0gYXJncztcblxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIFtldmVudFR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlXSA9IGFyZ3M7XG4gICAgICAgIHRhcmdldFNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNhcHR1cmUpIGNhcHR1cmUgPSBmYWxzZTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlTGl2ZUV2ZW50KGUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgICAgIGNvbnN0IGV2ZW50RGF0YSA9IGUudGFyZ2V0LmRvbTdFdmVudERhdGEgfHwgW107XG5cbiAgICAgICAgaWYgKGV2ZW50RGF0YS5pbmRleE9mKGUpIDwgMCkge1xuICAgICAgICAgIGV2ZW50RGF0YS51bnNoaWZ0KGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQodGFyZ2V0KS5pcyh0YXJnZXRTZWxlY3RvcikpIGxpc3RlbmVyLmFwcGx5KHRhcmdldCwgZXZlbnREYXRhKTtlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRzID0gJCh0YXJnZXQpLnBhcmVudHMoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBwYXJlbnRzLmxlbmd0aDsgayArPSAxKSB7XG4gICAgICAgICAgICBpZiAoJChwYXJlbnRzW2tdKS5pcyh0YXJnZXRTZWxlY3RvcikpIGxpc3RlbmVyLmFwcGx5KHBhcmVudHNba10sIGV2ZW50RGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGUpIHtcbiAgICAgICAgY29uc3QgZXZlbnREYXRhID0gZSAmJiBlLnRhcmdldCA/IGUudGFyZ2V0LmRvbTdFdmVudERhdGEgfHwgW10gOiBbXTtcblxuICAgICAgICBpZiAoZXZlbnREYXRhLmluZGV4T2YoZSkgPCAwKSB7XG4gICAgICAgICAgZXZlbnREYXRhLnVuc2hpZnQoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBldmVudERhdGEpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBldmVudHMgPSBldmVudFR5cGUuc3BsaXQoJyAnKTtcbiAgICAgIGxldCBqO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzW2ldO1xuXG4gICAgICAgIGlmICghdGFyZ2V0U2VsZWN0b3IpIHtcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZXZlbnRzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgIGlmICghZWwuZG9tN0xpc3RlbmVycykgZWwuZG9tN0xpc3RlbmVycyA9IHt9O1xuICAgICAgICAgICAgaWYgKCFlbC5kb203TGlzdGVuZXJzW2V2ZW50XSkgZWwuZG9tN0xpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgIGVsLmRvbTdMaXN0ZW5lcnNbZXZlbnRdLnB1c2goe1xuICAgICAgICAgICAgICBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgcHJveHlMaXN0ZW5lcjogaGFuZGxlRXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlRXZlbnQsIGNhcHR1cmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBMaXZlIGV2ZW50c1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgaWYgKCFlbC5kb203TGl2ZUxpc3RlbmVycykgZWwuZG9tN0xpdmVMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgICAgIGlmICghZWwuZG9tN0xpdmVMaXN0ZW5lcnNbZXZlbnRdKSBlbC5kb203TGl2ZUxpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgIGVsLmRvbTdMaXZlTGlzdGVuZXJzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgICAgICAgbGlzdGVuZXIsXG4gICAgICAgICAgICAgIHByb3h5TGlzdGVuZXI6IGhhbmRsZUxpdmVFdmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVMaXZlRXZlbnQsIGNhcHR1cmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvZmYoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjYpLCBfa2V5NiA9IDA7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgICAgYXJnc1tfa2V5Nl0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgfVxuXG4gICAgICBsZXQgW2V2ZW50VHlwZSwgdGFyZ2V0U2VsZWN0b3IsIGxpc3RlbmVyLCBjYXB0dXJlXSA9IGFyZ3M7XG5cbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBbZXZlbnRUeXBlLCBsaXN0ZW5lciwgY2FwdHVyZV0gPSBhcmdzO1xuICAgICAgICB0YXJnZXRTZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjYXB0dXJlKSBjYXB0dXJlID0gZmFsc2U7XG4gICAgICBjb25zdCBldmVudHMgPSBldmVudFR5cGUuc3BsaXQoJyAnKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbaV07XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgY29uc3QgZWwgPSB0aGlzW2pdO1xuICAgICAgICAgIGxldCBoYW5kbGVycztcblxuICAgICAgICAgIGlmICghdGFyZ2V0U2VsZWN0b3IgJiYgZWwuZG9tN0xpc3RlbmVycykge1xuICAgICAgICAgICAgaGFuZGxlcnMgPSBlbC5kb203TGlzdGVuZXJzW2V2ZW50XTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldFNlbGVjdG9yICYmIGVsLmRvbTdMaXZlTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBoYW5kbGVycyA9IGVsLmRvbTdMaXZlTGlzdGVuZXJzW2V2ZW50XTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaGFuZGxlcnMgJiYgaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gaGFuZGxlcnMubGVuZ3RoIC0gMTsgayA+PSAwOyBrIC09IDEpIHtcbiAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzW2tdO1xuXG4gICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAmJiBoYW5kbGVyLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIucHJveHlMaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGssIDEpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpc3RlbmVyICYmIGhhbmRsZXIubGlzdGVuZXIgJiYgaGFuZGxlci5saXN0ZW5lci5kb203cHJveHkgJiYgaGFuZGxlci5saXN0ZW5lci5kb203cHJveHkgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlci5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaywgMSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlci5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaywgMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJpZ2dlcigpIHtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuXG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjkpLCBfa2V5OSA9IDA7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OV0gPSBhcmd1bWVudHNbX2tleTldO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBldmVudHMgPSBhcmdzWzBdLnNwbGl0KCcgJyk7XG4gICAgICBjb25zdCBldmVudERhdGEgPSBhcmdzWzFdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tpXTtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IHRoaXNbal07XG5cbiAgICAgICAgICBpZiAod2luZG93LkN1c3RvbUV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBldnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGV2ZW50LCB7XG4gICAgICAgICAgICAgIGRldGFpbDogZXZlbnREYXRhLFxuICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsLmRvbTdFdmVudERhdGEgPSBhcmdzLmZpbHRlcigoZGF0YSwgZGF0YUluZGV4KSA9PiBkYXRhSW5kZXggPiAwKTtcbiAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgICAgIGVsLmRvbTdFdmVudERhdGEgPSBbXTtcbiAgICAgICAgICAgIGRlbGV0ZSBlbC5kb203RXZlbnREYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kJDEoY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IGRvbSA9IHRoaXM7XG5cbiAgICAgIGZ1bmN0aW9uIGZpcmVDYWxsQmFjayhlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGUpO1xuICAgICAgICBkb20ub2ZmKCd0cmFuc2l0aW9uZW5kJywgZmlyZUNhbGxCYWNrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGRvbS5vbigndHJhbnNpdGlvbmVuZCcsIGZpcmVDYWxsQmFjayk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG91dGVyV2lkdGgoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5zdHlsZXMoKTtcbiAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aCArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1yaWdodCcpKSArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1sZWZ0JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG91dGVySGVpZ2h0KGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuc3R5bGVzKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXRvcCcpKSArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1ib3R0b20nKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9mZnNldCgpIHtcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzWzBdO1xuICAgICAgICBjb25zdCBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIGNvbnN0IGNsaWVudFRvcCA9IGVsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgICAgICBjb25zdCBjbGllbnRMZWZ0ID0gZWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gZWwgPT09IHdpbmRvdyA/IHdpbmRvdy5zY3JvbGxZIDogZWwuc2Nyb2xsVG9wO1xuICAgICAgICBjb25zdCBzY3JvbGxMZWZ0ID0gZWwgPT09IHdpbmRvdyA/IHdpbmRvdy5zY3JvbGxYIDogZWwuc2Nyb2xsTGVmdDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b3A6IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3AsXG4gICAgICAgICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHlsZXMoKSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGlmICh0aGlzWzBdKSByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpc1swXSwgbnVsbCk7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3NzKHByb3BzLCB2YWx1ZSkge1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICBsZXQgaTtcblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyAuY3NzKCd3aWR0aCcpXG4gICAgICAgICAgaWYgKHRoaXNbMF0pIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzWzBdLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyAuY3NzKHsgd2lkdGg6ICcxMDBweCcgfSlcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHByb3BzKSB7XG4gICAgICAgICAgICAgIHRoaXNbaV0uc3R5bGVbcHJvcF0gPSBwcm9wc1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIC5jc3MoJ3dpZHRoJywgJzEwMHB4JylcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICB0aGlzW2ldLnN0eWxlW3Byb3BzXSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVhY2goY2FsbGJhY2spIHtcbiAgICAgIGlmICghY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoZWwsIFtlbCwgaW5kZXhdKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhcnJheUZpbHRlcih0aGlzLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gJChyZXN1bHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGh0bWwoaHRtbCkge1xuICAgICAgaWYgKHR5cGVvZiBodG1sID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdGhpc1swXSA/IHRoaXNbMF0uaW5uZXJIVE1MIDogbnVsbDtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXNbaV0uaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGV4dCh0ZXh0KSB7XG4gICAgICBpZiAodHlwZW9mIHRleHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS50ZXh0Q29udGVudC50cmltKCkgOiBudWxsO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpc1tpXS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzKHNlbGVjdG9yKSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGNvbnN0IGVsID0gdGhpc1swXTtcbiAgICAgIGxldCBjb21wYXJlV2l0aDtcbiAgICAgIGxldCBpO1xuICAgICAgaWYgKCFlbCB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChlbC5tYXRjaGVzKSByZXR1cm4gZWwubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWwubXNNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbC5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGNvbXBhcmVXaXRoID0gJChzZWxlY3Rvcik7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbXBhcmVXaXRoLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSBlbCkgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxlY3RvciA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsID09PSBkb2N1bWVudDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yID09PSB3aW5kb3cpIHtcbiAgICAgICAgcmV0dXJuIGVsID09PSB3aW5kb3c7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgY29tcGFyZVdpdGggPSBzZWxlY3Rvci5ub2RlVHlwZSA/IFtzZWxlY3Rvcl0gOiBzZWxlY3RvcjtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29tcGFyZVdpdGgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoY29tcGFyZVdpdGhbaV0gPT09IGVsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluZGV4KCkge1xuICAgICAgbGV0IGNoaWxkID0gdGhpc1swXTtcbiAgICAgIGxldCBpO1xuXG4gICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgaSA9IDA7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG4gICAgICAgIHdoaWxlICgoY2hpbGQgPSBjaGlsZC5wcmV2aW91c1NpYmxpbmcpICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSBpICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcShpbmRleCkge1xuICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiB0aGlzO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG5cbiAgICAgIGlmIChpbmRleCA+IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgcmV0dXJuICQoW10pO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGNvbnN0IHJldHVybkluZGV4ID0gbGVuZ3RoICsgaW5kZXg7XG4gICAgICAgIGlmIChyZXR1cm5JbmRleCA8IDApIHJldHVybiAkKFtdKTtcbiAgICAgICAgcmV0dXJuICQoW3RoaXNbcmV0dXJuSW5kZXhdXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkKFt0aGlzW2luZGV4XV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZCgpIHtcbiAgICAgIGxldCBuZXdDaGlsZDtcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcblxuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBhcmd1bWVudHMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgbmV3Q2hpbGQgPSBrIDwgMCB8fCBhcmd1bWVudHMubGVuZ3RoIDw9IGsgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNba107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdDaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gbmV3Q2hpbGQ7XG5cbiAgICAgICAgICAgIHdoaWxlICh0ZW1wRGl2LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgdGhpc1tpXS5hcHBlbmRDaGlsZCh0ZW1wRGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobmV3Q2hpbGQgaW5zdGFuY2VvZiBEb203KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5ld0NoaWxkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgIHRoaXNbaV0uYXBwZW5kQ2hpbGQobmV3Q2hpbGRbal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGVuZChuZXdDaGlsZCkge1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgbGV0IGk7XG4gICAgICBsZXQgajtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdDaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb25zdCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBuZXdDaGlsZDtcblxuICAgICAgICAgIGZvciAoaiA9IHRlbXBEaXYuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBqID49IDA7IGogLT0gMSkge1xuICAgICAgICAgICAgdGhpc1tpXS5pbnNlcnRCZWZvcmUodGVtcERpdi5jaGlsZE5vZGVzW2pdLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbmV3Q2hpbGQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkW2pdLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzW2ldLmluc2VydEJlZm9yZShuZXdDaGlsZCwgdGhpc1tpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXh0KHNlbGVjdG9yKSB7XG4gICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIGlmICh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZyAmJiAkKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAkKFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZykgcmV0dXJuICQoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgIHJldHVybiAkKFtdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICQoW10pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRBbGwoc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IG5leHRFbHMgPSBbXTtcbiAgICAgIGxldCBlbCA9IHRoaXNbMF07XG4gICAgICBpZiAoIWVsKSByZXR1cm4gJChbXSk7XG5cbiAgICAgIHdoaWxlIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIGlmICgkKG5leHQpLmlzKHNlbGVjdG9yKSkgbmV4dEVscy5wdXNoKG5leHQpO1xuICAgICAgICB9IGVsc2UgbmV4dEVscy5wdXNoKG5leHQpO1xuXG4gICAgICAgIGVsID0gbmV4dDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICQobmV4dEVscyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJldihzZWxlY3Rvcikge1xuICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBlbCA9IHRoaXNbMF07XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgaWYgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgJChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFtlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICQoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHJldHVybiAkKFtlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgIHJldHVybiAkKFtdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICQoW10pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXZBbGwoc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IHByZXZFbHMgPSBbXTtcbiAgICAgIGxldCBlbCA9IHRoaXNbMF07XG4gICAgICBpZiAoIWVsKSByZXR1cm4gJChbXSk7XG5cbiAgICAgIHdoaWxlIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgIGNvbnN0IHByZXYgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgaWYgKCQocHJldikuaXMoc2VsZWN0b3IpKSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgICAgIH0gZWxzZSBwcmV2RWxzLnB1c2gocHJldik7XG5cbiAgICAgICAgZWwgPSBwcmV2O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChwcmV2RWxzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJlbnQoc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IHBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXNbaV0ucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKCQodGhpc1tpXS5wYXJlbnROb2RlKS5pcyhzZWxlY3RvcikpIHBhcmVudHMucHVzaCh0aGlzW2ldLnBhcmVudE5vZGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnRzLnB1c2godGhpc1tpXS5wYXJlbnROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuICQocGFyZW50cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyZW50cyhzZWxlY3Rvcikge1xuICAgICAgY29uc3QgcGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpc1tpXS5wYXJlbnROb2RlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKCQocGFyZW50KS5pcyhzZWxlY3RvcikpIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChwYXJlbnRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG4gICAgICBsZXQgY2xvc2VzdCA9IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuICQoW10pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNsb3Nlc3QuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGNsb3Nlc3QgPSBjbG9zZXN0LnBhcmVudHMoc2VsZWN0b3IpLmVxKDApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2xvc2VzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBmb3VuZEVsZW1lbnRzID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXNbaV0ucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmb3VuZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGZvdW5kRWxlbWVudHMucHVzaChmb3VuZFtqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuICQoZm91bmRFbGVtZW50cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hpbGRyZW4oc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZXMgPSB0aGlzW2ldLmNoaWxkcmVuO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGlmICghc2VsZWN0b3IgfHwgJChjaGlsZE5vZGVzW2pdKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGROb2Rlc1tqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkKGNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXNbaV0ucGFyZW50Tm9kZSkgdGhpc1tpXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXNbaV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25zdCBNZXRob2RzID0ge1xuICAgICAgYWRkQ2xhc3MsXG4gICAgICByZW1vdmVDbGFzcyxcbiAgICAgIGhhc0NsYXNzLFxuICAgICAgdG9nZ2xlQ2xhc3MsXG4gICAgICBhdHRyLFxuICAgICAgcmVtb3ZlQXR0cixcbiAgICAgIHRyYW5zZm9ybSxcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24kMSxcbiAgICAgIG9uLFxuICAgICAgb2ZmLFxuICAgICAgdHJpZ2dlcixcbiAgICAgIHRyYW5zaXRpb25FbmQ6IHRyYW5zaXRpb25FbmQkMSxcbiAgICAgIG91dGVyV2lkdGgsXG4gICAgICBvdXRlckhlaWdodCxcbiAgICAgIHN0eWxlcyxcbiAgICAgIG9mZnNldCxcbiAgICAgIGNzcyxcbiAgICAgIGVhY2gsXG4gICAgICBodG1sLFxuICAgICAgdGV4dCxcbiAgICAgIGlzLFxuICAgICAgaW5kZXgsXG4gICAgICBlcSxcbiAgICAgIGFwcGVuZCxcbiAgICAgIHByZXBlbmQsXG4gICAgICBuZXh0LFxuICAgICAgbmV4dEFsbCxcbiAgICAgIHByZXYsXG4gICAgICBwcmV2QWxsLFxuICAgICAgcGFyZW50LFxuICAgICAgcGFyZW50cyxcbiAgICAgIGNsb3Nlc3QsXG4gICAgICBmaW5kLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBmaWx0ZXIsXG4gICAgICByZW1vdmVcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKE1ldGhvZHMpLmZvckVhY2gobWV0aG9kTmFtZSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoJC5mbiwgbWV0aG9kTmFtZSwge1xuICAgICAgICB2YWx1ZTogTWV0aG9kc1ttZXRob2ROYW1lXSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJvcHMob2JqKSB7XG4gICAgICBjb25zdCBvYmplY3QgPSBvYmo7XG4gICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBvYmplY3Rba2V5XSA9IG51bGw7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsvLyBubyBnZXR0ZXIgZm9yIG9iamVjdFxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsvLyBzb21ldGhpbmcgZ290IHdyb25nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRUaWNrKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICAgICAgZGVsYXkgPSAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgZGVsYXkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vdygpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUkMShlbCkge1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICBsZXQgc3R5bGU7XG5cbiAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgICBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzdHlsZSAmJiBlbC5jdXJyZW50U3R5bGUpIHtcbiAgICAgICAgc3R5bGUgPSBlbC5jdXJyZW50U3R5bGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghc3R5bGUpIHtcbiAgICAgICAgc3R5bGUgPSBlbC5zdHlsZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRyYW5zbGF0ZShlbCwgYXhpcykge1xuICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkge1xuICAgICAgICBheGlzID0gJ3gnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGxldCBtYXRyaXg7XG4gICAgICBsZXQgY3VyVHJhbnNmb3JtO1xuICAgICAgbGV0IHRyYW5zZm9ybU1hdHJpeDtcbiAgICAgIGNvbnN0IGN1clN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSQxKGVsKTtcblxuICAgICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIHtcbiAgICAgICAgY3VyVHJhbnNmb3JtID0gY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLndlYmtpdFRyYW5zZm9ybTtcblxuICAgICAgICBpZiAoY3VyVHJhbnNmb3JtLnNwbGl0KCcsJykubGVuZ3RoID4gNikge1xuICAgICAgICAgIGN1clRyYW5zZm9ybSA9IGN1clRyYW5zZm9ybS5zcGxpdCgnLCAnKS5tYXAoYSA9PiBhLnJlcGxhY2UoJywnLCAnLicpKS5qb2luKCcsICcpO1xuICAgICAgICB9IC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIFdlYmtpdCBjaG9rZSB3aGVuICdub25lJyBpcyBwYXNzZWQ7IHBhc3NcbiAgICAgICAgLy8gZW1wdHkgc3RyaW5nIGluc3RlYWQgaW4gdGhpcyBjYXNlXG5cblxuICAgICAgICB0cmFuc2Zvcm1NYXRyaXggPSBuZXcgd2luZG93LldlYktpdENTU01hdHJpeChjdXJUcmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogY3VyVHJhbnNmb3JtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybU1hdHJpeCA9IGN1clN0eWxlLk1velRyYW5zZm9ybSB8fCBjdXJTdHlsZS5PVHJhbnNmb3JtIHx8IGN1clN0eWxlLk1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLm1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKS5yZXBsYWNlKCd0cmFuc2xhdGUoJywgJ21hdHJpeCgxLCAwLCAwLCAxLCcpO1xuICAgICAgICBtYXRyaXggPSB0cmFuc2Zvcm1NYXRyaXgudG9TdHJpbmcoKS5zcGxpdCgnLCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgIC8vIExhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgICAgIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KSBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQxOyAvLyBDcmF6eSBJRTEwIE1hdHJpeFxuICAgICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTJdKTsgLy8gTm9ybWFsIEJyb3dzZXJzXG4gICAgICAgIGVsc2UgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNF0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgICAgIC8vIExhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgICAgIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KSBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQyOyAvLyBDcmF6eSBJRTEwIE1hdHJpeFxuICAgICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTNdKTsgLy8gTm9ybWFsIEJyb3dzZXJzXG4gICAgICAgIGVsc2UgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3VyVHJhbnNmb3JtIHx8IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPYmplY3Qobykge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBvICE9PSBudWxsICYmIG8uY29uc3RydWN0b3IgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKSA9PT0gJ09iamVjdCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNOb2RlKG5vZGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuSFRNTEVsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub2RlICYmIChub2RlLm5vZGVUeXBlID09PSAxIHx8IG5vZGUubm9kZVR5cGUgPT09IDExKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgICBjb25zdCB0byA9IE9iamVjdChhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF0pO1xuICAgICAgY29uc3Qgbm9FeHRlbmQgPSBbJ19fcHJvdG9fXycsICdjb25zdHJ1Y3RvcicsICdwcm90b3R5cGUnXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dFNvdXJjZSA9IGkgPCAwIHx8IGFyZ3VtZW50cy5sZW5ndGggPD0gaSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpXTtcblxuICAgICAgICBpZiAobmV4dFNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIG5leHRTb3VyY2UgIT09IG51bGwgJiYgIWlzTm9kZShuZXh0U291cmNlKSkge1xuICAgICAgICAgIGNvbnN0IGtleXNBcnJheSA9IE9iamVjdC5rZXlzKE9iamVjdChuZXh0U291cmNlKSkuZmlsdGVyKGtleSA9PiBub0V4dGVuZC5pbmRleE9mKGtleSkgPCAwKTtcblxuICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuXG4gICAgICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgICBpZiAoaXNPYmplY3QodG9bbmV4dEtleV0pICYmIGlzT2JqZWN0KG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTb3VyY2VbbmV4dEtleV0uX19zd2lwZXJfXykge1xuICAgICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBleHRlbmQodG9bbmV4dEtleV0sIG5leHRTb3VyY2VbbmV4dEtleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghaXNPYmplY3QodG9bbmV4dEtleV0pICYmIGlzT2JqZWN0KG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChuZXh0U291cmNlW25leHRLZXldLl9fc3dpcGVyX18pIHtcbiAgICAgICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZXh0ZW5kKHRvW25leHRLZXldLCBuZXh0U291cmNlW25leHRLZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0bztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRDU1NQcm9wZXJ0eShlbCwgdmFyTmFtZSwgdmFyVmFsdWUpIHtcbiAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KHZhck5hbWUsIHZhclZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlQ1NTTW9kZVNjcm9sbChfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIHRhcmdldFBvc2l0aW9uLFxuICAgICAgICBzaWRlXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IC1zd2lwZXIudHJhbnNsYXRlO1xuICAgICAgbGV0IHN0YXJ0VGltZSA9IG51bGw7XG4gICAgICBsZXQgdGltZTtcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSAnbm9uZSc7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3dpcGVyLmNzc01vZGVGcmFtZUlEKTtcbiAgICAgIGNvbnN0IGRpciA9IHRhcmdldFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbiA/ICduZXh0JyA6ICdwcmV2JztcblxuICAgICAgY29uc3QgaXNPdXRPZkJvdW5kID0gKGN1cnJlbnQsIHRhcmdldCkgPT4ge1xuICAgICAgICByZXR1cm4gZGlyID09PSAnbmV4dCcgJiYgY3VycmVudCA+PSB0YXJnZXQgfHwgZGlyID09PSAncHJldicgJiYgY3VycmVudCA8PSB0YXJnZXQ7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBhbmltYXRlID0gKCkgPT4ge1xuICAgICAgICB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgaWYgKHN0YXJ0VGltZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHN0YXJ0VGltZSA9IHRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKCh0aW1lIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uLCAxKSwgMCk7XG4gICAgICAgIGNvbnN0IGVhc2VQcm9ncmVzcyA9IDAuNSAtIE1hdGguY29zKHByb2dyZXNzICogTWF0aC5QSSkgLyAyO1xuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbiArIGVhc2VQcm9ncmVzcyAqICh0YXJnZXRQb3NpdGlvbiAtIHN0YXJ0UG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChpc091dE9mQm91bmQoY3VycmVudFBvc2l0aW9uLCB0YXJnZXRQb3NpdGlvbikpIHtcbiAgICAgICAgICBjdXJyZW50UG9zaXRpb24gPSB0YXJnZXRQb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgICAgIFtzaWRlXTogY3VycmVudFBvc2l0aW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc091dE9mQm91bmQoY3VycmVudFBvc2l0aW9uLCB0YXJnZXRQb3NpdGlvbikpIHtcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9ICcnO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgIFtzaWRlXTogY3VycmVudFBvc2l0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3dpcGVyLmNzc01vZGVGcmFtZUlEKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuY3NzTW9kZUZyYW1lSUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgfTtcblxuICAgICAgYW5pbWF0ZSgpO1xuICAgIH1cblxuICAgIGxldCBzdXBwb3J0O1xuXG4gICAgZnVuY3Rpb24gY2FsY1N1cHBvcnQoKSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNtb290aFNjcm9sbDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICdzY3JvbGxCZWhhdmlvcicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLFxuICAgICAgICB0b3VjaDogISEoJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpLFxuICAgICAgICBwYXNzaXZlTGlzdGVuZXI6IGZ1bmN0aW9uIGNoZWNrUGFzc2l2ZUxpc3RlbmVyKCkge1xuICAgICAgICAgIGxldCBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlTGlzdGVuZXInLCBudWxsLCBvcHRzKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7Ly8gTm8gc3VwcG9ydFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdXBwb3J0c1Bhc3NpdmU7XG4gICAgICAgIH0oKSxcbiAgICAgICAgZ2VzdHVyZXM6IGZ1bmN0aW9uIGNoZWNrR2VzdHVyZXMoKSB7XG4gICAgICAgICAgcmV0dXJuICdvbmdlc3R1cmVzdGFydCcgaW4gd2luZG93O1xuICAgICAgICB9KClcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3VwcG9ydCgpIHtcbiAgICAgIGlmICghc3VwcG9ydCkge1xuICAgICAgICBzdXBwb3J0ID0gY2FsY1N1cHBvcnQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1cHBvcnQ7XG4gICAgfVxuXG4gICAgbGV0IGRldmljZUNhY2hlZDtcblxuICAgIGZ1bmN0aW9uIGNhbGNEZXZpY2UoX3RlbXApIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHVzZXJBZ2VudFxuICAgICAgfSA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wO1xuICAgICAgY29uc3Qgc3VwcG9ydCA9IGdldFN1cHBvcnQoKTtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtO1xuICAgICAgY29uc3QgdWEgPSB1c2VyQWdlbnQgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICBjb25zdCBkZXZpY2UgPSB7XG4gICAgICAgIGlvczogZmFsc2UsXG4gICAgICAgIGFuZHJvaWQ6IGZhbHNlXG4gICAgICB9O1xuICAgICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoO1xuICAgICAgY29uc3Qgc2NyZWVuSGVpZ2h0ID0gd2luZG93LnNjcmVlbi5oZWlnaHQ7XG4gICAgICBjb25zdCBhbmRyb2lkID0gdWEubWF0Y2goLyhBbmRyb2lkKTs/W1xcc1xcL10rKFtcXGQuXSspPy8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgIGxldCBpcGFkID0gdWEubWF0Y2goLyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvKTtcbiAgICAgIGNvbnN0IGlwb2QgPSB1YS5tYXRjaCgvKGlQb2QpKC4qT1NcXHMoW1xcZF9dKykpPy8pO1xuICAgICAgY29uc3QgaXBob25lID0gIWlwYWQgJiYgdWEubWF0Y2goLyhpUGhvbmVcXHNPU3xpT1MpXFxzKFtcXGRfXSspLyk7XG4gICAgICBjb25zdCB3aW5kb3dzID0gcGxhdGZvcm0gPT09ICdXaW4zMic7XG4gICAgICBsZXQgbWFjb3MgPSBwbGF0Zm9ybSA9PT0gJ01hY0ludGVsJzsgLy8gaVBhZE9zIDEzIGZpeFxuXG4gICAgICBjb25zdCBpUGFkU2NyZWVucyA9IFsnMTAyNHgxMzY2JywgJzEzNjZ4MTAyNCcsICc4MzR4MTE5NCcsICcxMTk0eDgzNCcsICc4MzR4MTExMicsICcxMTEyeDgzNCcsICc3Njh4MTAyNCcsICcxMDI0eDc2OCcsICc4MjB4MTE4MCcsICcxMTgweDgyMCcsICc4MTB4MTA4MCcsICcxMDgweDgxMCddO1xuXG4gICAgICBpZiAoIWlwYWQgJiYgbWFjb3MgJiYgc3VwcG9ydC50b3VjaCAmJiBpUGFkU2NyZWVucy5pbmRleE9mKGAke3NjcmVlbldpZHRofXgke3NjcmVlbkhlaWdodH1gKSA+PSAwKSB7XG4gICAgICAgIGlwYWQgPSB1YS5tYXRjaCgvKFZlcnNpb24pXFwvKFtcXGQuXSspLyk7XG4gICAgICAgIGlmICghaXBhZCkgaXBhZCA9IFswLCAxLCAnMTNfMF8wJ107XG4gICAgICAgIG1hY29zID0gZmFsc2U7XG4gICAgICB9IC8vIEFuZHJvaWRcblxuXG4gICAgICBpZiAoYW5kcm9pZCAmJiAhd2luZG93cykge1xuICAgICAgICBkZXZpY2Uub3MgPSAnYW5kcm9pZCc7XG4gICAgICAgIGRldmljZS5hbmRyb2lkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlwYWQgfHwgaXBob25lIHx8IGlwb2QpIHtcbiAgICAgICAgZGV2aWNlLm9zID0gJ2lvcyc7XG4gICAgICAgIGRldmljZS5pb3MgPSB0cnVlO1xuICAgICAgfSAvLyBFeHBvcnQgb2JqZWN0XG5cblxuICAgICAgcmV0dXJuIGRldmljZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREZXZpY2Uob3ZlcnJpZGVzKSB7XG4gICAgICBpZiAob3ZlcnJpZGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgb3ZlcnJpZGVzID0ge307XG4gICAgICB9XG5cbiAgICAgIGlmICghZGV2aWNlQ2FjaGVkKSB7XG4gICAgICAgIGRldmljZUNhY2hlZCA9IGNhbGNEZXZpY2Uob3ZlcnJpZGVzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRldmljZUNhY2hlZDtcbiAgICB9XG5cbiAgICBsZXQgYnJvd3NlcjtcblxuICAgIGZ1bmN0aW9uIGNhbGNCcm93c2VyKCkge1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG5cbiAgICAgIGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xuICAgICAgICBjb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiB1YS5pbmRleE9mKCdzYWZhcmknKSA+PSAwICYmIHVhLmluZGV4T2YoJ2Nocm9tZScpIDwgMCAmJiB1YS5pbmRleE9mKCdhbmRyb2lkJykgPCAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1NhZmFyaTogaXNTYWZhcmkoKSxcbiAgICAgICAgaXNXZWJWaWV3OiAvKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdCg/IS4qU2FmYXJpKS9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJyb3dzZXIoKSB7XG4gICAgICBpZiAoIWJyb3dzZXIpIHtcbiAgICAgICAgYnJvd3NlciA9IGNhbGNCcm93c2VyKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBicm93c2VyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFJlc2l6ZShfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgbGV0IG9ic2VydmVyID0gbnVsbDtcbiAgICAgIGxldCBhbmltYXRpb25GcmFtZSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IHJlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgICAgICBlbWl0KCdiZWZvcmVSZXNpemUnKTtcbiAgICAgICAgZW1pdCgncmVzaXplJyk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjcmVhdGVPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgICAgIGFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHRcbiAgICAgICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgICAgICBsZXQgbmV3V2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIGxldCBuZXdIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goX3JlZjIgPT4ge1xuICAgICAgICAgICAgICBsZXQge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRCb3hTaXplLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRSZWN0LFxuICAgICAgICAgICAgICAgIHRhcmdldFxuICAgICAgICAgICAgICB9ID0gX3JlZjI7XG4gICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBzd2lwZXIuZWwpIHJldHVybjtcbiAgICAgICAgICAgICAgbmV3V2lkdGggPSBjb250ZW50UmVjdCA/IGNvbnRlbnRSZWN0LndpZHRoIDogKGNvbnRlbnRCb3hTaXplWzBdIHx8IGNvbnRlbnRCb3hTaXplKS5pbmxpbmVTaXplO1xuICAgICAgICAgICAgICBuZXdIZWlnaHQgPSBjb250ZW50UmVjdCA/IGNvbnRlbnRSZWN0LmhlaWdodCA6IChjb250ZW50Qm94U2l6ZVswXSB8fCBjb250ZW50Qm94U2l6ZSkuYmxvY2tTaXplO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdXaWR0aCAhPT0gd2lkdGggfHwgbmV3SGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgcmVzaXplSGFuZGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShzd2lwZXIuZWwpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVtb3ZlT2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xuICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JzZXJ2ZXIgJiYgb2JzZXJ2ZXIudW5vYnNlcnZlICYmIHN3aXBlci5lbCkge1xuICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShzd2lwZXIuZWwpO1xuICAgICAgICAgIG9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICAgICAgZW1pdCgnb3JpZW50YXRpb25jaGFuZ2UnKTtcbiAgICAgIH07XG5cbiAgICAgIG9uKCdpbml0JywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5yZXNpemVPYnNlcnZlciAmJiB0eXBlb2Ygd2luZG93LlJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNyZWF0ZU9ic2VydmVyKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIpO1xuICAgICAgfSk7XG4gICAgICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgcmVtb3ZlT2JzZXJ2ZXIoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gT2JzZXJ2ZXIoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IG9ic2VydmVycyA9IFtdO1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG5cbiAgICAgIGNvbnN0IGF0dGFjaCA9IGZ1bmN0aW9uICh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IE9ic2VydmVyRnVuYyA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5XZWJraXRNdXRhdGlvbk9ic2VydmVyO1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBPYnNlcnZlckZ1bmMobXV0YXRpb25zID0+IHtcbiAgICAgICAgICAvLyBUaGUgb2JzZXJ2ZXJVcGRhdGUgZXZlbnQgc2hvdWxkIG9ubHkgYmUgdHJpZ2dlcmVkXG4gICAgICAgICAgLy8gb25jZSBkZXNwaXRlIHRoZSBudW1iZXIgb2YgbXV0YXRpb25zLiAgQWRkaXRpb25hbFxuICAgICAgICAgIC8vIHRyaWdnZXJzIGFyZSByZWR1bmRhbnQgYW5kIGFyZSB2ZXJ5IGNvc3RseVxuICAgICAgICAgIGlmIChtdXRhdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBlbWl0KCdvYnNlcnZlclVwZGF0ZScsIG11dGF0aW9uc1swXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXJVcGRhdGUgPSBmdW5jdGlvbiBvYnNlcnZlclVwZGF0ZSgpIHtcbiAgICAgICAgICAgIGVtaXQoJ29ic2VydmVyVXBkYXRlJywgbXV0YXRpb25zWzBdKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob2JzZXJ2ZXJVcGRhdGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChvYnNlcnZlclVwZGF0ZSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgY2hpbGRMaXN0OiB0eXBlb2Ygb3B0aW9ucy5jaGlsZExpc3QgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuY2hpbGRMaXN0LFxuICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHR5cGVvZiBvcHRpb25zLmNoYXJhY3RlckRhdGEgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuY2hhcmFjdGVyRGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLm9ic2VydmVyKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMub2JzZXJ2ZVBhcmVudHMpIHtcbiAgICAgICAgICBjb25zdCBjb250YWluZXJQYXJlbnRzID0gc3dpcGVyLiRlbC5wYXJlbnRzKCk7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lclBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGF0dGFjaChjb250YWluZXJQYXJlbnRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gT2JzZXJ2ZSBjb250YWluZXJcblxuXG4gICAgICAgIGF0dGFjaChzd2lwZXIuJGVsWzBdLCB7XG4gICAgICAgICAgY2hpbGRMaXN0OiBzd2lwZXIucGFyYW1zLm9ic2VydmVTbGlkZUNoaWxkcmVuXG4gICAgICAgIH0pOyAvLyBPYnNlcnZlIHdyYXBwZXJcblxuICAgICAgICBhdHRhY2goc3dpcGVyLiR3cmFwcGVyRWxbMF0sIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIG9ic2VydmVycy5mb3JFYWNoKG9ic2VydmVyID0+IHtcbiAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKDAsIG9ic2VydmVycy5sZW5ndGgpO1xuICAgICAgfTtcblxuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgb2JzZXJ2ZXI6IGZhbHNlLFxuICAgICAgICBvYnNlcnZlUGFyZW50czogZmFsc2UsXG4gICAgICAgIG9ic2VydmVTbGlkZUNoaWxkcmVuOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBvbignaW5pdCcsIGluaXQpO1xuICAgICAgb24oJ2Rlc3Ryb3knLCBkZXN0cm95KTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuICAgIHZhciBldmVudHNFbWl0dGVyID0ge1xuICAgICAgb24oZXZlbnRzLCBoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHNlbGY7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHByaW9yaXR5ID8gJ3Vuc2hpZnQnIDogJ3B1c2gnO1xuICAgICAgICBldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSkgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdW21ldGhvZF0oaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0sXG5cbiAgICAgIG9uY2UoZXZlbnRzLCBoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHNlbGY7XG5cbiAgICAgICAgZnVuY3Rpb24gb25jZUhhbmRsZXIoKSB7XG4gICAgICAgICAgc2VsZi5vZmYoZXZlbnRzLCBvbmNlSGFuZGxlcik7XG5cbiAgICAgICAgICBpZiAob25jZUhhbmRsZXIuX19lbWl0dGVyUHJveHkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvbmNlSGFuZGxlci5fX2VtaXR0ZXJQcm94eTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uY2VIYW5kbGVyLl9fZW1pdHRlclByb3h5ID0gaGFuZGxlcjtcbiAgICAgICAgcmV0dXJuIHNlbGYub24oZXZlbnRzLCBvbmNlSGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgfSxcblxuICAgICAgb25BbnkoaGFuZGxlciwgcHJpb3JpdHkpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHJldHVybiBzZWxmO1xuICAgICAgICBjb25zdCBtZXRob2QgPSBwcmlvcml0eSA/ICd1bnNoaWZ0JyA6ICdwdXNoJztcblxuICAgICAgICBpZiAoc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuaW5kZXhPZihoYW5kbGVyKSA8IDApIHtcbiAgICAgICAgICBzZWxmLmV2ZW50c0FueUxpc3RlbmVyc1ttZXRob2RdKGhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9LFxuXG4gICAgICBvZmZBbnkoaGFuZGxlcikge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMpIHJldHVybiBzZWxmO1xuICAgICAgICBjb25zdCBpbmRleCA9IHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcik7XG5cbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9LFxuXG4gICAgICBvZmYoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uZm9yRWFjaCgoZXZlbnRIYW5kbGVyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyID09PSBoYW5kbGVyIHx8IGV2ZW50SGFuZGxlci5fX2VtaXR0ZXJQcm94eSAmJiBldmVudEhhbmRsZXIuX19lbWl0dGVyUHJveHkgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9LFxuXG4gICAgICBlbWl0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMpIHJldHVybiBzZWxmO1xuICAgICAgICBsZXQgZXZlbnRzO1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgbGV0IGNvbnRleHQ7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICAgICAgZXZlbnRzID0gYXJnc1swXTtcbiAgICAgICAgICBkYXRhID0gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCk7XG4gICAgICAgICAgY29udGV4dCA9IHNlbGY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZlbnRzID0gYXJnc1swXS5ldmVudHM7XG4gICAgICAgICAgZGF0YSA9IGFyZ3NbMF0uZGF0YTtcbiAgICAgICAgICBjb250ZXh0ID0gYXJnc1swXS5jb250ZXh0IHx8IHNlbGY7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLnVuc2hpZnQoY29udGV4dCk7XG4gICAgICAgIGNvbnN0IGV2ZW50c0FycmF5ID0gQXJyYXkuaXNBcnJheShldmVudHMpID8gZXZlbnRzIDogZXZlbnRzLnNwbGl0KCcgJyk7XG4gICAgICAgIGV2ZW50c0FycmF5LmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChzZWxmLmV2ZW50c0FueUxpc3RlbmVycyAmJiBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmZvckVhY2goZXZlbnRIYW5kbGVyID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KGNvbnRleHQsIFtldmVudCwgLi4uZGF0YV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYuZXZlbnRzTGlzdGVuZXJzICYmIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdLmZvckVhY2goZXZlbnRIYW5kbGVyID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KGNvbnRleHQsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBsZXQgd2lkdGg7XG4gICAgICBsZXQgaGVpZ2h0O1xuICAgICAgY29uc3QgJGVsID0gc3dpcGVyLiRlbDtcblxuICAgICAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zLndpZHRoICE9PSAndW5kZWZpbmVkJyAmJiBzd2lwZXIucGFyYW1zLndpZHRoICE9PSBudWxsKSB7XG4gICAgICAgIHdpZHRoID0gc3dpcGVyLnBhcmFtcy53aWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZHRoID0gJGVsWzBdLmNsaWVudFdpZHRoO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMuaGVpZ2h0ICE9PSAndW5kZWZpbmVkJyAmJiBzd2lwZXIucGFyYW1zLmhlaWdodCAhPT0gbnVsbCkge1xuICAgICAgICBoZWlnaHQgPSBzd2lwZXIucGFyYW1zLmhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlaWdodCA9ICRlbFswXS5jbGllbnRIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh3aWR0aCA9PT0gMCAmJiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgfHwgaGVpZ2h0ID09PSAwICYmIHN3aXBlci5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBTdWJ0cmFjdCBwYWRkaW5nc1xuXG5cbiAgICAgIHdpZHRoID0gd2lkdGggLSBwYXJzZUludCgkZWwuY3NzKCdwYWRkaW5nLWxlZnQnKSB8fCAwLCAxMCkgLSBwYXJzZUludCgkZWwuY3NzKCdwYWRkaW5nLXJpZ2h0JykgfHwgMCwgMTApO1xuICAgICAgaGVpZ2h0ID0gaGVpZ2h0IC0gcGFyc2VJbnQoJGVsLmNzcygncGFkZGluZy10b3AnKSB8fCAwLCAxMCkgLSBwYXJzZUludCgkZWwuY3NzKCdwYWRkaW5nLWJvdHRvbScpIHx8IDAsIDEwKTtcbiAgICAgIGlmIChOdW1iZXIuaXNOYU4od2lkdGgpKSB3aWR0aCA9IDA7XG4gICAgICBpZiAoTnVtYmVyLmlzTmFOKGhlaWdodCkpIGhlaWdodCA9IDA7XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBzaXplOiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB3aWR0aCA6IGhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2xpZGVzKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gZ2V0RGlyZWN0aW9uTGFiZWwocHJvcGVydHkpIHtcbiAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICAgICAgfSAvLyBwcmV0dGllci1pZ25vcmVcblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgJ3dpZHRoJzogJ2hlaWdodCcsXG4gICAgICAgICAgJ21hcmdpbi10b3AnOiAnbWFyZ2luLWxlZnQnLFxuICAgICAgICAgICdtYXJnaW4tYm90dG9tICc6ICdtYXJnaW4tcmlnaHQnLFxuICAgICAgICAgICdtYXJnaW4tbGVmdCc6ICdtYXJnaW4tdG9wJyxcbiAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogJ21hcmdpbi1ib3R0b20nLFxuICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiAncGFkZGluZy10b3AnLFxuICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogJ3BhZGRpbmctYm90dG9tJyxcbiAgICAgICAgICAnbWFyZ2luUmlnaHQnOiAnbWFyZ2luQm90dG9tJ1xuICAgICAgICB9W3Byb3BlcnR5XTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShub2RlLCBsYWJlbCkge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChub2RlLmdldFByb3BlcnR5VmFsdWUoZ2V0RGlyZWN0aW9uTGFiZWwobGFiZWwpKSB8fCAwKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgJHdyYXBwZXJFbCxcbiAgICAgICAgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICAgICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgICAgIHdyb25nUlRMXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgICAgIGNvbnN0IHByZXZpb3VzU2xpZGVzTGVuZ3RoID0gaXNWaXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgY29uc3Qgc2xpZGVzID0gJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApO1xuICAgICAgY29uc3Qgc2xpZGVzTGVuZ3RoID0gaXNWaXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHNsaWRlcy5sZW5ndGg7XG4gICAgICBsZXQgc25hcEdyaWQgPSBbXTtcbiAgICAgIGNvbnN0IHNsaWRlc0dyaWQgPSBbXTtcbiAgICAgIGNvbnN0IHNsaWRlc1NpemVzR3JpZCA9IFtdO1xuICAgICAgbGV0IG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmU7XG5cbiAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0QmVmb3JlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmUuY2FsbChzd2lwZXIpO1xuICAgICAgfVxuXG4gICAgICBsZXQgb2Zmc2V0QWZ0ZXIgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXI7XG5cbiAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0QWZ0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2Zmc2V0QWZ0ZXIgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXIuY2FsbChzd2lwZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoID0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgICAgIGNvbnN0IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCA9IHN3aXBlci5zbGlkZXNHcmlkLmxlbmd0aDtcbiAgICAgIGxldCBzcGFjZUJldHdlZW4gPSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICAgICAgbGV0IHNsaWRlUG9zaXRpb24gPSAtb2Zmc2V0QmVmb3JlO1xuICAgICAgbGV0IHByZXZTbGlkZVNpemUgPSAwO1xuICAgICAgbGV0IGluZGV4ID0gMDtcblxuICAgICAgaWYgKHR5cGVvZiBzd2lwZXJTaXplID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSAnc3RyaW5nJyAmJiBzcGFjZUJldHdlZW4uaW5kZXhPZignJScpID49IDApIHtcbiAgICAgICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4ucmVwbGFjZSgnJScsICcnKSkgLyAxMDAgKiBzd2lwZXJTaXplO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIudmlydHVhbFNpemUgPSAtc3BhY2VCZXR3ZWVuOyAvLyByZXNldCBtYXJnaW5zXG5cbiAgICAgIGlmIChydGwpIHNsaWRlcy5jc3Moe1xuICAgICAgICBtYXJnaW5MZWZ0OiAnJyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnJyxcbiAgICAgICAgbWFyZ2luVG9wOiAnJ1xuICAgICAgfSk7ZWxzZSBzbGlkZXMuY3NzKHtcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICcnLFxuICAgICAgICBtYXJnaW5Cb3R0b206ICcnLFxuICAgICAgICBtYXJnaW5Ub3A6ICcnXG4gICAgICB9KTsgLy8gcmVzZXQgY3NzTW9kZSBvZmZzZXRzXG5cbiAgICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgc2V0Q1NTUHJvcGVydHkoc3dpcGVyLndyYXBwZXJFbCwgJy0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1iZWZvcmUnLCAnJyk7XG4gICAgICAgIHNldENTU1Byb3BlcnR5KHN3aXBlci53cmFwcGVyRWwsICctLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYWZ0ZXInLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdyaWRFbmFibGVkID0gcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDEgJiYgc3dpcGVyLmdyaWQ7XG5cbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuZ3JpZC5pbml0U2xpZGVzKHNsaWRlc0xlbmd0aCk7XG4gICAgICB9IC8vIENhbGMgc2xpZGVzXG5cblxuICAgICAgbGV0IHNsaWRlU2l6ZTtcbiAgICAgIGNvbnN0IHNob3VsZFJlc2V0U2xpZGVTaXplID0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiBwYXJhbXMuYnJlYWtwb2ludHMgJiYgT2JqZWN0LmtleXMocGFyYW1zLmJyZWFrcG9pbnRzKS5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXJhbXMuYnJlYWtwb2ludHNba2V5XS5zbGlkZXNQZXJWaWV3ICE9PSAndW5kZWZpbmVkJztcbiAgICAgIH0pLmxlbmd0aCA+IDA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc2xpZGVTaXplID0gMDtcbiAgICAgICAgY29uc3Qgc2xpZGUgPSBzbGlkZXMuZXEoaSk7XG5cbiAgICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLmdyaWQudXBkYXRlU2xpZGUoaSwgc2xpZGUsIHNsaWRlc0xlbmd0aCwgZ2V0RGlyZWN0aW9uTGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNsaWRlLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpIGNvbnRpbnVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICAgICAgICBpZiAoc2hvdWxkUmVzZXRTbGlkZVNpemUpIHtcbiAgICAgICAgICAgIHNsaWRlc1tpXS5zdHlsZVtnZXREaXJlY3Rpb25MYWJlbCgnd2lkdGgnKV0gPSBgYDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzbGlkZVN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoc2xpZGVbMF0pO1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRUcmFuc2Zvcm0gPSBzbGlkZVswXS5zdHlsZS50cmFuc2Zvcm07XG4gICAgICAgICAgY29uc3QgY3VycmVudFdlYktpdFRyYW5zZm9ybSA9IHNsaWRlWzBdLnN0eWxlLndlYmtpdFRyYW5zZm9ybTtcblxuICAgICAgICAgIGlmIChjdXJyZW50VHJhbnNmb3JtKSB7XG4gICAgICAgICAgICBzbGlkZVswXS5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHNsaWRlWzBdLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdub25lJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykge1xuICAgICAgICAgICAgc2xpZGVTaXplID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUub3V0ZXJXaWR0aCh0cnVlKSA6IHNsaWRlLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ3dpZHRoJyk7XG4gICAgICAgICAgICBjb25zdCBwYWRkaW5nTGVmdCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsICdwYWRkaW5nLWxlZnQnKTtcbiAgICAgICAgICAgIGNvbnN0IHBhZGRpbmdSaWdodCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXJnaW5MZWZ0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ21hcmdpbi1sZWZ0Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXJnaW5SaWdodCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsICdtYXJnaW4tcmlnaHQnKTtcbiAgICAgICAgICAgIGNvbnN0IGJveFNpemluZyA9IHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ2JveC1zaXppbmcnKTtcblxuICAgICAgICAgICAgaWYgKGJveFNpemluZyAmJiBib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgICAgICAgICBzbGlkZVNpemUgPSB3aWR0aCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBjbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICBvZmZzZXRXaWR0aFxuICAgICAgICAgICAgICB9ID0gc2xpZGVbMF07XG4gICAgICAgICAgICAgIHNsaWRlU2l6ZSA9IHdpZHRoICsgcGFkZGluZ0xlZnQgKyBwYWRkaW5nUmlnaHQgKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQgKyAob2Zmc2V0V2lkdGggLSBjbGllbnRXaWR0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHNsaWRlWzBdLnN0eWxlLnRyYW5zZm9ybSA9IGN1cnJlbnRUcmFuc2Zvcm07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHNsaWRlWzBdLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlU2l6ZSA9IE1hdGguZmxvb3Ioc2xpZGVTaXplKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZVNpemUgPSAoc3dpcGVyU2l6ZSAtIChwYXJhbXMuc2xpZGVzUGVyVmlldyAtIDEpICogc3BhY2VCZXR3ZWVuKSAvIHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVNpemUgPSBNYXRoLmZsb29yKHNsaWRlU2l6ZSk7XG5cbiAgICAgICAgICBpZiAoc2xpZGVzW2ldKSB7XG4gICAgICAgICAgICBzbGlkZXNbaV0uc3R5bGVbZ2V0RGlyZWN0aW9uTGFiZWwoJ3dpZHRoJyldID0gYCR7c2xpZGVTaXplfXB4YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2xpZGVzW2ldKSB7XG4gICAgICAgICAgc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlc1NpemVzR3JpZC5wdXNoKHNsaWRlU2l6ZSk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgc2xpZGVTaXplIC8gMiArIHByZXZTbGlkZVNpemUgLyAyICsgc3BhY2VCZXR3ZWVuO1xuICAgICAgICAgIGlmIChwcmV2U2xpZGVTaXplID09PSAwICYmIGkgIT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gc3dpcGVyU2l6ZSAvIDIgLSBzcGFjZUJldHdlZW47XG4gICAgICAgICAgaWYgKGkgPT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gc3dpcGVyU2l6ZSAvIDIgLSBzcGFjZUJldHdlZW47XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHNsaWRlUG9zaXRpb24pIDwgMSAvIDEwMDApIHNsaWRlUG9zaXRpb24gPSAwO1xuICAgICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVBvc2l0aW9uID0gTWF0aC5mbG9vcihzbGlkZVBvc2l0aW9uKTtcbiAgICAgICAgICBpZiAoaW5kZXggJSBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVBvc2l0aW9uID0gTWF0aC5mbG9vcihzbGlkZVBvc2l0aW9uKTtcbiAgICAgICAgICBpZiAoKGluZGV4IC0gTWF0aC5taW4oc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIGluZGV4KSkgJSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSBzbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSArPSBzbGlkZVNpemUgKyBzcGFjZUJldHdlZW47XG4gICAgICAgIHByZXZTbGlkZVNpemUgPSBzbGlkZVNpemU7XG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSA9IE1hdGgubWF4KHN3aXBlci52aXJ0dWFsU2l6ZSwgc3dpcGVyU2l6ZSkgKyBvZmZzZXRBZnRlcjtcblxuICAgICAgaWYgKHJ0bCAmJiB3cm9uZ1JUTCAmJiAocGFyYW1zLmVmZmVjdCA9PT0gJ3NsaWRlJyB8fCBwYXJhbXMuZWZmZWN0ID09PSAnY292ZXJmbG93JykpIHtcbiAgICAgICAgJHdyYXBwZXJFbC5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBgJHtzd2lwZXIudmlydHVhbFNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVufXB4YFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5zZXRXcmFwcGVyU2l6ZSkge1xuICAgICAgICAkd3JhcHBlckVsLmNzcyh7XG4gICAgICAgICAgW2dldERpcmVjdGlvbkxhYmVsKCd3aWR0aCcpXTogYCR7c3dpcGVyLnZpcnR1YWxTaXplICsgcGFyYW1zLnNwYWNlQmV0d2Vlbn1weGBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuZ3JpZC51cGRhdGVXcmFwcGVyU2l6ZShzbGlkZVNpemUsIHNuYXBHcmlkLCBnZXREaXJlY3Rpb25MYWJlbCk7XG4gICAgICB9IC8vIFJlbW92ZSBsYXN0IGdyaWQgZWxlbWVudHMgZGVwZW5kaW5nIG9uIHdpZHRoXG5cblxuICAgICAgaWYgKCFwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgY29uc3QgbmV3U2xpZGVzR3JpZCA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25hcEdyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBsZXQgc2xpZGVzR3JpZEl0ZW0gPSBzbmFwR3JpZFtpXTtcbiAgICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVzR3JpZEl0ZW0gPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRJdGVtKTtcblxuICAgICAgICAgIGlmIChzbmFwR3JpZFtpXSA8PSBzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKSB7XG4gICAgICAgICAgICBuZXdTbGlkZXNHcmlkLnB1c2goc2xpZGVzR3JpZEl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNuYXBHcmlkID0gbmV3U2xpZGVzR3JpZDtcblxuICAgICAgICBpZiAoTWF0aC5mbG9vcihzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKSAtIE1hdGguZmxvb3Ioc25hcEdyaWRbc25hcEdyaWQubGVuZ3RoIC0gMV0pID4gMSkge1xuICAgICAgICAgIHNuYXBHcmlkLnB1c2goc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNuYXBHcmlkLmxlbmd0aCA9PT0gMCkgc25hcEdyaWQgPSBbMF07XG5cbiAgICAgIGlmIChwYXJhbXMuc3BhY2VCZXR3ZWVuICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBydGwgPyAnbWFyZ2luTGVmdCcgOiBnZXREaXJlY3Rpb25MYWJlbCgnbWFyZ2luUmlnaHQnKTtcbiAgICAgICAgc2xpZGVzLmZpbHRlcigoXywgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgICAgIGlmICghcGFyYW1zLmNzc01vZGUpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgaWYgKHNsaWRlSW5kZXggPT09IHNsaWRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pLmNzcyh7XG4gICAgICAgICAgW2tleV06IGAke3NwYWNlQmV0d2Vlbn1weGBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzQm91bmRzKSB7XG4gICAgICAgIGxldCBhbGxTbGlkZXNTaXplID0gMDtcbiAgICAgICAgc2xpZGVzU2l6ZXNHcmlkLmZvckVhY2goc2xpZGVTaXplVmFsdWUgPT4ge1xuICAgICAgICAgIGFsbFNsaWRlc1NpemUgKz0gc2xpZGVTaXplVmFsdWUgKyAocGFyYW1zLnNwYWNlQmV0d2VlbiA/IHBhcmFtcy5zcGFjZUJldHdlZW4gOiAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFsbFNsaWRlc1NpemUgLT0gcGFyYW1zLnNwYWNlQmV0d2VlbjtcbiAgICAgICAgY29uc3QgbWF4U25hcCA9IGFsbFNsaWRlc1NpemUgLSBzd2lwZXJTaXplO1xuICAgICAgICBzbmFwR3JpZCA9IHNuYXBHcmlkLm1hcChzbmFwID0+IHtcbiAgICAgICAgICBpZiAoc25hcCA8IDApIHJldHVybiAtb2Zmc2V0QmVmb3JlO1xuICAgICAgICAgIGlmIChzbmFwID4gbWF4U25hcCkgcmV0dXJuIG1heFNuYXAgKyBvZmZzZXRBZnRlcjtcbiAgICAgICAgICByZXR1cm4gc25hcDtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuY2VudGVySW5zdWZmaWNpZW50U2xpZGVzKSB7XG4gICAgICAgIGxldCBhbGxTbGlkZXNTaXplID0gMDtcbiAgICAgICAgc2xpZGVzU2l6ZXNHcmlkLmZvckVhY2goc2xpZGVTaXplVmFsdWUgPT4ge1xuICAgICAgICAgIGFsbFNsaWRlc1NpemUgKz0gc2xpZGVTaXplVmFsdWUgKyAocGFyYW1zLnNwYWNlQmV0d2VlbiA/IHBhcmFtcy5zcGFjZUJldHdlZW4gOiAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFsbFNsaWRlc1NpemUgLT0gcGFyYW1zLnNwYWNlQmV0d2VlbjtcblxuICAgICAgICBpZiAoYWxsU2xpZGVzU2l6ZSA8IHN3aXBlclNpemUpIHtcbiAgICAgICAgICBjb25zdCBhbGxTbGlkZXNPZmZzZXQgPSAoc3dpcGVyU2l6ZSAtIGFsbFNsaWRlc1NpemUpIC8gMjtcbiAgICAgICAgICBzbmFwR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgICAgICAgIHNuYXBHcmlkW3NuYXBJbmRleF0gPSBzbmFwIC0gYWxsU2xpZGVzT2Zmc2V0O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNsaWRlc0dyaWQuZm9yRWFjaCgoc25hcCwgc25hcEluZGV4KSA9PiB7XG4gICAgICAgICAgICBzbGlkZXNHcmlkW3NuYXBJbmRleF0gPSBzbmFwICsgYWxsU2xpZGVzT2Zmc2V0O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICAgIHNsaWRlcyxcbiAgICAgICAgc25hcEdyaWQsXG4gICAgICAgIHNsaWRlc0dyaWQsXG4gICAgICAgIHNsaWRlc1NpemVzR3JpZFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNzc01vZGUgJiYgIXBhcmFtcy5jZW50ZXJlZFNsaWRlc0JvdW5kcykge1xuICAgICAgICBzZXRDU1NQcm9wZXJ0eShzd2lwZXIud3JhcHBlckVsLCAnLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWJlZm9yZScsIGAkey1zbmFwR3JpZFswXX1weGApO1xuICAgICAgICBzZXRDU1NQcm9wZXJ0eShzd2lwZXIud3JhcHBlckVsLCAnLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWFmdGVyJywgYCR7c3dpcGVyLnNpemUgLyAyIC0gc2xpZGVzU2l6ZXNHcmlkW3NsaWRlc1NpemVzR3JpZC5sZW5ndGggLSAxXSAvIDJ9cHhgKTtcbiAgICAgICAgY29uc3QgYWRkVG9TbmFwR3JpZCA9IC1zd2lwZXIuc25hcEdyaWRbMF07XG4gICAgICAgIGNvbnN0IGFkZFRvU2xpZGVzR3JpZCA9IC1zd2lwZXIuc2xpZGVzR3JpZFswXTtcbiAgICAgICAgc3dpcGVyLnNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkLm1hcCh2ID0+IHYgKyBhZGRUb1NuYXBHcmlkKTtcbiAgICAgICAgc3dpcGVyLnNsaWRlc0dyaWQgPSBzd2lwZXIuc2xpZGVzR3JpZC5tYXAodiA9PiB2ICsgYWRkVG9TbGlkZXNHcmlkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNsaWRlc0xlbmd0aCAhPT0gcHJldmlvdXNTbGlkZXNMZW5ndGgpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlc0xlbmd0aENoYW5nZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc25hcEdyaWQubGVuZ3RoICE9PSBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cpIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdzbmFwR3JpZExlbmd0aENoYW5nZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2xpZGVzR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCkge1xuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVzR3JpZExlbmd0aENoYW5nZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzVmlydHVhbCAmJiAhcGFyYW1zLmNzc01vZGUgJiYgKHBhcmFtcy5lZmZlY3QgPT09ICdzbGlkZScgfHwgcGFyYW1zLmVmZmVjdCA9PT0gJ2ZhZGUnKSkge1xuICAgICAgICBjb25zdCBiYWNrRmFjZUhpZGRlbkNsYXNzID0gYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9YmFja2ZhY2UtaGlkZGVuYDtcbiAgICAgICAgY29uc3QgaGFzQ2xhc3NCYWNrZmFjZUNsYXNzQWRkZWQgPSBzd2lwZXIuJGVsLmhhc0NsYXNzKGJhY2tGYWNlSGlkZGVuQ2xhc3MpO1xuXG4gICAgICAgIGlmIChzbGlkZXNMZW5ndGggPD0gcGFyYW1zLm1heEJhY2tmYWNlSGlkZGVuU2xpZGVzKSB7XG4gICAgICAgICAgaWYgKCFoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCkgc3dpcGVyLiRlbC5hZGRDbGFzcyhiYWNrRmFjZUhpZGRlbkNsYXNzKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCkge1xuICAgICAgICAgIHN3aXBlci4kZWwucmVtb3ZlQ2xhc3MoYmFja0ZhY2VIaWRkZW5DbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBdXRvSGVpZ2h0KHNwZWVkKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3QgYWN0aXZlU2xpZGVzID0gW107XG4gICAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgICAgIGxldCBuZXdIZWlnaHQgPSAwO1xuICAgICAgbGV0IGk7XG5cbiAgICAgIGlmICh0eXBlb2Ygc3BlZWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgICAgIH0gZWxzZSBpZiAoc3BlZWQgPT09IHRydWUpIHtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdldFNsaWRlQnlJbmRleCA9IGluZGV4ID0+IHtcbiAgICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVzLmZpbHRlcihlbCA9PiBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKSA9PT0gaW5kZXgpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpWzBdO1xuICAgICAgfTsgLy8gRmluZCBzbGlkZXMgY3VycmVudGx5IGluIHZpZXdcblxuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgIChzd2lwZXIudmlzaWJsZVNsaWRlcyB8fCAkKFtdKSkuZWFjaChzbGlkZSA9PiB7XG4gICAgICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChzbGlkZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4ICsgaTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoICYmICFpc1ZpcnR1YWwpIGJyZWFrO1xuICAgICAgICAgICAgYWN0aXZlU2xpZGVzLnB1c2goZ2V0U2xpZGVCeUluZGV4KGluZGV4KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChnZXRTbGlkZUJ5SW5kZXgoc3dpcGVyLmFjdGl2ZUluZGV4KSk7XG4gICAgICB9IC8vIEZpbmQgbmV3IGhlaWdodCBmcm9tIGhpZ2hlc3Qgc2xpZGUgaW4gdmlld1xuXG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhY3RpdmVTbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3RpdmVTbGlkZXNbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29uc3QgaGVpZ2h0ID0gYWN0aXZlU2xpZGVzW2ldLm9mZnNldEhlaWdodDtcbiAgICAgICAgICBuZXdIZWlnaHQgPSBoZWlnaHQgPiBuZXdIZWlnaHQgPyBoZWlnaHQgOiBuZXdIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVXBkYXRlIEhlaWdodFxuXG5cbiAgICAgIGlmIChuZXdIZWlnaHQgfHwgbmV3SGVpZ2h0ID09PSAwKSBzd2lwZXIuJHdyYXBwZXJFbC5jc3MoJ2hlaWdodCcsIGAke25ld0hlaWdodH1weGApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNsaWRlc09mZnNldCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzbGlkZXNbaV0uc3dpcGVyU2xpZGVPZmZzZXQgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzbGlkZXNbaV0ub2Zmc2V0TGVmdCA6IHNsaWRlc1tpXS5vZmZzZXRUb3A7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlKSB7XG4gICAgICBpZiAodHJhbnNsYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgdHJhbnNsYXRlID0gdGhpcyAmJiB0aGlzLnRyYW5zbGF0ZSB8fCAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc2xpZGVzLFxuICAgICAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICAgICAgc25hcEdyaWRcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBpZiAoc2xpZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQgPT09ICd1bmRlZmluZWQnKSBzd2lwZXIudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gICAgICBsZXQgb2Zmc2V0Q2VudGVyID0gLXRyYW5zbGF0ZTtcbiAgICAgIGlmIChydGwpIG9mZnNldENlbnRlciA9IHRyYW5zbGF0ZTsgLy8gVmlzaWJsZSBTbGlkZXNcblxuICAgICAgc2xpZGVzLnJlbW92ZUNsYXNzKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG4gICAgICBzd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgICAgIHN3aXBlci52aXNpYmxlU2xpZGVzID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlID0gc2xpZGVzW2ldO1xuICAgICAgICBsZXQgc2xpZGVPZmZzZXQgPSBzbGlkZS5zd2lwZXJTbGlkZU9mZnNldDtcblxuICAgICAgICBpZiAocGFyYW1zLmNzc01vZGUgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgc2xpZGVPZmZzZXQgLT0gc2xpZGVzWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2xpZGVQcm9ncmVzcyA9IChvZmZzZXRDZW50ZXIgKyAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIDogMCkgLSBzbGlkZU9mZnNldCkgLyAoc2xpZGUuc3dpcGVyU2xpZGVTaXplICsgcGFyYW1zLnNwYWNlQmV0d2Vlbik7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsU2xpZGVQcm9ncmVzcyA9IChvZmZzZXRDZW50ZXIgLSBzbmFwR3JpZFswXSArIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiAwKSAtIHNsaWRlT2Zmc2V0KSAvIChzbGlkZS5zd2lwZXJTbGlkZVNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKTtcbiAgICAgICAgY29uc3Qgc2xpZGVCZWZvcmUgPSAtKG9mZnNldENlbnRlciAtIHNsaWRlT2Zmc2V0KTtcbiAgICAgICAgY29uc3Qgc2xpZGVBZnRlciA9IHNsaWRlQmVmb3JlICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICAgICAgY29uc3QgaXNWaXNpYmxlID0gc2xpZGVCZWZvcmUgPj0gMCAmJiBzbGlkZUJlZm9yZSA8IHN3aXBlci5zaXplIC0gMSB8fCBzbGlkZUFmdGVyID4gMSAmJiBzbGlkZUFmdGVyIDw9IHN3aXBlci5zaXplIHx8IHNsaWRlQmVmb3JlIDw9IDAgJiYgc2xpZGVBZnRlciA+PSBzd2lwZXIuc2l6ZTtcblxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXMucHVzaChzbGlkZSk7XG4gICAgICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgc2xpZGVzLmVxKGkpLmFkZENsYXNzKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZS5wcm9ncmVzcyA9IHJ0bCA/IC1zbGlkZVByb2dyZXNzIDogc2xpZGVQcm9ncmVzcztcbiAgICAgICAgc2xpZGUub3JpZ2luYWxQcm9ncmVzcyA9IHJ0bCA/IC1vcmlnaW5hbFNsaWRlUHJvZ3Jlc3MgOiBvcmlnaW5hbFNsaWRlUHJvZ3Jlc3M7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci52aXNpYmxlU2xpZGVzID0gJChzd2lwZXIudmlzaWJsZVNsaWRlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuXG4gICAgICBpZiAodHlwZW9mIHRyYW5zbGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3QgbXVsdGlwbGllciA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyAtMSA6IDE7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG4gICAgICAgIHRyYW5zbGF0ZSA9IHN3aXBlciAmJiBzd2lwZXIudHJhbnNsYXRlICYmIHN3aXBlci50cmFuc2xhdGUgKiBtdWx0aXBsaWVyIHx8IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICAgIGxldCB7XG4gICAgICAgIHByb2dyZXNzLFxuICAgICAgICBpc0JlZ2lubmluZyxcbiAgICAgICAgaXNFbmRcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBjb25zdCB3YXNCZWdpbm5pbmcgPSBpc0JlZ2lubmluZztcbiAgICAgIGNvbnN0IHdhc0VuZCA9IGlzRW5kO1xuXG4gICAgICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICAgICAgcHJvZ3Jlc3MgPSAwO1xuICAgICAgICBpc0JlZ2lubmluZyA9IHRydWU7XG4gICAgICAgIGlzRW5kID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyB0cmFuc2xhdGVzRGlmZjtcbiAgICAgICAgaXNCZWdpbm5pbmcgPSBwcm9ncmVzcyA8PSAwO1xuICAgICAgICBpc0VuZCA9IHByb2dyZXNzID49IDE7XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICAgIHByb2dyZXNzLFxuICAgICAgICBpc0JlZ2lubmluZyxcbiAgICAgICAgaXNFbmRcbiAgICAgIH0pO1xuICAgICAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzIHx8IHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuYXV0b0hlaWdodCkgc3dpcGVyLnVwZGF0ZVNsaWRlc1Byb2dyZXNzKHRyYW5zbGF0ZSk7XG5cbiAgICAgIGlmIChpc0JlZ2lubmluZyAmJiAhd2FzQmVnaW5uaW5nKSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCdyZWFjaEJlZ2lubmluZyB0b0VkZ2UnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRW5kICYmICF3YXNFbmQpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3JlYWNoRW5kIHRvRWRnZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAod2FzQmVnaW5uaW5nICYmICFpc0JlZ2lubmluZyB8fCB3YXNFbmQgJiYgIWlzRW5kKSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCdmcm9tRWRnZScpO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuZW1pdCgncHJvZ3Jlc3MnLCBwcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2xpZGVzQ2xhc3NlcygpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHNsaWRlcyxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICBhY3RpdmVJbmRleCxcbiAgICAgICAgcmVhbEluZGV4XG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgICAgIHNsaWRlcy5yZW1vdmVDbGFzcyhgJHtwYXJhbXMuc2xpZGVBY3RpdmVDbGFzc30gJHtwYXJhbXMuc2xpZGVOZXh0Q2xhc3N9ICR7cGFyYW1zLnNsaWRlUHJldkNsYXNzfSAke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzfSAke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzc30gJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3N9YCk7XG4gICAgICBsZXQgYWN0aXZlU2xpZGU7XG5cbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgYWN0aXZlU2xpZGUgPSBzd2lwZXIuJHdyYXBwZXJFbC5maW5kKGAuJHtwYXJhbXMuc2xpZGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke2FjdGl2ZUluZGV4fVwiXWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZXEoYWN0aXZlSW5kZXgpO1xuICAgICAgfSAvLyBBY3RpdmUgY2xhc3Nlc1xuXG5cbiAgICAgIGFjdGl2ZVNsaWRlLmFkZENsYXNzKHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKTtcblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgICAgICBpZiAoYWN0aXZlU2xpZGUuaGFzQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9Om5vdCguJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc30pW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdYCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfS4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cmVhbEluZGV4fVwiXWApLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSAvLyBOZXh0IFNsaWRlXG5cblxuICAgICAgbGV0IG5leHRTbGlkZSA9IGFjdGl2ZVNsaWRlLm5leHRBbGwoYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWApLmVxKDApLmFkZENsYXNzKHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCAmJiBuZXh0U2xpZGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5leHRTbGlkZSA9IHNsaWRlcy5lcSgwKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gICAgICB9IC8vIFByZXYgU2xpZGVcblxuXG4gICAgICBsZXQgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldkFsbChgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YCkuZXEoMCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcblxuICAgICAgaWYgKHBhcmFtcy5sb29wICYmIHByZXZTbGlkZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcHJldlNsaWRlID0gc2xpZGVzLmVxKC0xKTtcbiAgICAgICAgcHJldlNsaWRlLmFkZENsYXNzKHBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICAvLyBEdXBsaWNhdGUgdG8gYWxsIGxvb3BlZCBzbGlkZXNcbiAgICAgICAgaWYgKG5leHRTbGlkZS5oYXNDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc306bm90KC4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfSlbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke25leHRTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpfVwiXWApLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtuZXh0U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKX1cIl1gKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZTbGlkZS5oYXNDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc306bm90KC4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfSlbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3ByZXZTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpfVwiXWApLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtwcmV2U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKX1cIl1gKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5lbWl0U2xpZGVzQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZUluZGV4KG5ld0FjdGl2ZUluZGV4KSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3QgdHJhbnNsYXRlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc2xpZGVzR3JpZCxcbiAgICAgICAgc25hcEdyaWQsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgYWN0aXZlSW5kZXg6IHByZXZpb3VzSW5kZXgsXG4gICAgICAgIHJlYWxJbmRleDogcHJldmlvdXNSZWFsSW5kZXgsXG4gICAgICAgIHNuYXBJbmRleDogcHJldmlvdXNTbmFwSW5kZXhcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBsZXQgYWN0aXZlSW5kZXggPSBuZXdBY3RpdmVJbmRleDtcbiAgICAgIGxldCBzbmFwSW5kZXg7XG5cbiAgICAgIGlmICh0eXBlb2YgYWN0aXZlSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgMV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNsYXRlID49IHNsaWRlc0dyaWRbaV0gJiYgdHJhbnNsYXRlIDwgc2xpZGVzR3JpZFtpICsgMV0gLSAoc2xpZGVzR3JpZFtpICsgMV0gLSBzbGlkZXNHcmlkW2ldKSAvIDIpIHtcbiAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSkge1xuICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IGkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlID49IHNsaWRlc0dyaWRbaV0pIHtcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gTm9ybWFsaXplIHNsaWRlSW5kZXhcblxuXG4gICAgICAgIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xuICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA8IDAgfHwgdHlwZW9mIGFjdGl2ZUluZGV4ID09PSAndW5kZWZpbmVkJykgYWN0aXZlSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzbmFwR3JpZC5pbmRleE9mKHRyYW5zbGF0ZSkgPj0gMCkge1xuICAgICAgICBzbmFwSW5kZXggPSBzbmFwR3JpZC5pbmRleE9mKHRyYW5zbGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBza2lwID0gTWF0aC5taW4ocGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgYWN0aXZlSW5kZXgpO1xuICAgICAgICBzbmFwSW5kZXggPSBza2lwICsgTWF0aC5mbG9vcigoYWN0aXZlSW5kZXggLSBza2lwKSAvIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxO1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IHByZXZpb3VzSW5kZXgpIHtcbiAgICAgICAgaWYgKHNuYXBJbmRleCAhPT0gcHJldmlvdXNTbmFwSW5kZXgpIHtcbiAgICAgICAgICBzd2lwZXIuc25hcEluZGV4ID0gc25hcEluZGV4O1xuICAgICAgICAgIHN3aXBlci5lbWl0KCdzbmFwSW5kZXhDaGFuZ2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gR2V0IHJlYWwgaW5kZXhcblxuXG4gICAgICBjb25zdCByZWFsSW5kZXggPSBwYXJzZUludChzd2lwZXIuc2xpZGVzLmVxKGFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpIHx8IGFjdGl2ZUluZGV4LCAxMCk7XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgICBzbmFwSW5kZXgsXG4gICAgICAgIHJlYWxJbmRleCxcbiAgICAgICAgcHJldmlvdXNJbmRleCxcbiAgICAgICAgYWN0aXZlSW5kZXhcbiAgICAgIH0pO1xuICAgICAgc3dpcGVyLmVtaXQoJ2FjdGl2ZUluZGV4Q2hhbmdlJyk7XG4gICAgICBzd2lwZXIuZW1pdCgnc25hcEluZGV4Q2hhbmdlJyk7XG5cbiAgICAgIGlmIChwcmV2aW91c1JlYWxJbmRleCAhPT0gcmVhbEluZGV4KSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCdyZWFsSW5kZXhDaGFuZ2UnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN3aXBlci5pbml0aWFsaXplZCB8fCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCkge1xuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVDaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDbGlja2VkU2xpZGUoZSkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgICBjb25zdCBzbGlkZSA9ICQoZSkuY2xvc2VzdChgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YClbMF07XG4gICAgICBsZXQgc2xpZGVGb3VuZCA9IGZhbHNlO1xuICAgICAgbGV0IHNsaWRlSW5kZXg7XG5cbiAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpXSA9PT0gc2xpZGUpIHtcbiAgICAgICAgICAgIHNsaWRlRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNsaWRlICYmIHNsaWRlRm91bmQpIHtcbiAgICAgICAgc3dpcGVyLmNsaWNrZWRTbGlkZSA9IHNsaWRlO1xuXG4gICAgICAgIGlmIChzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSBwYXJzZUludCgkKHNsaWRlKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHNsaWRlSW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5jbGlja2VkU2xpZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5zbGlkZVRvQ2xpY2tlZFNsaWRlICYmIHN3aXBlci5jbGlja2VkSW5kZXggIT09IHVuZGVmaW5lZCAmJiBzd2lwZXIuY2xpY2tlZEluZGV4ICE9PSBzd2lwZXIuYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG9DbGlja2VkU2xpZGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdXBkYXRlID0ge1xuICAgICAgdXBkYXRlU2l6ZSxcbiAgICAgIHVwZGF0ZVNsaWRlcyxcbiAgICAgIHVwZGF0ZUF1dG9IZWlnaHQsXG4gICAgICB1cGRhdGVTbGlkZXNPZmZzZXQsXG4gICAgICB1cGRhdGVTbGlkZXNQcm9ncmVzcyxcbiAgICAgIHVwZGF0ZVByb2dyZXNzLFxuICAgICAgdXBkYXRlU2xpZGVzQ2xhc3NlcyxcbiAgICAgIHVwZGF0ZUFjdGl2ZUluZGV4LFxuICAgICAgdXBkYXRlQ2xpY2tlZFNsaWRlXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFN3aXBlclRyYW5zbGF0ZShheGlzKSB7XG4gICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGF4aXMgPSB0aGlzLmlzSG9yaXpvbnRhbCgpID8gJ3gnIDogJ3knO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgICAgICB0cmFuc2xhdGUsXG4gICAgICAgICR3cmFwcGVyRWxcbiAgICAgIH0gPSBzd2lwZXI7XG5cbiAgICAgIGlmIChwYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgICAgICByZXR1cm4gcnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGU7XG4gICAgICB9XG5cbiAgICAgIGxldCBjdXJyZW50VHJhbnNsYXRlID0gZ2V0VHJhbnNsYXRlKCR3cmFwcGVyRWxbMF0sIGF4aXMpO1xuICAgICAgaWYgKHJ0bCkgY3VycmVudFRyYW5zbGF0ZSA9IC1jdXJyZW50VHJhbnNsYXRlO1xuICAgICAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGUgfHwgMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUcmFuc2xhdGUodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgICR3cmFwcGVyRWwsXG4gICAgICAgIHdyYXBwZXJFbCxcbiAgICAgICAgcHJvZ3Jlc3NcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBsZXQgeCA9IDA7XG4gICAgICBsZXQgeSA9IDA7XG4gICAgICBjb25zdCB6ID0gMDtcblxuICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICB4ID0gcnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkgPSB0cmFuc2xhdGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIHdyYXBwZXJFbFtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnc2Nyb2xsTGVmdCcgOiAnc2Nyb2xsVG9wJ10gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAteCA6IC15O1xuICAgICAgfSBlbHNlIGlmICghcGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcbiAgICAgICAgJHdyYXBwZXJFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7eH1weCwgJHt5fXB4LCAke3p9cHgpYCk7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5wcmV2aW91c1RyYW5zbGF0ZSA9IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICBzd2lwZXIudHJhbnNsYXRlID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8geCA6IHk7IC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gdXBkYXRlIHByb2dyZXNzXG5cbiAgICAgIGxldCBuZXdQcm9ncmVzcztcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuXG4gICAgICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICAgICAgbmV3UHJvZ3Jlc3MgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3UHJvZ3Jlc3MgPSAodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvIHRyYW5zbGF0ZXNEaWZmO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3UHJvZ3Jlc3MgIT09IHByb2dyZXNzKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuZW1pdCgnc2V0VHJhbnNsYXRlJywgc3dpcGVyLnRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtaW5UcmFuc2xhdGUoKSB7XG4gICAgICByZXR1cm4gLXRoaXMuc25hcEdyaWRbMF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF4VHJhbnNsYXRlKCkge1xuICAgICAgcmV0dXJuIC10aGlzLnNuYXBHcmlkW3RoaXMuc25hcEdyaWQubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlVG8odHJhbnNsYXRlLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCB0cmFuc2xhdGVCb3VuZHMsIGludGVybmFsKSB7XG4gICAgICBpZiAodHJhbnNsYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgdHJhbnNsYXRlID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICAgICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2xhdGVCb3VuZHMgPT09IHZvaWQgMCkge1xuICAgICAgICB0cmFuc2xhdGVCb3VuZHMgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHdyYXBwZXJFbFxuICAgICAgfSA9IHN3aXBlcjtcblxuICAgICAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1pblRyYW5zbGF0ZSA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICAgIGNvbnN0IG1heFRyYW5zbGF0ZSA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICAgIGxldCBuZXdUcmFuc2xhdGU7XG4gICAgICBpZiAodHJhbnNsYXRlQm91bmRzICYmIHRyYW5zbGF0ZSA+IG1pblRyYW5zbGF0ZSkgbmV3VHJhbnNsYXRlID0gbWluVHJhbnNsYXRlO2Vsc2UgaWYgKHRyYW5zbGF0ZUJvdW5kcyAmJiB0cmFuc2xhdGUgPCBtYXhUcmFuc2xhdGUpIG5ld1RyYW5zbGF0ZSA9IG1heFRyYW5zbGF0ZTtlbHNlIG5ld1RyYW5zbGF0ZSA9IHRyYW5zbGF0ZTsgLy8gVXBkYXRlIHByb2dyZXNzXG5cbiAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhuZXdUcmFuc2xhdGUpO1xuXG4gICAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgY29uc3QgaXNIID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuXG4gICAgICAgIGlmIChzcGVlZCA9PT0gMCkge1xuICAgICAgICAgIHdyYXBwZXJFbFtpc0ggPyAnc2Nyb2xsTGVmdCcgOiAnc2Nyb2xsVG9wJ10gPSAtbmV3VHJhbnNsYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghc3dpcGVyLnN1cHBvcnQuc21vb3RoU2Nyb2xsKSB7XG4gICAgICAgICAgICBhbmltYXRlQ1NTTW9kZVNjcm9sbCh7XG4gICAgICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICAgICAgdGFyZ2V0UG9zaXRpb246IC1uZXdUcmFuc2xhdGUsXG4gICAgICAgICAgICAgIHNpZGU6IGlzSCA/ICdsZWZ0JyA6ICd0b3AnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgICAgICBbaXNIID8gJ2xlZnQnIDogJ3RvcCddOiAtbmV3VHJhbnNsYXRlLFxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG5cbiAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCBzcGVlZCwgaW50ZXJuYWwpO1xuICAgICAgICAgIHN3aXBlci5lbWl0KCd0cmFuc2l0aW9uRW5kJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuXG4gICAgICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jywgc3BlZWQsIGludGVybmFsKTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvblN0YXJ0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGlmICghc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCkge1xuICAgICAgICAgICAgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZSkge1xuICAgICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgICAgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IG51bGw7XG4gICAgICAgICAgICAgIGRlbGV0ZSBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kO1xuXG4gICAgICAgICAgICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zbGF0ZSA9IHtcbiAgICAgIGdldFRyYW5zbGF0ZTogZ2V0U3dpcGVyVHJhbnNsYXRlLFxuICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgbWluVHJhbnNsYXRlLFxuICAgICAgbWF4VHJhbnNsYXRlLFxuICAgICAgdHJhbnNsYXRlVG9cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuXG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmVtaXQoJ3NldFRyYW5zaXRpb24nLCBkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRW1pdChfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIHJ1bkNhbGxiYWNrcyxcbiAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICBzdGVwXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYWN0aXZlSW5kZXgsXG4gICAgICAgIHByZXZpb3VzSW5kZXhcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBsZXQgZGlyID0gZGlyZWN0aW9uO1xuXG4gICAgICBpZiAoIWRpcikge1xuICAgICAgICBpZiAoYWN0aXZlSW5kZXggPiBwcmV2aW91c0luZGV4KSBkaXIgPSAnbmV4dCc7ZWxzZSBpZiAoYWN0aXZlSW5kZXggPCBwcmV2aW91c0luZGV4KSBkaXIgPSAncHJldic7ZWxzZSBkaXIgPSAncmVzZXQnO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuZW1pdChgdHJhbnNpdGlvbiR7c3RlcH1gKTtcblxuICAgICAgaWYgKHJ1bkNhbGxiYWNrcyAmJiBhY3RpdmVJbmRleCAhPT0gcHJldmlvdXNJbmRleCkge1xuICAgICAgICBpZiAoZGlyID09PSAncmVzZXQnKSB7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlUmVzZXRUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5lbWl0KGBzbGlkZUNoYW5nZVRyYW5zaXRpb24ke3N0ZXB9YCk7XG5cbiAgICAgICAgaWYgKGRpciA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlTmV4dFRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlUHJldlRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pIHtcbiAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgICAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXNcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBpZiAocGFyYW1zLmNzc01vZGUpIHJldHVybjtcblxuICAgICAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIHRyYW5zaXRpb25FbWl0KHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBydW5DYWxsYmFja3MsXG4gICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgc3RlcDogJ1N0YXJ0J1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbikge1xuICAgICAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtc1xuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIGlmIChwYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgICB0cmFuc2l0aW9uRW1pdCh7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgcnVuQ2FsbGJhY2tzLFxuICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgIHN0ZXA6ICdFbmQnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNpdGlvbiA9IHtcbiAgICAgIHNldFRyYW5zaXRpb24sXG4gICAgICB0cmFuc2l0aW9uU3RhcnQsXG4gICAgICB0cmFuc2l0aW9uRW5kXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsLCBpbml0aWFsKSB7XG4gICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgICAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJyAmJiB0eXBlb2YgaW5kZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICdpbmRleCcgYXJndW1lbnQgY2Fubm90IGhhdmUgdHlwZSBvdGhlciB0aGFuICdudW1iZXInIG9yICdzdHJpbmcnLiBbJHt0eXBlb2YgaW5kZXh9XSBnaXZlbi5gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgaW5kZXhgIGFyZ3VtZW50IGNvbnZlcnRlZCBmcm9tIGBzdHJpbmdgIHRvIGBudW1iZXJgLlxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgaW5kZXhBc051bWJlciA9IHBhcnNlSW50KGluZGV4LCAxMCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGBpbmRleGAgYXJndW1lbnQgaXMgYSB2YWxpZCBgbnVtYmVyYFxuICAgICAgICAgKiBhZnRlciBiZWluZyBjb252ZXJ0ZWQgZnJvbSB0aGUgYHN0cmluZ2AgdHlwZS5cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuXG4gICAgICAgIGNvbnN0IGlzVmFsaWROdW1iZXIgPSBpc0Zpbml0ZShpbmRleEFzTnVtYmVyKTtcblxuICAgICAgICBpZiAoIWlzVmFsaWROdW1iZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBwYXNzZWQtaW4gJ2luZGV4JyAoc3RyaW5nKSBjb3VsZG4ndCBiZSBjb252ZXJ0ZWQgdG8gJ251bWJlcicuIFske2luZGV4fV0gZ2l2ZW4uYCk7XG4gICAgICAgIH0gLy8gS25vd2luZyB0aGF0IHRoZSBjb252ZXJ0ZWQgYGluZGV4YCBpcyBhIHZhbGlkIG51bWJlcixcbiAgICAgICAgLy8gd2UgY2FuIHVwZGF0ZSB0aGUgb3JpZ2luYWwgYXJndW1lbnQncyB2YWx1ZS5cblxuXG4gICAgICAgIGluZGV4ID0gaW5kZXhBc051bWJlcjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGxldCBzbGlkZUluZGV4ID0gaW5kZXg7XG4gICAgICBpZiAoc2xpZGVJbmRleCA8IDApIHNsaWRlSW5kZXggPSAwO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHNuYXBHcmlkLFxuICAgICAgICBzbGlkZXNHcmlkLFxuICAgICAgICBwcmV2aW91c0luZGV4LFxuICAgICAgICBhY3RpdmVJbmRleCxcbiAgICAgICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgICAgIHdyYXBwZXJFbCxcbiAgICAgICAgZW5hYmxlZFxuICAgICAgfSA9IHN3aXBlcjtcblxuICAgICAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbiB8fCAhZW5hYmxlZCAmJiAhaW50ZXJuYWwgJiYgIWluaXRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBza2lwID0gTWF0aC5taW4oc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIHNsaWRlSW5kZXgpO1xuICAgICAgbGV0IHNuYXBJbmRleCA9IHNraXAgKyBNYXRoLmZsb29yKChzbGlkZUluZGV4IC0gc2tpcCkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxO1xuICAgICAgY29uc3QgdHJhbnNsYXRlID0gLXNuYXBHcmlkW3NuYXBJbmRleF07IC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG5cbiAgICAgIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gLU1hdGguZmxvb3IodHJhbnNsYXRlICogMTAwKTtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkR3JpZCA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpXSAqIDEwMCk7XG4gICAgICAgICAgY29uc3Qgbm9ybWFsaXplZEdyaWROZXh0ID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkW2kgKyAxXSAqIDEwMCk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIDFdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gbm9ybWFsaXplZEdyaWQgJiYgbm9ybWFsaXplZFRyYW5zbGF0ZSA8IG5vcm1hbGl6ZWRHcmlkTmV4dCAtIChub3JtYWxpemVkR3JpZE5leHQgLSBub3JtYWxpemVkR3JpZCkgLyAyKSB7XG4gICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IG5vcm1hbGl6ZWRHcmlkICYmIG5vcm1hbGl6ZWRUcmFuc2xhdGUgPCBub3JtYWxpemVkR3JpZE5leHQpIHtcbiAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBub3JtYWxpemVkR3JpZCkge1xuICAgICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IC8vIERpcmVjdGlvbnMgbG9ja3NcblxuXG4gICAgICBpZiAoc3dpcGVyLmluaXRpYWxpemVkICYmIHNsaWRlSW5kZXggIT09IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIHRyYW5zbGF0ZSA8IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlIDwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgdHJhbnNsYXRlID4gc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPiBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICBpZiAoKGFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNsaWRlSW5kZXggIT09IChwcmV2aW91c0luZGV4IHx8IDApICYmIHJ1bkNhbGxiYWNrcykge1xuICAgICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCcpO1xuICAgICAgfSAvLyBVcGRhdGUgcHJvZ3Jlc3NcblxuXG4gICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgICAgIGxldCBkaXJlY3Rpb247XG4gICAgICBpZiAoc2xpZGVJbmRleCA+IGFjdGl2ZUluZGV4KSBkaXJlY3Rpb24gPSAnbmV4dCc7ZWxzZSBpZiAoc2xpZGVJbmRleCA8IGFjdGl2ZUluZGV4KSBkaXJlY3Rpb24gPSAncHJldic7ZWxzZSBkaXJlY3Rpb24gPSAncmVzZXQnOyAvLyBVcGRhdGUgSW5kZXhcblxuICAgICAgaWYgKHJ0bCAmJiAtdHJhbnNsYXRlID09PSBzd2lwZXIudHJhbnNsYXRlIHx8ICFydGwgJiYgdHJhbnNsYXRlID09PSBzd2lwZXIudHJhbnNsYXRlKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleChzbGlkZUluZGV4KTsgLy8gVXBkYXRlIEhlaWdodFxuXG4gICAgICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuXG4gICAgICAgIGlmIChwYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnKSB7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAhPT0gJ3Jlc2V0Jykge1xuICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIGNvbnN0IGlzSCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICAgICAgY29uc3QgdCA9IHJ0bCA/IHRyYW5zbGF0ZSA6IC10cmFuc2xhdGU7XG5cbiAgICAgICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICAgICAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG5cbiAgICAgICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gJ25vbmUnO1xuICAgICAgICAgICAgc3dpcGVyLl9pbW1lZGlhdGVWaXJ0dWFsID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3cmFwcGVyRWxbaXNIID8gJ3Njcm9sbExlZnQnIDogJ3Njcm9sbFRvcCddID0gdDtcblxuICAgICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSAnJztcbiAgICAgICAgICAgICAgc3dpcGVyLl9zd2lwZXJJbW1lZGlhdGVWaXJ0dWFsID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFzd2lwZXIuc3VwcG9ydC5zbW9vdGhTY3JvbGwpIHtcbiAgICAgICAgICAgIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKHtcbiAgICAgICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogdCxcbiAgICAgICAgICAgICAgc2lkZTogaXNIID8gJ2xlZnQnIDogJ3RvcCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgICAgIFtpc0ggPyAnbGVmdCcgOiAndG9wJ106IHQsXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzcGVlZCk7XG4gICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSk7XG4gICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcblxuICAgICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgIH0gZWxzZSBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpIHtcbiAgICAgICAgICBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGUpIHtcbiAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IG51bGw7XG4gICAgICAgICAgICBkZWxldGUgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kO1xuICAgICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNsaWRlVG9Mb29wKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHtcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgICAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgICAgfVxuXG4gICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgaW5kZXhgIGFyZ3VtZW50IGNvbnZlcnRlZCBmcm9tIGBzdHJpbmdgIHRvIGBudW1iZXJgLlxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgaW5kZXhBc051bWJlciA9IHBhcnNlSW50KGluZGV4LCAxMCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGBpbmRleGAgYXJndW1lbnQgaXMgYSB2YWxpZCBgbnVtYmVyYFxuICAgICAgICAgKiBhZnRlciBiZWluZyBjb252ZXJ0ZWQgZnJvbSB0aGUgYHN0cmluZ2AgdHlwZS5cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuXG4gICAgICAgIGNvbnN0IGlzVmFsaWROdW1iZXIgPSBpc0Zpbml0ZShpbmRleEFzTnVtYmVyKTtcblxuICAgICAgICBpZiAoIWlzVmFsaWROdW1iZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBwYXNzZWQtaW4gJ2luZGV4JyAoc3RyaW5nKSBjb3VsZG4ndCBiZSBjb252ZXJ0ZWQgdG8gJ251bWJlcicuIFske2luZGV4fV0gZ2l2ZW4uYCk7XG4gICAgICAgIH0gLy8gS25vd2luZyB0aGF0IHRoZSBjb252ZXJ0ZWQgYGluZGV4YCBpcyBhIHZhbGlkIG51bWJlcixcbiAgICAgICAgLy8gd2UgY2FuIHVwZGF0ZSB0aGUgb3JpZ2luYWwgYXJndW1lbnQncyB2YWx1ZS5cblxuXG4gICAgICAgIGluZGV4ID0gaW5kZXhBc051bWJlcjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGxldCBuZXdJbmRleCA9IGluZGV4O1xuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIG5ld0luZGV4ICs9IHN3aXBlci5sb29wZWRTbGlkZXM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhuZXdJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgIH1cblxuICAgIC8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuICAgIGZ1bmN0aW9uIHNsaWRlTmV4dChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICAgICAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICAgICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGFuaW1hdGluZyxcbiAgICAgICAgZW5hYmxlZCxcbiAgICAgICAgcGFyYW1zXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgaWYgKCFlbmFibGVkKSByZXR1cm4gc3dpcGVyO1xuICAgICAgbGV0IHBlckdyb3VwID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuXG4gICAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDEgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwQXV0bykge1xuICAgICAgICBwZXJHcm91cCA9IE1hdGgubWF4KHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygnY3VycmVudCcsIHRydWUpLCAxKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5jcmVtZW50ID0gc3dpcGVyLmFjdGl2ZUluZGV4IDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCA/IDEgOiBwZXJHcm91cDtcblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIGlmIChhbmltYXRpbmcgJiYgcGFyYW1zLmxvb3BQcmV2ZW50c1NsaWRlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHN3aXBlci5sb29wRml4KCk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG4gICAgICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci4kd3JhcHBlckVsWzBdLmNsaWVudExlZnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMucmV3aW5kICYmIHN3aXBlci5pc0VuZCkge1xuICAgICAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oMCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgaW5jcmVtZW50LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG4gICAgZnVuY3Rpb24gc2xpZGVQcmV2KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgICAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgICAgfVxuXG4gICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBhbmltYXRpbmcsXG4gICAgICAgIHNuYXBHcmlkLFxuICAgICAgICBzbGlkZXNHcmlkLFxuICAgICAgICBydGxUcmFuc2xhdGUsXG4gICAgICAgIGVuYWJsZWRcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBpZiAoIWVuYWJsZWQpIHJldHVybiBzd2lwZXI7XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBpZiAoYW5pbWF0aW5nICYmIHBhcmFtcy5sb29wUHJldmVudHNTbGlkZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBzd2lwZXIubG9vcEZpeCgpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcblxuICAgICAgICBzd2lwZXIuX2NsaWVudExlZnQgPSBzd2lwZXIuJHdyYXBwZXJFbFswXS5jbGllbnRMZWZ0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSBydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG5cbiAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZSh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA8IDApIHJldHVybiAtTWF0aC5mbG9vcihNYXRoLmFicyh2YWwpKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodmFsKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IG5vcm1hbGl6ZSh0cmFuc2xhdGUpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFNuYXBHcmlkID0gc25hcEdyaWQubWFwKHZhbCA9PiBub3JtYWxpemUodmFsKSk7XG4gICAgICBsZXQgcHJldlNuYXAgPSBzbmFwR3JpZFtub3JtYWxpemVkU25hcEdyaWQuaW5kZXhPZihub3JtYWxpemVkVHJhbnNsYXRlKSAtIDFdO1xuXG4gICAgICBpZiAodHlwZW9mIHByZXZTbmFwID09PSAndW5kZWZpbmVkJyAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICBsZXQgcHJldlNuYXBJbmRleDtcbiAgICAgICAgc25hcEdyaWQuZm9yRWFjaCgoc25hcCwgc25hcEluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gc25hcCkge1xuICAgICAgICAgICAgLy8gcHJldlNuYXAgPSBzbmFwO1xuICAgICAgICAgICAgcHJldlNuYXBJbmRleCA9IHNuYXBJbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcHJldlNuYXBJbmRleCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBwcmV2U25hcCA9IHNuYXBHcmlkW3ByZXZTbmFwSW5kZXggPiAwID8gcHJldlNuYXBJbmRleCAtIDEgOiBwcmV2U25hcEluZGV4XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgcHJldkluZGV4ID0gMDtcblxuICAgICAgaWYgKHR5cGVvZiBwcmV2U25hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJldkluZGV4ID0gc2xpZGVzR3JpZC5pbmRleE9mKHByZXZTbmFwKTtcbiAgICAgICAgaWYgKHByZXZJbmRleCA8IDApIHByZXZJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleCAtIDE7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAxICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cEF1dG8pIHtcbiAgICAgICAgICBwcmV2SW5kZXggPSBwcmV2SW5kZXggLSBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoJ3ByZXZpb3VzJywgdHJ1ZSkgKyAxO1xuICAgICAgICAgIHByZXZJbmRleCA9IE1hdGgubWF4KHByZXZJbmRleCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHN3aXBlci5wYXJhbXMudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBzd2lwZXIudmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggLSAxIDogc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8obGFzdEluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhwcmV2SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cbiAgICBmdW5jdGlvbiBzbGlkZVJlc2V0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgICAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgICAgfVxuXG4gICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cbiAgICBmdW5jdGlvbiBzbGlkZVRvQ2xvc2VzdChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCwgdGhyZXNob2xkKSB7XG4gICAgICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgICAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgICAgfVxuXG4gICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRocmVzaG9sZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRocmVzaG9sZCA9IDAuNTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGxldCBpbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgIGNvbnN0IHNraXAgPSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgaW5kZXgpO1xuICAgICAgY29uc3Qgc25hcEluZGV4ID0gc2tpcCArIE1hdGguZmxvb3IoKGluZGV4IC0gc2tpcCkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG5cbiAgICAgIGlmICh0cmFuc2xhdGUgPj0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleF0pIHtcbiAgICAgICAgLy8gVGhlIGN1cnJlbnQgdHJhbnNsYXRlIGlzIG9uIG9yIGFmdGVyIHRoZSBjdXJyZW50IHNuYXAgaW5kZXgsIHNvIHRoZSBjaG9pY2VcbiAgICAgICAgLy8gaXMgYmV0d2VlbiB0aGUgY3VycmVudCBpbmRleCBhbmQgdGhlIG9uZSBhZnRlciBpdC5cbiAgICAgICAgY29uc3QgY3VycmVudFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XTtcbiAgICAgICAgY29uc3QgbmV4dFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4ICsgMV07XG5cbiAgICAgICAgaWYgKHRyYW5zbGF0ZSAtIGN1cnJlbnRTbmFwID4gKG5leHRTbmFwIC0gY3VycmVudFNuYXApICogdGhyZXNob2xkKSB7XG4gICAgICAgICAgaW5kZXggKz0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlIGN1cnJlbnQgdHJhbnNsYXRlIGlzIGJlZm9yZSB0aGUgY3VycmVudCBzbmFwIGluZGV4LCBzbyB0aGUgY2hvaWNlXG4gICAgICAgIC8vIGlzIGJldHdlZW4gdGhlIGN1cnJlbnQgaW5kZXggYW5kIHRoZSBvbmUgYmVmb3JlIGl0LlxuICAgICAgICBjb25zdCBwcmV2U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXggLSAxXTtcbiAgICAgICAgY29uc3QgY3VycmVudFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XTtcblxuICAgICAgICBpZiAodHJhbnNsYXRlIC0gcHJldlNuYXAgPD0gKGN1cnJlbnRTbmFwIC0gcHJldlNuYXApICogdGhyZXNob2xkKSB7XG4gICAgICAgICAgaW5kZXggLT0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpbmRleCA9IE1hdGgubWF4KGluZGV4LCAwKTtcbiAgICAgIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIHN3aXBlci5zbGlkZXNHcmlkLmxlbmd0aCAtIDEpO1xuICAgICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2xpZGVUb0NsaWNrZWRTbGlkZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgJHdyYXBwZXJFbFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGNvbnN0IHNsaWRlc1BlclZpZXcgPSBwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nID8gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCkgOiBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIGxldCBzbGlkZVRvSW5kZXggPSBzd2lwZXIuY2xpY2tlZEluZGV4O1xuICAgICAgbGV0IHJlYWxJbmRleDtcblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nKSByZXR1cm47XG4gICAgICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KCQoc3dpcGVyLmNsaWNrZWRTbGlkZSkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuXG4gICAgICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICBpZiAoc2xpZGVUb0luZGV4IDwgc3dpcGVyLmxvb3BlZFNsaWRlcyAtIHNsaWRlc1BlclZpZXcgLyAyIHx8IHNsaWRlVG9JbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gc3dpcGVyLmxvb3BlZFNsaWRlcyArIHNsaWRlc1BlclZpZXcgLyAyKSB7XG4gICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICAgICAgc2xpZGVUb0luZGV4ID0gJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdOm5vdCguJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc30pYCkuZXEoMCkuaW5kZXgoKTtcbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZVRvSW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpIHtcbiAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICAgIHNsaWRlVG9JbmRleCA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cmVhbEluZGV4fVwiXTpub3QoLiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9KWApLmVxKDApLmluZGV4KCk7XG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzbGlkZSA9IHtcbiAgICAgIHNsaWRlVG8sXG4gICAgICBzbGlkZVRvTG9vcCxcbiAgICAgIHNsaWRlTmV4dCxcbiAgICAgIHNsaWRlUHJldixcbiAgICAgIHNsaWRlUmVzZXQsXG4gICAgICBzbGlkZVRvQ2xvc2VzdCxcbiAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGVcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9vcENyZWF0ZSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgJHdyYXBwZXJFbFxuICAgICAgfSA9IHN3aXBlcjsgLy8gUmVtb3ZlIGR1cGxpY2F0ZWQgc2xpZGVzXG5cbiAgICAgIGNvbnN0ICRzZWxlY3RvciA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oKS5sZW5ndGggPiAwID8gJCgkd3JhcHBlckVsLmNoaWxkcmVuKClbMF0ucGFyZW50Tm9kZSkgOiAkd3JhcHBlckVsO1xuICAgICAgJHNlbGVjdG9yLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc30uJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc31gKS5yZW1vdmUoKTtcbiAgICAgIGxldCBzbGlkZXMgPSAkc2VsZWN0b3IuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWApO1xuXG4gICAgICBpZiAocGFyYW1zLmxvb3BGaWxsR3JvdXBXaXRoQmxhbmspIHtcbiAgICAgICAgY29uc3QgYmxhbmtTbGlkZXNOdW0gPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgLSBzbGlkZXMubGVuZ3RoICUgcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuXG4gICAgICAgIGlmIChibGFua1NsaWRlc051bSAhPT0gcGFyYW1zLnNsaWRlc1Blckdyb3VwKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibGFua1NsaWRlc051bTsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBibGFua05vZGUgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS5hZGRDbGFzcyhgJHtwYXJhbXMuc2xpZGVDbGFzc30gJHtwYXJhbXMuc2xpZGVCbGFua0NsYXNzfWApO1xuICAgICAgICAgICAgJHNlbGVjdG9yLmFwcGVuZChibGFua05vZGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNsaWRlcyA9ICRzZWxlY3Rvci5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgIXBhcmFtcy5sb29wZWRTbGlkZXMpIHBhcmFtcy5sb29wZWRTbGlkZXMgPSBzbGlkZXMubGVuZ3RoO1xuICAgICAgc3dpcGVyLmxvb3BlZFNsaWRlcyA9IE1hdGguY2VpbChwYXJzZUZsb2F0KHBhcmFtcy5sb29wZWRTbGlkZXMgfHwgcGFyYW1zLnNsaWRlc1BlclZpZXcsIDEwKSk7XG4gICAgICBzd2lwZXIubG9vcGVkU2xpZGVzICs9IHBhcmFtcy5sb29wQWRkaXRpb25hbFNsaWRlcztcblxuICAgICAgaWYgKHN3aXBlci5sb29wZWRTbGlkZXMgPiBzbGlkZXMubGVuZ3RoICYmIHN3aXBlci5wYXJhbXMubG9vcGVkU2xpZGVzTGltaXQpIHtcbiAgICAgICAgc3dpcGVyLmxvb3BlZFNsaWRlcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXBlbmRTbGlkZXMgPSBbXTtcbiAgICAgIGNvbnN0IGFwcGVuZFNsaWRlcyA9IFtdO1xuICAgICAgc2xpZGVzLmVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZSA9ICQoZWwpO1xuICAgICAgICBzbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci5sb29wZWRTbGlkZXM7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGkgLSBNYXRoLmZsb29yKGkgLyBzbGlkZXMubGVuZ3RoKSAqIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIGFwcGVuZFNsaWRlcy5wdXNoKHNsaWRlcy5lcShpbmRleClbMF0pO1xuICAgICAgICBwcmVwZW5kU2xpZGVzLnVuc2hpZnQoc2xpZGVzLmVxKHNsaWRlcy5sZW5ndGggLSBpbmRleCAtIDEpWzBdKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcHBlbmRTbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgJHNlbGVjdG9yLmFwcGVuZCgkKGFwcGVuZFNsaWRlc1tpXS5jbG9uZU5vZGUodHJ1ZSkpLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSBwcmVwZW5kU2xpZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICRzZWxlY3Rvci5wcmVwZW5kKCQocHJlcGVuZFNsaWRlc1tpXS5jbG9uZU5vZGUodHJ1ZSkpLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9vcEZpeCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlTG9vcEZpeCcpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBhY3RpdmVJbmRleCxcbiAgICAgICAgc2xpZGVzLFxuICAgICAgICBsb29wZWRTbGlkZXMsXG4gICAgICAgIGFsbG93U2xpZGVQcmV2LFxuICAgICAgICBhbGxvd1NsaWRlTmV4dCxcbiAgICAgICAgc25hcEdyaWQsXG4gICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgbGV0IG5ld0luZGV4O1xuICAgICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gdHJ1ZTtcbiAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XG4gICAgICBjb25zdCBzbmFwVHJhbnNsYXRlID0gLXNuYXBHcmlkW2FjdGl2ZUluZGV4XTtcbiAgICAgIGNvbnN0IGRpZmYgPSBzbmFwVHJhbnNsYXRlIC0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpOyAvLyBGaXggRm9yIE5lZ2F0aXZlIE92ZXJzbGlkaW5nXG5cbiAgICAgIGlmIChhY3RpdmVJbmRleCA8IGxvb3BlZFNsaWRlcykge1xuICAgICAgICBuZXdJbmRleCA9IHNsaWRlcy5sZW5ndGggLSBsb29wZWRTbGlkZXMgKiAzICsgYWN0aXZlSW5kZXg7XG4gICAgICAgIG5ld0luZGV4ICs9IGxvb3BlZFNsaWRlcztcbiAgICAgICAgY29uc3Qgc2xpZGVDaGFuZ2VkID0gc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcblxuICAgICAgICBpZiAoc2xpZGVDaGFuZ2VkICYmIGRpZmYgIT09IDApIHtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKChydGwgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGUpIC0gZGlmZik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWN0aXZlSW5kZXggPj0gc2xpZGVzLmxlbmd0aCAtIGxvb3BlZFNsaWRlcykge1xuICAgICAgICAvLyBGaXggRm9yIFBvc2l0aXZlIE92ZXJzbGlkaW5nXG4gICAgICAgIG5ld0luZGV4ID0gLXNsaWRlcy5sZW5ndGggKyBhY3RpdmVJbmRleCArIGxvb3BlZFNsaWRlcztcbiAgICAgICAgbmV3SW5kZXggKz0gbG9vcGVkU2xpZGVzO1xuICAgICAgICBjb25zdCBzbGlkZUNoYW5nZWQgPSBzd2lwZXIuc2xpZGVUbyhuZXdJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuXG4gICAgICAgIGlmIChzbGlkZUNoYW5nZWQgJiYgZGlmZiAhPT0gMCkge1xuICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoKHJ0bCA/IC1zd2lwZXIudHJhbnNsYXRlIDogc3dpcGVyLnRyYW5zbGF0ZSkgLSBkaWZmKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuICAgICAgc3dpcGVyLmVtaXQoJ2xvb3BGaXgnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29wRGVzdHJveSgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgICR3cmFwcGVyRWwsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgc2xpZGVzXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9LC4ke3BhcmFtcy5zbGlkZUNsYXNzfS4ke3BhcmFtcy5zbGlkZUJsYW5rQ2xhc3N9YCkucmVtb3ZlKCk7XG4gICAgICBzbGlkZXMucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgICB9XG5cbiAgICB2YXIgbG9vcCA9IHtcbiAgICAgIGxvb3BDcmVhdGUsXG4gICAgICBsb29wRml4LFxuICAgICAgbG9vcERlc3Ryb3lcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0R3JhYkN1cnNvcihtb3ZpbmcpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnN1cHBvcnQudG91Y2ggfHwgIXN3aXBlci5wYXJhbXMuc2ltdWxhdGVUb3VjaCB8fCBzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkIHx8IHN3aXBlci5wYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICAgICAgY29uc3QgZWwgPSBzd2lwZXIucGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnY29udGFpbmVyJyA/IHN3aXBlci5lbCA6IHN3aXBlci53cmFwcGVyRWw7XG4gICAgICBlbC5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gICAgICBlbC5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnZ3JhYmJpbmcnIDogJ2dyYWInO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuc2V0R3JhYkN1cnNvcigpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG5cbiAgICAgIGlmIChzd2lwZXIuc3VwcG9ydC50b3VjaCB8fCBzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkIHx8IHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN3aXBlcltzd2lwZXIucGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnY29udGFpbmVyJyA/ICdlbCcgOiAnd3JhcHBlckVsJ10uc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgfVxuXG4gICAgdmFyIGdyYWJDdXJzb3IgPSB7XG4gICAgICBzZXRHcmFiQ3Vyc29yLFxuICAgICAgdW5zZXRHcmFiQ3Vyc29yXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsb3Nlc3RFbGVtZW50KHNlbGVjdG9yLCBiYXNlKSB7XG4gICAgICBpZiAoYmFzZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGJhc2UgPSB0aGlzO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfX2Nsb3Nlc3RGcm9tKGVsKSB7XG4gICAgICAgIGlmICghZWwgfHwgZWwgPT09IGdldERvY3VtZW50KCkgfHwgZWwgPT09IGdldFdpbmRvdygpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKGVsLmFzc2lnbmVkU2xvdCkgZWwgPSBlbC5hc3NpZ25lZFNsb3Q7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gZWwuY2xvc2VzdChzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKCFmb3VuZCAmJiAhZWwuZ2V0Um9vdE5vZGUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZCB8fCBfX2Nsb3Nlc3RGcm9tKGVsLmdldFJvb3ROb2RlKCkuaG9zdCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfX2Nsb3Nlc3RGcm9tKGJhc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgdG91Y2hlcyxcbiAgICAgICAgZW5hYmxlZFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5jc3NNb2RlICYmIHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBlID0gZXZlbnQ7XG4gICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgbGV0ICR0YXJnZXRFbCA9ICQoZS50YXJnZXQpO1xuXG4gICAgICBpZiAocGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnd3JhcHBlcicpIHtcbiAgICAgICAgaWYgKCEkdGFyZ2V0RWwuY2xvc2VzdChzd2lwZXIud3JhcHBlckVsKS5sZW5ndGgpIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGF0YS5pc1RvdWNoRXZlbnQgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JztcbiAgICAgIGlmICghZGF0YS5pc1RvdWNoRXZlbnQgJiYgJ3doaWNoJyBpbiBlICYmIGUud2hpY2ggPT09IDMpIHJldHVybjtcbiAgICAgIGlmICghZGF0YS5pc1RvdWNoRXZlbnQgJiYgJ2J1dHRvbicgaW4gZSAmJiBlLmJ1dHRvbiA+IDApIHJldHVybjtcbiAgICAgIGlmIChkYXRhLmlzVG91Y2hlZCAmJiBkYXRhLmlzTW92ZWQpIHJldHVybjsgLy8gY2hhbmdlIHRhcmdldCBlbCBmb3Igc2hhZG93IHJvb3QgY29tcG9uZW50XG5cbiAgICAgIGNvbnN0IHN3aXBpbmdDbGFzc0hhc1ZhbHVlID0gISFwYXJhbXMubm9Td2lwaW5nQ2xhc3MgJiYgcGFyYW1zLm5vU3dpcGluZ0NsYXNzICE9PSAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cbiAgICAgIGNvbnN0IGV2ZW50UGF0aCA9IGV2ZW50LmNvbXBvc2VkUGF0aCA/IGV2ZW50LmNvbXBvc2VkUGF0aCgpIDogZXZlbnQucGF0aDtcblxuICAgICAgaWYgKHN3aXBpbmdDbGFzc0hhc1ZhbHVlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnNoYWRvd1Jvb3QgJiYgZXZlbnRQYXRoKSB7XG4gICAgICAgICR0YXJnZXRFbCA9ICQoZXZlbnRQYXRoWzBdKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9Td2lwaW5nU2VsZWN0b3IgPSBwYXJhbXMubm9Td2lwaW5nU2VsZWN0b3IgPyBwYXJhbXMubm9Td2lwaW5nU2VsZWN0b3IgOiBgLiR7cGFyYW1zLm5vU3dpcGluZ0NsYXNzfWA7XG4gICAgICBjb25zdCBpc1RhcmdldFNoYWRvdyA9ICEhKGUudGFyZ2V0ICYmIGUudGFyZ2V0LnNoYWRvd1Jvb3QpOyAvLyB1c2UgY2xvc2VzdEVsZW1lbnQgZm9yIHNoYWRvdyByb290IGVsZW1lbnQgdG8gZ2V0IHRoZSBhY3R1YWwgY2xvc2VzdCBmb3IgbmVzdGVkIHNoYWRvdyByb290IGVsZW1lbnRcblxuICAgICAgaWYgKHBhcmFtcy5ub1N3aXBpbmcgJiYgKGlzVGFyZ2V0U2hhZG93ID8gY2xvc2VzdEVsZW1lbnQobm9Td2lwaW5nU2VsZWN0b3IsICR0YXJnZXRFbFswXSkgOiAkdGFyZ2V0RWwuY2xvc2VzdChub1N3aXBpbmdTZWxlY3RvcilbMF0pKSB7XG4gICAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLnN3aXBlSGFuZGxlcikge1xuICAgICAgICBpZiAoISR0YXJnZXRFbC5jbG9zZXN0KHBhcmFtcy5zd2lwZUhhbmRsZXIpWzBdKSByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRvdWNoZXMuY3VycmVudFggPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICB0b3VjaGVzLmN1cnJlbnRZID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgY29uc3Qgc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgICAgIGNvbnN0IHN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7IC8vIERvIE5PVCBzdGFydCBpZiBpT1MgZWRnZSBzd2lwZSBpcyBkZXRlY3RlZC4gT3RoZXJ3aXNlIGlPUyBhcHAgY2Fubm90IHN3aXBlLXRvLWdvLWJhY2sgYW55bW9yZVxuXG4gICAgICBjb25zdCBlZGdlU3dpcGVEZXRlY3Rpb24gPSBwYXJhbXMuZWRnZVN3aXBlRGV0ZWN0aW9uIHx8IHBhcmFtcy5pT1NFZGdlU3dpcGVEZXRlY3Rpb247XG4gICAgICBjb25zdCBlZGdlU3dpcGVUaHJlc2hvbGQgPSBwYXJhbXMuZWRnZVN3aXBlVGhyZXNob2xkIHx8IHBhcmFtcy5pT1NFZGdlU3dpcGVUaHJlc2hvbGQ7XG5cbiAgICAgIGlmIChlZGdlU3dpcGVEZXRlY3Rpb24gJiYgKHN0YXJ0WCA8PSBlZGdlU3dpcGVUaHJlc2hvbGQgfHwgc3RhcnRYID49IHdpbmRvdy5pbm5lcldpZHRoIC0gZWRnZVN3aXBlVGhyZXNob2xkKSkge1xuICAgICAgICBpZiAoZWRnZVN3aXBlRGV0ZWN0aW9uID09PSAncHJldmVudCcpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgaXNUb3VjaGVkOiB0cnVlLFxuICAgICAgICBpc01vdmVkOiBmYWxzZSxcbiAgICAgICAgYWxsb3dUb3VjaENhbGxiYWNrczogdHJ1ZSxcbiAgICAgICAgaXNTY3JvbGxpbmc6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhcnRNb3Zpbmc6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgICB0b3VjaGVzLnN0YXJ0WCA9IHN0YXJ0WDtcbiAgICAgIHRvdWNoZXMuc3RhcnRZID0gc3RhcnRZO1xuICAgICAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IG5vdygpO1xuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgICAgIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSBmYWxzZTtcblxuICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgIGxldCBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCR0YXJnZXRFbC5pcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoJHRhcmdldEVsWzBdLm5vZGVOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09ICR0YXJnZXRFbFswXSkge1xuICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hvdWxkUHJldmVudERlZmF1bHQgPSBwcmV2ZW50RGVmYXVsdCAmJiBzd2lwZXIuYWxsb3dUb3VjaE1vdmUgJiYgcGFyYW1zLnRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDtcblxuICAgICAgICBpZiAoKHBhcmFtcy50b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCB8fCBzaG91bGRQcmV2ZW50RGVmYXVsdCkgJiYgISR0YXJnZXRFbFswXS5pc0NvbnRlbnRFZGl0YWJsZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiBzd2lwZXIucGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlICYmIHN3aXBlci5hbmltYXRpbmcgJiYgIXBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoU3RhcnQoKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoU3RhcnQnLCBlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHRvdWNoZXMsXG4gICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgICAgICBlbmFibGVkXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gICAgICBsZXQgZSA9IGV2ZW50O1xuICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcblxuICAgICAgaWYgKCFkYXRhLmlzVG91Y2hlZCkge1xuICAgICAgICBpZiAoZGF0YS5zdGFydE1vdmluZyAmJiBkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZU9wcG9zaXRlJywgZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBlLnR5cGUgIT09ICd0b3VjaG1vdmUnKSByZXR1cm47XG4gICAgICBjb25zdCB0YXJnZXRUb3VjaCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgJiYgZS50YXJnZXRUb3VjaGVzICYmIChlLnRhcmdldFRvdWNoZXNbMF0gfHwgZS5jaGFuZ2VkVG91Y2hlc1swXSk7XG4gICAgICBjb25zdCBwYWdlWCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyB0YXJnZXRUb3VjaC5wYWdlWCA6IGUucGFnZVg7XG4gICAgICBjb25zdCBwYWdlWSA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyB0YXJnZXRUb3VjaC5wYWdlWSA6IGUucGFnZVk7XG5cbiAgICAgIGlmIChlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyKSB7XG4gICAgICAgIHRvdWNoZXMuc3RhcnRYID0gcGFnZVg7XG4gICAgICAgIHRvdWNoZXMuc3RhcnRZID0gcGFnZVk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzd2lwZXIuYWxsb3dUb3VjaE1vdmUpIHtcbiAgICAgICAgaWYgKCEkKGUudGFyZ2V0KS5pcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgICAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5pc1RvdWNoZWQpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHRvdWNoZXMsIHtcbiAgICAgICAgICAgIHN0YXJ0WDogcGFnZVgsXG4gICAgICAgICAgICBzdGFydFk6IHBhZ2VZLFxuICAgICAgICAgICAgY3VycmVudFg6IHBhZ2VYLFxuICAgICAgICAgICAgY3VycmVudFk6IHBhZ2VZXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IG5vdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS5pc1RvdWNoRXZlbnQgJiYgcGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMgJiYgIXBhcmFtcy5sb29wKSB7XG4gICAgICAgIGlmIChzd2lwZXIuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICAgICAgLy8gVmVydGljYWxcbiAgICAgICAgICBpZiAocGFnZVkgPCB0b3VjaGVzLnN0YXJ0WSAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSB8fCBwYWdlWSA+IHRvdWNoZXMuc3RhcnRZICYmIHN3aXBlci50cmFuc2xhdGUgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2VYIDwgdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgfHwgcGFnZVggPiB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS5pc1RvdWNoRXZlbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgJChlLnRhcmdldCkuaXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykpIHtcbiAgICAgICAgICBkYXRhLmlzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZScsIGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAxKSByZXR1cm47XG4gICAgICB0b3VjaGVzLmN1cnJlbnRYID0gcGFnZVg7XG4gICAgICB0b3VjaGVzLmN1cnJlbnRZID0gcGFnZVk7XG4gICAgICBjb25zdCBkaWZmWCA9IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnN0YXJ0WDtcbiAgICAgIGNvbnN0IGRpZmZZID0gdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMuc3RhcnRZO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMudGhyZXNob2xkICYmIE1hdGguc3FydChkaWZmWCAqKiAyICsgZGlmZlkgKiogMikgPCBzd2lwZXIucGFyYW1zLnRocmVzaG9sZCkgcmV0dXJuO1xuXG4gICAgICBpZiAodHlwZW9mIGRhdGEuaXNTY3JvbGxpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxldCB0b3VjaEFuZ2xlO1xuXG4gICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgdG91Y2hlcy5jdXJyZW50WSA9PT0gdG91Y2hlcy5zdGFydFkgfHwgc3dpcGVyLmlzVmVydGljYWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRYID09PSB0b3VjaGVzLnN0YXJ0WCkge1xuICAgICAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICBpZiAoZGlmZlggKiBkaWZmWCArIGRpZmZZICogZGlmZlkgPj0gMjUpIHtcbiAgICAgICAgICAgIHRvdWNoQW5nbGUgPSBNYXRoLmF0YW4yKE1hdGguYWJzKGRpZmZZKSwgTWF0aC5hYnMoZGlmZlgpKSAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlIDogOTAgLSB0b3VjaEFuZ2xlID4gcGFyYW1zLnRvdWNoQW5nbGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCd0b3VjaE1vdmVPcHBvc2l0ZScsIGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGRhdGEuc3RhcnRNb3ZpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0b3VjaGVzLmN1cnJlbnRYICE9PSB0b3VjaGVzLnN0YXJ0WCB8fCB0b3VjaGVzLmN1cnJlbnRZICE9PSB0b3VjaGVzLnN0YXJ0WSkge1xuICAgICAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhLnN0YXJ0TW92aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcblxuICAgICAgaWYgKCFwYXJhbXMuY3NzTW9kZSAmJiBlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLnRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbiAmJiAhcGFyYW1zLm5lc3RlZCkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRhdGEuaXNNb3ZlZCkge1xuICAgICAgICBpZiAocGFyYW1zLmxvb3AgJiYgIXBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEuc3RhcnRUcmFuc2xhdGUgPSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCk7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuXG4gICAgICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwudHJpZ2dlcignd2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSBmYWxzZTsgLy8gR3JhYiBDdXJzb3JcblxuICAgICAgICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgKHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSB8fCBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVyRmlyc3RNb3ZlJywgZSk7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5lbWl0KCdzbGlkZXJNb3ZlJywgZSk7XG4gICAgICBkYXRhLmlzTW92ZWQgPSB0cnVlO1xuICAgICAgbGV0IGRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBkaWZmWCA6IGRpZmZZO1xuICAgICAgdG91Y2hlcy5kaWZmID0gZGlmZjtcbiAgICAgIGRpZmYgKj0gcGFyYW1zLnRvdWNoUmF0aW87XG4gICAgICBpZiAocnRsKSBkaWZmID0gLWRpZmY7XG4gICAgICBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPSBkaWZmID4gMCA/ICdwcmV2JyA6ICduZXh0JztcbiAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgbGV0IGRpc2FibGVQYXJlbnRTd2lwZXIgPSB0cnVlO1xuICAgICAgbGV0IHJlc2lzdGFuY2VSYXRpbyA9IHBhcmFtcy5yZXNpc3RhbmNlUmF0aW87XG5cbiAgICAgIGlmIChwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgICAgICByZXNpc3RhbmNlUmF0aW8gPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlmZiA+IDAgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHBhcmFtcy5yZXNpc3RhbmNlKSBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIubWluVHJhbnNsYXRlKCkgLSAxICsgKC1zd2lwZXIubWluVHJhbnNsYXRlKCkgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlICsgZGlmZikgKiogcmVzaXN0YW5jZVJhdGlvO1xuICAgICAgfSBlbHNlIGlmIChkaWZmIDwgMCAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgICAgICBpZiAocGFyYW1zLnJlc2lzdGFuY2UpIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSArIDEgLSAoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gZGF0YS5zdGFydFRyYW5zbGF0ZSAtIGRpZmYpICoqIHJlc2lzdGFuY2VSYXRpbztcbiAgICAgIH1cblxuICAgICAgaWYgKGRpc2FibGVQYXJlbnRTd2lwZXIpIHtcbiAgICAgICAgZS5wcmV2ZW50ZWRCeU5lc3RlZFN3aXBlciA9IHRydWU7XG4gICAgICB9IC8vIERpcmVjdGlvbnMgbG9ja3NcblxuXG4gICAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgIXN3aXBlci5hbGxvd1NsaWRlTmV4dCkge1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgfSAvLyBUaHJlc2hvbGRcblxuXG4gICAgICBpZiAocGFyYW1zLnRocmVzaG9sZCA+IDApIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpZmYpID4gcGFyYW1zLnRocmVzaG9sZCB8fCBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgICAgIGlmICghZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUpIHtcbiAgICAgICAgICAgIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRvdWNoZXMuc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgICAgICAgICAgIHRvdWNoZXMuc3RhcnRZID0gdG91Y2hlcy5jdXJyZW50WTtcbiAgICAgICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgICAgICB0b3VjaGVzLmRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5zdGFydFggOiB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zLmZvbGxvd0ZpbmdlciB8fCBwYXJhbXMuY3NzTW9kZSkgcmV0dXJuOyAvLyBVcGRhdGUgYWN0aXZlIGluZGV4IGluIGZyZWUgbW9kZVxuXG4gICAgICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmIHN3aXBlci5mcmVlTW9kZSB8fCBwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlKSB7XG4gICAgICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoTW92ZSgpO1xuICAgICAgfSAvLyBVcGRhdGUgcHJvZ3Jlc3NcblxuXG4gICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTsgLy8gVXBkYXRlIHRyYW5zbGF0ZVxuXG4gICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKGRhdGEuY3VycmVudFRyYW5zbGF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Ub3VjaEVuZChldmVudCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHRvdWNoZXMsXG4gICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgICAgICBzbGlkZXNHcmlkLFxuICAgICAgICBlbmFibGVkXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gICAgICBsZXQgZSA9IGV2ZW50O1xuICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcblxuICAgICAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgICAgICBzd2lwZXIuZW1pdCgndG91Y2hFbmQnLCBlKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzID0gZmFsc2U7XG5cbiAgICAgIGlmICghZGF0YS5pc1RvdWNoZWQpIHtcbiAgICAgICAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBwYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gUmV0dXJuIEdyYWIgQ3Vyc29yXG5cblxuICAgICAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIGRhdGEuaXNNb3ZlZCAmJiBkYXRhLmlzVG91Y2hlZCAmJiAoc3dpcGVyLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlIHx8IHN3aXBlci5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICAgICAgfSAvLyBUaW1lIGRpZmZcblxuXG4gICAgICBjb25zdCB0b3VjaEVuZFRpbWUgPSBub3coKTtcbiAgICAgIGNvbnN0IHRpbWVEaWZmID0gdG91Y2hFbmRUaW1lIC0gZGF0YS50b3VjaFN0YXJ0VGltZTsgLy8gVGFwLCBkb3VibGVUYXAsIENsaWNrXG5cbiAgICAgIGlmIChzd2lwZXIuYWxsb3dDbGljaykge1xuICAgICAgICBjb25zdCBwYXRoVHJlZSA9IGUucGF0aCB8fCBlLmNvbXBvc2VkUGF0aCAmJiBlLmNvbXBvc2VkUGF0aCgpO1xuICAgICAgICBzd2lwZXIudXBkYXRlQ2xpY2tlZFNsaWRlKHBhdGhUcmVlICYmIHBhdGhUcmVlWzBdIHx8IGUudGFyZ2V0KTtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3RhcCBjbGljaycsIGUpO1xuXG4gICAgICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiB0b3VjaEVuZFRpbWUgLSBkYXRhLmxhc3RDbGlja1RpbWUgPCAzMDApIHtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnZG91YmxlVGFwIGRvdWJsZUNsaWNrJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGF0YS5sYXN0Q2xpY2tUaW1lID0gbm93KCk7XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLmRlc3Ryb3llZCkgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghZGF0YS5pc1RvdWNoZWQgfHwgIWRhdGEuaXNNb3ZlZCB8fCAhc3dpcGVyLnN3aXBlRGlyZWN0aW9uIHx8IHRvdWNoZXMuZGlmZiA9PT0gMCB8fCBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPT09IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XG4gICAgICBsZXQgY3VycmVudFBvcztcblxuICAgICAgaWYgKHBhcmFtcy5mb2xsb3dGaW5nZXIpIHtcbiAgICAgICAgY3VycmVudFBvcyA9IHJ0bCA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRQb3MgPSAtZGF0YS5jdXJyZW50VHJhbnNsYXRlO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuZnJlZU1vZGUub25Ub3VjaEVuZCh7XG4gICAgICAgICAgY3VycmVudFBvc1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBGaW5kIGN1cnJlbnQgc2xpZGVcblxuXG4gICAgICBsZXQgc3RvcEluZGV4ID0gMDtcbiAgICAgIGxldCBncm91cFNpemUgPSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkWzBdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IGkgPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwID8gMSA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cCkge1xuICAgICAgICBjb25zdCBpbmNyZW1lbnQgPSBpIDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCAtIDEgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgaW5jcmVtZW50XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldICYmIGN1cnJlbnRQb3MgPCBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnRdKSB7XG4gICAgICAgICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtpICsgaW5jcmVtZW50XSAtIHNsaWRlc0dyaWRbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQb3MgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgICAgIHN0b3BJbmRleCA9IGk7XG4gICAgICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDFdIC0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDJdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCByZXdpbmRGaXJzdEluZGV4ID0gbnVsbDtcbiAgICAgIGxldCByZXdpbmRMYXN0SW5kZXggPSBudWxsO1xuXG4gICAgICBpZiAocGFyYW1zLnJld2luZCkge1xuICAgICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgICAgcmV3aW5kTGFzdEluZGV4ID0gc3dpcGVyLnBhcmFtcy52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHN3aXBlci52aXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCAtIDEgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgICAgcmV3aW5kRmlyc3RJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gRmluZCBjdXJyZW50IHNsaWRlIHNpemVcblxuXG4gICAgICBjb25zdCByYXRpbyA9IChjdXJyZW50UG9zIC0gc2xpZGVzR3JpZFtzdG9wSW5kZXhdKSAvIGdyb3VwU2l6ZTtcbiAgICAgIGNvbnN0IGluY3JlbWVudCA9IHN0b3BJbmRleCA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgLSAxID8gMSA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcblxuICAgICAgaWYgKHRpbWVEaWZmID4gcGFyYW1zLmxvbmdTd2lwZXNNcykge1xuICAgICAgICAvLyBMb25nIHRvdWNoZXNcbiAgICAgICAgaWYgKCFwYXJhbXMubG9uZ1N3aXBlcykge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgaWYgKHJhdGlvID49IHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHN3aXBlci5zbGlkZVRvKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzRW5kID8gcmV3aW5kRmlyc3RJbmRleCA6IHN0b3BJbmRleCArIGluY3JlbWVudCk7ZWxzZSBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICAgICAgaWYgKHJhdGlvID4gMSAtIHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXdpbmRMYXN0SW5kZXggIT09IG51bGwgJiYgcmF0aW8gPCAwICYmIE1hdGguYWJzKHJhdGlvKSA+IHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHJld2luZExhc3RJbmRleCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTaG9ydCBzd2lwZXNcbiAgICAgICAgaWYgKCFwYXJhbXMuc2hvcnRTd2lwZXMpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzTmF2QnV0dG9uVGFyZ2V0ID0gc3dpcGVyLm5hdmlnYXRpb24gJiYgKGUudGFyZ2V0ID09PSBzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwgfHwgZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLnByZXZFbCk7XG5cbiAgICAgICAgaWYgKCFpc05hdkJ1dHRvblRhcmdldCkge1xuICAgICAgICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kRmlyc3RJbmRleCAhPT0gbnVsbCA/IHJld2luZEZpcnN0SW5kZXggOiBzdG9wSW5kZXggKyBpbmNyZW1lbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICdwcmV2Jykge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kTGFzdEluZGV4ICE9PSBudWxsID8gcmV3aW5kTGFzdEluZGV4IDogc3RvcEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVzaXplKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBlbFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGlmIChlbCAmJiBlbC5vZmZzZXRXaWR0aCA9PT0gMCkgcmV0dXJuOyAvLyBCcmVha3BvaW50c1xuXG4gICAgICBpZiAocGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgICB9IC8vIFNhdmUgbG9ja3NcblxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIGFsbG93U2xpZGVOZXh0LFxuICAgICAgICBhbGxvd1NsaWRlUHJldixcbiAgICAgICAgc25hcEdyaWRcbiAgICAgIH0gPSBzd2lwZXI7IC8vIERpc2FibGUgbG9ja3Mgb24gcmVzaXplXG5cbiAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XG4gICAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSB0cnVlO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICAgIGlmICgocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkgJiYgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgJiYgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVuKCk7XG4gICAgICB9IC8vIFJldHVybiBsb2NrcyBhZnRlciByZXNpemVcblxuXG4gICAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHNuYXBHcmlkICE9PSBzd2lwZXIuc25hcEdyaWQpIHtcbiAgICAgICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgIGlmICghc3dpcGVyLmFsbG93Q2xpY2spIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMucHJldmVudENsaWNrcykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbiAmJiBzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICB3cmFwcGVyRWwsXG4gICAgICAgIHJ0bFRyYW5zbGF0ZSxcbiAgICAgICAgZW5hYmxlZFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgc3dpcGVyLnByZXZpb3VzVHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcblxuICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICBzd2lwZXIudHJhbnNsYXRlID0gLXdyYXBwZXJFbC5zY3JvbGxMZWZ0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnRyYW5zbGF0ZSA9IC13cmFwcGVyRWwuc2Nyb2xsVG9wO1xuICAgICAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcblxuXG4gICAgICBpZiAoc3dpcGVyLnRyYW5zbGF0ZSA9PT0gMCkgc3dpcGVyLnRyYW5zbGF0ZSA9IDA7XG4gICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICBsZXQgbmV3UHJvZ3Jlc3M7XG4gICAgICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcblxuICAgICAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgICAgIG5ld1Byb2dyZXNzID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1Byb2dyZXNzID0gKHN3aXBlci50cmFuc2xhdGUgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIC8gdHJhbnNsYXRlc0RpZmY7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdQcm9ncmVzcyAhPT0gc3dpcGVyLnByb2dyZXNzKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhydGxUcmFuc2xhdGUgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGUpO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuZW1pdCgnc2V0VHJhbnNsYXRlJywgc3dpcGVyLnRyYW5zbGF0ZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGxldCBkdW1teUV2ZW50QXR0YWNoZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGR1bW15RXZlbnRMaXN0ZW5lcigpIHt9XG5cbiAgICBjb25zdCBldmVudHMgPSAoc3dpcGVyLCBtZXRob2QpID0+IHtcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICB0b3VjaEV2ZW50cyxcbiAgICAgICAgZWwsXG4gICAgICAgIHdyYXBwZXJFbCxcbiAgICAgICAgZGV2aWNlLFxuICAgICAgICBzdXBwb3J0XG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgY29uc3QgY2FwdHVyZSA9ICEhcGFyYW1zLm5lc3RlZDtcbiAgICAgIGNvbnN0IGRvbU1ldGhvZCA9IG1ldGhvZCA9PT0gJ29uJyA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgICAgIGNvbnN0IHN3aXBlck1ldGhvZCA9IG1ldGhvZDsgLy8gVG91Y2ggRXZlbnRzXG5cbiAgICAgIGlmICghc3VwcG9ydC50b3VjaCkge1xuICAgICAgICBlbFtkb21NZXRob2RdKHRvdWNoRXZlbnRzLnN0YXJ0LCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50W2RvbU1ldGhvZF0odG91Y2hFdmVudHMubW92ZSwgc3dpcGVyLm9uVG91Y2hNb3ZlLCBjYXB0dXJlKTtcbiAgICAgICAgZG9jdW1lbnRbZG9tTWV0aG9kXSh0b3VjaEV2ZW50cy5lbmQsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXNzaXZlTGlzdGVuZXIgPSB0b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnICYmIHN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge1xuICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgICAgY2FwdHVyZTogZmFsc2VcbiAgICAgICAgfSA6IGZhbHNlO1xuICAgICAgICBlbFtkb21NZXRob2RdKHRvdWNoRXZlbnRzLnN0YXJ0LCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICBlbFtkb21NZXRob2RdKHRvdWNoRXZlbnRzLm1vdmUsIHN3aXBlci5vblRvdWNoTW92ZSwgc3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgPyB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgICAgY2FwdHVyZVxuICAgICAgICB9IDogY2FwdHVyZSk7XG4gICAgICAgIGVsW2RvbU1ldGhvZF0odG91Y2hFdmVudHMuZW5kLCBzd2lwZXIub25Ub3VjaEVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcblxuICAgICAgICBpZiAodG91Y2hFdmVudHMuY2FuY2VsKSB7XG4gICAgICAgICAgZWxbZG9tTWV0aG9kXSh0b3VjaEV2ZW50cy5jYW5jZWwsIHN3aXBlci5vblRvdWNoRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IC8vIFByZXZlbnQgTGlua3MgQ2xpY2tzXG5cblxuICAgICAgaWYgKHBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHtcbiAgICAgICAgZWxbZG9tTWV0aG9kXSgnY2xpY2snLCBzd2lwZXIub25DbGljaywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICB3cmFwcGVyRWxbZG9tTWV0aG9kXSgnc2Nyb2xsJywgc3dpcGVyLm9uU2Nyb2xsKTtcbiAgICAgIH0gLy8gUmVzaXplIGhhbmRsZXJcblxuXG4gICAgICBpZiAocGFyYW1zLnVwZGF0ZU9uV2luZG93UmVzaXplKSB7XG4gICAgICAgIHN3aXBlcltzd2lwZXJNZXRob2RdKGRldmljZS5pb3MgfHwgZGV2aWNlLmFuZHJvaWQgPyAncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlIG9ic2VydmVyVXBkYXRlJyA6ICdyZXNpemUgb2JzZXJ2ZXJVcGRhdGUnLCBvblJlc2l6ZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXJbc3dpcGVyTWV0aG9kXSgnb2JzZXJ2ZXJVcGRhdGUnLCBvblJlc2l6ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGF0dGFjaEV2ZW50cygpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgc3VwcG9ydFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIHN3aXBlci5vblRvdWNoU3RhcnQgPSBvblRvdWNoU3RhcnQuYmluZChzd2lwZXIpO1xuICAgICAgc3dpcGVyLm9uVG91Y2hNb3ZlID0gb25Ub3VjaE1vdmUuYmluZChzd2lwZXIpO1xuICAgICAgc3dpcGVyLm9uVG91Y2hFbmQgPSBvblRvdWNoRW5kLmJpbmQoc3dpcGVyKTtcblxuICAgICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIHN3aXBlci5vblNjcm9sbCA9IG9uU2Nyb2xsLmJpbmQoc3dpcGVyKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLm9uQ2xpY2sgPSBvbkNsaWNrLmJpbmQoc3dpcGVyKTtcblxuICAgICAgaWYgKHN1cHBvcnQudG91Y2ggJiYgIWR1bW15RXZlbnRBdHRhY2hlZCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZHVtbXlFdmVudExpc3RlbmVyKTtcbiAgICAgICAgZHVtbXlFdmVudEF0dGFjaGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzKHN3aXBlciwgJ29uJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGV0YWNoRXZlbnRzKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGV2ZW50cyhzd2lwZXIsICdvZmYnKTtcbiAgICB9XG5cbiAgICB2YXIgZXZlbnRzJDEgPSB7XG4gICAgICBhdHRhY2hFdmVudHMsXG4gICAgICBkZXRhY2hFdmVudHNcbiAgICB9O1xuXG4gICAgY29uc3QgaXNHcmlkRW5hYmxlZCA9IChzd2lwZXIsIHBhcmFtcykgPT4ge1xuICAgICAgcmV0dXJuIHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRCcmVha3BvaW50KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYWN0aXZlSW5kZXgsXG4gICAgICAgIGluaXRpYWxpemVkLFxuICAgICAgICBsb29wZWRTbGlkZXMgPSAwLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgICRlbFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gcGFyYW1zLmJyZWFrcG9pbnRzO1xuICAgICAgaWYgKCFicmVha3BvaW50cyB8fCBicmVha3BvaW50cyAmJiBPYmplY3Qua2V5cyhicmVha3BvaW50cykubGVuZ3RoID09PSAwKSByZXR1cm47IC8vIEdldCBicmVha3BvaW50IGZvciB3aW5kb3cgd2lkdGggYW5kIHVwZGF0ZSBwYXJhbWV0ZXJzXG5cbiAgICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBzd2lwZXIuZ2V0QnJlYWtwb2ludChicmVha3BvaW50cywgc3dpcGVyLnBhcmFtcy5icmVha3BvaW50c0Jhc2UsIHN3aXBlci5lbCk7XG4gICAgICBpZiAoIWJyZWFrcG9pbnQgfHwgc3dpcGVyLmN1cnJlbnRCcmVha3BvaW50ID09PSBicmVha3BvaW50KSByZXR1cm47XG4gICAgICBjb25zdCBicmVha3BvaW50T25seVBhcmFtcyA9IGJyZWFrcG9pbnQgaW4gYnJlYWtwb2ludHMgPyBicmVha3BvaW50c1ticmVha3BvaW50XSA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnRQYXJhbXMgPSBicmVha3BvaW50T25seVBhcmFtcyB8fCBzd2lwZXIub3JpZ2luYWxQYXJhbXM7XG4gICAgICBjb25zdCB3YXNNdWx0aVJvdyA9IGlzR3JpZEVuYWJsZWQoc3dpcGVyLCBwYXJhbXMpO1xuICAgICAgY29uc3QgaXNNdWx0aVJvdyA9IGlzR3JpZEVuYWJsZWQoc3dpcGVyLCBicmVha3BvaW50UGFyYW1zKTtcbiAgICAgIGNvbnN0IHdhc0VuYWJsZWQgPSBwYXJhbXMuZW5hYmxlZDtcblxuICAgICAgaWYgKHdhc011bHRpUm93ICYmICFpc011bHRpUm93KSB7XG4gICAgICAgICRlbC5yZW1vdmVDbGFzcyhgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkICR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZC1jb2x1bW5gKTtcbiAgICAgICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gICAgICB9IGVsc2UgaWYgKCF3YXNNdWx0aVJvdyAmJiBpc011bHRpUm93KSB7XG4gICAgICAgICRlbC5hZGRDbGFzcyhgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkYCk7XG5cbiAgICAgICAgaWYgKGJyZWFrcG9pbnRQYXJhbXMuZ3JpZC5maWxsICYmIGJyZWFrcG9pbnRQYXJhbXMuZ3JpZC5maWxsID09PSAnY29sdW1uJyB8fCAhYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgJiYgcGFyYW1zLmdyaWQuZmlsbCA9PT0gJ2NvbHVtbicpIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MoYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZC1jb2x1bW5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICAgICAgfSAvLyBUb2dnbGUgbmF2aWdhdGlvbiwgcGFnaW5hdGlvbiwgc2Nyb2xsYmFyXG5cblxuICAgICAgWyduYXZpZ2F0aW9uJywgJ3BhZ2luYXRpb24nLCAnc2Nyb2xsYmFyJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgY29uc3Qgd2FzTW9kdWxlRW5hYmxlZCA9IHBhcmFtc1twcm9wXSAmJiBwYXJhbXNbcHJvcF0uZW5hYmxlZDtcbiAgICAgICAgY29uc3QgaXNNb2R1bGVFbmFibGVkID0gYnJlYWtwb2ludFBhcmFtc1twcm9wXSAmJiBicmVha3BvaW50UGFyYW1zW3Byb3BdLmVuYWJsZWQ7XG5cbiAgICAgICAgaWYgKHdhc01vZHVsZUVuYWJsZWQgJiYgIWlzTW9kdWxlRW5hYmxlZCkge1xuICAgICAgICAgIHN3aXBlcltwcm9wXS5kaXNhYmxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXdhc01vZHVsZUVuYWJsZWQgJiYgaXNNb2R1bGVFbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyW3Byb3BdLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbkNoYW5nZWQgPSBicmVha3BvaW50UGFyYW1zLmRpcmVjdGlvbiAmJiBicmVha3BvaW50UGFyYW1zLmRpcmVjdGlvbiAhPT0gcGFyYW1zLmRpcmVjdGlvbjtcbiAgICAgIGNvbnN0IG5lZWRzUmVMb29wID0gcGFyYW1zLmxvb3AgJiYgKGJyZWFrcG9pbnRQYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gcGFyYW1zLnNsaWRlc1BlclZpZXcgfHwgZGlyZWN0aW9uQ2hhbmdlZCk7XG5cbiAgICAgIGlmIChkaXJlY3Rpb25DaGFuZ2VkICYmIGluaXRpYWxpemVkKSB7XG4gICAgICAgIHN3aXBlci5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgIH1cblxuICAgICAgZXh0ZW5kKHN3aXBlci5wYXJhbXMsIGJyZWFrcG9pbnRQYXJhbXMpO1xuICAgICAgY29uc3QgaXNFbmFibGVkID0gc3dpcGVyLnBhcmFtcy5lbmFibGVkO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgYWxsb3dUb3VjaE1vdmU6IHN3aXBlci5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsXG4gICAgICAgIGFsbG93U2xpZGVOZXh0OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVOZXh0LFxuICAgICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldlxuICAgICAgfSk7XG5cbiAgICAgIGlmICh3YXNFbmFibGVkICYmICFpc0VuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmRpc2FibGUoKTtcbiAgICAgIH0gZWxzZSBpZiAoIXdhc0VuYWJsZWQgJiYgaXNFbmFibGVkKSB7XG4gICAgICAgIHN3aXBlci5lbmFibGUoKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmN1cnJlbnRCcmVha3BvaW50ID0gYnJlYWtwb2ludDtcbiAgICAgIHN3aXBlci5lbWl0KCdfYmVmb3JlQnJlYWtwb2ludCcsIGJyZWFrcG9pbnRQYXJhbXMpO1xuXG4gICAgICBpZiAobmVlZHNSZUxvb3AgJiYgaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oYWN0aXZlSW5kZXggLSBsb29wZWRTbGlkZXMgKyBzd2lwZXIubG9vcGVkU2xpZGVzLCAwLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5lbWl0KCdicmVha3BvaW50JywgYnJlYWtwb2ludFBhcmFtcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnJlYWtwb2ludChicmVha3BvaW50cywgYmFzZSwgY29udGFpbmVyRWwpIHtcbiAgICAgIGlmIChiYXNlID09PSB2b2lkIDApIHtcbiAgICAgICAgYmFzZSA9ICd3aW5kb3cnO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWJyZWFrcG9pbnRzIHx8IGJhc2UgPT09ICdjb250YWluZXInICYmICFjb250YWluZXJFbCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIGxldCBicmVha3BvaW50ID0gZmFsc2U7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSBiYXNlID09PSAnd2luZG93JyA/IHdpbmRvdy5pbm5lckhlaWdodCA6IGNvbnRhaW5lckVsLmNsaWVudEhlaWdodDtcbiAgICAgIGNvbnN0IHBvaW50cyA9IE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzKS5tYXAocG9pbnQgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHBvaW50ID09PSAnc3RyaW5nJyAmJiBwb2ludC5pbmRleE9mKCdAJykgPT09IDApIHtcbiAgICAgICAgICBjb25zdCBtaW5SYXRpbyA9IHBhcnNlRmxvYXQocG9pbnQuc3Vic3RyKDEpKTtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRIZWlnaHQgKiBtaW5SYXRpbztcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBwb2ludFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiBwb2ludCxcbiAgICAgICAgICBwb2ludFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBwb2ludHMuc29ydCgoYSwgYikgPT4gcGFyc2VJbnQoYS52YWx1ZSwgMTApIC0gcGFyc2VJbnQoYi52YWx1ZSwgMTApKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBvaW50LFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgIH0gPSBwb2ludHNbaV07XG5cbiAgICAgICAgaWYgKGJhc2UgPT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKGAobWluLXdpZHRoOiAke3ZhbHVlfXB4KWApLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPD0gY29udGFpbmVyRWwuY2xpZW50V2lkdGgpIHtcbiAgICAgICAgICBicmVha3BvaW50ID0gcG9pbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJyZWFrcG9pbnQgfHwgJ21heCc7XG4gICAgfVxuXG4gICAgdmFyIGJyZWFrcG9pbnRzID0ge1xuICAgICAgc2V0QnJlYWtwb2ludCxcbiAgICAgIGdldEJyZWFrcG9pbnRcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJlcGFyZUNsYXNzZXMoZW50cmllcywgcHJlZml4KSB7XG4gICAgICBjb25zdCByZXN1bHRDbGFzc2VzID0gW107XG4gICAgICBlbnRyaWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhpdGVtKS5mb3JFYWNoKGNsYXNzTmFtZXMgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW1bY2xhc3NOYW1lc10pIHtcbiAgICAgICAgICAgICAgcmVzdWx0Q2xhc3Nlcy5wdXNoKHByZWZpeCArIGNsYXNzTmFtZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJlc3VsdENsYXNzZXMucHVzaChwcmVmaXggKyBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0Q2xhc3NlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRDbGFzc2VzKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2xhc3NOYW1lcyxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBydGwsXG4gICAgICAgICRlbCxcbiAgICAgICAgZGV2aWNlLFxuICAgICAgICBzdXBwb3J0XG4gICAgICB9ID0gc3dpcGVyOyAvLyBwcmV0dGllci1pZ25vcmVcblxuICAgICAgY29uc3Qgc3VmZml4ZXMgPSBwcmVwYXJlQ2xhc3NlcyhbJ2luaXRpYWxpemVkJywgcGFyYW1zLmRpcmVjdGlvbiwge1xuICAgICAgICAncG9pbnRlci1ldmVudHMnOiAhc3VwcG9ydC50b3VjaFxuICAgICAgfSwge1xuICAgICAgICAnZnJlZS1tb2RlJzogc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZFxuICAgICAgfSwge1xuICAgICAgICAnYXV0b2hlaWdodCc6IHBhcmFtcy5hdXRvSGVpZ2h0XG4gICAgICB9LCB7XG4gICAgICAgICdydGwnOiBydGxcbiAgICAgIH0sIHtcbiAgICAgICAgJ2dyaWQnOiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMVxuICAgICAgfSwge1xuICAgICAgICAnZ3JpZC1jb2x1bW4nOiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMSAmJiBwYXJhbXMuZ3JpZC5maWxsID09PSAnY29sdW1uJ1xuICAgICAgfSwge1xuICAgICAgICAnYW5kcm9pZCc6IGRldmljZS5hbmRyb2lkXG4gICAgICB9LCB7XG4gICAgICAgICdpb3MnOiBkZXZpY2UuaW9zXG4gICAgICB9LCB7XG4gICAgICAgICdjc3MtbW9kZSc6IHBhcmFtcy5jc3NNb2RlXG4gICAgICB9LCB7XG4gICAgICAgICdjZW50ZXJlZCc6IHBhcmFtcy5jc3NNb2RlICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlc1xuICAgICAgfSwge1xuICAgICAgICAnd2F0Y2gtcHJvZ3Jlc3MnOiBwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzc1xuICAgICAgfV0sIHBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKTtcbiAgICAgIGNsYXNzTmFtZXMucHVzaCguLi5zdWZmaXhlcyk7XG4gICAgICAkZWwuYWRkQ2xhc3MoWy4uLmNsYXNzTmFtZXNdLmpvaW4oJyAnKSk7XG4gICAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVDbGFzc2VzKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgJGVsLFxuICAgICAgICBjbGFzc05hbWVzXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgJGVsLnJlbW92ZUNsYXNzKGNsYXNzTmFtZXMuam9pbignICcpKTtcbiAgICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIHZhciBjbGFzc2VzID0ge1xuICAgICAgYWRkQ2xhc3NlcyxcbiAgICAgIHJlbW92ZUNsYXNzZXNcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlRWwsIHNyYywgc3Jjc2V0LCBzaXplcywgY2hlY2tGb3JDb21wbGV0ZSwgY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgbGV0IGltYWdlO1xuXG4gICAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzUGljdHVyZSA9ICQoaW1hZ2VFbCkucGFyZW50KCdwaWN0dXJlJylbMF07XG5cbiAgICAgIGlmICghaXNQaWN0dXJlICYmICghaW1hZ2VFbC5jb21wbGV0ZSB8fCAhY2hlY2tGb3JDb21wbGV0ZSkpIHtcbiAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgIGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgICAgIGltYWdlLm9ubG9hZCA9IG9uUmVhZHk7XG4gICAgICAgICAgaW1hZ2Uub25lcnJvciA9IG9uUmVhZHk7XG5cbiAgICAgICAgICBpZiAoc2l6ZXMpIHtcbiAgICAgICAgICAgIGltYWdlLnNpemVzID0gc2l6ZXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNyY3NldCkge1xuICAgICAgICAgICAgaW1hZ2Uuc3Jjc2V0ID0gc3Jjc2V0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbWFnZSBhbHJlYWR5IGxvYWRlZC4uLlxuICAgICAgICBvblJlYWR5KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlbG9hZEltYWdlcygpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuaW1hZ2VzVG9Mb2FkID0gc3dpcGVyLiRlbC5maW5kKCdpbWcnKTtcblxuICAgICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzd2lwZXIgPT09ICd1bmRlZmluZWQnIHx8IHN3aXBlciA9PT0gbnVsbCB8fCAhc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHN3aXBlci5pbWFnZXNMb2FkZWQgIT09IHVuZGVmaW5lZCkgc3dpcGVyLmltYWdlc0xvYWRlZCArPSAxO1xuXG4gICAgICAgIGlmIChzd2lwZXIuaW1hZ2VzTG9hZGVkID09PSBzd2lwZXIuaW1hZ2VzVG9Mb2FkLmxlbmd0aCkge1xuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnVwZGF0ZU9uSW1hZ2VzUmVhZHkpIHN3aXBlci51cGRhdGUoKTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnaW1hZ2VzUmVhZHknKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci5pbWFnZXNUb0xvYWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VFbCA9IHN3aXBlci5pbWFnZXNUb0xvYWRbaV07XG4gICAgICAgIHN3aXBlci5sb2FkSW1hZ2UoaW1hZ2VFbCwgaW1hZ2VFbC5jdXJyZW50U3JjIHx8IGltYWdlRWwuZ2V0QXR0cmlidXRlKCdzcmMnKSwgaW1hZ2VFbC5zcmNzZXQgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NyY3NldCcpLCBpbWFnZUVsLnNpemVzIHx8IGltYWdlRWwuZ2V0QXR0cmlidXRlKCdzaXplcycpLCB0cnVlLCBvblJlYWR5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaW1hZ2VzID0ge1xuICAgICAgbG9hZEltYWdlLFxuICAgICAgcHJlbG9hZEltYWdlc1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJmbG93KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXNMb2NrZWQ6IHdhc0xvY2tlZCxcbiAgICAgICAgcGFyYW1zXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgY29uc3Qge1xuICAgICAgICBzbGlkZXNPZmZzZXRCZWZvcmVcbiAgICAgIH0gPSBwYXJhbXM7XG5cbiAgICAgIGlmIChzbGlkZXNPZmZzZXRCZWZvcmUpIHtcbiAgICAgICAgY29uc3QgbGFzdFNsaWRlSW5kZXggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IGxhc3RTbGlkZVJpZ2h0RWRnZSA9IHN3aXBlci5zbGlkZXNHcmlkW2xhc3RTbGlkZUluZGV4XSArIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbbGFzdFNsaWRlSW5kZXhdICsgc2xpZGVzT2Zmc2V0QmVmb3JlICogMjtcbiAgICAgICAgc3dpcGVyLmlzTG9ja2VkID0gc3dpcGVyLnNpemUgPiBsYXN0U2xpZGVSaWdodEVkZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuaXNMb2NrZWQgPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoID09PSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9ICFzd2lwZXIuaXNMb2NrZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpIHtcbiAgICAgICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gIXN3aXBlci5pc0xvY2tlZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHdhc0xvY2tlZCAmJiB3YXNMb2NrZWQgIT09IHN3aXBlci5pc0xvY2tlZCkge1xuICAgICAgICBzd2lwZXIuaXNFbmQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7XG4gICAgICAgIHN3aXBlci5lbWl0KHN3aXBlci5pc0xvY2tlZCA/ICdsb2NrJyA6ICd1bmxvY2snKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hlY2tPdmVyZmxvdyQxID0ge1xuICAgICAgY2hlY2tPdmVyZmxvd1xuICAgIH07XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICBpbml0OiB0cnVlLFxuICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICB0b3VjaEV2ZW50c1RhcmdldDogJ3dyYXBwZXInLFxuICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgIGNzc01vZGU6IGZhbHNlLFxuICAgICAgdXBkYXRlT25XaW5kb3dSZXNpemU6IHRydWUsXG4gICAgICByZXNpemVPYnNlcnZlcjogdHJ1ZSxcbiAgICAgIG5lc3RlZDogZmFsc2UsXG4gICAgICBjcmVhdGVFbGVtZW50czogZmFsc2UsXG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgZm9jdXNhYmxlRWxlbWVudHM6ICdpbnB1dCwgc2VsZWN0LCBvcHRpb24sIHRleHRhcmVhLCBidXR0b24sIHZpZGVvLCBsYWJlbCcsXG4gICAgICAvLyBPdmVycmlkZXNcbiAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgLy9cbiAgICAgIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogZmFsc2UsXG4gICAgICAvLyBzc3JcbiAgICAgIHVzZXJBZ2VudDogbnVsbCxcbiAgICAgIHVybDogbnVsbCxcbiAgICAgIC8vIFRvIHN1cHBvcnQgaU9TJ3Mgc3dpcGUtdG8tZ28tYmFjayBnZXN0dXJlICh3aGVuIGJlaW5nIHVzZWQgaW4tYXBwKS5cbiAgICAgIGVkZ2VTd2lwZURldGVjdGlvbjogZmFsc2UsXG4gICAgICBlZGdlU3dpcGVUaHJlc2hvbGQ6IDIwLFxuICAgICAgLy8gQXV0b2hlaWdodFxuICAgICAgYXV0b0hlaWdodDogZmFsc2UsXG4gICAgICAvLyBTZXQgd3JhcHBlciB3aWR0aFxuICAgICAgc2V0V3JhcHBlclNpemU6IGZhbHNlLFxuICAgICAgLy8gVmlydHVhbCBUcmFuc2xhdGVcbiAgICAgIHZpcnR1YWxUcmFuc2xhdGU6IGZhbHNlLFxuICAgICAgLy8gRWZmZWN0c1xuICAgICAgZWZmZWN0OiAnc2xpZGUnLFxuICAgICAgLy8gJ3NsaWRlJyBvciAnZmFkZScgb3IgJ2N1YmUnIG9yICdjb3ZlcmZsb3cnIG9yICdmbGlwJ1xuICAgICAgLy8gQnJlYWtwb2ludHNcbiAgICAgIGJyZWFrcG9pbnRzOiB1bmRlZmluZWQsXG4gICAgICBicmVha3BvaW50c0Jhc2U6ICd3aW5kb3cnLFxuICAgICAgLy8gU2xpZGVzIGdyaWRcbiAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgIHNsaWRlc1Blckdyb3VwU2tpcDogMCxcbiAgICAgIHNsaWRlc1Blckdyb3VwQXV0bzogZmFsc2UsXG4gICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICBjZW50ZXJlZFNsaWRlc0JvdW5kczogZmFsc2UsXG4gICAgICBzbGlkZXNPZmZzZXRCZWZvcmU6IDAsXG4gICAgICAvLyBpbiBweFxuICAgICAgc2xpZGVzT2Zmc2V0QWZ0ZXI6IDAsXG4gICAgICAvLyBpbiBweFxuICAgICAgbm9ybWFsaXplU2xpZGVJbmRleDogdHJ1ZSxcbiAgICAgIGNlbnRlckluc3VmZmljaWVudFNsaWRlczogZmFsc2UsXG4gICAgICAvLyBEaXNhYmxlIHN3aXBlciBhbmQgaGlkZSBuYXZpZ2F0aW9uIHdoZW4gY29udGFpbmVyIG5vdCBvdmVyZmxvd1xuICAgICAgd2F0Y2hPdmVyZmxvdzogdHJ1ZSxcbiAgICAgIC8vIFJvdW5kIGxlbmd0aFxuICAgICAgcm91bmRMZW5ndGhzOiBmYWxzZSxcbiAgICAgIC8vIFRvdWNoZXNcbiAgICAgIHRvdWNoUmF0aW86IDEsXG4gICAgICB0b3VjaEFuZ2xlOiA0NSxcbiAgICAgIHNpbXVsYXRlVG91Y2g6IHRydWUsXG4gICAgICBzaG9ydFN3aXBlczogdHJ1ZSxcbiAgICAgIGxvbmdTd2lwZXM6IHRydWUsXG4gICAgICBsb25nU3dpcGVzUmF0aW86IDAuNSxcbiAgICAgIGxvbmdTd2lwZXNNczogMzAwLFxuICAgICAgZm9sbG93RmluZ2VyOiB0cnVlLFxuICAgICAgYWxsb3dUb3VjaE1vdmU6IHRydWUsXG4gICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICB0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246IGZhbHNlLFxuICAgICAgdG91Y2hTdGFydFByZXZlbnREZWZhdWx0OiB0cnVlLFxuICAgICAgdG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQ6IGZhbHNlLFxuICAgICAgdG91Y2hSZWxlYXNlT25FZGdlczogZmFsc2UsXG4gICAgICAvLyBVbmlxdWUgTmF2aWdhdGlvbiBFbGVtZW50c1xuICAgICAgdW5pcXVlTmF2RWxlbWVudHM6IHRydWUsXG4gICAgICAvLyBSZXNpc3RhbmNlXG4gICAgICByZXNpc3RhbmNlOiB0cnVlLFxuICAgICAgcmVzaXN0YW5jZVJhdGlvOiAwLjg1LFxuICAgICAgLy8gUHJvZ3Jlc3NcbiAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IGZhbHNlLFxuICAgICAgLy8gQ3Vyc29yXG4gICAgICBncmFiQ3Vyc29yOiBmYWxzZSxcbiAgICAgIC8vIENsaWNrc1xuICAgICAgcHJldmVudENsaWNrczogdHJ1ZSxcbiAgICAgIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlLFxuICAgICAgLy8gSW1hZ2VzXG4gICAgICBwcmVsb2FkSW1hZ2VzOiB0cnVlLFxuICAgICAgdXBkYXRlT25JbWFnZXNSZWFkeTogdHJ1ZSxcbiAgICAgIC8vIGxvb3BcbiAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IDAsXG4gICAgICBsb29wZWRTbGlkZXM6IG51bGwsXG4gICAgICBsb29wZWRTbGlkZXNMaW1pdDogdHJ1ZSxcbiAgICAgIGxvb3BGaWxsR3JvdXBXaXRoQmxhbms6IGZhbHNlLFxuICAgICAgbG9vcFByZXZlbnRzU2xpZGU6IHRydWUsXG4gICAgICAvLyByZXdpbmRcbiAgICAgIHJld2luZDogZmFsc2UsXG4gICAgICAvLyBTd2lwaW5nL25vIHN3aXBpbmdcbiAgICAgIGFsbG93U2xpZGVQcmV2OiB0cnVlLFxuICAgICAgYWxsb3dTbGlkZU5leHQ6IHRydWUsXG4gICAgICBzd2lwZUhhbmRsZXI6IG51bGwsXG4gICAgICAvLyAnLnN3aXBlLWhhbmRsZXInLFxuICAgICAgbm9Td2lwaW5nOiB0cnVlLFxuICAgICAgbm9Td2lwaW5nQ2xhc3M6ICdzd2lwZXItbm8tc3dpcGluZycsXG4gICAgICBub1N3aXBpbmdTZWxlY3RvcjogbnVsbCxcbiAgICAgIC8vIFBhc3NpdmUgTGlzdGVuZXJzXG4gICAgICBwYXNzaXZlTGlzdGVuZXJzOiB0cnVlLFxuICAgICAgbWF4QmFja2ZhY2VIaWRkZW5TbGlkZXM6IDEwLFxuICAgICAgLy8gTlNcbiAgICAgIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6ICdzd2lwZXItJyxcbiAgICAgIC8vIE5FV1xuICAgICAgc2xpZGVDbGFzczogJ3N3aXBlci1zbGlkZScsXG4gICAgICBzbGlkZUJsYW5rQ2xhc3M6ICdzd2lwZXItc2xpZGUtaW52aXNpYmxlLWJsYW5rJyxcbiAgICAgIHNsaWRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtYWN0aXZlJyxcbiAgICAgIHNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLWFjdGl2ZScsXG4gICAgICBzbGlkZVZpc2libGVDbGFzczogJ3N3aXBlci1zbGlkZS12aXNpYmxlJyxcbiAgICAgIHNsaWRlRHVwbGljYXRlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlJyxcbiAgICAgIHNsaWRlTmV4dENsYXNzOiAnc3dpcGVyLXNsaWRlLW5leHQnLFxuICAgICAgc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLW5leHQnLFxuICAgICAgc2xpZGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtcHJldicsXG4gICAgICBzbGlkZUR1cGxpY2F0ZVByZXZDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtcHJldicsXG4gICAgICB3cmFwcGVyQ2xhc3M6ICdzd2lwZXItd3JhcHBlcicsXG4gICAgICAvLyBDYWxsYmFja3NcbiAgICAgIHJ1bkNhbGxiYWNrc09uSW5pdDogdHJ1ZSxcbiAgICAgIC8vIEludGVybmFsc1xuICAgICAgX2VtaXRDbGFzc2VzOiBmYWxzZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtb2R1bGVFeHRlbmRQYXJhbXMocGFyYW1zLCBhbGxNb2R1bGVzUGFyYW1zKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZXh0ZW5kUGFyYW1zKG9iaikge1xuICAgICAgICBpZiAob2JqID09PSB2b2lkIDApIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vZHVsZVBhcmFtTmFtZSA9IE9iamVjdC5rZXlzKG9iailbMF07XG4gICAgICAgIGNvbnN0IG1vZHVsZVBhcmFtcyA9IG9ialttb2R1bGVQYXJhbU5hbWVdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlUGFyYW1zICE9PSAnb2JqZWN0JyB8fCBtb2R1bGVQYXJhbXMgPT09IG51bGwpIHtcbiAgICAgICAgICBleHRlbmQoYWxsTW9kdWxlc1BhcmFtcywgb2JqKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoWyduYXZpZ2F0aW9uJywgJ3BhZ2luYXRpb24nLCAnc2Nyb2xsYmFyJ10uaW5kZXhPZihtb2R1bGVQYXJhbU5hbWUpID49IDAgJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09IHRydWUpIHtcbiAgICAgICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHtcbiAgICAgICAgICAgIGF1dG86IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEobW9kdWxlUGFyYW1OYW1lIGluIHBhcmFtcyAmJiAnZW5hYmxlZCcgaW4gbW9kdWxlUGFyYW1zKSkge1xuICAgICAgICAgIGV4dGVuZChhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0ge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID09PSAnb2JqZWN0JyAmJiAhKCdlbmFibGVkJyBpbiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkpIHtcbiAgICAgICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0ge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIGV4dGVuZChhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IFwib2ZmXCIgKi9cbiAgICBjb25zdCBwcm90b3R5cGVzID0ge1xuICAgICAgZXZlbnRzRW1pdHRlcixcbiAgICAgIHVwZGF0ZSxcbiAgICAgIHRyYW5zbGF0ZSxcbiAgICAgIHRyYW5zaXRpb24sXG4gICAgICBzbGlkZSxcbiAgICAgIGxvb3AsXG4gICAgICBncmFiQ3Vyc29yLFxuICAgICAgZXZlbnRzOiBldmVudHMkMSxcbiAgICAgIGJyZWFrcG9pbnRzLFxuICAgICAgY2hlY2tPdmVyZmxvdzogY2hlY2tPdmVyZmxvdyQxLFxuICAgICAgY2xhc3NlcyxcbiAgICAgIGltYWdlc1xuICAgIH07XG4gICAgY29uc3QgZXh0ZW5kZWREZWZhdWx0cyA9IHt9O1xuXG4gICAgY2xhc3MgU3dpcGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBsZXQgZWw7XG4gICAgICAgIGxldCBwYXJhbXM7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBhcmdzWzBdLmNvbnN0cnVjdG9yICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmdzWzBdKS5zbGljZSg4LCAtMSkgPT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgcGFyYW1zID0gYXJnc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBbZWwsIHBhcmFtc10gPSBhcmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXJhbXMpIHBhcmFtcyA9IHt9O1xuICAgICAgICBwYXJhbXMgPSBleHRlbmQoe30sIHBhcmFtcyk7XG4gICAgICAgIGlmIChlbCAmJiAhcGFyYW1zLmVsKSBwYXJhbXMuZWwgPSBlbDtcblxuICAgICAgICBpZiAocGFyYW1zLmVsICYmICQocGFyYW1zLmVsKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3Qgc3dpcGVycyA9IFtdO1xuICAgICAgICAgICQocGFyYW1zLmVsKS5lYWNoKGNvbnRhaW5lckVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BhcmFtcyA9IGV4dGVuZCh7fSwgcGFyYW1zLCB7XG4gICAgICAgICAgICAgIGVsOiBjb250YWluZXJFbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzd2lwZXJzLnB1c2gobmV3IFN3aXBlcihuZXdQYXJhbXMpKTtcbiAgICAgICAgICB9KTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0cnVjdG9yLXJldHVyblxuXG4gICAgICAgICAgcmV0dXJuIHN3aXBlcnM7XG4gICAgICAgIH0gLy8gU3dpcGVyIEluc3RhbmNlXG5cblxuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIuX19zd2lwZXJfXyA9IHRydWU7XG4gICAgICAgIHN3aXBlci5zdXBwb3J0ID0gZ2V0U3VwcG9ydCgpO1xuICAgICAgICBzd2lwZXIuZGV2aWNlID0gZ2V0RGV2aWNlKHtcbiAgICAgICAgICB1c2VyQWdlbnQ6IHBhcmFtcy51c2VyQWdlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5icm93c2VyID0gZ2V0QnJvd3NlcigpO1xuICAgICAgICBzd2lwZXIuZXZlbnRzTGlzdGVuZXJzID0ge307XG4gICAgICAgIHN3aXBlci5ldmVudHNBbnlMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgc3dpcGVyLm1vZHVsZXMgPSBbLi4uc3dpcGVyLl9fbW9kdWxlc19fXTtcblxuICAgICAgICBpZiAocGFyYW1zLm1vZHVsZXMgJiYgQXJyYXkuaXNBcnJheShwYXJhbXMubW9kdWxlcykpIHtcbiAgICAgICAgICBzd2lwZXIubW9kdWxlcy5wdXNoKC4uLnBhcmFtcy5tb2R1bGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFsbE1vZHVsZXNQYXJhbXMgPSB7fTtcbiAgICAgICAgc3dpcGVyLm1vZHVsZXMuZm9yRWFjaChtb2QgPT4ge1xuICAgICAgICAgIG1vZCh7XG4gICAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgICBleHRlbmRQYXJhbXM6IG1vZHVsZUV4dGVuZFBhcmFtcyhwYXJhbXMsIGFsbE1vZHVsZXNQYXJhbXMpLFxuICAgICAgICAgICAgb246IHN3aXBlci5vbi5iaW5kKHN3aXBlciksXG4gICAgICAgICAgICBvbmNlOiBzd2lwZXIub25jZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgICBvZmY6IHN3aXBlci5vZmYuYmluZChzd2lwZXIpLFxuICAgICAgICAgICAgZW1pdDogc3dpcGVyLmVtaXQuYmluZChzd2lwZXIpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pOyAvLyBFeHRlbmQgZGVmYXVsdHMgd2l0aCBtb2R1bGVzIHBhcmFtc1xuXG4gICAgICAgIGNvbnN0IHN3aXBlclBhcmFtcyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIGFsbE1vZHVsZXNQYXJhbXMpOyAvLyBFeHRlbmQgZGVmYXVsdHMgd2l0aCBwYXNzZWQgcGFyYW1zXG5cbiAgICAgICAgc3dpcGVyLnBhcmFtcyA9IGV4dGVuZCh7fSwgc3dpcGVyUGFyYW1zLCBleHRlbmRlZERlZmF1bHRzLCBwYXJhbXMpO1xuICAgICAgICBzd2lwZXIub3JpZ2luYWxQYXJhbXMgPSBleHRlbmQoe30sIHN3aXBlci5wYXJhbXMpO1xuICAgICAgICBzd2lwZXIucGFzc2VkUGFyYW1zID0gZXh0ZW5kKHt9LCBwYXJhbXMpOyAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzXG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMgJiYgc3dpcGVyLnBhcmFtcy5vbikge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHN3aXBlci5wYXJhbXMub24pLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIHN3aXBlci5vbihldmVudE5hbWUsIHN3aXBlci5wYXJhbXMub25bZXZlbnROYW1lXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcyAmJiBzd2lwZXIucGFyYW1zLm9uQW55KSB7XG4gICAgICAgICAgc3dpcGVyLm9uQW55KHN3aXBlci5wYXJhbXMub25BbnkpO1xuICAgICAgICB9IC8vIFNhdmUgRG9tIGxpYlxuXG5cbiAgICAgICAgc3dpcGVyLiQgPSAkOyAvLyBFeHRlbmQgU3dpcGVyXG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgICBlbmFibGVkOiBzd2lwZXIucGFyYW1zLmVuYWJsZWQsXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgLy8gQ2xhc3Nlc1xuICAgICAgICAgIGNsYXNzTmFtZXM6IFtdLFxuICAgICAgICAgIC8vIFNsaWRlc1xuICAgICAgICAgIHNsaWRlczogJCgpLFxuICAgICAgICAgIHNsaWRlc0dyaWQ6IFtdLFxuICAgICAgICAgIHNuYXBHcmlkOiBbXSxcbiAgICAgICAgICBzbGlkZXNTaXplc0dyaWQ6IFtdLFxuXG4gICAgICAgICAgLy8gaXNEaXJlY3Rpb25cbiAgICAgICAgICBpc0hvcml6b250YWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJztcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgaXNWZXJ0aWNhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJztcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLy8gSW5kZXhlc1xuICAgICAgICAgIGFjdGl2ZUluZGV4OiAwLFxuICAgICAgICAgIHJlYWxJbmRleDogMCxcbiAgICAgICAgICAvL1xuICAgICAgICAgIGlzQmVnaW5uaW5nOiB0cnVlLFxuICAgICAgICAgIGlzRW5kOiBmYWxzZSxcbiAgICAgICAgICAvLyBQcm9wc1xuICAgICAgICAgIHRyYW5zbGF0ZTogMCxcbiAgICAgICAgICBwcmV2aW91c1RyYW5zbGF0ZTogMCxcbiAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICB2ZWxvY2l0eTogMCxcbiAgICAgICAgICBhbmltYXRpbmc6IGZhbHNlLFxuICAgICAgICAgIC8vIExvY2tzXG4gICAgICAgICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXG4gICAgICAgICAgYWxsb3dTbGlkZVByZXY6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZVByZXYsXG4gICAgICAgICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgICAgICAgdG91Y2hFdmVudHM6IGZ1bmN0aW9uIHRvdWNoRXZlbnRzKCkge1xuICAgICAgICAgICAgY29uc3QgdG91Y2ggPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJ107XG4gICAgICAgICAgICBjb25zdCBkZXNrdG9wID0gWydwb2ludGVyZG93bicsICdwb2ludGVybW92ZScsICdwb2ludGVydXAnXTtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c1RvdWNoID0ge1xuICAgICAgICAgICAgICBzdGFydDogdG91Y2hbMF0sXG4gICAgICAgICAgICAgIG1vdmU6IHRvdWNoWzFdLFxuICAgICAgICAgICAgICBlbmQ6IHRvdWNoWzJdLFxuICAgICAgICAgICAgICBjYW5jZWw6IHRvdWNoWzNdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGVza3RvcCA9IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IGRlc2t0b3BbMF0sXG4gICAgICAgICAgICAgIG1vdmU6IGRlc2t0b3BbMV0sXG4gICAgICAgICAgICAgIGVuZDogZGVza3RvcFsyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzd2lwZXIuc3VwcG9ydC50b3VjaCB8fCAhc3dpcGVyLnBhcmFtcy5zaW11bGF0ZVRvdWNoID8gc3dpcGVyLnRvdWNoRXZlbnRzVG91Y2ggOiBzd2lwZXIudG91Y2hFdmVudHNEZXNrdG9wO1xuICAgICAgICAgIH0oKSxcbiAgICAgICAgICB0b3VjaEV2ZW50c0RhdGE6IHtcbiAgICAgICAgICAgIGlzVG91Y2hlZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaXNNb3ZlZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgYWxsb3dUb3VjaENhbGxiYWNrczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdG91Y2hTdGFydFRpbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGFydFRyYW5zbGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgYWxsb3dUaHJlc2hvbGRNb3ZlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBGb3JtIGVsZW1lbnRzIHRvIG1hdGNoXG4gICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50czogc3dpcGVyLnBhcmFtcy5mb2N1c2FibGVFbGVtZW50cyxcbiAgICAgICAgICAgIC8vIExhc3QgY2xpY2sgdGltZVxuICAgICAgICAgICAgbGFzdENsaWNrVGltZTogbm93KCksXG4gICAgICAgICAgICBjbGlja1RpbWVvdXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIFZlbG9jaXRpZXNcbiAgICAgICAgICAgIHZlbG9jaXRpZXM6IFtdLFxuICAgICAgICAgICAgYWxsb3dNb21lbnR1bUJvdW5jZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaXNUb3VjaEV2ZW50OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGFydE1vdmluZzogdW5kZWZpbmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBDbGlja3NcbiAgICAgICAgICBhbGxvd0NsaWNrOiB0cnVlLFxuICAgICAgICAgIC8vIFRvdWNoZXNcbiAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogc3dpcGVyLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSxcbiAgICAgICAgICB0b3VjaGVzOiB7XG4gICAgICAgICAgICBzdGFydFg6IDAsXG4gICAgICAgICAgICBzdGFydFk6IDAsXG4gICAgICAgICAgICBjdXJyZW50WDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRZOiAwLFxuICAgICAgICAgICAgZGlmZjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gSW1hZ2VzXG4gICAgICAgICAgaW1hZ2VzVG9Mb2FkOiBbXSxcbiAgICAgICAgICBpbWFnZXNMb2FkZWQ6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdfc3dpcGVyJyk7IC8vIEluaXRcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5pbml0KSB7XG4gICAgICAgICAgc3dpcGVyLmluaXQoKTtcbiAgICAgICAgfSAvLyBSZXR1cm4gYXBwIGluc3RhbmNlXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cblxuXG4gICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICB9XG5cbiAgICAgIGVuYWJsZSgpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5lbWl0KCdlbmFibGUnKTtcbiAgICAgIH1cblxuICAgICAgZGlzYWJsZSgpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgICAgICBzd2lwZXIudW5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuZW1pdCgnZGlzYWJsZScpO1xuICAgICAgfVxuXG4gICAgICBzZXRQcm9ncmVzcyhwcm9ncmVzcywgc3BlZWQpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xuICAgICAgICBjb25zdCBtaW4gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgIGNvbnN0IG1heCA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IChtYXggLSBtaW4pICogcHJvZ3Jlc3MgKyBtaW47XG4gICAgICAgIHN3aXBlci50cmFuc2xhdGVUbyhjdXJyZW50LCB0eXBlb2Ygc3BlZWQgPT09ICd1bmRlZmluZWQnID8gMCA6IHNwZWVkKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICB9XG5cbiAgICAgIGVtaXRDb250YWluZXJDbGFzc2VzKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuX2VtaXRDbGFzc2VzIHx8ICFzd2lwZXIuZWwpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2xzID0gc3dpcGVyLmVsLmNsYXNzTmFtZS5zcGxpdCgnICcpLmZpbHRlcihjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHJldHVybiBjbGFzc05hbWUuaW5kZXhPZignc3dpcGVyJykgPT09IDAgfHwgY2xhc3NOYW1lLmluZGV4T2Yoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSA9PT0gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdfY29udGFpbmVyQ2xhc3NlcycsIGNscy5qb2luKCcgJykpO1xuICAgICAgfVxuXG4gICAgICBnZXRTbGlkZUNsYXNzZXMoc2xpZGVFbCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuICcnO1xuICAgICAgICByZXR1cm4gc2xpZGVFbC5jbGFzc05hbWUuc3BsaXQoJyAnKS5maWx0ZXIoY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lLmluZGV4T2YoJ3N3aXBlci1zbGlkZScpID09PSAwIHx8IGNsYXNzTmFtZS5pbmRleE9mKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykgPT09IDA7XG4gICAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICAgIH1cblxuICAgICAgZW1pdFNsaWRlc0NsYXNzZXMoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5fZW1pdENsYXNzZXMgfHwgIXN3aXBlci5lbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCB1cGRhdGVzID0gW107XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzID0gc3dpcGVyLmdldFNsaWRlQ2xhc3NlcyhzbGlkZUVsKTtcbiAgICAgICAgICB1cGRhdGVzLnB1c2goe1xuICAgICAgICAgICAgc2xpZGVFbCxcbiAgICAgICAgICAgIGNsYXNzTmFtZXNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnX3NsaWRlQ2xhc3MnLCBzbGlkZUVsLCBjbGFzc05hbWVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdfc2xpZGVDbGFzc2VzJywgdXBkYXRlcyk7XG4gICAgICB9XG5cbiAgICAgIHNsaWRlc1BlclZpZXdEeW5hbWljKHZpZXcsIGV4YWN0KSB7XG4gICAgICAgIGlmICh2aWV3ID09PSB2b2lkIDApIHtcbiAgICAgICAgICB2aWV3ID0gJ2N1cnJlbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV4YWN0ID09PSB2b2lkIDApIHtcbiAgICAgICAgICBleGFjdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBzbGlkZXMsXG4gICAgICAgICAgc2xpZGVzR3JpZCxcbiAgICAgICAgICBzbGlkZXNTaXplc0dyaWQsXG4gICAgICAgICAgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBsZXQgc3B2ID0gMTtcblxuICAgICAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgbGV0IHNsaWRlU2l6ZSA9IHNsaWRlc1thY3RpdmVJbmRleF0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgIGxldCBicmVha0xvb3A7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICAgICAgc2xpZGVTaXplICs9IHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgICAgICBpZiAoc2xpZGVTaXplID4gc3dpcGVyU2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSAmJiAhYnJlYWtMb29wKSB7XG4gICAgICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlU2l6ZSA+IHN3aXBlclNpemUpIGJyZWFrTG9vcCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIGlmICh2aWV3ID09PSAnY3VycmVudCcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCArIDE7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2xpZGVJblZpZXcgPSBleGFjdCA/IHNsaWRlc0dyaWRbaV0gKyBzbGlkZXNTaXplc0dyaWRbaV0gLSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSA8IHN3aXBlclNpemUgOiBzbGlkZXNHcmlkW2ldIC0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gPCBzd2lwZXJTaXplO1xuXG4gICAgICAgICAgICAgIGlmIChzbGlkZUluVmlldykge1xuICAgICAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHByZXZpb3VzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBzbGlkZUluVmlldyA9IHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIC0gc2xpZGVzR3JpZFtpXSA8IHN3aXBlclNpemU7XG5cbiAgICAgICAgICAgICAgaWYgKHNsaWRlSW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3B2O1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNuYXBHcmlkLFxuICAgICAgICAgIHBhcmFtc1xuICAgICAgICB9ID0gc3dpcGVyOyAvLyBCcmVha3BvaW50c1xuXG4gICAgICAgIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICAgICAgY29uc3QgdHJhbnNsYXRlVmFsdWUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSAqIC0xIDogc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgICAgICBjb25zdCBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heCh0cmFuc2xhdGVWYWx1ZSwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0cmFuc2xhdGVkO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHN3aXBlci5wYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCkge1xuICAgICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNsYXRlZCA9IHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdHJhbnNsYXRlZCkge1xuICAgICAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHNuYXBHcmlkICE9PSBzd2lwZXIuc25hcEdyaWQpIHtcbiAgICAgICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmVtaXQoJ3VwZGF0ZScpO1xuICAgICAgfVxuXG4gICAgICBjaGFuZ2VEaXJlY3Rpb24obmV3RGlyZWN0aW9uLCBuZWVkVXBkYXRlKSB7XG4gICAgICAgIGlmIChuZWVkVXBkYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgICBuZWVkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREaXJlY3Rpb24gPSBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbjtcblxuICAgICAgICBpZiAoIW5ld0RpcmVjdGlvbikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIG5ld0RpcmVjdGlvbiA9IGN1cnJlbnREaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3RGlyZWN0aW9uID09PSBjdXJyZW50RGlyZWN0aW9uIHx8IG5ld0RpcmVjdGlvbiAhPT0gJ2hvcml6b250YWwnICYmIG5ld0RpcmVjdGlvbiAhPT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuJGVsLnJlbW92ZUNsYXNzKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30ke2N1cnJlbnREaXJlY3Rpb259YCkuYWRkQ2xhc3MoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfSR7bmV3RGlyZWN0aW9ufWApO1xuICAgICAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPSBuZXdEaXJlY3Rpb247XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICBpZiAobmV3RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBzbGlkZUVsLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlRWwuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ2NoYW5nZURpcmVjdGlvbicpO1xuICAgICAgICBpZiAobmVlZFVwZGF0ZSkgc3dpcGVyLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gc3dpcGVyO1xuICAgICAgfVxuXG4gICAgICBjaGFuZ2VMYW5ndWFnZURpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5ydGwgJiYgZGlyZWN0aW9uID09PSAncnRsJyB8fCAhc3dpcGVyLnJ0bCAmJiBkaXJlY3Rpb24gPT09ICdsdHInKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5ydGwgPSBkaXJlY3Rpb24gPT09ICdydGwnO1xuICAgICAgICBzd2lwZXIucnRsVHJhbnNsYXRlID0gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiBzd2lwZXIucnRsO1xuXG4gICAgICAgIGlmIChzd2lwZXIucnRsKSB7XG4gICAgICAgICAgc3dpcGVyLiRlbC5hZGRDbGFzcyhgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9cnRsYCk7XG4gICAgICAgICAgc3dpcGVyLmVsLmRpciA9ICdydGwnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci4kZWwucmVtb3ZlQ2xhc3MoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfXJ0bGApO1xuICAgICAgICAgIHN3aXBlci5lbC5kaXIgPSAnbHRyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci51cGRhdGUoKTtcbiAgICAgIH1cblxuICAgICAgbW91bnQoZWwpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5tb3VudGVkKSByZXR1cm4gdHJ1ZTsgLy8gRmluZCBlbFxuXG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWwgfHwgc3dpcGVyLnBhcmFtcy5lbCk7XG4gICAgICAgIGVsID0gJGVsWzBdO1xuXG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBlbC5zd2lwZXIgPSBzd2lwZXI7XG5cbiAgICAgICAgY29uc3QgZ2V0V3JhcHBlclNlbGVjdG9yID0gKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgLiR7KHN3aXBlci5wYXJhbXMud3JhcHBlckNsYXNzIHx8ICcnKS50cmltKCkuc3BsaXQoJyAnKS5qb2luKCcuJyl9YDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZXRXcmFwcGVyID0gKCkgPT4ge1xuICAgICAgICAgIGlmIChlbCAmJiBlbC5zaGFkb3dSb290ICYmIGVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gJChlbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoZ2V0V3JhcHBlclNlbGVjdG9yKCkpKTsgLy8gQ2hpbGRyZW4gbmVlZHMgdG8gcmV0dXJuIHNsb3QgaXRlbXNcblxuICAgICAgICAgICAgcmVzLmNoaWxkcmVuID0gb3B0aW9ucyA9PiAkZWwuY2hpbGRyZW4ob3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCEkZWwuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHJldHVybiAkKCRlbCkuY2hpbGRyZW4oZ2V0V3JhcHBlclNlbGVjdG9yKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAkZWwuY2hpbGRyZW4oZ2V0V3JhcHBlclNlbGVjdG9yKCkpO1xuICAgICAgICB9OyAvLyBGaW5kIFdyYXBwZXJcblxuXG4gICAgICAgIGxldCAkd3JhcHBlckVsID0gZ2V0V3JhcHBlcigpO1xuXG4gICAgICAgIGlmICgkd3JhcHBlckVsLmxlbmd0aCA9PT0gMCAmJiBzd2lwZXIucGFyYW1zLmNyZWF0ZUVsZW1lbnRzKSB7XG4gICAgICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAkd3JhcHBlckVsID0gJCh3cmFwcGVyKTtcbiAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IHN3aXBlci5wYXJhbXMud3JhcHBlckNsYXNzO1xuICAgICAgICAgICRlbC5hcHBlbmQod3JhcHBlcik7XG4gICAgICAgICAgJGVsLmNoaWxkcmVuKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YCkuZWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICAgICR3cmFwcGVyRWwuYXBwZW5kKHNsaWRlRWwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgICAkZWwsXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgJHdyYXBwZXJFbCxcbiAgICAgICAgICB3cmFwcGVyRWw6ICR3cmFwcGVyRWxbMF0sXG4gICAgICAgICAgbW91bnRlZDogdHJ1ZSxcbiAgICAgICAgICAvLyBSVExcbiAgICAgICAgICBydGw6IGVsLmRpci50b0xvd2VyQ2FzZSgpID09PSAncnRsJyB8fCAkZWwuY3NzKCdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcsXG4gICAgICAgICAgcnRsVHJhbnNsYXRlOiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIChlbC5kaXIudG9Mb3dlckNhc2UoKSA9PT0gJ3J0bCcgfHwgJGVsLmNzcygnZGlyZWN0aW9uJykgPT09ICdydGwnKSxcbiAgICAgICAgICB3cm9uZ1JUTDogJHdyYXBwZXJFbC5jc3MoJ2Rpc3BsYXknKSA9PT0gJy13ZWJraXQtYm94J1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGluaXQoZWwpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuIHN3aXBlcjtcbiAgICAgICAgY29uc3QgbW91bnRlZCA9IHN3aXBlci5tb3VudChlbCk7XG4gICAgICAgIGlmIChtb3VudGVkID09PSBmYWxzZSkgcmV0dXJuIHN3aXBlcjtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZUluaXQnKTsgLy8gU2V0IGJyZWFrcG9pbnRcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgICAgIH0gLy8gQWRkIENsYXNzZXNcblxuXG4gICAgICAgIHN3aXBlci5hZGRDbGFzc2VzKCk7IC8vIENyZWF0ZSBsb29wXG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICAgIH0gLy8gVXBkYXRlIHNpemVcblxuXG4gICAgICAgIHN3aXBlci51cGRhdGVTaXplKCk7IC8vIFVwZGF0ZSBzbGlkZXNcblxuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykge1xuICAgICAgICAgIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgICAgIH0gLy8gU2V0IEdyYWIgQ3Vyc29yXG5cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnByZWxvYWRJbWFnZXMpIHtcbiAgICAgICAgICBzd2lwZXIucHJlbG9hZEltYWdlcygpO1xuICAgICAgICB9IC8vIFNsaWRlIFRvIEluaXRpYWwgU2xpZGVcblxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUsIDAsIHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0gLy8gQXR0YWNoIGV2ZW50c1xuXG5cbiAgICAgICAgc3dpcGVyLmF0dGFjaEV2ZW50cygpOyAvLyBJbml0IEZsYWdcblxuICAgICAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSB0cnVlOyAvLyBFbWl0XG5cbiAgICAgICAgc3dpcGVyLmVtaXQoJ2luaXQnKTtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ2FmdGVySW5pdCcpO1xuICAgICAgICByZXR1cm4gc3dpcGVyO1xuICAgICAgfVxuXG4gICAgICBkZXN0cm95KGRlbGV0ZUluc3RhbmNlLCBjbGVhblN0eWxlcykge1xuICAgICAgICBpZiAoZGVsZXRlSW5zdGFuY2UgPT09IHZvaWQgMCkge1xuICAgICAgICAgIGRlbGV0ZUluc3RhbmNlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjbGVhblN0eWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2xlYW5TdHlsZXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAkZWwsXG4gICAgICAgICAgJHdyYXBwZXJFbCxcbiAgICAgICAgICBzbGlkZXNcbiAgICAgICAgfSA9IHN3aXBlcjtcblxuICAgICAgICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMgPT09ICd1bmRlZmluZWQnIHx8IHN3aXBlci5kZXN0cm95ZWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVEZXN0cm95Jyk7IC8vIEluaXQgRmxhZ1xuXG4gICAgICAgIHN3aXBlci5pbml0aWFsaXplZCA9IGZhbHNlOyAvLyBEZXRhY2ggZXZlbnRzXG5cbiAgICAgICAgc3dpcGVyLmRldGFjaEV2ZW50cygpOyAvLyBEZXN0cm95IGxvb3BcblxuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgICAgfSAvLyBDbGVhbnVwIHN0eWxlc1xuXG5cbiAgICAgICAgaWYgKGNsZWFuU3R5bGVzKSB7XG4gICAgICAgICAgc3dpcGVyLnJlbW92ZUNsYXNzZXMoKTtcbiAgICAgICAgICAkZWwucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAkd3JhcHBlckVsLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cbiAgICAgICAgICBpZiAoc2xpZGVzICYmIHNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNsaWRlcy5yZW1vdmVDbGFzcyhbcGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzLCBwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcywgcGFyYW1zLnNsaWRlTmV4dENsYXNzLCBwYXJhbXMuc2xpZGVQcmV2Q2xhc3NdLmpvaW4oJyAnKSkucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5lbWl0KCdkZXN0cm95Jyk7IC8vIERldGFjaCBlbWl0dGVyIGV2ZW50c1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHN3aXBlci5ldmVudHNMaXN0ZW5lcnMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICBzd2lwZXIub2ZmKGV2ZW50TmFtZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkZWxldGVJbnN0YW5jZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBzd2lwZXIuJGVsWzBdLnN3aXBlciA9IG51bGw7XG4gICAgICAgICAgZGVsZXRlUHJvcHMoc3dpcGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgc3RhdGljIGV4dGVuZERlZmF1bHRzKG5ld0RlZmF1bHRzKSB7XG4gICAgICAgIGV4dGVuZChleHRlbmRlZERlZmF1bHRzLCBuZXdEZWZhdWx0cyk7XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyBnZXQgZXh0ZW5kZWREZWZhdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRGVmYXVsdHM7XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgIH1cblxuICAgICAgc3RhdGljIGluc3RhbGxNb2R1bGUobW9kKSB7XG4gICAgICAgIGlmICghU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXykgU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXyA9IFtdO1xuICAgICAgICBjb25zdCBtb2R1bGVzID0gU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXztcblxuICAgICAgICBpZiAodHlwZW9mIG1vZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtb2R1bGVzLmluZGV4T2YobW9kKSA8IDApIHtcbiAgICAgICAgICBtb2R1bGVzLnB1c2gobW9kKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzdGF0aWMgdXNlKG1vZHVsZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtb2R1bGUpKSB7XG4gICAgICAgICAgbW9kdWxlLmZvckVhY2gobSA9PiBTd2lwZXIuaW5zdGFsbE1vZHVsZShtKSk7XG4gICAgICAgICAgcmV0dXJuIFN3aXBlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIFN3aXBlci5pbnN0YWxsTW9kdWxlKG1vZHVsZSk7XG4gICAgICAgIHJldHVybiBTd2lwZXI7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhwcm90b3R5cGVzKS5mb3JFYWNoKHByb3RvdHlwZUdyb3VwID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXNbcHJvdG90eXBlR3JvdXBdKS5mb3JFYWNoKHByb3RvTWV0aG9kID0+IHtcbiAgICAgICAgU3dpcGVyLnByb3RvdHlwZVtwcm90b01ldGhvZF0gPSBwcm90b3R5cGVzW3Byb3RvdHlwZUdyb3VwXVtwcm90b01ldGhvZF07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBTd2lwZXIudXNlKFtSZXNpemUsIE9ic2VydmVyXSk7XG5cbiAgICBmdW5jdGlvbiBWaXJ0dWFsKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvbixcbiAgICAgICAgZW1pdFxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICB2aXJ0dWFsOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgc2xpZGVzOiBbXSxcbiAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICByZW5kZXJTbGlkZTogbnVsbCxcbiAgICAgICAgICByZW5kZXJFeHRlcm5hbDogbnVsbCxcbiAgICAgICAgICByZW5kZXJFeHRlcm5hbFVwZGF0ZTogdHJ1ZSxcbiAgICAgICAgICBhZGRTbGlkZXNCZWZvcmU6IDAsXG4gICAgICAgICAgYWRkU2xpZGVzQWZ0ZXI6IDBcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsZXQgY3NzTW9kZVRpbWVvdXQ7XG4gICAgICBzd2lwZXIudmlydHVhbCA9IHtcbiAgICAgICAgY2FjaGU6IHt9LFxuICAgICAgICBmcm9tOiB1bmRlZmluZWQsXG4gICAgICAgIHRvOiB1bmRlZmluZWQsXG4gICAgICAgIHNsaWRlczogW10sXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgc2xpZGVzR3JpZDogW11cbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIHJlbmRlclNsaWRlKHNsaWRlLCBpbmRleCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnZpcnR1YWw7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5jYWNoZSAmJiBzd2lwZXIudmlydHVhbC5jYWNoZVtpbmRleF0pIHtcbiAgICAgICAgICByZXR1cm4gc3dpcGVyLnZpcnR1YWwuY2FjaGVbaW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgJHNsaWRlRWwgPSBwYXJhbXMucmVuZGVyU2xpZGUgPyAkKHBhcmFtcy5yZW5kZXJTbGlkZS5jYWxsKHN3aXBlciwgc2xpZGUsIGluZGV4KSkgOiAkKGA8ZGl2IGNsYXNzPVwiJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9XCIgZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke2luZGV4fVwiPiR7c2xpZGV9PC9kaXY+YCk7XG4gICAgICAgIGlmICghJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnLCBpbmRleCk7XG4gICAgICAgIGlmIChwYXJhbXMuY2FjaGUpIHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XSA9ICRzbGlkZUVsO1xuICAgICAgICByZXR1cm4gJHNsaWRlRWw7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZShmb3JjZSkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldyxcbiAgICAgICAgICBzbGlkZXNQZXJHcm91cCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlc1xuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGFkZFNsaWRlc0JlZm9yZSxcbiAgICAgICAgICBhZGRTbGlkZXNBZnRlclxuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcy52aXJ0dWFsO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgZnJvbTogcHJldmlvdXNGcm9tLFxuICAgICAgICAgIHRvOiBwcmV2aW91c1RvLFxuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICBzbGlkZXNHcmlkOiBwcmV2aW91c1NsaWRlc0dyaWQsXG4gICAgICAgICAgb2Zmc2V0OiBwcmV2aW91c09mZnNldFxuICAgICAgICB9ID0gc3dpcGVyLnZpcnR1YWw7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4IHx8IDA7XG4gICAgICAgIGxldCBvZmZzZXRQcm9wO1xuICAgICAgICBpZiAoc3dpcGVyLnJ0bFRyYW5zbGF0ZSkgb2Zmc2V0UHJvcCA9ICdyaWdodCc7ZWxzZSBvZmZzZXRQcm9wID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgICAgIGxldCBzbGlkZXNBZnRlcjtcbiAgICAgICAgbGV0IHNsaWRlc0JlZm9yZTtcblxuICAgICAgICBpZiAoY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICBzbGlkZXNBZnRlciA9IE1hdGguZmxvb3Ioc2xpZGVzUGVyVmlldyAvIDIpICsgc2xpZGVzUGVyR3JvdXAgKyBhZGRTbGlkZXNBZnRlcjtcbiAgICAgICAgICBzbGlkZXNCZWZvcmUgPSBNYXRoLmZsb29yKHNsaWRlc1BlclZpZXcgLyAyKSArIHNsaWRlc1Blckdyb3VwICsgYWRkU2xpZGVzQmVmb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlc0FmdGVyID0gc2xpZGVzUGVyVmlldyArIChzbGlkZXNQZXJHcm91cCAtIDEpICsgYWRkU2xpZGVzQWZ0ZXI7XG4gICAgICAgICAgc2xpZGVzQmVmb3JlID0gc2xpZGVzUGVyR3JvdXAgKyBhZGRTbGlkZXNCZWZvcmU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmcm9tID0gTWF0aC5tYXgoKGFjdGl2ZUluZGV4IHx8IDApIC0gc2xpZGVzQmVmb3JlLCAwKTtcbiAgICAgICAgY29uc3QgdG8gPSBNYXRoLm1pbigoYWN0aXZlSW5kZXggfHwgMCkgKyBzbGlkZXNBZnRlciwgc2xpZGVzLmxlbmd0aCAtIDEpO1xuICAgICAgICBjb25zdCBvZmZzZXQgPSAoc3dpcGVyLnNsaWRlc0dyaWRbZnJvbV0gfHwgMCkgLSAoc3dpcGVyLnNsaWRlc0dyaWRbMF0gfHwgMCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLnZpcnR1YWwsIHtcbiAgICAgICAgICBmcm9tLFxuICAgICAgICAgIHRvLFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBzbGlkZXNHcmlkOiBzd2lwZXIuc2xpZGVzR3JpZFxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBvblJlbmRlcmVkKCkge1xuICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5sYXp5ICYmIHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XG4gICAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZW1pdCgndmlydHVhbFVwZGF0ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZpb3VzRnJvbSA9PT0gZnJvbSAmJiBwcmV2aW91c1RvID09PSB0byAmJiAhZm9yY2UpIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLnNsaWRlc0dyaWQgIT09IHByZXZpb3VzU2xpZGVzR3JpZCAmJiBvZmZzZXQgIT09IHByZXZpb3VzT2Zmc2V0KSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVzLmNzcyhvZmZzZXRQcm9wLCBgJHtvZmZzZXR9cHhgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICBlbWl0KCd2aXJ0dWFsVXBkYXRlJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbC5yZW5kZXJFeHRlcm5hbCkge1xuICAgICAgICAgIHN3aXBlci5wYXJhbXMudmlydHVhbC5yZW5kZXJFeHRlcm5hbC5jYWxsKHN3aXBlciwge1xuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgc2xpZGVzOiBmdW5jdGlvbiBnZXRTbGlkZXMoKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNsaWRlc1RvUmVuZGVyID0gW107XG5cbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZyb207IGkgPD0gdG87IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvUmVuZGVyLnB1c2goc2xpZGVzW2ldKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBzbGlkZXNUb1JlbmRlcjtcbiAgICAgICAgICAgIH0oKVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbC5yZW5kZXJFeHRlcm5hbFVwZGF0ZSkge1xuICAgICAgICAgICAgb25SZW5kZXJlZCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbWl0KCd2aXJ0dWFsVXBkYXRlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJlcGVuZEluZGV4ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgYXBwZW5kSW5kZXhlcyA9IFtdO1xuXG4gICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmZpbmQoYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gKS5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gcHJldmlvdXNGcm9tOyBpIDw9IHByZXZpb3VzVG87IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGkgPCBmcm9tIHx8IGkgPiB0bykge1xuICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5maW5kKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtpfVwiXWApLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGkgPj0gZnJvbSAmJiBpIDw9IHRvKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByZXZpb3VzVG8gPT09ICd1bmRlZmluZWQnIHx8IGZvcmNlKSB7XG4gICAgICAgICAgICAgIGFwcGVuZEluZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChpID4gcHJldmlvdXNUbykgYXBwZW5kSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICBpZiAoaSA8IHByZXZpb3VzRnJvbSkgcHJlcGVuZEluZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhcHBlbmRJbmRleGVzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmFwcGVuZChyZW5kZXJTbGlkZShzbGlkZXNbaW5kZXhdLCBpbmRleCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJlcGVuZEluZGV4ZXMuc29ydCgoYSwgYikgPT4gYiAtIGEpLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLnByZXBlbmQocmVuZGVyU2xpZGUoc2xpZGVzW2luZGV4XSwgaW5kZXgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKCcuc3dpcGVyLXNsaWRlJykuY3NzKG9mZnNldFByb3AsIGAke29mZnNldH1weGApO1xuICAgICAgICBvblJlbmRlcmVkKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFwcGVuZFNsaWRlKHNsaWRlcykge1xuICAgICAgICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gc2xpZGVzKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChzbGlkZXNbaV0pIHN3aXBlci52aXJ0dWFsLnNsaWRlcy5wdXNoKHNsaWRlc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci52aXJ0dWFsLnNsaWRlcy5wdXNoKHNsaWRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGUodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHByZXBlbmRTbGlkZShzbGlkZXMpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgICAgIGxldCBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcbiAgICAgICAgbGV0IG51bWJlck9mTmV3U2xpZGVzID0gMTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzbGlkZXMpKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChzbGlkZXNbaV0pIHN3aXBlci52aXJ0dWFsLnNsaWRlcy51bnNoaWZ0KHNsaWRlc1tpXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgICAgbnVtYmVyT2ZOZXdTbGlkZXMgPSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci52aXJ0dWFsLnNsaWRlcy51bnNoaWZ0KHNsaWRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmNhY2hlKSB7XG4gICAgICAgICAgY29uc3QgY2FjaGUgPSBzd2lwZXIudmlydHVhbC5jYWNoZTtcbiAgICAgICAgICBjb25zdCBuZXdDYWNoZSA9IHt9O1xuICAgICAgICAgIE9iamVjdC5rZXlzKGNhY2hlKS5mb3JFYWNoKGNhY2hlZEluZGV4ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRjYWNoZWRFbCA9IGNhY2hlW2NhY2hlZEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlZEVsSW5kZXggPSAkY2FjaGVkRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcblxuICAgICAgICAgICAgaWYgKGNhY2hlZEVsSW5kZXgpIHtcbiAgICAgICAgICAgICAgJGNhY2hlZEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JywgcGFyc2VJbnQoY2FjaGVkRWxJbmRleCwgMTApICsgbnVtYmVyT2ZOZXdTbGlkZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdDYWNoZVtwYXJzZUludChjYWNoZWRJbmRleCwgMTApICsgbnVtYmVyT2ZOZXdTbGlkZXNdID0gJGNhY2hlZEVsO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHN3aXBlci52aXJ0dWFsLmNhY2hlID0gbmV3Q2FjaGU7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGUodHJ1ZSk7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVtb3ZlU2xpZGUoc2xpZGVzSW5kZXhlcykge1xuICAgICAgICBpZiAodHlwZW9mIHNsaWRlc0luZGV4ZXMgPT09ICd1bmRlZmluZWQnIHx8IHNsaWRlc0luZGV4ZXMgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNsaWRlc0luZGV4ZXMpKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IHNsaWRlc0luZGV4ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICAgIHN3aXBlci52aXJ0dWFsLnNsaWRlcy5zcGxpY2Uoc2xpZGVzSW5kZXhlc1tpXSwgMSk7XG5cbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwuY2FjaGUpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHN3aXBlci52aXJ0dWFsLmNhY2hlW3NsaWRlc0luZGV4ZXNbaV1dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2xpZGVzSW5kZXhlc1tpXSA8IGFjdGl2ZUluZGV4KSBhY3RpdmVJbmRleCAtPSAxO1xuICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBNYXRoLm1heChhY3RpdmVJbmRleCwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci52aXJ0dWFsLnNsaWRlcy5zcGxpY2Uoc2xpZGVzSW5kZXhlcywgMSk7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmNhY2hlKSB7XG4gICAgICAgICAgICBkZWxldGUgc3dpcGVyLnZpcnR1YWwuY2FjaGVbc2xpZGVzSW5kZXhlc107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNsaWRlc0luZGV4ZXMgPCBhY3RpdmVJbmRleCkgYWN0aXZlSW5kZXggLT0gMTtcbiAgICAgICAgICBhY3RpdmVJbmRleCA9IE1hdGgubWF4KGFjdGl2ZUluZGV4LCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZSh0cnVlKTtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oYWN0aXZlSW5kZXgsIDApO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZW1vdmVBbGxTbGlkZXMoKSB7XG4gICAgICAgIHN3aXBlci52aXJ0dWFsLnNsaWRlcyA9IFtdO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwuY2FjaGUpIHtcbiAgICAgICAgICBzd2lwZXIudmlydHVhbC5jYWNoZSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKHRydWUpO1xuICAgICAgICBzd2lwZXIuc2xpZGVUbygwLCAwKTtcbiAgICAgIH1cblxuICAgICAgb24oJ2JlZm9yZUluaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzID0gc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnNsaWRlcztcbiAgICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9dmlydHVhbGApO1xuICAgICAgICBzd2lwZXIucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICBzd2lwZXIub3JpZ2luYWxQYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSkge1xuICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdzZXRUcmFuc2xhdGUnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlICYmICFzd2lwZXIuX2ltbWVkaWF0ZVZpcnR1YWwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoY3NzTW9kZVRpbWVvdXQpO1xuICAgICAgICAgIGNzc01vZGVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdpbml0IHVwZGF0ZSByZXNpemUnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgc2V0Q1NTUHJvcGVydHkoc3dpcGVyLndyYXBwZXJFbCwgJy0tc3dpcGVyLXZpcnR1YWwtc2l6ZScsIGAke3N3aXBlci52aXJ0dWFsU2l6ZX1weGApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLnZpcnR1YWwsIHtcbiAgICAgICAgYXBwZW5kU2xpZGUsXG4gICAgICAgIHByZXBlbmRTbGlkZSxcbiAgICAgICAgcmVtb3ZlU2xpZGUsXG4gICAgICAgIHJlbW92ZUFsbFNsaWRlcyxcbiAgICAgICAgdXBkYXRlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuICAgIGZ1bmN0aW9uIEtleWJvYXJkKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvbixcbiAgICAgICAgZW1pdFxuICAgICAgfSA9IF9yZWY7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIHN3aXBlci5rZXlib2FyZCA9IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgIH07XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBrZXlib2FyZDoge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIG9ubHlJblZpZXdwb3J0OiB0cnVlLFxuICAgICAgICAgIHBhZ2VVcERvd246IHRydWVcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuICAgICAgICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBydGxUcmFuc2xhdGU6IHJ0bFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBsZXQgZSA9IGV2ZW50O1xuICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50OyAvLyBqcXVlcnkgZml4XG5cbiAgICAgICAgY29uc3Qga2MgPSBlLmtleUNvZGUgfHwgZS5jaGFyQ29kZTtcbiAgICAgICAgY29uc3QgcGFnZVVwRG93biA9IHN3aXBlci5wYXJhbXMua2V5Ym9hcmQucGFnZVVwRG93bjtcbiAgICAgICAgY29uc3QgaXNQYWdlVXAgPSBwYWdlVXBEb3duICYmIGtjID09PSAzMztcbiAgICAgICAgY29uc3QgaXNQYWdlRG93biA9IHBhZ2VVcERvd24gJiYga2MgPT09IDM0O1xuICAgICAgICBjb25zdCBpc0Fycm93TGVmdCA9IGtjID09PSAzNztcbiAgICAgICAgY29uc3QgaXNBcnJvd1JpZ2h0ID0ga2MgPT09IDM5O1xuICAgICAgICBjb25zdCBpc0Fycm93VXAgPSBrYyA9PT0gMzg7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dEb3duID0ga2MgPT09IDQwOyAvLyBEaXJlY3Rpb25zIGxvY2tzXG5cbiAgICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBpc0Fycm93UmlnaHQgfHwgc3dpcGVyLmlzVmVydGljYWwoKSAmJiBpc0Fycm93RG93biB8fCBpc1BhZ2VEb3duKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgaXNBcnJvd0xlZnQgfHwgc3dpcGVyLmlzVmVydGljYWwoKSAmJiBpc0Fycm93VXAgfHwgaXNQYWdlVXApKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkgfHwgZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lICYmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5rZXlib2FyZC5vbmx5SW5WaWV3cG9ydCAmJiAoaXNQYWdlVXAgfHwgaXNQYWdlRG93biB8fCBpc0Fycm93TGVmdCB8fCBpc0Fycm93UmlnaHQgfHwgaXNBcnJvd1VwIHx8IGlzQXJyb3dEb3duKSkge1xuICAgICAgICAgIGxldCBpblZpZXcgPSBmYWxzZTsgLy8gQ2hlY2sgdGhhdCBzd2lwZXIgc2hvdWxkIGJlIGluc2lkZSBvZiB2aXNpYmxlIGFyZWEgb2Ygd2luZG93XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLiRlbC5wYXJlbnRzKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YCkubGVuZ3RoID4gMCAmJiBzd2lwZXIuJGVsLnBhcmVudHMoYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzc31gKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgJGVsID0gc3dpcGVyLiRlbDtcbiAgICAgICAgICBjb25zdCBzd2lwZXJXaWR0aCA9ICRlbFswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICBjb25zdCBzd2lwZXJIZWlnaHQgPSAkZWxbMF0uY2xpZW50SGVpZ2h0O1xuICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgIGNvbnN0IHN3aXBlck9mZnNldCA9IHN3aXBlci4kZWwub2Zmc2V0KCk7XG4gICAgICAgICAgaWYgKHJ0bCkgc3dpcGVyT2Zmc2V0LmxlZnQgLT0gc3dpcGVyLiRlbFswXS5zY3JvbGxMZWZ0O1xuICAgICAgICAgIGNvbnN0IHN3aXBlckNvb3JkID0gW1tzd2lwZXJPZmZzZXQubGVmdCwgc3dpcGVyT2Zmc2V0LnRvcF0sIFtzd2lwZXJPZmZzZXQubGVmdCArIHN3aXBlcldpZHRoLCBzd2lwZXJPZmZzZXQudG9wXSwgW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wICsgc3dpcGVySGVpZ2h0XSwgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyV2lkdGgsIHN3aXBlck9mZnNldC50b3AgKyBzd2lwZXJIZWlnaHRdXTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyQ29vcmQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gc3dpcGVyQ29vcmRbaV07XG5cbiAgICAgICAgICAgIGlmIChwb2ludFswXSA+PSAwICYmIHBvaW50WzBdIDw9IHdpbmRvd1dpZHRoICYmIHBvaW50WzFdID49IDAgJiYgcG9pbnRbMV0gPD0gd2luZG93SGVpZ2h0KSB7XG4gICAgICAgICAgICAgIGlmIChwb2ludFswXSA9PT0gMCAmJiBwb2ludFsxXSA9PT0gMCkgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgICAgICAgICBpblZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghaW5WaWV3KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgIGlmIChpc1BhZ2VVcCB8fCBpc1BhZ2VEb3duIHx8IGlzQXJyb3dMZWZ0IHx8IGlzQXJyb3dSaWdodCkge1xuICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoKGlzUGFnZURvd24gfHwgaXNBcnJvd1JpZ2h0KSAmJiAhcnRsIHx8IChpc1BhZ2VVcCB8fCBpc0Fycm93TGVmdCkgJiYgcnRsKSBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgaWYgKChpc1BhZ2VVcCB8fCBpc0Fycm93TGVmdCkgJiYgIXJ0bCB8fCAoaXNQYWdlRG93biB8fCBpc0Fycm93UmlnaHQpICYmIHJ0bCkgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc1BhZ2VVcCB8fCBpc1BhZ2VEb3duIHx8IGlzQXJyb3dVcCB8fCBpc0Fycm93RG93bikge1xuICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNQYWdlRG93biB8fCBpc0Fycm93RG93bikgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICAgIGlmIChpc1BhZ2VVcCB8fCBpc0Fycm93VXApIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoJ2tleVByZXNzJywga2MpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgIGlmIChzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIGhhbmRsZSk7XG4gICAgICAgIHN3aXBlci5rZXlib2FyZC5lbmFibGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKCFzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24nLCBoYW5kbGUpO1xuICAgICAgICBzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBvbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMua2V5Ym9hcmQuZW5hYmxlZCkge1xuICAgICAgICAgIGVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHtcbiAgICAgICAgICBkaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIua2V5Ym9hcmQsIHtcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBkaXNhYmxlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuICAgIGZ1bmN0aW9uIE1vdXNld2hlZWwoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgbW91c2V3aGVlbDoge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcbiAgICAgICAgICBpbnZlcnQ6IGZhbHNlLFxuICAgICAgICAgIGZvcmNlVG9BeGlzOiBmYWxzZSxcbiAgICAgICAgICBzZW5zaXRpdml0eTogMSxcbiAgICAgICAgICBldmVudHNUYXJnZXQ6ICdjb250YWluZXInLFxuICAgICAgICAgIHRocmVzaG9sZERlbHRhOiBudWxsLFxuICAgICAgICAgIHRocmVzaG9sZFRpbWU6IG51bGxcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzd2lwZXIubW91c2V3aGVlbCA9IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgIH07XG4gICAgICBsZXQgdGltZW91dDtcbiAgICAgIGxldCBsYXN0U2Nyb2xsVGltZSA9IG5vdygpO1xuICAgICAgbGV0IGxhc3RFdmVudEJlZm9yZVNuYXA7XG4gICAgICBjb25zdCByZWNlbnRXaGVlbEV2ZW50cyA9IFtdO1xuXG4gICAgICBmdW5jdGlvbiBub3JtYWxpemUoZSkge1xuICAgICAgICAvLyBSZWFzb25hYmxlIGRlZmF1bHRzXG4gICAgICAgIGNvbnN0IFBJWEVMX1NURVAgPSAxMDtcbiAgICAgICAgY29uc3QgTElORV9IRUlHSFQgPSA0MDtcbiAgICAgICAgY29uc3QgUEFHRV9IRUlHSFQgPSA4MDA7XG4gICAgICAgIGxldCBzWCA9IDA7XG4gICAgICAgIGxldCBzWSA9IDA7IC8vIHNwaW5YLCBzcGluWVxuXG4gICAgICAgIGxldCBwWCA9IDA7XG4gICAgICAgIGxldCBwWSA9IDA7IC8vIHBpeGVsWCwgcGl4ZWxZXG4gICAgICAgIC8vIExlZ2FjeVxuXG4gICAgICAgIGlmICgnZGV0YWlsJyBpbiBlKSB7XG4gICAgICAgICAgc1kgPSBlLmRldGFpbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgnd2hlZWxEZWx0YScgaW4gZSkge1xuICAgICAgICAgIHNZID0gLWUud2hlZWxEZWx0YSAvIDEyMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgnd2hlZWxEZWx0YVknIGluIGUpIHtcbiAgICAgICAgICBzWSA9IC1lLndoZWVsRGVsdGFZIC8gMTIwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCd3aGVlbERlbHRhWCcgaW4gZSkge1xuICAgICAgICAgIHNYID0gLWUud2hlZWxEZWx0YVggLyAxMjA7XG4gICAgICAgIH0gLy8gc2lkZSBzY3JvbGxpbmcgb24gRkYgd2l0aCBET01Nb3VzZVNjcm9sbFxuXG5cbiAgICAgICAgaWYgKCdheGlzJyBpbiBlICYmIGUuYXhpcyA9PT0gZS5IT1JJWk9OVEFMX0FYSVMpIHtcbiAgICAgICAgICBzWCA9IHNZO1xuICAgICAgICAgIHNZID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHBYID0gc1ggKiBQSVhFTF9TVEVQO1xuICAgICAgICBwWSA9IHNZICogUElYRUxfU1RFUDtcblxuICAgICAgICBpZiAoJ2RlbHRhWScgaW4gZSkge1xuICAgICAgICAgIHBZID0gZS5kZWx0YVk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ2RlbHRhWCcgaW4gZSkge1xuICAgICAgICAgIHBYID0gZS5kZWx0YVg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5zaGlmdEtleSAmJiAhcFgpIHtcbiAgICAgICAgICAvLyBpZiB1c2VyIHNjcm9sbHMgd2l0aCBzaGlmdCBoZSB3YW50cyBob3Jpem9udGFsIHNjcm9sbFxuICAgICAgICAgIHBYID0gcFk7XG4gICAgICAgICAgcFkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChwWCB8fCBwWSkgJiYgZS5kZWx0YU1vZGUpIHtcbiAgICAgICAgICBpZiAoZS5kZWx0YU1vZGUgPT09IDEpIHtcbiAgICAgICAgICAgIC8vIGRlbHRhIGluIExJTkUgdW5pdHNcbiAgICAgICAgICAgIHBYICo9IExJTkVfSEVJR0hUO1xuICAgICAgICAgICAgcFkgKj0gTElORV9IRUlHSFQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlbHRhIGluIFBBR0UgdW5pdHNcbiAgICAgICAgICAgIHBYICo9IFBBR0VfSEVJR0hUO1xuICAgICAgICAgICAgcFkgKj0gUEFHRV9IRUlHSFQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIEZhbGwtYmFjayBpZiBzcGluIGNhbm5vdCBiZSBkZXRlcm1pbmVkXG5cblxuICAgICAgICBpZiAocFggJiYgIXNYKSB7XG4gICAgICAgICAgc1ggPSBwWCA8IDEgPyAtMSA6IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocFkgJiYgIXNZKSB7XG4gICAgICAgICAgc1kgPSBwWSA8IDEgPyAtMSA6IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNwaW5YOiBzWCxcbiAgICAgICAgICBzcGluWTogc1ksXG4gICAgICAgICAgcGl4ZWxYOiBwWCxcbiAgICAgICAgICBwaXhlbFk6IHBZXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLm1vdXNlRW50ZXJlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlTGVhdmUoKSB7XG4gICAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLm1vdXNlRW50ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhbmltYXRlU2xpZGVyKG5ld0V2ZW50KSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwudGhyZXNob2xkRGVsdGEgJiYgbmV3RXZlbnQuZGVsdGEgPCBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwudGhyZXNob2xkRGVsdGEpIHtcbiAgICAgICAgICAvLyBQcmV2ZW50IGlmIGRlbHRhIG9mIHdoZWVsIHNjcm9sbCBkZWx0YSBpcyBiZWxvdyBjb25maWd1cmVkIHRocmVzaG9sZFxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwudGhyZXNob2xkVGltZSAmJiBub3coKSAtIGxhc3RTY3JvbGxUaW1lIDwgc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLnRocmVzaG9sZFRpbWUpIHtcbiAgICAgICAgICAvLyBQcmV2ZW50IGlmIHRpbWUgYmV0d2VlbiBzY3JvbGxzIGlzIGJlbG93IGNvbmZpZ3VyZWQgdGhyZXNob2xkXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IC8vIElmIHRoZSBtb3ZlbWVudCBpcyBOT1QgYmlnIGVub3VnaCBhbmRcbiAgICAgICAgLy8gaWYgdGhlIGxhc3QgdGltZSB0aGUgdXNlciBzY3JvbGxlZCB3YXMgdG9vIGNsb3NlIHRvIHRoZSBjdXJyZW50IG9uZSAoYXZvaWQgY29udGludW91c2x5IHRyaWdnZXJpbmcgdGhlIHNsaWRlcik6XG4gICAgICAgIC8vICAgRG9uJ3QgZ28gYW55IGZ1cnRoZXIgKGF2b2lkIGluc2lnbmlmaWNhbnQgc2Nyb2xsIG1vdmVtZW50KS5cblxuXG4gICAgICAgIGlmIChuZXdFdmVudC5kZWx0YSA+PSA2ICYmIG5vdygpIC0gbGFzdFNjcm9sbFRpbWUgPCA2MCkge1xuICAgICAgICAgIC8vIFJldHVybiBmYWxzZSBhcyBhIGRlZmF1bHRcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSAvLyBJZiB1c2VyIGlzIHNjcm9sbGluZyB0b3dhcmRzIHRoZSBlbmQ6XG4gICAgICAgIC8vICAgSWYgdGhlIHNsaWRlciBoYXNuJ3QgaGl0IHRoZSBsYXRlc3Qgc2xpZGUgb3JcbiAgICAgICAgLy8gICBpZiB0aGUgc2xpZGVyIGlzIGEgbG9vcCBhbmRcbiAgICAgICAgLy8gICBpZiB0aGUgc2xpZGVyIGlzbid0IG1vdmluZyByaWdodCBub3c6XG4gICAgICAgIC8vICAgICBHbyB0byBuZXh0IHNsaWRlIGFuZFxuICAgICAgICAvLyAgICAgZW1pdCBhIHNjcm9sbCBldmVudC5cbiAgICAgICAgLy8gRWxzZSAodGhlIHVzZXIgaXMgc2Nyb2xsaW5nIHRvd2FyZHMgdGhlIGJlZ2lubmluZykgYW5kXG4gICAgICAgIC8vIGlmIHRoZSBzbGlkZXIgaGFzbid0IGhpdCB0aGUgZmlyc3Qgc2xpZGUgb3JcbiAgICAgICAgLy8gaWYgdGhlIHNsaWRlciBpcyBhIGxvb3AgYW5kXG4gICAgICAgIC8vIGlmIHRoZSBzbGlkZXIgaXNuJ3QgbW92aW5nIHJpZ2h0IG5vdzpcbiAgICAgICAgLy8gICBHbyB0byBwcmV2IHNsaWRlIGFuZFxuICAgICAgICAvLyAgIGVtaXQgYSBzY3JvbGwgZXZlbnQuXG5cblxuICAgICAgICBpZiAobmV3RXZlbnQuZGlyZWN0aW9uIDwgMCkge1xuICAgICAgICAgIGlmICgoIXN3aXBlci5pc0VuZCB8fCBzd2lwZXIucGFyYW1zLmxvb3ApICYmICFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICBlbWl0KCdzY3JvbGwnLCBuZXdFdmVudC5yYXcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgoIXN3aXBlci5pc0JlZ2lubmluZyB8fCBzd2lwZXIucGFyYW1zLmxvb3ApICYmICFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgICAgIGVtaXQoJ3Njcm9sbCcsIG5ld0V2ZW50LnJhdyk7XG4gICAgICAgIH0gLy8gSWYgeW91IGdvdCBoZXJlIGlzIGJlY2F1c2UgYW4gYW5pbWF0aW9uIGhhcyBiZWVuIHRyaWdnZXJlZCBzbyBzdG9yZSB0aGUgY3VycmVudCB0aW1lXG5cblxuICAgICAgICBsYXN0U2Nyb2xsVGltZSA9IG5ldyB3aW5kb3cuRGF0ZSgpLmdldFRpbWUoKTsgLy8gUmV0dXJuIGZhbHNlIGFzIGEgZGVmYXVsdFxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVsZWFzZVNjcm9sbChuZXdFdmVudCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWw7XG5cbiAgICAgICAgaWYgKG5ld0V2ZW50LmRpcmVjdGlvbiA8IDApIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgcGFyYW1zLnJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdHJ1ZSB0byBhbmltYXRlIHNjcm9sbCBvbiBlZGdlc1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmIHBhcmFtcy5yZWxlYXNlT25FZGdlcykge1xuICAgICAgICAgIC8vIFJldHVybiB0cnVlIHRvIGFuaW1hdGUgc2Nyb2xsIG9uIGVkZ2VzXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuICAgICAgICBsZXQgZSA9IGV2ZW50O1xuICAgICAgICBsZXQgZGlzYWJsZVBhcmVudFN3aXBlciA9IHRydWU7XG4gICAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGFyZ2V0ID0gc3dpcGVyLiRlbDtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdldCAhPT0gJ2NvbnRhaW5lcicpIHtcbiAgICAgICAgICB0YXJnZXQgPSAkKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzd2lwZXIubW91c2VFbnRlcmVkICYmICF0YXJnZXRbMF0uY29udGFpbnMoZS50YXJnZXQpICYmICFwYXJhbXMucmVsZWFzZU9uRWRnZXMpIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50OyAvLyBqcXVlcnkgZml4XG5cbiAgICAgICAgbGV0IGRlbHRhID0gMDtcbiAgICAgICAgY29uc3QgcnRsRmFjdG9yID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IC0xIDogMTtcbiAgICAgICAgY29uc3QgZGF0YSA9IG5vcm1hbGl6ZShlKTtcblxuICAgICAgICBpZiAocGFyYW1zLmZvcmNlVG9BeGlzKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxYKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxZKSkgZGVsdGEgPSAtZGF0YS5waXhlbFggKiBydGxGYWN0b3I7ZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxZKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxYKSkgZGVsdGEgPSAtZGF0YS5waXhlbFk7ZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YSA9IE1hdGguYWJzKGRhdGEucGl4ZWxYKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxZKSA/IC1kYXRhLnBpeGVsWCAqIHJ0bEZhY3RvciA6IC1kYXRhLnBpeGVsWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWx0YSA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChwYXJhbXMuaW52ZXJ0KSBkZWx0YSA9IC1kZWx0YTsgLy8gR2V0IHRoZSBzY3JvbGwgcG9zaXRpb25zXG5cbiAgICAgICAgbGV0IHBvc2l0aW9ucyA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKSArIGRlbHRhICogcGFyYW1zLnNlbnNpdGl2aXR5O1xuICAgICAgICBpZiAocG9zaXRpb25zID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkgcG9zaXRpb25zID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICBpZiAocG9zaXRpb25zIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkgcG9zaXRpb25zID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpOyAvLyBXaGVuIGxvb3AgaXMgdHJ1ZTpcbiAgICAgICAgLy8gICAgIHRoZSBkaXNhYmxlUGFyZW50U3dpcGVyIHdpbGwgYmUgdHJ1ZS5cbiAgICAgICAgLy8gV2hlbiBsb29wIGlzIGZhbHNlOlxuICAgICAgICAvLyAgICAgaWYgdGhlIHNjcm9sbCBwb3NpdGlvbnMgaXMgbm90IG9uIGVkZ2UsXG4gICAgICAgIC8vICAgICB0aGVuIHRoZSBkaXNhYmxlUGFyZW50U3dpcGVyIHdpbGwgYmUgdHJ1ZS5cbiAgICAgICAgLy8gICAgIGlmIHRoZSBzY3JvbGwgb24gZWRnZSBwb3NpdGlvbnMsXG4gICAgICAgIC8vICAgICB0aGVuIHRoZSBkaXNhYmxlUGFyZW50U3dpcGVyIHdpbGwgYmUgZmFsc2UuXG5cbiAgICAgICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IHN3aXBlci5wYXJhbXMubG9vcCA/IHRydWUgOiAhKHBvc2l0aW9ucyA9PT0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIHx8IHBvc2l0aW9ucyA9PT0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKTtcbiAgICAgICAgaWYgKGRpc2FibGVQYXJlbnRTd2lwZXIgJiYgc3dpcGVyLnBhcmFtcy5uZXN0ZWQpIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmZyZWVNb2RlIHx8ICFzd2lwZXIucGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQpIHtcbiAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgbmV3IGV2ZW50IGluIGEgdmFyaWFibGUgd2hpY2ggc3RvcmVzIHRoZSByZWxldmFudCBkYXRhXG4gICAgICAgICAgY29uc3QgbmV3RXZlbnQgPSB7XG4gICAgICAgICAgICB0aW1lOiBub3coKSxcbiAgICAgICAgICAgIGRlbHRhOiBNYXRoLmFicyhkZWx0YSksXG4gICAgICAgICAgICBkaXJlY3Rpb246IE1hdGguc2lnbihkZWx0YSksXG4gICAgICAgICAgICByYXc6IGV2ZW50XG4gICAgICAgICAgfTsgLy8gS2VlcCB0aGUgbW9zdCByZWNlbnQgZXZlbnRzXG5cbiAgICAgICAgICBpZiAocmVjZW50V2hlZWxFdmVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnNoaWZ0KCk7IC8vIG9ubHkgc3RvcmUgdGhlIGxhc3QgTiBldmVudHNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcmV2RXZlbnQgPSByZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPyByZWNlbnRXaGVlbEV2ZW50c1tyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5wdXNoKG5ld0V2ZW50KTsgLy8gSWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHByZXZpb3VzIHJlY29yZGVkIGV2ZW50OlxuICAgICAgICAgIC8vICAgSWYgZGlyZWN0aW9uIGhhcyBjaGFuZ2VkIG9yXG4gICAgICAgICAgLy8gICBpZiB0aGUgc2Nyb2xsIGlzIHF1aWNrZXIgdGhhbiB0aGUgcHJldmlvdXMgb25lOlxuICAgICAgICAgIC8vICAgICBBbmltYXRlIHRoZSBzbGlkZXIuXG4gICAgICAgICAgLy8gRWxzZSAodGhpcyBpcyB0aGUgZmlyc3QgdGltZSB0aGUgd2hlZWwgaXMgbW92ZWQpOlxuICAgICAgICAgIC8vICAgICBBbmltYXRlIHRoZSBzbGlkZXIuXG5cbiAgICAgICAgICBpZiAocHJldkV2ZW50KSB7XG4gICAgICAgICAgICBpZiAobmV3RXZlbnQuZGlyZWN0aW9uICE9PSBwcmV2RXZlbnQuZGlyZWN0aW9uIHx8IG5ld0V2ZW50LmRlbHRhID4gcHJldkV2ZW50LmRlbHRhIHx8IG5ld0V2ZW50LnRpbWUgPiBwcmV2RXZlbnQudGltZSArIDE1MCkge1xuICAgICAgICAgICAgICBhbmltYXRlU2xpZGVyKG5ld0V2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5pbWF0ZVNsaWRlcihuZXdFdmVudCk7XG4gICAgICAgICAgfSAvLyBJZiBpdCdzIHRpbWUgdG8gcmVsZWFzZSB0aGUgc2Nyb2xsOlxuICAgICAgICAgIC8vICAgUmV0dXJuIG5vdyBzbyB5b3UgZG9uJ3QgaGl0IHRoZSBwcmV2ZW50RGVmYXVsdC5cblxuXG4gICAgICAgICAgaWYgKHJlbGVhc2VTY3JvbGwobmV3RXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRnJlZW1vZGUgb3Igc2Nyb2xsQ29udGFpbmVyOlxuICAgICAgICAgIC8vIElmIHdlIHJlY2VudGx5IHNuYXBwZWQgYWZ0ZXIgYSBtb21lbnR1bSBzY3JvbGwsIHRoZW4gaWdub3JlIHdoZWVsIGV2ZW50c1xuICAgICAgICAgIC8vIHRvIGdpdmUgdGltZSBmb3IgdGhlIGRlY2VsZXJhdGlvbiB0byBmaW5pc2guIFN0b3AgaWdub3JpbmcgYWZ0ZXIgNTAwIG1zZWNzXG4gICAgICAgICAgLy8gb3IgaWYgaXQncyBhIG5ldyBzY3JvbGwgKGxhcmdlciBkZWx0YSBvciBpbnZlcnNlIHNpZ24gYXMgbGFzdCBldmVudCBiZWZvcmVcbiAgICAgICAgICAvLyBhbiBlbmQtb2YtbW9tZW50dW0gc25hcCkuXG4gICAgICAgICAgY29uc3QgbmV3RXZlbnQgPSB7XG4gICAgICAgICAgICB0aW1lOiBub3coKSxcbiAgICAgICAgICAgIGRlbHRhOiBNYXRoLmFicyhkZWx0YSksXG4gICAgICAgICAgICBkaXJlY3Rpb246IE1hdGguc2lnbihkZWx0YSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IGlnbm9yZVdoZWVsRXZlbnRzID0gbGFzdEV2ZW50QmVmb3JlU25hcCAmJiBuZXdFdmVudC50aW1lIDwgbGFzdEV2ZW50QmVmb3JlU25hcC50aW1lICsgNTAwICYmIG5ld0V2ZW50LmRlbHRhIDw9IGxhc3RFdmVudEJlZm9yZVNuYXAuZGVsdGEgJiYgbmV3RXZlbnQuZGlyZWN0aW9uID09PSBsYXN0RXZlbnRCZWZvcmVTbmFwLmRpcmVjdGlvbjtcblxuICAgICAgICAgIGlmICghaWdub3JlV2hlZWxFdmVudHMpIHtcbiAgICAgICAgICAgIGxhc3RFdmVudEJlZm9yZVNuYXAgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpICsgZGVsdGEgKiBwYXJhbXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgICAgICBjb25zdCB3YXNCZWdpbm5pbmcgPSBzd2lwZXIuaXNCZWdpbm5pbmc7XG4gICAgICAgICAgICBjb25zdCB3YXNFbmQgPSBzd2lwZXIuaXNFbmQ7XG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSBwb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHBvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHBvc2l0aW9uKTtcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuXG4gICAgICAgICAgICBpZiAoIXdhc0JlZ2lubmluZyAmJiBzd2lwZXIuaXNCZWdpbm5pbmcgfHwgIXdhc0VuZCAmJiBzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUuc3RpY2t5KSB7XG4gICAgICAgICAgICAgIC8vIFdoZW4gd2hlZWwgc2Nyb2xsaW5nIHN0YXJ0cyB3aXRoIHN0aWNreSAoYWthIHNuYXApIGVuYWJsZWQsIHRoZW4gZGV0ZWN0XG4gICAgICAgICAgICAgIC8vIHRoZSBlbmQgb2YgYSBtb21lbnR1bSBzY3JvbGwgYnkgc3RvcmluZyByZWNlbnQgKE49MTU/KSB3aGVlbCBldmVudHMuXG4gICAgICAgICAgICAgIC8vIDEuIGRvIGFsbCBOIGV2ZW50cyBoYXZlIGRlY3JlYXNpbmcgb3Igc2FtZSAoYWJzb2x1dGUgdmFsdWUpIGRlbHRhP1xuICAgICAgICAgICAgICAvLyAyLiBkaWQgYWxsIE4gZXZlbnRzIGFycml2ZSBpbiB0aGUgbGFzdCBNIChNPTUwMD8pIG1zZWNzP1xuICAgICAgICAgICAgICAvLyAzLiBkb2VzIHRoZSBlYXJsaWVzdCBldmVudCBoYXZlIGFuIChhYnNvbHV0ZSB2YWx1ZSkgZGVsdGEgdGhhdCdzXG4gICAgICAgICAgICAgIC8vICAgIGF0IGxlYXN0IFAgKFA9MT8pIGxhcmdlciB0aGFuIHRoZSBtb3N0IHJlY2VudCBldmVudCdzIGRlbHRhP1xuICAgICAgICAgICAgICAvLyA0LiBkb2VzIHRoZSBsYXRlc3QgZXZlbnQgaGF2ZSBhIGRlbHRhIHRoYXQncyBzbWFsbGVyIHRoYW4gUSAoUT02PykgcGl4ZWxzP1xuICAgICAgICAgICAgICAvLyBJZiAxLTQgYXJlIFwieWVzXCIgdGhlbiB3ZSdyZSBuZWFyIHRoZSBlbmQgb2YgYSBtb21lbnR1bSBzY3JvbGwgZGVjZWxlcmF0aW9uLlxuICAgICAgICAgICAgICAvLyBTbmFwIGltbWVkaWF0ZWx5IGFuZCBpZ25vcmUgcmVtYWluaW5nIHdoZWVsIGV2ZW50cyBpbiB0aGlzIHNjcm9sbC5cbiAgICAgICAgICAgICAgLy8gU2VlIGNvbW1lbnQgYWJvdmUgZm9yIFwicmVtYWluaW5nIHdoZWVsIGV2ZW50cyBpbiB0aGlzIHNjcm9sbFwiIGRldGVybWluYXRpb24uXG4gICAgICAgICAgICAgIC8vIElmIDEtNCBhcmVuJ3Qgc2F0aXNmaWVkLCB0aGVuIHdhaXQgdG8gc25hcCB1bnRpbCA1MDBtcyBhZnRlciB0aGUgbGFzdCBldmVudC5cbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICB0aW1lb3V0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgIGlmIChyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPj0gMTUpIHtcbiAgICAgICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zaGlmdCgpOyAvLyBvbmx5IHN0b3JlIHRoZSBsYXN0IE4gZXZlbnRzXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBwcmV2RXZlbnQgPSByZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPyByZWNlbnRXaGVlbEV2ZW50c1tyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgY29uc3QgZmlyc3RFdmVudCA9IHJlY2VudFdoZWVsRXZlbnRzWzBdO1xuICAgICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5wdXNoKG5ld0V2ZW50KTtcblxuICAgICAgICAgICAgICBpZiAocHJldkV2ZW50ICYmIChuZXdFdmVudC5kZWx0YSA+IHByZXZFdmVudC5kZWx0YSB8fCBuZXdFdmVudC5kaXJlY3Rpb24gIT09IHByZXZFdmVudC5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5jcmVhc2luZyBvciByZXZlcnNlLXNpZ24gZGVsdGEgbWVhbnMgdGhlIHVzZXIgc3RhcnRlZCBzY3JvbGxpbmcgYWdhaW4uIENsZWFyIHRoZSB3aGVlbCBldmVudCBsb2cuXG4gICAgICAgICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc3BsaWNlKDApO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA+PSAxNSAmJiBuZXdFdmVudC50aW1lIC0gZmlyc3RFdmVudC50aW1lIDwgNTAwICYmIGZpcnN0RXZlbnQuZGVsdGEgLSBuZXdFdmVudC5kZWx0YSA+PSAxICYmIG5ld0V2ZW50LmRlbHRhIDw9IDYpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSdyZSBhdCB0aGUgZW5kIG9mIHRoZSBkZWNlbGVyYXRpb24gb2YgYSBtb21lbnR1bSBzY3JvbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAgICAgICAgICAgICAgIC8vIHRvIHdhaXQgZm9yIG1vcmUgZXZlbnRzLiBTbmFwIEFTQVAgb24gdGhlIG5leHQgdGljay5cbiAgICAgICAgICAgICAgICAvLyBBbHNvLCBiZWNhdXNlIHRoZXJlJ3Mgc29tZSByZW1haW5pbmcgbW9tZW50dW0gd2UnbGwgYmlhcyB0aGUgc25hcCBpbiB0aGVcbiAgICAgICAgICAgICAgICAvLyBkaXJlY3Rpb24gb2YgdGhlIG9uZ29pbmcgc2Nyb2xsIGJlY2F1c2UgaXQncyBiZXR0ZXIgVVggZm9yIHRoZSBzY3JvbGwgdG8gc25hcFxuICAgICAgICAgICAgICAgIC8vIGluIHRoZSBzYW1lIGRpcmVjdGlvbiBhcyB0aGUgc2Nyb2xsIGluc3RlYWQgb2YgcmV2ZXJzaW5nIHRvIHNuYXAuICBUaGVyZWZvcmUsXG4gICAgICAgICAgICAgICAgLy8gaWYgaXQncyBhbHJlYWR5IHNjcm9sbGVkIG1vcmUgdGhhbiAyMCUgaW4gdGhlIGN1cnJlbnQgZGlyZWN0aW9uLCBrZWVwIGdvaW5nLlxuICAgICAgICAgICAgICAgIGNvbnN0IHNuYXBUb1RocmVzaG9sZCA9IGRlbHRhID4gMCA/IDAuOCA6IDAuMjtcbiAgICAgICAgICAgICAgICBsYXN0RXZlbnRCZWZvcmVTbmFwID0gbmV3RXZlbnQ7XG4gICAgICAgICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc3BsaWNlKDApO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUb0Nsb3Nlc3Qoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdW5kZWZpbmVkLCBzbmFwVG9UaHJlc2hvbGQpO1xuICAgICAgICAgICAgICAgIH0sIDApOyAvLyBubyBkZWxheTsgbW92ZSBvbiBuZXh0IHRpY2tcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGdldCBoZXJlLCB0aGVuIHdlIGhhdmVuJ3QgZGV0ZWN0ZWQgdGhlIGVuZCBvZiBhIG1vbWVudHVtIHNjcm9sbCwgc29cbiAgICAgICAgICAgICAgICAvLyB3ZSdsbCBjb25zaWRlciBhIHNjcm9sbCBcImNvbXBsZXRlXCIgd2hlbiB0aGVyZSBoYXZlbid0IGJlZW4gYW55IHdoZWVsIGV2ZW50c1xuICAgICAgICAgICAgICAgIC8vIGZvciA1MDBtcy5cbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc25hcFRvVGhyZXNob2xkID0gMC41O1xuICAgICAgICAgICAgICAgICAgbGFzdEV2ZW50QmVmb3JlU25hcCA9IG5ld0V2ZW50O1xuICAgICAgICAgICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc3BsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHVuZGVmaW5lZCwgc25hcFRvVGhyZXNob2xkKTtcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vIEVtaXQgZXZlbnRcblxuXG4gICAgICAgICAgICBpZiAoIWlnbm9yZVdoZWVsRXZlbnRzKSBlbWl0KCdzY3JvbGwnLCBlKTsgLy8gU3RvcCBhdXRvcGxheVxuXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheSAmJiBzd2lwZXIucGFyYW1zLmF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb24pIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7IC8vIFJldHVybiBwYWdlIHNjcm9sbCBvbiBlZGdlIHBvc2l0aW9uc1xuXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IHN3aXBlci5taW5UcmFuc2xhdGUoKSB8fCBwb3NpdGlvbiA9PT0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO2Vsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGV2ZW50cyhtZXRob2QpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHN3aXBlci4kZWw7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZXQgIT09ICdjb250YWluZXInKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gJChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFttZXRob2RdKCdtb3VzZWVudGVyJywgaGFuZGxlTW91c2VFbnRlcik7XG4gICAgICAgIHRhcmdldFttZXRob2RdKCdtb3VzZWxlYXZlJywgaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgICAgIHRhcmdldFttZXRob2RdKCd3aGVlbCcsIGhhbmRsZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBoYW5kbGUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgZXZlbnRzKCdvbicpO1xuICAgICAgICBzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgZXZlbnRzKCdvZmYnKTtcbiAgICAgICAgc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgZGlzYWJsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5lbmFibGVkKSBlbmFibGUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBlbmFibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkKSBkaXNhYmxlKCk7XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLm1vdXNld2hlZWwsIHtcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBkaXNhYmxlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgb3JpZ2luYWxQYXJhbXMsIHBhcmFtcywgY2hlY2tQcm9wcykge1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jcmVhdGVFbGVtZW50cykge1xuICAgICAgICBPYmplY3Qua2V5cyhjaGVja1Byb3BzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKCFwYXJhbXNba2V5XSAmJiBwYXJhbXMuYXV0byA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBzd2lwZXIuJGVsLmNoaWxkcmVuKGAuJHtjaGVja1Byb3BzW2tleV19YClbMF07XG5cbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2hlY2tQcm9wc1trZXldO1xuICAgICAgICAgICAgICBzd2lwZXIuJGVsLmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyYW1zW2tleV0gPSBlbGVtZW50O1xuICAgICAgICAgICAgb3JpZ2luYWxQYXJhbXNba2V5XSA9IGVsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBOYXZpZ2F0aW9uKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvbixcbiAgICAgICAgZW1pdFxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgbmV4dEVsOiBudWxsLFxuICAgICAgICAgIHByZXZFbDogbnVsbCxcbiAgICAgICAgICBoaWRlT25DbGljazogZmFsc2UsXG4gICAgICAgICAgZGlzYWJsZWRDbGFzczogJ3N3aXBlci1idXR0b24tZGlzYWJsZWQnLFxuICAgICAgICAgIGhpZGRlbkNsYXNzOiAnc3dpcGVyLWJ1dHRvbi1oaWRkZW4nLFxuICAgICAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1idXR0b24tbG9jaycsXG4gICAgICAgICAgbmF2aWdhdGlvbkRpc2FibGVkQ2xhc3M6ICdzd2lwZXItbmF2aWdhdGlvbi1kaXNhYmxlZCdcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzd2lwZXIubmF2aWdhdGlvbiA9IHtcbiAgICAgICAgbmV4dEVsOiBudWxsLFxuICAgICAgICAkbmV4dEVsOiBudWxsLFxuICAgICAgICBwcmV2RWw6IG51bGwsXG4gICAgICAgICRwcmV2RWw6IG51bGxcbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIGdldEVsKGVsKSB7XG4gICAgICAgIGxldCAkZWw7XG5cbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgJGVsID0gJChlbCk7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnICYmICRlbC5sZW5ndGggPiAxICYmIHN3aXBlci4kZWwuZmluZChlbCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAkZWwgPSBzd2lwZXIuJGVsLmZpbmQoZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAkZWw7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRvZ2dsZUVsKCRlbCwgZGlzYWJsZWQpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uO1xuXG4gICAgICAgIGlmICgkZWwgJiYgJGVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkZWxbZGlzYWJsZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10ocGFyYW1zLmRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgIGlmICgkZWxbMF0gJiYgJGVsWzBdLnRhZ05hbWUgPT09ICdCVVRUT04nKSAkZWxbMF0uZGlzYWJsZWQgPSBkaXNhYmxlZDtcblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgICAgICRlbFtzd2lwZXIuaXNMb2NrZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10ocGFyYW1zLmxvY2tDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgLy8gVXBkYXRlIE5hdmlnYXRpb24gQnV0dG9uc1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkbmV4dEVsLFxuICAgICAgICAgICRwcmV2RWxcbiAgICAgICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgICAgICB0b2dnbGVFbCgkcHJldkVsLCBzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKTtcbiAgICAgICAgdG9nZ2xlRWwoJG5leHRFbCwgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLnJld2luZCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uUHJldkNsaWNrKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgICAgZW1pdCgnbmF2aWdhdGlvblByZXYnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25OZXh0Q2xpY2soZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICBlbWl0KCduYXZpZ2F0aW9uTmV4dCcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb247XG4gICAgICAgIHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbiA9IGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQoc3dpcGVyLCBzd2lwZXIub3JpZ2luYWxQYXJhbXMubmF2aWdhdGlvbiwgc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLCB7XG4gICAgICAgICAgbmV4dEVsOiAnc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgICAgICBwcmV2RWw6ICdzd2lwZXItYnV0dG9uLXByZXYnXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIShwYXJhbXMubmV4dEVsIHx8IHBhcmFtcy5wcmV2RWwpKSByZXR1cm47XG4gICAgICAgIGNvbnN0ICRuZXh0RWwgPSBnZXRFbChwYXJhbXMubmV4dEVsKTtcbiAgICAgICAgY29uc3QgJHByZXZFbCA9IGdldEVsKHBhcmFtcy5wcmV2RWwpO1xuXG4gICAgICAgIGlmICgkbmV4dEVsICYmICRuZXh0RWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICRuZXh0RWwub24oJ2NsaWNrJywgb25OZXh0Q2xpY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRwcmV2RWwgJiYgJHByZXZFbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJHByZXZFbC5vbignY2xpY2snLCBvblByZXZDbGljayk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKHN3aXBlci5uYXZpZ2F0aW9uLCB7XG4gICAgICAgICAgJG5leHRFbCxcbiAgICAgICAgICBuZXh0RWw6ICRuZXh0RWwgJiYgJG5leHRFbFswXSxcbiAgICAgICAgICAkcHJldkVsLFxuICAgICAgICAgIHByZXZFbDogJHByZXZFbCAmJiAkcHJldkVsWzBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgICBpZiAoJG5leHRFbCkgJG5leHRFbC5hZGRDbGFzcyhwYXJhbXMubG9ja0NsYXNzKTtcbiAgICAgICAgICBpZiAoJHByZXZFbCkgJHByZXZFbC5hZGRDbGFzcyhwYXJhbXMubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJG5leHRFbCxcbiAgICAgICAgICAkcHJldkVsXG4gICAgICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcblxuICAgICAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCkge1xuICAgICAgICAgICRuZXh0RWwub2ZmKCdjbGljaycsIG9uTmV4dENsaWNrKTtcbiAgICAgICAgICAkbmV4dEVsLnJlbW92ZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5kaXNhYmxlZENsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoKSB7XG4gICAgICAgICAgJHByZXZFbC5vZmYoJ2NsaWNrJywgb25QcmV2Q2xpY2spO1xuICAgICAgICAgICRwcmV2RWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uKCdpbml0JywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbigndG9FZGdlIGZyb21FZGdlIGxvY2sgdW5sb2NrJywgKCkgPT4ge1xuICAgICAgICB1cGRhdGUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGRlc3Ryb3koKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2VuYWJsZSBkaXNhYmxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJG5leHRFbCxcbiAgICAgICAgICAkcHJldkVsXG4gICAgICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcblxuICAgICAgICBpZiAoJG5leHRFbCkge1xuICAgICAgICAgICRuZXh0RWxbc3dpcGVyLmVuYWJsZWQgPyAncmVtb3ZlQ2xhc3MnIDogJ2FkZENsYXNzJ10oc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmxvY2tDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHByZXZFbCkge1xuICAgICAgICAgICRwcmV2RWxbc3dpcGVyLmVuYWJsZWQgPyAncmVtb3ZlQ2xhc3MnIDogJ2FkZENsYXNzJ10oc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmxvY2tDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2NsaWNrJywgKF9zLCBlKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkbmV4dEVsLFxuICAgICAgICAgICRwcmV2RWxcbiAgICAgICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGUudGFyZ2V0O1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZU9uQ2xpY2sgJiYgISQodGFyZ2V0RWwpLmlzKCRwcmV2RWwpICYmICEkKHRhcmdldEVsKS5pcygkbmV4dEVsKSkge1xuICAgICAgICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSAmJiAoc3dpcGVyLnBhZ2luYXRpb24uZWwgPT09IHRhcmdldEVsIHx8IHN3aXBlci5wYWdpbmF0aW9uLmVsLmNvbnRhaW5zKHRhcmdldEVsKSkpIHJldHVybjtcbiAgICAgICAgICBsZXQgaXNIaWRkZW47XG5cbiAgICAgICAgICBpZiAoJG5leHRFbCkge1xuICAgICAgICAgICAgaXNIaWRkZW4gPSAkbmV4dEVsLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkcHJldkVsKSB7XG4gICAgICAgICAgICBpc0hpZGRlbiA9ICRwcmV2RWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNIaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGVtaXQoJ25hdmlnYXRpb25TaG93Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVtaXQoJ25hdmlnYXRpb25IaWRlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCRuZXh0RWwpIHtcbiAgICAgICAgICAgICRuZXh0RWwudG9nZ2xlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJHByZXZFbCkge1xuICAgICAgICAgICAgJHByZXZFbC50b2dnbGVDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGVuYWJsZSA9ICgpID0+IHtcbiAgICAgICAgc3dpcGVyLiRlbC5yZW1vdmVDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubmF2aWdhdGlvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICBpbml0KCk7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZGlzYWJsZSA9ICgpID0+IHtcbiAgICAgICAgc3dpcGVyLiRlbC5hZGRDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubmF2aWdhdGlvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICBkZXN0cm95KCk7XG4gICAgICB9O1xuXG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlci5uYXZpZ2F0aW9uLCB7XG4gICAgICAgIGVuYWJsZSxcbiAgICAgICAgZGlzYWJsZSxcbiAgICAgICAgdXBkYXRlLFxuICAgICAgICBpbml0LFxuICAgICAgICBkZXN0cm95XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGFzc2VzVG9TZWxlY3RvcihjbGFzc2VzKSB7XG4gICAgICBpZiAoY2xhc3NlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNsYXNzZXMgPSAnJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGAuJHtjbGFzc2VzLnRyaW0oKS5yZXBsYWNlKC8oW1xcLjohXFwvXSkvZywgJ1xcXFwkMScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgLnJlcGxhY2UoLyAvZywgJy4nKX1gO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFBhZ2luYXRpb24oX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IHBmeCA9ICdzd2lwZXItcGFnaW5hdGlvbic7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgZWw6IG51bGwsXG4gICAgICAgICAgYnVsbGV0RWxlbWVudDogJ3NwYW4nLFxuICAgICAgICAgIGNsaWNrYWJsZTogZmFsc2UsXG4gICAgICAgICAgaGlkZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgICAgIHJlbmRlckJ1bGxldDogbnVsbCxcbiAgICAgICAgICByZW5kZXJQcm9ncmVzc2JhcjogbnVsbCxcbiAgICAgICAgICByZW5kZXJGcmFjdGlvbjogbnVsbCxcbiAgICAgICAgICByZW5kZXJDdXN0b206IG51bGwsXG4gICAgICAgICAgcHJvZ3Jlc3NiYXJPcHBvc2l0ZTogZmFsc2UsXG4gICAgICAgICAgdHlwZTogJ2J1bGxldHMnLFxuICAgICAgICAgIC8vICdidWxsZXRzJyBvciAncHJvZ3Jlc3NiYXInIG9yICdmcmFjdGlvbicgb3IgJ2N1c3RvbSdcbiAgICAgICAgICBkeW5hbWljQnVsbGV0czogZmFsc2UsXG4gICAgICAgICAgZHluYW1pY01haW5CdWxsZXRzOiAxLFxuICAgICAgICAgIGZvcm1hdEZyYWN0aW9uQ3VycmVudDogbnVtYmVyID0+IG51bWJlcixcbiAgICAgICAgICBmb3JtYXRGcmFjdGlvblRvdGFsOiBudW1iZXIgPT4gbnVtYmVyLFxuICAgICAgICAgIGJ1bGxldENsYXNzOiBgJHtwZnh9LWJ1bGxldGAsXG4gICAgICAgICAgYnVsbGV0QWN0aXZlQ2xhc3M6IGAke3BmeH0tYnVsbGV0LWFjdGl2ZWAsXG4gICAgICAgICAgbW9kaWZpZXJDbGFzczogYCR7cGZ4fS1gLFxuICAgICAgICAgIGN1cnJlbnRDbGFzczogYCR7cGZ4fS1jdXJyZW50YCxcbiAgICAgICAgICB0b3RhbENsYXNzOiBgJHtwZnh9LXRvdGFsYCxcbiAgICAgICAgICBoaWRkZW5DbGFzczogYCR7cGZ4fS1oaWRkZW5gLFxuICAgICAgICAgIHByb2dyZXNzYmFyRmlsbENsYXNzOiBgJHtwZnh9LXByb2dyZXNzYmFyLWZpbGxgLFxuICAgICAgICAgIHByb2dyZXNzYmFyT3Bwb3NpdGVDbGFzczogYCR7cGZ4fS1wcm9ncmVzc2Jhci1vcHBvc2l0ZWAsXG4gICAgICAgICAgY2xpY2thYmxlQ2xhc3M6IGAke3BmeH0tY2xpY2thYmxlYCxcbiAgICAgICAgICBsb2NrQ2xhc3M6IGAke3BmeH0tbG9ja2AsXG4gICAgICAgICAgaG9yaXpvbnRhbENsYXNzOiBgJHtwZnh9LWhvcml6b250YWxgLFxuICAgICAgICAgIHZlcnRpY2FsQ2xhc3M6IGAke3BmeH0tdmVydGljYWxgLFxuICAgICAgICAgIHBhZ2luYXRpb25EaXNhYmxlZENsYXNzOiBgJHtwZnh9LWRpc2FibGVkYFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci5wYWdpbmF0aW9uID0ge1xuICAgICAgICBlbDogbnVsbCxcbiAgICAgICAgJGVsOiBudWxsLFxuICAgICAgICBidWxsZXRzOiBbXVxuICAgICAgfTtcbiAgICAgIGxldCBidWxsZXRTaXplO1xuICAgICAgbGV0IGR5bmFtaWNCdWxsZXRJbmRleCA9IDA7XG5cbiAgICAgIGZ1bmN0aW9uIGlzUGFnaW5hdGlvbkRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gIXN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLiRlbCB8fCBzd2lwZXIucGFnaW5hdGlvbi4kZWwubGVuZ3RoID09PSAwO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRTaWRlQnVsbGV0cygkYnVsbGV0RWwsIHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBidWxsZXRBY3RpdmVDbGFzc1xuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgICAgICAkYnVsbGV0RWxbcG9zaXRpb25dKCkuYWRkQ2xhc3MoYCR7YnVsbGV0QWN0aXZlQ2xhc3N9LSR7cG9zaXRpb259YClbcG9zaXRpb25dKCkuYWRkQ2xhc3MoYCR7YnVsbGV0QWN0aXZlQ2xhc3N9LSR7cG9zaXRpb259LSR7cG9zaXRpb259YCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgLy8gUmVuZGVyIHx8IFVwZGF0ZSBQYWdpbmF0aW9uIGJ1bGxldHMvaXRlbXNcbiAgICAgICAgY29uc3QgcnRsID0gc3dpcGVyLnJ0bDtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgICAgICBpZiAoaXNQYWdpbmF0aW9uRGlzYWJsZWQoKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzbGlkZXNMZW5ndGggPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgJGVsID0gc3dpcGVyLnBhZ2luYXRpb24uJGVsOyAvLyBDdXJyZW50L1RvdGFsXG5cbiAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gc3dpcGVyLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKChzbGlkZXNMZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzICogMikgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIGN1cnJlbnQgPSBNYXRoLmNlaWwoKHN3aXBlci5hY3RpdmVJbmRleCAtIHN3aXBlci5sb29wZWRTbGlkZXMpIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG5cbiAgICAgICAgICBpZiAoY3VycmVudCA+IHNsaWRlc0xlbmd0aCAtIDEgLSBzd2lwZXIubG9vcGVkU2xpZGVzICogMikge1xuICAgICAgICAgICAgY3VycmVudCAtPSBzbGlkZXNMZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzICogMjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudCA+IHRvdGFsIC0gMSkgY3VycmVudCAtPSB0b3RhbDtcbiAgICAgICAgICBpZiAoY3VycmVudCA8IDAgJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSAhPT0gJ2J1bGxldHMnKSBjdXJyZW50ID0gdG90YWwgKyBjdXJyZW50O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGN1cnJlbnQgPSBzd2lwZXIuc25hcEluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1cnJlbnQgPSBzd2lwZXIuYWN0aXZlSW5kZXggfHwgMDtcbiAgICAgICAgfSAvLyBUeXBlc1xuXG5cbiAgICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBidWxsZXRzID0gc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cztcbiAgICAgICAgICBsZXQgZmlyc3RJbmRleDtcbiAgICAgICAgICBsZXQgbGFzdEluZGV4O1xuICAgICAgICAgIGxldCBtaWRJbmRleDtcblxuICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICAgIGJ1bGxldFNpemUgPSBidWxsZXRzLmVxKDApW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdvdXRlcldpZHRoJyA6ICdvdXRlckhlaWdodCddKHRydWUpO1xuICAgICAgICAgICAgJGVsLmNzcyhzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnd2lkdGgnIDogJ2hlaWdodCcsIGAke2J1bGxldFNpemUgKiAocGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyArIDQpfXB4YCk7XG5cbiAgICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzID4gMSAmJiBzd2lwZXIucHJldmlvdXNJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGR5bmFtaWNCdWxsZXRJbmRleCArPSBjdXJyZW50IC0gKHN3aXBlci5wcmV2aW91c0luZGV4IC0gc3dpcGVyLmxvb3BlZFNsaWRlcyB8fCAwKTtcblxuICAgICAgICAgICAgICBpZiAoZHluYW1pY0J1bGxldEluZGV4ID4gcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyAtIDEpIHtcbiAgICAgICAgICAgICAgICBkeW5hbWljQnVsbGV0SW5kZXggPSBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIC0gMTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkeW5hbWljQnVsbGV0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgZHluYW1pY0J1bGxldEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaXJzdEluZGV4ID0gTWF0aC5tYXgoY3VycmVudCAtIGR5bmFtaWNCdWxsZXRJbmRleCwgMCk7XG4gICAgICAgICAgICBsYXN0SW5kZXggPSBmaXJzdEluZGV4ICsgKE1hdGgubWluKGJ1bGxldHMubGVuZ3RoLCBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzKSAtIDEpO1xuICAgICAgICAgICAgbWlkSW5kZXggPSAobGFzdEluZGV4ICsgZmlyc3RJbmRleCkgLyAyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJ1bGxldHMucmVtb3ZlQ2xhc3MoWycnLCAnLW5leHQnLCAnLW5leHQtbmV4dCcsICctcHJldicsICctcHJldi1wcmV2JywgJy1tYWluJ10ubWFwKHN1ZmZpeCA9PiBgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9JHtzdWZmaXh9YCkuam9pbignICcpKTtcblxuICAgICAgICAgIGlmICgkZWwubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgYnVsbGV0cy5lYWNoKGJ1bGxldCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0ICRidWxsZXQgPSAkKGJ1bGxldCk7XG4gICAgICAgICAgICAgIGNvbnN0IGJ1bGxldEluZGV4ID0gJGJ1bGxldC5pbmRleCgpO1xuXG4gICAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gY3VycmVudCkge1xuICAgICAgICAgICAgICAgICRidWxsZXQuYWRkQ2xhc3MocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPj0gZmlyc3RJbmRleCAmJiBidWxsZXRJbmRleCA8PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICRidWxsZXQuYWRkQ2xhc3MoYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1tYWluYCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBmaXJzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICBzZXRTaWRlQnVsbGV0cygkYnVsbGV0LCAncHJldicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICBzZXRTaWRlQnVsbGV0cygkYnVsbGV0LCAnbmV4dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0ICRidWxsZXQgPSBidWxsZXRzLmVxKGN1cnJlbnQpO1xuICAgICAgICAgICAgY29uc3QgYnVsbGV0SW5kZXggPSAkYnVsbGV0LmluZGV4KCk7XG4gICAgICAgICAgICAkYnVsbGV0LmFkZENsYXNzKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgJGZpcnN0RGlzcGxheWVkQnVsbGV0ID0gYnVsbGV0cy5lcShmaXJzdEluZGV4KTtcbiAgICAgICAgICAgICAgY29uc3QgJGxhc3REaXNwbGF5ZWRCdWxsZXQgPSBidWxsZXRzLmVxKGxhc3RJbmRleCk7XG5cbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPD0gbGFzdEluZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBidWxsZXRzLmVxKGkpLmFkZENsYXNzKGAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30tbWFpbmApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA+PSBidWxsZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHM7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldHMuZXEoYnVsbGV0cy5sZW5ndGggLSBpKS5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW1haW5gKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgYnVsbGV0cy5lcShidWxsZXRzLmxlbmd0aCAtIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgLSAxKS5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LXByZXZgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgc2V0U2lkZUJ1bGxldHMoJGZpcnN0RGlzcGxheWVkQnVsbGV0LCAncHJldicpO1xuICAgICAgICAgICAgICAgICAgc2V0U2lkZUJ1bGxldHMoJGxhc3REaXNwbGF5ZWRCdWxsZXQsICduZXh0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFNpZGVCdWxsZXRzKCRmaXJzdERpc3BsYXllZEJ1bGxldCwgJ3ByZXYnKTtcbiAgICAgICAgICAgICAgICBzZXRTaWRlQnVsbGV0cygkbGFzdERpc3BsYXllZEJ1bGxldCwgJ25leHQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNCdWxsZXRzTGVuZ3RoID0gTWF0aC5taW4oYnVsbGV0cy5sZW5ndGgsIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgKyA0KTtcbiAgICAgICAgICAgIGNvbnN0IGJ1bGxldHNPZmZzZXQgPSAoYnVsbGV0U2l6ZSAqIGR5bmFtaWNCdWxsZXRzTGVuZ3RoIC0gYnVsbGV0U2l6ZSkgLyAyIC0gbWlkSW5kZXggKiBidWxsZXRTaXplO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0UHJvcCA9IHJ0bCA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgICAgICBidWxsZXRzLmNzcyhzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBvZmZzZXRQcm9wIDogJ3RvcCcsIGAke2J1bGxldHNPZmZzZXR9cHhgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgICAgICAkZWwuZmluZChjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMuY3VycmVudENsYXNzKSkudGV4dChwYXJhbXMuZm9ybWF0RnJhY3Rpb25DdXJyZW50KGN1cnJlbnQgKyAxKSk7XG4gICAgICAgICAgJGVsLmZpbmQoY2xhc3Nlc1RvU2VsZWN0b3IocGFyYW1zLnRvdGFsQ2xhc3MpKS50ZXh0KHBhcmFtcy5mb3JtYXRGcmFjdGlvblRvdGFsKHRvdGFsKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcbiAgICAgICAgICBsZXQgcHJvZ3Jlc3NiYXJEaXJlY3Rpb247XG5cbiAgICAgICAgICBpZiAocGFyYW1zLnByb2dyZXNzYmFyT3Bwb3NpdGUpIHtcbiAgICAgICAgICAgIHByb2dyZXNzYmFyRGlyZWN0aW9uID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNjYWxlID0gKGN1cnJlbnQgKyAxKSAvIHRvdGFsO1xuICAgICAgICAgIGxldCBzY2FsZVggPSAxO1xuICAgICAgICAgIGxldCBzY2FsZVkgPSAxO1xuXG4gICAgICAgICAgaWYgKHByb2dyZXNzYmFyRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHNjYWxlWCA9IHNjYWxlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY2FsZVkgPSBzY2FsZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkZWwuZmluZChjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3MpKS50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZVgoJHtzY2FsZVh9KSBzY2FsZVkoJHtzY2FsZVl9KWApLnRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdjdXN0b20nICYmIHBhcmFtcy5yZW5kZXJDdXN0b20pIHtcbiAgICAgICAgICAkZWwuaHRtbChwYXJhbXMucmVuZGVyQ3VzdG9tKHN3aXBlciwgY3VycmVudCArIDEsIHRvdGFsKSk7XG4gICAgICAgICAgZW1pdCgncGFnaW5hdGlvblJlbmRlcicsICRlbFswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW1pdCgncGFnaW5hdGlvblVwZGF0ZScsICRlbFswXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgICAgJGVsW3N3aXBlci5pc0xvY2tlZCA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShwYXJhbXMubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIC8vIFJlbmRlciBDb250YWluZXJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgICAgICBpZiAoaXNQYWdpbmF0aW9uRGlzYWJsZWQoKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzbGlkZXNMZW5ndGggPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgJGVsID0gc3dpcGVyLnBhZ2luYXRpb24uJGVsO1xuICAgICAgICBsZXQgcGFnaW5hdGlvbkhUTUwgPSAnJztcblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJykge1xuICAgICAgICAgIGxldCBudW1iZXJPZkJ1bGxldHMgPSBzd2lwZXIucGFyYW1zLmxvb3AgPyBNYXRoLmNlaWwoKHNsaWRlc0xlbmd0aCAtIHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHN3aXBlci5wYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmIG51bWJlck9mQnVsbGV0cyA+IHNsaWRlc0xlbmd0aCkge1xuICAgICAgICAgICAgbnVtYmVyT2ZCdWxsZXRzID0gc2xpZGVzTGVuZ3RoO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZCdWxsZXRzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMucmVuZGVyQnVsbGV0KSB7XG4gICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IHBhcmFtcy5yZW5kZXJCdWxsZXQuY2FsbChzd2lwZXIsIGksIHBhcmFtcy5idWxsZXRDbGFzcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBgPCR7cGFyYW1zLmJ1bGxldEVsZW1lbnR9IGNsYXNzPVwiJHtwYXJhbXMuYnVsbGV0Q2xhc3N9XCI+PC8ke3BhcmFtcy5idWxsZXRFbGVtZW50fT5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgICRlbC5odG1sKHBhZ2luYXRpb25IVE1MKTtcbiAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzID0gJGVsLmZpbmQoY2xhc3Nlc1RvU2VsZWN0b3IocGFyYW1zLmJ1bGxldENsYXNzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLnJlbmRlckZyYWN0aW9uKSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHBhcmFtcy5yZW5kZXJGcmFjdGlvbi5jYWxsKHN3aXBlciwgcGFyYW1zLmN1cnJlbnRDbGFzcywgcGFyYW1zLnRvdGFsQ2xhc3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7cGFyYW1zLmN1cnJlbnRDbGFzc31cIj48L3NwYW4+YCArICcgLyAnICsgYDxzcGFuIGNsYXNzPVwiJHtwYXJhbXMudG90YWxDbGFzc31cIj48L3NwYW4+YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkZWwuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLnJlbmRlclByb2dyZXNzYmFyKSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHBhcmFtcy5yZW5kZXJQcm9ncmVzc2Jhci5jYWxsKHN3aXBlciwgcGFyYW1zLnByb2dyZXNzYmFyRmlsbENsYXNzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke3BhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzc31cIj48L3NwYW4+YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkZWwuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgIT09ICdjdXN0b20nKSB7XG4gICAgICAgICAgZW1pdCgncGFnaW5hdGlvblJlbmRlcicsIHN3aXBlci5wYWdpbmF0aW9uLiRlbFswXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uID0gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIHN3aXBlci5vcmlnaW5hbFBhcmFtcy5wYWdpbmF0aW9uLCBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24sIHtcbiAgICAgICAgICBlbDogJ3N3aXBlci1wYWdpbmF0aW9uJ1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgICAgICBpZiAoIXBhcmFtcy5lbCkgcmV0dXJuO1xuICAgICAgICBsZXQgJGVsID0gJChwYXJhbXMuZWwpO1xuICAgICAgICBpZiAoJGVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmICRlbC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgJGVsID0gc3dpcGVyLiRlbC5maW5kKHBhcmFtcy5lbCk7IC8vIGNoZWNrIGlmIGl0IGJlbG9uZ3MgdG8gYW5vdGhlciBuZXN0ZWQgU3dpcGVyXG5cbiAgICAgICAgICBpZiAoJGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICRlbCA9ICRlbC5maWx0ZXIoZWwgPT4ge1xuICAgICAgICAgICAgICBpZiAoJChlbCkucGFyZW50cygnLnN3aXBlcicpWzBdICE9PSBzd2lwZXIuZWwpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKHBhcmFtcy5jbGlja2FibGVDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuYWRkQ2xhc3MocGFyYW1zLm1vZGlmaWVyQ2xhc3MgKyBwYXJhbXMudHlwZSk7XG4gICAgICAgICRlbC5hZGRDbGFzcyhzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBwYXJhbXMuaG9yaXpvbnRhbENsYXNzIDogcGFyYW1zLnZlcnRpY2FsQ2xhc3MpO1xuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnICYmIHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAgICRlbC5hZGRDbGFzcyhgJHtwYXJhbXMubW9kaWZpZXJDbGFzc30ke3BhcmFtcy50eXBlfS1keW5hbWljYCk7XG4gICAgICAgICAgZHluYW1pY0J1bGxldEluZGV4ID0gMDtcblxuICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIDwgMSkge1xuICAgICAgICAgICAgcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAncHJvZ3Jlc3NiYXInICYmIHBhcmFtcy5wcm9ncmVzc2Jhck9wcG9zaXRlKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKHBhcmFtcy5wcm9ncmVzc2Jhck9wcG9zaXRlQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy5jbGlja2FibGUpIHtcbiAgICAgICAgICAkZWwub24oJ2NsaWNrJywgY2xhc3Nlc1RvU2VsZWN0b3IocGFyYW1zLmJ1bGxldENsYXNzKSwgZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAkKHRoaXMpLmluZGV4KCkgKiBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkgaW5kZXggKz0gc3dpcGVyLmxvb3BlZFNsaWRlcztcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKGluZGV4KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLnBhZ2luYXRpb24sIHtcbiAgICAgICAgICAkZWwsXG4gICAgICAgICAgZWw6ICRlbFswXVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbjtcbiAgICAgICAgaWYgKGlzUGFnaW5hdGlvbkRpc2FibGVkKCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgJGVsID0gc3dpcGVyLnBhZ2luYXRpb24uJGVsO1xuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MocGFyYW1zLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKHBhcmFtcy5tb2RpZmllckNsYXNzICsgcGFyYW1zLnR5cGUpO1xuICAgICAgICAkZWwucmVtb3ZlQ2xhc3Moc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gcGFyYW1zLmhvcml6b250YWxDbGFzcyA6IHBhcmFtcy52ZXJ0aWNhbENsYXNzKTtcbiAgICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5yZW1vdmVDbGFzcykgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5yZW1vdmVDbGFzcyhwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgIGlmIChwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgJGVsLm9mZignY2xpY2snLCBjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMuYnVsbGV0Q2xhc3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIGRpc2FibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2FjdGl2ZUluZGV4Q2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN3aXBlci5zbmFwSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3NuYXBJbmRleENoYW5nZScsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc2xpZGVzTGVuZ3RoQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3NuYXBHcmlkTGVuZ3RoQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIHJlbmRlcigpO1xuICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICBkZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdlbmFibGUgZGlzYWJsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRlbFxuICAgICAgICB9ID0gc3dpcGVyLnBhZ2luYXRpb247XG5cbiAgICAgICAgaWYgKCRlbCkge1xuICAgICAgICAgICRlbFtzd2lwZXIuZW5hYmxlZCA/ICdyZW1vdmVDbGFzcycgOiAnYWRkQ2xhc3MnXShzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignbG9jayB1bmxvY2snLCAoKSA9PiB7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBvbignY2xpY2snLCAoX3MsIGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRlbFxuICAgICAgICB9ID0gc3dpcGVyLnBhZ2luYXRpb247XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5lbCAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZU9uQ2xpY2sgJiYgJGVsICYmICRlbC5sZW5ndGggPiAwICYmICEkKHRhcmdldEVsKS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIChzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwgJiYgdGFyZ2V0RWwgPT09IHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCB8fCBzd2lwZXIubmF2aWdhdGlvbi5wcmV2RWwgJiYgdGFyZ2V0RWwgPT09IHN3aXBlci5uYXZpZ2F0aW9uLnByZXZFbCkpIHJldHVybjtcbiAgICAgICAgICBjb25zdCBpc0hpZGRlbiA9ICRlbC5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZGVuQ2xhc3MpO1xuXG4gICAgICAgICAgaWYgKGlzSGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBlbWl0KCdwYWdpbmF0aW9uU2hvdycpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbWl0KCdwYWdpbmF0aW9uSGlkZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRlbC50b2dnbGVDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZW5hYmxlID0gKCkgPT4ge1xuICAgICAgICBzd2lwZXIuJGVsLnJlbW92ZUNsYXNzKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5wYWdpbmF0aW9uRGlzYWJsZWRDbGFzcyk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uLiRlbCkge1xuICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5yZW1vdmVDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ucGFnaW5hdGlvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpO1xuICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgdXBkYXRlKCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBkaXNhYmxlID0gKCkgPT4ge1xuICAgICAgICBzd2lwZXIuJGVsLmFkZENsYXNzKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5wYWdpbmF0aW9uRGlzYWJsZWRDbGFzcyk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uLiRlbCkge1xuICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5hZGRDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ucGFnaW5hdGlvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzdHJveSgpO1xuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIucGFnaW5hdGlvbiwge1xuICAgICAgICBlbmFibGUsXG4gICAgICAgIGRpc2FibGUsXG4gICAgICAgIHJlbmRlcixcbiAgICAgICAgdXBkYXRlLFxuICAgICAgICBpbml0LFxuICAgICAgICBkZXN0cm95XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBTY3JvbGxiYXIoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGxldCBpc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgIGxldCB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGxldCBkcmFnVGltZW91dCA9IG51bGw7XG4gICAgICBsZXQgZHJhZ1N0YXJ0UG9zO1xuICAgICAgbGV0IGRyYWdTaXplO1xuICAgICAgbGV0IHRyYWNrU2l6ZTtcbiAgICAgIGxldCBkaXZpZGVyO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgc2Nyb2xsYmFyOiB7XG4gICAgICAgICAgZWw6IG51bGwsXG4gICAgICAgICAgZHJhZ1NpemU6ICdhdXRvJyxcbiAgICAgICAgICBoaWRlOiBmYWxzZSxcbiAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICAgIHNuYXBPblJlbGVhc2U6IHRydWUsXG4gICAgICAgICAgbG9ja0NsYXNzOiAnc3dpcGVyLXNjcm9sbGJhci1sb2NrJyxcbiAgICAgICAgICBkcmFnQ2xhc3M6ICdzd2lwZXItc2Nyb2xsYmFyLWRyYWcnLFxuICAgICAgICAgIHNjcm9sbGJhckRpc2FibGVkQ2xhc3M6ICdzd2lwZXItc2Nyb2xsYmFyLWRpc2FibGVkJyxcbiAgICAgICAgICBob3Jpem9udGFsQ2xhc3M6IGBzd2lwZXItc2Nyb2xsYmFyLWhvcml6b250YWxgLFxuICAgICAgICAgIHZlcnRpY2FsQ2xhc3M6IGBzd2lwZXItc2Nyb2xsYmFyLXZlcnRpY2FsYFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIgPSB7XG4gICAgICAgIGVsOiBudWxsLFxuICAgICAgICBkcmFnRWw6IG51bGwsXG4gICAgICAgICRlbDogbnVsbCxcbiAgICAgICAgJGRyYWdFbDogbnVsbFxuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzY3JvbGxiYXIsXG4gICAgICAgICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgICAgICAgcHJvZ3Jlc3NcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRkcmFnRWwsXG4gICAgICAgICAgJGVsXG4gICAgICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xuICAgICAgICBsZXQgbmV3U2l6ZSA9IGRyYWdTaXplO1xuICAgICAgICBsZXQgbmV3UG9zID0gKHRyYWNrU2l6ZSAtIGRyYWdTaXplKSAqIHByb2dyZXNzO1xuXG4gICAgICAgIGlmIChydGwpIHtcbiAgICAgICAgICBuZXdQb3MgPSAtbmV3UG9zO1xuXG4gICAgICAgICAgaWYgKG5ld1BvcyA+IDApIHtcbiAgICAgICAgICAgIG5ld1NpemUgPSBkcmFnU2l6ZSAtIG5ld1BvcztcbiAgICAgICAgICAgIG5ld1BvcyA9IDA7XG4gICAgICAgICAgfSBlbHNlIGlmICgtbmV3UG9zICsgZHJhZ1NpemUgPiB0cmFja1NpemUpIHtcbiAgICAgICAgICAgIG5ld1NpemUgPSB0cmFja1NpemUgKyBuZXdQb3M7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5ld1BvcyA8IDApIHtcbiAgICAgICAgICBuZXdTaXplID0gZHJhZ1NpemUgKyBuZXdQb3M7XG4gICAgICAgICAgbmV3UG9zID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdQb3MgKyBkcmFnU2l6ZSA+IHRyYWNrU2l6ZSkge1xuICAgICAgICAgIG5ld1NpemUgPSB0cmFja1NpemUgLSBuZXdQb3M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgJGRyYWdFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7bmV3UG9zfXB4LCAwLCAwKWApO1xuICAgICAgICAgICRkcmFnRWxbMF0uc3R5bGUud2lkdGggPSBgJHtuZXdTaXplfXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZHJhZ0VsLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoMHB4LCAke25ld1Bvc31weCwgMClgKTtcbiAgICAgICAgICAkZHJhZ0VsWzBdLnN0eWxlLmhlaWdodCA9IGAke25ld1NpemV9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICRlbFswXS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAkZWwudHJhbnNpdGlvbig0MDApO1xuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLiRkcmFnRWwudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNjcm9sbGJhclxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJGRyYWdFbCxcbiAgICAgICAgICAkZWxcbiAgICAgICAgfSA9IHNjcm9sbGJhcjtcbiAgICAgICAgJGRyYWdFbFswXS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICAkZHJhZ0VsWzBdLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICB0cmFja1NpemUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAkZWxbMF0ub2Zmc2V0V2lkdGggOiAkZWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBkaXZpZGVyID0gc3dpcGVyLnNpemUgLyAoc3dpcGVyLnZpcnR1YWxTaXplICsgc3dpcGVyLnBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmUgLSAoc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5zbmFwR3JpZFswXSA6IDApKTtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemUgPT09ICdhdXRvJykge1xuICAgICAgICAgIGRyYWdTaXplID0gdHJhY2tTaXplICogZGl2aWRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkcmFnU2l6ZSA9IHBhcnNlSW50KHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdTaXplLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgJGRyYWdFbFswXS5zdHlsZS53aWR0aCA9IGAke2RyYWdTaXplfXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZHJhZ0VsWzBdLnN0eWxlLmhlaWdodCA9IGAke2RyYWdTaXplfXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXZpZGVyID49IDEpIHtcbiAgICAgICAgICAkZWxbMF0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZWxbMF0uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmhpZGUpIHtcbiAgICAgICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgICAgc2Nyb2xsYmFyLiRlbFtzd2lwZXIuaXNMb2NrZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRQb2ludGVyUG9zaXRpb24oZSkge1xuICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgcmV0dXJuIGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCA6IGUuY2xpZW50WDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldERyYWdQb3NpdGlvbihlKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzY3JvbGxiYXIsXG4gICAgICAgICAgcnRsVHJhbnNsYXRlOiBydGxcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRlbFxuICAgICAgICB9ID0gc2Nyb2xsYmFyO1xuICAgICAgICBsZXQgcG9zaXRpb25SYXRpbztcbiAgICAgICAgcG9zaXRpb25SYXRpbyA9IChnZXRQb2ludGVyUG9zaXRpb24oZSkgLSAkZWwub2Zmc2V0KClbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCddIC0gKGRyYWdTdGFydFBvcyAhPT0gbnVsbCA/IGRyYWdTdGFydFBvcyA6IGRyYWdTaXplIC8gMikpIC8gKHRyYWNrU2l6ZSAtIGRyYWdTaXplKTtcbiAgICAgICAgcG9zaXRpb25SYXRpbyA9IE1hdGgubWF4KE1hdGgubWluKHBvc2l0aW9uUmF0aW8sIDEpLCAwKTtcblxuICAgICAgICBpZiAocnRsKSB7XG4gICAgICAgICAgcG9zaXRpb25SYXRpbyA9IDEgLSBwb3NpdGlvblJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCkgKyAoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAqIHBvc2l0aW9uUmF0aW87XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhwb3NpdGlvbik7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUocG9zaXRpb24pO1xuICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25EcmFnU3RhcnQoZSkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNjcm9sbGJhcixcbiAgICAgICAgICAkd3JhcHBlckVsXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkZWwsXG4gICAgICAgICAgJGRyYWdFbFxuICAgICAgICB9ID0gc2Nyb2xsYmFyO1xuICAgICAgICBpc1RvdWNoZWQgPSB0cnVlO1xuICAgICAgICBkcmFnU3RhcnRQb3MgPSBlLnRhcmdldCA9PT0gJGRyYWdFbFswXSB8fCBlLnRhcmdldCA9PT0gJGRyYWdFbCA/IGdldFBvaW50ZXJQb3NpdGlvbihlKSAtIGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnXSA6IG51bGw7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uKDEwMCk7XG4gICAgICAgICRkcmFnRWwudHJhbnNpdGlvbigxMDApO1xuICAgICAgICBzZXREcmFnUG9zaXRpb24oZSk7XG4gICAgICAgIGNsZWFyVGltZW91dChkcmFnVGltZW91dCk7XG4gICAgICAgICRlbC50cmFuc2l0aW9uKDApO1xuXG4gICAgICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgICAgICRlbC5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5jc3MoJ3Njcm9sbC1zbmFwLXR5cGUnLCAnbm9uZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1pdCgnc2Nyb2xsYmFyRHJhZ1N0YXJ0JywgZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uRHJhZ01vdmUoZSkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2Nyb2xsYmFyLFxuICAgICAgICAgICR3cmFwcGVyRWxcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRlbCxcbiAgICAgICAgICAkZHJhZ0VsXG4gICAgICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgICAgIGlmICghaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7ZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIHNldERyYWdQb3NpdGlvbihlKTtcbiAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uKDApO1xuICAgICAgICAkZWwudHJhbnNpdGlvbigwKTtcbiAgICAgICAgJGRyYWdFbC50cmFuc2l0aW9uKDApO1xuICAgICAgICBlbWl0KCdzY3JvbGxiYXJEcmFnTW92ZScsIGUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkRyYWdFbmQoZSkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNjcm9sbGJhcixcbiAgICAgICAgICAkd3JhcHBlckVsXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkZWxcbiAgICAgICAgfSA9IHNjcm9sbGJhcjtcbiAgICAgICAgaWYgKCFpc1RvdWNoZWQpIHJldHVybjtcbiAgICAgICAgaXNUb3VjaGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmNzcygnc2Nyb2xsLXNuYXAtdHlwZScsICcnKTtcbiAgICAgICAgICAkd3JhcHBlckVsLnRyYW5zaXRpb24oJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWdUaW1lb3V0KTtcbiAgICAgICAgICBkcmFnVGltZW91dCA9IG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICRlbC5jc3MoJ29wYWNpdHknLCAwKTtcbiAgICAgICAgICAgICRlbC50cmFuc2l0aW9uKDQwMCk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KCdzY3JvbGxiYXJEcmFnRW5kJywgZSk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5zbmFwT25SZWxlYXNlKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZXZlbnRzKG1ldGhvZCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2Nyb2xsYmFyLFxuICAgICAgICAgIHRvdWNoRXZlbnRzVG91Y2gsXG4gICAgICAgICAgdG91Y2hFdmVudHNEZXNrdG9wLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBzdXBwb3J0XG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0ICRlbCA9IHNjcm9sbGJhci4kZWw7XG4gICAgICAgIGlmICghJGVsKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHRhcmdldCA9ICRlbFswXTtcbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdGVuZXIgPSBzdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBwYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHtcbiAgICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgICBjYXB0dXJlOiBmYWxzZVxuICAgICAgICB9IDogZmFsc2U7XG4gICAgICAgIGNvbnN0IHBhc3NpdmVMaXN0ZW5lciA9IHN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge1xuICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgICAgY2FwdHVyZTogZmFsc2VcbiAgICAgICAgfSA6IGZhbHNlO1xuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBldmVudE1ldGhvZCA9IG1ldGhvZCA9PT0gJ29uJyA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblxuICAgICAgICBpZiAoIXN1cHBvcnQudG91Y2gpIHtcbiAgICAgICAgICB0YXJnZXRbZXZlbnRNZXRob2RdKHRvdWNoRXZlbnRzRGVza3RvcC5zdGFydCwgb25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgICBkb2N1bWVudFtldmVudE1ldGhvZF0odG91Y2hFdmVudHNEZXNrdG9wLm1vdmUsIG9uRHJhZ01vdmUsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgICBkb2N1bWVudFtldmVudE1ldGhvZF0odG91Y2hFdmVudHNEZXNrdG9wLmVuZCwgb25EcmFnRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldFtldmVudE1ldGhvZF0odG91Y2hFdmVudHNUb3VjaC5zdGFydCwgb25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgICB0YXJnZXRbZXZlbnRNZXRob2RdKHRvdWNoRXZlbnRzVG91Y2gubW92ZSwgb25EcmFnTW92ZSwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgICAgIHRhcmdldFtldmVudE1ldGhvZF0odG91Y2hFdmVudHNUb3VjaC5lbmQsIG9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlbmFibGVEcmFnZ2FibGUoKSB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICAgICAgZXZlbnRzKCdvbicpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkaXNhYmxlRHJhZ2dhYmxlKCkge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgICAgIGV2ZW50cygnb2ZmJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzY3JvbGxiYXIsXG4gICAgICAgICAgJGVsOiAkc3dpcGVyRWxcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIgPSBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLnNjcm9sbGJhciwgc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIsIHtcbiAgICAgICAgICBlbDogJ3N3aXBlci1zY3JvbGxiYXInXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICAgICAgaWYgKCFwYXJhbXMuZWwpIHJldHVybjtcbiAgICAgICAgbGV0ICRlbCA9ICQocGFyYW1zLmVsKTtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJiAkZWwubGVuZ3RoID4gMSAmJiAkc3dpcGVyRWwuZmluZChwYXJhbXMuZWwpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICRlbCA9ICRzd2lwZXJFbC5maW5kKHBhcmFtcy5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuYWRkQ2xhc3Moc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gcGFyYW1zLmhvcml6b250YWxDbGFzcyA6IHBhcmFtcy52ZXJ0aWNhbENsYXNzKTtcbiAgICAgICAgbGV0ICRkcmFnRWwgPSAkZWwuZmluZChgLiR7c3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ0NsYXNzfWApO1xuXG4gICAgICAgIGlmICgkZHJhZ0VsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICRkcmFnRWwgPSAkKGA8ZGl2IGNsYXNzPVwiJHtzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnQ2xhc3N9XCI+PC9kaXY+YCk7XG4gICAgICAgICAgJGVsLmFwcGVuZCgkZHJhZ0VsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oc2Nyb2xsYmFyLCB7XG4gICAgICAgICAgJGVsLFxuICAgICAgICAgIGVsOiAkZWxbMF0sXG4gICAgICAgICAgJGRyYWdFbCxcbiAgICAgICAgICBkcmFnRWw6ICRkcmFnRWxbMF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5kcmFnZ2FibGUpIHtcbiAgICAgICAgICBlbmFibGVEcmFnZ2FibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkZWwpIHtcbiAgICAgICAgICAkZWxbc3dpcGVyLmVuYWJsZWQgPyAncmVtb3ZlQ2xhc3MnIDogJ2FkZENsYXNzJ10oc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICAgICAgY29uc3QgJGVsID0gc3dpcGVyLnNjcm9sbGJhci4kZWw7XG5cbiAgICAgICAgaWYgKCRlbCkge1xuICAgICAgICAgICRlbC5yZW1vdmVDbGFzcyhzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBwYXJhbXMuaG9yaXpvbnRhbENsYXNzIDogcGFyYW1zLnZlcnRpY2FsQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzYWJsZURyYWdnYWJsZSgpO1xuICAgICAgfVxuXG4gICAgICBvbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICB1cGRhdGVTaXplKCk7XG4gICAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3VwZGF0ZSByZXNpemUgb2JzZXJ2ZXJVcGRhdGUgbG9jayB1bmxvY2snLCAoKSA9PiB7XG4gICAgICAgIHVwZGF0ZVNpemUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3NldFRyYW5zbGF0ZScsICgpID0+IHtcbiAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdzZXRUcmFuc2l0aW9uJywgKF9zLCBkdXJhdGlvbikgPT4ge1xuICAgICAgICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2VuYWJsZSBkaXNhYmxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJGVsXG4gICAgICAgIH0gPSBzd2lwZXIuc2Nyb2xsYmFyO1xuXG4gICAgICAgIGlmICgkZWwpIHtcbiAgICAgICAgICAkZWxbc3dpcGVyLmVuYWJsZWQgPyAncmVtb3ZlQ2xhc3MnIDogJ2FkZENsYXNzJ10oc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgZGVzdHJveSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGVuYWJsZSA9ICgpID0+IHtcbiAgICAgICAgc3dpcGVyLiRlbC5yZW1vdmVDbGFzcyhzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5zY3JvbGxiYXJEaXNhYmxlZENsYXNzKTtcblxuICAgICAgICBpZiAoc3dpcGVyLnNjcm9sbGJhci4kZWwpIHtcbiAgICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLiRlbC5yZW1vdmVDbGFzcyhzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5zY3JvbGxiYXJEaXNhYmxlZENsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgdXBkYXRlU2l6ZSgpO1xuICAgICAgICBzZXRUcmFuc2xhdGUoKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGRpc2FibGUgPSAoKSA9PiB7XG4gICAgICAgIHN3aXBlci4kZWwuYWRkQ2xhc3Moc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuc2Nyb2xsYmFyRGlzYWJsZWRDbGFzcyk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5zY3JvbGxiYXIuJGVsKSB7XG4gICAgICAgICAgc3dpcGVyLnNjcm9sbGJhci4kZWwuYWRkQ2xhc3Moc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuc2Nyb2xsYmFyRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXN0cm95KCk7XG4gICAgICB9O1xuXG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlci5zY3JvbGxiYXIsIHtcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBkaXNhYmxlLFxuICAgICAgICB1cGRhdGVTaXplLFxuICAgICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICAgIGluaXQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFBhcmFsbGF4KF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvblxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBwYXJhbGxheDoge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2Zvcm0gPSAoZWwsIHByb2dyZXNzKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBydGxcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgICAgIGNvbnN0IHJ0bEZhY3RvciA9IHJ0bCA/IC0xIDogMTtcbiAgICAgICAgY29uc3QgcCA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheCcpIHx8ICcwJztcbiAgICAgICAgbGV0IHggPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgteCcpO1xuICAgICAgICBsZXQgeSA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC15Jyk7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gJGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlJyk7XG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eScpO1xuXG4gICAgICAgIGlmICh4IHx8IHkpIHtcbiAgICAgICAgICB4ID0geCB8fCAnMCc7XG4gICAgICAgICAgeSA9IHkgfHwgJzAnO1xuICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgIHggPSBwO1xuICAgICAgICAgIHkgPSAnMCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeSA9IHA7XG4gICAgICAgICAgeCA9ICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4LmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgICAgICAgeCA9IGAke3BhcnNlSW50KHgsIDEwKSAqIHByb2dyZXNzICogcnRsRmFjdG9yfSVgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHggPSBgJHt4ICogcHJvZ3Jlc3MgKiBydGxGYWN0b3J9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkuaW5kZXhPZignJScpID49IDApIHtcbiAgICAgICAgICB5ID0gYCR7cGFyc2VJbnQoeSwgMTApICogcHJvZ3Jlc3N9JWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeSA9IGAke3kgKiBwcm9ncmVzc31weGA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9wYWNpdHkgIT09ICd1bmRlZmluZWQnICYmIG9wYWNpdHkgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50T3BhY2l0eSA9IG9wYWNpdHkgLSAob3BhY2l0eSAtIDEpICogKDEgLSBNYXRoLmFicyhwcm9ncmVzcykpO1xuICAgICAgICAgICRlbFswXS5zdHlsZS5vcGFjaXR5ID0gY3VycmVudE9wYWNpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHNjYWxlID09PSAndW5kZWZpbmVkJyB8fCBzY2FsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICRlbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7eH0sICR7eX0sIDBweClgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50U2NhbGUgPSBzY2FsZSAtIChzY2FsZSAtIDEpICogKDEgLSBNYXRoLmFicyhwcm9ncmVzcykpO1xuICAgICAgICAgICRlbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7eH0sICR7eX0sIDBweCkgc2NhbGUoJHtjdXJyZW50U2NhbGV9KWApO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkZWwsXG4gICAgICAgICAgc2xpZGVzLFxuICAgICAgICAgIHByb2dyZXNzLFxuICAgICAgICAgIHNuYXBHcmlkXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgICRlbC5jaGlsZHJlbignW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlXScpLmVhY2goZWwgPT4ge1xuICAgICAgICAgIHNldFRyYW5zZm9ybShlbCwgcHJvZ3Jlc3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2xpZGVzLmVhY2goKHNsaWRlRWwsIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgICAgICBsZXQgc2xpZGVQcm9ncmVzcyA9IHNsaWRlRWwucHJvZ3Jlc3M7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA+IDEgJiYgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHNsaWRlUHJvZ3Jlc3MgKz0gTWF0aC5jZWlsKHNsaWRlSW5kZXggLyAyKSAtIHByb2dyZXNzICogKHNuYXBHcmlkLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNsaWRlUHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChzbGlkZVByb2dyZXNzLCAtMSksIDEpO1xuICAgICAgICAgICQoc2xpZGVFbCkuZmluZCgnW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlXScpLmVhY2goZWwgPT4ge1xuICAgICAgICAgICAgc2V0VHJhbnNmb3JtKGVsLCBzbGlkZVByb2dyZXNzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2l0aW9uID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChkdXJhdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgZHVyYXRpb24gPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRlbFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICAkZWwuZmluZCgnW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlXScpLmVhY2gocGFyYWxsYXhFbCA9PiB7XG4gICAgICAgICAgY29uc3QgJHBhcmFsbGF4RWwgPSAkKHBhcmFsbGF4RWwpO1xuICAgICAgICAgIGxldCBwYXJhbGxheER1cmF0aW9uID0gcGFyc2VJbnQoJHBhcmFsbGF4RWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgtZHVyYXRpb24nKSwgMTApIHx8IGR1cmF0aW9uO1xuICAgICAgICAgIGlmIChkdXJhdGlvbiA9PT0gMCkgcGFyYWxsYXhEdXJhdGlvbiA9IDA7XG4gICAgICAgICAgJHBhcmFsbGF4RWwudHJhbnNpdGlvbihwYXJhbGxheER1cmF0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBvbignYmVmb3JlSW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnBhcmFsbGF4LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBvbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnBhcmFsbGF4LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdzZXRUcmFuc2xhdGUnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBvbignc2V0VHJhbnNpdGlvbicsIChfc3dpcGVyLCBkdXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXguZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFpvb20oX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgem9vbToge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIG1heFJhdGlvOiAzLFxuICAgICAgICAgIG1pblJhdGlvOiAxLFxuICAgICAgICAgIHRvZ2dsZTogdHJ1ZSxcbiAgICAgICAgICBjb250YWluZXJDbGFzczogJ3N3aXBlci16b29tLWNvbnRhaW5lcicsXG4gICAgICAgICAgem9vbWVkU2xpZGVDbGFzczogJ3N3aXBlci1zbGlkZS16b29tZWQnXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3dpcGVyLnpvb20gPSB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICB9O1xuICAgICAgbGV0IGN1cnJlbnRTY2FsZSA9IDE7XG4gICAgICBsZXQgaXNTY2FsaW5nID0gZmFsc2U7XG4gICAgICBsZXQgZ2VzdHVyZXNFbmFibGVkO1xuICAgICAgbGV0IGZha2VHZXN0dXJlVG91Y2hlZDtcbiAgICAgIGxldCBmYWtlR2VzdHVyZU1vdmVkO1xuICAgICAgY29uc3QgZ2VzdHVyZSA9IHtcbiAgICAgICAgJHNsaWRlRWw6IHVuZGVmaW5lZCxcbiAgICAgICAgc2xpZGVXaWR0aDogdW5kZWZpbmVkLFxuICAgICAgICBzbGlkZUhlaWdodDogdW5kZWZpbmVkLFxuICAgICAgICAkaW1hZ2VFbDogdW5kZWZpbmVkLFxuICAgICAgICAkaW1hZ2VXcmFwRWw6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4UmF0aW86IDNcbiAgICAgIH07XG4gICAgICBjb25zdCBpbWFnZSA9IHtcbiAgICAgICAgaXNUb3VjaGVkOiB1bmRlZmluZWQsXG4gICAgICAgIGlzTW92ZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgY3VycmVudFg6IHVuZGVmaW5lZCxcbiAgICAgICAgY3VycmVudFk6IHVuZGVmaW5lZCxcbiAgICAgICAgbWluWDogdW5kZWZpbmVkLFxuICAgICAgICBtaW5ZOiB1bmRlZmluZWQsXG4gICAgICAgIG1heFg6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4WTogdW5kZWZpbmVkLFxuICAgICAgICB3aWR0aDogdW5kZWZpbmVkLFxuICAgICAgICBoZWlnaHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhcnRYOiB1bmRlZmluZWQsXG4gICAgICAgIHN0YXJ0WTogdW5kZWZpbmVkLFxuICAgICAgICB0b3VjaGVzU3RhcnQ6IHt9LFxuICAgICAgICB0b3VjaGVzQ3VycmVudDoge31cbiAgICAgIH07XG4gICAgICBjb25zdCB2ZWxvY2l0eSA9IHtcbiAgICAgICAgeDogdW5kZWZpbmVkLFxuICAgICAgICB5OiB1bmRlZmluZWQsXG4gICAgICAgIHByZXZQb3NpdGlvblg6IHVuZGVmaW5lZCxcbiAgICAgICAgcHJldlBvc2l0aW9uWTogdW5kZWZpbmVkLFxuICAgICAgICBwcmV2VGltZTogdW5kZWZpbmVkXG4gICAgICB9O1xuICAgICAgbGV0IHNjYWxlID0gMTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzd2lwZXIuem9vbSwgJ3NjYWxlJywge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHNjYWxlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgIGlmIChzY2FsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlRWwgPSBnZXN0dXJlLiRpbWFnZUVsID8gZ2VzdHVyZS4kaW1hZ2VFbFswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlRWwgPSBnZXN0dXJlLiRzbGlkZUVsID8gZ2VzdHVyZS4kc2xpZGVFbFswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVtaXQoJ3pvb21DaGFuZ2UnLCB2YWx1ZSwgaW1hZ2VFbCwgc2xpZGVFbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2NhbGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlcyhlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikgcmV0dXJuIDE7XG4gICAgICAgIGNvbnN0IHgxID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICBjb25zdCB5MSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcbiAgICAgICAgY29uc3QgeDIgPSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVg7XG4gICAgICAgIGNvbnN0IHkyID0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VZO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCgoeDIgLSB4MSkgKiogMiArICh5MiAtIHkxKSAqKiAyKTtcbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlO1xuICAgICAgfSAvLyBFdmVudHNcblxuXG4gICAgICBmdW5jdGlvbiBvbkdlc3R1cmVTdGFydChlKSB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnQgPSBzd2lwZXIuc3VwcG9ydDtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy56b29tO1xuICAgICAgICBmYWtlR2VzdHVyZVRvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgZmFrZUdlc3R1cmVNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZha2VHZXN0dXJlVG91Y2hlZCA9IHRydWU7XG4gICAgICAgICAgZ2VzdHVyZS5zY2FsZVN0YXJ0ID0gZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlcyhlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCB8fCAhZ2VzdHVyZS4kc2xpZGVFbC5sZW5ndGgpIHtcbiAgICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gJChlLnRhcmdldCkuY2xvc2VzdChgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApO1xuICAgICAgICAgIGlmIChnZXN0dXJlLiRzbGlkZUVsLmxlbmd0aCA9PT0gMCkgZ2VzdHVyZS4kc2xpZGVFbCA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsID0gZ2VzdHVyZS4kc2xpZGVFbC5maW5kKGAuJHtwYXJhbXMuY29udGFpbmVyQ2xhc3N9YCkuZXEoMCkuZmluZCgncGljdHVyZSwgaW1nLCBzdmcsIGNhbnZhcywgLnN3aXBlci16b29tLXRhcmdldCcpLmVxKDApO1xuICAgICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsID0gZ2VzdHVyZS4kaW1hZ2VFbC5wYXJlbnQoYC4ke3BhcmFtcy5jb250YWluZXJDbGFzc31gKTtcbiAgICAgICAgICBnZXN0dXJlLm1heFJhdGlvID0gZ2VzdHVyZS4kaW1hZ2VXcmFwRWwuYXR0cignZGF0YS1zd2lwZXItem9vbScpIHx8IHBhcmFtcy5tYXhSYXRpbztcblxuICAgICAgICAgIGlmIChnZXN0dXJlLiRpbWFnZVdyYXBFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGdlc3R1cmUuJGltYWdlRWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdlc3R1cmUuJGltYWdlRWwpIHtcbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpc1NjYWxpbmcgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkdlc3R1cmVDaGFuZ2UoZSkge1xuICAgICAgICBjb25zdCBzdXBwb3J0ID0gc3dpcGVyLnN1cHBvcnQ7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICAgICAgY29uc3Qgem9vbSA9IHN3aXBlci56b29tO1xuXG4gICAgICAgIGlmICghc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaG1vdmUnIHx8IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmYWtlR2VzdHVyZU1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICBnZXN0dXJlLnNjYWxlTW92ZSA9IGdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAoZS50eXBlID09PSAnZ2VzdHVyZWNoYW5nZScpIG9uR2VzdHVyZVN0YXJ0KGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICAgICAgem9vbS5zY2FsZSA9IGUuc2NhbGUgKiBjdXJyZW50U2NhbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9vbS5zY2FsZSA9IGdlc3R1cmUuc2NhbGVNb3ZlIC8gZ2VzdHVyZS5zY2FsZVN0YXJ0ICogY3VycmVudFNjYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHpvb20uc2NhbGUgPiBnZXN0dXJlLm1heFJhdGlvKSB7XG4gICAgICAgICAgem9vbS5zY2FsZSA9IGdlc3R1cmUubWF4UmF0aW8gLSAxICsgKHpvb20uc2NhbGUgLSBnZXN0dXJlLm1heFJhdGlvICsgMSkgKiogMC41O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHpvb20uc2NhbGUgPCBwYXJhbXMubWluUmF0aW8pIHtcbiAgICAgICAgICB6b29tLnNjYWxlID0gcGFyYW1zLm1pblJhdGlvICsgMSAtIChwYXJhbXMubWluUmF0aW8gLSB6b29tLnNjYWxlICsgMSkgKiogMC41O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgke3pvb20uc2NhbGV9KWApO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkdlc3R1cmVFbmQoZSkge1xuICAgICAgICBjb25zdCBkZXZpY2UgPSBzd2lwZXIuZGV2aWNlO1xuICAgICAgICBjb25zdCBzdXBwb3J0ID0gc3dpcGVyLnN1cHBvcnQ7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICAgICAgY29uc3Qgem9vbSA9IHN3aXBlci56b29tO1xuXG4gICAgICAgIGlmICghc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgIGlmICghZmFrZUdlc3R1cmVUb3VjaGVkIHx8ICFmYWtlR2VzdHVyZU1vdmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoZW5kJyB8fCBlLnR5cGUgPT09ICd0b3VjaGVuZCcgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPCAyICYmICFkZXZpY2UuYW5kcm9pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZha2VHZXN0dXJlVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgIGZha2VHZXN0dXJlTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB6b29tLnNjYWxlID0gTWF0aC5tYXgoTWF0aC5taW4oem9vbS5zY2FsZSwgZ2VzdHVyZS5tYXhSYXRpbyksIHBhcmFtcy5taW5SYXRpbyk7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNpdGlvbihzd2lwZXIucGFyYW1zLnNwZWVkKS50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgke3pvb20uc2NhbGV9KWApO1xuICAgICAgICBjdXJyZW50U2NhbGUgPSB6b29tLnNjYWxlO1xuICAgICAgICBpc1NjYWxpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHpvb20uc2NhbGUgPT09IDEpIGdlc3R1cmUuJHNsaWRlRWwgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uVG91Y2hTdGFydChlKSB7XG4gICAgICAgIGNvbnN0IGRldmljZSA9IHN3aXBlci5kZXZpY2U7XG4gICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBpZiAoaW1hZ2UuaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgIGlmIChkZXZpY2UuYW5kcm9pZCAmJiBlLmNhbmNlbGFibGUpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaW1hZ2UuaXNUb3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgaW1hZ2UudG91Y2hlc1N0YXJ0LnggPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgIGltYWdlLnRvdWNoZXNTdGFydC55ID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgICAgIGlmICghaW1hZ2UuaXNUb3VjaGVkIHx8ICFnZXN0dXJlLiRzbGlkZUVsKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFpbWFnZS5pc01vdmVkKSB7XG4gICAgICAgICAgaW1hZ2Uud2lkdGggPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgIGltYWdlLmhlaWdodCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIGltYWdlLnN0YXJ0WCA9IGdldFRyYW5zbGF0ZShnZXN0dXJlLiRpbWFnZVdyYXBFbFswXSwgJ3gnKSB8fCAwO1xuICAgICAgICAgIGltYWdlLnN0YXJ0WSA9IGdldFRyYW5zbGF0ZShnZXN0dXJlLiRpbWFnZVdyYXBFbFswXSwgJ3knKSB8fCAwO1xuICAgICAgICAgIGdlc3R1cmUuc2xpZGVXaWR0aCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgZ2VzdHVyZS5zbGlkZUhlaWdodCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oMCk7XG4gICAgICAgIH0gLy8gRGVmaW5lIGlmIHdlIG5lZWQgaW1hZ2UgZHJhZ1xuXG5cbiAgICAgICAgY29uc3Qgc2NhbGVkV2lkdGggPSBpbWFnZS53aWR0aCAqIHpvb20uc2NhbGU7XG4gICAgICAgIGNvbnN0IHNjYWxlZEhlaWdodCA9IGltYWdlLmhlaWdodCAqIHpvb20uc2NhbGU7XG4gICAgICAgIGlmIChzY2FsZWRXaWR0aCA8IGdlc3R1cmUuc2xpZGVXaWR0aCAmJiBzY2FsZWRIZWlnaHQgPCBnZXN0dXJlLnNsaWRlSGVpZ2h0KSByZXR1cm47XG4gICAgICAgIGltYWdlLm1pblggPSBNYXRoLm1pbihnZXN0dXJlLnNsaWRlV2lkdGggLyAyIC0gc2NhbGVkV2lkdGggLyAyLCAwKTtcbiAgICAgICAgaW1hZ2UubWF4WCA9IC1pbWFnZS5taW5YO1xuICAgICAgICBpbWFnZS5taW5ZID0gTWF0aC5taW4oZ2VzdHVyZS5zbGlkZUhlaWdodCAvIDIgLSBzY2FsZWRIZWlnaHQgLyAyLCAwKTtcbiAgICAgICAgaW1hZ2UubWF4WSA9IC1pbWFnZS5taW5ZO1xuICAgICAgICBpbWFnZS50b3VjaGVzQ3VycmVudC54ID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgIGltYWdlLnRvdWNoZXNDdXJyZW50LnkgPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcblxuICAgICAgICBpZiAoIWltYWdlLmlzTW92ZWQgJiYgIWlzU2NhbGluZykge1xuICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgKE1hdGguZmxvb3IoaW1hZ2UubWluWCkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRYKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC54IDwgaW1hZ2UudG91Y2hlc1N0YXJ0LnggfHwgTWF0aC5mbG9vcihpbWFnZS5tYXhYKSA9PT0gTWF0aC5mbG9vcihpbWFnZS5zdGFydFgpICYmIGltYWdlLnRvdWNoZXNDdXJyZW50LnggPiBpbWFnZS50b3VjaGVzU3RhcnQueCkpIHtcbiAgICAgICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIChNYXRoLmZsb29yKGltYWdlLm1pblkpID09PSBNYXRoLmZsb29yKGltYWdlLnN0YXJ0WSkgJiYgaW1hZ2UudG91Y2hlc0N1cnJlbnQueSA8IGltYWdlLnRvdWNoZXNTdGFydC55IHx8IE1hdGguZmxvb3IoaW1hZ2UubWF4WSkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRZKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC55ID4gaW1hZ2UudG91Y2hlc1N0YXJ0LnkpKSB7XG4gICAgICAgICAgICBpbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaW1hZ2UuaXNNb3ZlZCA9IHRydWU7XG4gICAgICAgIGltYWdlLmN1cnJlbnRYID0gaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIGltYWdlLnRvdWNoZXNTdGFydC54ICsgaW1hZ2Uuc3RhcnRYO1xuICAgICAgICBpbWFnZS5jdXJyZW50WSA9IGltYWdlLnRvdWNoZXNDdXJyZW50LnkgLSBpbWFnZS50b3VjaGVzU3RhcnQueSArIGltYWdlLnN0YXJ0WTtcblxuICAgICAgICBpZiAoaW1hZ2UuY3VycmVudFggPCBpbWFnZS5taW5YKSB7XG4gICAgICAgICAgaW1hZ2UuY3VycmVudFggPSBpbWFnZS5taW5YICsgMSAtIChpbWFnZS5taW5YIC0gaW1hZ2UuY3VycmVudFggKyAxKSAqKiAwLjg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1hZ2UuY3VycmVudFggPiBpbWFnZS5tYXhYKSB7XG4gICAgICAgICAgaW1hZ2UuY3VycmVudFggPSBpbWFnZS5tYXhYIC0gMSArIChpbWFnZS5jdXJyZW50WCAtIGltYWdlLm1heFggKyAxKSAqKiAwLjg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1hZ2UuY3VycmVudFkgPCBpbWFnZS5taW5ZKSB7XG4gICAgICAgICAgaW1hZ2UuY3VycmVudFkgPSBpbWFnZS5taW5ZICsgMSAtIChpbWFnZS5taW5ZIC0gaW1hZ2UuY3VycmVudFkgKyAxKSAqKiAwLjg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1hZ2UuY3VycmVudFkgPiBpbWFnZS5tYXhZKSB7XG4gICAgICAgICAgaW1hZ2UuY3VycmVudFkgPSBpbWFnZS5tYXhZIC0gMSArIChpbWFnZS5jdXJyZW50WSAtIGltYWdlLm1heFkgKyAxKSAqKiAwLjg7XG4gICAgICAgIH0gLy8gVmVsb2NpdHlcblxuXG4gICAgICAgIGlmICghdmVsb2NpdHkucHJldlBvc2l0aW9uWCkgdmVsb2NpdHkucHJldlBvc2l0aW9uWCA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lng7XG4gICAgICAgIGlmICghdmVsb2NpdHkucHJldlBvc2l0aW9uWSkgdmVsb2NpdHkucHJldlBvc2l0aW9uWSA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lnk7XG4gICAgICAgIGlmICghdmVsb2NpdHkucHJldlRpbWUpIHZlbG9jaXR5LnByZXZUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmVsb2NpdHkueCA9IChpbWFnZS50b3VjaGVzQ3VycmVudC54IC0gdmVsb2NpdHkucHJldlBvc2l0aW9uWCkgLyAoRGF0ZS5ub3coKSAtIHZlbG9jaXR5LnByZXZUaW1lKSAvIDI7XG4gICAgICAgIHZlbG9jaXR5LnkgPSAoaW1hZ2UudG91Y2hlc0N1cnJlbnQueSAtIHZlbG9jaXR5LnByZXZQb3NpdGlvblkpIC8gKERhdGUubm93KCkgLSB2ZWxvY2l0eS5wcmV2VGltZSkgLyAyO1xuICAgICAgICBpZiAoTWF0aC5hYnMoaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIHZlbG9jaXR5LnByZXZQb3NpdGlvblgpIDwgMikgdmVsb2NpdHkueCA9IDA7XG4gICAgICAgIGlmIChNYXRoLmFicyhpbWFnZS50b3VjaGVzQ3VycmVudC55IC0gdmVsb2NpdHkucHJldlBvc2l0aW9uWSkgPCAyKSB2ZWxvY2l0eS55ID0gMDtcbiAgICAgICAgdmVsb2NpdHkucHJldlBvc2l0aW9uWCA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lng7XG4gICAgICAgIHZlbG9jaXR5LnByZXZQb3NpdGlvblkgPSBpbWFnZS50b3VjaGVzQ3VycmVudC55O1xuICAgICAgICB2ZWxvY2l0eS5wcmV2VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoJHtpbWFnZS5jdXJyZW50WH1weCwgJHtpbWFnZS5jdXJyZW50WX1weCwwKWApO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblRvdWNoRW5kKCkge1xuICAgICAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghaW1hZ2UuaXNUb3VjaGVkIHx8ICFpbWFnZS5pc01vdmVkKSB7XG4gICAgICAgICAgaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgaW1hZ2UuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICBpbWFnZS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgIGxldCBtb21lbnR1bUR1cmF0aW9uWCA9IDMwMDtcbiAgICAgICAgbGV0IG1vbWVudHVtRHVyYXRpb25ZID0gMzAwO1xuICAgICAgICBjb25zdCBtb21lbnR1bURpc3RhbmNlWCA9IHZlbG9jaXR5LnggKiBtb21lbnR1bUR1cmF0aW9uWDtcbiAgICAgICAgY29uc3QgbmV3UG9zaXRpb25YID0gaW1hZ2UuY3VycmVudFggKyBtb21lbnR1bURpc3RhbmNlWDtcbiAgICAgICAgY29uc3QgbW9tZW50dW1EaXN0YW5jZVkgPSB2ZWxvY2l0eS55ICogbW9tZW50dW1EdXJhdGlvblk7XG4gICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uWSA9IGltYWdlLmN1cnJlbnRZICsgbW9tZW50dW1EaXN0YW5jZVk7IC8vIEZpeCBkdXJhdGlvblxuXG4gICAgICAgIGlmICh2ZWxvY2l0eS54ICE9PSAwKSBtb21lbnR1bUR1cmF0aW9uWCA9IE1hdGguYWJzKChuZXdQb3NpdGlvblggLSBpbWFnZS5jdXJyZW50WCkgLyB2ZWxvY2l0eS54KTtcbiAgICAgICAgaWYgKHZlbG9jaXR5LnkgIT09IDApIG1vbWVudHVtRHVyYXRpb25ZID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uWSAtIGltYWdlLmN1cnJlbnRZKSAvIHZlbG9jaXR5LnkpO1xuICAgICAgICBjb25zdCBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5tYXgobW9tZW50dW1EdXJhdGlvblgsIG1vbWVudHVtRHVyYXRpb25ZKTtcbiAgICAgICAgaW1hZ2UuY3VycmVudFggPSBuZXdQb3NpdGlvblg7XG4gICAgICAgIGltYWdlLmN1cnJlbnRZID0gbmV3UG9zaXRpb25ZOyAvLyBEZWZpbmUgaWYgd2UgbmVlZCBpbWFnZSBkcmFnXG5cbiAgICAgICAgY29uc3Qgc2NhbGVkV2lkdGggPSBpbWFnZS53aWR0aCAqIHpvb20uc2NhbGU7XG4gICAgICAgIGNvbnN0IHNjYWxlZEhlaWdodCA9IGltYWdlLmhlaWdodCAqIHpvb20uc2NhbGU7XG4gICAgICAgIGltYWdlLm1pblggPSBNYXRoLm1pbihnZXN0dXJlLnNsaWRlV2lkdGggLyAyIC0gc2NhbGVkV2lkdGggLyAyLCAwKTtcbiAgICAgICAgaW1hZ2UubWF4WCA9IC1pbWFnZS5taW5YO1xuICAgICAgICBpbWFnZS5taW5ZID0gTWF0aC5taW4oZ2VzdHVyZS5zbGlkZUhlaWdodCAvIDIgLSBzY2FsZWRIZWlnaHQgLyAyLCAwKTtcbiAgICAgICAgaW1hZ2UubWF4WSA9IC1pbWFnZS5taW5ZO1xuICAgICAgICBpbWFnZS5jdXJyZW50WCA9IE1hdGgubWF4KE1hdGgubWluKGltYWdlLmN1cnJlbnRYLCBpbWFnZS5tYXhYKSwgaW1hZ2UubWluWCk7XG4gICAgICAgIGltYWdlLmN1cnJlbnRZID0gTWF0aC5tYXgoTWF0aC5taW4oaW1hZ2UuY3VycmVudFksIGltYWdlLm1heFkpLCBpbWFnZS5taW5ZKTtcbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKS50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7aW1hZ2UuY3VycmVudFh9cHgsICR7aW1hZ2UuY3VycmVudFl9cHgsMClgKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25UcmFuc2l0aW9uRW5kKCkge1xuICAgICAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG5cbiAgICAgICAgaWYgKGdlc3R1cmUuJHNsaWRlRWwgJiYgc3dpcGVyLnByZXZpb3VzSW5kZXggIT09IHN3aXBlci5hY3RpdmVJbmRleCkge1xuICAgICAgICAgIGlmIChnZXN0dXJlLiRpbWFnZUVsKSB7XG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGdlc3R1cmUuJGltYWdlV3JhcEVsKSB7XG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHpvb20uc2NhbGUgPSAxO1xuICAgICAgICAgIGN1cnJlbnRTY2FsZSA9IDE7XG4gICAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHpvb21JbihlKSB7XG4gICAgICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy56b29tO1xuXG4gICAgICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCkge1xuICAgICAgICAgIGlmIChlICYmIGUudGFyZ2V0KSB7XG4gICAgICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gJChlLnRhcmdldCkuY2xvc2VzdChgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCkge1xuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBzd2lwZXIudmlydHVhbCkge1xuICAgICAgICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzc31gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IGdlc3R1cmUuJHNsaWRlRWwuZmluZChgLiR7cGFyYW1zLmNvbnRhaW5lckNsYXNzfWApLmVxKDApLmZpbmQoJ3BpY3R1cmUsIGltZywgc3ZnLCBjYW52YXMsIC5zd2lwZXItem9vbS10YXJnZXQnKS5lcSgwKTtcbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KGAuJHtwYXJhbXMuY29udGFpbmVyQ2xhc3N9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDAgfHwgIWdlc3R1cmUuJGltYWdlV3JhcEVsIHx8IGdlc3R1cmUuJGltYWdlV3JhcEVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS50b3VjaEFjdGlvbiA9ICdub25lJztcbiAgICAgICAgfVxuXG4gICAgICAgIGdlc3R1cmUuJHNsaWRlRWwuYWRkQ2xhc3MoYCR7cGFyYW1zLnpvb21lZFNsaWRlQ2xhc3N9YCk7XG4gICAgICAgIGxldCB0b3VjaFg7XG4gICAgICAgIGxldCB0b3VjaFk7XG4gICAgICAgIGxldCBvZmZzZXRYO1xuICAgICAgICBsZXQgb2Zmc2V0WTtcbiAgICAgICAgbGV0IGRpZmZYO1xuICAgICAgICBsZXQgZGlmZlk7XG4gICAgICAgIGxldCB0cmFuc2xhdGVYO1xuICAgICAgICBsZXQgdHJhbnNsYXRlWTtcbiAgICAgICAgbGV0IGltYWdlV2lkdGg7XG4gICAgICAgIGxldCBpbWFnZUhlaWdodDtcbiAgICAgICAgbGV0IHNjYWxlZFdpZHRoO1xuICAgICAgICBsZXQgc2NhbGVkSGVpZ2h0O1xuICAgICAgICBsZXQgdHJhbnNsYXRlTWluWDtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZU1pblk7XG4gICAgICAgIGxldCB0cmFuc2xhdGVNYXhYO1xuICAgICAgICBsZXQgdHJhbnNsYXRlTWF4WTtcbiAgICAgICAgbGV0IHNsaWRlV2lkdGg7XG4gICAgICAgIGxldCBzbGlkZUhlaWdodDtcblxuICAgICAgICBpZiAodHlwZW9mIGltYWdlLnRvdWNoZXNTdGFydC54ID09PSAndW5kZWZpbmVkJyAmJiBlKSB7XG4gICAgICAgICAgdG91Y2hYID0gZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgdG91Y2hZID0gZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG91Y2hYID0gaW1hZ2UudG91Y2hlc1N0YXJ0Lng7XG4gICAgICAgICAgdG91Y2hZID0gaW1hZ2UudG91Y2hlc1N0YXJ0Lnk7XG4gICAgICAgIH1cblxuICAgICAgICB6b29tLnNjYWxlID0gZ2VzdHVyZS4kaW1hZ2VXcmFwRWwuYXR0cignZGF0YS1zd2lwZXItem9vbScpIHx8IHBhcmFtcy5tYXhSYXRpbztcbiAgICAgICAgY3VycmVudFNjYWxlID0gZ2VzdHVyZS4kaW1hZ2VXcmFwRWwuYXR0cignZGF0YS1zd2lwZXItem9vbScpIHx8IHBhcmFtcy5tYXhSYXRpbztcblxuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgIHNsaWRlV2lkdGggPSBnZXN0dXJlLiRzbGlkZUVsWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgIHNsaWRlSGVpZ2h0ID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgb2Zmc2V0WCA9IGdlc3R1cmUuJHNsaWRlRWwub2Zmc2V0KCkubGVmdCArIHdpbmRvdy5zY3JvbGxYO1xuICAgICAgICAgIG9mZnNldFkgPSBnZXN0dXJlLiRzbGlkZUVsLm9mZnNldCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICAgIGRpZmZYID0gb2Zmc2V0WCArIHNsaWRlV2lkdGggLyAyIC0gdG91Y2hYO1xuICAgICAgICAgIGRpZmZZID0gb2Zmc2V0WSArIHNsaWRlSGVpZ2h0IC8gMiAtIHRvdWNoWTtcbiAgICAgICAgICBpbWFnZVdpZHRoID0gZ2VzdHVyZS4kaW1hZ2VFbFswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICBpbWFnZUhlaWdodCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIHNjYWxlZFdpZHRoID0gaW1hZ2VXaWR0aCAqIHpvb20uc2NhbGU7XG4gICAgICAgICAgc2NhbGVkSGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKiB6b29tLnNjYWxlO1xuICAgICAgICAgIHRyYW5zbGF0ZU1pblggPSBNYXRoLm1pbihzbGlkZVdpZHRoIC8gMiAtIHNjYWxlZFdpZHRoIC8gMiwgMCk7XG4gICAgICAgICAgdHJhbnNsYXRlTWluWSA9IE1hdGgubWluKHNsaWRlSGVpZ2h0IC8gMiAtIHNjYWxlZEhlaWdodCAvIDIsIDApO1xuICAgICAgICAgIHRyYW5zbGF0ZU1heFggPSAtdHJhbnNsYXRlTWluWDtcbiAgICAgICAgICB0cmFuc2xhdGVNYXhZID0gLXRyYW5zbGF0ZU1pblk7XG4gICAgICAgICAgdHJhbnNsYXRlWCA9IGRpZmZYICogem9vbS5zY2FsZTtcbiAgICAgICAgICB0cmFuc2xhdGVZID0gZGlmZlkgKiB6b29tLnNjYWxlO1xuXG4gICAgICAgICAgaWYgKHRyYW5zbGF0ZVggPCB0cmFuc2xhdGVNaW5YKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYID0gdHJhbnNsYXRlTWluWDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHJhbnNsYXRlWCA+IHRyYW5zbGF0ZU1heFgpIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZVggPSB0cmFuc2xhdGVNYXhYO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0cmFuc2xhdGVZIDwgdHJhbnNsYXRlTWluWSkge1xuICAgICAgICAgICAgdHJhbnNsYXRlWSA9IHRyYW5zbGF0ZU1pblk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRyYW5zbGF0ZVkgPiB0cmFuc2xhdGVNYXhZKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVZID0gdHJhbnNsYXRlTWF4WTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJhbnNsYXRlWCA9IDA7XG4gICAgICAgICAgdHJhbnNsYXRlWSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgke3RyYW5zbGF0ZVh9cHgsICR7dHJhbnNsYXRlWX1weCwwKWApO1xuICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgke3pvb20uc2NhbGV9KWApO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB6b29tT3V0KCkge1xuICAgICAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcblxuICAgICAgICBpZiAoIWdlc3R1cmUuJHNsaWRlRWwpIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHN3aXBlci52aXJ0dWFsKSB7XG4gICAgICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzc31gKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsID0gZ2VzdHVyZS4kc2xpZGVFbC5maW5kKGAuJHtwYXJhbXMuY29udGFpbmVyQ2xhc3N9YCkuZXEoMCkuZmluZCgncGljdHVyZSwgaW1nLCBzdmcsIGNhbnZhcywgLnN3aXBlci16b29tLXRhcmdldCcpLmVxKDApO1xuICAgICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsID0gZ2VzdHVyZS4kaW1hZ2VFbC5wYXJlbnQoYC4ke3BhcmFtcy5jb250YWluZXJDbGFzc31gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCB8fCAhZ2VzdHVyZS4kaW1hZ2VXcmFwRWwgfHwgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnRvdWNoQWN0aW9uID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICB6b29tLnNjYWxlID0gMTtcbiAgICAgICAgY3VycmVudFNjYWxlID0gMTtcbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApJyk7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XG4gICAgICAgIGdlc3R1cmUuJHNsaWRlRWwucmVtb3ZlQ2xhc3MoYCR7cGFyYW1zLnpvb21lZFNsaWRlQ2xhc3N9YCk7XG4gICAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSB1bmRlZmluZWQ7XG4gICAgICB9IC8vIFRvZ2dsZSBab29tXG5cblxuICAgICAgZnVuY3Rpb24gem9vbVRvZ2dsZShlKSB7XG4gICAgICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcblxuICAgICAgICBpZiAoem9vbS5zY2FsZSAmJiB6b29tLnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgLy8gWm9vbSBPdXRcbiAgICAgICAgICB6b29tT3V0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gWm9vbSBJblxuICAgICAgICAgIHpvb21JbihlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnQgPSBzd2lwZXIuc3VwcG9ydDtcbiAgICAgICAgY29uc3QgcGFzc2l2ZUxpc3RlbmVyID0gc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgc3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgc3dpcGVyLnBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge1xuICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgICAgY2FwdHVyZTogZmFsc2VcbiAgICAgICAgfSA6IGZhbHNlO1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ZW5lcldpdGhDYXB0dXJlID0gc3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgPyB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgICAgICB9IDogdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwYXNzaXZlTGlzdGVuZXIsXG4gICAgICAgICAgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRTbGlkZVNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0b2dnbGVHZXN0dXJlcyhtZXRob2QpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhc3NpdmVMaXN0ZW5lclxuICAgICAgICB9ID0gZ2V0TGlzdGVuZXJzKCk7XG4gICAgICAgIGNvbnN0IHNsaWRlU2VsZWN0b3IgPSBnZXRTbGlkZVNlbGVjdG9yKCk7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsW21ldGhvZF0oJ2dlc3R1cmVzdGFydCcsIHNsaWRlU2VsZWN0b3IsIG9uR2VzdHVyZVN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFttZXRob2RdKCdnZXN0dXJlY2hhbmdlJywgc2xpZGVTZWxlY3Rvciwgb25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFttZXRob2RdKCdnZXN0dXJlZW5kJywgc2xpZGVTZWxlY3Rvciwgb25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlbmFibGVHZXN0dXJlcygpIHtcbiAgICAgICAgaWYgKGdlc3R1cmVzRW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBnZXN0dXJlc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0b2dnbGVHZXN0dXJlcygnb24nKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGlzYWJsZUdlc3R1cmVzKCkge1xuICAgICAgICBpZiAoIWdlc3R1cmVzRW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBnZXN0dXJlc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdG9nZ2xlR2VzdHVyZXMoJ29mZicpO1xuICAgICAgfSAvLyBBdHRhY2gvRGV0YWNoIEV2ZW50c1xuXG5cbiAgICAgIGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgY29uc3Qgem9vbSA9IHN3aXBlci56b29tO1xuICAgICAgICBpZiAoem9vbS5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHpvb20uZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHN1cHBvcnQgPSBzd2lwZXIuc3VwcG9ydDtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhc3NpdmVMaXN0ZW5lcixcbiAgICAgICAgICBhY3RpdmVMaXN0ZW5lcldpdGhDYXB0dXJlXG4gICAgICAgIH0gPSBnZXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgY29uc3Qgc2xpZGVTZWxlY3RvciA9IGdldFNsaWRlU2VsZWN0b3IoKTsgLy8gU2NhbGUgaW1hZ2VcblxuICAgICAgICBpZiAoc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCwgZW5hYmxlR2VzdHVyZXMsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLmVuZCwgZGlzYWJsZUdlc3R1cmVzLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0LCBzbGlkZVNlbGVjdG9yLCBvbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgc2xpZGVTZWxlY3Rvciwgb25HZXN0dXJlQ2hhbmdlLCBhY3RpdmVMaXN0ZW5lcldpdGhDYXB0dXJlKTtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMuZW5kLCBzbGlkZVNlbGVjdG9yLCBvbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnRvdWNoRXZlbnRzLmNhbmNlbCkge1xuICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLmNhbmNlbCwgc2xpZGVTZWxlY3Rvciwgb25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBNb3ZlIGltYWdlXG5cblxuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgYC4ke3N3aXBlci5wYXJhbXMuem9vbS5jb250YWluZXJDbGFzc31gLCBvblRvdWNoTW92ZSwgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICAgICAgaWYgKCF6b29tLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qgc3VwcG9ydCA9IHN3aXBlci5zdXBwb3J0O1xuICAgICAgICB6b29tLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhc3NpdmVMaXN0ZW5lcixcbiAgICAgICAgICBhY3RpdmVMaXN0ZW5lcldpdGhDYXB0dXJlXG4gICAgICAgIH0gPSBnZXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgY29uc3Qgc2xpZGVTZWxlY3RvciA9IGdldFNsaWRlU2VsZWN0b3IoKTsgLy8gU2NhbGUgaW1hZ2VcblxuICAgICAgICBpZiAoc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZihzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQsIGVuYWJsZUdlc3R1cmVzLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZihzd2lwZXIudG91Y2hFdmVudHMuZW5kLCBkaXNhYmxlR2VzdHVyZXMsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcpIHtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0LCBzbGlkZVNlbGVjdG9yLCBvbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLm1vdmUsIHNsaWRlU2VsZWN0b3IsIG9uR2VzdHVyZUNoYW5nZSwgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZSk7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5lbmQsIHNsaWRlU2VsZWN0b3IsIG9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcblxuICAgICAgICAgIGlmIChzd2lwZXIudG91Y2hFdmVudHMuY2FuY2VsKSB7XG4gICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLmNhbmNlbCwgc2xpZGVTZWxlY3Rvciwgb25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBNb3ZlIGltYWdlXG5cblxuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLm1vdmUsIGAuJHtzd2lwZXIucGFyYW1zLnpvb20uY29udGFpbmVyQ2xhc3N9YCwgb25Ub3VjaE1vdmUsIGFjdGl2ZUxpc3RlbmVyV2l0aENhcHR1cmUpO1xuICAgICAgfVxuXG4gICAgICBvbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuem9vbS5lbmFibGVkKSB7XG4gICAgICAgICAgZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGRpc2FibGUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3RvdWNoU3RhcnQnLCAoX3MsIGUpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIuem9vbS5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIG9uVG91Y2hTdGFydChlKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3RvdWNoRW5kJywgKF9zLCBlKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnpvb20uZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBvblRvdWNoRW5kKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdkb3VibGVUYXAnLCAoX3MsIGUpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nICYmIHN3aXBlci5wYXJhbXMuem9vbS5lbmFibGVkICYmIHN3aXBlci56b29tLmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy56b29tLnRvZ2dsZSkge1xuICAgICAgICAgIHpvb21Ub2dnbGUoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3RyYW5zaXRpb25FbmQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIuem9vbS5lbmFibGVkICYmIHN3aXBlci5wYXJhbXMuem9vbS5lbmFibGVkKSB7XG4gICAgICAgICAgb25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3NsaWRlQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBvblRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlci56b29tLCB7XG4gICAgICAgIGVuYWJsZSxcbiAgICAgICAgZGlzYWJsZSxcbiAgICAgICAgaW46IHpvb21JbixcbiAgICAgICAgb3V0OiB6b29tT3V0LFxuICAgICAgICB0b2dnbGU6IHpvb21Ub2dnbGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIExhenkoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGxhenk6IHtcbiAgICAgICAgICBjaGVja0luVmlldzogZmFsc2UsXG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgbG9hZFByZXZOZXh0OiBmYWxzZSxcbiAgICAgICAgICBsb2FkUHJldk5leHRBbW91bnQ6IDEsXG4gICAgICAgICAgbG9hZE9uVHJhbnNpdGlvblN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICBzY3JvbGxpbmdFbGVtZW50OiAnJyxcbiAgICAgICAgICBlbGVtZW50Q2xhc3M6ICdzd2lwZXItbGF6eScsXG4gICAgICAgICAgbG9hZGluZ0NsYXNzOiAnc3dpcGVyLWxhenktbG9hZGluZycsXG4gICAgICAgICAgbG9hZGVkQ2xhc3M6ICdzd2lwZXItbGF6eS1sb2FkZWQnLFxuICAgICAgICAgIHByZWxvYWRlckNsYXNzOiAnc3dpcGVyLWxhenktcHJlbG9hZGVyJ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci5sYXp5ID0ge307XG4gICAgICBsZXQgc2Nyb2xsSGFuZGxlckF0dGFjaGVkID0gZmFsc2U7XG4gICAgICBsZXQgaW5pdGlhbEltYWdlTG9hZGVkID0gZmFsc2U7XG5cbiAgICAgIGZ1bmN0aW9uIGxvYWRJblNsaWRlKGluZGV4LCBsb2FkSW5EdXBsaWNhdGUpIHtcbiAgICAgICAgaWYgKGxvYWRJbkR1cGxpY2F0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgbG9hZEluRHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubGF6eTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgaWYgKHN3aXBlci5zbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgICAgICBjb25zdCAkc2xpZGVFbCA9IGlzVmlydHVhbCA/IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtpbmRleH1cIl1gKSA6IHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpO1xuICAgICAgICBjb25zdCAkaW1hZ2VzID0gJHNsaWRlRWwuZmluZChgLiR7cGFyYW1zLmVsZW1lbnRDbGFzc306bm90KC4ke3BhcmFtcy5sb2FkZWRDbGFzc30pOm5vdCguJHtwYXJhbXMubG9hZGluZ0NsYXNzfSlgKTtcblxuICAgICAgICBpZiAoJHNsaWRlRWwuaGFzQ2xhc3MocGFyYW1zLmVsZW1lbnRDbGFzcykgJiYgISRzbGlkZUVsLmhhc0NsYXNzKHBhcmFtcy5sb2FkZWRDbGFzcykgJiYgISRzbGlkZUVsLmhhc0NsYXNzKHBhcmFtcy5sb2FkaW5nQ2xhc3MpKSB7XG4gICAgICAgICAgJGltYWdlcy5wdXNoKCRzbGlkZUVsWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW1hZ2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAkaW1hZ2VzLmVhY2goaW1hZ2VFbCA9PiB7XG4gICAgICAgICAgY29uc3QgJGltYWdlRWwgPSAkKGltYWdlRWwpO1xuICAgICAgICAgICRpbWFnZUVsLmFkZENsYXNzKHBhcmFtcy5sb2FkaW5nQ2xhc3MpO1xuICAgICAgICAgIGNvbnN0IGJhY2tncm91bmQgPSAkaW1hZ2VFbC5hdHRyKCdkYXRhLWJhY2tncm91bmQnKTtcbiAgICAgICAgICBjb25zdCBzcmMgPSAkaW1hZ2VFbC5hdHRyKCdkYXRhLXNyYycpO1xuICAgICAgICAgIGNvbnN0IHNyY3NldCA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgY29uc3Qgc2l6ZXMgPSAkaW1hZ2VFbC5hdHRyKCdkYXRhLXNpemVzJyk7XG4gICAgICAgICAgY29uc3QgJHBpY3R1cmVFbCA9ICRpbWFnZUVsLnBhcmVudCgncGljdHVyZScpO1xuICAgICAgICAgIHN3aXBlci5sb2FkSW1hZ2UoJGltYWdlRWxbMF0sIHNyYyB8fCBiYWNrZ3JvdW5kLCBzcmNzZXQsIHNpemVzLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzd2lwZXIgPT09ICd1bmRlZmluZWQnIHx8IHN3aXBlciA9PT0gbnVsbCB8fCAhc3dpcGVyIHx8IHN3aXBlciAmJiAhc3dpcGVyLnBhcmFtcyB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICAgICRpbWFnZUVsLmNzcygnYmFja2dyb3VuZC1pbWFnZScsIGB1cmwoXCIke2JhY2tncm91bmR9XCIpYCk7XG4gICAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtYmFja2dyb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHNyY3NldCkge1xuICAgICAgICAgICAgICAgICRpbWFnZUVsLmF0dHIoJ3NyY3NldCcsIHNyY3NldCk7XG4gICAgICAgICAgICAgICAgJGltYWdlRWwucmVtb3ZlQXR0cignZGF0YS1zcmNzZXQnKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChzaXplcykge1xuICAgICAgICAgICAgICAgICRpbWFnZUVsLmF0dHIoJ3NpemVzJywgc2l6ZXMpO1xuICAgICAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtc2l6ZXMnKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICgkcGljdHVyZUVsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRwaWN0dXJlRWwuY2hpbGRyZW4oJ3NvdXJjZScpLmVhY2goc291cmNlRWwgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgJHNvdXJjZSA9ICQoc291cmNlRWwpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoJHNvdXJjZS5hdHRyKCdkYXRhLXNyY3NldCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzb3VyY2UuYXR0cignc3Jjc2V0JywgJHNvdXJjZS5hdHRyKCdkYXRhLXNyY3NldCcpKTtcbiAgICAgICAgICAgICAgICAgICAgJHNvdXJjZS5yZW1vdmVBdHRyKCdkYXRhLXNyY3NldCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICAgICRpbWFnZUVsLmF0dHIoJ3NyYycsIHNyYyk7XG4gICAgICAgICAgICAgICAgJGltYWdlRWwucmVtb3ZlQXR0cignZGF0YS1zcmMnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkaW1hZ2VFbC5hZGRDbGFzcyhwYXJhbXMubG9hZGVkQ2xhc3MpLnJlbW92ZUNsYXNzKHBhcmFtcy5sb2FkaW5nQ2xhc3MpO1xuICAgICAgICAgICAgJHNsaWRlRWwuZmluZChgLiR7cGFyYW1zLnByZWxvYWRlckNsYXNzfWApLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wICYmIGxvYWRJbkR1cGxpY2F0ZSkge1xuICAgICAgICAgICAgICBjb25zdCBzbGlkZU9yaWdpbmFsSW5kZXggPSAkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuXG4gICAgICAgICAgICAgIGlmICgkc2xpZGVFbC5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3NsaWRlT3JpZ2luYWxJbmRleH1cIl06bm90KC4ke3N3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc30pYCk7XG4gICAgICAgICAgICAgICAgbG9hZEluU2xpZGUob3JpZ2luYWxTbGlkZS5pbmRleCgpLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHVwbGljYXRlZFNsaWRlID0gc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3NsaWRlT3JpZ2luYWxJbmRleH1cIl1gKTtcbiAgICAgICAgICAgICAgICBsb2FkSW5TbGlkZShkdXBsaWNhdGVkU2xpZGUuaW5kZXgoKSwgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVtaXQoJ2xhenlJbWFnZVJlYWR5JywgJHNsaWRlRWxbMF0sICRpbWFnZUVsWzBdKTtcblxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVtaXQoJ2xhenlJbWFnZUxvYWQnLCAkc2xpZGVFbFswXSwgJGltYWdlRWxbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICR3cmFwcGVyRWwsXG4gICAgICAgICAgcGFyYW1zOiBzd2lwZXJQYXJhbXMsXG4gICAgICAgICAgc2xpZGVzLFxuICAgICAgICAgIGFjdGl2ZUluZGV4XG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlclBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlclBhcmFtcy5sYXp5O1xuICAgICAgICBsZXQgc2xpZGVzUGVyVmlldyA9IHN3aXBlclBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuXG4gICAgICAgIGlmIChzbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlRXhpc3QoaW5kZXgpIHtcbiAgICAgICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgICAgICBpZiAoJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyUGFyYW1zLnNsaWRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtpbmRleH1cIl1gKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZXNbaW5kZXhdKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlSW5kZXgoc2xpZGVFbCkge1xuICAgICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHNsaWRlRWwpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICQoc2xpZGVFbCkuaW5kZXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaW5pdGlhbEltYWdlTG9hZGVkKSBpbml0aWFsSW1hZ2VMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXJQYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3N9YCkuZWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gaXNWaXJ0dWFsID8gJChzbGlkZUVsKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpIDogJChzbGlkZUVsKS5pbmRleCgpO1xuICAgICAgICAgICAgbG9hZEluU2xpZGUoaW5kZXgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlc1BlclZpZXcgPiAxKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4OyBpIDwgYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChzbGlkZUV4aXN0KGkpKSBsb2FkSW5TbGlkZShpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9hZEluU2xpZGUoYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy5sb2FkUHJldk5leHQpIHtcbiAgICAgICAgICBpZiAoc2xpZGVzUGVyVmlldyA+IDEgfHwgcGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudCAmJiBwYXJhbXMubG9hZFByZXZOZXh0QW1vdW50ID4gMSkge1xuICAgICAgICAgICAgY29uc3QgYW1vdW50ID0gcGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudDtcbiAgICAgICAgICAgIGNvbnN0IHNwdiA9IE1hdGguY2VpbChzbGlkZXNQZXJWaWV3KTtcbiAgICAgICAgICAgIGNvbnN0IG1heEluZGV4ID0gTWF0aC5taW4oYWN0aXZlSW5kZXggKyBzcHYgKyBNYXRoLm1heChhbW91bnQsIHNwdiksIHNsaWRlcy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgbWluSW5kZXggPSBNYXRoLm1heChhY3RpdmVJbmRleCAtIE1hdGgubWF4KHNwdiwgYW1vdW50KSwgMCk7IC8vIE5leHQgU2xpZGVzXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCArIHNwdjsgaSA8IG1heEluZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlRXhpc3QoaSkpIGxvYWRJblNsaWRlKGkpO1xuICAgICAgICAgICAgfSAvLyBQcmV2IFNsaWRlc1xuXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBtaW5JbmRleDsgaSA8IGFjdGl2ZUluZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlRXhpc3QoaSkpIGxvYWRJblNsaWRlKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2xpZGUgPSAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXJQYXJhbXMuc2xpZGVOZXh0Q2xhc3N9YCk7XG4gICAgICAgICAgICBpZiAobmV4dFNsaWRlLmxlbmd0aCA+IDApIGxvYWRJblNsaWRlKHNsaWRlSW5kZXgobmV4dFNsaWRlKSk7XG4gICAgICAgICAgICBjb25zdCBwcmV2U2xpZGUgPSAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXJQYXJhbXMuc2xpZGVQcmV2Q2xhc3N9YCk7XG4gICAgICAgICAgICBpZiAocHJldlNsaWRlLmxlbmd0aCA+IDApIGxvYWRJblNsaWRlKHNsaWRlSW5kZXgocHJldlNsaWRlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrSW5WaWV3T25Mb2FkKCkge1xuICAgICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICBjb25zdCAkc2Nyb2xsRWxlbWVudCA9IHN3aXBlci5wYXJhbXMubGF6eS5zY3JvbGxpbmdFbGVtZW50ID8gJChzd2lwZXIucGFyYW1zLmxhenkuc2Nyb2xsaW5nRWxlbWVudCkgOiAkKHdpbmRvdyk7XG4gICAgICAgIGNvbnN0IGlzV2luZG93ID0gJHNjcm9sbEVsZW1lbnRbMF0gPT09IHdpbmRvdztcbiAgICAgICAgY29uc3Qgc2Nyb2xsRWxlbWVudFdpZHRoID0gaXNXaW5kb3cgPyB3aW5kb3cuaW5uZXJXaWR0aCA6ICRzY3JvbGxFbGVtZW50WzBdLm9mZnNldFdpZHRoO1xuICAgICAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gaXNXaW5kb3cgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkc2Nyb2xsRWxlbWVudFswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHN3aXBlck9mZnNldCA9IHN3aXBlci4kZWwub2Zmc2V0KCk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBydGxUcmFuc2xhdGU6IHJ0bFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBsZXQgaW5WaWV3ID0gZmFsc2U7XG4gICAgICAgIGlmIChydGwpIHN3aXBlck9mZnNldC5sZWZ0IC09IHN3aXBlci4kZWxbMF0uc2Nyb2xsTGVmdDtcbiAgICAgICAgY29uc3Qgc3dpcGVyQ29vcmQgPSBbW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wXSwgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wXSwgW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wICsgc3dpcGVyLmhlaWdodF0sIFtzd2lwZXJPZmZzZXQubGVmdCArIHN3aXBlci53aWR0aCwgc3dpcGVyT2Zmc2V0LnRvcCArIHN3aXBlci5oZWlnaHRdXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlckNvb3JkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgcG9pbnQgPSBzd2lwZXJDb29yZFtpXTtcblxuICAgICAgICAgIGlmIChwb2ludFswXSA+PSAwICYmIHBvaW50WzBdIDw9IHNjcm9sbEVsZW1lbnRXaWR0aCAmJiBwb2ludFsxXSA+PSAwICYmIHBvaW50WzFdIDw9IHNjcm9sbEVsZW1lbnRIZWlnaHQpIHtcbiAgICAgICAgICAgIGlmIChwb2ludFswXSA9PT0gMCAmJiBwb2ludFsxXSA9PT0gMCkgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgICAgICAgaW5WaWV3ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXNzaXZlTGlzdGVuZXIgPSBzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0JyAmJiBzd2lwZXIuc3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgc3dpcGVyLnBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge1xuICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgICAgY2FwdHVyZTogZmFsc2VcbiAgICAgICAgfSA6IGZhbHNlO1xuXG4gICAgICAgIGlmIChpblZpZXcpIHtcbiAgICAgICAgICBsb2FkKCk7XG4gICAgICAgICAgJHNjcm9sbEVsZW1lbnQub2ZmKCdzY3JvbGwnLCBjaGVja0luVmlld09uTG9hZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgfSBlbHNlIGlmICghc2Nyb2xsSGFuZGxlckF0dGFjaGVkKSB7XG4gICAgICAgICAgc2Nyb2xsSGFuZGxlckF0dGFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAkc2Nyb2xsRWxlbWVudC5vbignc2Nyb2xsJywgY2hlY2tJblZpZXdPbkxvYWQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb24oJ2JlZm9yZUluaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnByZWxvYWRJbWFnZXMpIHtcbiAgICAgICAgICBzd2lwZXIucGFyYW1zLnByZWxvYWRJbWFnZXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5jaGVja0luVmlldykge1xuICAgICAgICAgICAgY2hlY2tJblZpZXdPbkxvYWQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiBzd2lwZXIucGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgIXN3aXBlci5wYXJhbXMuZnJlZU1vZGUuc3RpY2t5KSB7XG4gICAgICAgICAgbG9hZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdzY3JvbGxiYXJEcmFnTW92ZSByZXNpemUgX2ZyZWVNb2RlTm9Nb21lbnR1bVJlbGVhc2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuY2hlY2tJblZpZXcpIHtcbiAgICAgICAgICAgIGNoZWNrSW5WaWV3T25Mb2FkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3RyYW5zaXRpb25TdGFydCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5sb2FkT25UcmFuc2l0aW9uU3RhcnQgfHwgIXN3aXBlci5wYXJhbXMubGF6eS5sb2FkT25UcmFuc2l0aW9uU3RhcnQgJiYgIWluaXRpYWxJbWFnZUxvYWRlZCkge1xuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5jaGVja0luVmlldykge1xuICAgICAgICAgICAgICBjaGVja0luVmlld09uTG9hZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbigndHJhbnNpdGlvbkVuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkICYmICFzd2lwZXIucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0KSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5jaGVja0luVmlldykge1xuICAgICAgICAgICAgY2hlY2tJblZpZXdPbkxvYWQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc2xpZGVDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBsYXp5LFxuICAgICAgICAgIGNzc01vZGUsXG4gICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzcyxcbiAgICAgICAgICB0b3VjaFJlbGVhc2VPbkVkZ2VzLFxuICAgICAgICAgIHJlc2lzdGFuY2VSYXRpb1xuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcztcblxuICAgICAgICBpZiAobGF6eS5lbmFibGVkICYmIChjc3NNb2RlIHx8IHdhdGNoU2xpZGVzUHJvZ3Jlc3MgJiYgKHRvdWNoUmVsZWFzZU9uRWRnZXMgfHwgcmVzaXN0YW5jZVJhdGlvID09PSAwKSkpIHtcbiAgICAgICAgICBsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLiRlbCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuJGVsLmZpbmQoYC4ke3N3aXBlci5wYXJhbXMubGF6eS5sb2FkaW5nQ2xhc3N9YCkucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5sYXp5LmxvYWRpbmdDbGFzcyk7XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLmxhenksIHtcbiAgICAgICAgbG9hZCxcbiAgICAgICAgbG9hZEluU2xpZGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIGVzbGludCBuby1iaXR3aXNlOiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiPj5cIl0gfV0gKi9cbiAgICBmdW5jdGlvbiBDb250cm9sbGVyKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvblxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBjb250cm9sbGVyOiB7XG4gICAgICAgICAgY29udHJvbDogdW5kZWZpbmVkLFxuICAgICAgICAgIGludmVyc2U6IGZhbHNlLFxuICAgICAgICAgIGJ5OiAnc2xpZGUnIC8vIG9yICdjb250YWluZXInXG5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzd2lwZXIuY29udHJvbGxlciA9IHtcbiAgICAgICAgY29udHJvbDogdW5kZWZpbmVkXG4gICAgICB9O1xuXG4gICAgICBmdW5jdGlvbiBMaW5lYXJTcGxpbmUoeCwgeSkge1xuICAgICAgICBjb25zdCBiaW5hcnlTZWFyY2ggPSBmdW5jdGlvbiBzZWFyY2goKSB7XG4gICAgICAgICAgbGV0IG1heEluZGV4O1xuICAgICAgICAgIGxldCBtaW5JbmRleDtcbiAgICAgICAgICBsZXQgZ3Vlc3M7XG4gICAgICAgICAgcmV0dXJuIChhcnJheSwgdmFsKSA9PiB7XG4gICAgICAgICAgICBtaW5JbmRleCA9IC0xO1xuICAgICAgICAgICAgbWF4SW5kZXggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgICAgICAgIHdoaWxlIChtYXhJbmRleCAtIG1pbkluZGV4ID4gMSkge1xuICAgICAgICAgICAgICBndWVzcyA9IG1heEluZGV4ICsgbWluSW5kZXggPj4gMTtcblxuICAgICAgICAgICAgICBpZiAoYXJyYXlbZ3Vlc3NdIDw9IHZhbCkge1xuICAgICAgICAgICAgICAgIG1pbkluZGV4ID0gZ3Vlc3M7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF4SW5kZXggPSBndWVzcztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWF4SW5kZXg7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSgpO1xuXG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMubGFzdEluZGV4ID0geC5sZW5ndGggLSAxOyAvLyBHaXZlbiBhbiB4IHZhbHVlICh4MiksIHJldHVybiB0aGUgZXhwZWN0ZWQgeTIgdmFsdWU6XG4gICAgICAgIC8vICh4MSx5MSkgaXMgdGhlIGtub3duIHBvaW50IGJlZm9yZSBnaXZlbiB2YWx1ZSxcbiAgICAgICAgLy8gKHgzLHkzKSBpcyB0aGUga25vd24gcG9pbnQgYWZ0ZXIgZ2l2ZW4gdmFsdWUuXG5cbiAgICAgICAgbGV0IGkxO1xuICAgICAgICBsZXQgaTM7XG5cbiAgICAgICAgdGhpcy5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uIGludGVycG9sYXRlKHgyKSB7XG4gICAgICAgICAgaWYgKCF4MikgcmV0dXJuIDA7IC8vIEdldCB0aGUgaW5kZXhlcyBvZiB4MSBhbmQgeDMgKHRoZSBhcnJheSBpbmRleGVzIGJlZm9yZSBhbmQgYWZ0ZXIgZ2l2ZW4geDIpOlxuXG4gICAgICAgICAgaTMgPSBiaW5hcnlTZWFyY2godGhpcy54LCB4Mik7XG4gICAgICAgICAgaTEgPSBpMyAtIDE7IC8vIFdlIGhhdmUgb3VyIGluZGV4ZXMgaTEgJiBpMywgc28gd2UgY2FuIGNhbGN1bGF0ZSBhbHJlYWR5OlxuICAgICAgICAgIC8vIHkyIDo9ICgoeDLiiJJ4MSkgw5cgKHkz4oiSeTEpKSDDtyAoeDPiiJJ4MSkgKyB5MVxuXG4gICAgICAgICAgcmV0dXJuICh4MiAtIHRoaXMueFtpMV0pICogKHRoaXMueVtpM10gLSB0aGlzLnlbaTFdKSAvICh0aGlzLnhbaTNdIC0gdGhpcy54W2kxXSkgKyB0aGlzLnlbaTFdO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSAvLyB4eHg6IGZvciBub3cgaSB3aWxsIGp1c3Qgc2F2ZSBvbmUgc3BsaW5lIGZ1bmN0aW9uIHRvIHRvXG5cblxuICAgICAgZnVuY3Rpb24gZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbihjKSB7XG4gICAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lKSB7XG4gICAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lID0gc3dpcGVyLnBhcmFtcy5sb29wID8gbmV3IExpbmVhclNwbGluZShzd2lwZXIuc2xpZGVzR3JpZCwgYy5zbGlkZXNHcmlkKSA6IG5ldyBMaW5lYXJTcGxpbmUoc3dpcGVyLnNuYXBHcmlkLCBjLnNuYXBHcmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoX3QsIGJ5Q29udHJvbGxlcikge1xuICAgICAgICBjb25zdCBjb250cm9sbGVkID0gc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbDtcbiAgICAgICAgbGV0IG11bHRpcGxpZXI7XG4gICAgICAgIGxldCBjb250cm9sbGVkVHJhbnNsYXRlO1xuICAgICAgICBjb25zdCBTd2lwZXIgPSBzd2lwZXIuY29uc3RydWN0b3I7XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjKSB7XG4gICAgICAgICAgLy8gdGhpcyB3aWxsIGNyZWF0ZSBhbiBJbnRlcnBvbGF0ZSBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgc25hcEdyaWRzXG4gICAgICAgICAgLy8geCBpcyB0aGUgR3JpZCBvZiB0aGUgc2Nyb2xsZWQgc2Nyb2xsZXIgYW5kIHkgd2lsbCBiZSB0aGUgY29udHJvbGxlZCBzY3JvbGxlclxuICAgICAgICAgIC8vIGl0IG1ha2VzIHNlbnNlIHRvIGNyZWF0ZSB0aGlzIG9ubHkgb25jZSBhbmQgcmVjYWxsIGl0IGZvciB0aGUgaW50ZXJwb2xhdGlvblxuICAgICAgICAgIC8vIHRoZSBmdW5jdGlvbiBkb2VzIGEgbG90IG9mIHZhbHVlIGNhY2hpbmcgZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IC1zd2lwZXIudHJhbnNsYXRlIDogc3dpcGVyLnRyYW5zbGF0ZTtcblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNvbnRyb2xsZXIuYnkgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgIGdldEludGVycG9sYXRlRnVuY3Rpb24oYyk7IC8vIGkgYW0gbm90IHN1cmUgd2h5IHRoZSB2YWx1ZXMgaGF2ZSB0byBiZSBtdWx0aXBsaWNhdGVkIHRoaXMgd2F5LCB0cmllZCB0byBpbnZlcnQgdGhlIHNuYXBHcmlkXG4gICAgICAgICAgICAvLyBidXQgaXQgZGlkIG5vdCB3b3JrIG91dFxuXG4gICAgICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gLXN3aXBlci5jb250cm9sbGVyLnNwbGluZS5pbnRlcnBvbGF0ZSgtdHJhbnNsYXRlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWNvbnRyb2xsZWRUcmFuc2xhdGUgfHwgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnY29udGFpbmVyJykge1xuICAgICAgICAgICAgbXVsdGlwbGllciA9IChjLm1heFRyYW5zbGF0ZSgpIC0gYy5taW5UcmFuc2xhdGUoKSkgLyAoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgICAgIGNvbnRyb2xsZWRUcmFuc2xhdGUgPSAodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAqIG11bHRpcGxpZXIgKyBjLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNvbnRyb2xsZXIuaW52ZXJzZSkge1xuICAgICAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9IGMubWF4VHJhbnNsYXRlKCkgLSBjb250cm9sbGVkVHJhbnNsYXRlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGMudXBkYXRlUHJvZ3Jlc3MoY29udHJvbGxlZFRyYW5zbGF0ZSk7XG4gICAgICAgICAgYy5zZXRUcmFuc2xhdGUoY29udHJvbGxlZFRyYW5zbGF0ZSwgc3dpcGVyKTtcbiAgICAgICAgICBjLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgYy51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb250cm9sbGVkKSkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udHJvbGxlZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgICAgIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoY29udHJvbGxlZFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xsZWQgaW5zdGFuY2VvZiBTd2lwZXIgJiYgYnlDb250cm9sbGVyICE9PSBjb250cm9sbGVkKSB7XG4gICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjb250cm9sbGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgICAgY29uc3QgU3dpcGVyID0gc3dpcGVyLmNvbnN0cnVjdG9yO1xuICAgICAgICBjb25zdCBjb250cm9sbGVkID0gc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbDtcbiAgICAgICAgbGV0IGk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oYykge1xuICAgICAgICAgIGMuc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgc3dpcGVyKTtcblxuICAgICAgICAgIGlmIChkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgYy50cmFuc2l0aW9uU3RhcnQoKTtcblxuICAgICAgICAgICAgaWYgKGMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGMudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYy4kd3JhcHBlckVsLnRyYW5zaXRpb25FbmQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWNvbnRyb2xsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICBpZiAoYy5wYXJhbXMubG9vcCAmJiBzd2lwZXIucGFyYW1zLmNvbnRyb2xsZXIuYnkgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICBjLmxvb3BGaXgoKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGMudHJhbnNpdGlvbkVuZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29udHJvbGxlZCkpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29udHJvbGxlZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgICAgIHNldENvbnRyb2xsZWRUcmFuc2l0aW9uKGNvbnRyb2xsZWRbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb250cm9sbGVkIGluc3RhbmNlb2YgU3dpcGVyICYmIGJ5Q29udHJvbGxlciAhPT0gY29udHJvbGxlZCkge1xuICAgICAgICAgIHNldENvbnRyb2xsZWRUcmFuc2l0aW9uKGNvbnRyb2xsZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZVNwbGluZSgpIHtcbiAgICAgICAgaWYgKCFzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHN3aXBlci5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICAgIHN3aXBlci5jb250cm9sbGVyLnNwbGluZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uKCdiZWZvcmVJbml0JywgKCkgPT4ge1xuICAgICAgICBzd2lwZXIuY29udHJvbGxlci5jb250cm9sID0gc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmNvbnRyb2w7XG4gICAgICB9KTtcbiAgICAgIG9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgICAgIHJlbW92ZVNwbGluZSgpO1xuICAgICAgfSk7XG4gICAgICBvbigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICByZW1vdmVTcGxpbmUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ29ic2VydmVyVXBkYXRlJywgKCkgPT4ge1xuICAgICAgICByZW1vdmVTcGxpbmUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3NldFRyYW5zbGF0ZScsIChfcywgdHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5jb250cm9sbGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIGJ5Q29udHJvbGxlcik7XG4gICAgICB9KTtcbiAgICAgIG9uKCdzZXRUcmFuc2l0aW9uJywgKF9zLCBkdXJhdGlvbiwgYnlDb250cm9sbGVyKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuY29udHJvbGxlci5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpO1xuICAgICAgfSk7XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlci5jb250cm9sbGVyLCB7XG4gICAgICAgIHNldFRyYW5zbGF0ZSxcbiAgICAgICAgc2V0VHJhbnNpdGlvblxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gQTExeShfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgYTExeToge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdzd2lwZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICBwcmV2U2xpZGVNZXNzYWdlOiAnUHJldmlvdXMgc2xpZGUnLFxuICAgICAgICAgIG5leHRTbGlkZU1lc3NhZ2U6ICdOZXh0IHNsaWRlJyxcbiAgICAgICAgICBmaXJzdFNsaWRlTWVzc2FnZTogJ1RoaXMgaXMgdGhlIGZpcnN0IHNsaWRlJyxcbiAgICAgICAgICBsYXN0U2xpZGVNZXNzYWdlOiAnVGhpcyBpcyB0aGUgbGFzdCBzbGlkZScsXG4gICAgICAgICAgcGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2U6ICdHbyB0byBzbGlkZSB7e2luZGV4fX0nLFxuICAgICAgICAgIHNsaWRlTGFiZWxNZXNzYWdlOiAne3tpbmRleH19IC8ge3tzbGlkZXNMZW5ndGh9fScsXG4gICAgICAgICAgY29udGFpbmVyTWVzc2FnZTogbnVsbCxcbiAgICAgICAgICBjb250YWluZXJSb2xlRGVzY3JpcHRpb25NZXNzYWdlOiBudWxsLFxuICAgICAgICAgIGl0ZW1Sb2xlRGVzY3JpcHRpb25NZXNzYWdlOiBudWxsLFxuICAgICAgICAgIHNsaWRlUm9sZTogJ2dyb3VwJyxcbiAgICAgICAgICBpZDogbnVsbFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci5hMTF5ID0ge1xuICAgICAgICBjbGlja2VkOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIGxldCBsaXZlUmVnaW9uID0gbnVsbDtcblxuICAgICAgZnVuY3Rpb24gbm90aWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbGl2ZVJlZ2lvbjtcbiAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgbm90aWZpY2F0aW9uLmh0bWwoJycpO1xuICAgICAgICBub3RpZmljYXRpb24uaHRtbChtZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tTnVtYmVyKHNpemUpIHtcbiAgICAgICAgaWYgKHNpemUgPT09IHZvaWQgMCkge1xuICAgICAgICAgIHNpemUgPSAxNjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJhbmRvbUNoYXIgPSAoKSA9PiBNYXRoLnJvdW5kKDE2ICogTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoMTYpO1xuXG4gICAgICAgIHJldHVybiAneCcucmVwZWF0KHNpemUpLnJlcGxhY2UoL3gvZywgcmFuZG9tQ2hhcik7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1ha2VFbEZvY3VzYWJsZSgkZWwpIHtcbiAgICAgICAgJGVsLmF0dHIoJ3RhYkluZGV4JywgJzAnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbWFrZUVsTm90Rm9jdXNhYmxlKCRlbCkge1xuICAgICAgICAkZWwuYXR0cigndGFiSW5kZXgnLCAnLTEnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkRWxSb2xlKCRlbCwgcm9sZSkge1xuICAgICAgICAkZWwuYXR0cigncm9sZScsIHJvbGUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRFbFJvbGVEZXNjcmlwdGlvbigkZWwsIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICRlbC5hdHRyKCdhcmlhLXJvbGVkZXNjcmlwdGlvbicsIGRlc2NyaXB0aW9uKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkRWxDb250cm9scygkZWwsIGNvbnRyb2xzKSB7XG4gICAgICAgICRlbC5hdHRyKCdhcmlhLWNvbnRyb2xzJywgY29udHJvbHMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRFbExhYmVsKCRlbCwgbGFiZWwpIHtcbiAgICAgICAgJGVsLmF0dHIoJ2FyaWEtbGFiZWwnLCBsYWJlbCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZEVsSWQoJGVsLCBpZCkge1xuICAgICAgICAkZWwuYXR0cignaWQnLCBpZCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZEVsTGl2ZSgkZWwsIGxpdmUpIHtcbiAgICAgICAgJGVsLmF0dHIoJ2FyaWEtbGl2ZScsIGxpdmUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkaXNhYmxlRWwoJGVsKSB7XG4gICAgICAgICRlbC5hdHRyKCdhcmlhLWRpc2FibGVkJywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGVuYWJsZUVsKCRlbCkge1xuICAgICAgICAkZWwuYXR0cignYXJpYS1kaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25FbnRlck9yU3BhY2VLZXkoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAxMyAmJiBlLmtleUNvZGUgIT09IDMyKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcbiAgICAgICAgY29uc3QgJHRhcmdldEVsID0gJChlLnRhcmdldCk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWwgJiYgJHRhcmdldEVsLmlzKHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWwpKSB7XG4gICAgICAgICAgaWYgKCEoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3ApKSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN3aXBlci5pc0VuZCkge1xuICAgICAgICAgICAgbm90aWZ5KHBhcmFtcy5sYXN0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm90aWZ5KHBhcmFtcy5uZXh0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbCAmJiAkdGFyZ2V0RWwuaXMoc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbCkpIHtcbiAgICAgICAgICBpZiAoIShzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMubG9vcCkpIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgICAgICBub3RpZnkocGFyYW1zLmZpcnN0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm90aWZ5KHBhcmFtcy5wcmV2U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgJHRhcmdldEVsLmlzKGNsYXNzZXNUb1NlbGVjdG9yKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcykpKSB7XG4gICAgICAgICAgJHRhcmdldEVsWzBdLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlTmF2aWdhdGlvbigpIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCB8fCBzd2lwZXIucGFyYW1zLnJld2luZCB8fCAhc3dpcGVyLm5hdmlnYXRpb24pIHJldHVybjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRuZXh0RWwsXG4gICAgICAgICAgJHByZXZFbFxuICAgICAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG5cbiAgICAgICAgaWYgKCRwcmV2RWwgJiYgJHByZXZFbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgICAgICAgZGlzYWJsZUVsKCRwcmV2RWwpO1xuICAgICAgICAgICAgbWFrZUVsTm90Rm9jdXNhYmxlKCRwcmV2RWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmFibGVFbCgkcHJldkVsKTtcbiAgICAgICAgICAgIG1ha2VFbEZvY3VzYWJsZSgkcHJldkVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgICAgICBkaXNhYmxlRWwoJG5leHRFbCk7XG4gICAgICAgICAgICBtYWtlRWxOb3RGb2N1c2FibGUoJG5leHRFbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVuYWJsZUVsKCRuZXh0RWwpO1xuICAgICAgICAgICAgbWFrZUVsRm9jdXNhYmxlKCRuZXh0RWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoYXNQYWdpbmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gc3dpcGVyLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFzQ2xpY2thYmxlUGFnaW5hdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhZ2luYXRpb24oKSAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVQYWdpbmF0aW9uKCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmExMXk7XG4gICAgICAgIGlmICghaGFzUGFnaW5hdGlvbigpKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMuZWFjaChidWxsZXRFbCA9PiB7XG4gICAgICAgICAgY29uc3QgJGJ1bGxldEVsID0gJChidWxsZXRFbCk7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSkge1xuICAgICAgICAgICAgbWFrZUVsRm9jdXNhYmxlKCRidWxsZXRFbCk7XG5cbiAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLnJlbmRlckJ1bGxldCkge1xuICAgICAgICAgICAgICBhZGRFbFJvbGUoJGJ1bGxldEVsLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICAgIGFkZEVsTGFiZWwoJGJ1bGxldEVsLCBwYXJhbXMucGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2UucmVwbGFjZSgvXFx7XFx7aW5kZXhcXH1cXH0vLCAkYnVsbGV0RWwuaW5kZXgoKSArIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJGJ1bGxldEVsLmlzKGAuJHtzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0QWN0aXZlQ2xhc3N9YCkpIHtcbiAgICAgICAgICAgICRidWxsZXRFbC5hdHRyKCdhcmlhLWN1cnJlbnQnLCAndHJ1ZScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYnVsbGV0RWwucmVtb3ZlQXR0cignYXJpYS1jdXJyZW50Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5pdE5hdkVsID0gKCRlbCwgd3JhcHBlcklkLCBtZXNzYWdlKSA9PiB7XG4gICAgICAgIG1ha2VFbEZvY3VzYWJsZSgkZWwpO1xuXG4gICAgICAgIGlmICgkZWxbMF0udGFnTmFtZSAhPT0gJ0JVVFRPTicpIHtcbiAgICAgICAgICBhZGRFbFJvbGUoJGVsLCAnYnV0dG9uJyk7XG4gICAgICAgICAgJGVsLm9uKCdrZXlkb3duJywgb25FbnRlck9yU3BhY2VLZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkRWxMYWJlbCgkZWwsIG1lc3NhZ2UpO1xuICAgICAgICBhZGRFbENvbnRyb2xzKCRlbCwgd3JhcHBlcklkKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKCkgPT4ge1xuICAgICAgICBzd2lwZXIuYTExeS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJVcCA9ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgc3dpcGVyLmExMXkuY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGhhbmRsZUZvY3VzID0gZSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIuYTExeS5jbGlja2VkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHNsaWRlRWwgPSBlLnRhcmdldC5jbG9zZXN0KGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YCk7XG4gICAgICAgIGlmICghc2xpZGVFbCB8fCAhc3dpcGVyLnNsaWRlcy5pbmNsdWRlcyhzbGlkZUVsKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IHN3aXBlci5zbGlkZXMuaW5kZXhPZihzbGlkZUVsKSA9PT0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgICAgICBjb25zdCBpc1Zpc2libGUgPSBzd2lwZXIucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgJiYgc3dpcGVyLnZpc2libGVTbGlkZXMgJiYgc3dpcGVyLnZpc2libGVTbGlkZXMuaW5jbHVkZXMoc2xpZGVFbCk7XG4gICAgICAgIGlmIChpc0FjdGl2ZSB8fCBpc1Zpc2libGUpIHJldHVybjtcblxuICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgc3dpcGVyLmVsLnNjcm9sbExlZnQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5lbC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5pbmRleE9mKHNsaWRlRWwpLCAwKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGluaXRTbGlkZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcblxuICAgICAgICBpZiAocGFyYW1zLml0ZW1Sb2xlRGVzY3JpcHRpb25NZXNzYWdlKSB7XG4gICAgICAgICAgYWRkRWxSb2xlRGVzY3JpcHRpb24oJChzd2lwZXIuc2xpZGVzKSwgcGFyYW1zLml0ZW1Sb2xlRGVzY3JpcHRpb25NZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMuc2xpZGVSb2xlKSB7XG4gICAgICAgICAgYWRkRWxSb2xlKCQoc3dpcGVyLnNsaWRlcyksIHBhcmFtcy5zbGlkZVJvbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2xpZGVzTGVuZ3RoID0gc3dpcGVyLnBhcmFtcy5sb29wID8gc3dpcGVyLnNsaWRlcy5maWx0ZXIoZWwgPT4gIWVsLmNsYXNzTGlzdC5jb250YWlucyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKS5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcblxuICAgICAgICBpZiAocGFyYW1zLnNsaWRlTGFiZWxNZXNzYWdlKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlcy5lYWNoKChzbGlkZUVsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHNsaWRlRWwgPSAkKHNsaWRlRWwpO1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IHN3aXBlci5wYXJhbXMubG9vcCA/IHBhcnNlSW50KCRzbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKSA6IGluZGV4O1xuICAgICAgICAgICAgY29uc3QgYXJpYUxhYmVsTWVzc2FnZSA9IHBhcmFtcy5zbGlkZUxhYmVsTWVzc2FnZS5yZXBsYWNlKC9cXHtcXHtpbmRleFxcfVxcfS8sIHNsaWRlSW5kZXggKyAxKS5yZXBsYWNlKC9cXHtcXHtzbGlkZXNMZW5ndGhcXH1cXH0vLCBzbGlkZXNMZW5ndGgpO1xuICAgICAgICAgICAgYWRkRWxMYWJlbCgkc2xpZGVFbCwgYXJpYUxhYmVsTWVzc2FnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcbiAgICAgICAgc3dpcGVyLiRlbC5hcHBlbmQobGl2ZVJlZ2lvbik7IC8vIENvbnRhaW5lclxuXG4gICAgICAgIGNvbnN0ICRjb250YWluZXJFbCA9IHN3aXBlci4kZWw7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5jb250YWluZXJSb2xlRGVzY3JpcHRpb25NZXNzYWdlKSB7XG4gICAgICAgICAgYWRkRWxSb2xlRGVzY3JpcHRpb24oJGNvbnRhaW5lckVsLCBwYXJhbXMuY29udGFpbmVyUm9sZURlc2NyaXB0aW9uTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLmNvbnRhaW5lck1lc3NhZ2UpIHtcbiAgICAgICAgICBhZGRFbExhYmVsKCRjb250YWluZXJFbCwgcGFyYW1zLmNvbnRhaW5lck1lc3NhZ2UpO1xuICAgICAgICB9IC8vIFdyYXBwZXJcblxuXG4gICAgICAgIGNvbnN0ICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICAgICAgY29uc3Qgd3JhcHBlcklkID0gcGFyYW1zLmlkIHx8ICR3cmFwcGVyRWwuYXR0cignaWQnKSB8fCBgc3dpcGVyLXdyYXBwZXItJHtnZXRSYW5kb21OdW1iZXIoMTYpfWA7XG4gICAgICAgIGNvbnN0IGxpdmUgPSBzd2lwZXIucGFyYW1zLmF1dG9wbGF5ICYmIHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZW5hYmxlZCA/ICdvZmYnIDogJ3BvbGl0ZSc7XG4gICAgICAgIGFkZEVsSWQoJHdyYXBwZXJFbCwgd3JhcHBlcklkKTtcbiAgICAgICAgYWRkRWxMaXZlKCR3cmFwcGVyRWwsIGxpdmUpOyAvLyBTbGlkZVxuXG4gICAgICAgIGluaXRTbGlkZXMoKTsgLy8gTmF2aWdhdGlvblxuXG4gICAgICAgIGxldCAkbmV4dEVsO1xuICAgICAgICBsZXQgJHByZXZFbDtcblxuICAgICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCkge1xuICAgICAgICAgICRuZXh0RWwgPSBzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRwcmV2RWwpIHtcbiAgICAgICAgICAkcHJldkVsID0gc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkbmV4dEVsICYmICRuZXh0RWwubGVuZ3RoKSB7XG4gICAgICAgICAgaW5pdE5hdkVsKCRuZXh0RWwsIHdyYXBwZXJJZCwgcGFyYW1zLm5leHRTbGlkZU1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRwcmV2RWwgJiYgJHByZXZFbC5sZW5ndGgpIHtcbiAgICAgICAgICBpbml0TmF2RWwoJHByZXZFbCwgd3JhcHBlcklkLCBwYXJhbXMucHJldlNsaWRlTWVzc2FnZSk7XG4gICAgICAgIH0gLy8gUGFnaW5hdGlvblxuXG5cbiAgICAgICAgaWYgKGhhc0NsaWNrYWJsZVBhZ2luYXRpb24oKSkge1xuICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5vbigna2V5ZG93bicsIGNsYXNzZXNUb1NlbGVjdG9yKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcyksIG9uRW50ZXJPclNwYWNlS2V5KTtcbiAgICAgICAgfSAvLyBUYWIgZm9jdXNcblxuXG4gICAgICAgIHN3aXBlci4kZWwub24oJ2ZvY3VzJywgaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICBzd2lwZXIuJGVsLm9uKCdwb2ludGVyZG93bicsIGhhbmRsZVBvaW50ZXJEb3duLCB0cnVlKTtcbiAgICAgICAgc3dpcGVyLiRlbC5vbigncG9pbnRlcnVwJywgaGFuZGxlUG9pbnRlclVwLCB0cnVlKTtcbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmIChsaXZlUmVnaW9uICYmIGxpdmVSZWdpb24ubGVuZ3RoID4gMCkgbGl2ZVJlZ2lvbi5yZW1vdmUoKTtcbiAgICAgICAgbGV0ICRuZXh0RWw7XG4gICAgICAgIGxldCAkcHJldkVsO1xuXG4gICAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsKSB7XG4gICAgICAgICAgJG5leHRFbCA9IHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbCkge1xuICAgICAgICAgICRwcmV2RWwgPSBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRuZXh0RWwpIHtcbiAgICAgICAgICAkbmV4dEVsLm9mZigna2V5ZG93bicsIG9uRW50ZXJPclNwYWNlS2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcHJldkVsKSB7XG4gICAgICAgICAgJHByZXZFbC5vZmYoJ2tleWRvd24nLCBvbkVudGVyT3JTcGFjZUtleSk7XG4gICAgICAgIH0gLy8gUGFnaW5hdGlvblxuXG5cbiAgICAgICAgaWYgKGhhc0NsaWNrYWJsZVBhZ2luYXRpb24oKSkge1xuICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5vZmYoJ2tleWRvd24nLCBjbGFzc2VzVG9TZWxlY3Rvcihzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpLCBvbkVudGVyT3JTcGFjZUtleSk7XG4gICAgICAgIH0gLy8gVGFiIGZvY3VzXG5cblxuICAgICAgICBzd2lwZXIuJGVsLm9mZignZm9jdXMnLCBoYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHN3aXBlci4kZWwub2ZmKCdwb2ludGVyZG93bicsIGhhbmRsZVBvaW50ZXJEb3duLCB0cnVlKTtcbiAgICAgICAgc3dpcGVyLiRlbC5vZmYoJ3BvaW50ZXJ1cCcsIGhhbmRsZVBvaW50ZXJVcCwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIG9uKCdiZWZvcmVJbml0JywgKCkgPT4ge1xuICAgICAgICBsaXZlUmVnaW9uID0gJChgPHNwYW4gY2xhc3M9XCIke3N3aXBlci5wYXJhbXMuYTExeS5ub3RpZmljYXRpb25DbGFzc31cIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIiBhcmlhLWF0b21pYz1cInRydWVcIj48L3NwYW4+YCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdhZnRlckluaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICBvbignc2xpZGVzTGVuZ3RoQ2hhbmdlIHNuYXBHcmlkTGVuZ3RoQ2hhbmdlIHNsaWRlc0dyaWRMZW5ndGhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgaW5pdFNsaWRlcygpO1xuICAgICAgfSk7XG4gICAgICBvbignZnJvbUVkZ2UgdG9FZGdlIGFmdGVySW5pdCBsb2NrIHVubG9jaycsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmExMXkuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdwYWdpbmF0aW9uVXBkYXRlJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuYTExeS5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgZGVzdHJveSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gSGlzdG9yeShfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgaGlzdG9yeToge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHJvb3Q6ICcnLFxuICAgICAgICAgIHJlcGxhY2VTdGF0ZTogZmFsc2UsXG4gICAgICAgICAga2V5OiAnc2xpZGVzJyxcbiAgICAgICAgICBrZWVwUXVlcnk6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICBsZXQgcGF0aHMgPSB7fTtcblxuICAgICAgY29uc3Qgc2x1Z2lmeSA9IHRleHQgPT4ge1xuICAgICAgICByZXR1cm4gdGV4dC50b1N0cmluZygpLnJlcGxhY2UoL1xccysvZywgJy0nKS5yZXBsYWNlKC9bXlxcdy1dKy9nLCAnJykucmVwbGFjZSgvLS0rL2csICctJykucmVwbGFjZSgvXi0rLywgJycpLnJlcGxhY2UoLy0rJC8sICcnKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGdldFBhdGhWYWx1ZXMgPSB1cmxPdmVycmlkZSA9PiB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgICBsZXQgbG9jYXRpb247XG5cbiAgICAgICAgaWYgKHVybE92ZXJyaWRlKSB7XG4gICAgICAgICAgbG9jYXRpb24gPSBuZXcgVVJMKHVybE92ZXJyaWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhdGhBcnJheSA9IGxvY2F0aW9uLnBhdGhuYW1lLnNsaWNlKDEpLnNwbGl0KCcvJykuZmlsdGVyKHBhcnQgPT4gcGFydCAhPT0gJycpO1xuICAgICAgICBjb25zdCB0b3RhbCA9IHBhdGhBcnJheS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGtleSA9IHBhdGhBcnJheVt0b3RhbCAtIDJdO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhdGhBcnJheVt0b3RhbCAtIDFdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0SGlzdG9yeSA9IChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgICBpZiAoIWluaXRpYWxpemVkIHx8ICFzd2lwZXIucGFyYW1zLmhpc3RvcnkuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBsZXQgbG9jYXRpb247XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudXJsKSB7XG4gICAgICAgICAgbG9jYXRpb24gPSBuZXcgVVJMKHN3aXBlci5wYXJhbXMudXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpbmRleCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHNsdWdpZnkoc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5JykpO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhpc3Rvcnkucm9vdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IHJvb3QgPSBzd2lwZXIucGFyYW1zLmhpc3Rvcnkucm9vdDtcbiAgICAgICAgICBpZiAocm9vdFtyb290Lmxlbmd0aCAtIDFdID09PSAnLycpIHJvb3QgPSByb290LnNsaWNlKDAsIHJvb3QubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgdmFsdWUgPSBgJHtyb290fS8ke2tleX0vJHt2YWx1ZX1gO1xuICAgICAgICB9IGVsc2UgaWYgKCFsb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgdmFsdWUgPSBgJHtrZXl9LyR7dmFsdWV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhpc3Rvcnkua2VlcFF1ZXJ5KSB7XG4gICAgICAgICAgdmFsdWUgKz0gbG9jYXRpb24uc2VhcmNoO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gd2luZG93Lmhpc3Rvcnkuc3RhdGU7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSAmJiBjdXJyZW50U3RhdGUudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe1xuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICB9LCBudWxsLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgfSwgbnVsbCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzY3JvbGxUb1NsaWRlID0gKHNwZWVkLCB2YWx1ZSwgcnVuQ2FsbGJhY2tzKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICBjb25zdCBzbGlkZUhpc3RvcnkgPSBzbHVnaWZ5KHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpKTtcblxuICAgICAgICAgICAgaWYgKHNsaWRlSGlzdG9yeSA9PT0gdmFsdWUgJiYgIXNsaWRlLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKDAsIHNwZWVkLCBydW5DYWxsYmFja3MpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRIaXN0b3J5UG9wU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIHBhdGhzID0gZ2V0UGF0aFZhbHVlcyhzd2lwZXIucGFyYW1zLnVybCk7XG4gICAgICAgIHNjcm9sbFRvU2xpZGUoc3dpcGVyLnBhcmFtcy5zcGVlZCwgcGF0aHMudmFsdWUsIGZhbHNlKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuaGlzdG9yeSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghd2luZG93Lmhpc3RvcnkgfHwgIXdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgICAgIHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHBhdGhzID0gZ2V0UGF0aFZhbHVlcyhzd2lwZXIucGFyYW1zLnVybCk7XG4gICAgICAgIGlmICghcGF0aHMua2V5ICYmICFwYXRocy52YWx1ZSkgcmV0dXJuO1xuICAgICAgICBzY3JvbGxUb1NsaWRlKDAsIHBhdGhzLnZhbHVlLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhpc3RvcnkuZW5hYmxlZCkge1xuICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKSB7XG4gICAgICAgICAgZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCd0cmFuc2l0aW9uRW5kIF9mcmVlTW9kZU5vTW9tZW50dW1SZWxlYXNlJywgKCkgPT4ge1xuICAgICAgICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICBzZXRIaXN0b3J5KHN3aXBlci5wYXJhbXMuaGlzdG9yeS5rZXksIHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3NsaWRlQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoaW5pdGlhbGl6ZWQgJiYgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgc2V0SGlzdG9yeShzd2lwZXIucGFyYW1zLmhpc3Rvcnkua2V5LCBzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBIYXNoTmF2aWdhdGlvbihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgZW1pdCxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGhhc2hOYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgcmVwbGFjZVN0YXRlOiBmYWxzZSxcbiAgICAgICAgICB3YXRjaFN0YXRlOiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgb25IYXNoQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBlbWl0KCdoYXNoQ2hhbmdlJyk7XG4gICAgICAgIGNvbnN0IG5ld0hhc2ggPSBkb2N1bWVudC5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVNsaWRlSGFzaCA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKTtcblxuICAgICAgICBpZiAobmV3SGFzaCAhPT0gYWN0aXZlU2xpZGVIYXNoKSB7XG4gICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLWhhc2g9XCIke25ld0hhc2h9XCJdYCkuaW5kZXgoKTtcbiAgICAgICAgICBpZiAodHlwZW9mIG5ld0luZGV4ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0luZGV4KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0SGFzaCA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFpbml0aWFsaXplZCB8fCAhc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24ucmVwbGFjZVN0YXRlICYmIHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCBgIyR7c3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpLmF0dHIoJ2RhdGEtaGFzaCcpfWAgfHwgJycpO1xuICAgICAgICAgIGVtaXQoJ2hhc2hTZXQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICBjb25zdCBoYXNoID0gc2xpZGUuYXR0cignZGF0YS1oYXNoJykgfHwgc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5Jyk7XG4gICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaGFzaCA9IGhhc2ggfHwgJyc7XG4gICAgICAgICAgZW1pdCgnaGFzaFNldCcpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZCB8fCBzd2lwZXIucGFyYW1zLmhpc3RvcnkgJiYgc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCBoYXNoID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuXG4gICAgICAgIGlmIChoYXNoKSB7XG4gICAgICAgICAgY29uc3Qgc3BlZWQgPSAwO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlSGFzaCA9IHNsaWRlLmF0dHIoJ2RhdGEtaGFzaCcpIHx8IHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpO1xuXG4gICAgICAgICAgICBpZiAoc2xpZGVIYXNoID09PSBoYXNoICYmICFzbGlkZS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24ud2F0Y2hTdGF0ZSkge1xuICAgICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLndhdGNoU3RhdGUpIHtcbiAgICAgICAgICAkKHdpbmRvdykub2ZmKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHtcbiAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHtcbiAgICAgICAgICBkZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3RyYW5zaXRpb25FbmQgX2ZyZWVNb2RlTm9Nb21lbnR1bVJlbGVhc2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChpbml0aWFsaXplZCkge1xuICAgICAgICAgIHNldEhhc2goKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc2xpZGVDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChpbml0aWFsaXplZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzZXRIYXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIGVzbGludCBuby11bmRlcnNjb3JlLWRhbmdsZTogXCJvZmZcIiAqL1xuICAgIGZ1bmN0aW9uIEF1dG9wbGF5KF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvbixcbiAgICAgICAgZW1pdFxuICAgICAgfSA9IF9yZWY7XG4gICAgICBsZXQgdGltZW91dDtcbiAgICAgIHN3aXBlci5hdXRvcGxheSA9IHtcbiAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgIHBhdXNlZDogZmFsc2VcbiAgICAgIH07XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBhdXRvcGxheToge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGRlbGF5OiAzMDAwLFxuICAgICAgICAgIHdhaXRGb3JUcmFuc2l0aW9uOiB0cnVlLFxuICAgICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiB0cnVlLFxuICAgICAgICAgIHN0b3BPbkxhc3RTbGlkZTogZmFsc2UsXG4gICAgICAgICAgcmV2ZXJzZURpcmVjdGlvbjogZmFsc2UsXG4gICAgICAgICAgcGF1c2VPbk1vdXNlRW50ZXI6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBydW4oKSB7XG4gICAgICAgIGlmICghc3dpcGVyLnNpemUpIHtcbiAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkYWN0aXZlU2xpZGVFbCA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgbGV0IGRlbGF5ID0gc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kZWxheTtcblxuICAgICAgICBpZiAoJGFjdGl2ZVNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItYXV0b3BsYXknKSkge1xuICAgICAgICAgIGRlbGF5ID0gJGFjdGl2ZVNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItYXV0b3BsYXknKSB8fCBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIGxldCBhdXRvcGxheVJlc3VsdDtcblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnJldmVyc2VEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgICAgICAgICAgYXV0b3BsYXlSZXN1bHQgPSBzd2lwZXIuc2xpZGVQcmV2KHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgICAgICAgIGF1dG9wbGF5UmVzdWx0ID0gc3dpcGVyLnNsaWRlUHJldihzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuc3RvcE9uTGFzdFNsaWRlKSB7XG4gICAgICAgICAgICAgIGF1dG9wbGF5UmVzdWx0ID0gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxLCBzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgICAgICAgIGF1dG9wbGF5UmVzdWx0ID0gc3dpcGVyLnNsaWRlTmV4dChzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIGVtaXQoJ2F1dG9wbGF5Jyk7XG4gICAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgICAgICBhdXRvcGxheVJlc3VsdCA9IHN3aXBlci5zbGlkZU5leHQoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuc3RvcE9uTGFzdFNsaWRlKSB7XG4gICAgICAgICAgICBhdXRvcGxheVJlc3VsdCA9IHN3aXBlci5zbGlkZVRvKDAsIHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUgJiYgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJ1bigpO2Vsc2UgaWYgKGF1dG9wbGF5UmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcnVuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAodHlwZW9mIHRpbWVvdXQgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IHRydWU7XG4gICAgICAgIGVtaXQoJ2F1dG9wbGF5U3RhcnQnKTtcbiAgICAgICAgcnVuKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBpZiAoIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgdGltZW91dCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICB0aW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgZW1pdCgnYXV0b3BsYXlTdG9wJyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwYXVzZShzcGVlZCkge1xuICAgICAgICBpZiAoIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSByZXR1cm47XG4gICAgICAgIGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChzcGVlZCA9PT0gMCB8fCAhc3dpcGVyLnBhcmFtcy5hdXRvcGxheS53YWl0Rm9yVHJhbnNpdGlvbikge1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICBydW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBbJ3RyYW5zaXRpb25lbmQnLCAnd2Via2l0VHJhbnNpdGlvbkVuZCddLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAnaGlkZGVuJyAmJiBzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICAgIHBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAndmlzaWJsZScgJiYgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgICAgICAgIHJ1bigpO1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblRyYW5zaXRpb25FbmQoZSkge1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuJHdyYXBwZXJFbCkgcmV0dXJuO1xuICAgICAgICBpZiAoZS50YXJnZXQgIT09IHN3aXBlci4kd3JhcHBlckVsWzBdKSByZXR1cm47XG4gICAgICAgIFsndHJhbnNpdGlvbmVuZCcsICd3ZWJraXRUcmFuc2l0aW9uRW5kJ10uZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1bigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uTW91c2VFbnRlcigpIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW1pdCgnYXV0b3BsYXlQYXVzZScpO1xuICAgICAgICAgIHBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBbJ3RyYW5zaXRpb25lbmQnLCAnd2Via2l0VHJhbnNpdGlvbkVuZCddLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBlbWl0KCdhdXRvcGxheVJlc3VtZScpO1xuICAgICAgICBydW4oKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYXR0YWNoTW91c2VFdmVudHMoKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnBhdXNlT25Nb3VzZUVudGVyKSB7XG4gICAgICAgICAgc3dpcGVyLiRlbC5vbignbW91c2VlbnRlcicsIG9uTW91c2VFbnRlcik7XG4gICAgICAgICAgc3dpcGVyLiRlbC5vbignbW91c2VsZWF2ZScsIG9uTW91c2VMZWF2ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGV0YWNoTW91c2VFdmVudHMoKSB7XG4gICAgICAgIHN3aXBlci4kZWwub2ZmKCdtb3VzZWVudGVyJywgb25Nb3VzZUVudGVyKTtcbiAgICAgICAgc3dpcGVyLiRlbC5vZmYoJ21vdXNlbGVhdmUnLCBvbk1vdXNlTGVhdmUpO1xuICAgICAgfVxuXG4gICAgICBvbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZW5hYmxlZCkge1xuICAgICAgICAgIHN0YXJ0KCk7XG4gICAgICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBvblZpc2liaWxpdHlDaGFuZ2UpO1xuICAgICAgICAgIGF0dGFjaE1vdXNlRXZlbnRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIChfcywgc3BlZWQsIGludGVybmFsKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICAgIGlmIChpbnRlcm5hbCB8fCAhc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlKHNwZWVkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc2xpZGVyRmlyc3RNb3ZlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbigndG91Y2hFbmQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUgJiYgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCAmJiAhc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgIHJ1bigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICBkZXRhY2hNb3VzZUV2ZW50cygpO1xuXG4gICAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIG9uVmlzaWJpbGl0eUNoYW5nZSk7XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLmF1dG9wbGF5LCB7XG4gICAgICAgIHBhdXNlLFxuICAgICAgICBydW4sXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBzdG9wXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBUaHVtYihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgdGh1bWJzOiB7XG4gICAgICAgICAgc3dpcGVyOiBudWxsLFxuICAgICAgICAgIG11bHRpcGxlQWN0aXZlVGh1bWJzOiB0cnVlLFxuICAgICAgICAgIGF1dG9TY3JvbGxPZmZzZXQ6IDAsXG4gICAgICAgICAgc2xpZGVUaHVtYkFjdGl2ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLXRodW1iLWFjdGl2ZScsXG4gICAgICAgICAgdGh1bWJzQ29udGFpbmVyQ2xhc3M6ICdzd2lwZXItdGh1bWJzJ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgbGV0IHN3aXBlckNyZWF0ZWQgPSBmYWxzZTtcbiAgICAgIHN3aXBlci50aHVtYnMgPSB7XG4gICAgICAgIHN3aXBlcjogbnVsbFxuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gb25UaHVtYkNsaWNrKCkge1xuICAgICAgICBjb25zdCB0aHVtYnNTd2lwZXIgPSBzd2lwZXIudGh1bWJzLnN3aXBlcjtcbiAgICAgICAgaWYgKCF0aHVtYnNTd2lwZXIgfHwgdGh1bWJzU3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBjbGlja2VkSW5kZXggPSB0aHVtYnNTd2lwZXIuY2xpY2tlZEluZGV4O1xuICAgICAgICBjb25zdCBjbGlja2VkU2xpZGUgPSB0aHVtYnNTd2lwZXIuY2xpY2tlZFNsaWRlO1xuICAgICAgICBpZiAoY2xpY2tlZFNsaWRlICYmICQoY2xpY2tlZFNsaWRlKS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnRodW1icy5zbGlkZVRodW1iQWN0aXZlQ2xhc3MpKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY2xpY2tlZEluZGV4ID09PSAndW5kZWZpbmVkJyB8fCBjbGlja2VkSW5kZXggPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgbGV0IHNsaWRlVG9JbmRleDtcblxuICAgICAgICBpZiAodGh1bWJzU3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc2xpZGVUb0luZGV4ID0gcGFyc2VJbnQoJCh0aHVtYnNTd2lwZXIuY2xpY2tlZFNsaWRlKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xpZGVUb0luZGV4ID0gY2xpY2tlZEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIGxldCBjdXJyZW50SW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnNsaWRlcy5lcShjdXJyZW50SW5kZXgpLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG4gICAgICAgICAgICBzd2lwZXIuX2NsaWVudExlZnQgPSBzd2lwZXIuJHdyYXBwZXJFbFswXS5jbGllbnRMZWZ0O1xuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IHN3aXBlci5zbGlkZXMuZXEoY3VycmVudEluZGV4KS5wcmV2QWxsKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3NsaWRlVG9JbmRleH1cIl1gKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICAgIGNvbnN0IG5leHRJbmRleCA9IHN3aXBlci5zbGlkZXMuZXEoY3VycmVudEluZGV4KS5uZXh0QWxsKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3NsaWRlVG9JbmRleH1cIl1gKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICAgIGlmICh0eXBlb2YgcHJldkluZGV4ID09PSAndW5kZWZpbmVkJykgc2xpZGVUb0luZGV4ID0gbmV4dEluZGV4O2Vsc2UgaWYgKHR5cGVvZiBuZXh0SW5kZXggPT09ICd1bmRlZmluZWQnKSBzbGlkZVRvSW5kZXggPSBwcmV2SW5kZXg7ZWxzZSBpZiAobmV4dEluZGV4IC0gY3VycmVudEluZGV4IDwgY3VycmVudEluZGV4IC0gcHJldkluZGV4KSBzbGlkZVRvSW5kZXggPSBuZXh0SW5kZXg7ZWxzZSBzbGlkZVRvSW5kZXggPSBwcmV2SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgdGh1bWJzOiB0aHVtYnNQYXJhbXNcbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXM7XG4gICAgICAgIGlmIChpbml0aWFsaXplZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IFN3aXBlckNsYXNzID0gc3dpcGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIGlmICh0aHVtYnNQYXJhbXMuc3dpcGVyIGluc3RhbmNlb2YgU3dpcGVyQ2xhc3MpIHtcbiAgICAgICAgICBzd2lwZXIudGh1bWJzLnN3aXBlciA9IHRodW1ic1BhcmFtcy5zd2lwZXI7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIudGh1bWJzLnN3aXBlci5vcmlnaW5hbFBhcmFtcywge1xuICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIudGh1bWJzLnN3aXBlci5wYXJhbXMsIHtcbiAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRodW1ic1BhcmFtcy5zd2lwZXIpKSB7XG4gICAgICAgICAgY29uc3QgdGh1bWJzU3dpcGVyUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGh1bWJzUGFyYW1zLnN3aXBlcik7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0aHVtYnNTd2lwZXJQYXJhbXMsIHtcbiAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHN3aXBlci50aHVtYnMuc3dpcGVyID0gbmV3IFN3aXBlckNsYXNzKHRodW1ic1N3aXBlclBhcmFtcyk7XG4gICAgICAgICAgc3dpcGVyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIudGh1bWJzLnN3aXBlci4kZWwuYWRkQ2xhc3Moc3dpcGVyLnBhcmFtcy50aHVtYnMudGh1bWJzQ29udGFpbmVyQ2xhc3MpO1xuICAgICAgICBzd2lwZXIudGh1bWJzLnN3aXBlci5vbigndGFwJywgb25UaHVtYkNsaWNrKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZShpbml0aWFsKSB7XG4gICAgICAgIGNvbnN0IHRodW1ic1N3aXBlciA9IHN3aXBlci50aHVtYnMuc3dpcGVyO1xuICAgICAgICBpZiAoIXRodW1ic1N3aXBlciB8fCB0aHVtYnNTd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHNsaWRlc1BlclZpZXcgPSB0aHVtYnNTd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyA/IHRodW1ic1N3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogdGh1bWJzU3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3OyAvLyBBY3RpdmF0ZSB0aHVtYnNcblxuICAgICAgICBsZXQgdGh1bWJzVG9BY3RpdmF0ZSA9IDE7XG4gICAgICAgIGNvbnN0IHRodW1iQWN0aXZlQ2xhc3MgPSBzd2lwZXIucGFyYW1zLnRodW1icy5zbGlkZVRodW1iQWN0aXZlQ2xhc3M7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICB0aHVtYnNUb0FjdGl2YXRlID0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnRodW1icy5tdWx0aXBsZUFjdGl2ZVRodW1icykge1xuICAgICAgICAgIHRodW1ic1RvQWN0aXZhdGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGh1bWJzVG9BY3RpdmF0ZSA9IE1hdGguZmxvb3IodGh1bWJzVG9BY3RpdmF0ZSk7XG4gICAgICAgIHRodW1ic1N3aXBlci5zbGlkZXMucmVtb3ZlQ2xhc3ModGh1bWJBY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgaWYgKHRodW1ic1N3aXBlci5wYXJhbXMubG9vcCB8fCB0aHVtYnNTd2lwZXIucGFyYW1zLnZpcnR1YWwgJiYgdGh1bWJzU3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1ic1RvQWN0aXZhdGU7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGh1bWJzU3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oYFtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7c3dpcGVyLnJlYWxJbmRleCArIGl9XCJdYCkuYWRkQ2xhc3ModGh1bWJBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGh1bWJzVG9BY3RpdmF0ZTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aHVtYnNTd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5yZWFsSW5kZXggKyBpKS5hZGRDbGFzcyh0aHVtYkFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdXRvU2Nyb2xsT2Zmc2V0ID0gc3dpcGVyLnBhcmFtcy50aHVtYnMuYXV0b1Njcm9sbE9mZnNldDtcbiAgICAgICAgY29uc3QgdXNlT2Zmc2V0ID0gYXV0b1Njcm9sbE9mZnNldCAmJiAhdGh1bWJzU3dpcGVyLnBhcmFtcy5sb29wO1xuXG4gICAgICAgIGlmIChzd2lwZXIucmVhbEluZGV4ICE9PSB0aHVtYnNTd2lwZXIucmVhbEluZGV4IHx8IHVzZU9mZnNldCkge1xuICAgICAgICAgIGxldCBjdXJyZW50VGh1bWJzSW5kZXggPSB0aHVtYnNTd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgICAgICAgbGV0IG5ld1RodW1ic0luZGV4O1xuICAgICAgICAgIGxldCBkaXJlY3Rpb247XG5cbiAgICAgICAgICBpZiAodGh1bWJzU3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICBpZiAodGh1bWJzU3dpcGVyLnNsaWRlcy5lcShjdXJyZW50VGh1bWJzSW5kZXgpLmhhc0NsYXNzKHRodW1ic1N3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgdGh1bWJzU3dpcGVyLmxvb3BGaXgoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cbiAgICAgICAgICAgICAgdGh1bWJzU3dpcGVyLl9jbGllbnRMZWZ0ID0gdGh1bWJzU3dpcGVyLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdDtcbiAgICAgICAgICAgICAgY3VycmVudFRodW1ic0luZGV4ID0gdGh1bWJzU3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgICAgICAgICAgfSAvLyBGaW5kIGFjdHVhbCB0aHVtYnMgaW5kZXggdG8gc2xpZGUgdG9cblxuXG4gICAgICAgICAgICBjb25zdCBwcmV2VGh1bWJzSW5kZXggPSB0aHVtYnNTd2lwZXIuc2xpZGVzLmVxKGN1cnJlbnRUaHVtYnNJbmRleCkucHJldkFsbChgW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtzd2lwZXIucmVhbEluZGV4fVwiXWApLmVxKDApLmluZGV4KCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0VGh1bWJzSW5kZXggPSB0aHVtYnNTd2lwZXIuc2xpZGVzLmVxKGN1cnJlbnRUaHVtYnNJbmRleCkubmV4dEFsbChgW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtzd2lwZXIucmVhbEluZGV4fVwiXWApLmVxKDApLmluZGV4KCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldlRodW1ic0luZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBuZXdUaHVtYnNJbmRleCA9IG5leHRUaHVtYnNJbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5leHRUaHVtYnNJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgbmV3VGh1bWJzSW5kZXggPSBwcmV2VGh1bWJzSW5kZXg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRUaHVtYnNJbmRleCAtIGN1cnJlbnRUaHVtYnNJbmRleCA9PT0gY3VycmVudFRodW1ic0luZGV4IC0gcHJldlRodW1ic0luZGV4KSB7XG4gICAgICAgICAgICAgIG5ld1RodW1ic0luZGV4ID0gdGh1bWJzU3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA+IDEgPyBuZXh0VGh1bWJzSW5kZXggOiBjdXJyZW50VGh1bWJzSW5kZXg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRUaHVtYnNJbmRleCAtIGN1cnJlbnRUaHVtYnNJbmRleCA8IGN1cnJlbnRUaHVtYnNJbmRleCAtIHByZXZUaHVtYnNJbmRleCkge1xuICAgICAgICAgICAgICBuZXdUaHVtYnNJbmRleCA9IG5leHRUaHVtYnNJbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld1RodW1ic0luZGV4ID0gcHJldlRodW1ic0luZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBzd2lwZXIuYWN0aXZlSW5kZXggPiBzd2lwZXIucHJldmlvdXNJbmRleCA/ICduZXh0JyA6ICdwcmV2JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGh1bWJzSW5kZXggPSBzd2lwZXIucmVhbEluZGV4O1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gbmV3VGh1bWJzSW5kZXggPiBzd2lwZXIucHJldmlvdXNJbmRleCA/ICduZXh0JyA6ICdwcmV2JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXNlT2Zmc2V0KSB7XG4gICAgICAgICAgICBuZXdUaHVtYnNJbmRleCArPSBkaXJlY3Rpb24gPT09ICduZXh0JyA/IGF1dG9TY3JvbGxPZmZzZXQgOiAtMSAqIGF1dG9TY3JvbGxPZmZzZXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRodW1ic1N3aXBlci52aXNpYmxlU2xpZGVzSW5kZXhlcyAmJiB0aHVtYnNTd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMuaW5kZXhPZihuZXdUaHVtYnNJbmRleCkgPCAwKSB7XG4gICAgICAgICAgICBpZiAodGh1bWJzU3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgICAgICBpZiAobmV3VGh1bWJzSW5kZXggPiBjdXJyZW50VGh1bWJzSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBuZXdUaHVtYnNJbmRleCA9IG5ld1RodW1ic0luZGV4IC0gTWF0aC5mbG9vcihzbGlkZXNQZXJWaWV3IC8gMikgKyAxO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1RodW1ic0luZGV4ID0gbmV3VGh1bWJzSW5kZXggKyBNYXRoLmZsb29yKHNsaWRlc1BlclZpZXcgLyAyKSAtIDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3VGh1bWJzSW5kZXggPiBjdXJyZW50VGh1bWJzSW5kZXggJiYgdGh1bWJzU3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMSkgO1xuXG4gICAgICAgICAgICB0aHVtYnNTd2lwZXIuc2xpZGVUbyhuZXdUaHVtYnNJbmRleCwgaW5pdGlhbCA/IDAgOiB1bmRlZmluZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbignYmVmb3JlSW5pdCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRodW1ic1xuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcztcbiAgICAgICAgaWYgKCF0aHVtYnMgfHwgIXRodW1icy5zd2lwZXIpIHJldHVybjtcbiAgICAgICAgaW5pdCgpO1xuICAgICAgICB1cGRhdGUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdzbGlkZUNoYW5nZSB1cGRhdGUgcmVzaXplIG9ic2VydmVyVXBkYXRlJywgKCkgPT4ge1xuICAgICAgICB1cGRhdGUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3NldFRyYW5zaXRpb24nLCAoX3MsIGR1cmF0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHRodW1ic1N3aXBlciA9IHN3aXBlci50aHVtYnMuc3dpcGVyO1xuICAgICAgICBpZiAoIXRodW1ic1N3aXBlciB8fCB0aHVtYnNTd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIHRodW1ic1N3aXBlci5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2JlZm9yZURlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRodW1ic1N3aXBlciA9IHN3aXBlci50aHVtYnMuc3dpcGVyO1xuICAgICAgICBpZiAoIXRodW1ic1N3aXBlciB8fCB0aHVtYnNTd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHN3aXBlckNyZWF0ZWQpIHtcbiAgICAgICAgICB0aHVtYnNTd2lwZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLnRodW1icywge1xuICAgICAgICBpbml0LFxuICAgICAgICB1cGRhdGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyZWVNb2RlKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBlbWl0LFxuICAgICAgICBvbmNlXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGZyZWVNb2RlOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgbW9tZW50dW06IHRydWUsXG4gICAgICAgICAgbW9tZW50dW1SYXRpbzogMSxcbiAgICAgICAgICBtb21lbnR1bUJvdW5jZTogdHJ1ZSxcbiAgICAgICAgICBtb21lbnR1bUJvdW5jZVJhdGlvOiAxLFxuICAgICAgICAgIG1vbWVudHVtVmVsb2NpdHlSYXRpbzogMSxcbiAgICAgICAgICBzdGlja3k6IGZhbHNlLFxuICAgICAgICAgIG1pbmltdW1WZWxvY2l0eTogMC4wMlxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KCkge1xuICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCk7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEudmVsb2NpdGllcy5sZW5ndGggPSAwO1xuICAgICAgICBzd2lwZXIuZnJlZU1vZGUub25Ub3VjaEVuZCh7XG4gICAgICAgICAgY3VycmVudFBvczogc3dpcGVyLnJ0bCA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25Ub3VjaE1vdmUoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB0b3VjaEV2ZW50c0RhdGE6IGRhdGEsXG4gICAgICAgICAgdG91Y2hlc1xuICAgICAgICB9ID0gc3dpcGVyOyAvLyBWZWxvY2l0eVxuXG4gICAgICAgIGlmIChkYXRhLnZlbG9jaXRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZGF0YS52ZWxvY2l0aWVzLnB1c2goe1xuICAgICAgICAgICAgcG9zaXRpb246IHRvdWNoZXNbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3N0YXJ0WCcgOiAnc3RhcnRZJ10sXG4gICAgICAgICAgICB0aW1lOiBkYXRhLnRvdWNoU3RhcnRUaW1lXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLnZlbG9jaXRpZXMucHVzaCh7XG4gICAgICAgICAgcG9zaXRpb246IHRvdWNoZXNbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2N1cnJlbnRYJyA6ICdjdXJyZW50WSddLFxuICAgICAgICAgIHRpbWU6IG5vdygpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblRvdWNoRW5kKF9yZWYyKSB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgY3VycmVudFBvc1xuICAgICAgICB9ID0gX3JlZjI7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgJHdyYXBwZXJFbCxcbiAgICAgICAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICAgICAgICBzbmFwR3JpZCxcbiAgICAgICAgICB0b3VjaEV2ZW50c0RhdGE6IGRhdGFcbiAgICAgICAgfSA9IHN3aXBlcjsgLy8gVGltZSBkaWZmXG5cbiAgICAgICAgY29uc3QgdG91Y2hFbmRUaW1lID0gbm93KCk7XG4gICAgICAgIGNvbnN0IHRpbWVEaWZmID0gdG91Y2hFbmRUaW1lIC0gZGF0YS50b3VjaFN0YXJ0VGltZTtcblxuICAgICAgICBpZiAoY3VycmVudFBvcyA8IC1zd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50UG9zID4gLXN3aXBlci5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICAgIGlmIChzd2lwZXIuc2xpZGVzLmxlbmd0aCA8IHNuYXBHcmlkLmxlbmd0aCkge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc25hcEdyaWQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy5mcmVlTW9kZS5tb21lbnR1bSkge1xuICAgICAgICAgIGlmIChkYXRhLnZlbG9jaXRpZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgbGFzdE1vdmVFdmVudCA9IGRhdGEudmVsb2NpdGllcy5wb3AoKTtcbiAgICAgICAgICAgIGNvbnN0IHZlbG9jaXR5RXZlbnQgPSBkYXRhLnZlbG9jaXRpZXMucG9wKCk7XG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGxhc3RNb3ZlRXZlbnQucG9zaXRpb24gLSB2ZWxvY2l0eUV2ZW50LnBvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IGxhc3RNb3ZlRXZlbnQudGltZSAtIHZlbG9jaXR5RXZlbnQudGltZTtcbiAgICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IGRpc3RhbmNlIC8gdGltZTtcbiAgICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSAvPSAyO1xuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoc3dpcGVyLnZlbG9jaXR5KSA8IHBhcmFtcy5mcmVlTW9kZS5taW5pbXVtVmVsb2NpdHkpIHtcbiAgICAgICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH0gLy8gdGhpcyBpbXBsaWVzIHRoYXQgdGhlIHVzZXIgc3RvcHBlZCBtb3ZpbmcgYSBmaW5nZXIgdGhlbiByZWxlYXNlZC5cbiAgICAgICAgICAgIC8vIFRoZXJlIHdvdWxkIGJlIG5vIGV2ZW50cyB3aXRoIGRpc3RhbmNlIHplcm8sIHNvIHRoZSBsYXN0IGV2ZW50IGlzIHN0YWxlLlxuXG5cbiAgICAgICAgICAgIGlmICh0aW1lID4gMTUwIHx8IG5vdygpIC0gbGFzdE1vdmVFdmVudC50aW1lID4gMzAwKSB7XG4gICAgICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ICo9IHBhcmFtcy5mcmVlTW9kZS5tb21lbnR1bVZlbG9jaXR5UmF0aW87XG4gICAgICAgICAgZGF0YS52ZWxvY2l0aWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgbGV0IG1vbWVudHVtRHVyYXRpb24gPSAxMDAwICogcGFyYW1zLmZyZWVNb2RlLm1vbWVudHVtUmF0aW87XG4gICAgICAgICAgY29uc3QgbW9tZW50dW1EaXN0YW5jZSA9IHN3aXBlci52ZWxvY2l0eSAqIG1vbWVudHVtRHVyYXRpb247XG4gICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gc3dpcGVyLnRyYW5zbGF0ZSArIG1vbWVudHVtRGlzdGFuY2U7XG4gICAgICAgICAgaWYgKHJ0bCkgbmV3UG9zaXRpb24gPSAtbmV3UG9zaXRpb247XG4gICAgICAgICAgbGV0IGRvQm91bmNlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IGFmdGVyQm91bmNlUG9zaXRpb247XG4gICAgICAgICAgY29uc3QgYm91bmNlQW1vdW50ID0gTWF0aC5hYnMoc3dpcGVyLnZlbG9jaXR5KSAqIDIwICogcGFyYW1zLmZyZWVNb2RlLm1vbWVudHVtQm91bmNlUmF0aW87XG4gICAgICAgICAgbGV0IG5lZWRzTG9vcEZpeDtcblxuICAgICAgICAgIGlmIChuZXdQb3NpdGlvbiA8IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5mcmVlTW9kZS5tb21lbnR1bUJvdW5jZSkge1xuICAgICAgICAgICAgICBpZiAobmV3UG9zaXRpb24gKyBzd2lwZXIubWF4VHJhbnNsYXRlKCkgPCAtYm91bmNlQW1vdW50KSB7XG4gICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICBkb0JvdW5jZSA9IHRydWU7XG4gICAgICAgICAgICAgIGRhdGEuYWxsb3dNb21lbnR1bUJvdW5jZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmFtcy5sb29wICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlcykgbmVlZHNMb29wRml4ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5ld1Bvc2l0aW9uID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlLm1vbWVudHVtQm91bmNlKSB7XG4gICAgICAgICAgICAgIGlmIChuZXdQb3NpdGlvbiAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSA+IGJvdW5jZUFtb3VudCkge1xuICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgYm91bmNlQW1vdW50O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYWZ0ZXJCb3VuY2VQb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgZG9Cb3VuY2UgPSB0cnVlO1xuICAgICAgICAgICAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJhbXMubG9vcCAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXMpIG5lZWRzTG9vcEZpeCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZnJlZU1vZGUuc3RpY2t5KSB7XG4gICAgICAgICAgICBsZXQgbmV4dFNsaWRlO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNuYXBHcmlkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgIGlmIChzbmFwR3JpZFtqXSA+IC1uZXdQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIG5leHRTbGlkZSA9IGo7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHNuYXBHcmlkW25leHRTbGlkZV0gLSBuZXdQb3NpdGlvbikgPCBNYXRoLmFicyhzbmFwR3JpZFtuZXh0U2xpZGUgLSAxXSAtIG5ld1Bvc2l0aW9uKSB8fCBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHNuYXBHcmlkW25leHRTbGlkZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHNuYXBHcmlkW25leHRTbGlkZSAtIDFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdQb3NpdGlvbiA9IC1uZXdQb3NpdGlvbjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmVlZHNMb29wRml4KSB7XG4gICAgICAgICAgICBvbmNlKCd0cmFuc2l0aW9uRW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSAvLyBGaXggZHVyYXRpb25cblxuXG4gICAgICAgICAgaWYgKHN3aXBlci52ZWxvY2l0eSAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKHJ0bCkge1xuICAgICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKC1uZXdQb3NpdGlvbiAtIHN3aXBlci50cmFuc2xhdGUpIC8gc3dpcGVyLnZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1vbWVudHVtRHVyYXRpb24gPSBNYXRoLmFicygobmV3UG9zaXRpb24gLSBzd2lwZXIudHJhbnNsYXRlKSAvIHN3aXBlci52ZWxvY2l0eSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGUuc3RpY2t5KSB7XG4gICAgICAgICAgICAgIC8vIElmIGZyZWVNb2RlLnN0aWNreSBpcyBhY3RpdmUgYW5kIHRoZSB1c2VyIGVuZHMgYSBzd2lwZSB3aXRoIGEgc2xvdy12ZWxvY2l0eVxuICAgICAgICAgICAgICAvLyBldmVudCwgdGhlbiBkdXJhdGlvbnMgY2FuIGJlIDIwKyBzZWNvbmRzIHRvIHNsaWRlIG9uZSAob3IgemVybyEpIHNsaWRlcy5cbiAgICAgICAgICAgICAgLy8gSXQncyBlYXN5IHRvIHNlZSB0aGlzIHdoZW4gc2ltdWxhdGluZyB0b3VjaCB3aXRoIG1vdXNlIGV2ZW50cy4gVG8gZml4IHRoaXMsXG4gICAgICAgICAgICAgIC8vIGxpbWl0IHNpbmdsZS1zbGlkZSBzd2lwZXMgdG8gdGhlIGRlZmF1bHQgc2xpZGUgZHVyYXRpb24uIFRoaXMgYWxzbyBoYXMgdGhlXG4gICAgICAgICAgICAgIC8vIG5pY2Ugc2lkZSBlZmZlY3Qgb2YgbWF0Y2hpbmcgc2xpZGUgc3BlZWQgaWYgdGhlIHVzZXIgc3RvcHBlZCBtb3ZpbmcgYmVmb3JlXG4gICAgICAgICAgICAgIC8vIGxpZnRpbmcgZmluZ2VyIG9yIG1vdXNlIHZzLiBtb3Zpbmcgc2xvd2x5IGJlZm9yZSBsaWZ0aW5nIHRoZSBmaW5nZXIvbW91c2UuXG4gICAgICAgICAgICAgIC8vIEZvciBmYXN0ZXIgc3dpcGVzLCBhbHNvIGFwcGx5IGxpbWl0cyAoYWxiZWl0IGhpZ2hlciBvbmVzKS5cbiAgICAgICAgICAgICAgY29uc3QgbW92ZURpc3RhbmNlID0gTWF0aC5hYnMoKHJ0bCA/IC1uZXdQb3NpdGlvbiA6IG5ld1Bvc2l0aW9uKSAtIHN3aXBlci50cmFuc2xhdGUpO1xuICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2xpZGVTaXplID0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtzd2lwZXIuYWN0aXZlSW5kZXhdO1xuXG4gICAgICAgICAgICAgIGlmIChtb3ZlRGlzdGFuY2UgPCBjdXJyZW50U2xpZGVTaXplKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50dW1EdXJhdGlvbiA9IHBhcmFtcy5zcGVlZDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlRGlzdGFuY2UgPCAyICogY3VycmVudFNsaWRlU2l6ZSkge1xuICAgICAgICAgICAgICAgIG1vbWVudHVtRHVyYXRpb24gPSBwYXJhbXMuc3BlZWQgKiAxLjU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9tZW50dW1EdXJhdGlvbiA9IHBhcmFtcy5zcGVlZCAqIDIuNTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmZyZWVNb2RlLnN0aWNreSkge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5mcmVlTW9kZS5tb21lbnR1bUJvdW5jZSAmJiBkb0JvdW5jZSkge1xuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKGFmdGVyQm91bmNlUG9zaXRpb24pO1xuICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbik7XG4gICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uU3RhcnQodHJ1ZSwgc3dpcGVyLnN3aXBlRGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhZGF0YS5hbGxvd01vbWVudHVtQm91bmNlKSByZXR1cm47XG4gICAgICAgICAgICAgIGVtaXQoJ21vbWVudHVtQm91bmNlJyk7XG4gICAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHBhcmFtcy5zcGVlZCk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzd2lwZXIudmVsb2NpdHkpIHtcbiAgICAgICAgICAgIGVtaXQoJ19mcmVlTW9kZU5vTW9tZW50dW1SZWxlYXNlJyk7XG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbik7XG4gICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uU3RhcnQodHJ1ZSwgc3dpcGVyLnN3aXBlRGlyZWN0aW9uKTtcblxuICAgICAgICAgICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAkd3JhcHBlckVsLnRyYW5zaXRpb25FbmQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5mcmVlTW9kZS5zdGlja3kpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUb0Nsb3Nlc3QoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgZW1pdCgnX2ZyZWVNb2RlTm9Nb21lbnR1bVJlbGVhc2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFyYW1zLmZyZWVNb2RlLm1vbWVudHVtIHx8IHRpbWVEaWZmID49IHBhcmFtcy5sb25nU3dpcGVzTXMpIHtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICAgIGZyZWVNb2RlOiB7XG4gICAgICAgICAgb25Ub3VjaFN0YXJ0LFxuICAgICAgICAgIG9uVG91Y2hNb3ZlLFxuICAgICAgICAgIG9uVG91Y2hFbmRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gR3JpZChfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtc1xuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBncmlkOiB7XG4gICAgICAgICAgcm93czogMSxcbiAgICAgICAgICBmaWxsOiAnY29sdW1uJ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxldCBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzO1xuICAgICAgbGV0IHNsaWRlc1BlclJvdztcbiAgICAgIGxldCBudW1GdWxsQ29sdW1ucztcblxuICAgICAgY29uc3QgaW5pdFNsaWRlcyA9IHNsaWRlc0xlbmd0aCA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3XG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcm93cyxcbiAgICAgICAgICBmaWxsXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLmdyaWQ7XG4gICAgICAgIHNsaWRlc1BlclJvdyA9IHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgLyByb3dzO1xuICAgICAgICBudW1GdWxsQ29sdW1ucyA9IE1hdGguZmxvb3Ioc2xpZGVzTGVuZ3RoIC8gcm93cyk7XG5cbiAgICAgICAgaWYgKE1hdGguZmxvb3Ioc2xpZGVzTGVuZ3RoIC8gcm93cykgPT09IHNsaWRlc0xlbmd0aCAvIHJvd3MpIHtcbiAgICAgICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gc2xpZGVzTGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgPSBNYXRoLmNlaWwoc2xpZGVzTGVuZ3RoIC8gcm93cykgKiByb3dzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiBmaWxsID09PSAncm93Jykge1xuICAgICAgICAgIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgPSBNYXRoLm1heChzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzLCBzbGlkZXNQZXJWaWV3ICogcm93cyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHVwZGF0ZVNsaWRlID0gKGksIHNsaWRlLCBzbGlkZXNMZW5ndGgsIGdldERpcmVjdGlvbkxhYmVsKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXNQZXJHcm91cCxcbiAgICAgICAgICBzcGFjZUJldHdlZW5cbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXM7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICByb3dzLFxuICAgICAgICAgIGZpbGxcbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXMuZ3JpZDsgLy8gU2V0IHNsaWRlcyBvcmRlclxuXG4gICAgICAgIGxldCBuZXdTbGlkZU9yZGVySW5kZXg7XG4gICAgICAgIGxldCBjb2x1bW47XG4gICAgICAgIGxldCByb3c7XG5cbiAgICAgICAgaWYgKGZpbGwgPT09ICdyb3cnICYmIHNsaWRlc1Blckdyb3VwID4gMSkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwSW5kZXggPSBNYXRoLmZsb29yKGkgLyAoc2xpZGVzUGVyR3JvdXAgKiByb3dzKSk7XG4gICAgICAgICAgY29uc3Qgc2xpZGVJbmRleEluR3JvdXAgPSBpIC0gcm93cyAqIHNsaWRlc1Blckdyb3VwICogZ3JvdXBJbmRleDtcbiAgICAgICAgICBjb25zdCBjb2x1bW5zSW5Hcm91cCA9IGdyb3VwSW5kZXggPT09IDAgPyBzbGlkZXNQZXJHcm91cCA6IE1hdGgubWluKE1hdGguY2VpbCgoc2xpZGVzTGVuZ3RoIC0gZ3JvdXBJbmRleCAqIHJvd3MgKiBzbGlkZXNQZXJHcm91cCkgLyByb3dzKSwgc2xpZGVzUGVyR3JvdXApO1xuICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3Ioc2xpZGVJbmRleEluR3JvdXAgLyBjb2x1bW5zSW5Hcm91cCk7XG4gICAgICAgICAgY29sdW1uID0gc2xpZGVJbmRleEluR3JvdXAgLSByb3cgKiBjb2x1bW5zSW5Hcm91cCArIGdyb3VwSW5kZXggKiBzbGlkZXNQZXJHcm91cDtcbiAgICAgICAgICBuZXdTbGlkZU9yZGVySW5kZXggPSBjb2x1bW4gKyByb3cgKiBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzIC8gcm93cztcbiAgICAgICAgICBzbGlkZS5jc3Moe1xuICAgICAgICAgICAgJy13ZWJraXQtb3JkZXInOiBuZXdTbGlkZU9yZGVySW5kZXgsXG4gICAgICAgICAgICBvcmRlcjogbmV3U2xpZGVPcmRlckluZGV4XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmlsbCA9PT0gJ2NvbHVtbicpIHtcbiAgICAgICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKGkgLyByb3dzKTtcbiAgICAgICAgICByb3cgPSBpIC0gY29sdW1uICogcm93cztcblxuICAgICAgICAgIGlmIChjb2x1bW4gPiBudW1GdWxsQ29sdW1ucyB8fCBjb2x1bW4gPT09IG51bUZ1bGxDb2x1bW5zICYmIHJvdyA9PT0gcm93cyAtIDEpIHtcbiAgICAgICAgICAgIHJvdyArPSAxO1xuXG4gICAgICAgICAgICBpZiAocm93ID49IHJvd3MpIHtcbiAgICAgICAgICAgICAgcm93ID0gMDtcbiAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoaSAvIHNsaWRlc1BlclJvdyk7XG4gICAgICAgICAgY29sdW1uID0gaSAtIHJvdyAqIHNsaWRlc1BlclJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlLmNzcyhnZXREaXJlY3Rpb25MYWJlbCgnbWFyZ2luLXRvcCcpLCByb3cgIT09IDAgPyBzcGFjZUJldHdlZW4gJiYgYCR7c3BhY2VCZXR3ZWVufXB4YCA6ICcnKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHVwZGF0ZVdyYXBwZXJTaXplID0gKHNsaWRlU2l6ZSwgc25hcEdyaWQsIGdldERpcmVjdGlvbkxhYmVsKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzcGFjZUJldHdlZW4sXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXMsXG4gICAgICAgICAgcm91bmRMZW5ndGhzXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcm93c1xuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcy5ncmlkO1xuICAgICAgICBzd2lwZXIudmlydHVhbFNpemUgPSAoc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuKSAqIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3M7XG4gICAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSA9IE1hdGguY2VpbChzd2lwZXIudmlydHVhbFNpemUgLyByb3dzKSAtIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuY3NzKHtcbiAgICAgICAgICBbZ2V0RGlyZWN0aW9uTGFiZWwoJ3dpZHRoJyldOiBgJHtzd2lwZXIudmlydHVhbFNpemUgKyBzcGFjZUJldHdlZW59cHhgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgIHNuYXBHcmlkLnNwbGljZSgwLCBzbmFwR3JpZC5sZW5ndGgpO1xuICAgICAgICAgIGNvbnN0IG5ld1NsaWRlc0dyaWQgPSBbXTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25hcEdyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBzbGlkZXNHcmlkSXRlbSA9IHNuYXBHcmlkW2ldO1xuICAgICAgICAgICAgaWYgKHJvdW5kTGVuZ3Rocykgc2xpZGVzR3JpZEl0ZW0gPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRJdGVtKTtcbiAgICAgICAgICAgIGlmIChzbmFwR3JpZFtpXSA8IHN3aXBlci52aXJ0dWFsU2l6ZSArIHNuYXBHcmlkWzBdKSBuZXdTbGlkZXNHcmlkLnB1c2goc2xpZGVzR3JpZEl0ZW0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNuYXBHcmlkLnB1c2goLi4ubmV3U2xpZGVzR3JpZCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHN3aXBlci5ncmlkID0ge1xuICAgICAgICBpbml0U2xpZGVzLFxuICAgICAgICB1cGRhdGVTbGlkZSxcbiAgICAgICAgdXBkYXRlV3JhcHBlclNpemVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kU2xpZGUoc2xpZGVzKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICBwYXJhbXNcbiAgICAgIH0gPSBzd2lwZXI7XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzbGlkZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzbGlkZXNbaV0pICR3cmFwcGVyRWwuYXBwZW5kKHNsaWRlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICR3cmFwcGVyRWwuYXBwZW5kKHNsaWRlcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhcmFtcy5vYnNlcnZlcikge1xuICAgICAgICBzd2lwZXIudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGVuZFNsaWRlKHNsaWRlcykge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgfSA9IHN3aXBlcjtcblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIDE7XG5cbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBzbGlkZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoc2xpZGVzW2ldKSAkd3JhcHBlckVsLnByZXBlbmQoc2xpZGVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyBzbGlkZXMubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHdyYXBwZXJFbC5wcmVwZW5kKHNsaWRlcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhcmFtcy5vYnNlcnZlcikge1xuICAgICAgICBzd2lwZXIudXBkYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU2xpZGUoaW5kZXgsIHNsaWRlcykge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgJHdyYXBwZXJFbCxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGxldCBhY3RpdmVJbmRleEJ1ZmZlciA9IGFjdGl2ZUluZGV4O1xuXG4gICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgYWN0aXZlSW5kZXhCdWZmZXIgLT0gc3dpcGVyLmxvb3BlZFNsaWRlcztcbiAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICAgIHN3aXBlci5zbGlkZXMgPSAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc31gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFzZUxlbmd0aCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuXG4gICAgICBpZiAoaW5kZXggPD0gMCkge1xuICAgICAgICBzd2lwZXIucHJlcGVuZFNsaWRlKHNsaWRlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4ID49IGJhc2VMZW5ndGgpIHtcbiAgICAgICAgc3dpcGVyLmFwcGVuZFNsaWRlKHNsaWRlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXhCdWZmZXIgPiBpbmRleCA/IGFjdGl2ZUluZGV4QnVmZmVyICsgMSA6IGFjdGl2ZUluZGV4QnVmZmVyO1xuICAgICAgY29uc3Qgc2xpZGVzQnVmZmVyID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSBiYXNlTGVuZ3RoIC0gMTsgaSA+PSBpbmRleDsgaSAtPSAxKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoaSk7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmUoKTtcbiAgICAgICAgc2xpZGVzQnVmZmVyLnVuc2hpZnQoY3VycmVudFNsaWRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzbGlkZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzbGlkZXNbaV0pICR3cmFwcGVyRWwuYXBwZW5kKHNsaWRlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4QnVmZmVyID4gaW5kZXggPyBhY3RpdmVJbmRleEJ1ZmZlciArIHNsaWRlcy5sZW5ndGggOiBhY3RpdmVJbmRleEJ1ZmZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICR3cmFwcGVyRWwuYXBwZW5kKHNsaWRlcyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzQnVmZmVyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICR3cmFwcGVyRWwuYXBwZW5kKHNsaWRlc0J1ZmZlcltpXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhcmFtcy5vYnNlcnZlcikge1xuICAgICAgICBzd2lwZXIudXBkYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlU2xpZGUoc2xpZGVzSW5kZXhlcykge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGxldCBhY3RpdmVJbmRleEJ1ZmZlciA9IGFjdGl2ZUluZGV4O1xuXG4gICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgYWN0aXZlSW5kZXhCdWZmZXIgLT0gc3dpcGVyLmxvb3BlZFNsaWRlcztcbiAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICAgIHN3aXBlci5zbGlkZXMgPSAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc31gKTtcbiAgICAgIH1cblxuICAgICAgbGV0IG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXhCdWZmZXI7XG4gICAgICBsZXQgaW5kZXhUb1JlbW92ZTtcblxuICAgICAgaWYgKHR5cGVvZiBzbGlkZXNJbmRleGVzID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBzbGlkZXNJbmRleGVzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzSW5kZXhlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzW2ldO1xuICAgICAgICAgIGlmIChzd2lwZXIuc2xpZGVzW2luZGV4VG9SZW1vdmVdKSBzd2lwZXIuc2xpZGVzLmVxKGluZGV4VG9SZW1vdmUpLnJlbW92ZSgpO1xuICAgICAgICAgIGlmIChpbmRleFRvUmVtb3ZlIDwgbmV3QWN0aXZlSW5kZXgpIG5ld0FjdGl2ZUluZGV4IC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzO1xuICAgICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgc3dpcGVyLnNsaWRlcy5lcShpbmRleFRvUmVtb3ZlKS5yZW1vdmUoKTtcbiAgICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPCBuZXdBY3RpdmVJbmRleCkgbmV3QWN0aXZlSW5kZXggLT0gMTtcbiAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBNYXRoLm1heChuZXdBY3RpdmVJbmRleCwgMCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhcmFtcy5vYnNlcnZlcikge1xuICAgICAgICBzd2lwZXIudXBkYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsU2xpZGVzKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHNsaWRlc0luZGV4ZXMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHNsaWRlc0luZGV4ZXMucHVzaChpKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLnJlbW92ZVNsaWRlKHNsaWRlc0luZGV4ZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIE1hbmlwdWxhdGlvbihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXJcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgYXBwZW5kU2xpZGU6IGFwcGVuZFNsaWRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgcHJlcGVuZFNsaWRlOiBwcmVwZW5kU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgICBhZGRTbGlkZTogYWRkU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgICByZW1vdmVTbGlkZTogcmVtb3ZlU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgICByZW1vdmVBbGxTbGlkZXM6IHJlbW92ZUFsbFNsaWRlcy5iaW5kKHN3aXBlcilcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVmZmVjdEluaXQocGFyYW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGVmZmVjdCxcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBvbixcbiAgICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgICBzZXRUcmFuc2l0aW9uLFxuICAgICAgICBvdmVyd3JpdGVQYXJhbXMsXG4gICAgICAgIHBlcnNwZWN0aXZlLFxuICAgICAgICByZWNyZWF0ZVNoYWRvd3MsXG4gICAgICAgIGdldEVmZmVjdFBhcmFtc1xuICAgICAgfSA9IHBhcmFtcztcbiAgICAgIG9uKCdiZWZvcmVJbml0JywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30ke2VmZmVjdH1gKTtcblxuICAgICAgICBpZiAocGVyc3BlY3RpdmUgJiYgcGVyc3BlY3RpdmUoKSkge1xuICAgICAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfTNkYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvdmVyd3JpdGVQYXJhbXNSZXN1bHQgPSBvdmVyd3JpdGVQYXJhbXMgPyBvdmVyd3JpdGVQYXJhbXMoKSA6IHt9O1xuICAgICAgICBPYmplY3QuYXNzaWduKHN3aXBlci5wYXJhbXMsIG92ZXJ3cml0ZVBhcmFtc1Jlc3VsdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLm9yaWdpbmFsUGFyYW1zLCBvdmVyd3JpdGVQYXJhbXNSZXN1bHQpO1xuICAgICAgfSk7XG4gICAgICBvbignc2V0VHJhbnNsYXRlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuICAgICAgICBzZXRUcmFuc2xhdGUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3NldFRyYW5zaXRpb24nLCAoX3MsIGR1cmF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gZWZmZWN0KSByZXR1cm47XG4gICAgICAgIHNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgfSk7XG4gICAgICBvbigndHJhbnNpdGlvbkVuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSBlZmZlY3QpIHJldHVybjtcblxuICAgICAgICBpZiAocmVjcmVhdGVTaGFkb3dzKSB7XG4gICAgICAgICAgaWYgKCFnZXRFZmZlY3RQYXJhbXMgfHwgIWdldEVmZmVjdFBhcmFtcygpLnNsaWRlU2hhZG93cykgcmV0dXJuOyAvLyByZW1vdmUgc2hhZG93c1xuXG4gICAgICAgICAgc3dpcGVyLnNsaWRlcy5lYWNoKHNsaWRlRWwgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHNsaWRlRWwgPSBzd2lwZXIuJChzbGlkZUVsKTtcbiAgICAgICAgICAgICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpLnJlbW92ZSgpO1xuICAgICAgICAgIH0pOyAvLyBjcmVhdGUgbmV3IG9uZVxuXG4gICAgICAgICAgcmVjcmVhdGVTaGFkb3dzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGV0IHJlcXVpcmVVcGRhdGVPblZpcnR1YWw7XG4gICAgICBvbigndmlydHVhbFVwZGF0ZScsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSBlZmZlY3QpIHJldHVybjtcblxuICAgICAgICBpZiAoIXN3aXBlci5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgcmVxdWlyZVVwZGF0ZU9uVmlydHVhbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGlmIChyZXF1aXJlVXBkYXRlT25WaXJ0dWFsICYmIHN3aXBlci5zbGlkZXMgJiYgc3dpcGVyLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgcmVxdWlyZVVwZGF0ZU9uVmlydHVhbCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlZmZlY3RUYXJnZXQoZWZmZWN0UGFyYW1zLCAkc2xpZGVFbCkge1xuICAgICAgaWYgKGVmZmVjdFBhcmFtcy50cmFuc2Zvcm1FbCkge1xuICAgICAgICByZXR1cm4gJHNsaWRlRWwuZmluZChlZmZlY3RQYXJhbXMudHJhbnNmb3JtRWwpLmNzcyh7XG4gICAgICAgICAgJ2JhY2tmYWNlLXZpc2liaWxpdHknOiAnaGlkZGVuJyxcbiAgICAgICAgICAnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5JzogJ2hpZGRlbidcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkc2xpZGVFbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZChfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGR1cmF0aW9uLFxuICAgICAgICB0cmFuc2Zvcm1FbCxcbiAgICAgICAgYWxsU2xpZGVzXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc2xpZGVzLFxuICAgICAgICBhY3RpdmVJbmRleCxcbiAgICAgICAgJHdyYXBwZXJFbFxuICAgICAgfSA9IHN3aXBlcjtcblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSAmJiBkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICBsZXQgZXZlbnRUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0ICR0cmFuc2l0aW9uRW5kVGFyZ2V0O1xuXG4gICAgICAgIGlmIChhbGxTbGlkZXMpIHtcbiAgICAgICAgICAkdHJhbnNpdGlvbkVuZFRhcmdldCA9IHRyYW5zZm9ybUVsID8gc2xpZGVzLmZpbmQodHJhbnNmb3JtRWwpIDogc2xpZGVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICR0cmFuc2l0aW9uRW5kVGFyZ2V0ID0gdHJhbnNmb3JtRWwgPyBzbGlkZXMuZXEoYWN0aXZlSW5kZXgpLmZpbmQodHJhbnNmb3JtRWwpIDogc2xpZGVzLmVxKGFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICR0cmFuc2l0aW9uRW5kVGFyZ2V0LnRyYW5zaXRpb25FbmQoKCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudFRyaWdnZXJlZCkgcmV0dXJuO1xuICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCddO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlnZ2VyRXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAkd3JhcHBlckVsLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBFZmZlY3RGYWRlKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvblxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBmYWRlRWZmZWN0OiB7XG4gICAgICAgICAgY3Jvc3NGYWRlOiBmYWxzZSxcbiAgICAgICAgICB0cmFuc2Zvcm1FbDogbnVsbFxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNsYXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2xpZGVzXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuZmFkZUVmZmVjdDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0ICRzbGlkZUVsID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkc2xpZGVFbFswXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgICAgICBsZXQgdHggPSAtb2Zmc2V0O1xuICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB0eCAtPSBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgICAgIGxldCB0eSA9IDA7XG5cbiAgICAgICAgICBpZiAoIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgdHkgPSB0eDtcbiAgICAgICAgICAgIHR4ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzbGlkZU9wYWNpdHkgPSBzd2lwZXIucGFyYW1zLmZhZGVFZmZlY3QuY3Jvc3NGYWRlID8gTWF0aC5tYXgoMSAtIE1hdGguYWJzKCRzbGlkZUVsWzBdLnByb2dyZXNzKSwgMCkgOiAxICsgTWF0aC5taW4oTWF0aC5tYXgoJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIC0xKSwgMCk7XG4gICAgICAgICAgY29uc3QgJHRhcmdldEVsID0gZWZmZWN0VGFyZ2V0KHBhcmFtcywgJHNsaWRlRWwpO1xuICAgICAgICAgICR0YXJnZXRFbC5jc3Moe1xuICAgICAgICAgICAgb3BhY2l0eTogc2xpZGVPcGFjaXR5XG4gICAgICAgICAgfSkudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgke3R4fXB4LCAke3R5fXB4LCAwcHgpYCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNldFRyYW5zaXRpb24gPSBkdXJhdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB0cmFuc2Zvcm1FbFxuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcy5mYWRlRWZmZWN0O1xuICAgICAgICBjb25zdCAkdHJhbnNpdGlvbkVsZW1lbnRzID0gdHJhbnNmb3JtRWwgPyBzd2lwZXIuc2xpZGVzLmZpbmQodHJhbnNmb3JtRWwpIDogc3dpcGVyLnNsaWRlcztcbiAgICAgICAgJHRyYW5zaXRpb25FbGVtZW50cy50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgZWZmZWN0VmlydHVhbFRyYW5zaXRpb25FbmQoe1xuICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICB0cmFuc2Zvcm1FbCxcbiAgICAgICAgICBhbGxTbGlkZXM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBlZmZlY3RJbml0KHtcbiAgICAgICAgZWZmZWN0OiAnZmFkZScsXG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgb24sXG4gICAgICAgIHNldFRyYW5zbGF0ZSxcbiAgICAgICAgc2V0VHJhbnNpdGlvbixcbiAgICAgICAgb3ZlcndyaXRlUGFyYW1zOiAoKSA9PiAoe1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgdmlydHVhbFRyYW5zbGF0ZTogIXN3aXBlci5wYXJhbXMuY3NzTW9kZVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gRWZmZWN0Q3ViZShfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgY3ViZUVmZmVjdDoge1xuICAgICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgICAgICBzaGFkb3c6IHRydWUsXG4gICAgICAgICAgc2hhZG93T2Zmc2V0OiAyMCxcbiAgICAgICAgICBzaGFkb3dTY2FsZTogMC45NFxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY3JlYXRlU2xpZGVTaGFkb3dzID0gKCRzbGlkZUVsLCBwcm9ncmVzcywgaXNIb3Jpem9udGFsKSA9PiB7XG4gICAgICAgIGxldCBzaGFkb3dCZWZvcmUgPSBpc0hvcml6b250YWwgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AnKTtcbiAgICAgICAgbGV0IHNoYWRvd0FmdGVyID0gaXNIb3Jpem9udGFsID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuXG4gICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc2hhZG93QmVmb3JlID0gJChgPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJHtpc0hvcml6b250YWwgPyAnbGVmdCcgOiAndG9wJ31cIj48L2Rpdj5gKTtcbiAgICAgICAgICAkc2xpZGVFbC5hcHBlbmQoc2hhZG93QmVmb3JlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzaGFkb3dBZnRlciA9ICQoYDxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LSR7aXNIb3Jpem9udGFsID8gJ3JpZ2h0JyA6ICdib3R0b20nfVwiPjwvZGl2PmApO1xuICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dBZnRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCkgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heCgtcHJvZ3Jlc3MsIDApO1xuICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVjcmVhdGVTaGFkb3dzID0gKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgbmV3IG9uZXNcbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgICAgICBzd2lwZXIuc2xpZGVzLmVhY2goc2xpZGVFbCA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbihzbGlkZUVsLnByb2dyZXNzLCAxKSwgLTEpO1xuICAgICAgICAgIGNyZWF0ZVNsaWRlU2hhZG93cygkKHNsaWRlRWwpLCBwcm9ncmVzcywgaXNIb3Jpem9udGFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkZWwsXG4gICAgICAgICAgJHdyYXBwZXJFbCxcbiAgICAgICAgICBzbGlkZXMsXG4gICAgICAgICAgd2lkdGg6IHN3aXBlcldpZHRoLFxuICAgICAgICAgIGhlaWdodDogc3dpcGVySGVpZ2h0LFxuICAgICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgICAgICAgIHNpemU6IHN3aXBlclNpemUsXG4gICAgICAgICAgYnJvd3NlclxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmN1YmVFZmZlY3Q7XG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICAgICAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gICAgICAgIGxldCB3cmFwcGVyUm90YXRlID0gMDtcbiAgICAgICAgbGV0ICRjdWJlU2hhZG93RWw7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5zaGFkb3cpIHtcbiAgICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICAkY3ViZVNoYWRvd0VsID0gJHdyYXBwZXJFbC5maW5kKCcuc3dpcGVyLWN1YmUtc2hhZG93Jyk7XG5cbiAgICAgICAgICAgIGlmICgkY3ViZVNoYWRvd0VsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAkY3ViZVNoYWRvd0VsID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1jdWJlLXNoYWRvd1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAkd3JhcHBlckVsLmFwcGVuZCgkY3ViZVNoYWRvd0VsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGN1YmVTaGFkb3dFbC5jc3Moe1xuICAgICAgICAgICAgICBoZWlnaHQ6IGAke3N3aXBlcldpZHRofXB4YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRjdWJlU2hhZG93RWwgPSAkZWwuZmluZCgnLnN3aXBlci1jdWJlLXNoYWRvdycpO1xuXG4gICAgICAgICAgICBpZiAoJGN1YmVTaGFkb3dFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgJGN1YmVTaGFkb3dFbCA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgJGVsLmFwcGVuZCgkY3ViZVNoYWRvd0VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0ICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgICAgIGxldCBzbGlkZUluZGV4ID0gaTtcblxuICAgICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICAgIHNsaWRlSW5kZXggPSBwYXJzZUludCgkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHNsaWRlQW5nbGUgPSBzbGlkZUluZGV4ICogOTA7XG4gICAgICAgICAgbGV0IHJvdW5kID0gTWF0aC5mbG9vcihzbGlkZUFuZ2xlIC8gMzYwKTtcblxuICAgICAgICAgIGlmIChydGwpIHtcbiAgICAgICAgICAgIHNsaWRlQW5nbGUgPSAtc2xpZGVBbmdsZTtcbiAgICAgICAgICAgIHJvdW5kID0gTWF0aC5mbG9vcigtc2xpZGVBbmdsZSAvIDM2MCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigkc2xpZGVFbFswXS5wcm9ncmVzcywgMSksIC0xKTtcbiAgICAgICAgICBsZXQgdHggPSAwO1xuICAgICAgICAgIGxldCB0eSA9IDA7XG4gICAgICAgICAgbGV0IHR6ID0gMDtcblxuICAgICAgICAgIGlmIChzbGlkZUluZGV4ICUgNCA9PT0gMCkge1xuICAgICAgICAgICAgdHggPSAtcm91bmQgKiA0ICogc3dpcGVyU2l6ZTtcbiAgICAgICAgICAgIHR6ID0gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKChzbGlkZUluZGV4IC0gMSkgJSA0ID09PSAwKSB7XG4gICAgICAgICAgICB0eCA9IDA7XG4gICAgICAgICAgICB0eiA9IC1yb3VuZCAqIDQgKiBzd2lwZXJTaXplO1xuICAgICAgICAgIH0gZWxzZSBpZiAoKHNsaWRlSW5kZXggLSAyKSAlIDQgPT09IDApIHtcbiAgICAgICAgICAgIHR4ID0gc3dpcGVyU2l6ZSArIHJvdW5kICogNCAqIHN3aXBlclNpemU7XG4gICAgICAgICAgICB0eiA9IHN3aXBlclNpemU7XG4gICAgICAgICAgfSBlbHNlIGlmICgoc2xpZGVJbmRleCAtIDMpICUgNCA9PT0gMCkge1xuICAgICAgICAgICAgdHggPSAtc3dpcGVyU2l6ZTtcbiAgICAgICAgICAgIHR6ID0gMyAqIHN3aXBlclNpemUgKyBzd2lwZXJTaXplICogNCAqIHJvdW5kO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChydGwpIHtcbiAgICAgICAgICAgIHR4ID0gLXR4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICB0eSA9IHR4O1xuICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGByb3RhdGVYKCR7aXNIb3Jpem9udGFsID8gMCA6IC1zbGlkZUFuZ2xlfWRlZykgcm90YXRlWSgke2lzSG9yaXpvbnRhbCA/IHNsaWRlQW5nbGUgOiAwfWRlZykgdHJhbnNsYXRlM2QoJHt0eH1weCwgJHt0eX1weCwgJHt0en1weClgO1xuXG4gICAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEgJiYgcHJvZ3Jlc3MgPiAtMSkge1xuICAgICAgICAgICAgd3JhcHBlclJvdGF0ZSA9IHNsaWRlSW5kZXggKiA5MCArIHByb2dyZXNzICogOTA7XG4gICAgICAgICAgICBpZiAocnRsKSB3cmFwcGVyUm90YXRlID0gLXNsaWRlSW5kZXggKiA5MCAtIHByb2dyZXNzICogOTA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNsaWRlRWwudHJhbnNmb3JtKHRyYW5zZm9ybSk7XG5cbiAgICAgICAgICBpZiAocGFyYW1zLnNsaWRlU2hhZG93cykge1xuICAgICAgICAgICAgY3JlYXRlU2xpZGVTaGFkb3dzKCRzbGlkZUVsLCBwcm9ncmVzcywgaXNIb3Jpem9udGFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkd3JhcHBlckVsLmNzcyh7XG4gICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbic6IGA1MCUgNTAlIC0ke3N3aXBlclNpemUgLyAyfXB4YCxcbiAgICAgICAgICAndHJhbnNmb3JtLW9yaWdpbic6IGA1MCUgNTAlIC0ke3N3aXBlclNpemUgLyAyfXB4YFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocGFyYW1zLnNoYWRvdykge1xuICAgICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICRjdWJlU2hhZG93RWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgwcHgsICR7c3dpcGVyV2lkdGggLyAyICsgcGFyYW1zLnNoYWRvd09mZnNldH1weCwgJHstc3dpcGVyV2lkdGggLyAyfXB4KSByb3RhdGVYKDkwZGVnKSByb3RhdGVaKDBkZWcpIHNjYWxlKCR7cGFyYW1zLnNoYWRvd1NjYWxlfSlgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2hhZG93QW5nbGUgPSBNYXRoLmFicyh3cmFwcGVyUm90YXRlKSAtIE1hdGguZmxvb3IoTWF0aC5hYnMod3JhcHBlclJvdGF0ZSkgLyA5MCkgKiA5MDtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSAxLjUgLSAoTWF0aC5zaW4oc2hhZG93QW5nbGUgKiAyICogTWF0aC5QSSAvIDM2MCkgLyAyICsgTWF0aC5jb3Moc2hhZG93QW5nbGUgKiAyICogTWF0aC5QSSAvIDM2MCkgLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlMSA9IHBhcmFtcy5zaGFkb3dTY2FsZTtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlMiA9IHBhcmFtcy5zaGFkb3dTY2FsZSAvIG11bHRpcGxpZXI7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBwYXJhbXMuc2hhZG93T2Zmc2V0O1xuICAgICAgICAgICAgJGN1YmVTaGFkb3dFbC50cmFuc2Zvcm0oYHNjYWxlM2QoJHtzY2FsZTF9LCAxLCAke3NjYWxlMn0pIHRyYW5zbGF0ZTNkKDBweCwgJHtzd2lwZXJIZWlnaHQgLyAyICsgb2Zmc2V0fXB4LCAkey1zd2lwZXJIZWlnaHQgLyAyIC8gc2NhbGUyfXB4KSByb3RhdGVYKC05MGRlZylgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB6RmFjdG9yID0gYnJvd3Nlci5pc1NhZmFyaSB8fCBicm93c2VyLmlzV2ViVmlldyA/IC1zd2lwZXJTaXplIC8gMiA6IDA7XG4gICAgICAgICR3cmFwcGVyRWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgwcHgsMCwke3pGYWN0b3J9cHgpIHJvdGF0ZVgoJHtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAwIDogd3JhcHBlclJvdGF0ZX1kZWcpIHJvdGF0ZVkoJHtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAtd3JhcHBlclJvdGF0ZSA6IDB9ZGVnKWApO1xuICAgICAgICAkd3JhcHBlckVsWzBdLnN0eWxlLnNldFByb3BlcnR5KCctLXN3aXBlci1jdWJlLXRyYW5zbGF0ZS16JywgYCR7ekZhY3Rvcn1weGApO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNpdGlvbiA9IGR1cmF0aW9uID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRlbCxcbiAgICAgICAgICBzbGlkZXNcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgc2xpZGVzLnRyYW5zaXRpb24oZHVyYXRpb24pLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmN1YmVFZmZlY3Quc2hhZG93ICYmICFzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAkZWwuZmluZCgnLnN3aXBlci1jdWJlLXNoYWRvdycpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBlZmZlY3RJbml0KHtcbiAgICAgICAgZWZmZWN0OiAnY3ViZScsXG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgb24sXG4gICAgICAgIHNldFRyYW5zbGF0ZSxcbiAgICAgICAgc2V0VHJhbnNpdGlvbixcbiAgICAgICAgcmVjcmVhdGVTaGFkb3dzLFxuICAgICAgICBnZXRFZmZlY3RQYXJhbXM6ICgpID0+IHN3aXBlci5wYXJhbXMuY3ViZUVmZmVjdCxcbiAgICAgICAgcGVyc3BlY3RpdmU6ICgpID0+IHRydWUsXG4gICAgICAgIG92ZXJ3cml0ZVBhcmFtczogKCkgPT4gKHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgcmVzaXN0YW5jZVJhdGlvOiAwLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICAgICAgdmlydHVhbFRyYW5zbGF0ZTogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2hhZG93KHBhcmFtcywgJHNsaWRlRWwsIHNpZGUpIHtcbiAgICAgIGNvbnN0IHNoYWRvd0NsYXNzID0gYHN3aXBlci1zbGlkZS1zaGFkb3cke3NpZGUgPyBgLSR7c2lkZX1gIDogJyd9YDtcbiAgICAgIGNvbnN0ICRzaGFkb3dDb250YWluZXIgPSBwYXJhbXMudHJhbnNmb3JtRWwgPyAkc2xpZGVFbC5maW5kKHBhcmFtcy50cmFuc2Zvcm1FbCkgOiAkc2xpZGVFbDtcbiAgICAgIGxldCAkc2hhZG93RWwgPSAkc2hhZG93Q29udGFpbmVyLmNoaWxkcmVuKGAuJHtzaGFkb3dDbGFzc31gKTtcblxuICAgICAgaWYgKCEkc2hhZG93RWwubGVuZ3RoKSB7XG4gICAgICAgICRzaGFkb3dFbCA9ICQoYDxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93JHtzaWRlID8gYC0ke3NpZGV9YCA6ICcnfVwiPjwvZGl2PmApO1xuICAgICAgICAkc2hhZG93Q29udGFpbmVyLmFwcGVuZCgkc2hhZG93RWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHNoYWRvd0VsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVmZmVjdEZsaXAoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGZsaXBFZmZlY3Q6IHtcbiAgICAgICAgICBzbGlkZVNoYWRvd3M6IHRydWUsXG4gICAgICAgICAgbGltaXRSb3RhdGlvbjogdHJ1ZSxcbiAgICAgICAgICB0cmFuc2Zvcm1FbDogbnVsbFxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY3JlYXRlU2xpZGVTaGFkb3dzID0gKCRzbGlkZUVsLCBwcm9ncmVzcywgcGFyYW1zKSA9PiB7XG4gICAgICAgIGxldCBzaGFkb3dCZWZvcmUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AnKTtcbiAgICAgICAgbGV0IHNoYWRvd0FmdGVyID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuXG4gICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc2hhZG93QmVmb3JlID0gY3JlYXRlU2hhZG93KHBhcmFtcywgJHNsaWRlRWwsIHN3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzaGFkb3dBZnRlciA9IGNyZWF0ZVNoYWRvdyhwYXJhbXMsICRzbGlkZUVsLCBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAncmlnaHQnIDogJ2JvdHRvbScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgoLXByb2dyZXNzLCAwKTtcbiAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCkgc2hhZG93QWZ0ZXJbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KHByb2dyZXNzLCAwKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlY3JlYXRlU2hhZG93cyA9ICgpID0+IHtcbiAgICAgICAgLy8gU2V0IHNoYWRvd3NcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5mbGlwRWZmZWN0O1xuICAgICAgICBzd2lwZXIuc2xpZGVzLmVhY2goc2xpZGVFbCA9PiB7XG4gICAgICAgICAgY29uc3QgJHNsaWRlRWwgPSAkKHNsaWRlRWwpO1xuICAgICAgICAgIGxldCBwcm9ncmVzcyA9ICRzbGlkZUVsWzBdLnByb2dyZXNzO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZmxpcEVmZmVjdC5saW1pdFJvdGF0aW9uKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKHNsaWRlRWwucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3JlYXRlU2xpZGVTaGFkb3dzKCRzbGlkZUVsLCBwcm9ncmVzcywgcGFyYW1zKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXMsXG4gICAgICAgICAgcnRsVHJhbnNsYXRlOiBydGxcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5mbGlwRWZmZWN0O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgJHNsaWRlRWwgPSBzbGlkZXMuZXEoaSk7XG4gICAgICAgICAgbGV0IHByb2dyZXNzID0gJHNsaWRlRWxbMF0ucHJvZ3Jlc3M7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mbGlwRWZmZWN0LmxpbWl0Um90YXRpb24pIHtcbiAgICAgICAgICAgIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gJHNsaWRlRWxbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgICAgY29uc3Qgcm90YXRlID0gLTE4MCAqIHByb2dyZXNzO1xuICAgICAgICAgIGxldCByb3RhdGVZID0gcm90YXRlO1xuICAgICAgICAgIGxldCByb3RhdGVYID0gMDtcbiAgICAgICAgICBsZXQgdHggPSBzd2lwZXIucGFyYW1zLmNzc01vZGUgPyAtb2Zmc2V0IC0gc3dpcGVyLnRyYW5zbGF0ZSA6IC1vZmZzZXQ7XG4gICAgICAgICAgbGV0IHR5ID0gMDtcblxuICAgICAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICB0eSA9IHR4O1xuICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgICAgcm90YXRlWCA9IC1yb3RhdGVZO1xuICAgICAgICAgICAgcm90YXRlWSA9IDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChydGwpIHtcbiAgICAgICAgICAgIHJvdGF0ZVkgPSAtcm90YXRlWTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2xpZGVFbFswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChwcm9ncmVzcykpICsgc2xpZGVzLmxlbmd0aDtcblxuICAgICAgICAgIGlmIChwYXJhbXMuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgICBjcmVhdGVTbGlkZVNoYWRvd3MoJHNsaWRlRWwsIHByb2dyZXNzLCBwYXJhbXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3R4fXB4LCAke3R5fXB4LCAwcHgpIHJvdGF0ZVgoJHtyb3RhdGVYfWRlZykgcm90YXRlWSgke3JvdGF0ZVl9ZGVnKWA7XG4gICAgICAgICAgY29uc3QgJHRhcmdldEVsID0gZWZmZWN0VGFyZ2V0KHBhcmFtcywgJHNsaWRlRWwpO1xuICAgICAgICAgICR0YXJnZXRFbC50cmFuc2Zvcm0odHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNpdGlvbiA9IGR1cmF0aW9uID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRyYW5zZm9ybUVsXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLmZsaXBFZmZlY3Q7XG4gICAgICAgIGNvbnN0ICR0cmFuc2l0aW9uRWxlbWVudHMgPSB0cmFuc2Zvcm1FbCA/IHN3aXBlci5zbGlkZXMuZmluZCh0cmFuc2Zvcm1FbCkgOiBzd2lwZXIuc2xpZGVzO1xuICAgICAgICAkdHJhbnNpdGlvbkVsZW1lbnRzLnRyYW5zaXRpb24oZHVyYXRpb24pLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZCh7XG4gICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgIHRyYW5zZm9ybUVsXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgZWZmZWN0SW5pdCh7XG4gICAgICAgIGVmZmVjdDogJ2ZsaXAnLFxuICAgICAgICBzd2lwZXIsXG4gICAgICAgIG9uLFxuICAgICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICAgIHNldFRyYW5zaXRpb24sXG4gICAgICAgIHJlY3JlYXRlU2hhZG93cyxcbiAgICAgICAgZ2V0RWZmZWN0UGFyYW1zOiAoKSA9PiBzd2lwZXIucGFyYW1zLmZsaXBFZmZlY3QsXG4gICAgICAgIHBlcnNwZWN0aXZlOiAoKSA9PiB0cnVlLFxuICAgICAgICBvdmVyd3JpdGVQYXJhbXM6ICgpID0+ICh7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiAhc3dpcGVyLnBhcmFtcy5jc3NNb2RlXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBFZmZlY3RDb3ZlcmZsb3coX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGNvdmVyZmxvd0VmZmVjdDoge1xuICAgICAgICAgIHJvdGF0ZTogNTAsXG4gICAgICAgICAgc3RyZXRjaDogMCxcbiAgICAgICAgICBkZXB0aDogMTAwLFxuICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgIG1vZGlmaWVyOiAxLFxuICAgICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgICAgICB0cmFuc2Zvcm1FbDogbnVsbFxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNsYXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgd2lkdGg6IHN3aXBlcldpZHRoLFxuICAgICAgICAgIGhlaWdodDogc3dpcGVySGVpZ2h0LFxuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICBzbGlkZXNTaXplc0dyaWRcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5jb3ZlcmZsb3dFZmZlY3Q7XG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgICAgY29uc3QgY2VudGVyID0gaXNIb3Jpem9udGFsID8gLXRyYW5zZm9ybSArIHN3aXBlcldpZHRoIC8gMiA6IC10cmFuc2Zvcm0gKyBzd2lwZXJIZWlnaHQgLyAyO1xuICAgICAgICBjb25zdCByb3RhdGUgPSBpc0hvcml6b250YWwgPyBwYXJhbXMucm90YXRlIDogLXBhcmFtcy5yb3RhdGU7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHBhcmFtcy5kZXB0aDsgLy8gRWFjaCBzbGlkZSBvZmZzZXQgZnJvbSBjZW50ZXJcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgJHNsaWRlRWwgPSBzbGlkZXMuZXEoaSk7XG4gICAgICAgICAgY29uc3Qgc2xpZGVTaXplID0gc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgICAgICAgIGNvbnN0IHNsaWRlT2Zmc2V0ID0gJHNsaWRlRWxbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgICAgY29uc3QgY2VudGVyT2Zmc2V0ID0gKGNlbnRlciAtIHNsaWRlT2Zmc2V0IC0gc2xpZGVTaXplIC8gMikgLyBzbGlkZVNpemU7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0TXVsdGlwbGllciA9IHR5cGVvZiBwYXJhbXMubW9kaWZpZXIgPT09ICdmdW5jdGlvbicgPyBwYXJhbXMubW9kaWZpZXIoY2VudGVyT2Zmc2V0KSA6IGNlbnRlck9mZnNldCAqIHBhcmFtcy5tb2RpZmllcjtcbiAgICAgICAgICBsZXQgcm90YXRlWSA9IGlzSG9yaXpvbnRhbCA/IHJvdGF0ZSAqIG9mZnNldE11bHRpcGxpZXIgOiAwO1xuICAgICAgICAgIGxldCByb3RhdGVYID0gaXNIb3Jpem9udGFsID8gMCA6IHJvdGF0ZSAqIG9mZnNldE11bHRpcGxpZXI7IC8vIHZhciByb3RhdGVaID0gMFxuXG4gICAgICAgICAgbGV0IHRyYW5zbGF0ZVogPSAtdHJhbnNsYXRlICogTWF0aC5hYnMob2Zmc2V0TXVsdGlwbGllcik7XG4gICAgICAgICAgbGV0IHN0cmV0Y2ggPSBwYXJhbXMuc3RyZXRjaDsgLy8gQWxsb3cgcGVyY2VudGFnZSB0byBtYWtlIGEgcmVsYXRpdmUgc3RyZXRjaCBmb3IgcmVzcG9uc2l2ZSBzbGlkZXJzXG5cbiAgICAgICAgICBpZiAodHlwZW9mIHN0cmV0Y2ggPT09ICdzdHJpbmcnICYmIHN0cmV0Y2guaW5kZXhPZignJScpICE9PSAtMSkge1xuICAgICAgICAgICAgc3RyZXRjaCA9IHBhcnNlRmxvYXQocGFyYW1zLnN0cmV0Y2gpIC8gMTAwICogc2xpZGVTaXplO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCB0cmFuc2xhdGVZID0gaXNIb3Jpem9udGFsID8gMCA6IHN0cmV0Y2ggKiBvZmZzZXRNdWx0aXBsaWVyO1xuICAgICAgICAgIGxldCB0cmFuc2xhdGVYID0gaXNIb3Jpem9udGFsID8gc3RyZXRjaCAqIG9mZnNldE11bHRpcGxpZXIgOiAwO1xuICAgICAgICAgIGxldCBzY2FsZSA9IDEgLSAoMSAtIHBhcmFtcy5zY2FsZSkgKiBNYXRoLmFicyhvZmZzZXRNdWx0aXBsaWVyKTsgLy8gRml4IGZvciB1bHRyYSBzbWFsbCB2YWx1ZXNcblxuICAgICAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVYKSA8IDAuMDAxKSB0cmFuc2xhdGVYID0gMDtcbiAgICAgICAgICBpZiAoTWF0aC5hYnModHJhbnNsYXRlWSkgPCAwLjAwMSkgdHJhbnNsYXRlWSA9IDA7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVopIDwgMC4wMDEpIHRyYW5zbGF0ZVogPSAwO1xuICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVZKSA8IDAuMDAxKSByb3RhdGVZID0gMDtcbiAgICAgICAgICBpZiAoTWF0aC5hYnMocm90YXRlWCkgPCAwLjAwMSkgcm90YXRlWCA9IDA7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHNjYWxlKSA8IDAuMDAxKSBzY2FsZSA9IDA7XG4gICAgICAgICAgY29uc3Qgc2xpZGVUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGVYfXB4LCR7dHJhbnNsYXRlWX1weCwke3RyYW5zbGF0ZVp9cHgpICByb3RhdGVYKCR7cm90YXRlWH1kZWcpIHJvdGF0ZVkoJHtyb3RhdGVZfWRlZykgc2NhbGUoJHtzY2FsZX0pYDtcbiAgICAgICAgICBjb25zdCAkdGFyZ2V0RWwgPSBlZmZlY3RUYXJnZXQocGFyYW1zLCAkc2xpZGVFbCk7XG4gICAgICAgICAgJHRhcmdldEVsLnRyYW5zZm9ybShzbGlkZVRyYW5zZm9ybSk7XG4gICAgICAgICAgJHNsaWRlRWxbMF0uc3R5bGUuekluZGV4ID0gLU1hdGguYWJzKE1hdGgucm91bmQob2Zmc2V0TXVsdGlwbGllcikpICsgMTtcblxuICAgICAgICAgIGlmIChwYXJhbXMuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgICAvLyBTZXQgc2hhZG93c1xuICAgICAgICAgICAgbGV0ICRzaGFkb3dCZWZvcmVFbCA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xuICAgICAgICAgICAgbGV0ICRzaGFkb3dBZnRlckVsID0gaXNIb3Jpem9udGFsID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuXG4gICAgICAgICAgICBpZiAoJHNoYWRvd0JlZm9yZUVsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAkc2hhZG93QmVmb3JlRWwgPSBjcmVhdGVTaGFkb3cocGFyYW1zLCAkc2xpZGVFbCwgaXNIb3Jpem9udGFsID8gJ2xlZnQnIDogJ3RvcCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHNoYWRvd0FmdGVyRWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICRzaGFkb3dBZnRlckVsID0gY3JlYXRlU2hhZG93KHBhcmFtcywgJHNsaWRlRWwsIGlzSG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkc2hhZG93QmVmb3JlRWwubGVuZ3RoKSAkc2hhZG93QmVmb3JlRWxbMF0uc3R5bGUub3BhY2l0eSA9IG9mZnNldE11bHRpcGxpZXIgPiAwID8gb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICAgICAgICBpZiAoJHNoYWRvd0FmdGVyRWwubGVuZ3RoKSAkc2hhZG93QWZ0ZXJFbFswXS5zdHlsZS5vcGFjaXR5ID0gLW9mZnNldE11bHRpcGxpZXIgPiAwID8gLW9mZnNldE11bHRpcGxpZXIgOiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNpdGlvbiA9IGR1cmF0aW9uID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRyYW5zZm9ybUVsXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLmNvdmVyZmxvd0VmZmVjdDtcbiAgICAgICAgY29uc3QgJHRyYW5zaXRpb25FbGVtZW50cyA9IHRyYW5zZm9ybUVsID8gc3dpcGVyLnNsaWRlcy5maW5kKHRyYW5zZm9ybUVsKSA6IHN3aXBlci5zbGlkZXM7XG4gICAgICAgICR0cmFuc2l0aW9uRWxlbWVudHMudHJhbnNpdGlvbihkdXJhdGlvbikuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICB9O1xuXG4gICAgICBlZmZlY3RJbml0KHtcbiAgICAgICAgZWZmZWN0OiAnY292ZXJmbG93JyxcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBvbixcbiAgICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgICBzZXRUcmFuc2l0aW9uLFxuICAgICAgICBwZXJzcGVjdGl2ZTogKCkgPT4gdHJ1ZSxcbiAgICAgICAgb3ZlcndyaXRlUGFyYW1zOiAoKSA9PiAoe1xuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVmZmVjdENyZWF0aXZlKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvblxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBjcmVhdGl2ZUVmZmVjdDoge1xuICAgICAgICAgIHRyYW5zZm9ybUVsOiBudWxsLFxuICAgICAgICAgIGxpbWl0UHJvZ3Jlc3M6IDEsXG4gICAgICAgICAgc2hhZG93UGVyUHJvZ3Jlc3M6IGZhbHNlLFxuICAgICAgICAgIHByb2dyZXNzTXVsdGlwbGllcjogMSxcbiAgICAgICAgICBwZXJzcGVjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICBwcmV2OiB7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFswLCAwLCAwXSxcbiAgICAgICAgICAgIHJvdGF0ZTogWzAsIDAsIDBdLFxuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHNjYWxlOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFswLCAwLCAwXSxcbiAgICAgICAgICAgIHJvdGF0ZTogWzAsIDAsIDBdLFxuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHNjYWxlOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZ2V0VHJhbnNsYXRlVmFsdWUgPSB2YWx1ZSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHJldHVybiBgJHt2YWx1ZX1weGA7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXMsXG4gICAgICAgICAgJHdyYXBwZXJFbCxcbiAgICAgICAgICBzbGlkZXNTaXplc0dyaWRcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5jcmVhdGl2ZUVmZmVjdDtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHByb2dyZXNzTXVsdGlwbGllcjogbXVsdGlwbGllclxuICAgICAgICB9ID0gcGFyYW1zO1xuICAgICAgICBjb25zdCBpc0NlbnRlcmVkU2xpZGVzID0gc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcztcblxuICAgICAgICBpZiAoaXNDZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgIGNvbnN0IG1hcmdpbiA9IHNsaWRlc1NpemVzR3JpZFswXSAvIDIgLSBzd2lwZXIucGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZSB8fCAwO1xuICAgICAgICAgICR3cmFwcGVyRWwudHJhbnNmb3JtKGB0cmFuc2xhdGVYKGNhbGMoNTAlIC0gJHttYXJnaW59cHgpKWApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCAkc2xpZGVFbCA9IHNsaWRlcy5lcShpKTtcbiAgICAgICAgICBjb25zdCBzbGlkZVByb2dyZXNzID0gJHNsaWRlRWxbMF0ucHJvZ3Jlc3M7XG4gICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heCgkc2xpZGVFbFswXS5wcm9ncmVzcywgLXBhcmFtcy5saW1pdFByb2dyZXNzKSwgcGFyYW1zLmxpbWl0UHJvZ3Jlc3MpO1xuICAgICAgICAgIGxldCBvcmlnaW5hbFByb2dyZXNzID0gcHJvZ3Jlc3M7XG5cbiAgICAgICAgICBpZiAoIWlzQ2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsUHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heCgkc2xpZGVFbFswXS5vcmlnaW5hbFByb2dyZXNzLCAtcGFyYW1zLmxpbWl0UHJvZ3Jlc3MpLCBwYXJhbXMubGltaXRQcm9ncmVzcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gJHNsaWRlRWxbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgICAgY29uc3QgdCA9IFtzd2lwZXIucGFyYW1zLmNzc01vZGUgPyAtb2Zmc2V0IC0gc3dpcGVyLnRyYW5zbGF0ZSA6IC1vZmZzZXQsIDAsIDBdO1xuICAgICAgICAgIGNvbnN0IHIgPSBbMCwgMCwgMF07XG4gICAgICAgICAgbGV0IGN1c3RvbSA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKCFzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgIHRbMV0gPSB0WzBdO1xuICAgICAgICAgICAgdFswXSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFswLCAwLCAwXSxcbiAgICAgICAgICAgIHJvdGF0ZTogWzAsIDAsIDBdLFxuICAgICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChwcm9ncmVzcyA8IDApIHtcbiAgICAgICAgICAgIGRhdGEgPSBwYXJhbXMubmV4dDtcbiAgICAgICAgICAgIGN1c3RvbSA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcyA+IDApIHtcbiAgICAgICAgICAgIGRhdGEgPSBwYXJhbXMucHJldjtcbiAgICAgICAgICAgIGN1c3RvbSA9IHRydWU7XG4gICAgICAgICAgfSAvLyBzZXQgdHJhbnNsYXRlXG5cblxuICAgICAgICAgIHQuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0W2luZGV4XSA9IGBjYWxjKCR7dmFsdWV9cHggKyAoJHtnZXRUcmFuc2xhdGVWYWx1ZShkYXRhLnRyYW5zbGF0ZVtpbmRleF0pfSAqICR7TWF0aC5hYnMocHJvZ3Jlc3MgKiBtdWx0aXBsaWVyKX0pKWA7XG4gICAgICAgICAgfSk7IC8vIHNldCByb3RhdGVzXG5cbiAgICAgICAgICByLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcltpbmRleF0gPSBkYXRhLnJvdGF0ZVtpbmRleF0gKiBNYXRoLmFicyhwcm9ncmVzcyAqIG11bHRpcGxpZXIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICRzbGlkZUVsWzBdLnN0eWxlLnpJbmRleCA9IC1NYXRoLmFicyhNYXRoLnJvdW5kKHNsaWRlUHJvZ3Jlc3MpKSArIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgICAgY29uc3QgdHJhbnNsYXRlU3RyaW5nID0gdC5qb2luKCcsICcpO1xuICAgICAgICAgIGNvbnN0IHJvdGF0ZVN0cmluZyA9IGByb3RhdGVYKCR7clswXX1kZWcpIHJvdGF0ZVkoJHtyWzFdfWRlZykgcm90YXRlWigke3JbMl19ZGVnKWA7XG4gICAgICAgICAgY29uc3Qgc2NhbGVTdHJpbmcgPSBvcmlnaW5hbFByb2dyZXNzIDwgMCA/IGBzY2FsZSgkezEgKyAoMSAtIGRhdGEuc2NhbGUpICogb3JpZ2luYWxQcm9ncmVzcyAqIG11bHRpcGxpZXJ9KWAgOiBgc2NhbGUoJHsxIC0gKDEgLSBkYXRhLnNjYWxlKSAqIG9yaWdpbmFsUHJvZ3Jlc3MgKiBtdWx0aXBsaWVyfSlgO1xuICAgICAgICAgIGNvbnN0IG9wYWNpdHlTdHJpbmcgPSBvcmlnaW5hbFByb2dyZXNzIDwgMCA/IDEgKyAoMSAtIGRhdGEub3BhY2l0eSkgKiBvcmlnaW5hbFByb2dyZXNzICogbXVsdGlwbGllciA6IDEgLSAoMSAtIGRhdGEub3BhY2l0eSkgKiBvcmlnaW5hbFByb2dyZXNzICogbXVsdGlwbGllcjtcbiAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGVTdHJpbmd9KSAke3JvdGF0ZVN0cmluZ30gJHtzY2FsZVN0cmluZ31gOyAvLyBTZXQgc2hhZG93c1xuXG4gICAgICAgICAgaWYgKGN1c3RvbSAmJiBkYXRhLnNoYWRvdyB8fCAhY3VzdG9tKSB7XG4gICAgICAgICAgICBsZXQgJHNoYWRvd0VsID0gJHNsaWRlRWwuY2hpbGRyZW4oJy5zd2lwZXItc2xpZGUtc2hhZG93Jyk7XG5cbiAgICAgICAgICAgIGlmICgkc2hhZG93RWwubGVuZ3RoID09PSAwICYmIGRhdGEuc2hhZG93KSB7XG4gICAgICAgICAgICAgICRzaGFkb3dFbCA9IGNyZWF0ZVNoYWRvdyhwYXJhbXMsICRzbGlkZUVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRzaGFkb3dFbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2hhZG93T3BhY2l0eSA9IHBhcmFtcy5zaGFkb3dQZXJQcm9ncmVzcyA/IHByb2dyZXNzICogKDEgLyBwYXJhbXMubGltaXRQcm9ncmVzcykgOiBwcm9ncmVzcztcbiAgICAgICAgICAgICAgJHNoYWRvd0VsWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1pbihNYXRoLm1heChNYXRoLmFicyhzaGFkb3dPcGFjaXR5KSwgMCksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0ICR0YXJnZXRFbCA9IGVmZmVjdFRhcmdldChwYXJhbXMsICRzbGlkZUVsKTtcbiAgICAgICAgICAkdGFyZ2V0RWwudHJhbnNmb3JtKHRyYW5zZm9ybSkuY3NzKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHlTdHJpbmdcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChkYXRhLm9yaWdpbikge1xuICAgICAgICAgICAgJHRhcmdldEVsLmNzcygndHJhbnNmb3JtLW9yaWdpbicsIGRhdGEub3JpZ2luKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNldFRyYW5zaXRpb24gPSBkdXJhdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB0cmFuc2Zvcm1FbFxuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcy5jcmVhdGl2ZUVmZmVjdDtcbiAgICAgICAgY29uc3QgJHRyYW5zaXRpb25FbGVtZW50cyA9IHRyYW5zZm9ybUVsID8gc3dpcGVyLnNsaWRlcy5maW5kKHRyYW5zZm9ybUVsKSA6IHN3aXBlci5zbGlkZXM7XG4gICAgICAgICR0cmFuc2l0aW9uRWxlbWVudHMudHJhbnNpdGlvbihkdXJhdGlvbikuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3cnKS50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgZWZmZWN0VmlydHVhbFRyYW5zaXRpb25FbmQoe1xuICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICB0cmFuc2Zvcm1FbCxcbiAgICAgICAgICBhbGxTbGlkZXM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBlZmZlY3RJbml0KHtcbiAgICAgICAgZWZmZWN0OiAnY3JlYXRpdmUnLFxuICAgICAgICBzd2lwZXIsXG4gICAgICAgIG9uLFxuICAgICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICAgIHNldFRyYW5zaXRpb24sXG4gICAgICAgIHBlcnNwZWN0aXZlOiAoKSA9PiBzd2lwZXIucGFyYW1zLmNyZWF0aXZlRWZmZWN0LnBlcnNwZWN0aXZlLFxuICAgICAgICBvdmVyd3JpdGVQYXJhbXM6ICgpID0+ICh7XG4gICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiAhc3dpcGVyLnBhcmFtcy5jc3NNb2RlXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBFZmZlY3RDYXJkcyhfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgY2FyZHNFZmZlY3Q6IHtcbiAgICAgICAgICBzbGlkZVNoYWRvd3M6IHRydWUsXG4gICAgICAgICAgdHJhbnNmb3JtRWw6IG51bGwsXG4gICAgICAgICAgcm90YXRlOiB0cnVlLFxuICAgICAgICAgIHBlclNsaWRlUm90YXRlOiAyLFxuICAgICAgICAgIHBlclNsaWRlT2Zmc2V0OiA4XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXMsXG4gICAgICAgICAgYWN0aXZlSW5kZXhcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5jYXJkc0VmZmVjdDtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHN0YXJ0VHJhbnNsYXRlLFxuICAgICAgICAgIGlzVG91Y2hlZFxuICAgICAgICB9ID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgICAgICAgY29uc3QgY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci50cmFuc2xhdGU7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCAkc2xpZGVFbCA9IHNsaWRlcy5lcShpKTtcbiAgICAgICAgICBjb25zdCBzbGlkZVByb2dyZXNzID0gJHNsaWRlRWxbMF0ucHJvZ3Jlc3M7XG4gICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChzbGlkZVByb2dyZXNzLCAtNCksIDQpO1xuICAgICAgICAgIGxldCBvZmZzZXQgPSAkc2xpZGVFbFswXS5zd2lwZXJTbGlkZU9mZnNldDtcblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmICFzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLnRyYW5zZm9ybShgdHJhbnNsYXRlWCgke3N3aXBlci5taW5UcmFuc2xhdGUoKX1weClgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICAgIG9mZnNldCAtPSBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHRYID0gc3dpcGVyLnBhcmFtcy5jc3NNb2RlID8gLW9mZnNldCAtIHN3aXBlci50cmFuc2xhdGUgOiAtb2Zmc2V0O1xuICAgICAgICAgIGxldCB0WSA9IDA7XG4gICAgICAgICAgY29uc3QgdFogPSAtMTAwICogTWF0aC5hYnMocHJvZ3Jlc3MpO1xuICAgICAgICAgIGxldCBzY2FsZSA9IDE7XG4gICAgICAgICAgbGV0IHJvdGF0ZSA9IC1wYXJhbXMucGVyU2xpZGVSb3RhdGUgKiBwcm9ncmVzcztcbiAgICAgICAgICBsZXQgdFhBZGQgPSBwYXJhbXMucGVyU2xpZGVPZmZzZXQgLSBNYXRoLmFicyhwcm9ncmVzcykgKiAwLjc1O1xuICAgICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLmZyb20gKyBpIDogaTtcbiAgICAgICAgICBjb25zdCBpc1N3aXBlVG9OZXh0ID0gKHNsaWRlSW5kZXggPT09IGFjdGl2ZUluZGV4IHx8IHNsaWRlSW5kZXggPT09IGFjdGl2ZUluZGV4IC0gMSkgJiYgcHJvZ3Jlc3MgPiAwICYmIHByb2dyZXNzIDwgMSAmJiAoaXNUb3VjaGVkIHx8IHN3aXBlci5wYXJhbXMuY3NzTW9kZSkgJiYgY3VycmVudFRyYW5zbGF0ZSA8IHN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICAgIGNvbnN0IGlzU3dpcGVUb1ByZXYgPSAoc2xpZGVJbmRleCA9PT0gYWN0aXZlSW5kZXggfHwgc2xpZGVJbmRleCA9PT0gYWN0aXZlSW5kZXggKyAxKSAmJiBwcm9ncmVzcyA8IDAgJiYgcHJvZ3Jlc3MgPiAtMSAmJiAoaXNUb3VjaGVkIHx8IHN3aXBlci5wYXJhbXMuY3NzTW9kZSkgJiYgY3VycmVudFRyYW5zbGF0ZSA+IHN0YXJ0VHJhbnNsYXRlO1xuXG4gICAgICAgICAgaWYgKGlzU3dpcGVUb05leHQgfHwgaXNTd2lwZVRvUHJldikge1xuICAgICAgICAgICAgY29uc3Qgc3ViUHJvZ3Jlc3MgPSAoMSAtIE1hdGguYWJzKChNYXRoLmFicyhwcm9ncmVzcykgLSAwLjUpIC8gMC41KSkgKiogMC41O1xuICAgICAgICAgICAgcm90YXRlICs9IC0yOCAqIHByb2dyZXNzICogc3ViUHJvZ3Jlc3M7XG4gICAgICAgICAgICBzY2FsZSArPSAtMC41ICogc3ViUHJvZ3Jlc3M7XG4gICAgICAgICAgICB0WEFkZCArPSA5NiAqIHN1YlByb2dyZXNzO1xuICAgICAgICAgICAgdFkgPSBgJHstMjUgKiBzdWJQcm9ncmVzcyAqIE1hdGguYWJzKHByb2dyZXNzKX0lYDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocHJvZ3Jlc3MgPCAwKSB7XG4gICAgICAgICAgICAvLyBuZXh0XG4gICAgICAgICAgICB0WCA9IGBjYWxjKCR7dFh9cHggKyAoJHt0WEFkZCAqIE1hdGguYWJzKHByb2dyZXNzKX0lKSlgO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MgPiAwKSB7XG4gICAgICAgICAgICAvLyBwcmV2XG4gICAgICAgICAgICB0WCA9IGBjYWxjKCR7dFh9cHggKyAoLSR7dFhBZGQgKiBNYXRoLmFicyhwcm9ncmVzcyl9JSkpYDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdFggPSBgJHt0WH1weGA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZZID0gdFk7XG4gICAgICAgICAgICB0WSA9IHRYO1xuICAgICAgICAgICAgdFggPSBwcmV2WTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzY2FsZVN0cmluZyA9IHByb2dyZXNzIDwgMCA/IGAkezEgKyAoMSAtIHNjYWxlKSAqIHByb2dyZXNzfWAgOiBgJHsxIC0gKDEgLSBzY2FsZSkgKiBwcm9ncmVzc31gO1xuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGBcbiAgICAgICAgdHJhbnNsYXRlM2QoJHt0WH0sICR7dFl9LCAke3RafXB4KVxuICAgICAgICByb3RhdGVaKCR7cGFyYW1zLnJvdGF0ZSA/IHJvdGF0ZSA6IDB9ZGVnKVxuICAgICAgICBzY2FsZSgke3NjYWxlU3RyaW5nfSlcbiAgICAgIGA7XG5cbiAgICAgICAgICBpZiAocGFyYW1zLnNsaWRlU2hhZG93cykge1xuICAgICAgICAgICAgLy8gU2V0IHNoYWRvd3NcbiAgICAgICAgICAgIGxldCAkc2hhZG93RWwgPSAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdycpO1xuXG4gICAgICAgICAgICBpZiAoJHNoYWRvd0VsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAkc2hhZG93RWwgPSBjcmVhdGVTaGFkb3cocGFyYW1zLCAkc2xpZGVFbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkc2hhZG93RWwubGVuZ3RoKSAkc2hhZG93RWxbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWluKE1hdGgubWF4KChNYXRoLmFicyhwcm9ncmVzcykgLSAwLjUpIC8gMC41LCAwKSwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNsaWRlRWxbMF0uc3R5bGUuekluZGV4ID0gLU1hdGguYWJzKE1hdGgucm91bmQoc2xpZGVQcm9ncmVzcykpICsgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICBjb25zdCAkdGFyZ2V0RWwgPSBlZmZlY3RUYXJnZXQocGFyYW1zLCAkc2xpZGVFbCk7XG4gICAgICAgICAgJHRhcmdldEVsLnRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2l0aW9uID0gZHVyYXRpb24gPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgdHJhbnNmb3JtRWxcbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXMuY2FyZHNFZmZlY3Q7XG4gICAgICAgIGNvbnN0ICR0cmFuc2l0aW9uRWxlbWVudHMgPSB0cmFuc2Zvcm1FbCA/IHN3aXBlci5zbGlkZXMuZmluZCh0cmFuc2Zvcm1FbCkgOiBzd2lwZXIuc2xpZGVzO1xuICAgICAgICAkdHJhbnNpdGlvbkVsZW1lbnRzLnRyYW5zaXRpb24oZHVyYXRpb24pLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgIGVmZmVjdFZpcnR1YWxUcmFuc2l0aW9uRW5kKHtcbiAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgdHJhbnNmb3JtRWxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBlZmZlY3RJbml0KHtcbiAgICAgICAgZWZmZWN0OiAnY2FyZHMnLFxuICAgICAgICBzd2lwZXIsXG4gICAgICAgIG9uLFxuICAgICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICAgIHNldFRyYW5zaXRpb24sXG4gICAgICAgIHBlcnNwZWN0aXZlOiAoKSA9PiB0cnVlLFxuICAgICAgICBvdmVyd3JpdGVQYXJhbXM6ICgpID0+ICh7XG4gICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiAhc3dpcGVyLnBhcmFtcy5jc3NNb2RlXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTd2lwZXIgQ2xhc3NcbiAgICBjb25zdCBtb2R1bGVzID0gW1ZpcnR1YWwsIEtleWJvYXJkLCBNb3VzZXdoZWVsLCBOYXZpZ2F0aW9uLCBQYWdpbmF0aW9uLCBTY3JvbGxiYXIsIFBhcmFsbGF4LCBab29tLCBMYXp5LCBDb250cm9sbGVyLCBBMTF5LCBIaXN0b3J5LCBIYXNoTmF2aWdhdGlvbiwgQXV0b3BsYXksIFRodW1iLCBmcmVlTW9kZSwgR3JpZCwgTWFuaXB1bGF0aW9uLCBFZmZlY3RGYWRlLCBFZmZlY3RDdWJlLCBFZmZlY3RGbGlwLCBFZmZlY3RDb3ZlcmZsb3csIEVmZmVjdENyZWF0aXZlLCBFZmZlY3RDYXJkc107XG4gICAgU3dpcGVyLnVzZShtb2R1bGVzKTtcblxuICAgIHJldHVybiBTd2lwZXI7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXBlci1idW5kbGUuanMubWFwXG4iLCJpbXBvcnQgU3dpcGVyIGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc3dpcGVyLWJ1bmRsZS5qcyc7XG4vL2ltcG9ydCBWYW5pbGxhVGlsdCBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtdGlsdC9kaXN0L3ZhbmlsbGEtdGlsdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnN3aXBlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jbGFzc01haW4gPSB7XG4gICAgICAgICAgICBhZ2VudEl0ZW06ICcuanMtaGVhZGVyX19hZ2VudC1pdGVtJyxcbiAgICAgICAgICAgIGhlYWRlckFnZW50czogJy5qcy1oZWFkZXItYWdlbnRzJyxcbiAgICAgICAgICAgIGhlYWRlclNraWxsczogJy5qcy1oZWFkZXItc2tpbGxzJyxcbiAgICAgICAgICAgIGhlYWRlclRpdGxlOiAnLmpzLWhlYWRlci10aXRsZSdcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWxsQWdlbnRzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY2xhc3NNYWluLmFnZW50SXRlbSk7XG4gICAgICAgIHRoaXMuYWdlbnRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY2xhc3NNYWluLmhlYWRlclNraWxscyk7XG4gICAgICAgIHRoaXMuaGVhZGVyVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY2xhc3NNYWluLmhlYWRlclRpdGxlKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5ldmVudHNSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuYWxsQWdlbnRzSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZSA9PiB0aGlzLmFnZW50SXRlbU92ZXIoZSkpKTtcblxuICAgICAgICB0aGlzLnNraWxsc0luZm8gPSB7XG4gICAgICAgICAgICBwaG9lbml4OiB7XG4gICAgICAgICAgICAgICAgb25lOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnVHdpc3RlZCBmZWVkJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1doZW4gZXhwbG9kZWQsIHRoZSBvcmIgYmxpbmRzIGFsbCBwbGF5ZXJzIHdobyB3ZXJlIGxvb2tpbmcgYXQgaXQgYXQgdGhlIHRpbWUgb2YgdGhlIGV4cGxvc2lvbi4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0d286IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdIb3QgaGFuZHMnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRmlyZWJhbGwgdGhhdCBleHBsb2RlcyBhZnRlciBhIGRlbGF5IG9yIHdoZW4gaXQgaGl0cyB0aGUgZ3JvdW5kLidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRocmVlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnUmV0dXJuJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0lmIHRoZSBza2lsbCBleHBpcmVzLCBvciBpZiBQaG9lbml4IGRpZXMgd2hpbGUgaXQgaXMgYWN0aXZlLidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZvdXI6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdJbmZlcm5vJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0l0IG9ic2N1cmVzIHZpc2lvbiBhbmQgZGVhbHMgZGFtYWdlIHRvIHBsYXllcnMgcGFzc2luZyB0aHJvdWdoIGl0LidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgamV0dDoge1xuICAgICAgICAgICAgICAgIG9uZToge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1ZvcnRleCcsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdJbnN0YW50bHkgbGF1bmNoZXMgYSBwcm9qZWN0aWxlIHRoYXQgdHJhbnNmb3JtcyBpbnRvIGEgY2xvdWQgdGhhdCBicmllZmx5IG9ic2N1cmVzIHZpc2lvbiBvbiBpbXBhY3Qgd2l0aCB0aGUgZ3JvdW5kLidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR3bzoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NsaW1iJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0pldHQgaW5zdGFudGx5IHRha2VzIG9mZiBpbnRvIHRoZSBhaXIuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhyZWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdGYXZvdXJhYmxlIHdpbmQnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSmV0dCBpbnN0YW50bHkgbWFrZXMgYSBxdWljayBkYXNoIGluIHRoZSBkaXJlY3Rpb24gb2YgdHJhdmVsLidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZvdXI6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdCbGFkZSBTdG9ybScsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBcm1lZCB3aXRoIGEgc2V0IG9mIHByZWNpc2lvbiB0aHJvd2luZyBkYWdnZXJzLCB3aGljaCBhcmUgcmVsb2FkZWQgYWZ0ZXIgdGhlIGVsaW1pbmF0aW9uIG9mIHRoZSBlbmVteS4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvdmE6IHtcbiAgICAgICAgICAgICAgICBvbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTaG9jayBCb2x0JyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0VRVUlQIGEgYm93IHdpdGggc2hvY2sgYm9sdC4gRklSRSB0byBzZW5kIHRoZSBleHBsb3NpdmUgYm9sdCBmb3J3YXJkLCBkZXRvbmF0aW5nIHVwb24gY29sbGlzaW9uIGFuZCBkYW1hZ2luZyBwbGF5ZXJzIG5lYXJieS4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0d286IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdPd2wgRHJvbmUnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRVFVSVAgYW4gb3dsIGRyb25lLiBGSVJFIHRvIGRlcGxveSBhbmQgdGFrZSBjb250cm9sIG9mIG1vdmVtZW50IG9mIHRoZSBkcm9uZS4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aHJlZToge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1JlY29uIEJvbHQnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRklSRSB0byBzZW5kIHRoZSByZWNvbiBib2x0IGZvcndhcmQsIGFjdGl2YXRpbmcgdXBvbiBjb2xsaXNpb24sIGVuZW1pZXMgY2F1Z2h0IGluIHRoZSBsaW5lIG9mIHNpZ2h0IG9mIHRoZSBib2x0LidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZvdXI6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdIdW50ZXLigJlzIEZ1cnknLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRVFVSVAgYSBib3cgd2l0aCB0aHJlZSBsb25nLXJhbmdlLCB3YWxsLXBpZXJjaW5nIGVuZXJneSBibGFzdHMuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYWdlOiB7XG4gICAgICAgICAgICAgICAgb25lOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU2xvdyBPcmInLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRVFVSVAgYSBzbG93aW5nIG9yYi4gRklSRSB0byB0aHJvdyBhIHNsb3dpbmcgb3JiIGZvcndhcmQgdGhhdCBkZXRvbmF0ZXMgdXBvbiBsYW5kaW5nLCBzbG93cyBwbGF5ZXJzIGNhdWdodCBpbnNpZGUgb2YgaXQuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdHdvOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQmFycmllciBPcmInLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRVFVSVAgYSBiYXJyaWVyIG9yYi4gRklSRSBwbGFjZXMgYSB3YWxsIHRoYXQgZm9ydGlmaWVzIGFmdGVyIGEgZmV3IHNlY29uZHMuIEFMVCBGSVJFIHJvdGF0ZXMgdGhlIHRhcmdldGVyLidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRocmVlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnUmVzdXJyZWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0VRVUlQIGEgcmVzdXJyZWN0aW9uIGFiaWxpdHkuIEZJUkUgd2l0aCB5b3VyIGNyb3NzaGFpcnMgcGxhY2VkIG92ZXIgYSBkZWFkIGFsbHkgdG8gYmVnaW4gcmVzdXJyZWN0aW5nIHRoZW0uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZm91cjoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0hlYWxpbmcgT3JiJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0VRVUlQIGEgaGVhbGluZyBvcmIuIEZJUkUgd2l0aCB5b3VyIGNyb3NzaGFpcnMgb3ZlciBhIGRhbWFnZWQgYWxseSB0byBhY3RpdmF0ZSBhIGhlYWwtb3Zlci10aW1lIG9uIHRoZW0uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpdGxlQWdlbnRzID0gJ0dFTlRTJ1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDEyODApIHRoaXMuc3dpcGVySW5pdCgpO1xuXG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlSW5pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzUmVzaXplKCkge1xuICAgICAgICBpZih0aGlzLnN3aXBlciAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjgwKSB0aGlzLnN3aXBlckV2ZW50RGVzdHJveSgpO1xuICAgICAgICBpZighdGhpcy5zd2lwZXIgJiYgd2luZG93LmlubmVyV2lkdGggPCAxMjgwKSB7XG4gICAgICAgICAgICAgdGhpcy5zd2lwZXJJbml0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFnZW50SXRlbU92ZXIoe3RhcmdldH0pIHtcbiAgICAgICAgY29uc3QgaXRlbUN1cnJlbnQgPSB0YXJnZXQuY2xvc2VzdCh0aGlzLmNsYXNzTWFpbi5hZ2VudEl0ZW0pO1xuXG4gICAgICAgIGlmKGl0ZW1DdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGFBZ2VudHMoaXRlbUN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlRGF0YUFnZW50cyhpdGVtQ3VycmVudCkge1xuICAgICAgICB0aGlzLmFsbEFnZW50c0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlcl9fYWdlbnQtaXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmFnZW50U2tpbGxzLmNsYXNzTGlzdC5yZW1vdmUoYGhlYWRlcl9fc2tpbGxzLS0ke2l0ZW0uZGF0YXNldC5hZ2VudE5hbWV9YClcblxuXG4gICAgICAgICAgICBpZihpdGVtID09PSBpdGVtQ3VycmVudCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGVhZGVyX19hZ2VudC1pdGVtLS1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIHRoaXMuYWdlbnRTa2lsbHMuY2xhc3NMaXN0LmFkZChgaGVhZGVyX19za2lsbHMtLSR7aXRlbS5kYXRhc2V0LmFnZW50TmFtZX1gKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5hZ2VudFNraWxscy5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyX19za2lsbC1pdGVtJykuZm9yRWFjaCgoaXRlbVNraWxsQmxvY2ssIGl0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVNraWxsQmxvY2sucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fc2tpbGwtaXRlbS1zdWJ0aXRsZScpLmlubmVyVGV4dCA9IHRoaXMuc2tpbGxzSW5mb1tpdGVtLmRhdGFzZXQuYWdlbnROYW1lXVsnb25lJ10udGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVNraWxsQmxvY2sucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fc2tpbGwtaXRlbS10ZXh0JykuaW5uZXJUZXh0ID0gdGhpcy5za2lsbHNJbmZvW2l0ZW0uZGF0YXNldC5hZ2VudE5hbWVdWydvbmUnXS50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVNraWxsQmxvY2sucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fc2tpbGwtaXRlbS1zdWJ0aXRsZScpLmlubmVyVGV4dCA9IHRoaXMuc2tpbGxzSW5mb1tpdGVtLmRhdGFzZXQuYWdlbnROYW1lXVsndHdvJ10udGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVNraWxsQmxvY2sucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fc2tpbGwtaXRlbS10ZXh0JykuaW5uZXJUZXh0ID0gdGhpcy5za2lsbHNJbmZvW2l0ZW0uZGF0YXNldC5hZ2VudE5hbWVdWyd0d28nXS50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVNraWxsQmxvY2sucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fc2tpbGwtaXRlbS1zdWJ0aXRsZScpLmlubmVyVGV4dCA9IHRoaXMuc2tpbGxzSW5mb1tpdGVtLmRhdGFzZXQuYWdlbnROYW1lXVsndGhyZWUnXS50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtU2tpbGxCbG9jay5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19za2lsbC1pdGVtLXRleHQnKS5pbm5lclRleHQgPSB0aGlzLnNraWxsc0luZm9baXRlbS5kYXRhc2V0LmFnZW50TmFtZV1bJ3RocmVlJ10udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Ta2lsbEJsb2NrLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3NraWxsLWl0ZW0tc3VidGl0bGUnKS5pbm5lclRleHQgPSB0aGlzLnNraWxsc0luZm9baXRlbS5kYXRhc2V0LmFnZW50TmFtZV1bJ2ZvdXInXS50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtU2tpbGxCbG9jay5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19za2lsbC1pdGVtLXRleHQnKS5pbm5lclRleHQgPSB0aGlzLnNraWxsc0luZm9baXRlbS5kYXRhc2V0LmFnZW50TmFtZV1bJ2ZvdXInXS50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3dpcGVySW5pdCgpIHtcbiAgICAgICAgdGhpcy5zd2lwZXIgPSBuZXcgU3dpcGVyKHRoaXMuY2xhc3NNYWluLmhlYWRlckFnZW50cywge1xuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAzMjA6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4xLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA0NDA6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NTA6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS41LFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA2NTA6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgOTUwOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuNyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMTEwMDoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDMwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleENoYW5nZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURhdGFBZ2VudHModGhpcy5hbGxBZ2VudHNJdGVtc1t0aGlzLnN3aXBlci5hY3RpdmVJbmRleF0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzd2lwZXJFdmVudERlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyLmRlc3Ryb3koKVxuICAgICAgICB0aGlzLnN3aXBlciA9IG51bGw7XG4gICAgfVxuXG4gICAgdGl0bGVJbml0KCkge1xuICAgICAgICBsZXQgc3VtID0gMTtcbiAgICAgICAgZm9yIChsZXQgY2hhciBvZiB0aGlzLnRpdGxlQWdlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnN5bWJvbFNlYWxUaXRsZShjaGFyLCBzdW0pO1xuICAgICAgICAgICAgc3VtKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzeW1ib2xTZWFsVGl0bGUoY2hhciwgc3VtKXtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlclRpdGxlLmlubmVyVGV4dCArPSBjaGFyO1xuICAgICAgICB9LCAxMDAgKiBzdW0pXG4gICAgfVxuXG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhbGxheCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLm1haW5TZWxlY3RvciA9IG9wdGlvbnMubWFpblNlbGVjdG9yIHx8ICcnO1xuICAgICAgICB0aGlzLm1haW5QaG90b1NlbGVjdG9yID0gb3B0aW9ucy5tYWluUGhvdG9TZWxlY3RvciB8fCAnJztcbiAgICAgICAgdGhpcy5zZWxlY3RvckRlY29yID0gb3B0aW9ucy5zZWxlY3RvckRlY29yIHx8IFtdO1xuICAgICAgICB0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ2FsbCc7XG5cbiAgICAgICAgdGhpcy5pbml0RGVsZWdhdGlvbigpO1xuICAgIH1cblxuICAgIGluaXREZWxlZ2F0aW9uKCkge1xuXG4gICAgICAgIGlmKHRoaXMuZXZlbnRFcnJvcigpKSByZXR1cm5cblxuICAgICAgICBpZih0aGlzLnR5cGUgPT09ICdob3Jpem9uJykgdGhpcy5pbml0SG9yaXpvblBhcmFsbGF4KCk7XG4gICAgICAgIGlmKHRoaXMudHlwZSA9PT0gJ2hvcml6b25TY3JvbGwnKSB0aGlzLmluaXRTY3JvbGxQYXJhbGxheCgpO1xuXG4gICAgfVxuXG4gICAgaW5pdEhvcml6b25QYXJhbGxheCgpIHtcbiAgICAgICAgdGhpcy5tYWluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5tYWluU2VsZWN0b3IpO1xuXG4gICAgICAgIHRoaXMubWFpbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICAgICAgICBsZXQgeCA9IGUuY2xpZW50WCAvIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm1haW5QaG90b1NlbGVjdG9yKS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKC0nICsgeCAqIDUwICsgJ3B4KSc7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3JEZWNvci5mb3JFYWNoKGl0ZW0gPT4ge1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpdGVtLnNlbGVjdG9yKS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKCsnICsgeCAqIDUwICsgJ3B4KScgKyBpdGVtLnRyYW5zZm9ybURlZmF1bHQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGluaXRTY3JvbGxQYXJhbGxheCgpIHtcbiAgICAgICAgdGhpcy5tYWluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5tYWluU2VsZWN0b3IpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFpblJlY3QgPSB0aGlzLm1haW5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBwZXJjZW50UmVjdCA9IChtYWluUmVjdC50b3AgKiAxMDApIC8gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RvckRlY29yLmZvckVhY2goaXRlbSA9PiB7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW0uc2VsZWN0b3IpLnN0eWxlLnRvcCA9IGAke3BlcmNlbnRSZWN0fSVgO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBldmVudEVycm9yKCkge1xuXG4gICAgICAgIGlmKCF0aGlzLm1haW5TZWxlY3Rvci5sZW5ndGgpe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigneW91IGRpZG5cXCd0IHBhc3MgbWFpblNlbGVjdG9yJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wb3B1cFNlbGVjdG9yID0gb3B0aW9ucy5wb3B1cFNlbGVjdG9yO1xuICAgICAgICB0aGlzLmNhbGxTZWxlY3RvciA9IG9wdGlvbnMuY2FsbFNlbGVjdG9yO1xuXG4gICAgICAgIHRoaXMuY2FsbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY2FsbFNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucG9wdXBTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuYm9keUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgICAgICB0aGlzLnBvcHVwQ29udGFpbmVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLm1ha2VQb3B1cENvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLnBvcHVwU2hvd0V2ZW50KCk7XG4gICAgfVxuXG4gICAgcG9wdXBTaG93RXZlbnQoKSB7XG4gICAgICAgIHRoaXMuY2FsbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZE1hcmt1cCgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHBvcHVwQ2xvc2VFdmVudCgpIHtcbiAgICAgICAgdGhpcy5wb3B1cENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmJvZHlDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGltaXRlZCcpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIG1ha2VQb3B1cENvbnRhaW5lcigpIHtcbiAgICAgICAgdGhpcy5wb3B1cENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnBvcHVwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLXdyYXBwZXInKTtcbiAgICAgICAgdGhpcy5wb3B1cENvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsICc8c3BhbiBjbGFzcz1cInBvcHVwLWNsb3NlXCI+PC9zcGFuPicpO1xuXG4gICAgICAgIHRoaXMucG9wdXBDb250YWluZXIuYXBwZW5kKHRoaXMucG9wdXBFbGVtZW50KTtcbiAgICB9XG5cbiAgICBhZGRNYXJrdXAoKSB7XG4gICAgICAgIHRoaXMuYm9keUNvbnRhaW5lci5hcHBlbmQodGhpcy5wb3B1cENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMucG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwLWhpZGUnKTtcbiAgICAgICAgdGhpcy5ib2R5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2xpbWl0ZWQnKTtcblxuICAgICAgICB0aGlzLnBvcHVwQ2xvc2VFdmVudCgpO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9IZWFkZXIuanNcIjtcbmltcG9ydCBQYXJhbGxheCBmcm9tIFwiLi9QYXJhbGxheC5qc1wiO1xuaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5pbXBvcnQge1Nob3dUaXRsZX0gZnJvbSBcIi4vc2hvd1RpdGxlLmpzXCI7XG5cbmNsYXNzIE1haW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGluaXQoKXtcbiAgICAgICAgdGhpcy5tZW51RXZlbnQoKTtcbiAgICAgICAgdGhpcy5oZWFkZXJJbml0KCk7XG4gICAgICAgIHRoaXMucGFyYWxsYXhJbml0KCk7XG4gICAgICAgIHRoaXMucG9wdXBJbml0KCk7XG4gICAgICAgIHRoaXMudGl0bGVzSW5pdCgpO1xuICAgIH1cblxuICAgIG1lbnVFdmVudCgpIHtcbiAgICAgICAgdGhpcy5tZW51T3BlbkNsb3NlKCk7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxCbG9jaygpO1xuICAgIH1cblxuICAgIG1lbnVPcGVuQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbmF2LWJ0bicpO1xuICAgICAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbmF2LWxpbmtzJyk7XG5cbiAgICAgICAgbWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1lbnVMaW5rcy5jbGFzc0xpc3RbbWVudUxpbmtzLmNsYXNzTGlzdC5jb250YWlucygnb3Blbi1saW5rcycpID8gJ3JlbW92ZScgOiAnYWRkJ10oJ29wZW4tbGlua3MnKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzY3JvbGxCbG9jaygpIHtcbiAgICAgICAgY29uc3QgYW5jaG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZio9XCIjXCJdJylcblxuICAgICAgICBhbmNob3JzLmZvckVhY2goKGFuY2hvcikgPT4ge1xuICAgICAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrSUQgPSBhbmNob3IuZ2V0QXR0cmlidXRlKCdocmVmJykuc3Vic3RyKDEpXG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChibG9ja0lEKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoZWFkZXJJbml0KCkge1xuICAgICAgICBjb25zdCBoZWFkZXI9IG5ldyBIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBwYXJhbGxheEluaXQoKSB7XG4gICAgICAgIGNvbnN0IHBhcmFsbGF4ID0gbmV3IFBhcmFsbGF4KHtcbiAgICAgICAgICAgIG1haW5TZWxlY3RvcjogJy5qcy1wYXJhbGxheC1jb250YWluZXInLFxuICAgICAgICAgICAgbWFpblBob3RvU2VsZWN0b3I6ICcuanMtbWFpbl9fcGhvdG8nLFxuICAgICAgICAgICAgc2VsZWN0b3JEZWNvcjogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJy5qcy1vbmUtbWFpbi1kZWNvcicsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtRGVmYXVsdDogJ3JvdGF0ZSg5MGRlZyknXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcuanMtdHdvLW1haW4tZGVjb3InLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybURlZmF1bHQ6ICdyb3RhdGUoLTkwZGVnKSdcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgdHlwZTogJ2hvcml6b24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBhcmFsbGF4VHdvID0gbmV3IFBhcmFsbGF4KHtcbiAgICAgICAgICAgIG1haW5TZWxlY3RvcjogJy5qcy1wYXJhbGxheC1jb250YWluZXItYWdlbnRzJyxcbiAgICAgICAgICAgIG1haW5QaG90b1NlbGVjdG9yOiAnLmpzLW1haW5fX3Bob3RvLWFnZW50cycsXG4gICAgICAgICAgICBzZWxlY3RvckRlY29yOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnLmpzLW9uZS1tYWluLWRlY29yLWFnZW50cycsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtRGVmYXVsdDogJ3JvdGF0ZSg5MGRlZykgIHRyYW5zbGF0ZVkoY2FsYygtNTAlIC0gNTI3cHgpKSdcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgdHlwZTogJ2hvcml6b24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBhcmFsbGF4VGhyZWUgPSBuZXcgUGFyYWxsYXgoe1xuICAgICAgICAgICAgbWFpblNlbGVjdG9yOiAnLmpzLXNlY3Rpb24tbWFwcycsXG4gICAgICAgICAgICBzZWxlY3RvckRlY29yOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnLmpzLXNlY3Rpb24tbWFwcy1iaXJkcycsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtRGVmYXVsdDogJydcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgdHlwZTogJ2hvcml6b25TY3JvbGwnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBvcHVwSW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9wdXAgPSBuZXcgUG9wdXAoe1xuICAgICAgICAgICAgcG9wdXBTZWxlY3RvcjogJy5qcy1hYm91dC12aWRlby1wb3B1cCcsXG4gICAgICAgICAgICBjYWxsU2VsZWN0b3I6ICcuanMtc2VjdGlvbi1hYm91dC12aWRlby1wbGF5JyxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aXRsZXNJbml0KCkge1xuICAgICAgICBjb25zdCB0aXRsZXMgPSBuZXcgU2hvd1RpdGxlKFsnLmpzLXRpdGxlLWFib3V0LWFuaW1hdGlvbicsICcuanMtdGl0bGUtYWdlbnRzLWFuaW1hdGlvbicsICcuanMtdGl0bGUtZ3Vucy1hbmltYXRpb24nLCAnLmpzLXRpdGxlLW1hcHMtYW5pbWF0aW9uJ10pXG4gICAgfVxufVxuXG5jb25zdCBtYWluID0gbmV3IE1haW4oKTtcbm1haW4uaW5pdCgpOyIsImV4cG9ydCBjbGFzcyBTaG93VGl0bGUge1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9ycykge1xuICAgICAgICB0aGlzLmFsbFNlbGVjdG9ycyA9IHNlbGVjdG9ycyB8fCBbXTtcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZih0aGlzLmFsbFNlbGVjdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTm90IGZvdW5kIHNlbGVjdG9ycyBmb3IgdGl0bGVzIGFuaW1hdGlvbicpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4gdGhpcy5zZWFyY2hUaXRsZSgpKTtcbiAgICB9XG5cbiAgICBzZWFyY2hUaXRsZSgpIHtcbiAgICAgICAgdGhpcy5hbGxTZWxlY3RvcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbSk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZUVsZW1lbnRUb3AgPSB0aXRsZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICBpZih0aXRsZUVsZW1lbnRUb3AgPD0gd2luZG93LmlubmVySGVpZ2h0IC0gMzApIHtcbiAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndGl0bGUtY2xvc2UnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxufSJdfQ==
