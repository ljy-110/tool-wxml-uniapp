<template>
	<view class="u-p-30">
		<u-input v-model="text" type="textarea"  placeholder="" :border="true" height="300" />
		<u-button @click="getApi" type="primary" class="u-m-t-20">下一个</u-button>
		
		<view class="u-m-30">
			<view v-for="(item,index) in list" :key="index">
				<view class="u-m-t-20">
					{{index + 1}} 、{{item}}
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				text:'',
				list:[],
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
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://oiapi.net/API/Sentences',
					method: 'GET',
					data: {},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						
						if (res.data.code == 1) {
							that.text = res.data.message
							that.list.push(res.data.message)
							uni.hideLoading();
						} else{
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
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
