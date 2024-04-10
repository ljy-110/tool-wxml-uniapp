<template>
	<view>
		<view class="u-p-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box">
				<view class="">
					成语：{{item['答案']}}
				</view>
				<view class="">
					拼音：{{item['拼音']}}
				</view>
				<view class="">
					意思：{{item['意思']}}
				</view>
			</view>
			<view class="center" v-if="list.length == 0">
				<u-empty mode="data"></u-empty>
			</view>
		</view>
		
		<view class="footer u-p-15">
			<u-button @click="getApi" type="primary">下一个</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
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
		onShow(){},
		methods: {
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/guess_idiom.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.list.push(res.data);
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
.footer{
	position: fixed;
	bottom: 15px;
	width: 100%;
}
</style>
