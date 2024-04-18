<template>
	<view class="u-p-15">
		<view class="box-top flex h-center">
			<view class="title-name flex1 center">
				<view class="">
					<text class="u-m-r-15">{{list.name}}</text>
					<u-tag :text="list.dynasty" mode="light" />
				</view>
				<view class="">
					<u-tag :text="list.desc" mode="light" />
				</view>
			</view>
			<view class="title-avatar flex1 center">
				<u-avatar :text="list.name" bg-color='#2979ff' size="160"></u-avatar>
			</view>
		</view>
		<view class="item-box u-m-t-15">
			<view class="title">
				人物介绍
			</view>
			<view v-for="(item,index) in list.info" :key="index" class="u-p-t-10">
				{{item}}
			</view>
		</view>
		<view class="item-box u-m-t-15">
			<view class="title">
				历史年轮
			</view>
			<view v-for="(item,index) in list.event" :key="index" class="u-p-t-20">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:{}
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
			this.getApi(op.name)
			// this.getApi('班超')
		},
		methods: {
			getApi(name) {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://api.pearktrue.cn/api/yearsmap/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						name:name
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.list = res.data.data[0]
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
.box-top{
	.title-name{
		font-size: 26px;
		font-weight: bold;
	}
	.title-avatar /deep/ .u-avatar{
		color: #fff;
	}
}
.item-box{
	border-radius: 12px;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	padding: 10px;
	box-sizing: border-box;
	.title{
		font-weight: bold;
		font-size: 18px;
	}
}
</style>
