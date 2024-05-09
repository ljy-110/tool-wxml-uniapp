<template>
	<view class="p10">
		<view >
			<u-search placeholder="请输入" v-model="search" :show-action="true" :clearabled="true" action-text="搜索"
				:animation="true" @custom="searchWord"></u-search>
		</view>
		<view v-for="(item,index) in list" :key="index" class="item-box" >
			<view class="u-m-b-5" v-if="item.corpName">
				<text class="title">名称：</text>
				<text class="u-m-r-8">{{item.corpName}}</text>
				<u-icon name="file-text" color="#2979ff" size="32" @click="copyTextToClipboard(item.corpName)"></u-icon>
			</view>
			<view class="u-m-b-5" v-if="item.taxpayerNum">
				<text class="title">税号：</text>
				<text class="u-m-r-8">{{item.taxpayerNum}}</text>
				<u-icon name="file-text" color="#2979ff" size="32" @click="copyTextToClipboard(item.taxpayerNum)"></u-icon>
			</view>
			<view class="u-m-b-5" v-if="item.address">
				<text class="title">地址：</text>
				<text class="u-m-r-8">{{item.address}}</text>
				<u-icon name="file-text" color="#2979ff" size="32" @click="copyTextToClipboard(item.address)"></u-icon>
			</view>
			<view class="u-m-b-5" v-if="item.telephone">
				<text class="title">电话：</text>
				<text class="u-m-r-8">{{item.telephone}}</text>
				<u-icon name="file-text" color="#2979ff" size="32" @click="copyTextToClipboard(item.telephone)"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'字节跳动',
				list:[]
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
			searchWord(val) {
				this.search = val;
				this.getApi();
			},
			getApi() {
				let that = this
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: 'https://tools.mgtv100.com/external/v1/invoiceInfo',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						companyName: that.search
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.list = res.data.data.autoCompleteInfoLst
							uni.hideLoading();
						} else {
							uni.showToast({
								title: res.data.code,
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
			copyTextToClipboard(item) {
				// let that = this
				uni.setClipboardData({
					data: item,
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
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.p10{
		padding: 10px;
		box-sizing: border-box;
	}
.item-box{
	margin-top: 8px;
	border: #ccc 1px solid;
	border-radius: 8px;
	padding: 10px;
	box-sizing: border-box;
	.title{
		font-weight: bold;
	}
}
</style>
