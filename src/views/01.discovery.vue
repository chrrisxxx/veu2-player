<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="toPlaylist(item.id)"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="toMV(item.id)"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 设置遮罩层显示条件，点击MV播放按钮出现遮罩层 -->
    <div class="video_con" v-show="isShow" style="display: none">
      <video :src="url" ref="video" controls autoplay></video>
      <div class="mask" @click="hide"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'discovery',
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: [],
      // 遮罩层的显示状态
      isShow: false,
      //mv地址
      url: ''
    }
  },
  created() {
    // console.log('created')
    // 轮播图接口
    axios.get('https://autumnfish.cn/banner').then(res => {
      // console.log(res)
      this.banners = res.data.banners.slice(0, 4)
    })
    // 推荐歌单
    axios
      .get('https://autumnfish.cn/personalized', {
        params: {
          // 获取的数据量
          limit: 10
        }
      })
      .then(res => {
        // console.log(res)
        this.list = res.data.result
      })
    // 最新音乐
    axios.get('https://autumnfish.cn/personalized/newsong').then(res => {
      // console.log(res)
      this.songs = res.data.result
    })
    // 最新mv
    axios.get('https://autumnfish.cn/personalized/mv').then(res => {
      // console.log(res)
      this.mvs = res.data.result
    })
  },
  methods: {
    async playMusic(id) {
      await axios
        .get('https://autumnfish.cn/song/url', {
          params: {
            id: id
          }
        })
        .then(res => {
          let url = res.data.data[0].url
          // 设置给父组件的 播放地址
          this.$parent.musicUrl = url
        })
    },
    async toMV(id) {
      await axios
        .get('https://autumnfish.cn/mv/url', {
          params: {
            id: id
          }
        })
        .then(res => {
          this.url = res.data.data.url
          this.isShow = true
        })
    },
    // 点击隐藏遮罩层，并停止播放MV
    hide() {
      this.isShow = false
      this.url = ''
    }
  }
}
</script>

<style></style>
