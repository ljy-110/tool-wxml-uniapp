<template>
	<view class="u-p-30">
		<!-- <view class="">{{name}}</view> -->
		<video id="myVideo" :src="videoUrl" @error="videoErrorCallback" 
		 enable-danmu danmu-btn controls></video>
		 
		 <view class="u-p-t-20">
		 	动漫视频
		 </view>
		 <video id="myVideo" :src="videoUrl2" @error="videoErrorCallback"
		  enable-danmu danmu-btn controls></video>
		<!-- <view class="u-m-t-40">
			播放地址：
			<u-input type="textarea" v-model="videoUrl" :border="true" :height="400"/>
		</view> -->
		
		<view class="u-p-t-20">
			沸羊羊翻唱视频
		</view>
		<video id="myVideo" :src="videoUrl3" @error="videoErrorCallback"
		 enable-danmu danmu-btn controls></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl:'',
				videoUrl2:'',
				videoUrl3:'',
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
			this.getApi2();
			this.getApi3();
		},
		methods: {
			videoErrorCallback(e) {
				// uni.showModal({
				// 	content: e.target.errMsg,
				// 	showCancel: false
				// })
			},
			getApi() {
				let that = this
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/MP4_xiaoxin.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						type:'text'
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.videoUrl = res.data
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
			getApi2() {
				let that = this
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/MP4_dongman.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						type:'text'
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.videoUrl2 = res.data
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
			},getApi3() {
				let that = this
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/MP4_feiyangyang.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						type:'text'
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.videoUrl3 = res.data
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
#myVideo{
	width: 100%;
}
</style>
