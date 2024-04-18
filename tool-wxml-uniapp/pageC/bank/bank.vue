<template>
	<view class="u-p-15">
		<view v-for="(item,index) in list" :key="index">
			<view class="flex item-box h-center">
				<!-- <image :src="imgUrl + item.bank_code" class="image-box" mode="aspectFit"></image> -->
				<u-image height="100rpx" class="flex1" :src="imgUrl + item.bank_code"></u-image>
				<text class="flex1">{{item.bank_name}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				imgUrl:'https://tools.mgtv100.com/external/v1/generate_bank_image?bankCode='
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
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://tools.mgtv100.com/external/v1/bank_names',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.list = res.data.data
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
.image-box /deep/ .u-image{
	height: 60px;
}
.item-box{
	border: 1px #ccc solid;
	border-radius: 8px;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
	margin-bottom: 8px;
}
</style>
