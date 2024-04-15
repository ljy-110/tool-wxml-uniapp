<template>
	<view>
		<view class="u-p-15">
			<u-search placeholder="请输入" v-model="search" :show-action="true" :clearabled="true" 
			action-text="搜索" :animation="true" @custom="searchWord"></u-search>
		</view>
		<view>
			<view v-for="(item,index) in list" :key="index">
				<u-card :title="item.companyName" :sub-title="item.registerDate">
					<view class="" slot="body">
						<view style="font-weight: bold;">{{item.companyName}}</view>
						<view class="u-p-t-15">法定代表人：{{item.legalPerson}}</view>
						<view class="u-p-t-15">统一社会信用代码：{{item.taxNum}}</view>
						<view class="u-p-t-15">地址：{{item.address}}</view>
						<view class="u-p-t-15">所属行业：{{item.industry}}</view>
						<view class="u-p-t-15">联系电话：{{item.phone}}</view>
					</view>
					<view class="between" slot="foot">
						<text>搜索数量:{{item.count}}</text>
						<text>注册资本:{{item.registerCapital}}</text>
					</view>
				</u-card>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:'腾讯科技(深圳)有限公司',
				showWord:false,
				wordList:[],
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
			searchWord(val){
				this.search = val;
				this.getApi();
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.pearktrue.cn/api/company/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						keyword:that.search
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
.item-box{
	width: 98%;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	border-radius: 12px;
}
.item-img{
	width: 100%;
	height: 180px;
}
</style>
