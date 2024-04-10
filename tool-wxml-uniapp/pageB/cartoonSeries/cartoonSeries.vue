<template>
	<view class="u-p-30">
		<view class="u-font-lg">
			{{name}}
		</view>
		<view class="u-p-t-30 item-a">
			<view v-for="(item,index) in list" :key="index" @click="toVideo(item.n)">
				<view class="item-box">
					{{item.n}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				ACG_id:'',
				name:''
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
			this.getApi(op)
		},
		methods: {
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
						n:''
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						if (res.data.code == 200) {
							that.list = res.data.data
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
			toVideo(n){
				uni.navigateTo({
					url:'/pageB/cartoonVideo/cartoonVideo?ACG_id=' + this.ACG_id + '&name=' + this.name + '&n=' + n				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.item-box{
	 box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	 width: 50px;
	 height: 50px;
	 line-height: 50px;
	 text-align: center;
	 margin-bottom: 10px;
}
.item-a{
	display: flex;  
	flex-wrap: wrap;
}
</style>
