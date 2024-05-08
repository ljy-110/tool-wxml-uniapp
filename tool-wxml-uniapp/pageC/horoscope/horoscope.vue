<template>
	<view class="u-p-10">
		<view class="u-p-15">
			<u-search placeholder="请输入" v-model="form.msg" :show-action="true" :clearabled="true" action-text="搜索"
				:animation="true" @custom="submit"></u-search>
		</view>
		<!-- <u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="星座" prop="msg">
				<u-input v-model="form.msg" placeholder="请输入星座" />
			</u-form-item>
			<u-button @click="submit" type="primary">查询</u-button>
		</u-form> -->
		<view class="u-p-t-30">
			
		</view>
		<u-cell-group>
			<u-cell-item title="星座" :value="info.xz" :arrow="false"></u-cell-item>
			<u-cell-item title="贵人方位" :value="info.grfw" :arrow="false"></u-cell-item>
			<u-cell-item title="贵人星座" :value="info.grxz" :arrow="false"></u-cell-item>
			<u-cell-item title="幸运数字" :value="info.xysz" :arrow="false"></u-cell-item>
			<u-cell-item title="幸运颜色" :value="info.xyys" :arrow="false"></u-cell-item>
			<u-cell-item title="爱情运势" :value="info.aqys" :arrow="false"></u-cell-item>
			<u-cell-item title="财富运势" :value="info.cfys" :arrow="false"></u-cell-item>
			<u-cell-item title="事业运势" :value="info.syys" :arrow="false"></u-cell-item>
			<u-cell-item title="整体运势" :value="info.ztys" :arrow="false"></u-cell-item>
			<u-cell-item title="提示" :value="info.ts" :arrow="false"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					msg: '摩羯'
				},
				info:{},
				// rules: {
				// 	msg: [{
				// 		required: true,
				// 		message: '请输入星座',
				// 		trigger: 'blur,change'
				// 	}]
				// }
			};
		},
		// onReady() {
		// 	this.$refs.uForm.setRules(this.rules);
		// },
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
			submit(val) {
				this.form.msg = val
				this.getApi();
				// this.$refs.uForm.validate(valid => {
				// 	if (valid) {
				// 		this.getApi();
				// 	} else {
				// 		console.log('验证失败');
				// 	}
				// });
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://v.api.aa1.cn/api/xingzuo/',
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
							that.info = res.data
							uni.hideLoading();
						} else{
							uni.showToast({
								title: res.data.msg,
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