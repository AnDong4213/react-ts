import Login from '../models/login.js'
module.exports = Behavior({
    behaviors: [],
    properties: {},
    data: {
      test:true},
    attached: function(){
       //this.onLogin()},
    methods: {
     onLogin(fun) {
        var token = wx.getStorageSync('token')
        if (!token) {
            wx.login({
                success (res) {
                    let { code } = res
                    Login.login({
                    code: code}).then(data => {
                    console.log('behavior/login: ', data)
                    for(let k in data) {
                        wx.setStorageSync(k, data[k])}
                    fun()})},
                fail: (error) => {
                wx.showToast({
                    title:error,
                    icon:"none"})}})}else{
            fun()}}}})
class Base {
  pageNum = 1;
  pageSize = 10;
  totalCount = 0;
  data = [];
  hasMoreData = true;
  reset() {
    this.pageNum = 1;
    this.pageSize = 10;
    this.totalCount = 0;
    this.data = [];
    this.hasMoreData = true;
    return this;}}
export default Base;
import { request } from '../request/index.js';
class Public {
  // 静态资源网络地址
  static getStaticResource(type="ad") {
    return request.get("/staticResource/getStaticResourceByType", {type}, null, false)}}
export default Public;
import { request } from '../request/index.js';
class QuanCreate {
  static queryNameAuth(data = {}) {
    return request.post("/profileAccount/account/authentication", data)}
  static authentication(data={}) {
    return request.post("/profileAccount/account/authentication", data)}
  // 检查是否完成认证
  static checkAuth(data={}) {
    return request.get("/liveRingGroup/group/checkAuth", data)}}
export default QuanCreate;
import { request } from '../request/index.js';
class QuanList {
  static queryMyQuan(data={}) {
    return request.get('/liveRingGroup/group/myGroupInfo', data, null,false)}
  static queryAllQuan(data={}) {
    return request.post("/liveRingGroup/group/queryAllGroup", data, null,false)}
  static queryWatchQuan(data={}) {
    return request.post("/liveRingGroup/group/queryFocusGroup", data,null, false)}
  static queryRankQuan(data={}) {
    return request.post("/liveRingGroup/group/groupBillboardList", data,null, false)}
  static applyJoin(data={}) {
    return request.post("/liveRingGroup/group/groupJoinApply", data)}
  static focusQuan(data ={}) {
    return request.post("/liveRingGroup/group/groupFocus", data)}
  static cancelFocusQuan(data={}) {
    return request.post("/liveRingGroup/group/cancelGroupFocus", data)}
  static otherQuanDetail(data={}) {
    return request.get("/liveRingGroup/group/otherGroupInfo", data)}
  // 带货榜
  static queryCommerceBill(data={}) {
    return request.get("/liveRingGroup/member/commerceBillboardList", data)}
  // 涨粉榜
  static queryFansBill(data={}) {
    return request.get("/liveRingGroup/member/fansBillboardList", data)}
  // 单品榜
  static queryItemBill(data={}) {
    return request.get("/liveRingGroup/member/itemBillboardList", data)}
  // 收藏
  static collection(data={}) {
    return request.post("/profileAccount/collection/collectionAll", data)}
  // 取消收藏
  static cancelCollec(data={}) {
    return request.post("/profileAccount/collection/collectionCancel", data)}}
export default QuanList;
import { request } from '../request/index.js';
class QuanManage {
  // 允许成员自动加入
  static modifyAutoJoin(data = {}) {
    return request.put("/liveRingGroup/config/allowMemberJoinGrop", data)}
  // 允许邀请新人
  static modifyInviteNew(data = {}) {
    return request.put("/liveRingGroup/config/allowMemberInviteNewMember", data)}
  
  static myQuanMange(data = {}) {
    return request.get("/liveRingGroup/group/myGroupManager", data)}}
export default QuanManage;
import { request as Http } from "../request/index";
import Base from "./base";
class University extends Base {
  // 封装获取Pagination data
  async getPaginationData(url, data) {
    if (!this.hasMoreData) {
      return this.data;}
    const listData = await Http.post(url, {
      pageSize: this.pageSize,
      pageNum: this.pageNum,
      ...data});
    this.totalCount = listData.totalCount;
    this.data = this.data.concat(listData.list);
    this.hasMoreData = !(this.pageNum === listData.pageCount);
    this.pageNum++;
    return this.data;}
  // 搜索获取视频列表
  async getVideoList(data = {}) {
    return this.getPaginationData("/video/list", data);}
  // 视频详情
  static getVideInfo(id) {
    return Http.post("/video/info", { id });}
  // 点赞视频
  static videoStar(id) {
    return Http.post("/video/star", { id });}
  // 收藏视频
  static videoCollect(id) {
    return Http.post("/video/collect", { id });}
  // 取消点赞视频
  static videoCancelStar(id) {
    return Http.post("/video/cancelStar", { id });}
  // 取消收藏视频
  static videoCancelCollection(collectionNo, type) {
    return Http.post("/profileAccount/collection/collectionCancel", { collectionNo, type });}
  // 评论视频
  static videoComment(data = {}) {
    return Http.post("/video/comment", data);}
  // 评论列表
  async getVideoCommentList(data = {}) {
    return this.getPaginationData("/video/commentList", data);}
  // 分享视频
  static transpondVideo(id) {
    return Http.post("/video/transpond", { id });}}
export default University;
import { request as Http } from "../request/index";
class User {
  //我的收藏 达人 列表
  static accountCollectionList(data = {}) {
    return Http.post("/profileAccount/collection/accountCollectionList", data);}
  //我的收藏 视频 列表
  static videoCollectionList(data = {}) {
    return Http.post("/profileAccount/collection/videoCollectionList", data);}
  //我的收藏 商品 列表
  static goodsCollectionlist(data = {}){
    return Http.post("/profileAccount/collection/goodsCollectionlist", data);}
  //编辑资料 查看个人资料
  static queryInformation(data = {}){
    return Http.get("/profileAccount/information/queryInformation", data);}
   //编辑资料 编辑个人资料
   static modifyAccountInfo(data = {}){
    return Http.post("/profileAccount/information/modifyAccountInfo", data);}
  //取消收藏
  static collectionCancel(data = {}){
    return Http.post("/profileAccount/collection/collectionCancel", data);}
  //抖音作品列表
  static getPersonalRelatedInfo(data = {}){
    return Http.get("/profile/douyin/getPersonalRelatedInfo", data);}
  //查看是否抖音授权登录过
  static checkBindedDouyin(data = {}){
    return Http.get("/profileAccount/account/checkBindedDouyin", data);}
  //保存用户信息
  static saveWxUserInfo(data = {}){
    return Http.post("/profileAccountThirdBind/wechat/saveWxUserInfo", data);}
  //取消抖音绑定
  static cancelBind(data = {}){
    return Http.post("/profile/douyin/cancelBind", data);}
  //退出登录
  static logout(data = {}){
    return Http.post("/profileAccountThirdBind/wechat/logout", data);}}
export default User;
import { request }  from '../request/index.js'
class Login {
  static login(data = {}) {
    return request.post("/profileAccountThirdBind/wechat/login", data)}
  static checkLogin(data = {}) {
    return request.get("/profileAccount/account/test", data)}
  static checkWechatAccessCondition(data = {}) {
    return request.get("/profileAccount/checkWechatAccessCondition", data)}
  static savePhone(data = {}) {
    return request.post("/profileAccount/savePhone", data)}}
export default Login;
//export const baseUrl = "https://bmd.ieasy123.com/" //正式环境
export const baseUrl = "https://bmdprod.ieasy123.com" //测试环境
// export const baseUrl = "http://localhost:3000"
console.log('当前接口环境',baseUrl)
const errMsg = '请求异常'
const tokenErrorCode = [1001,1002,1003]
import login from "./login"
export const requestPromise = (path, data, method = "GET", otherParams, showLoading = true) => {
  // data = addPublicParam(data)
  return new Promise((resolve, reject) => {
    if (showLoading) {
      wx.showLoading({
        mask: true})}
    if ((/^\/video\//g).test(path) && path !== '/video/list') {
      wx.hideLoading()}
    wx.request({
      url: baseUrl + path,
      method,
      data,
      ...otherParams,
      header: {
        "Authorization": "Bearer " + getToken(),
       //"Authorization": "Bearer bmd:ozmoi5Duo5h6yCEvfJhJW3Tcv1dY",},
      success(res) {
        let { statusCode: httpStatus, statusText: httpStatusText, data: httpData } = res
        let { data, status, statusText } = httpData
        statusText = statusText || httpStatusText
        if (httpStatus === 200 && httpData && status === 200) {
          resolve(data)} else if(httpStatus === 200 && httpData && tokenErrorCode.includes(status)){
          tokenError(statusText)} else {
          wx.showToast({
            title: statusText,
            icon:'none'})
          reject(new Error(statusText || errMsg))}},
      fail(error) {
        wx.showToast({
          title: "网络错误",
          icon:'none'})
        reject(new Error(errMsg + ' ' + error.errMsg))},
      complete() {
        if (showLoading) {
          wx.hideLoading()}}})})}
export const request = {
  get: (path, data, otherParams={}, showLoading = true) => {
    return requestPromise(path, data, 'GET', otherParams, showLoading)},
  post: (path, data, otherParams={}, showLoading = true) => {
    return requestPromise(path, data, 'POST', otherParams, showLoading)},
  put: (path, data, otherParams={}, showLoading = true) => {
    return requestPromise(path, data, 'PUT', otherParams, showLoading)},}
export const GET = request.get
export const POST = request.post
export const PUT = (path, data, otherParams, showLoading = true) => {
  return requestPromise(path, data, 'PUT', otherParams, showLoading)}
export const commonErrorHandler = (config) => {
  wx.showToast({
    title: errMsg,
    icon: 'error',
    duration: 2000,
    ...config,})}
// 获取token
export const getToken = () => {
  // console.log('wx.getStorageSync token',wx.getStorageSync('token'))
  return wx.getStorageSync('token')
  // return 'bmd:ozmoi5N2knE9_AP5B8893oifzuVI'}
// 获取当前登录账号
export const getUserAccount = () => {
  return wx.getStorageSync('token')}
// 添加公共参数
export const addPublicParam = (data) => {
  if (data instanceof Object) {
    // 添加当前登录账号
    data['accountNo'] = getUserAccount()}
  return data}
const tokenError = (title) => {
  let curPage = getCurrentPages().pop()
  wx.showToast({
    title,
    icon:'none'})
  login.onLogin(()=>{})
  // if (curPage.route!=='pages/login/login') {
  //   wx.navigateTo({
  //     url: '/pages/login/login'
  //   })
  // }}
import Login from '../models/login.js'
import User from '../models/user.js'
function onLogin(fun) {
    var token = wx.getStorageSync('token')
    if (!token) {
        wx.login({
            success (res) {
                let { code } = res
                Login.login({
                code: code}).then(data => {
                console.log('request/login: ', data)
                for(let k in data) {
                    wx.setStorageSync(k, data[k])}
                fun()})},
            fail: (error) => {
            wx.showToast({
                title:error,
                icon:"none"})}})}else{
        fun()}}
function getUserInfo() {
    return new Promise((resolve, reject)=> {
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '展示在个人中心',
        success: (args) => {
          let { userInfo, encryptedData, iv, rawData,signature } = args
          resolve({ userInfo, encryptedData, iv, rawData,signature })},
        fail: (error) => {
          console.log('fail: ', error)
          reject(error)}})})}
function checkPhoneLogin(){
    return new Promise((resolve,reject)=>{
        Login.checkWechatAccessCondition().then((resData)=>{
            console.log('检测登录',resData)
            if(!resData.accessCondition){//未登录
                //resolve()
                return Promise.resolve()}else if(resData.accessCondition==2){//只有用户资料，无手机号
                return Promise.reject(resData)}else{//资料授权完成
                resolve()
                return Promise.reject(resData)}}).then(() => {
            return getUserInfo().then((res)=>{
                return User.saveWxUserInfo({
                    ...res.userInfo}).then((data)=>{
                        return Promise.resolve()})})}, (resData) => {
            if(resData.accessCondition==2){
                return Promise.resolve()}else{
                return Promise.reject()}}).then(()=>{
            console.log('跳转login')
            wx.navigateTo({
                url: "/pages/login/login"})},()=>{})})}
  
module.exports = {
    onLogin,
    checkPhoneLogin};
import { commonErrorHandler, requestPromise } from '../request/index'
export const defaultData = {
  loadingMore: false,
  pageNum: 0,
  pageSize: 10,
  totalCount: null,
  noMore: false,
  list: [],
  loaded: false,}
export function loadingMore() {
  this.setData({ loadingMore: true })}
export function fetchList(refresh) {
  if (refresh) {
    this.setData({
      pageNum: 0,
      totalCount: null,
      noMore: false,})}
  const { noMore, loadingMore } = this.data
  if (noMore || loadingMore) {
    return}
  this.setData({
    pageNum: this.data.pageNum + 1})
  this.loadingMore()
  this.fetchListData(refresh)}
// Need to be rewritten
export function fetchListData() {
  // this.fetchListDataByConfig({ ... })}
export function fetchListDataByConfig({ url, method = 'GET', data = {}, otherParams = {}, showLoading, refresh }) {
  const { pageNum, pageSize } = this.data
  const payload = {
    pageNum,
    pageSize,
    ...data,};
  requestPromise(url, payload, method, {}, showLoading).then(({ list, totalCount }) => {
    let oldList = !refresh && this.data.list ? this.data.list : []
    this.setData({ list: [...oldList, ...(list || [])], totalCount, noMore: pageNum * pageSize >= totalCount })}).catch(() => {
    commonErrorHandler()
    this.setData({ totalCount: 0, noMore: true })})
  .finally(() => {
    this.setData({ loadingMore: false, loaded: true })})}
export function resetPage() {
  this.setData({
    pageNum: 0,
    totalCount: null,
    noMore: false,
    list: [],})}
export function onReachBottom() {
  console.log('onReachBottom')
  this.fetchList()}
export const defaultOtherOptions = {
  loadingMore,
  fetchList,
  fetchListData,
  fetchListDataByConfig,
  resetPage,
  onReachBottom,}
export function listPageOptionsFactory(pageOptions = {}, config = {}) {
  const { data, ...otherOptions } = pageOptions
  return {
    data: {
      ...defaultData,
      ...data,},
    ...defaultOtherOptions,
    ...otherOptions,}}
export const AppId = 'wxcd55ba61e880814e'
export const AppSecret = '2eb87a90226a74f392bb2ce95ed97962'
export const baseAuthUrl = "https://open.douyin.com/platform/oauth/connect"
export const clientKey = "awxbwv0amqs6hgfn"
export const scopes = "user_info,following.list,fans.list,fans.check,video.list"
export const redirectUri = "https://bmd.ieasy123.com/profile/douyin/getCode/callback"
export const resourceUrlPre = "https://ieasy-bmd-test-1305698028.cos.ap-beijing.myqcloud.com/"
export const UNIVERSITY_SWIPER_DATA = 'UNIVERSITY_SWIPER_DATA'
export const GroupMemberLevelEnum = {
  owner: 0,
  admin: 1,
  member: 2,}
export const AuthOwner = [GroupMemberLevelEnum.owner]
export const AuthAdmin = [GroupMemberLevelEnum.owner, GroupMemberLevelEnum.admin]
export const AuthMember = [
  GroupMemberLevelEnum.owner,
  GroupMemberLevelEnum.admin,
  GroupMemberLevelEnum.member]
export const CollectTypeEnum = {
  goods: 0,
  user: 1,
  video: 2,}
export const GroupApplyTypeEnum = {
  active: 0,
  passive: 1,}
export const GroupApprovalStatusEnum = {
  pending: 0,
  agreed: 1,
  rejected: 2,}
var resourceUrlPre = "https://ieasy-bmd-test-1305698028.cos.ap-beijing.myqcloud.com/"
// 转换单位 万
var filterUnitWan = function(val) {
  if (!val) return ''
  var numVal = parseInt(val)
  return numVal > 9999 ? Math.round(numVal/1000)/10 + 'W':numVal}
var padZero = function(val) {
  val +=''
  if(val || val === 0) {
    var valNum = parseInt(val)
    if (valNum < 10 && valNum > 0) {
      val = '0'+val}}
  return val}
var addUrlPre = function(val) {
  if(!val) val  = ''
  if (!(val.indexOf('http')===0)) {
    val = resourceUrlPre + val}
  return val}
var splitZhy = function(val, sym=",") {
  var arr = []
  if (val) {
    arr = val.split(sym)}
  return arr}
module.exports = {
  filterUnitWan: filterUnitWan,
  padZero: padZero,
  addUrlPre: addUrlPre,
  splitZhy: splitZhy}
var formatUrl = function (url) {
  if (!url) {
    return ''}
  return 'https://ieasy-bmd-test-1305698028.cos.ap-beijing.myqcloud.com/' + (url[0] === '/' ? '' : '/') + url}
module.exports = {
  formatUrl: formatUrl}
var touchStartX;
var touchStartY;
function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY}
function handleTouchEnd(event, ownerInstance) {
  var touchEndX = event.changedTouches[0].clientX;
  var touchEndY = event.changedTouches[0].clientY;
  var distanceX = touchEndX - touchStartX;
  var distanceY = touchEndY - touchStartY;
  // 竖向距离大于70不切换
  if (Math.abs(distanceY) > 70) {
    touchStartY = 0
    return}
  // -1：后退；0：不动；1：前进
  var direction = 0;
  // 向左滑，前进
  if (distanceX < 0 && distanceX < -70) {
    direction = 1;}
  // 向右滑，后退
  if (distanceX > 0 && distanceX > 70) {
    direction = -1;}
  if (direction !== 0) {
    ownerInstance.callMethod("handleTouchmove", { direction: direction });}
  touchStartX = 0;}
module.exports = {
  handleTouchStart: handleTouchStart,
  handleTouchEnd: handleTouchEnd,
  propObserver: function (newValue, oldValue, ownerInstance, instance) {
    console.log("prop observer", newValue, oldValue);}};
import { resourceUrlPre } from "./utils/constant.js";
App({
  onLaunch() {
    this.checkUpdateVersion();},
  /** 检测当前的小程序
   * 是否是最新版本，是否需要下载、更新*/
  checkUpdateVersion: function () {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse("getUpdateManager")) {
      //创建 UpdateManager 实例
      const updateManager = wx.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //监听小程序有版本更新事件
          updateManager.onUpdateReady(function () {
            //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
            updateManager.applyUpdate();});
          updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            wx.showModal({
              title: "已经有新版本喽~",
              content:
                "请您删除当前小程序，到微信 “发现-小程序-播米多” 页，重新搜索打开哦~"});});}});} else {
      // wx.showModal({
      //   title: '溫馨提示',
      //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。
      // })}},
  globalData: {
    userInfo: null,
    videoCoverUrl:
      "https://ieasy-bmd-test-1305698028.cos.ap-beijing.myqcloud.com/",
    resourceUrlPre},
  showToast(title, icon = "success") {
    wx.showToast({
      title,
      icon,
      duration: 2000});},
  initWatch(_page) {
    if (!_page) {
      console.error("未检测到Page对象,请将当前page传入该函数");
      return false;}
    if (!_page.watch) {
      //判断是否有需要监听的字段
      console.error(
        "未检测到Page.watch字段(如果不需要监听，请移除initWatch的调用片段)"
      );
      return false;}
    let _dataKey = Object.keys(_page.data);
    Object.keys(_page.watch).map((_key) => {
      //遍历需要监听的字段
      _page.data["__" + _key] = _page.data[_key]; //存储监听的数据
      if (_dataKey.includes(_key)) {
        //如果该字段存在于Page.data中，说明合法
        Object.defineProperties(_page.data, {
          [_key]: {
            //被监听的字段
            enumerable: true,
            configurable: true,
            set: function (value) {
              let oldVal = this["__" + _key];
              if (value !== oldVal) {
                //如果新设置的值与原值不等，则触发监听函数
                setTimeout(
                  function () {
                    //为了同步,否则如果回调函数中有获取该字段值数据时将不同步,获取到的是旧值
                    _page.watch[_key].call(_page, value, oldVal); //设置监听函数的上下文对象为当前的Page对象并执行}.bind(this),
                  0
                );}
              this["__" + _key] = value;},
            get: function () {
              return this["__" + _key];}}});} else {
        console.error("监听的属性[" + _key + "]在Page.data中未找到，请检查~");}});}});
{
  "pages": [
    "pages/quan/quan",
    "pages/goods/goods",
    "pages/goods/search/list",
    "pages/goods/detail/index",
    "pages/university/university",
    "pages/user/user",
    "pages/quan/quan-detail/quan-detail",
    "pages/university/video-detail/index",
    "pages/quan/quan-manage/quan-manage",
    "pages/user/collection/collection",
    "pages/user/myProfile/myProfile",
    "pages/user/tiktok/tiktok",
    "pages/quan/quan-manage/announcement/announcement",
    "pages/login/login",
    "pages/quan/quan-cert-form/quan-cert-form",
    "pages/quan/quan-cert/quan-cert",
    "pages/quan/quan-create-form/quan-create-form",
    "pages/quan/quan-manage/apply-for/apply-for",
    "pages/quan/quan-manage/administrator/administrator",
    "pages/quan/quan-manage/administrator-add/index",
    "pages/quan/quan-manage/transfer/transfer",
    "pages/quan/quan-manage/member/member",
    "pages/quan/quan-search/quan-search",
    "pages/quan/quan-cert-success/quan-cert-success",
    "pages/quan/select-avatar/select-avatar",
    "pages/user/userAgreement/userAgreement"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#FF5000",
    "navigationBarTitleText": "播米多",
    "navigationBarTextStyle": "white"},
  "tabBar": {
    "selectedColor": "#FF5000",
    "color":"#999999",
    "borderStyle":"white",
    "list": [
      {
        "text": "直播圈",
        "pagePath": "pages/quan/quan",
        "iconPath": "images/icons/quan.png",
        "selectedIconPath": "images/icons/quan-selected.png"},
      {
        "text": "选品",
        "pagePath": "pages/goods/goods",
        "iconPath": "images/icons/goods.png",
        "selectedIconPath": "images/icons/goods-selected.png"},
      {
        "text": "大学",
        "pagePath": "pages/university/university",
        "iconPath": "images/icons/university.png",
        "selectedIconPath": "images/icons/university-selected.png"},
      {
        "text": "我的",
        "pagePath": "pages/user/user",
        "iconPath": "images/icons/my.png",
        "selectedIconPath": "images/icons/my-selected.png"}
    ]},
  "sitemapLocation": "sitemap.json",
  "useExtendedLib": {
    "weui": true},
  "usingComponents": {
    "van-toast": "@vant/weapp/toast/index",
    "van-dialog": "@vant/weapp/dialog/index",
    "tabs": "./components/tabs/tabs",
    "modal": "./components/modal/modal",
    "mp-loading": "weui-miniprogram/loading/loading",
    "mp-toptips": "weui-miniprogram/toptips/toptips",
    "empty": "./components/empty/index",
    "mp-video-swiper": "./components/video-swiper/index"}}
