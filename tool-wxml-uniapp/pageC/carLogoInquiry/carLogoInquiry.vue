<template>
	<view>
		<view class="u-p-15">
			<u-search placeholder="请输入" v-model="search" :show-action="true" :clearabled="true" action-text="搜索"
				:animation="true" @custom="searchWord"></u-search>
		</view>
		<view class="u-p-t-20 center">
			<image :src="list.chebiao" style="width: 100%;" mode="widthFix" @click="openImg(list.chebiao)"></image>
		</view>
		<view class="">
			<u-cell-group>
				<u-cell-item title="品牌" :value="list.msg" :arrow="false"></u-cell-item>
				<u-cell-item title="英文标识" :value="list.name" :arrow="false"></u-cell-item>
				<u-cell-item title="所属国家" :value="list.state" :arrow="false"></u-cell-item>
				<u-cell-item title="所属企业" :value="list.company" :arrow="false"></u-cell-item>
				<u-cell-item title="创立年份" :value="list.year" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-p-15">
			{{list.origin}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search: '法拉利',
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
					url: 'https://api.yujn.cn/api/chebiao.php',
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