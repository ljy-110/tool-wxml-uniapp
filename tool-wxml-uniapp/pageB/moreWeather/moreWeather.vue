<template>
	<view class="u-p-10">
		<view class="u-p-t-50">
			
		</view>
		<view v-for="(item,index) in list" :key="index" class="item-box">
			<u-row gutter="16">
				<u-col span="4">
					<view class="demo-layout bg-purple">
						{{item.fxDate}}
					</view>
				</u-col>
				<u-col span="4">
					<view class="demo-layout bg-purple-light h-center u-text-center">
						<image :src="'/static/image/icons/'+item.iconDay + '.svg'" class="img-box"></image>
						<text class="temp u-m-l-20">{{item.textDay}}</text>
					</view>
				</u-col>
				<u-col span="4">
					<view class="demo-layout bg-purple-dark u-text-center">
						<text>{{item.tempMax}}</text>&nbsp;/ &nbsp;
						<text>{{item.tempMin}}</text>&nbsp;℃
					</view>
				</u-col>
			</u-row>
		</view>
		<!-- {{$u.timeFormat(timestamp, 'yyyy年mm月dd日')}} -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
					      "fxDate": "2021-11-15",
					      "sunrise": "06:58",
					      "sunset": "16:59",
					      "moonrise": "15:16",
					      "moonset": "03:40",
					      "moonPhase": "盈凸月",
					      "moonPhaseIcon": "803",
					      "tempMax": "12",
					      "tempMin": "-1",
					      "iconDay": "101",
					      "textDay": "多云",
					      "iconNight": "150",
					      "textNight": "晴",
					      "wind360Day": "45",
					      "windDirDay": "东北风",
					      "windScaleDay": "1-2",
					      "windSpeedDay": "3",
					      "wind360Night": "0",
					      "windDirNight": "北风",
					      "windScaleNight": "1-2",
					      "windSpeedNight": "3",
					      "humidity": "65",
					      "precip": "0.0",
					      "pressure": "1020",
					      "vis": "25",
					      "cloud": "4",
					      "uvIndex": "3"
					    },
					    {
					      "fxDate": "2021-11-16",
					      "sunrise": "07:00",
					      "sunset": "16:58",
					      "moonrise": "15:38",
					      "moonset": "04:40",
					      "moonPhase": "盈凸月",
					      "moonPhaseIcon": "803",
					      "tempMax": "13",
					      "tempMin": "0",
					      "iconDay": "100",
					      "textDay": "晴",
					      "iconNight": "101",
					      "textNight": "多云",
					      "wind360Day": "225",
					      "windDirDay": "西南风",
					      "windScaleDay": "1-2",
					      "windSpeedDay": "3",
					      "wind360Night": "225",
					      "windDirNight": "西南风",
					      "windScaleNight": "1-2",
					      "windSpeedNight": "3",
					      "humidity": "74",
					      "precip": "0.0",
					      "pressure": "1016",
					      "vis": "25",
					      "cloud": "1",
					      "uvIndex": "3"
					    },
					    {
					      "fxDate": "2021-11-17",
					      "sunrise": "07:01",
					      "sunset": "16:57",
					      "moonrise": "16:01",
					      "moonset": "05:41",
					      "moonPhase": "盈凸月",
					      "moonPhaseIcon": "803",
					      "tempMax": "13",
					      "tempMin": "0",
					      "iconDay": "100",
					      "textDay": "晴",
					      "iconNight": "150",
					      "textNight": "晴",
					      "wind360Day": "225",
					      "windDirDay": "西南风",
					      "windScaleDay": "1-2",
					      "windSpeedDay": "3",
					      "wind360Night": "225",
					      "windDirNight": "西南风",
					      "windScaleNight": "1-2",
					      "windSpeedNight": "3",
					      "humidity": "56",
					      "precip": "0.0",
					      "pressure": "1009",
					      "vis": "25",
					      "cloud": "0",
					      "uvIndex": "3"
					    }
				],
				latlng:''
			};
		},
		beforeCreated () {},
		beforeMounted () {},
		beforeUpdated () {},
		updated () {},
		beforeDestroyed () {},
		destroyed () {},
		created () {},
		mounted () {},
		onShow(){
			const value = uni.getStorageSync('latlng');
			if (value) {
				this.latlng = value
				this.getWeatherInfo(value)
			}
		},
		methods: {
			getWeatherInfo(location) {
				let that = this
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/15d',
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
							that.list = res.data.daily
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
							title: '获取15天气预报失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {},
				});
			},
		},
		
	}
</script>

<style lang="scss" scoped>
.img-box{
	height: 40rpx;
	width: 40rpx;
}
.item-box{
	margin-bottom: 15px;
}
</style>
