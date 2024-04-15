<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="英雄名称" prop="word">
				<u-input v-model="form.word" />
			</u-form-item>
			<u-form-item label="游戏区" prop="type">
				<u-input v-model="form.typeName" type="select" @click="show = true" />
				<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
					<image :src="imageUrl" mode="aspectFit" @click="openImg(imageUrl)"></image>
				</view>
		<!-- <view class="">
			<view v-for="(item,index) in list" :key="index">
				{{item}}
			</view>
		</view> -->
	</view>
</template>

<script>
import { log } from 'util';
	export default {
		data() {
			return {
				form: {
					word: '孙策',
					type: 'hsq',
					typeName:'花式签',
					size: '60',
					fontcolor: '#ffffff',
					colors:'#FD5668'
				},
				//https://www.hhlqilongzhu.cn/api/wzcx_zhanli.php?msg=阿轲&type=ios_qq&king=image&moban=1
				imageUrl:'',
				show: false,
				list: [
					{value: 'hsq',label: '花式签'},
					{value: 'swq',label: '商务签'},
					{value: 'gxq',label: '个性签'},
					{value: 'sxlbz',label: '手写连笔字'},
					{value: 'zkt',label: '正楷体'},
					{value: 'wrns',label: '温柔女生'},
					{value: 'xsq',label: '潇洒签'},
					{value: 'cjysq',label: '超级艺术签'},
					{value: 'xsq',label: '行书签'},
					{value: 'ksq',label: '楷书签'},
					{value: 'qsq',label: '情书签'},
					{value: 'xcq',label: '行草签'},
					{value: 'ktkaq',label: '卡通可爱签'}
				],
				rules: {
					word: [{
						required: true,
						message: '请输入文字',
						trigger: 'blur,change'
					}],
					type: [{
						required: true,
						message: '请选择签名类型',
						trigger: 'blur,change'
					}]
				},
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
			confirm(e) {
				this.form.type = e[0].value
				this.form.typeName = e[0].label
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
				uni.showLoading({title:'加载中...'})
				let that = this
				that.imageUrl = 'https://api.pearktrue.cn/api/signature/?size=60&fontcolor=&colors=&word=' +this.form.word + '&type=' + this.form.type
				setTimeout(function () {
					uni.hideLoading();
				}, 2000);
				// uni.showLoading({title:'加载中...'})
				// uni.request({
				// 	url: 'https://api.pearktrue.cn/api/signature/',
				// 	// dataType: "json",
				// 	// responseType: "json",
				// 	method: 'GET',
				// 	data: that.form,
				// 	timeout: 6000,
				// 	sslVerify: false,
				// 	withCredentials: false,
				// 	firstIpv4: false,
				// 	success(res) {
				// 		that.imageUrl = res.data
				// 		uni.hideLoading();
				// 		// if (res.data.status == 0) {

				// 		// } else {
				// 		// 	uni.showToast({
				// 		// 		title: res.data.message,
				// 		// 		icon: 'error',
				// 		// 		mask: true,
				// 		// 		duration: 2000
				// 		// 	});
				// 		// }
				// 	},
				// 	fail(err) {
				// 		uni.showToast({
				// 			title: '获取失败！',
				// 			icon: 'error',
				// 			mask: true,
				// 			duration: 2000
				// 		});
				// 	},
				// 	complete() {},
				// });
			},
		},

	}
</script>

<style lang="scss" scoped>

</style>