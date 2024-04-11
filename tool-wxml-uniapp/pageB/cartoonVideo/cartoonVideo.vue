<template>
	<view class="u-p-30">
		<view class="">{{name}}</view>
		<video id="myVideo" :src="videoUrl" @error="videoErrorCallback" 
		 enable-danmu danmu-btn controls></video>
		 
		<view class="u-m-t-40">
			播放地址：
			<u-input type="textarea" v-model="videoUrl" :border="true" :height="400"/>
		</view>
		<u-button @click="copyTextToClipboard">复制地址</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl:'https://www.clicli.wang/addons/dp/player/dp.php?key=0&from=&id=210&api=&url=https://r2.aqua.video/1999/10/OnePiece/0001.mp4&jump=',
				ACG_id:'',
				name:'',
				n:''
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
		onShow(){},
		onLoad(op) {
			this.ACG_id = op.ACG_id;
			this.name = op.name
			this.n = op.n
			this.getApi(op)
		},
		methods: {
			videoErrorCallback(e) {
				// uni.showModal({
				// 	content: e.target.errMsg,
				// 	showCancel: false
				// })
			},
			copyTextToClipboard(){
							let that = this
							uni.setClipboardData({  
								data: that.videoUrl,  
								success: () => {  
								  uni.showToast({  
									title: '复制成功',  
									icon: 'success',  
									duration: 2000  
								  });  
								},  
								fail: (err) => {  
								  uni.showToast({  
									title: '复制失败：' + err.errMsg,  
									icon: 'none',  
									duration: 2000  
								  });  
								}  
							  });  
						},
			getApi(op) {
				let that = this
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/ziyuan_ACG.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						name: op.name,
						ACG_id:op.ACG_id,
						n:op.n
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						if (res.data.code == 200) {
							that.videoUrl = res.data.video
						} else {
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
			},
		},
		
	}
</script>

<style lang="scss" scoped>
#myVideo{
	width: 100%;
}
</style>
