<template>
	<view>
		<view class="u-p-15">
			<u-search placeholder="请输入" v-model="search" :show-action="true" :clearabled="true" 
			action-text="搜索" :animation="true" @custom="searchWord" @clear="getApi"></u-search>
		</view>
		<view class="u-p-15 grid__2k_none">
			<view v-for="(item,index) in list" :key="index" class="item-box" @click="toFlow(item)">
				<image :src="item.image" mode="aspectFit" class="item-img"></image>
				<view class="u-p-8">{{item.name}}</view>
			</view>
		</view>
		
		<u-popup v-model="showWord" mode="bottom" border-radius="14" height="500px" closeable>
			<scroll-view scroll-y="true" style="height: 500px;">
				<view v-for="(item,index) in wordList" :key="index" class="u-p-15">
					<view class="">
						{{item}}
					</view>
				</view>
			</scroll-view>
			
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'梅菜扣肉',
				showWord:false,
				wordList:[],
				list:[
					{
					            "name": "梅菜扣肉（详细版）",
					            "image": "http://static.xinshipu.com/20100506/original/1273151036125.jpg",
					            "description": null,
					            "materials": [
					                ""
					            ],
					            "practice": [
					                "将五花肉切成正方块，梅菜干用温水泡10-15分钟。",
					                "大锅里沸水中放入五花肉、调料（1）氽烫一小会。",
					                "将五花肉捞出，然后在五花肉几面都均匀抹上生抽，使肉上色。",
					                "在电锅里倒入蔬菜油，五花肉放入锅中中高火小炸后，将五花肉取出稍放凉。",
					                "同时，另取一平底锅，倒入少许油，倒入泡过的梅菜干、调料（2）煸炒一会，取出装盘待用。",
					                "用厨房纸将五花肉去掉多余油，然后切薄片每片约长8厘米、宽4厘米、厚0.5厘米。",
					                "取一个圆碗，在圆碗上均匀涂上一层调料（3），以使铺上的肉块更上色。",
					                "在圆碗里，将1/3的梅干菜盛在碗中垫底，将切好的五花肉块整齐铺在梅干菜上形成风车形状，每铺一层肉块，就涂一层调料（3），一定要均匀涂上，这样蒸出来的肉才更有味道，以此类推，约铺上三层肉块。",
					                "最后再在碗周边再铺上一圈梅干菜，再将余下的调料（3）倒在最外层肉块和梅菜干上。",
					                "大锅里放水，将碗身1/3浸在水里，大火转中火，蒸50-60分钟，直至肉软烂又不烂，即可。或隔水蒸熟，时间要稍久一点。",
					                "蒸好然后取汁出来，直接往碗里再浇上，再取汁出来，这样做一次，更入味。",
					                "取汁后，将肉复扣在大盘子子中，将梅菜干在肉周围摆上一圈。",
					                "再将原汁直接浇在肉上，或倒到锅里再浇滚加点生粉水，勾芡淋在肉上。"
					            ]
					        },
					{
					            "name": "客家传统梅菜扣肉",
					            "image": "http://static.xinshipu.com/20150813/original/1439474425414.jpg",
					            "description": "",
					            "materials": [
					                ""
					            ],
					            "practice": [
					                "1．五花肉刮洗干净，用清水煮至仅熟，取出；",
					                "2．以老抽涂匀煮熟的肉皮；",
					                "3．辣椒炒香晾凉，浸入米酒中成川椒酒；",
					                "4．中火烧热炒锅，下油烧至微沸，将肉放入加盖炸至无声，捞出，沥油；",
					                "5．沥油晾凉的肉切成长形块状，每块约长8厘米、宽0.5厘米，排放在碗内，皮向下，成风车形；",
					                "6．将豆豉、蒜头、红腐乳压烂成茸，放入碗内，加姜片、精盐、老抽、川椒酒、白糖调成味汁；",
					                "7．将调好的味汁倒入肉内，然后整碗放入蒸笼先用旺火后用慢火蒸约40分钟取出；",
					                "8．梅菜洗净，切成每片长3厘米、宽1厘米；",
					                "9．切好的梅菜用白糖、油拌匀，放在肉上，续蒸5分钟取出，滗出原汁；",
					                "10．将肉复扣在碟中，将原汁烧沸，加湿淀粉调成稀芡淋上，便成！",
					                "（制作提示：因有过油炸制过程，需准备植物油1500克！）"
					            ]
					        },
				]
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
			searchWord(val){
				this.search = val;
				this.getApi();
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.pearktrue.cn/api/cookbook/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						search:that.search
					},
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
			toFlow(item){
				let that = this
				that.showWord = true
				that.wordList = item.practice
				uni.hideLoading();
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.item-box{
	width: 98%;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	border-radius: 12px;
}
.item-img{
	width: 100%;
}
</style>
