<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="域名" prop="url">
				<u-input v-model="form.url" placeholder="请输入域名" />
			</u-form-item>
			<u-button @click="submit" type="primary">查询</u-button>
		</u-form>
		<view class="u-p-t-30">
			
		</view>
		<u-cell-group>
			<u-cell-item title="域名" :value="info.url" :arrow="false"></u-cell-item>
			<u-cell-item title="所属企业" :value="info.unitName" :arrow="false"></u-cell-item>
			<u-cell-item title="icp编号" :value="info.icp" :arrow="false"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					url: 'qq.com'
				},
				info:{},
				rules: {
					url: [{
						required: true,
						message: '请输入域名',
						trigger: 'blur,change'
					}]
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.getApi();
					} else {
						console.log('验证失败');
					}
				});
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://v.api.aa1.cn/api/icp/index.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.info = res.data
						uni.hideLoading();
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