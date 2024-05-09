<template>
	<view class="">
		<view class="u-p-t-20 center" v-if="imageUrl">
			<image :src="imageUrl" mode="widthFix" @click="openImg(imageUrl)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl:'https://xialiu.cn/api/dan/'
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
		},
		onLoad(){
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
					url: 'https://dayu.qqsuu.cn/moyuribao/apis.php?type=json',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.imageUrl = res.data.data
							uni.hideLoading();
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
