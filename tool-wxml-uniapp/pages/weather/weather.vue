<template>
	<view class="content">
		<view class="weather-box">
			<view class="w-address-b center">
				<view class="w-a-name u-font-32">
					<text>{{address}}</text>
					<u-icon name="map" color="#def" size="32"></u-icon>
				</view>
				<view class="w-a-sky">
					<text class="w-a-sky-w">{{WeatherInfo.temp}}</text>
					<text>℃</text>
				</view>
				<view class="w-title">
					{{WeatherInfo.text}} / {{WeatherInfo.windDir}}
				</view>
			</view>
		</view>
		<view class="grid__4k u-m-t-20">
			<view class="u-p-20 menu-item">
				<view class="menu-value">{{WeatherInfo.windDir}}</view>
				<view class="menu-title">风向</view>
			</view>
			<view class="u-p-20 menu-item">
				<view class="menu-value">{{WeatherInfo.feelsLike}}℃</view>
				<view class="menu-title">体感温度</view>
			</view>
			<view class="u-p-20 menu-item">
				<view class="menu-value">{{WeatherInfo.windSpeed}}</view>
				<view class="menu-title">风速</view>
			</view>
			<view class="u-p-20 menu-item">
				<view class="menu-value">{{WeatherInfo.humidity}}%</view>
				<view class="menu-title">相对湿度</view>
			</view>
			<view class="u-p-20 menu-item">
				<view class="menu-value">{{WeatherInfo.precip}}mm</view>
				<view class="menu-title">降水量</view>
			</view>
			<view class="u-p-20 menu-item">
				<view class="menu-value">{{WeatherInfo.pressure}}hPa</view>
				<view class="menu-title">大气压强</view>
			</view>
			<view class="u-p-20 menu-item">
				<view class="menu-value">{{WeatherInfo.vis}}km</view>
				<view class="menu-title">能见度</view>
			</view>
			<view class="u-p-20 menu-item">
				<view class="menu-value">{{WeatherInfo.cloud}}%</view>
				<view class="menu-title">云量</view>
			</view>
		</view>
		
		<view class="weather-index">
			<view class="title">天气指数</view>
			<view class="grid__4k">
				<view class="u-p-20 u-text-center" v-for="(item,index) in weatherIndexList" :key="index" @click="openDetail(item)">
					<view class="menu-value">{{item.category}}</view>
					<view class="u-font-12 u-m-t-10">{{(item.name).slice(0, -2)}}</view>
				</view>
			</view>
		</view>
		
		<u-modal v-model="showDetail" :title="titleDetail" :show-confirm-button="false" 
		:show-cancel-button="true" cancel-text="关闭"
		 :content="content"></u-modal>
		
		<view class="weather-index">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view class="scroll-view-item_H" v-for="(item,index) in hourForecast" :key="index">
					<view class="time">
						{{$u.timeFormat(item.fxTime, 'hh:MM')}}
					</view>
					<image :src="'/static/image/icons/'+item.icon + '.svg'" class="img-box"></image>
					<view class="temp">{{item.temp}}℃</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="more">
			<view class="more-btn" @click="toMore">
				<u-icon name="clock"></u-icon>
				<text class="u-p-l-10 u-p-r-10">查看更多天气</text>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		
		<view class="weather-index">
			<view class="title">空气质量</view>
			<view class="grid__4k">
				<view class="u-p-20 u-text-center">
					<view class="menu-value">{{airQualityInfo.category}}</view>
					<view class="u-font-12 u-m-t-10">质量指数</view>
				</view>
				<view class="u-p-20 u-text-center">
					<view class="menu-value">{{airQualityInfo.aqi}}</view>
					<view class="u-font-12 u-m-t-10">指数级别</view>
				</view>
				<view class="u-p-20 u-text-center">
					<view class="menu-value">{{airQualityInfo.pm10}}</view>
					<view class="u-font-12 u-m-t-10">PM10</view>
				</view>
				<view class="u-p-20 u-text-center">
					<view class="menu-value">{{airQualityInfo.pm2p5}}</view>
					<view class="u-font-12 u-m-t-10">PM2.5</view>
				</view>
				<view class="u-p-20 u-text-center">
					<view class="menu-value">{{airQualityInfo.no2}}</view>
					<view class="u-font-12 u-m-t-10">二氧化氮</view>
				</view>
				<view class="u-p-20 u-text-center">
					<view class="menu-value">{{airQualityInfo.so2}}</view>
					<view class="u-font-12 u-m-t-10">二氧化硫</view>
				</view>
				<view class="u-p-20 u-text-center">
					<view class="menu-value">{{airQualityInfo.co}}</view>
					<view class="u-font-12 u-m-t-10">一氧化碳</view>
				</view>
				<view class="u-p-20 u-text-center">
					<view class="menu-value">{{airQualityInfo.o3}}</view>
					<view class="u-font-12 u-m-t-10">臭氧</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: '',
				longitude: '',
				localInfo: {},
				address: '天河区',
				ipData: {
					"ip": "14.145.186.179",
					"location": {
						"lat": 23.12463,
						"lng": 113.36199
					},
					"ad_info": {
						"nation": "中国",
						"province": "广东省",
						"city": "广州市",
						"district": "天河区",
						"adcode": 440106,
						"nation_code": 156
					}
				},
				WeatherInfo: {
					"obsTime": "2024-04-08T14:10+08:00",
					"temp": "20",
					"feelsLike": "21",
					"icon": "306",
					"text": "中雨",
					"wind360": "45",
					"windDir": "东北风",
					"windScale": "1",
					"windSpeed": "2",
					"humidity": "96",
					"precip": "0.0",
					"pressure": "1005",
					"vis": "6",
					"cloud": "99",
					"dew": "20"
				},
				weatherIndexList:[
					{
					  "date": "2021-12-16",
					  "type": "1",
					  "name": "运动指数",
					  "level": "3",
					  "category": "较不宜",
					  "text": "天气较好，但考虑天气寒冷"
					},
				],
				airQualityInfo:{
					"pubTime": "2021-02-16T14:00+08:00",
					    "aqi": "28",
					    "level": "1",
					    "category": "优",
					    "primary": "NA",
					    "pm10": "28",
					    "pm2p5": "5",
					    "no2": "3",
					    "so2": "2",
					    "co": "0.2",
					    "o3": "76"
				},
				scrollTop:0,
				old: {
					scrollTop: 0
				},
				hourForecast:[
					{
					  "fxTime": "2021-02-16T15:00+08:00",
					  "temp": "2",
					  "icon": "100",
					  "text": "晴",
					  "wind360": "335",
					  "windDir": "西北风",
					  "windScale": "3-4",
					  "windSpeed": "20",
					  "humidity": "11",
					  "pop": "0",
					  "precip": "0.0",
					  "pressure": "1025",
					  "cloud": "0",
					  "dew": "-25"
					},
				],
				showDetail:false,
				content:'',
				titleDetail:''
			};
		},
		beforeCreated() {},
		beforeMounted() {},
		beforeUpdated() {},
		updated() {},
		beforeDestroyed() {},
		destroyed() {},
		created() {},
		mounted() {},
		onShow() {
			this.getLocalIP();
			// #ifdef MP-WEIXIN
			this.getNewLocal();
			// #endif
		},
		methods: {
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			getNewLocal() { //小程序
				// wx.openLocation
				let that = this
				wx.getLocation({
					type: 'gcj02',
					success(res) {
						// that.localInfo = res
						that.localInfo = {
							lat: res.latitude,
							lng: res.longitude
						}
						that.latitude = res.latitude
						that.longitude = res.longitude
						console.log(res);
						// that.getAddress(res.latitude,res.longitude)
					}
				})
			},
			getAddress(x, y) {
				let that = this;
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key: 'IK6BZ-NVTKQ-EKP56-BILKZ-CS4W2-PKB3H',
						location: x + ',' + y
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.addressInfo = res.data.result.address
						that.standard_address = res.data.result.formatted_addresses.standard_address
					},
					fail(err) {

						uni.hideLoading();
						uni.showToast({
							title: '获取地址失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {
						uni.hideLoading()
					},
				});
			},
			getLocalIP() { //ip定位
				let that = this
				uni.request({
					url: 'https://apis.map.qq.com/ws/location/v1/ip',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key: that.$TXMAPKEY,
						ip: ''
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
							let latlng = (Math.floor(100 * res.data.result.location.lng) / 100) + ',' + (Math
								.floor(100 * res.data.result.location.lat) / 100)
							that.getWeatherInfo(latlng);
							that.getWeatherIndex(latlng);
							that.getairQuality(latlng)
							that.gethourForecast(latlng)
						} else {
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
					complete() {},
				});
			},
			getWeatherInfo(location) {
				let that = this
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/now',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key: that.$HFWEATHERKEY,
						location: location
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
						} else {
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
							title: '获取天气失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {},
				});
			},
			getWeatherIndex(location){
				let that = this
				uni.request({
					url: 'https://devapi.qweather.com/v7/indices/1d',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key: that.$HFWEATHERKEY,
						location: location,
						type:0
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						if (res.data.code == 200) {
							// that.ipData = res.data.result
							that.weatherIndexList = res.data.daily
							// console.log(res.data);
						} else {
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
							title: '获取生活指数失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {},
				});
			},
			getairQuality(location){
				let that = this
				uni.request({
					url: 'https://devapi.qweather.com/v7/air/now',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key: that.$HFWEATHERKEY,
						location: location
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.airQualityInfo = res.data.now
						} else {
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
							title: '获取空气质量失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {},
				});
			},
			gethourForecast(location){
				let that = this
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/24h',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key: that.$HFWEATHERKEY,
						location: location
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						if (res.data.code == 200) {
							// that.ipData = res.data.result
							that.hourForecast = res.data.hourly
						} else {
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
							title: '获取小时天气预报失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {},
				});
			},
			toMore(){
				uni.navigateTo({
					url:'/pageB/moreWeather/moreWeather'
				})
			},
			openDetail(item){
				this.titleDetail = item.name;
				this.content = item.text
				this.showDetail = true;
			}
		}

	}
