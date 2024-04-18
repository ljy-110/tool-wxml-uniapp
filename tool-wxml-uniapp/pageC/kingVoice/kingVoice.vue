<template>
	<view class="u-p-15">
		<view>
			<u-search placeholder="请输入英雄名称" v-model="form.msg" :show-action="true" :clearabled="true" action-text="搜索"
				:animation="true" @custom="submit"></u-search>
		</view>
		<view class="u-p-t-20 center">
			<image :src="list.img" mode=""></image>
		</view>
		<view v-for="(item,index) in list.data" :key="index">
			<view class="u-p-t-20 u-font-lg">
				{{item.lines}}
			</view>
			<view class="u-m-t-40" style="text-align: center;">
				<audio style="text-align: left" :src="item.voice" :action="{
					method: 'pause'
				}" controls></audio>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					msg: '孙悟空',
				},
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
			this.getApi()
		},
		methods: {
			submit(val) {
				this.form.msg = val;
				this.getApi();
			},
			getApi() {
				let that = this
				uni.request({
					url: 'https://shanhe.kim/api/youxi/wzyyb.php',
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 1) {
							that.list = res.data
						} else {
							uni.showToast({
								title: res.data.text,
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