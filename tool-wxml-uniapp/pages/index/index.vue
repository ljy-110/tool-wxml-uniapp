<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<view class="weather-box">
			<view class="w-address-b center">
				<view class="w-a-name u-font-32">
					<text>{{address}}</text>
					<u-icon name="map" color="#000" size="32"></u-icon>
				</view>
				<view class="w-a-sky">
					<image :src="'/static/image/icons/'+WeatherInfo.icon + '.svg'" class="img-box"></image>
					<text class="w-a-sky-w">{{WeatherInfo.temp}}</text>
					<text>℃</text>
				</view>
				<view class="w-title">
					{{WeatherInfo.text}}  /  {{WeatherInfo.windDir}}
				</view>
			</view>
		</view>
		<view class="grid__4k u-m-t-50">
			<view v-for="(item,index) in menuList" :key="index" class="u-p-20 menu-item" @click="toRouter(item.router)">
				<view class="">
					<u-icon :name="item.icon" color="#2979ff" size="65"></u-icon>
					<view class="">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuList:[
					{
						id:'1',name:'IP查询',icon:'wifi',
						router:'/pageB/searchIP/searchIP'
					},
					{
						id:'2',name:'当前定位',icon:'map',
						router:'/pageB/viewMap/viewMap'
					},
					{
						id:'3',name:'查看地图',icon:'map',
						router:'/pageB/viewMap/viewMap'
					},
					{
						id:'4',name:'地址解析',icon:'car',
						router:'/pageB/addressRes/addressRes'
					},
					{
						id:'5',name:'随机萌图',icon:'photo',
						router:'/pageB/randomPattern/randomPattern'
					},
					{
						id:'6',name:'王者战力',icon:'level',
						router:'/pageB/KingHonor/KingHonor'
					},
					{
						id:'8',name:'随机热歌',icon:'volume-up',
						router:'/pageB/randomSong/randomSong'
					},
					{
						id:'14',name:'网易云歌单',icon:'rewind-right',
						router:'/pageB/neteaseCloud/neteaseCloud'
					},
					{
						id:'22',name:'网易云音乐',icon:'volume-up',
						router:'/pageB/wyMusic/wyMusic'
					},
					{
						id:'13',name:'图片素描',icon:'photo',
						router:'/pageB/sketch/sketch'
					},
					{
						id:'15',name:'头像生成',icon:'photo',
						router:'/pageB/profilePhoto/profilePhoto'
					},
					{
						id:'16',name:'短剧搜索',icon:'play-circle',
						router:'/pageB/playlet/playlet'
					},
					{
						id:'17',name:'小说搜索',icon:'edit-pen',
						router:'/pageB/novelSearch/novelSearch'
					},
					{
						id:'19',name:'动漫搜索',icon:'android-fill',
						router:'/pageB/cartoon/cartoon'
					},
					{
						id:'20',name:'音乐搜索',icon:'volume-up',
						router:'/pageB/musicSearch/musicSearch'
					},
					{
						id:'20',name:'QQ音乐',icon:'volume',
						router:'/pageB/qqMusic/qqMusic'
					},
					{
						id:'21',name:'快看漫画',icon:'file-text',
						router:'/pageB/kuaikanComics/kuaikanComics'
					}
					
				],
				address:'天河区',
				WeatherInfo:{}
			}
		},
		onLoad() {
			this.getLocalIP();
		},
		methods: {
			toRouter(url){
				uni.navigateTo({
					url: url
				});
			},
			getLocalIP(){ //ip定位
				let that = this
				uni.request({
					url: 'https://apis.map.qq.com/ws/location/v1/ip',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key:that.$TXMAPKEY,
						ip:''
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						if (res.data.status == 0) {
							// that.ipData = res.data.result
							that.address = res.data.result.ad_info.district || res.data.result.ad_info.city
							let latlng =(Math.floor(100 * res.data.result.location.lng) / 100)+ ',' + (Math.floor(100 * res.data.result.location.lat) / 100)
							uni.setStorageSync('latlng', latlng);
							that.getWeatherInfo(latlng)
						} else{
							uni.showToast({
								title: res.data.message,
								icon: 'error',
								mask: true,
								duration: 2000
							});
						}
					},
					fail(err) {
						uni.showToast({
							title: '获取IP定位失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {
					},
				});
			},
			getWeatherInfo(location){
				let that = this
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/now',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key:that.$HFWEATHERKEY,
						location:location
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						if (res.data.code == 200) {
							// that.ipData = res.data.result
							that.WeatherInfo = res.data.now
						} else{
							uni.showToast({
								title: res.data.message,
								icon: 'error',
								mask: true,
								duration: 2000
							});
						}
					},
					fail(err) {
						uni.showToast({
							title: '获取天气信息失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {
					},
				});
			},
		}
	}
</script>

<style lang="scss">
	.w-a-sky-w{
		font-size: 80px;
		
	}
	.img-box{
		height: 100rpx;
		width: 100rpx;
		margin-right: 20px;
	}
	.content {
		padding: 10px;
		box-sizing: border-box;
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}
	.weather-box{
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		padding: 20px 10px;
		box-sizing: border-box;
	}
	.menu-item{
		text-align: center;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 12px;
	}
	.logo-icon {
		height: 100rpx;
		width: 100rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
