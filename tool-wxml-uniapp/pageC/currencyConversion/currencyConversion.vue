<template>
	<view class="u-p-15">
		<view class="">
			<view class="flex">
				<u-input class="select-input flex1" v-model="beforeName" type="select" :border="false" @click="showBefore = true" />
				<u-input class="select-input flex2" v-model="beforePrice" placeholder="请输入数字" type="number" :border="true" />
			</view>
			<view class="u-text-center u-p-50">
				<u-icon name="reload" size="40" color="#2b85e4" @click="exchange"></u-icon>
			</view>
			<view class="flex">
				<u-input class="select-input flex1" v-model="afterName" type="select" :border="false" @click="showAfter = true" />
				<u-input class="select-input flex2" v-model="afterPrice" disabled placeholder="" type="number" :border="true" />
			</view>
		</view>
		
		<button type="text" class="u-m-t-40" @click="getSearch">转换</button>
		<!--  -->
		<u-select v-model="showBefore" :list="list" @confirm="confirmBefore" value-name="iso" label-name="title"></u-select>
		<u-select v-model="showAfter" :list="list" @confirm="confirmAfter" value-name="iso" label-name="title"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				before:'CNY',
				beforeName:'人民币-CNY',
				after:'USD',
				afterName:'美元-USD',
				beforePrice:'',
				afterPrice:'',
				price:'',
				showBefore:false,
				showAfter:false,
				list:[],
				info:{},
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
			exchange(){
				let info = {
					a:this.before,
					an:this.beforeName,
					b:this.after,
					bn:this.afterName,
				}
				this.before = info.b
				this.beforeName = info.bn
				this.after = info.a
				this.afterName = info.an
				this.getSearch();
			},
			confirmBefore(e){
				this.before = e[0].value
				this.beforeName = e[0].label + '-' + e[0].value
			},
			confirmAfter(e){
				this.after = e[0].value
				this.afterName = e[0].label + '-' + e[0].value
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.pearktrue.cn/api/exchangerate/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						type:'list',before:'',after:'',price:''
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
			getSearch() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.pearktrue.cn/api/exchangerate/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						type:'get',
						before:that.before,
						after:that.after,
						price:that.beforePrice
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.info = res.data
							that.afterPrice = res.data.resultprice
							uni.hideLoading();
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

</style>
