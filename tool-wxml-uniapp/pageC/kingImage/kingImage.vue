<template>
	<view class="u-p-10">
		<view>
			<u-search placeholder="请输入英雄名称" v-model="form.hero" :show-action="true" :clearabled="true" 
			action-text="搜索" :animation="true" @custom="submit"></u-search>
		</view>
		<view class="">
			<view v-for="(item,index) in list" :key="index">
				<view class="u-p-t-20 center">
					<image :src="item.img" mode="" @click="openImg(item.img)"></image>
				</view>
				<view class="u-text-center">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					hero: '孙悟空',
				},
				list:[]
			};
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
			// confirm(e) {
			// 	this.form.type = e[0].value
			// 	this.form.typeName = e[0].label
			// },
			openImg(img){
				uni.previewImage({
					urls:[img]
				})
			},
			submit(val) {
				this.form.hero = val;
				this.getApi();
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://free.wqwlkj.cn/wqwlapi/wzherotj.php',
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
						uni.hideLoading();
					},
					complete() {},
				});
			},
		},

	}
</script>

<style lang="scss" scoped>

</style>