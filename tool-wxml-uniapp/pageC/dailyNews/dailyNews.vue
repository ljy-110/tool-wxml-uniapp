<template>
	<view class="">
		<view class="u-p-t-20 center" v-if="imageUrl">
			<image :src="imageUrl" mode="widthFix" @click="openImg(imageUrl)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl:'https://zj.v.api.aa1.cn/api/60s-v2/?cc=tool'
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
				this.imageUrl = 'https://zj.v.api.aa1.cn/api/60s-v2/?cc=tool'
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
