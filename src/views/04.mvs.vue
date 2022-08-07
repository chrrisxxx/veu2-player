<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" @click="area = '全部'"> 全部 </span>
          </li>
          <li class="tab">
            <span class="title" @click="area = '内地'"> 内地 </span>
          </li>
          <li class="tab">
            <span class="title" @click="area = '港台'"> 港台 </span>
          </li>
          <li class="tab">
            <span class="title" @click="area = '欧美'"> 欧美 </span>
          </li>
          <li class="tab">
            <span class="title" @click="area = '日本'"> 日本 </span>
          </li>
          <li class="tab">
            <span class="title" @click="area = '韩国'"> 韩国 </span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: type == '全部' }" @click="type = '全部'"> 全部 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '官方版' }" @click="type = '官方版'"> 官方版 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '原声' }" @click="type = '原声'"> 原声 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '现场版' }" @click="type = '现场版'"> 现场版 </span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '网易出品' }" @click="type = '网易出品'"> 网易出品 </span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" @click="order = '上升最快'"> 上升最快 </span>
          </li>
          <li class="tab">
            <span class="title" @click="order = '最热'"> 最热 </span>
          </li>
          <li class="tab">
            <span class="title" @click="order = '最新'"> 最新 </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <img :src="item.cover" @click="toMV(item.id)" alt="" />
            <div class="num-wrap">
              <div @click="toMV(item.id)" class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="page" :page-size="5" :limit="limit"> </el-pagination>
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
  name: 'mvs',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 8,
      //地区
      area: '全部',
      //类型
      type: '全部',
      //排序
      order: '上升最快',
      //查询结构
      list: [],
      // 遮罩层的显示状态
      isShow: false,
      //mv地址
      url: ''
    }
  },
  //侦听器
  watch: {
    area() {
      //返回第一页
      this.page = 1
      this.getList()
    },
    type() {
      //返回第一页
      this.page = 1
      this.getList()
    },
    order() {
      //返回第一页
      this.page = 1
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //获取列表数据
    async getList() {
      await axios
        .get('https://autumnfish.cn/mv/all', {
          params: {
            area: this.area,
            type: this.type,
            order: this.order,
            //数量
            limit: this.limit,
            //偏移值 分页 （页码-1）*数量
            offset: (this.page - 1) * this.limit
          }
        })
        .then(res => {
          this.list = res.data.data
          //处理次数
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].playCount > 100000) {
              this.list[i].playCount = parseInt(this.list[i].playCount / 10000) + '万'
            }
          }
          //保存总条数,接口有问题
          if (res.data.count) this.total = res.data.count
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
    },
    //页码改变
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.page = val
      this.getList()
    }
  }
}
</script>

<style></style>