@import '/styles/variable.wxss';
@import '/styles/iconfont.wxss';
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;} 
page{
  width:100%;
  height:100%;}
.separated {
  display: flex;
  justify-content: space-between;}
.twoRow {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;}
.single-elip{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;}
/* page::after{
  content: '';
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2rpx;
  background-color: #E9E9E9;
  z-index: 9999;} */
/* .quan .van-dialog__header {
  background: red!important;
  border-radius: 16rpx!important;}
.quan .van-dialog__footer {
  background: red!important;
  border-radius: 100rpx!important;}
.van-dialog{
  border-radius: 200rpx!important;} */
/* .quan .dialog-join-form button {
  background: #f00!important;} */
.quan .weui-cell__bd textarea{
  border:1rpx solid #E9E9E9;
  padding-top:10rpx;
  color:#999;
  font-size: 26rpx!important;
  box-sizing: border-box;}
{
	"compilerOptions": {
		"target": "es2015",
		"module": "commonjs"}	}
{
  "name": "mini-bomiduo",
  "version": "1.0.0",
  "description": "播米多小程序",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"},
  "repository": {
    "type": "git",
    "url": "https://gitee.com/beijing-ieasy/mini-bomiduo.git"},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@vant/weapp": "^1.6.8",
    "miniprogram-recycle-view": "^0.1.5",
    "weapp-qrcode": "^1.0.0"}}
{
  "description": "项目配置文件",
  "packOptions": {
    "ignore": []},
  "setting": {
    "urlCheck": true,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "preloadBackgroundData": false,
    "minified": true,
    "newFeature": false,
    "coverView": true,
    "nodeModules": true,
    "autoAudits": false,
    "showShadowRootInWxmlPanel": true,
    "scopeDataCheck": false,
    "uglifyFileName": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "compileHotReLoad": false,
    "useMultiFrameRuntime": false,
    "useApiHook": false,
    "useApiHostProcess": false,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""},
    "enableEngineNative": false,
    "useIsolateContext": true,
    "useCompilerModule": true,
    "userConfirmedUseCompilerModuleSwitch": false,
    "userConfirmedBundleSwitch": false,
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./"}
    ],
    "minifyWXSS": true},
  "compileType": "miniprogram",
  "libVersion": "2.17.0",
  "appid": "wxcd55ba61e880814e",
  "projectname": "mini-bomiduo",
  "debugOptions": {
    "hidedInDevtools": []},
  "scripts": {},
  "staticServerOptions": {
    "baseURL": "",
    "servePath": ""},
  "isGameTourist": false,
  "condition": {
    "search": {
      "list": []},
    "conversation": {
      "list": []},
    "game": {
      "list": []},
    "plugin": {
      "list": []},
    "gamePlugin": {
      "list": []},
    "miniprogram": {
      "list": []}}}
