const {
  Solar,
  Lunar
} = require("lunar-javascript")

// app.js
App({
  //全局数据，中文日期，供转换用
  chineseDate: {
    years: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
    months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  },
  onLaunch() {
    // 展示本地存储能力
    let d = new Date()
    let path = '/images/nav/calendar/calendar' + d.getDate() + '.png'
    let path_s = '/images/nav/calendar/calendar_choose' + d.getDate() + '.png'
    wx.setTabBarItem({
      index: 0,
      iconPath: path,
      selectedIconPath: path_s,
    })
    let lunar = Lunar.fromDate(new Date())
    let solar = Solar.fromDate(new Date())
    let lunar_obj = {}
    let solar_obj = {}
    let ganzhi = lunar.getYearInGanZhi()
    let year = solar.getYear()
    let luar_month = lunar.getMonthInChinese() + '月'
    let month = solar.getMonth()
    let lunar_day = lunar.getDayInChinese()
    let day = solar.getDay()
    let lunar_str = ganzhi + luar_month + lunar_day
    let good = lunar.getDayYi()
    let bad = lunar.getDayJi()
    let weekday = '周' + solar.getWeekInChinese()
    solar_obj.year = year
    solar_obj.month = month
    solar_obj.day = day
    solar_obj.weekday = weekday
    lunar_obj.ganzhi = ganzhi
    lunar_obj.month = luar_month
    lunar_obj.day = lunar_day
    lunar_obj.str = lunar_str
    lunar_obj.good = good
    lunar_obj.bad = bad
    // 缓存今日宜事忌事
    wx.setStorageSync(
      'lunar_obj', lunar_obj
    )
    // 缓存年月日
    wx.setStorageSync('solar_obj', solar_obj)

  },

  globalData: {
    userInfo: null,
    onlaunch_end: false,
  }
})