<template>
	<view class="u-p-25">
		<view class="u-p-t-20">
			{{info.day}}
		</view>
		<view class="u-p-t-20">
			<view v-for="(item,index) in info.content" :key="index" class="u-m-t-10">
				{{index+1}} 、 {{item}}
			</view>
		</view>
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
		},
		onPullDownRefresh() {
			this.getApi();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(){
			this.getApi();
		},
		methods: {
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://zj.v.api.aa1.cn/api/bk/?num=20&type=json',
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
							that.info = res.data
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
