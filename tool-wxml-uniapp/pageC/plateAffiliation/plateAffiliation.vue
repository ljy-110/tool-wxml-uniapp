<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="车牌号码" prop="num">
				<u-input v-model="form.num" placeholder="请输入车牌号码" />
			</u-form-item>
			<u-button @click="submit" type="primary">查询</u-button>
		</u-form>
		<view class="u-p-t-30">
			
		</view>
		<u-cell-group>
			<u-cell-item title="车牌号码" :value="form.num" :arrow="false"></u-cell-item>
			<u-cell-item title="组织单位" :value="info.organization" :arrow="false"></u-cell-item>
			<u-cell-item title="地址" :arrow="false">
				<view class="" slot="right-icon">
					{{info.province_name}}{{info.city}}
				</view>
			</u-cell-item>
			<u-cell-item title="使用属性" :arrow="false">
				<view class="" slot="right-icon">
					{{typeList[info.type]}}
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
					num: '京A12345'
				},
				info:{},
				rules: {
					num: [{
						required: true,
						message: '请输入车牌号码',
						trigger: 'blur,change'
					}]
				},
				typeList:{
					'10':'民用',
					'20':'军用',
					'30':'使馆',
					'40':'民航',
					'50':'武警',
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
			getCarType(){},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://v.api.aa1.cn/api/car-number-fl/index.php',
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
							that.info = res.data;
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