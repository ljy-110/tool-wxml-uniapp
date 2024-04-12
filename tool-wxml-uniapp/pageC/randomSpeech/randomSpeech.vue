<template>
	<view class="u-p-30">
		<view class="u-p-t-20 u-font-lg">
			怼人语音
		</view>
		<view class="u-m-t-40" style="text-align: center;">
			<audio style="text-align: left" :src="info.voice" :action="{
				method: 'pause'
			}" controls></audio>
		</view>
		<view class="u-p-t-20 u-font-lg">
			怼人语音
		</view>
		<view class="u-m-t-40" style="text-align: center;">
			<audio style="text-align: left" :src="info" :action="{
				method: 'pause'
			}" controls></audio>
		</view>
		
		<u-button @click="getApi" type="primary" class="u-m-t-20">下一个</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:'',
				audio:'https://api.pearktrue.cn/api/yujie/'
				
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
			this.getApi()
		},
		methods: {
			getApi() {
				let that = this
				uni.request({
					url: 'https://api.pearktrue.cn/api/yujie/voice/6c0aa6f5b80fb55d55bbc9631e8e2d14.mp3',
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						that.info = res.data
						// if (res.data.code == 200) {
						// 	that.info = res.data
						// } else{
						// 	uni.showToast({
						// 		title: '获取失败！',
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
