<template>
	<view>
		<view class="u-p-t-20 center">
			<image style="width: 100%;" mode="widthFix" :src="imageUrl" @click="openImg(imageUrl)"></image>
		</view>
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
			this.getApi();
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
					url: 'https://api.vvhan.com/api/wallpaper/mobileGirl?type=json',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.success) {
							that.imageUrl = res.data.url
							uni.hideLoading();
						} else {
							uni.showToast({
								title: res.data.type,
								icon: 'error',
								mask: true,
								duration: 2000
							});
						}
					},
					fail(err) {
						uni.showToast({
							title: '获取失败！',
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

</style>
