<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="英雄名称" prop="msg">
				<u-input v-model="form.msg" />
			</u-form-item>
			<u-form-item label="游戏区" prop="type">
				<u-input v-model="form.type" type="select" @click="show = true" />
				<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<!-- <view class="u-p-t-20 center">
			<image :src="imageUrl" mode="" @click="openImg(imageUrl)"></image>
		</view> -->
		<view class="">
			<view v-for="(item,index) in list" :key="index">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
import { log } from 'util';
	export default {
		data() {
			return {
				form: {
					msg: '孙策',
					type: 'qq',
					kind: '',
					moban: ''
				},
				//https://www.hhlqilongzhu.cn/api/wzcx_zhanli.php?msg=阿轲&type=ios_qq&king=image&moban=1
				imageUrl:'',
				show: false,
				list: [{
						value: 'qq',
						label: '安卓QQ'
					},
					{
						value: 'ios_qq',
						label: '苹果QQ'
					},
					{
						value: 'wx',
						label: '安卓微信'
					},
					{
						value: 'ios_wx',
						label: '苹果微信'
					},
				],
				rules: {
					msg: [{
						required: true,
						message: '请输入英雄名',
						trigger: 'blur,change'
					}],
					type: [{
						required: true,
						message: '请选择游戏区',
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
						let parts = res.data.split('\n');
						that.list = parts
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
		},

	}
</script>

<style lang="scss" scoped>

</style>