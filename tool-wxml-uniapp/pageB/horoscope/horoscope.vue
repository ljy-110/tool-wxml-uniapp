<template>
	<view click="u-p-20">
		<view class="u-p-t-20 center" v-if="imageUrl">
			<image :src="imageUrl" mode="aspectFit" @click="openImg(imageUrl)"></image>
		</view>
		<!-- <view class="u-p-20 ">
			<u-button type="primary" @click="refreshPage()">换一卦</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl:'https://www.hhlqilongzhu.cn/api/tu_yunshi.php'
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
		},
		onPullDownRefresh() {
			this.getImageUrl();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(){
			this.getImageUrl();
		},
		methods: {
			openImg(img){
				uni.previewImage({
					urls:[img]
				})
			},
			refreshPage() {
				// uni.navigateTo({
				// 	url:'/pageB/horoscope/horoscope'
				// });
			    this.getImageUrl();
			},
			getImageUrl(){
				this.imageUrl = ''
				this.imageUrl = 'https://www.hhlqilongzhu.cn/api/tu_yunshi.php'
				
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
