<template>
	<view>
		<view class="u-p-t-20 center">
			<image :src="imageUrl" style="width: 100%;" mode="widthFix" @click="openImg(imageUrl)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl:'https://apii.ctose.cn/api/cy/api/'
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
			// this.getApi();
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
					url: 'https://apii.ctose.cn/api/cy/api/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {tyep:'text'},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// let parts = res.data.split('\n');
						// that.list = parts
						console.log(res);
						that.imageUrl = res.data
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
					},
					complete() {},
				});
			},
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
