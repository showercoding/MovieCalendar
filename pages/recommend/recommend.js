const {
  Solar,
  Lunar
} = require("lunar-javascript")
Page({
  data: {
    'today_solar': "",
    'today_lunar': "",
    "show_year": 0,
    "directors": '',
    "title": '',
    "average": '',
    "stars": '',
    "loading_opacity": 10,
    "animationData": '',
    "backImage": '',
    "overview": "",
    "publish_date": "",
    // 测试用数据,后续改为数据库推荐
    "movieData": {
      "overview": "可怜的电焊工波力（BURN·E）在安装星际航线上的灯泡时看到了清洁工瓦力（WALL·E），从而遭遇它人生最大的挫折……",
      "tmdb_id": "13413",
      "title": "电焊工波力",
      "original_title": "BURN·E",
      "publish_date": "2008-11-17",
      "budget": 0,
      "runtime": 8,
      "revenue": 0,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/gaLg3gpoJScDNfkDw4itX79Gi8x.jpg",
      "poster_path": "https://image.tmdb.org/t/p/w500/caoE99m4tHqR02S3KLRwzzJ9YeN.jpg",
      "count": 726,
      "value": "7.500",
      "actors": ["Angus MacLane", "Tessa Swigart", "本·贝尔特", "杰夫·格尔林", "艾丽莎·奈特"],
      "directors": ["Angus MacLane"]
    },
  },
  //页面初次渲染完成
  onReady: function (e) {
    this.setLunar()
    this.setMovieData()
  },
  // 页面初始化
  onLoad: function (options) {
    wx.setStorageSync('today_date', new Date())
    this.loadMovie()
  },
  //加载电影信息
  loadMovie: function () {
    this.loading();
  },
  //计算行星显示规则
  starCount: function (originStars) {
    //计算星星显示需要的数据，用数组stars存储五个值，分别对应每个位置的星星是全星、半星还是空星
    var starNum = originStars / 2 + 1,
      stars = [],
      i = 0;
    do {
      if (starNum >= 1) {
        stars[i] = 'full';
      } else if (starNum >= 0.5) {
        stars[i] = 'half';
      } else {
        stars[i] = 'no';
      }
      starNum--;
      i++;
    } while (i < 5)
    return stars;
  },
  //加载动画
  loading: function () {
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: "ease"
    })
    animation.opacity(1).step()
    this.setData({
      animationData: animation.export()
    })
  },
  onShow: function (e) {
    let today_date = wx.getStorageSync('today_date')
    today_date = new Date(today_date)
    let day = new Date()
    if (today_date.getDate() != day.getDate()) {
      this.setLunar()
      this.setMovieData()
    }
  },
  setLunar: function () {
    let lunar_obj = wx.getStorageSync('lunar_obj')
    let lunar_str = lunar_obj.str
    let good = lunar_obj.good.slice(0, 4)
    let bad = lunar_obj.bad.slice(0, 4)

    this.setData({
      today_solar: Solar.fromDate(new Date()).toString(),
      lunar_str,
      good,
      bad,
    })
  },
  setMovieData: function () {
    let backImage = this.data.movieData.poster_path
    var now = new Date(),
      thisYear = now.getFullYear();
    var publish_date = this.data.movieData.publish_date
    publish_date = new Date(Date.parse(publish_date))
    var publish_year = publish_date.getFullYear()
    let stars = parseFloat(this.data.movieData.value)
    let budget = this.data.movieData.budget
    let revenue = this.data.movieData.revenue
    let actors = this.data.movieData.actors
    let directors = this.data.movieData.directors
    if (budget == 0) {
      budget = "未知"
    }
    if (revenue == 0) {
      revenue = "未知"
    }
    this.setData({
      backImage: backImage,
      title: this.data.movieData.title,
      overview: this.data.movieData.overview,
      publish_date: this.data.movieData.publish_date,
      show_year: thisYear - publish_year,
      stars: this.starCount(stars),
      budget,
      revenue,
      actors,
      directors
    })


  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '今日推荐哪部电影'
        })
      }, 2000)
    })
    return {
      title: '今日推荐哪部电影',
      path: '/pages/recommend/recommend',
      promise
    }
  },
})