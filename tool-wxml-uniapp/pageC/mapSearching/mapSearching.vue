<template>
	<view>
		<view class="u-p-15">
			<u-search placeholder="请输入" v-model="search" :show-action="true" :clearabled="true" action-text="搜索"
				:animation="true" @custom="searchWord"></u-search>
		</view>
		<view class="u-p-t-20 center">
			<image :src="list.url" style="width: 100%;" mode="widthFix" @click="openImg(list.url)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search: '刘亦菲',
				list: {}
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
			openImg(img) {
				uni.previewImage({
					urls: [img]
				})
			},
			searchWord(val) {
				this.search = val;
				this.getApi();
			},
			getApi() {
				let that = this
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: 'https://api.52vmy.cn/api/img/baidu',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						msg: that.search
					},
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

</style>