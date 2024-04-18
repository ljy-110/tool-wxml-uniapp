<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="qq号" prop="msg">
				<u-input v-model="form.msg" placeholder="请输入QQ号" />
			</u-form-item>
			<u-button @click="submit" type="primary">生成</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
			<!-- {{imageUrl}} -->
			<image :src="imageUrl" mode="aspectFit" @click="openImg(imageUrl)"></image>
		</view>
		<view class="u-p-t-20 center">
			<!-- {{imageUrl}} -->
			<image :src="imageUrl2" mode="aspectFit" @click="openImg(imageUrl2)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					msg: '315395094'
				},
				//https://www.hhlqilongzhu.cn/api/wzcx_zhanli.php?msg=阿轲&type=ios_qq&king=image&moban=1
				imageUrl:'',
				imageUrl2:'',
				rules: {
					msg: [{
						required: true,
						message: '请输入qq号',
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
		onShow() {},
		methods: {
			confirm(e) {
				this.form.type = e[0].value
			},
			openImg(img){
				uni.previewImage({
					urls:[img]
				})
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// this.getApi();
						this.imageUrl = 'https://www.hhlqilongzhu.cn/api/wsmx.php?qq=' + this.form.msg
						this.imageUrl2 = 'https://www.hhlqilongzhu.cn/api/tu_erweima.php?qq=' + this.form.msg
					} else {
						console.log('验证失败');
					}
				});
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/wzcx_zhanli.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						that.imageUrl = res.data
						uni.hideLoading();
						// if (res.data.status == 0) {

						// } else {
						// 	uni.showToast({
						// 		title: res.data.message,
						// 		icon: 'error',
						// 		mask: true,
						// 		duration: 2000
						// 	});
						// }
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
			getApi2() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/tu_erweima.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						that.imageUrl2 = res.data
						uni.hideLoading();
						// if (res.data.status == 0) {
			
						// } else {
						// 	uni.showToast({
						// 		title: res.data.message,
						// 		icon: 'error',
						// 		mask: true,
						// 		duration: 2000
						// 	});
						// }
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