<template>
	<view click="u-p-20">
		<view class="u-p-t-20 center" v-if="imageUrl">
			<image :src="imageUrl" mode="widthFix" @click="openImg(imageUrl)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl:'https://www.hhlqilongzhu.cn/api/tu_tlp.php'
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
			      this.getImageUrl();
			    },
			getImageUrl(){
				this.imageUrl = ''
				this.imageUrl = 'https://www.hhlqilongzhu.cn/api/tu_tlp.php'
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