@font-face {
  font-family: "iconfont"; /* Project id 2546170 */
  src: url('//at.alicdn.com/t/font_2546170_j9f46dwbznm.woff2?t=1623237106722') format('woff2'),
       url('//at.alicdn.com/t/font_2546170_j9f46dwbznm.woff?t=1623237106722') format('woff'),
       url('//at.alicdn.com/t/font_2546170_j9f46dwbznm.ttf?t=1623237106722') format('truetype');}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;}
.icon-yonghu:before {
  content: "\e61b";}
.icon-zuobiao:before {
  content: "\e619";}
.icon-duihao:before {
  content: "\e604";}
.icon-zhuanfa:before {
  content: "\e661";}
.icon-hot:before {
  content: "\e606";}
.icon-tubiao:before {
  content: "\e73f";}
.icon-fans:before {
  content: "\e7d3";}
.icon-tubiao-line:before {
  content: "\e61a";}
.icon-search:before {
  content: "\e600";}
.icon-qiandai:before {
  content: "\e651";}
.icon-price:before {
  content: "\e632";}
.icon-copy:before {
  content: "\e610";}
.icon-collected:before {
  content: "\e646";}
.icon-filter:before {
  content: "\e68a";}
.icon-collect:before {
  content: "\e65d";
  font-size:40rpx;
  color:#FF5000;}
.icon-right:before {
  content: "\e614";}
.icon-jia:before {
  content: "\e715";}
.icon-guanzhu:before {
  content: "\e61e";}
.icon-zuobiao2:before {
  content: "\e662";}
.icon-yonghu2:before {
  content: "\e60e";}
.icon-laba:before {
  content: "\e6c7";}
page {
  --mainColor: #FF5000;
  --mainTextColor:#292B34;
  --hintTextColor:#999999;
  --mainBackColor: #F4F4F4;
  --successColor: #3BA738;}
pages-user
let App=getApp()
import User from '../../models/user.js';
import Login from '../../models/login.js'
Page({
  /** 页面的初始数据S*/
  data: {
    tabList: [
      {label: '波米多账户', value: 'bomiduo'},
      {label: '抖音账户', value: 'tiktok'}
    ],
    tabList2:[
      {label: '视频', value: 'video'},
      {label: '文章', value: 'article'}
    ],
    curTab:'bomiduo',
    curTab2:'video',
    userInfo:{},
    showLogin:false},
  /** 生命周期函数--监听页面加载*/
   onShow: function (options) {
     //判断有没有用户信息
     Login.checkWechatAccessCondition().then((resData)=>{
      if(!resData.accessCondition){//未登录
        this.setData({
          showLogin:true})}else{
            //查询个人资料
        this.queryInformation()}})},
  login() {
    this.getUserInfo().then((res)=>{
      console.log('拿到用户资料，掉接口',res)
        User.saveWxUserInfo({
          ...res.userInfo}).then((data)=>{
          console.log('data',data)
          this.setData({
            showLogin:false})
          wx.showToast({
            title:'登录成功',
            icon:'success'})
          this.setUserData({userInfo:true})
          this.queryInformation()})})},
  
  getUserInfo() {
    return new Promise((resolve, reject)=> {
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '展示在个人中心',
        success: (args) => {
          let { userInfo, encryptedData, iv, rawData,signature } = args
          resolve({ userInfo, encryptedData, iv, rawData,signature })},
        fail: (error) => {
          console.log('fail: ', error)
          reject(error)}})})},
  setUserData(obj) {
    for(let k in obj) {
      console.log(k, obj[k])
      wx.setStorageSync(k, obj[k])}},
  queryInformation(){
    User.queryInformation({}).then((res)=>{
      console.log('res',res)
      if(res==null){
        wx.showToast({
          title:'暂时没有获取到您的资料，请重试',
          icon:'none'})
        return;}
      this.setData({
        userInfo:res})})},
  cancel (){
    this.setData({
      isShowLogin:false})},
  goTiktok(){
    wx.navigateTo({
      url: '/pages/user/tiktok/tiktok',
      success: function(res) {}})},
  goDataBoard(){
    wx.navigateTo({
      url: '/pages/user/dataBoard/dataBoard',
      success: function(res) {}})},
  goCollection(){
    wx.navigateTo({
      url: '/pages/user/collection/collection',
      success: function(res) {}})},
  goMyProfile(){
    wx.navigateTo({
      url: '/pages/user/myProfile/myProfile',
      success: function(res) {}})},})
/* pages/user/user.wxss */
.user_container{
    width:100%;
    height:100%;}
.my_login{
    width:100%;
    height:100%;
    background-image: url('https://img-cdn1.ylyk.com/image/1621232680088_m1621230113451_s34407.jpg');
    background-size: 100% 100%;}
.my_login .button{
    width: 500rpx;
    height:85rpx;
    border-radius: 20rpx;
    border:1rpx solid #ccc;
    position: fixed;
    bottom:250rpx;
    left:0;
    right:0;
    margin:0 auto;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;}
.my_login .edit{
    position: absolute;
    bottom:120rpx;}
.bomiduo,.tiktok{
    padding-top: 80rpx;}
.user_container .head{
    display: flex;
    width:100%;
    justify-content: space-between;
    box-sizing: border-box;
    padding:30rpx;
    color:#FFFFFF;
    align-items: center;
    padding-bottom: 110rpx;}
.head>image{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:286rpx;
    z-index:-1;}
.head .left{
    display: flex;}
.head .left >image{
    width:140rpx;
    height:140rpx;
    border-radius: 50%;
    background:#ccc;
    margin-right: 15rpx;}
.head .vip image{
    width:112rpx;
    height:36rpx;}
.left .name .text{
    margin-bottom: 10rpx;
    margin-top: 25rpx;
    font-size: 32rpx;}
