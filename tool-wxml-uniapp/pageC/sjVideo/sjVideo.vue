<template>
	<view class="u-p-30">
		<view class="u-p-t-20">
			视频1
		</view>
		<!-- <view class="">{{name}}</view> -->
		<video id="myVideo" :src="videoUrl4" @error="videoErrorCallback" 
		 enable-danmu danmu-btn controls></video>
		<view class="u-p-t-20">
			视频2
		</view>
		<!-- <view class="">{{name}}</view> -->
		<video id="myVideo" :src="videoUrl" @error="videoErrorCallback" 
		 enable-danmu danmu-btn controls></video>
		 
		 <view class="u-p-t-20">
		 	视频3
		 </view>
		 
		  
		  <video id="myVideo" :src="videoUrl2" @error="videoErrorCallback"
		   enable-danmu danmu-btn controls></video>
		
		<view class="u-p-t-20">
			视频4
		</view>
		<video id="myVideo" :src="videoUrl3" @error="videoErrorCallback"
		 enable-danmu danmu-btn controls></video>
		 <view class="u-p-t-20">
		 	视频5
		 </view>
		 <video id="myVideo" :src="videoUrl5" @error="videoErrorCallback"
		  enable-danmu danmu-btn controls></video>
		
		<view class="u-p-t-20">
			视频6
		</view>
		<video id="myVideo" :src="videoUrl6" @error="videoErrorCallback"
		 enable-danmu danmu-btn controls></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// https://api.8uid.cn/qc.php?type=video
				videoUrl:'https://jx.iqfk.top/api/sjsp.php',
				videoUrl2:'',
				videoUrl3:'https://mnapi.cn/nvda.php?type=video',
				videoUrl4:'https://api.walsm.cn/api/mnbz',
				videoUrl5:'https://api.yujn.cn/api/zzxjj.php?type=video',
				videoUrl6:'http://api.7645.cn/video/index.php?type=sex_video&id=1',
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
			// this.getApi();
			this.getApi2();
			// this.getApi3();
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
					url: 'https://dayu.qqsuu.cn/moyuribaoshipin/apis.php?type=json',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.videoUrl2 = res.data.data
						} else{
							uni.showToast({
								title: res.data.msg,
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
