<template>
	<view class="u-p-15">
		<view v-for="(item,index) in list" :key="index" class="item-box">
			<view class="title">
				{{item.urlName}}
			</view>
			<view class="sub-title">
				{{item.remark}}
			</view>
			<view class="url-title">
				地址：{{item.urlPath}}
			</view>
		</view>
		
		<u-empty text="暂无数据" mode="list" v-if="list.length == 0"></u-empty>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						"id": "",
						"urlName": "我的世界SRV解析还原",
						"urlPath": "https://api.imzzh.cn/minecraft-srv/?domain=100mc.cc",
						"state": "1",
						"secUserId": "febb3d8b-9cf3-4b20-b7ea-0e12f46ca55f",
						"remark": null,

					},
					{
						"id": "0ed00cc3-7c78-48ba-b55d-7406c2b3a7a5",
						"urlName": "TinyPNG–开发者API",
						"urlPath": "https://tinify.cn/developers",
						"state": "1",
						"secUserId": "febb3d8b-9cf3-4b20-b7ea-0e12f46ca55f",
						"remark": "使您的WebP、JPEG和PNG压缩流程自动化，图片压缩",
						"aliveNum": 0,
						"deadNum": 0,
						"trueWallNum": 0,
						"falseWallNum": 0,
						"lastState": "1",
						"lastStateList": "",
						"totalGoods": 0,
						"totalCoins": 0,
						"createdTime": "2024-04-08T08:28:07.000+00:00",
						"updatedTime": "2024-04-08T08:28:07.000+00:00",
						"userName": null,
						"dynamicTags": null
					},
					{
						"id": "e3ea278b-65d8-4883-a6e4-51ba29be940d",
						"urlName": "云间深白随机图片API",
						"urlPath": "https://api.yowap.com/",
						"state": "1",
						"secUserId": "febb3d8b-9cf3-4b20-b7ea-0e12f46ca55f",
						"remark": null,
					},
					{
						"id": "7e7d3ae7-ea02-4663-a7ed-85686a099f51",
						"urlName": "小歪API-图片API，文字API，二维码API，随心所动不再单调",
						"urlPath": "https://api.aixiaowai.cn/",
						"state": "1",
						"secUserId": "febb3d8b-9cf3-4b20-b7ea-0e12f46ca55f",
						"remark": "小歪API-图片API，文字API，二维码API，随心所动不再单调",
					},
					{
						"id": "873ec820-89d3-4dab-8596-a35b46bb3d68",
						"urlName": "评论区一言（评论区拍马屁）",
						"urlPath": "https://blog.yaqwq.top/sj/api.php",
						"state": "1",
						"secUserId": "febb3d8b-9cf3-4b20-b7ea-0e12f46ca55f",
						"remark": "评论区一言（评论区拍马屁）",
					},
					{
						"id": "e61a5dc0-8d78-4797-9cfe-94adb73c37ce",
						"urlName": "随机头像",
						"urlPath": "http://www.wudada.online/Api/SjTx",
						"state": "1",
						"secUserId": "febb3d8b-9cf3-4b20-b7ea-0e12f46ca55f",
						"remark": null,
					},
					{
						"id": "a59c1456-c3c2-494b-9fcb-721bc8bf8b76",
						"urlName": "随机萌图",
						"urlPath": "https://api.miaomc.cn/image/",
						"state": "1",
						"secUserId": "febb3d8b-9cf3-4b20-b7ea-0e12f46ca55f",
						"remark": "随机萌图 Image API - MIAOMC",
						"aliveNum": 0,
					},
					{
						"id": "ce8b9d6c-62cc-4848-bcea-d17a9033a1e9",
						"urlName": "7000+短剧搜索接口",
						"urlPath": "https://files.ptger.cn/api/files/vagueQuery?name=贬值",
						"state": "1",
						"secUserId": "febb3d8b-9cf3-4b20-b7ea-0e12f46ca55f",
						"remark": null,
					},
					{
						"id": "04113a72-8dac-4d85-8db5-6e235abe40b1",
						"urlName": "[手写]时间会验证我的爱",
						"urlPath": "https://www.hhlqilongzhu.cn/request.php?type=api_page_explanation&data=1711693165",
						"state": "1",
						"secUserId": null,
						"remark": "手写底图",
						"aliveNum": 0,
					},
					{
						"id": "07bb1523-b3d2-4793-a4fc-0709a8efc2f8",
						"urlName": "[手写]我的爱只给",
						"urlPath": "https://www.hhlqilongzhu.cn/request.php?type=api_page_explanation&data=1711693238",
						"state": "1",
						"secUserId": null,
						"remark": "手写底图",
					},
					{
						"id": "07e4b8ec-bfa2-4c22-91b0-c96505f5edf4",
						"urlName": "快看漫画排行榜",
						"urlPath": "https://www.hhlqilongzhu.cn/request.php?type=api_page_explanation&data=1711135826",
						"state": "1",
						"secUserId": null,
						"remark": "返回快看漫画的各类型排行榜,附直链",
					},
				],
				page: 1, // 当前页数
				pageSize: 30, // 每页数据数量
				total: 0, // 总数据条数
				isLoading: false, // 是否正在加载数据
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
			};
		},
		beforeCreated() {},
		beforeMounted() {},
		beforeUpdated() {},
		updated() {},
		beforeDestroyed() {},
		destroyed() {},
		created() {},
		mounted() {},
		onShow() {
			this.getApi();
		},
		onReachBottom() {
			let that = this;
			if (this.list.length == this.total) return;
			this.status = 'loading';
			this.page = ++this.page;
			setTimeout(() => {
				that.getApi(); //请求的接口数据
				if (that.list.length == that.total) that.status = 'nomore';
				else that.status = 'loading';
			}, 2000)
		},
		methods: {
			getApi() {
				let that = this
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: 'https://luckgirl.top:888/api/share/urlShare/queryList',
					// dataType: "json",
					// responseType: "json",
					method: 'POST',
					data: {
						pageInfo: {
							current: that.page,
							size: 30,
						},
						queryInfo: {}
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							let data = res.data.data.entityList.records
							that.list = that.list.concat(data);
							that.total = data.count; // 更新总数据条数
							if (that.list.length == res.data.count) {
								that.status = 'nomore';
							}
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
	.item-box {
		width: 100%;
		padding: 10px;
		margin-top: 15px;
		border: #ccc 1px solid;
		border-radius: 12px;
	}

	.title {
		font-size: 16px;
		font-weight: bold;
	}

	.sub-title {
		color: $uni-color-subtitle;
		margin-top: 15rpx;
	}

	.url-title {
		color: $uni-color-subtitle;
		margin-top: 15rpx;
	}
</style>