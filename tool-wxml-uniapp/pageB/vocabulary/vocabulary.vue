<template>
	<view class="u-p-30">
		<view class="u-p-t-20 u-font-lg">
			英文单词：{{info.word}}
		</view>
		<view class="u-p-t-20 u-font-lg">
			中文翻译：{{info.CN}}
		</view>
		<view class="u-m-t-40" style="text-align: center;">
			<audio style="text-align: left" :src="info.voice" :name="info.word" :author="info.CN" :action="{
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
				info:{}
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
					url: 'https://www.hhlqilongzhu.cn/api/yl_fuxidanci.php',
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.info = res.data
						} else{
							uni.showToast({
								title: '获取失败！',
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
