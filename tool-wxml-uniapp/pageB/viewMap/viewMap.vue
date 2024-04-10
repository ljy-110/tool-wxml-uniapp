<template>
	<view>
		<view class="page-section page-section-gap" id="container">
			<map style="width: 100%; height:100vh;" class="map" :latitude="localInfo.lat" :longitude="localInfo.lng" 
			:markers="covers" :theme="'satellite'" :scale="scaleMap" :show-location="true">
			</map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				covers: [],
				circles:null,
				scaleMap:14,
				localInfo:{
					lng:'',lat:''
				},
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
			this.getLocalIP();
		},
		methods: {
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
						console.log(res);
						if (res.data.status == 0) {
							that.localInfo = {
								lat:res.data.result.location.lat,
								lng:res.data.result.location.lng
							}
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
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
