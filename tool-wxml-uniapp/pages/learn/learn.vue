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
				menuList2: [{
						id: '7',
						name: '随机文案',
						icon: 'file-text',
						router: '/pageB/randomWord/randomWord'
					},
					{
						id: '9',
						name: '舔狗日记',
						icon: 'cut',
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
						icon: 'volume-up',
						router: '/pageB/vocabulary/vocabulary'
					},
					{
						id: '18',
						name: '歇后语',
						icon: 'order',
						router: '/pageB/proverb/proverb'
					},
					{
						id:'60',name:'大学查询',icon:'heart-fill',
						router:'/pageC/universityInquiry/universityInquiry'
					},
					{
						id: '23',
						name: '成语学习',
						icon: 'order',
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
						icon: 'pushpin',
						router: '/pageB/translate/translate'
					},
					{
						id: '26',
						name: '运势占卜',
						icon: 'question-circle',
						router: '/pageB/horoscope/horoscope'
					},
					{
						id: '27',
						name: '霸道总裁',
						icon: 'file-text',
						router: '/pageB/overlord/overlord'
					},
					{
						id: '500',
						name: '60秒读世界',
						icon: 'thumb-up',
						router: '/pageB/readingParty/readingParty'
					},
					{
						id: '35',
						name: '人物设定',
						icon: 'account',
						router: '/pageB/characterDesign/characterDesign'
					},
					{
						id: '40',
						name: '网易云热评',
						icon: 'file-text',
						router: '/pageB/neteaseComment/neteaseComment'
					},
					{
						id: '46',
						name: '名人名言',
						icon: 'file-text',
						router: '/pageC/famousPeople/famousPeople'
					},
					{
						id: '48',
						name: '文字转语音',
						icon: 'chat',
						router: '/pageC/languageConverter/languageConverter'
					},
					{
						id: '49',
						name: '历史的今天',
						icon: 'file-text',
						router: '/pageC/historyToday/historyToday'
					},
					{
						id: '51',
						name: '摸鱼日报',
						icon: 'file-text',
						router: '/pageC/slackDaily/slackDaily'
					},
					{
						id:'49',name:'星座运势',icon:'star',
						router:'/pageC/horoscope/horoscope'
					},
					{
						id:'500',name:'随机语音',icon:'volume-up',
						router:'/pageC/randomSpeech/randomSpeech'
					},
					{
						id:'500',name:'签名设计',icon:'photo',
						router:'/pageC/signSeal/signSeal'
					},
					{
						id:'50',name:'答案之书',icon:'question',
						router:'/pageC/bookAnswers/bookAnswers'
					},
					{
						id:'50',name:'菜谱大全',icon:'hourglass',
						router:'/pageC/cookbook/cookbook'
					},
					{
						id:'60',name:'开心一刻',icon:'file-text',
						router:'/pageC/funnyCrossTalk/funnyCrossTalk'
					},
					{
						id:'60',name:'据意查句',icon:'file-text',
						router:'/pageC/reasonIntention/reasonIntention'
					},
					{
						id:'60',name:'历史人物',icon:'clock',
						router:'/pageC/historicalFigures/historicalFigures'
					},
					{
						id:'60',name:'随机古诗词',icon:'file-text',
						router:'/pageC/ancientPoetry/ancientPoetry'
					},
					{
						id:'60',name:'每日英语',icon:'file-text',
						router:'/pageC/dailyEnglish/dailyEnglish'
					},
					
				],
				menuList:[]
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
			this.menuList = []
			this.wx_shenhe = uni.getStorageSync('wx_shenhe');
			if (this.wx_shenhe == '0') {
				this.menuList = this.menuList2
			}else{
				this.menuList = this.menuList2.filter(item => item.id != '500')
			}
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
					url: 'https://v.api.aa1.cn/api/api-wenan-wangyiyunreping/index.php?aa1=json',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data[0].wangyiyunreping) {
							that.list = []
							that.list.push(res.data[0].wangyiyunreping)
							that.list.push(res.data[0].wangyiyunreping)
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