<template>
	<view class="u-p-10">
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box flex" @click="toSeries(item.pics)">
				<view class="flex1">
					<image :src="item.scover" mode="aspectFit" style="width: 100%;height: 300rpx;"></image>
				</view>
				<view class="flex2 u-m-l-15">
					<view class="c-title">
						{{item.setname}}
					</view>
					<view class="u-m-t-15">
						{{item.createdate}}
					</view>
					<view class="u-m-t-15">
						{{item.desc}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					page:1
				},
				list:[]
			};
		},
		beforeCreated() {},
		beforeMounted() {},
		beforeUpdated() {},
		updated() {},
		beforeDestroyed() {},
		destroyed() {},
		created() {},
		mounted() {},
		onShow() {
			this.getApi();
		},
		methods: {
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://v.api.aa1.cn/api/api-tplist/go.php/api/picture/index',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 1) {
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
			toSeries(item){
				uni.previewImage({
					urls:item
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
.item-box{
	width: 100%;
	padding: 10px;
	margin-top: 15px;
	border: #ccc 1px solid;
	border-radius: 12px;
}
</style>