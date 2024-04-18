<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="文字" prop="msg">
				<u-input v-model="form.msg" />
			</u-form-item>
			<u-form-item label="人物声" prop="choose">
				<u-input v-model="form.chooseName" type="select" @click="show = true" />
				<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
			</u-form-item>
			<u-button @click="submit" type="primary">转换</u-button>
		</u-form>
		
		<view class="u-m-t-40" style="text-align: center;">
			<audio style="text-align: left" :src="info.download" :name="info.msg" :author="info.msg" :action="{
				method: 'pause'
			}" controls></audio>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					msg: '你好呀！',
					choose: '0',
					chooseName:'女生1',
					su: '100',
					yd: '5'
				},
				show: false,
				list: [{
						value: '0',
						label: '女生1'
					},
					{
						value: '5',
						label: '女生1'
					},
					{
						value: '1',
						label: '男生1'
					},
					{
						value: '2',
						label: '男生2'
					},
					{
						value: '3',
						label: '男生3'
					},
				],
				rules: {
					msg: [{
						required: true,
						message: '请输入文字',
						trigger: 'blur,change'
					}],
					choose: [{
						required: true,
						message: '请选择人物声',
						trigger: 'blur,change'
					}]
				},
				list:[],
				info:{}
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
		onShow() {},
		methods: {
			confirm(e) {
				this.form.choose = e[0].value
				this.form.chooseName = e[0].label
			},
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
					url: 'https://zj.v.api.aa1.cn/api/baidu-01/',
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
							that.info = res.data
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