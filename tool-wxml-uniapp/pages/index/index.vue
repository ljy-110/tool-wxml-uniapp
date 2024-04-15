<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<view class="weather-box">
			<view class="w-address-b center" @click="toWeather">
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
			<view v-for="(item,index) in menuList" :key="index">
				<view class="u-p-20 menu-item" @click="toRouter(item.router)">
					<view class="">
						<u-icon :name="item.icon" color="#2979ff" size="65"></u-icon>
						<view class="">{{item.name}}</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="u-font-12 u-text-center u-p-20" style="color: #ccc;">
			粤ICP备2024232287号
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuList2:[
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
						id:'43',name:'ICP备案',icon:'chat',
						router:'/pageC/icpFiling/icpFiling'
					},
					{
						id:'44',name:'手机号归属',icon:'phone',
						router:'/pageC/phoneOwnership/phoneOwnership'
					},
					{
						id:'45',name:'车牌号归属',icon:'car',
						router:'/pageC/plateAffiliation/plateAffiliation'
					},
					{
						id: '37',
						name: '塔罗牌',
						icon: 'fingerprint',
						router: '/pageB/tarot/tarot'
					},
					{
						id:'500',name:'搞笑视频',icon:'skip-forward-right',
						router:'/pageB/crayonShinChan/crayonShinChan'
					},
					{
						id:'5',name:'热搜榜',icon:'order',
						router:'/pageB/hotSearch/hotSearch'
					},
					{
						id:'500',name:'网盘资源',icon:'download',
						router:'/pageB/webResource/webResource'
					},
					{
						id:'5',name:'随机萌图',icon:'photo',
						router:'/pageB/randomPattern/randomPattern'
					},
					
					{
						id:'500',name:'随机热歌',icon:'volume-up',
						router:'/pageB/randomSong/randomSong'
					},
					{
						id:'500',name:'网易云歌单',icon:'rewind-right',
						router:'/pageB/neteaseCloud/neteaseCloud'
					},
					{
						id:'500',name:'网易云音乐',icon:'volume-up',
						router:'/pageB/wyMusic/wyMusic'
					},
					
					{
						id:'15',name:'头像生成',icon:'photo',
						router:'/pageB/profilePhoto/profilePhoto'
					},
					{
						id:'500',name:'短剧搜索',icon:'play-circle',
						router:'/pageB/playlet/playlet'
					},
					{
						id:'500',name:'快看漫画',icon:'file-text',
						router:'/pageB/kuaikanComics/kuaikanComics'
					},
					{
						id:'500',name:'小说搜索',icon:'edit-pen',
						router:'/pageB/novelSearch/novelSearch'
					},
					{
						id:'500',name:'动漫搜索',icon:'android-fill',
						router:'/pageB/cartoon/cartoon'
					},
					{
						id:'500',name:'音乐搜索',icon:'search',
						router:'/pageB/musicSearch/musicSearch'
					},
					{
						id:'500',name:'QQ音乐',icon:'volume',
						router:'/pageB/qqMusic/qqMusic'
					},
					{
						id:'32',name:'Q音歌词',icon:'volume',
						router:'/pageB/qqMusicWord/qqMusicWord'
					},
					{
						id:'6',name:'王者战力',icon:'level',
						router:'/pageB/KingHonor/KingHonor'
					},
					{
						id:'30',name:'斗图',icon:'bookmark',
						router:'/pageB/bucketChart/bucketChart'
					},
					{
						id:'31',name:'情侣头像',icon:'heart',
						router:'/pageB/loversImage/loversImage'
					},
					{
						id:'13',name:'图片素描',icon:'photo',
						router:'/pageB/sketch/sketch'
					},
					{
						id:'13',name:'Cosplay相册',icon:'photo',
						router:'/pageC/cosplayPhoto/cosplayPhoto'
					},
					
					{
						id:'49',name:'初音未来',icon:'photo',
						router:'/pageC/hatsuneMiku/hatsuneMiku'
					},
					{
						id:'500',name:'随机视频',icon:'play-circle',
						router:'/pageC/sjVideo/sjVideo'
					},
					{
						id:'50',name:'车辆信息',icon:'car',
						router:'/pageC/vehicleInfo/vehicleInfo'
					},
					{
						id:'500',name:'企业查询',icon:'info-circle',
						router:'/pageC/companyInfo/companyInfo'
					},
					{
						id:'50',name:'汇率换算',icon:'rmb-circle',
						router:'/pageC/currencyConversion/currencyConversion'
					},
					
				],
				menuList:[],
				address:'天河区',
				WeatherInfo:{},
				wx_shenhe:null
			}
		},
		onLoad() {
			this.getLocalIP();
		},
		onShow() {
			this.menuList = []
			this.wx_shenhe = uni.getStorageSync('wx_shenhe');
			if (this.wx_shenhe == '0') {
				this.menuList = this.menuList2
			}else{
				this.menuList = this.menuList2.filter(item => item.id != '500')
			}
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
			toWeather(){
				uni.switchTab({
					url: '/pages/weather/weather'
				});
				console.log('ces');
			}
		}
	}
</script>

<style lang="scss">
	.w-a-sky-w{
		font-size: 50px;
		
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
		padding: 10px 10px;
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
