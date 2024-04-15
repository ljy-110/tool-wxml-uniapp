<template>
	<view>
		<view class="u-p-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box">
				<view class="">
					答案：{{item.zh}}
				</view>
				<view class="">
					英文：{{item.en}}
				</view>
			</view>
			<view class="center" v-if="list.length == 0">
				<u-empty mode="data"></u-empty>
			</view>
		</view>
		
		<view class="u-p-t-20 center">
					<image :src="imageUrl" mode="" @click="openImg(imageUrl)"></image>
				</view>
		<!-- <view class="footer u-p-15">
			<u-button @click="getApi" type="primary">下一个</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				imageUrl:''
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
			this.getApi()
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
					url: 'https://jkyapi.top/API/xwdazs/api.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 1) {
							that.list.push(res.data.data);
							that.getApi2(res.data.data.zh)
							uni.hideLoading();
						} else {
							uni.showToast({
								title: res.data.msg || '获取失败',
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
			getApi2(data) {
				// uni.showLoading({title:'加载中...'})
				// let that = this
				// that.imageUrl = 'https://api.pearktrue.cn/api/signature/?size=60&fontcolor=&colors=&word=' +data + '&type=cjysq'
				// setTimeout(function () {
				// 	uni.hideLoading();
				// }, 2000);
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.pearktrue.cn/api/wordcloud/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						text:data
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.imageUrl = res.data.imgurl
							uni.hideLoading();
						} else {
							uni.showToast({
								title: res.data.message || '获取图片失败！',
								icon: 'error',
								mask: true,
								duration: 2000
							});
						}
					},
					fail(err) {
						uni.showToast({
							title: '获取图片失败！',
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
