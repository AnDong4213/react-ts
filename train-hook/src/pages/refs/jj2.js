import { throttle } from "../../utils/util";
import drawQrcode from "../../../miniprogram_npm/weapp-qrcode/index.js";
import {
  baseAuthUrl,
  clientKey,
  scopes,
  redirectUri} from "../../../utils/constant.js";
import User from "../../../models/user.js";
Component({
  options: {
    // addGlobalClass: true,
    pureDataPattern: /^_/},
  properties: {
    duration: {
      type: Number,
      value: 500},
    easingFunction: {
      type: String,
      value: "default"},
    loop: {
      type: Boolean,
      value: true},
    videoList: {
      type: Array,
      value: []
      /* observer: function observer() {
                var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                this._videoListChanged(newVal);} */}},
  observers: {
    videoList: function (newVal) {
      if (newVal && newVal.length) {
        this._videoListChanged(newVal);}}},
  data: {
    nextQueue: [],
    prevQueue: [],
    curQueue: [],
    circular: false,
    _last: 1,
    _change: -1,
    _invalidUp: 0,
    _invalidDown: 0,
    _videoContexts: [],
    _isPause: false,
    isBuffer: false},
  lifetimes: {
    ready: function ready() {
      // this.data._videoContexts = [wx.createVideoContext('video_0', this), wx.createVideoContext('video_1', this), wx.createVideoContext('video_2', this)];
      this.setData({
        _videoContexts: this.data.curQueue.map((v) =>
          wx.createVideoContext(`video_${v.id}`, this)
        )});}},
  methods: {
    _videoListChanged: function _videoListChanged(newVal) {
      var _this = this;
      var data = this.data;
      newVal.forEach(function (item) {
        data.nextQueue.push(item);});
      if (data.curQueue.length === 0) {
        this.setData(
          {
            curQueue: data.nextQueue.splice(0, 3)},
          function () {
            _this.playCurrent(1);}
        );}},
    animationfinish: function animationfinish(e) {
      var _data = this.data,
        _last = _data._last,
        _change = _data._change,
        curQueue = _data.curQueue,
        prevQueue = _data.prevQueue,
        nextQueue = _data.nextQueue;
      var current = e.detail.current;
      var diff = current - _last;
      if (diff === 0) return;
      this.data._last = current;
      this.playCurrent(current);
      this.triggerEvent("change", { activeId: curQueue[current].id });
      var direction = diff === 1 || diff === -2 ? "up" : "down";
      if (direction === "up") {
        if (this.data._invalidDown === 0) {
          var change = (_change + 1) % 3;
          var add = nextQueue.shift();
          var remove = curQueue[change];
          if (add) {
            prevQueue.push(remove);
            curQueue[change] = add;
            this.data._change = change;} else {
            this.data._invalidUp += 1;}} else {
          this.data._invalidDown -= 1;}}
      if (direction === "down") {
        if (this.data._invalidUp === 0) {
          var _change2 = _change;
          var _remove = curQueue[_change2];
          var _add = prevQueue.pop();
          if (_add) {
            curQueue[_change2] = _add;
            nextQueue.unshift(_remove);
            this.data._change = (_change2 - 1 + 3) % 3;} else {
            this.data._invalidDown += 1;}} else {
          this.data._invalidUp -= 1;}}
      var circular = true;
      if (nextQueue.length === 0 && current !== 0) {
        circular = false;}
      if (prevQueue.length === 0 && current !== 2) {
        circular = false;}
      this.setData({
        _videoContexts: curQueue.map((v) =>
          wx.createVideoContext(`video_${v.id}`, this)
        ),
        curQueue: curQueue,
        circular: circular});},
    playCurrent: function playCurrent(current) {
      this.data._videoContexts.forEach(function (ctx, index) {
        index !== current ? ctx.pause() : ctx.play();});},
    handleVideo2: function (e) {
      const { _isPause } = this.data;
      if (_isPause) {
        this.data._videoContexts[e.currentTarget.dataset.index].play();
        this.setData({
          _isPause: false});} else {
        this.data._videoContexts[e.currentTarget.dataset.index].pause();
        this.setData({
          _isPause: true});}
      this.triggerEvent("changePlayStatus", {
        _isPause,
        index: e.currentTarget.dataset.index});},
    handleVideoPlay: function (index) {
      this.data._videoContexts[index].play();
      this.setData({
        _isPause: false});},
    onPlay: function onPlay(e) {
      this.setData({
        _isPause: false,
        isBuffer: false});
      // console.log('播放中', e);
      // currentTarget.dataset.index
      this.trigger(e, "play");},
    onPause: function onPause(e) {
      // console.log('暂停中', e);
      this.trigger(e, "pause");},
    onEnded: function onEnded(e) {
      this.trigger(e, "ended");},
    onError: function onError(e) {
      this.setData({
        isBuffer: true});
      this.trigger(e, "error");},
    onTimeUpdate: throttle(function onTimeUpdate(e) {
      if (this.data.isBuffer) {
        this.setData({
          isBuffer: false});}
      // this.data._videoContexts[e.currentTarget.dataset.index].play();
      // this.trigger(e, 'timeupdate');}, 500),
    onWaiting: function onWaiting(e) {
      // console.log('缓冲中', e);
      this.setData({
        isBuffer: true});
      this.trigger(e, "wait");},
    onProgress: function onProgress(e) {
      this.trigger(e, "progress");},
    onLoadedMetaData: function onLoadedMetaData(e) {
      // console.log('onLoadedMetaData', e.currentTarget.dataset.index)
      this.setData({
        isBuffer: false});
      this.trigger(e, "loadedmetadata");},
    trigger: function trigger(e, type) {
      var ext =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var detail = e.detail;
      var activeId = e.target.dataset.id;
      this.triggerEvent(
        type,
        Object.assign(
          Object.assign(Object.assign({}, detail), { activeId: activeId }),
          ext
        )
      );}}});
// components/modal/modal.js
Component({
  /** 组件的属性列表*/
  properties: {
    title: {
      type: String,
      value: "确认操作吗？"},
    cancelText: {
      type: String,
      value: "取消"},
    bottom: {
      type: Boolean,
      value: false}},
  /** 组件的初始数据*/
  data: {},
  /** 组件的方法列表*/
  methods: {
    cancel() {
      this.triggerEvent("cancel");},
    next() {
      this.triggerEvent("next");}}});
Component({
  properties: {
    tabList: {
      type: Array,
      value: []},
    className: {
      type: String,
      value: "tabs"},
    curTab: {
      type: String,
      value: "all"}},
  data: {
    curTab: ""},
  attached: function () {
    let { curTab, tabList } = this.data;
    this.setData({
      curTab: curTab ? curTab : tabList[0] ? tabList[0].value : ""});},
  methods: {
    clickTab(e) {
      let value = e.currentTarget.dataset.value;
      if (value !== this.data.curTab) {
        this.setData({
          curTab: value});
        this.triggerEvent("change", value);}}}});
const response_type = "";
const { debounce } = require("../../../utils/util.js");
Page({
  /** 页面的初始数据*/
  data: {
    showAuthorization: false,
    agree: false,
    time: 120,
    showDialog: false,
    showLoading: false,
    noData: false,
    tiktokUserInfo: {},
    showList: false},
  /** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    //查询用户是否授权了抖音登录
    //如果已经授权，则查询作品列表
    this.checkBindedDouyin().then((res) => {
      if (res.bindStatus) {
        console.log("res", res);
        this.setData({
          showList: true});
        this.getPersonalRelatedInfo();}});},
  checkBindedDouyin() {
    return new Promise(function (resolve, reject) {
      User.checkBindedDouyin({}).then((res) => {
        resolve(res);});});},
  onDelete() {
    wx.showModal({
      title: "确认要解除抖音账号绑定吗？",
      success: (res) => {
        if (res.confirm) {
          User.cancelBind().then((res) => {
            this.setData({
              showList: false});});}}});},
  getPersonalRelatedInfo() {
    User.getPersonalRelatedInfo().then((res) => {
      res.gender = res.gender == 1 ? "男" : res.gender == 2 ? "女" : "未知";
      this.setData({
        tiktokUserInfo: res});});},
  // scrolltolower: debounce(function (e) {
  //   console.log('触底了触底了')
  //   this.setData({
  //     showLoading:true
  //   })
  // },500),
  showUserAgreement(e) {
    var { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/user/userAgreement/userAgreement?show=" + id});},
  showAuthorizationFun() {
    let that = this;
    this.setData({
      showAuthorization: true,
      time: 120});
    this.createErCode();
    var timeInt = setInterval(() => {
      if (this.data.time <= 0) {
        this.setData({
          time: 0});
        clearInterval(timeInt);
        return;}
      this.setData({
        time: this.data.time - 1});}, 1000);
    setTimeout(() => {
      that.setData({
        showAuthorization: false});}, 120000);},
  agree() {
    this.setData({
      agree: !this.data.agree});},
  getUrl() {
    let accountNo = wx.getStorageSync("accountNo");
    if (!accountNo) {
      getApp().showToast("账号编码获取失败", "error");
      return;}
    return `${baseAuthUrl}?client_key=${clientKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${accountNo}`;},
  createErCode() {
    let url = this.getUrl();
    console.log("url: ", url);
    // const queryDom = wx.createSelectorQuery()
    // queryDom.select('.er-code').boundingClientRect()
    // queryDom.select('#myQrcode').boundingClientRect()
    // queryDom.exec(res => {
    //   console.log(res[0].width, res[0].height)
    //   console.log(res[1].width, res[1].height)
    // })
    drawQrcode({
      width: 150,
      height: 150,
      canvasId: "myQrcode",
      text: url,
      correctLevel: 3,
      x: 0,
      y: 0});},
  saveImgBtnEvent() {
    let that = this;
    //将canvas导出为文件
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      destWidth: 310,
      destHeight: 310,
      canvasId: "myQrcode",
      success(res) {
        //调用保存至相册
        that.saveImageFile(that, res.tempFilePath);},
      fail() {
        wx.showToast({
          title: "导出二维码失败,请重试",
          icon: "none"});}});},
  saveImageFile(that, filePath) {
    that.saveImg(filePath);},
  saveImg(filePath) {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success() {
        wx.showToast({
          title: "保存成功!"});
        setTimeout(() => {
          wx.switchTab({
            url: "/pages/user/user"});}, 2000);},
      fail() {
        wx.showToast({
          title: "您拒绝了授权，保存失败",
          icon: "none"});
        setTimeout(() => {
          that.openSetting();}, 2000);}});},
  openSetting(that, filePath) {
    wx.showModal({
      title: "权限申请",
      content: "点击 “确定” 按钮，打开相册的权限设置界面",
      cancelText: "取消",
      confirmText: "确定",
      success(res) {
        if (res.confirm) {
          wx.openSetting({
            success: function (res) {
              that.saveImg(filePath);},
            fail: function (res) {
              wx.showToast({
                title: "您拒绝了授权，无法保存",
                icon: "none"});}});}}});}});
