<template>
	<view>
		<u-notice-bar mode="horizontal" :list="list" type="primary"></u-notice-bar>
		<view class="grid__4k u-m-t-20">
			<view v-for="(item,index) in menuList" :key="index" class="u-p-20 menu-item" @click="toRouter(item.router)">
				<view class="">
					<u-icon :name="item.icon" color="#2979ff" size="65"></u-icon>
					<view class="">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:['我被生活磨光了棱角，简单的说就是，我被生活盘了。','我被生活磨光了棱角，简单的说就是，我被生活盘了。'],
				menuList: [{
						id: '7',
						name: '随机文案',
						icon: 'file-text',
						router: '/pageB/randomWord/randomWord'
					},
					{
						id: '9',
						name: '舔狗日记',
						icon: 'file-text',
						router: '/pageB/randomDOG/randomDOG'
					},
					{
						id: '10',
						name: '脑筋急转弯',
						icon: 'file-text',
						router: '/pageB/randomBrains/randomBrains'
					},
					{
						id: '11',
						name: '学习单词',
						icon: 'pushpin',
						router: '/pageB/vocabulary/vocabulary'
					},
					{
						id: '18',
						name: '歇后语',
						icon: 'file-text',
						router: '/pageB/proverb/proverb'
					},
					{
						id: '23',
						name: '成语学习',
						icon: 'file-text',
						router: '/pageB/phrase/phrase'
					},
					{
						id: '24',
						name: '聚合语录',
						icon: 'file-text',
						router: '/pageB/polymerizationWord/polymerizationWord'
					},
					{
						id: '24',
						name: '历史学习',
						icon: 'file-text',
						router: '/pageB/historyLearn/historyLearn'
					},
					{
						id: '25',
						name: '翻译',
						icon: 'file-text',
						router: '/pageB/translate/translate'
					},
					{
						id: '26',
						name: '运势占卜',
						icon: 'file-text',
						router: '/pageB/horoscope/horoscope'
					},
					{
						id: '27',
						name: '霸道总裁',
						icon: 'file-text',
						router: '/pageB/overlord/overlord'
					},
				]
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
			this.getApi()
		},
		methods: {
			toRouter(url) {
				uni.navigateTo({
					url: url
				});
			},
			getApi() {
				let that = this
				// uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/yiyan.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.list = []
						that.list.push(res.data)
						that.list.push(res.data)
						// uni.hideLoading();
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
	.menu-item {
		text-align: center;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 12px;
	}

	.logo-icon {
		height: 100rpx;
		width: 100rpx;
	}
</style>