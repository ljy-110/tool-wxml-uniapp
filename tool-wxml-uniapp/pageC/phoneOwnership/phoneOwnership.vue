<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="手机号码" prop="phone">
				<u-input v-model="form.phone" placeholder="请输入手机号码" />
			</u-form-item>
			<u-button @click="submit" type="primary">查询</u-button>
		</u-form>
		<view class="u-p-t-30">
			
		</view>
		<u-cell-group>
			<u-cell-item title="手机号码" :value="form.phone" :arrow="false"></u-cell-item>
			<u-cell-item title="运营商" :value="info.sp" :arrow="false"></u-cell-item>
			<u-cell-item title="地址" :arrow="false">
				<view class="" slot="right-icon">
					{{info.province}}{{info.city}}
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: '18625088261'
				},
				info:{},
				rules: {
					phone: [{
						required: true,
						message: '请输入手机号码',
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
					url: 'https://v.api.aa1.cn/api/phone/guishu-api.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 0) {
							that.info = res.data.data;
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