.head .vip{
    display: flex;
    align-items: center;}
.right{
    width: 168rpx;
    height: 66rpx;
    background: #FFFFFF;
    border-radius: 33rpx;
    line-height: 66rpx;
    text-align: center;
    color:#FF5000;
    font-size: 28rpx;}
.list{
    width: 710rpx;
    height: 186rpx;
    background: #FFFFFF;
    box-shadow: 0px 4rpx 14rpx 1rpx rgba(135, 134, 134, 0.09);
    border-radius: 8rpx;
    margin:0 auto;}
.list{
    position: relative;
    top:-60rpx;}
.list2{
    margin-top: 30rpx;}
.list .title{
    font-size: 28rpx;
    color: #333333;
    padding:22rpx 10rpx 20rpx 22rpx;
    font-weight: 500;}
.list .item{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding:28rpx 10rpx 20rpx 29rpx;
    align-items: center;
    border-top: 1rpx dashed #E7E7E7;}
.list .text{
    font-size: 26rpx;}
.list .item .left{
    display: flex;
    align-items: center;}
.list .item .left image{
    width:50rpx;
    height:50rpx;
    margin-right: 10rpx;
    display: block;
    opacity: 1;}
.list .item image{
    width:36rpx;
    height:36rpx;
    opacity: .3;}
<!--pages/user/user.wxml-->
<wxs src="../../wxs/tools.wxs" module="tools"/>
<view class="user_container">
    <view class="my_content">
        <view class="head" wx:if="{{!showLogin}}">
            <image src="../../images/swipers/back.png"/>
            <view class="left">
                <image class="img" src="{{userInfo.headUrl}}"/>
                <view class="name">
                    <view class="text">
                        {{userInfo.name}}
                    </view>
                    <view class="vip">
                        <image src="../../images/icons/svip.png"/>
                    </view>
                </view>
            </view>
            <view class="right" bindtap="goMyProfile">
                编辑资料
            </view>
        </view>
        <view class="head" wx:if="{{showLogin}}">
            <image src="../../images/swipers/back.png"/>
            <view class="left">
                <image class="img" src=""/>
                <view class="name">
                    <view class="text">
                        未登录
                    </view>
                    <view class="vip">
                        <image src="../../images/icons/svip.png"/>
                    </view>
                </view>
            </view>
            <view class="right" bindtap="login">
                授权登录
            </view>
        </view>
    <view class="list list1">
        <view class="title">情报分析</view>
        <view class="item" bindtap="goTiktok">
            <view class="left">
                <image src="../../images/icons/zhanghu.png"/>
                <view class="text">
                    抖音账户
                </view>
            </view>
            <image src="../../images/icons/right.png"/>
        </view>
        <!-- <view class="item" bindtap="goDataBoard">
            <view class="left">
                <image src="../../images/icons/user.png"/>
                <view class="text">
                    数据看板
                </view>
            </view>
            <image src="../../images/icons/user.png"/>
        </view> -->
    </view>
    <view class="list list2">
        <view class="title">账户信息</view>
        <view class="item" bindtap="goCollection">
            <view class="left">
                <image src="../../images/icons/shoucang.png"/>
                <view class="text">
                    我的收藏
                </view>
            </view>
            <image src="../../images/icons/right.png"/>
        </view>
    </view>
    </view>
</view>
{
  "usingComponents": {}}
pages\university
{
  "usingComponents": {},
  "enablePullDownRefresh": true,
  "backgroundTextStyle": "dark"}
import University from "../../models/university";
const { numberFormat, debounce } = require("../../utils/util.js");
import { UNIVERSITY_SWIPER_DATA } from "../../utils/constant";
const universityModel = new University();
const app = getApp();
const { videoCoverUrl } = app.globalData;
Page({
  /** 页面的初始数据*/
  data: {
    searchValue: "",
    tabs: [
      {
        label: "达人孵化",
        value: 1},
      {
        label: "进阶课程",
        value: 2}
    ],
    tabValue: 1,
    listData: [],
    showStatus: false,
    hasMoreData: true},
  /** 生命周期函数--监听页面加载*/
  onLoad: async function (options) {
    app.initWatch(this);
    this._getInitVideoList(this.data.searchValue);},
  /** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},
  /** 生命周期函数--监听页面显示*/
  onShow: function () {
    const { listData } = this.data;
    const newValue = listData.map((list) => ({
      id: list.id,
      url: `${videoCoverUrl}${list.videoUrl}`}));
    wx.setStorageSync(UNIVERSITY_SWIPER_DATA, newValue);},
  /** 生命周期函数--监听页面隐藏*/
  onHide: function () {
    // wx.removeStorageSync(UNIVERSITY_SWIPER_DATA);},
  onTabItemTap: function () {
    // this._getInitVideoList(this.data.searchValue);},
  bindKeyInput: debounce(function (e) {
    if (this.data.tabValue === 2) return;
    this._getInitVideoList(this.data.searchValue.trim());}, 200),
  changeTabValue: function (event) {
    this.setData({
      tabValue: event.currentTarget.dataset.tab
      // searchValue: ''});},
  handleTouchmove: function (event) {
    const direction = event.direction;
    const currentTabValue = this.data.tabValue;
    if (direction === 1 && currentTabValue === 1) {
      this.setData({
        tabValue: 2});}
    if (direction === -1 && currentTabValue === 2) {
      this.setData({
        tabValue: 1});}},
  openItem: function (e) {
    // console.log(e.currentTarget.dataset);
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `video-detail/index?id=${id}`});},
  // 加载数据
  async _getInitVideoList(keyword = "") {
    this.setData({
      showStatus: false});
    let videoList =
      (await universityModel.reset().getVideoList({ keyword })) || [];
    // console.log("videoList", videoList);
    videoList.forEach((item) => {
      if (!item) return;
      if (!item.videoImageUrl.includes("https://")) {
        item.videoImageUrl = `${videoCoverUrl}${item.videoImageUrl}`;
        item.collectNum = numberFormat(item.collectNum);}});
    this.setData({
      showStatus: !videoList.length,
      listData: videoList,
      hasMoreData: universityModel.hasMoreData});},
  changeHeartNumber(isStar, id) {
    // this._getInitVideoList(this.data.searchValue.trim());
    const { listData } = this.data;
    listData.forEach((list) => {
      if (list.id === id) {
        if (isStar) {
          list.collectNum = numberFormat(Number(list.collectNum) - 1);} else {
          list.collectNum = numberFormat(Number(list.collectNum) + 1);}}});
    this.setData({
      listData});},
  /** 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
    if (this.data.tabValue === 2) {
      wx.stopPullDownRefresh();
      return;}
    this._getInitVideoList(this.data.searchValue);
    wx.stopPullDownRefresh();},
  /** 页面上拉触底事件的处理函数*/
  onReachBottom: async function () {
    this.setData({
      hasMoreData: universityModel.hasMoreData});
    if (!universityModel.hasMoreData) {
      return;}
    let videoList = await universityModel.getVideoList({
      keyword: this.data.searchValue});
    videoList.forEach((item) => {
      if (!item.videoImageUrl.includes("https://")) {
        item.videoImageUrl = `${videoCoverUrl}${item.videoImageUrl}`;
        item.collectNum = numberFormat(item.collectNum);}});
    this.setData({
      listData: videoList});},
  /** 用户点击右上角分享*/
  onShareAppMessage: function () {},
  // 监听页面数据变化
  watch: {
    listData: function (value) {
      const newValue = value.map((list) => ({
        id: list.id,
        url: `${videoCoverUrl}${list.videoUrl}`}));
      // console.log("监听数据-pageIndex", newValue);
      wx.setStorageSync(UNIVERSITY_SWIPER_DATA, newValue);}}});
<wxs src="../../wxs/touchmove.wxs" module="handleTouch"/>
<view class="university-container" style="height: {{tabValue === 1 ? 'auto' : '100%'}};overflow: {{tabValue === 1 ? '' : 'hidden'}}">
  <view class="search-input">
    <text class="iconfont icon-search"></text>
    <input
      placeholder="输入关键字"
      bindinput="bindKeyInput"
      placeholder-class="placeholder"
      model:value="{{ searchValue }}"
    />
  </view>
  <view class="tab-switch" style="margin-bottom: {{tabValue === 1 ? '22rpx' : '0'}};">
    <view wx:for="{{ tabs }}" wx:key="value">
      <view
        bindtap="changeTabValue"
        data-tab="{{ item.value }}"
        class="{{ tabValue === item.value ? 'tabActive' : '' }}"
      >
        {{ item.label }}
      </view>
    </view>
  </view>
  <view bind:touchstart="{{handleTouch.handleTouchStart}}" bind:touchend="{{handleTouch.handleTouchEnd}}" wx:if="{{tabValue === 1}}" class="data-list" style="background-color: {{listData.length ? '' : '#fff'}};">
    <view class="list-left">
      <block wx:for="{{ listData }}" wx:key="id">
        <template
          is="item"
          data="{{...item}}"
          wx:if="{{ index % 2 === 0 }}"
        ></template>
      </block>
    </view>
    <view class="list-right">
      <block wx:for="{{ listData }}" wx:key="id">
        <template
          is="item"
          data="{{...item}}"
          wx:if="{{ index % 2 === 1 }}"
        ></template>
      </block>
    </view>
    <empty wx:if="{{listData.length < 1}}"></empty>
    <view wx:if="{{!hasMoreData}}" class="noMoreData">没有更多数据了~</view>
  </view>
  <view bind:touchstart="{{handleTouch.handleTouchStart}}" bind:touchend="{{handleTouch.handleTouchEnd}}" wx:if="{{tabValue === 2}}" class="wait-data">
    <image mode="widthFix" class="nodata-bg-image" src="/images/temporary/nodata.png"></image>
    <view class="mask-image">
      <image mode="aspectFit" src="/images/temporary/wait.png"></image>
    </view>
  </view>
</view>
<template name="item">
  <view class="list-item" bindtap="openItem" data-id="{{id}}">
    <view class="video-con">
      <image class="item-img" src="{{ videoImageUrl }}" mode="widthFix"></image>
      <view class="play-icon">
        <image src="../../images/temporary/i-video.png"></image>
      </view>
    </view>
    <view class="item-title-box">
      <text class="item-title">{{ videoName }}</text>
    </view>
    <view class="item-name">
      <image class="item-ava" src="{{ userUrl }}"></image>
      <text class="name-title">{{ username }}</text>
      <view class="heart_">
        <image src="../../images/temporary/favorites-fillb.png"></image>
        <text>{{ collectNum }}</text>
      </view>
    </view>
    <!-- <view class="sign-pos">
      <image src="../../images/temporary/i-gold.png"></image>
      <text>{{sign}}</text>
    </view> -->
  </view>
</template>
/* pages/university/university.wxss */
.university-container {
  background-color: #eee;
  /* padding: 0 20rpx; */
  font-size: 26rpx;
  /* height: 400px; */
  /* padding-top: 30rpx; */
  box-sizing: border-box;
  /* min-height: 100%; */}
.search-input {
  padding-top: 30rpx !important;
  background-color: #fff;
  padding: 0 20rpx;
  box-sizing: border-box;
  position: relative;
  /* position: sticky;
  top: 45rpx;
  z-index: 99; */}
.search-input input {
  background-color: #f4f4f4;
  height: 60rpx;
  border-radius: 30rpx;
  padding: 0 30rpx;
  padding-left: 60rpx;}
.placeholder {
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;}
.icon-search {
  position: absolute;
  color: #b4b4b4;
  font-size: 36rpx;
  left: 40rpx;
  top: 32rpx;}
.tab-switch {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  position: sticky;
  top: 0rpx;
  z-index: 99;
  /* margin-bottom: 22rpx; */}
.tab-switch > view {
  /* width: 144rpx; */
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  padding: 26rpx 0rpx;
  box-sizing: border-box;}
.tabActive {
  color: #ff5000 !important;
  font-size: 36rpx !important;}
.wait-data {
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
  /* padding-top: 100rpx; */
  /* height: 100%; */
  height: calc(100% - 99rpx);
  position: relative;}
.nodata-bg-image {
  position: absolute;
  z-index: 0;
  width: 100%;}
.mask-image {
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 200rpx;}
.mask-image image {
  width: 414rpx;}
.data-list {
  text-align: justify;
  padding: 0 20rpx;}
.list-left,
.list-right {
  display: inline-block;
  vertical-align: top;
  width: 49%;}
.list-right {
  float: right;}
.list-item {
  position: relative;
  background-color: #fff;
  margin-bottom: 16rpx;
  display: inline-block;
  width: 100%;
  border-radius: 8rpx;}
.sign-pos {
  position: absolute;
  left: 0rpx;
  top: 0rpx;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 24rpx;
  font-weight: 500;
  height: 50rpx;
  width: 136rpx;
  line-height: 50rpx;
  border-radius: 0rpx 0rpx 20rpx 0rpx;
  display: flex;
  align-items: center;
  justify-content: center;}
.sign-pos image {
  width: 34rpx;
  height: 34rpx;
  margin-right: 4rpx;}
.video-con {
  position: relative;
  height: 100%;}
.item-img {
  width: 100%;
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;}
.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);}
.play-icon image {
  width: 80rpx;
  height: 80rpx;}
.item-title-box {
  padding: 0 10rpx;}
.item-title {
  font-size: 28rpx;
  font-weight: 400;
  color: #292b34;
  margin: 15rpx 0;
  line-height: 44rpx;
  /* display: inline-block; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;}
.item-name {
  display: flex;
  padding: 0 10rpx;
  margin-bottom: 18rpx;
  align-items: center;
  font-size: 22rpx;}
.item-ava {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;}
.name-title {
  flex: 1;
  margin: 0 10rpx;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: #999;
  font-size: 24rpx;}
.item-name text:last-child {
  /* flex: 1 1 30rpx; */
  color: #999;
  line-height: 10rpx;
  font-size: 24rpx;}
.heart_ {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;}
.heart_ image {
  width: 44rpx !important;
  height: 44rpx;
  margin-right: 4rpx;}
.noMoreData {
  text-align: center;
  margin-top: 40rpx;
  padding-bottom: 20rpx;
  color: #ccc;
  display: block;
  clear: both;}
pages\university\video-detail
import { UNIVERSITY_SWIPER_DATA } from "../../../utils/constant";
import University from "../../../models/university";
const { numberFormat } = require("../../../utils/util.js");
import login from "../../../request/login"
const universityModel = new University();
const { videoCoverUrl } = getApp().globalData;
var behaviorLogin = require('../../../behavior/login')
Page({
  behaviors: [behaviorLogin],
  data: {
    // videoContext: null,
    videoId: "",
    enterValue: "",
    dataList: [
      {
        count: "点赞数",
        url: "/images/temporary/favorites.png",
        urlActive: "/images/temporary/favorites-fill.png",
        type: "starNum"},
      {
        count: "收藏数",
        url: "/images/temporary/collection.png",
        urlActive: "/images/temporary/collection-fill.png",
        type: "collectNum"},
      {
        count: "评论",
        url: "/images/temporary/comments.png",
        type: "commentNum"},
      {
        count: "转发",
        url: "/images/temporary/forward.png",
        type: "transpondNum"}
    ],
    _isPause: false,
    videoData: {},
    commentList: [],
    showMask: false,
    showComment: false,
    extraClasses: "",
    swiperData: [],
    isSwiperVideo: true,
    videoIndex: -1},
  /** 生命周期函数--监听页面加载*/
  onLoad: async function (options) {
    // console.log(options);
    const { id, share } = options;
    let swiperData = wx.getStorageSync(UNIVERSITY_SWIPER_DATA) || [];
    if (swiperData.length > 2) {
      const other = swiperData.find((item) => item.id === id);
      swiperData = swiperData.filter((item) => item.id !== id);
      swiperData.splice(1, 0, other);
      this.setData({
        isSwiperVideo: true,
        swiperData});} else {
      this.setData({
        isSwiperVideo: false});}
    this.initGetDataFromId(id);
    if (share) {
      //分享视频
      this.onLogin(()=>{
        login.checkPhoneLogin().then(()=>{
          this.initGetDataFromId(id);
          University.transpondVideo(id);})})  }},
  async initGetDataFromId(id) {
    await this._getInitVideoData(id);
    await this._getInitCommentData({ id });
    this.setData({
      videoId: id});},
  onReady: function () {
    this.videoContext = wx.createVideoContext("myVideo");},
  onShow: function () {},
  async _getInitVideoData(id) {
    const { dataList } = this.data;
    const videoData = await University.getVideInfo(id);
    // console.log("videoData", videoData);
    videoData.videoUrl = `${videoCoverUrl}${videoData.videoUrl}`;
    if (videoData.userUrl && !videoData.userUrl.includes("https://")) {
      videoData.userUrl = `${videoCoverUrl}${videoData.userUrl}`;}
    for (let key in videoData) {
      if (typeof videoData[key] === "number") {
        videoData[key] = numberFormat(videoData[key]);
        dataList.forEach((item) => {
          if (item.type === key) {
            item.count = videoData[key];}});}}
    this.setData({
      videoData,
      dataList});},
  async _getInitCommentData(data) {
    const commentList = await universityModel.reset().getVideoCommentList(data);
    commentList.forEach((comment, index) => {
      comment.id = index + 1;
      if (comment.userUrl && !comment.userUrl.includes("https://")) {
        comment.userUrl = `${videoCoverUrl}${comment.userUrl}`;}});
    // console.log("commentList", commentList);
    this.setData({
      commentList});},
  videoErrorCallback: function (e) {
    wx.showModal({
      content: e.detail.errMsg});},
  videoLoadedEnd: function (e) {},
  handleSeekcomplete: function (e) {
    console.log("handleSeekcomplete", e);},
  handleIcon: async function (e) {
    const { type } = e.currentTarget.dataset.listData;
    const { videoData, videoId } = this.data;
    if (type === "starNum") {
      if (videoData.isStar) {
        await University.videoCancelStar(videoId);} else {
        await login.checkPhoneLogin().then(()=>{
          University.videoStar(videoId);})}
      this._getInitVideoData(videoId);
      if (getCurrentPages()[0].changeHeartNumber) {
        getCurrentPages()[0].changeHeartNumber(videoData.isStar, videoId);
        // getCurrentPages()[0].onReachBottom();}
      return;}
    if (type === "collectNum") {
      if (videoData.isCollect) {
        await University.videoCancelCollection(videoId, 2);} else {
        await login.checkPhoneLogin().then(()=>{
          University.videoCollect(videoId);})}
      this._getInitVideoData(videoId);
      /* wx.showToast({
        title: "收藏成功",
        icon: "success",
        duration: 1000}); */
      return;}
    if (type === "commentNum") {
      this.setData({
        showComment: true});}},
  closeComment: function () {
    this.setData({
      showComment: false,
      extraClasses: ""});},
  closeCommentAll: function (e) {
    this.setData({
      showComment: false,
      extraClasses: ""});},
  closeCommentCatch: function (e) {},
  handleFollow: function (e) {
    wx.showToast({
      title: `关注成功`,
      icon: "success",
      duration: 500});},
  handleShare: function (e) {},
  handleVideo: function () {
    const { _isPause } = this.data;
    if (!_isPause) {
      this.videoContext.pause();
      this.setData({
        _isPause: true});} else {
      this.videoContext.play();
      this.setData({
        _isPause: false});}},
  handleVideo3: function () {
    const { videoIndex } = this.data;
    const childInstance = this.selectComponent(".video-swiper");
    childInstance.handleVideoPlay(videoIndex);
    this.setData({
      _isPause: false});},
  handlePlayChange: function (e) {
    // console.log(e);
    const { _isPause, index } = e.detail;
    if (!_isPause) {
      this.setData({
        _isPause: true,
        videoIndex: index});} else {
      this.setData({
        _isPause: false});}},
  pauseVideo: function (e) {
    // 当暂停播放时
    console.log("pauseVideo", e);},
  handleLike: function (event) {
    console.log(event);},
  bindKeyInput: function (e) {},
  bindConfirm: async function (e) {
    const context = this.data.enterValue.trim();
    if (context) {
      const { videoId } = this.data;
      await University.videoComment({
        id: videoId,
        comment: context});
      await this._getInitCommentData({ id: videoId });
      await this._getInitVideoData(videoId);
      this.setData({
        enterValue: ""});} else {
      wx.showToast({
        title: "评论失败",
        icon: "error",
        duration: 1000});
      this.setData({
        enterValue: ""});}},
  bindFocus: function (e) {
    // console.log("bindFocus", e);
    this.setData({
      showMask: true});},
  bindBlur: function (e) {
    console.log("bindBlur", e);
    this.setData({
      showMask: false});},
  async handleScrollToLower() {
    const id = this.data.videoId;
    const commentList = await universityModel.getVideoCommentList({ id });
    commentList.forEach((comment, index) => {
      comment.id = index + 1;
      if (comment.userUrl && !comment.userUrl.includes("https://")) {
        comment.userUrl = `${videoCoverUrl}${comment.userUrl}`;}});
    this.setData({
      commentList});},
  onHide: function () {},
  /** 生命周期函数--监听页面卸载*/
  onUnload: function () {},
  /** 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
  /** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {},
  /** 用户点击右上角分享*/
  onShareAppMessage: function () {
    const { videoId, videoData } = this.data;
    return {
      title: `${videoData.description}`,
      path: `pages/university/video-detail/index?id=${videoId}&share=1`,
      imageUrl: `${videoCoverUrl}${videoData.videoImageUrl}`};},
  onPlay(e) {},
  onPause(e) {},
  onEnded(e) {},
  onError(e) {
    console.log("播放出错", e);
    wx.showToast({
      title: "播放出错",
      icon: "success",
      duration: 1000});},
  onWaiting(e) {},
  onTimeUpdate(e) {},
  onProgress(e) {},
  onLoadedMetaData(e) {
    // this.initGetDataFromId(e.detail.activeId);},
  handleBindchange(e) {
    this.setData({
      _isPause: false,
      videoIndex: -1});
    this.initGetDataFromId(e.detail.activeId);}});
.video-play-page {
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: hidden;}
.video-show {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  position: relative;
  z-index: 0;}
.myVideo {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  position: relative;
  z-index: 1;}
.video-swiper {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  position: relative;
  z-index: 1;}
.share-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  transition: all 100ms ease-in-out;
  width: 100rpx;
  height: 100rpx;}
.share-icon image {
  width: 100rpx;
  height: 100rpx;
  position: absolute;}
.share-icon button[plain] {
  border: 1px solid transparent;
  width: 50rpx;
  height: 50rpx;
  position: relative;}
.share-icon2 {
  height: 54rpx;}
.share-icon2 button[plain] {
  border: 1px solid transparent;}
/* .operate-list {} */
.icon-info {
  width: 100rpx;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 350rpx;
  right: 0;
  background-color: transparent;
  z-index: 11;}
.video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 44rpx;
  width: 100rpx;
  height: 120rpx;
  margin-right: 15rpx;}
.video-item:last-child {
  margin-bottom: 0rpx;}
.icon-info-image {
  width: 56rpx;
  height: 56rpx;
  margin-bottom: 4rpx;}
/* .icon-pause-image {
  width: 100rpx !important;
  height: 100rpx !important;} */
.icon-info-image2 {
  margin-bottom: 0rpx;}
.video-item-btn {
  background-color: transparent;
  color: #fff;
  font-size: 30rpx;}
.user-info {
  position: absolute;
  bottom: 0rpx;
  left: 0;
  width: 100%;
  height: 200rpx;
  background-color: transparent;
  padding: 0rpx 30rpx;
  margin-bottom: 82rpx;
  box-sizing: border-box;
  z-index: 10;}
.user-info-top {
  display: flex;
  align-items: center;
  color: #fff;
  margin-bottom: 24rpx;}
.user-info-name {
  display: inline-block;
  margin: 0 18rpx;
  font-size: 26rpx;
  opacity: 0.35;
  font-weight: bold;
  color: #ffffff;}
.user-info-btn {
  background-color: #292b34;
  display: block;
  width: 148rpx;
  height: 54rpx;
  line-height: 54rpx;
  border-radius: 31rpx;
  text-align: center;
  font-size: 26rpx;
  opacity: 0.45;
  color: #fff;}
.user-info-image {
  width: 90rpx;
  height: 90rpx;
  border-radius: 80rpx;}
.user-info-bot {
  line-height: 37rpx;
  color: #fff;
  font-size: 26rpx;
  opacity: 0.35;
  font-weight: bold;}
.comment-list {
  position: absolute;
  /* top: 0; */
  bottom: -100vh;
  right: 0;
  left: 0;
  z-index: 19;
  color: #fff;
  width: 100%;
  height: 100vh;
  /* min-height: 100vh; */
  /* overflow-y: hidden; */
  transition: all 0.5s ease;}
.comment-list-mask {
  background-color: #fff;}
.comment-list-content {
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx 16rpx 0px 0px;
  height: 70%;
  color: #292b34;}
.comment-content-mask {
  background-color: rgba(0, 0, 0, 0.1);}
.box-moved {
  bottom: 0rpx;}
@keyframes box-ani {
  from {
    bottom: -70%;}
  to {
    bottom: 0;}}
.comment-title {
  position: relative;
  text-align: center;
  height: 96rpx;
  line-height: 96rpx;
  border-bottom: 1rpx solid rgba(229, 229, 229, 0.3);
  padding: 0 20rpx;}
.comment-title text {
  color: #292b34;
  font-size: 30rpx;}
.close-image {
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  right: 30rpx;
  top: 18rpx;}
.comment-list-show {
  height: calc(100% - 250rpx);
  box-sizing: border-box;
  padding: 0 20rpx;}
.comment-style {
  padding-top: 26rpx;
  display: flex;}
.comment-style-image {
  flex: 0 0 74rpx;
  margin-right: 16rpx;}
.comment-style-image image {
  width: 74rpx !important;
  height: 74rpx;
  border-radius: 37rpx;
  display: inline-block;}
.comment-style-center {
  display: flex;
  flex-direction: column;
  flex: 0 0 508rpx;}
.t1 {
  font-size: 28rpx;
  font-weight: 400;
  color: #292b34;}
.t2 {
  font-size: 24rpx;
  font-weight: 400;
  color: #666666;
  line-height: 40rpx;
  display: inline-block;
  margin-bottom: 14rpx;}
.t3 {
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;}
.comment-style-star {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-top: 33rpx;}
.comment-style-star image {
  width: 44rpx;
  height: 44rpx;
  display: inline-block;}
.t4 {
  font-size: 24rpx;
  font-weight: 400;
  color: #666666;
  line-height: 33rpx;}
.write-comment {
  padding: 30rpx 20rpx 20rpx;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;}
.write-comment input {
  width: 100%;
  height: 74rpx;
  background: rgba(41, 43, 52, 0.09);
  border-radius: 49rpx;
  padding-left: 28rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #333;
  box-sizing: border-box;}
.placeholder {
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;}
<view class="video-play-page">
  <view class="video-show">
    <video
      wx:if="{{!isSwiperVideo}}"
      id="myVideo"
      class="myVideo"
      src="{{ videoData.videoUrl }}"
      controls="{{ false }}"
      autoplay="{{ true }}"
      loop="{{ true }}"
      object-fit="cover"
      show-center-play-btn="{{ true }}"
      show-mute-btn="{{ true }}"
      show-play-btn="{{ false }}"
      show-fullscreen-btn="{{ false }}"
      binderror="videoErrorCallback"
      bindloadedmetadata="videoLoadedEnd"
      bindtap="handleVideo"
    >
    </video>
    <mp-video-swiper 
      wx:if="{{isSwiperVideo}}"
      class="video-swiper"
      video-list="{{swiperData}}"
      bindloadedmetadata="onLoadedMetaData"
      bindchange="handleBindchange"
      catch:changePlayStatus="handlePlayChange"
    >
    </mp-video-swiper>
  </view>
  <view class="operate-list">
    <view class="share-icon" bindtap="{{isSwiperVideo ? 'handleVideo3' : 'handleVideo'}}" style="display: {{_isPause ? 'block' : 'none'}};">
      <image
          class="icon-pause-image"
          src="/images/temporary/i-pause.png"
        ></image>
    </view>
    <view class="icon-info">
      <view
        class="video-item"
        wx:for="{{ dataList }}"
        wx:key="index"
        catchtap="handleIcon"
        data-list-data="{{ item }}"
      >
        <image wx:if="{{item.type === 'commentNum'}}" class="icon-info-image" src="{{ item.url }}"></image>
        <view class="share-icon2" wx:if="{{item.type === 'transpondNum'}}">
          <button size="mini" plain="{{ true }}" open-type="share">
            <image
              class="icon-info-image icon-info-image2"
              src="{{ item.url }}"
            ></image>
          </button>
        </view>
        <image wx:if="{{item.type === 'starNum'}}" class="icon-info-image" src="{{ videoData.isStar ? item.urlActive :  item.url}}"></image>
        <image wx:if="{{item.type === 'collectNum'}}" class="icon-info-image" src="{{ videoData.isCollect ? item.urlActive :  item.url}}"></image>
        <text class="video-item-btn" size="mini">{{ item.count }}</text>
      </view>
    </view>
    <view class="user-info">
      <view class="user-info-top">
        <image class="user-info-image" src="{{ videoData.userUrl }}"></image>
        <text class="user-info-name">{{ videoData.username }}</text>
        <!-- <text class="user-info-btn" catchtap="handleFollow">立即关注</text> -->
      </view>
      <view class="user-info-bot">{{ videoData.description }}</view>
    </view>
  </view>
  <view
    class="comment-list {{ showMask ? 'comment-list-mask' : '' }}"
    style="bottom: {{showComment ? '0' : '-100vh'}};"
    id="comment-list"
    bindtap="closeCommentAll"
  >
    <view
      class="comment-list-content {{ showMask ? 'comment-content-mask' : '' }}"
    >
      <view class="comment-title" catchtap="closeComment">
        <text>共{{videoData.commentNum}}条评论</text>
        <image class="close-image" src="/images/temporary/close.png"></image>
      </view>
      <view catchtap="closeCommentCatch" class="comment-list-show">
        <scroll-view
          scroll-y="{{commentList.length}}"
          style="width: 100%; height: 100%"
          scroll-anchoring="{{ true }}"
          lower-threshold="50"
          bindscrolltolower="handleScrollToLower"
        >
          <view
            wx:for="{{ commentList }}"
            style="display: flex; height: 100px"
            class="comment-style"
            wx:key="id"
          >
            <view class="comment-style-image">
              <image wx:if="{{item.userUrl}}" src="{{ item.userUrl }}"></image>
            </view>
            <view class="comment-style-center">
              <text class="t1">{{ item.username }}</text>
              <text class="t2">{{ item.comment }}</text>
              <text class="t3">{{ item.createTime }}</text>
            </view>
            <!-- <view
              data-id="{{ item.starNum }}"
              bindtap="handleLike"
              class="comment-style-star"
            >
              <image src="/images/temporary/favorites-h.png"></image>
              <text class="t4">{{ item.starNum }}</text>
            </view> -->
          </view>
          <empty tip="暂无评论" wx:if="{{commentList.length < 1}}"></empty>
        </scroll-view>
      </view>
      <view catchtap="closeCommentCatch" class="write-comment">
        <input
          placeholder="来说点啥~"
          placeholder-class="placeholder"
          type="text"
          confirm-type="send"
          model:value="{{ enterValue }}"
          adjust-position="{{ true }}"
          cursor-spacing="10"
          bindinput="bindKeyInput"
          bindconfirm="bindConfirm"
          bindfocus="bindFocus"
          bindblur="bindBlur"
        />
      </view>
    </view>
  </view>
</view>
pages\quan
@import "../goods/search-input.wxss";
page {
  height: 100%;
  --fixedHeight: 490rpx;}
.index {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */}
.search {
  background-color: var(--mainColor);
  padding-top: 0;
  padding-bottom: 20rpx;
  padding: 0 0 20rpx 0;
  width: 100%;}
.search .search-input {
  width: 710rpx;
  margin: 0 auto;}
.swipers {
  position: relative;
  overflow: hidden;
  background-color: #fff;}
.back {
  width: 100%;
  height: 100%;
  top: -100rpx;
  position: absolute;}
.swipers>swiper {
  width: 710rpx;
  height: 280rpx;
  margin: 0 auto;
  border-radius: 8rpx;
  overflow: hidden;}
swiper>swiper-item {}
swiper-item> image {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;}
swiper-item>.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(50rpx);
  border-radius: 20rpx;}
input {
  background-color: #fff;
  border-radius: 30rpx;
  padding: 0 15rpx;}
.placeholder {
  color: #B4B4B4;}
.text-center {
  text-align: center;
  font-size: 35rpx;}
img {
  width: 100%;
  height: 100%;}
.fixed {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);}
.quan {
  min-height: calc(100% - var(--fixedHeight));
  padding-top: var(--fixedHeight);
  overflow-y: scroll;
  background-color:var(--mainBackColor);}
.hei {
  height: calc(100% - var(--fixedHeight) );}
.m-t-15 {
  margin-top: 15rpx;}
.hint {
  color: var(--hintTextColor);
  text-align: center;}
.hei-100 {
  height: 100rpx;}
<!--index.wxml-->
<view class="index">
  <view class="fixed">
    <view class="search">
    <view class="search-input" bindtap="goSearch">
      <text class="iconfont icon-search" />
      <text class="input">输入关键词搜索圈子</text>
    </view>
  </view>
  <view class="swipers">
    <image class="back" src="../../images/swipers/back.png"></image>
    <swiper indicator-dots
            autoplay
            circular
            indicator-color="#fff"
            indicator-active-color="#FF5000">
      <swiper-item wx:for="{{ swiperList }}" wx:key="url">
        <image-back url="{{resourceUrlPre + item.cosPath }}" aspectFit="{{true}}"></image-back>
      </swiper-item>
    </swiper>
  </view>
  <tabs tabList="{{tabList}}" bind:change="changeTab" curTab="{{curTab}}"></tabs>
  </view>
  <view class="quan {{!loading && (curTab ==='my' && !detail || curTab !=='my' && (!listData.list || !listData.list.length))? 'hei': ''}}">
    <my-quan wx:if="{{!loading && curTab ==='my'}}"
             item="{{detail}}"
             bindgojoin="goJoin"></my-quan>
    <quan-list wx:else
               list="{{listData.list}}"
               list-type="{{curTab === 'rank' ? 'rank': ''}}"
               loading="{{loading}}"
               bindrefresh="refresh">
    </quan-list>
    <mp-loading show="{{loading}}"
                type="{{page.pageNum === 1 ? 'circle': 'dot-gray'}}"
                extClass="hei-100"
                style="height: 100rpx;"></mp-loading>
    <view class="hint"
          wx:if="{{!loading && listData.pageCount === page.pageNum}}">没有更多数据了～</view>
  </view>
</view>
{
  "usingComponents": {
    "tabs": "../../components/tabs/tabs",
    "quan-list": "./components/quan-list/quan-list",
    "my-quan": "./components/my-quan/my-quan",
    "mp-searchbar": "weui-miniprogram/searchbar/searchbar",
    "image-back": "../../components/image-back/image-back"}}
import {request} from '../../request/index'
import { quanAll, quanDetail } from '../../utils/demo.js'
import { resourceUrlPre } from '../../utils/constant.js'
import QuanList from '../../models/quan-list'
import Public from '../../models/public.js'
import login from '../../request/login'
Page({
  /** 页面的初始数据*/
  data: {
    swiperList: [],
    tabList:[
      {label: '我的圈', value: 'my'},
      {label: '全部', value: 'all'},
      {label: '关注', value: 'watch'},
      {label: '排行榜', value: 'rank'},
    ],
    curTab: "all",
    list: [],
    loading: true,
    detail: {},
    listData: {
      list: [],
      pageCount: 0},
    page: {
      pageNum: 1,
      pageSize: 15},
    resourceUrlPre,
    options: {}},
  /** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},
  onLoad: function () {
    login.onLogin(()=>{
      this.init()})},
  onShow: function() {
    let list = this.data.swiperList
    if (!list || !list.length) {
      this.getSwiperList()}
    if (this.data.curTab === 'my') {
      this.queryDetail()}},
  init() {
    this.getSwiperList()
    this.ifApplySuccess(this.data.options)
    this.queryAllList()},
  getCode() {
    return new Promise((reslove, reject) => {
      wx.login({
        success (res) {
          let { code } = res
          reslove(code)},
        fail: (error) => {
          console.log(error)
          reject(error)}})})},
  setUserData(obj) {
    for(let k in obj) {
      // console.log(k, obj[k])
      wx.setStorageSync(k, obj[k])}},
  /** 生命周期函数--监听页面隐藏*/
  onHide: function () {},
  /** 生命周期函数--监听页面卸载*/
  onUnload: function () {},
  /** 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
  /** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    let pageNum = this.data.page.pageNum
    if (this.data.curTab !== 'my' &&
        pageNum < this.data.listData.pageCount) {
      this.setData({
        ["page.pageNum"]: ++pageNum})
      this.switchQuery(this.data.curTab)}},
  /** 用户点击右上角分享*/
  onShareAppMessage: function () {},
  goSearch(){
    wx.navigateTo({
      url: '/pages/quan/quan-search/quan-search',})},
  changeTab(e) {
    this.setData({
      curTab: e.detail,
      ["page.pageNum"]: 1,
      listData: {
        list: [],
        pageCount: 0}})
    this.switchQuery(e.detail)},
  switchQuery(val) {
    this.setData({
      loading: true,})
    switch(val) {
      case "my": 
        this.queryDetail()
        break;
      case "all":
        this.queryAllList();
        break;
      case "watch":
        this.queryWatchList();
        break;
      case "rank":
        this.queryRankList();
        break;
      default:
        this.queryAllList()}},
  queryList(pm) {
    if (!pm) return
    this.setData({
      loading: true,})
    pm.then(data => {
      let { pageCount, list: newList, pageNum } = data
      let list = pageNum === 1 ? [] : this.data.listData.list
      list = list.concat(newList)
      this.setData({
        ["listData.list"]: list,
        ["listData.pageCount"]: pageCount})}).catch(error => {
      wx.showToast({
        title: '接口异常',
        icon: 'error',
        duration: 2000})}).finally(() => {
      this.setData({
        loading: false,})})},
  queryWatchList() {
    this.queryList(QuanList.queryWatchQuan({...this.data.page}))},
  queryAllList() {
    this.queryList(QuanList.queryAllQuan({...this.data.page}))},
  queryRankList() {
    this.queryList(QuanList.queryRankQuan({...this.data.page}))},
  queryDetail() {
    this.setData({
      // loading: true,
      list:[]})
    QuanList.queryMyQuan({}).then(data => {
      this.setData({
        detail: data})}).catch((error) => {
      getApp().showToast(error.message || '异常', 'error')
      this.setData({
        detail: null})}).finally(()=>{
      this.setData({
        loading: false})})},
  goJoin() {
    this.setData({
      curTab: 'all'})
    this.changeTab({detail: 'all'})},
  getSwiperList() {
    Public.getStaticResource().then(data=>{
      this.setData({
        swiperList: data || []})})},
  ifApplySuccess(options) {
    if (!options) return
    let { tab, status } = options
    if (tab) {
      this.setData({
        curTab: tab})}
    if(tab === 'my' && status && status === 'success') {
      wx.showModal({
        title: '申请成功',
        content: '等待播米多客服验证通过后，即可生效',
        cancelText: "撤销",
        cancelColor: '#F55000',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')} else if (res.cancel) {
            console.log('用户点击取消')}}})}},
  refresh(e) {
    let detail = e.detail
    // 关注触发更新
    if (detail) {
      let { field, groupNo, value } = detail
      let list = this.data.listData.list
      let curItemInd = list.findIndex(o => o.groupNo === groupNo)
      if (curItemInd>-1) {
        this.setData({
          [`listData.list[${curItemInd}].${field}`]: value})}} else {
      this.setData({
        ["page.pageNum"]: 1})
      this.switchQuery(this.data.curTab)}}})
pages\login
import { AppId, AppSecret } from '../../utils/constant.js'
import User from '../../models/user.js';
import Login from '../../models/login.js';
Page({
  /** 页面的初始数据*/
  data: {
    showGetPhone:true},
  /** 生命周期函数--监听页面加载*/
  onLoad: function (options) {},
  init() {},
  login() {
    this.getUserInfo().then((res)=>{
      console.log('拿到用户资料，掉接口',res)
        User.saveWxUserInfo({
          ...res.userInfo}).then((data)=>{
          console.log('data',data)
          this.setData({
            showLogin:false})
          // wx.showToast({
          //   title:'登录成功',
          //   icon:'success'
          // })
          this.setUserData({userInfo:true})})})},
  
  getUserInfo() {
    return new Promise((resolve, reject)=> {
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '展示在个人中心',
        success: (args) => {
          this.setData({
            showGetPhone:true})
          let { userInfo, encryptedData, iv, rawData,signature } = args
          resolve({ userInfo, encryptedData, iv, rawData,signature })},
        fail: (error) => {
          console.log('fail: ', error)
          reject(error)}})})},
  quit() {
    wx.navigateBack({
      delta: -1,})},
  setUserData(obj) {
    for(let k in obj) {
      // console.log(k, obj[k])
      wx.setStorageSync(k, obj[k])}},
  getPhoneNumber(e) {
    console.log('绑定手机号',e)
    if(e.detail.iv){
      Login.savePhone(e.detail).then((res)=>{
        console.log('savephone res',res)
        if(res.saveResult){
          wx.showToast({
            title:"登录成功"})
          setTimeout(() => {
            wx.navigateBack()}, 2000);}})}else{}}})
.avatar image{
  width: 180rpx;
  height: 180rpx;
  margin: 170rpx auto 0 auto;
  overflow: hidden;
  display: block;}
.title{
  font-size: 36rpx;
  font-weight: 500;
  margin:26rpx auto 170rpx auto;
  display: block;
  text-align: center;}
.login button {
  width: 608rpx!important;
  height: 94rpx!important;
  /* line-height: 94rpx!important; */
  border-radius: 47rpx!important;
  font-size: 36rpx;
  border: 1rpx solid rgba(151, 151, 151, 0.35);}
.login button.login-btn {
  background-color: var(--mainColor);
  color: #fff;
  border: none;}
.m-t-70 {
  margin-top: 70rpx;}
<view class="login">
  <view class="avatar">
    <!-- <open-data type="userAvatarUrl"></open-data> -->
    <image src="../../images/logo.png"/>
    <view class="title">播米多</view>
  </view>
  <button class="login-btn m-t-70" wx:if="{{!showGetPhone}}" bindtap="login">授权登录</button>
  <button class="login-btn m-t-70" open-type="getPhoneNumber" wx:if="{{showGetPhone}}" bindgetphonenumber="getPhoneNumber">绑定手机号</button>
  <button class="cancel m-t-70" bindtap="quit">取消</button>
</view>
pages\goods
import Toast from '@vant/weapp/toast/toast'
import { commonErrorHandler, request } from '../../request/index'
const { post: POST } = request
const createRecycleContext = require('miniprogram-recycle-view');
// pages/goods/goods.js
Page({
  /** 页面的初始数据*/
  data: {
    loadingMore: false,
    scrollTop: 0,
    topHover: false,
    tabs: [
      {
        value: 'explore',
        label: '发现',},
      {
        value: 'valuable',
        label: '高佣金',},
    ],
    activeTab: 'explore',
    filters: null,
    pageNum: 1,
    pageSize: 10,
    totalCount: null,
    noMore: false,
    show: false,
    recommendedGoods: [{}, {}, {}, {}, {}],
    hotGoods: null,},
  loading() {
    Toast.loading({
      message: '加载中...',
      duration: 0,});},
  loadingMore() {
    this.setData({ loadingMore: true })},
  toggleFilterPanel: function () {
    this.setData({
      show: !this.data.show})},
  filterSearch() {
    let filters = this.selectComponent('#filter').getFieldsValue()
    if (!Object.keys(filters).length) {
      filters = null}
    this.resetPage({
      filters,
      show: false,})
    this.fetchPageData()},
  resetFilter() {
    this.selectComponent('#filter').resetFieldsValue({})},
  onClose() {
    this.setData({ show: false })},
  onFocus() {
    wx.navigateTo({
      url: '/pages/goods/search/list',})},
  fetchPageData() {
    this.loading()
    if (this.data.activeTab === 'explore') {
      this.fetchRecommendedGoods()}
    this.fetchHotGoods()},
  fetchListData() {
    console.log('noMore', this.data.noMore)
    const { noMore, loadingMore } = this.data
    if (noMore || loadingMore) {
      return}
    this.setData({ pageNum: this.data.pageNum + 1 })
    this.loadingMore()
    this.fetchHotGoods()},
  fetchRecommendedGoods() {
    POST('/goods/findList', {}, {}, false).then(data => {
      this.setData({ recommendedGoods: data })}).catch(() => {
      commonErrorHandler()})},
  fetchHotGoods() {
    const { pageNum, pageSize, activeTab, filters } = this.data
    const urlMap = {
      explore: '/goods/hotSalesList',
      valuable: '/goods/highCommissionList',}
    const payload = {
      ...(filters || {}),
      pageNum,
      pageSize,}
    POST(urlMap[activeTab], payload, {}, false).then(({ list, totalCount }) => {
      if (list && list.length) {
        this._ctx.append(list)}
      this.setData({ totalCount, noMore: pageNum * pageSize >= totalCount })}).catch(() => {
      commonErrorHandler()
      this.setData({ totalCount: 0, noMore: true })}).finally(() => {
      this.setData({ loadingMore: false })
      Toast.clear()})},
  resetPage(newData = {}) {
    this.setData({
      scrollTop: 0,
      topHover: false,
      filters: null,
      pageNum: 1,
      totalCount: null,
      show: false,
      noMore: false,
      ...newData,})
    wx.pageScrollTo({
      scrollTop: 0,})
    this._ctx.splice(0, this.data.hotGoods ? this.data.hotGoods.length : 0)},
  handleTabChange(e) {
    this.setData({
      activeTab: e.detail,});
    const { filters } = this.data
    this.resetPage({ filters });
    this.fetchPageData()},
  catchtouchmove() { },
  handleClose() {
    this.setData({ show: false })},
  onScroll(e) {
    const { topHover } = this.data
    const { scrollTop } = e.detail
    if (topHover && scrollTop < 10) {
      this.setData({ topHover: false })} else if (!topHover && scrollTop > 10) {
      this.setData({ topHover: true })}},
  /** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    var ctx = createRecycleContext({
      id: 'goods',
      dataKey: 'hotGoods',
      page: this,
      itemSize: this.itemSizeFunc,})
    this._ctx = ctx
    this.fetchPageData()},
  itemSizeFunc: function () {
    return {
      width: this._ctx.transformRpx(345),
      height: this._ctx.transformRpx(560),}},
  /** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    this.fetchListData()},})
/* pages/goods/goods.wxss */
@import "/styles/iconfont.wxss";
@import "./goods-list-column-2.wxss";
@import "./search-input.wxss";
page {
  background-color: var(--mainBackColor);
  color: var(--mainTextColor);
  --topHeight: 195rpx;}
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;}
view {
  box-sizing: border-box;}
#goods {
  padding-top: var(--topHeight);}
.top {
  position: fixed;
  height: var(--topHeight);
  width: 100%;
  top: 0;
  left: 0;
  z-index: 101;
  background-color: #fff;}
.top-hover {
  box-shadow: 0 2px 13px -1px rgba(135, 134, 134, 0.21);}
.toolbar {
  --right: 136rpx;
  display: flex;
  align-items: center;}
.tabs {
  width: 310rpx;
  margin: 0 128rpx 0 175rpx;}
.icon-filter::before {
  font-size: 28rpx;}
.filter {
  position: relative;
  width: var(--right);
  color: var(--hintTextColor);
  font-size: 28rpx;
  --dividerPadding: 20rpx;
  padding-left: var(--dividerPadding);
  --heightBox: 40rpx;
  height: var(--heightBox);
  line-height: var(--heightBox);}
.filter::before {
  display: block;
  --height: 24rpx;
  height: var(--height);
  position: absolute;
  left: 0;
  top: calc((var(--heightBox) - var(--height) + 4rpx) / 2);
  content: '';
  border-left: 1rpx solid #C8C7C7;}
.van-popup--top {
  top: var(--topHeight) !important;
  height: calc(100vh - var(--topHeight));}
.filterPanel {
  box-sizing: border-box;
  height: calc(100vh - var(--topHeight));}
.filterPanel .header {
  text-align: center;
  font-size: 32rpx;
  height: 45rpx;
  line-height: 45rpx;
  margin-top: 34rpx;
  margin-bottom: 8rpx;}
.filterPanel .footer {
  margin-top: 92rpx;
  margin-bottom: 37rpx;
  display: flex;}
#submit, #reset {
  box-sizing: border-box;
  width: 332rpx;
  height: 98rpx;
  font-size: 36rpx;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;}
#submit {
  margin: 0 26rpx 0 30rpx;
  background-color: var(--mainColor);}
#reset {
  margin: 0;
  border: 1rpx solid rgba(0, 0, 0, 0.14);}
.recommendedGoods {
  border-radius: 20rpx;
  background: #fff;
  padding: 0 20rpx 0rpx;
  overflow: hidden;}
.recommendedGoods .header {
  height: 70rpx;
  font-size: 32rpx;
  padding: 0 16rpx;}
.recommendedGoods .item {
  padding: 22rpx 12rpx 22rpx 20rpx;
  box-shadow: 4rpx 0px 13rpx -1rpx rgba(135, 134, 134, 0.19);
  border-radius: 8rpx;
  margin-bottom: 30rpx;}
.bodyLock{
  top:0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 0;}
<!--pages/goods/goods.wxml-->
<view class="top {{topHover && !show ? 'top-hover' : ''}}" catchtouchmove="catchtouchmove">
  <view class="search">
    <view class="search-input" bindtap="onFocus">
      <text class="iconfont icon-search" />
      <text class="input">每日推荐</text>
    </view>
  </view>
  <view class="toolbar">
    <view class="tabs">
      <tabs className="tabs goodsTabs" tabList="{{tabs}}" bind:change="handleTabChange" curTab="{{activeTab}}"></tabs>
    </view>
    <view class="filter" bindtap="toggleFilterPanel">筛选 <text class="iconfont icon-filter"></text></view>
  </view>
</view>
<van-popup show="{{ show }}" closeable position="top" bind:close="onClose">
  <view class="filterPanel">
    <view class="header">全部筛选</view>
    <view class="form">
      <filter id="filter" />
    </view>
    <view class="footer">
      <button id="submit" type="primary" bindtap="filterSearch">确定</button>
      <button id="reset" bindtap="resetFilter" plain="true">重置</button>
    </view>
  </view>
</van-popup>
<view class="{{show ? 'bodyLock' : ''}}">
  <recycle-view batch="{{batchSetRecycleData}}" id="goods" scroll-top="{{scrollTop}}" bindscrolltolower="onReachBottom"
    bindscroll="onScroll">
    <view class="recommendedGoods" wx:if="{{activeTab === 'explore' && !filters}}">
      <view class="header">今日必推</view>
      <view class="list">
        <view class="item" wx:key="index" wx:for="{{recommendedGoods}}">
          <recommender detail="{{item}}" />
        </view>
      </view>
    </view>
    <block wx:if="{{hotGoods && hotGoods.length}}">
      <view class="goodsListColumn2">
        <view class="header">热销商品</view>
        <recycle-item class="item" wx:for="{{hotGoods}}" wx:key="title">
          <hot detail="{{item}}" />
        </recycle-item>
      </view>
      <more noMore="{{noMore}}" loading="{{loadingMore}}" />
    </block>
    <empty wx:else />
  </recycle-view>
</view>
<van-toast id="van-toast" />
{
  "usingComponents": {
    "empty": "/components/empty/index",
    "van-popup": "@vant/weapp/popup/index",
    "tabs": "/components/tabs/tabs",
    "recycle-view": "miniprogram-recycle-view/recycle-view",
    "recycle-item": "miniprogram-recycle-view/recycle-item",
    "more": "./components/more/index",
    "filter": "./components/filter/filter",
    "recommender": "./components/recommender/recommender",
    "hot": "./components/hot/hot"}}
