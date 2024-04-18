<template>
	<view class="u-p-15">
		<view class="">
			{{title}} -- {{nickName}}
		</view>
		<view v-for="(item,index) in list" :key="index">
			<view class="u-p-t-20 center">
				<image :src="item" mode="widthFix" @click="openImg(item)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				nickName:'',
				title:''
			};
		},
		beforeCreated () {},
		beforeMounted () {},
		beforeUpdated () {},
		updated () {},
		beforeDestroyed () {},
		destroyed () {},
		created () {},
		mounted () {},
		onShow(){
			this.getApi();
		},
		methods: {
			openImg(img){
				uni.previewImage({
					urls:[img]
				})
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.yujn.cn/api/wz_cos.php?type=json',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.title = res.data.title
						that.nickName = res.data.nickName
						that.list = res.data.img_list
						uni.hideLoading();
						// if (res.data.code == 200) {
						// 	let parts = res.data.split('\n');
						// 	that.info = res.data
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
