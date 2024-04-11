<template>
	<view click="u-p-20">
		<view class="u-p-t-20 center">
			<image :src="imageUrl" mode="aspectFit" @click="openImg(imageUrl)"></image>
		</view>
		<view class="u-p-t-20 center">
			<image :src="imageUrl2" mode="aspectFit" @click="openImg(imageUrl2)"></image>
		</view>
		<view class="u-p-t-20 center">
			<image :src="imageUrl3" mode="aspectFit" @click="openImg(imageUrl3)"></image>
		</view>
		<view class="u-p-20 ">
			<u-button type="primary" @click="getImageUrl">换一张</u-button>
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
					url: 'https://www.hhlqilongzhu.cn/api/tu_qingtou.php',
					method: 'GET',
					data: {
						type:'json'
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.imageUrl = res.data.image_1
							that.imageUrl2 = res.data.image_2
							that.imageUrl3 = res.data.result
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
			
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
