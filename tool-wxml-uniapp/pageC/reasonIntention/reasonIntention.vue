<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="句子意思" prop="mean">
				<u-input v-model="form.mean" />
			</u-form-item>
			<u-form-item label="文字类型" prop="type">
				<u-input v-model="form.type" type="select" @click="show = true" />
				<u-select v-model="show" :list="list2" @confirm="confirm"></u-select>
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<!-- <view class="u-p-t-20 center">
			<image :src="imageUrl" mode="" @click="openImg(imageUrl)"></image>
		</view> -->
		<view class="u-p-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box">
				<view class="">
					{{item.quote}}
				</view>
				<view class="">
					--{{item.source}}
				</view>
			</view>
			<view class="center" v-if="list.length == 0">
				<u-empty mode="data"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					mean: '爱你',
					type: '古诗文',
				},
				//https://www.hhlqilongzhu.cn/api/wzcx_zhanli.php?msg=阿轲&type=ios_qq&king=image&moban=1
				imageUrl:'',
				show: false,
				list2: [
					{
						value: '古诗文',
						label: '古诗文'
					},
					{
						value: '现代文',
						label: '现代文'
					}
				],
				rules: {
					mean: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur,change'
					}],
					type: [{
						required: true,
						message: '请选择',
						trigger: 'blur,change'
					}]
				},
				list:[]
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
					url: 'https://api.pearktrue.cn/api/meansearch/',
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
							that.list = res.data.data
							uni.hideLoading();
						} else {
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
	.item-box{
		width: 100%;
		padding: 10px;
		margin-top: 15px;
		border: #ccc 1px solid;
		border-radius: 12px;
	}
</style>