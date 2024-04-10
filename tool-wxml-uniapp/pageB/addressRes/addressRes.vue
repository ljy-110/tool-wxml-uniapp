<template>
	<view>
		<view class="u-p-20">
			<u-search placeholder="请输入地址(省市区)" v-model="address" :clearabled="true" :animation="true" @custom="getAddress"></u-search>
		</view>
		<view class="page-section page-section-gap" id="container">
			<map style="width: 100%; height: 500px;" class="map" :latitude="localInfo.lat" :longitude="localInfo.lng" 
			:markers="covers" :theme="'satellite'" :scale="scale" :show-location="true">
			</map>
		</view>
		<view class="u-p-20" v-show="showGPS">
			<text>坐标：</text>
			<text>{{localInfo.lng}},{{localInfo.lat}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				localInfo:{
					lat:'39.9125',lng:'116.415192'
				},
				covers:[],
				scale:5,
				address:'',
				showGPS:false
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
		onShow(){},
		methods: {
			getAddress(){
				let that = this
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key: that.$TXMAPKEY,
						address: that.address
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						if (res.data.status == 0) {
							// that.ipData = res.data.result
							that.localInfo = res.data.result.location
							that.scale = 18;
							that.showGPS = true
							that.covers = [
								{
									latitude: res.data.result.location.lat,
									longitude: res.data.result.location.lng,
									// theme:'normal',
									iconPath: require('../static/image/person-local.png'),
									width:40,
									height:40
									
								}
							]
							// let latlng = (Math.floor(100 * res.data.result.location.lng) / 100) + ',' + (Math
							// 	.floor(100 * res.data.result.location.lat) / 100)
							// that.getWeatherInfo(latlng);
							// that.getWeatherIndex(latlng);
							// that.getairQuality(latlng)
							// that.gethourForecast(latlng)
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
			}
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