</script>

<style lang="scss" scoped>
	.w-a-sky-w {
		font-size: 80px;
		color: #fff;
	}

	.content {
		padding: 10px;
		box-sizing: border-box;
		background-color: rgb(60,91,119);
		color: #def;
	}

	.weather-box {
		// box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		// border-radius: 12px;
		padding: 20px 10px;
		box-sizing: border-box;
	}

	.menu-item {
		text-align: center;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		background-color: rgb(85,112,139);
	}

	.logo-icon {
		height: 100rpx;
		width: 100rpx;
	}
	.menu-title{
		font-size: $uni-font-size-base;
		margin-top: 10px;
	}
	.menu-value{
		font-weight: $uni-font-weight;
		font-size: $uni-font-size-lg;
		color: #fff;
	}
	.weather-index{
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		background-color: rgb(85,112,139);
		.title{
			padding: 10px;
			margin-top: 20px;
		}
	}
	.more{
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		background-color: rgb(85,112,139);
		padding: 10px;
		margin-top: 15px;
		text-align: center;
	}
	.scroll-view_H {
		margin-top: 15px;
		white-space: nowrap;
		width: 100%;
		padding: 15px 0;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 20%;
		text-align: center;
		font-size: 36rpx;
		.img-box{
			padding: 20rpx 0;
			width: 50rpx;
			height: 50rpx;
			color: #fff;
		}
	}
</style>