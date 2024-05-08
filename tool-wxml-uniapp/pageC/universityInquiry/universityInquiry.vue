<template>
	<view>
		<view class="u-p-15">
			<u-search placeholder="请输入" v-model="search" :show-action="true" :clearabled="true" action-text="搜索"
				:animation="true" @custom="searchWord"></u-search>
		</view>
		<!-- <view class="u-p-t-20 center">
			<image :src="list.chebiao" style="width: 100%;" mode="widthFix" @click="openImg(list.chebiao)"></image>
		</view> -->
		<view class="">
			<u-cell-group>
				<u-cell-item title="创办时间" :value="list.founding" :arrow="false"></u-cell-item>
				<u-cell-item title="主管部门" :value="list.affiliate" :arrow="false"></u-cell-item>
				<u-cell-item title="占地面积" :value="list.area" :arrow="false"></u-cell-item>
				<u-cell-item title="学校地址" :value="list.address" :arrow="false"></u-cell-item>
				<u-cell-item title="院校代码" :value="list.encode" :arrow="false"></u-cell-item>
				
				<u-cell-item title="重点学科" :value="list.discipline" :arrow="false"></u-cell-item>
				<u-cell-item title="博士学科" :value="list.doctor" :arrow="false"></u-cell-item>
				<u-cell-item title="硕士专业学科" :value="list.master" :arrow="false"></u-cell-item>
				<u-cell-item title="重点实验室" :value="list.laboratory" :arrow="false"></u-cell-item>
				<u-cell-item title="简介" :value="list.intro" :arrow="false"></u-cell-item>
				
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
				search: '清华大学',
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
			// openImg(img) {
			// 	uni.previewImage({
			// 		urls: [img]
			// 	})
			// },
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
					url: 'https://api.52vmy.cn/api/query/daxue',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						daxue: that.search
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