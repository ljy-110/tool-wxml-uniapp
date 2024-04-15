<template>
	<view>
		<view class="u-p-15">
			<u-search placeholder="请输入" v-model="search" :show-action="true" :clearabled="true" 
			action-text="搜索" :animation="true" @custom="searchWord"></u-search>
		</view>
		<view class="u-p-15 grid__2k_none" style="gap:15px;">
			<view v-for="(item,index) in list" :key="index" class="item-box" @click="openImg(item.cover_url)">
				<image :src="item.cover_url" mode="aspectFit" class="item-img"></image>
				<view class="u-p-8">{{item.car_name}}</view>
				<view class="between u-p-8" style="color: red;">
					<text>{{item.price}}</text>
					<text>{{item.dealer_price}}</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'影豹',
				showWord:false,
				wordList:[],
				list:[
					{
					            "car_name": "270T DCT影豹J11版 - 影豹 - 广汽传祺",
					            "price": "10.80万",
					            "dealer_price": "9.60万",
					            "tags": [
					                "1.5T",
					                "前驱"
					            ],
					            "cover_url": "https://p3.dcarimg.com/img/motor-mis-img/69eecab527b8d571972e243629574619~1200x0.png"
					        },
					        {
					            "car_name": "270T DCT影豹J15版 - 影豹 - 广汽传祺",
					            "price": "11.80万",
					            "dealer_price": "10.60万",
					            "tags": [
					                "1.5T",
					                "前驱"
					            ],
					            "cover_url": "https://p3.dcarimg.com/img/motor-mis-img/69eecab527b8d571972e243629574619~1200x0.png"
					        },
					        {
					            "car_name": "270T DCT影豹J16版 - 影豹 - 广汽传祺",
					            "price": "12.80万",
					            "dealer_price": "11.60万",
					            "tags": [
					                "1.5T",
					                "前驱"
					            ],
					            "cover_url": "https://p3.dcarimg.com/img/motor-mis-img/69eecab527b8d571972e243629574619~1200x0.png"
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
			openImg(img){
				uni.previewImage({
					urls:[img]
				})
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.pearktrue.cn/api/car/',
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
	height: 180px;
}
</style>
