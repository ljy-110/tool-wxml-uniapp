<template>
	<view click="u-p-20">
		<view class="u-p-t-20 center">
			<image :src="imageUrl" mode="" @click="openImg(imageUrl)"></image>
		</view>
		<view class="u-p-20 ">
			<u-button type="primary" @click="getImageUrl">换一张</u-button>
		</view>
		<view class="u-p-t-20 center">
			<image :src="imageUrl2" mode="" @click="openImg(imageUrl2)"></image>
		</view>
		<view class="u-p-20 ">
			<u-button type="primary" @click="getHEI">换一张</u-button>
		</view>
		<view class="u-p-t-20 center">
			<image :src="imageUrl3" mode="" @click="openImg(imageUrl3)"></image>
		</view>
		<view class="u-p-20 ">
			<u-button type="primary" @click="getHEI3">换一张</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl:'',
				imageUrl2:'',
				imageUrl3:''
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
			this.getHEI();
			this.getHEI3();
		},
		methods: {
			openImg(img){
				uni.previewImage({
					urls:[img]
				})
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
							// that.getHEI(res.data.url)
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
			getHEI(){
				let that = this;
				uni.request({
					url: 'https://api.yowap.com/randpic.php?return=json',
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.imageUrl2 = res.data.PicUrl
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
			getHEI3(){
				let that = this;
				uni.request({
					url: 'https://api.aixiaowai.cn/api/api.php?return=json',
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.imageUrl3 = res.data.imgurl
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
							title: '获取图片失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {
					},
				});
			}
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
