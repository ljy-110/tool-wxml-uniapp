<template>
	<view class="u-p-30">
		<view class="u-p-t-20 u-font-lg">
			歌名：{{info.song}}
		</view>
		<view class="u-p-t-20 u-font-lg">
			歌手：{{info.singer}}
		</view>
		<view class="u-p-t-20 center">
			<image :src="info.img" mode="" @click="openImg(info.imageUrl)"></image>
		</view>
		
		<view class="u-m-t-40" style="text-align: center;">
			<audio style="text-align: left" :src="info.url" :poster="info.img" :name="info.song" :author="info.singer" :action="{
				method: 'pause'
			}" controls></audio>
		</view>
		
		<u-button @click="getApi" type="primary" class="u-m-t-20">换一首</u-button>
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
			openImg(img){
				uni.previewImage({
					urls:[img]
				})
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/wangyi_hot_review.php',
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.info = res.data
							uni.hideLoading();
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
