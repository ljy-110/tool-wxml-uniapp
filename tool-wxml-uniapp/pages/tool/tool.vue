<template>
	<view click="u-p-20">
		<view class="u-text-center">
			随机萌图
		</view>
		<view class="u-p-t-20 center">
			<image :src="imageUrl" mode="" @click="openImg(imageUrl)"></image>
		</view>
		<view class="u-p-20 ">
			<u-button type="primary">换一张</u-button>
		</view>
		
		<!-- <u-popup v-model="showWord" mode="bottom" border-radius="14" height="500px" closeable>
			<scroll-view scroll-y="true" style="height: 500px;">
				<view v-for="(item,index) in wordList" :key="index" class="u-p-15" @click="toMusic(item,index+1)">
					<view class="">
						{{item}}
					</view>
				</view>
			</scroll-view>
			
		</u-popup> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl:''
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
			this.getImageUrl();
		},
		methods: {
			openImg(img){
				uni.previewImage({
					urls:[img]
				})
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/dg_bdmusic.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						let parts = res.data.split('\n');
						that.list = parts
						uni.hideLoading();
						// if (res.data.code == 200) {
						// 	let parts = res.data.split('\n');
						// 	that.info = res.data
						// } else {
						// 	uni.showToast({
						// 		title: res.data.message,
						// 		icon: 'error',
						// 		mask: true,
						// 		duration: 2000
						// 	});
						// }
					},
					fail(err) {
						uni.showToast({
							title: '获取失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
						uni.hideLoading();
					},
					complete() {},
				});
			},
			getImageUrl(){
				let that = this;
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.miaomc.cn/image/get?type=json',
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.imageUrl = res.data.url
							uni.hideLoading();
						} else{
							uni.showToast({
								title: res.data.message,
								icon: 'error',
								mask: true,
								duration: 2000
							});
							uni.hideLoading();
						}
					},
					fail(err) {
						uni.showToast({
							title: '获取图片失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {
					},
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
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
