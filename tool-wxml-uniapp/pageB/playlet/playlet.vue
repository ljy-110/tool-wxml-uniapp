<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="短剧名称" prop="name">
				<u-input v-model="form.name" placeholder="请输入短剧名称" />
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>

		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box" @click="toRS(item)">
				<view class="">
					{{index + 1}}
				</view>
				<view class="item-box-name">
					<text>剧名：</text>
					<text>{{item.source.name}}</text>
				</view>
				<view class="item-box-name">
					<text>地址：</text>
					<text>{{item.source.url}}</text>
				</view>
			</view>

		</view>

		<u-modal v-model="showDetail" :title="titleDialog" :show-confirm-button="true" :show-cancel-button="true"
			cancel-text="关闭" confirm-text="复制" @confirm="copyTextToClipboard" :content="content"></u-modal>
	</view>
</template>

<script>
	import {
		log
	} from 'util';
	export default {
		data() {
			return {
				form: {
					name: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入短剧名称',
						trigger: 'blur,change'
					}]
				},
				list: [],
				titleDialog: '',
				content: '',
				showDetail: false
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
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: 'https://files.ptger.cn/api/files/vagueQuery',
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
			toRS(item) {
				this.titleDialog = item.source.name
				this.content = '地址：' + item.source.url + ''
				this.showDetail = true
			},
			copyTextToClipboard() {
				let that = this
				uni.setClipboardData({
					data: that.content,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 2000
						});
					},
					fail: (err) => {
						uni.showToast({
							title: '复制失败：' + err.errMsg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		},

	}
</script>

<style lang="scss" scoped>
	.item-box {
		width: 100%;
		padding: 10px;
		margin-top: 15px;
		border: #ccc 1px solid;
		border-radius: 12px;
	}
</style>