<template>
	<view class="content">
		<view v-for="(item,index) in list" :key="index" class="box" @click="toWord(item.url)">
			<view class="title">
				{{item.title}}
			</view>
			<view class="footer between">
				<view class="footer-name">
					小生程序员
				</view>
				<view class="footer-time">
					{{item.time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						title:'微信小程序云开发！',
						url:'https://mp.weixin.qq.com/s/bRptbhqsUYx10gNugSJjig',
						time:'2024-05-08 16:57'
					},
					{
						title:'微信小程序如何巧妙嵌入H5页面！',
						url:'https://mp.weixin.qq.com/s/pqsjOZ_bxm8ierycefFSQA',
						time:'2024-04-04 09:00'
					},
					{
						title:'【webpack】构建项目配置',
						url:'https://mp.weixin.qq.com/s/OVRucE92YOOkuMCAuD2fUA',
						time:'2024-04-03 09:00'
					},
					{
						title:'Vite构建项目过程',
						url:'https://mp.weixin.qq.com/s/JaxTAj2t91yNra_0jIMmZg',
						time:'2024-03-29 14:47'
					},
					{
						title:'【海康视频WEB插件】预览/回放播放',
						url:'https://mp.weixin.qq.com/s/sdQ-nkTkpZfLgorRWsh9eA',
						time:'2024-03-21 08:01'
					},
					{
						title:'JavaScript中对new Date()的奇妙操作',
						url:'https://mp.weixin.qq.com/s/RDlNKWc7-4bejovgR8fY0Q',
						time:'2024-03-11 09:03'
					},
					{
						title:'小程序实现订阅功能和测试发送订阅信息',
						url:'https://mp.weixin.qq.com/s/wLTqNvZTFFn8Kt-ZPJBNZA',
						time:'2023-12-04 11:39'
					},
					{
						title:'海康H5视频插件，让你的视频如此流畅！',
						url:'https://mp.weixin.qq.com/s/qxP8rgVFF60uxidxiACVqA',
						time:'2023-11-23 10:49'
					},
					{
						title:'【nvm】node版本管理器',
						url:'https://mp.weixin.qq.com/s/mh5z2_MeXhfEmA6pFfP1yg',
						time:'2023-09-15 09:40'
					},
					{
						title:'使用UniApp进行微信小程序开发的实践指南',
						url:'https://mp.weixin.qq.com/s/-7LV1oddATIUrBeMg2pe5Q',
						time:'2023-08-25 15:05'
					},
					{
						title:'Uniapp与Uview：1套代码轻松驾驭跨平台开发！',
						url:'https://mp.weixin.qq.com/s/09jZZeinu60B7IJA6Mcksw',
						time:'2023-08-23 15:01'
					},
					{
						title:'vue+萤石云ezuikit.js播放直播流视频',
						url:'https://mp.weixin.qq.com/s/45pxd_HW5lSiizSNCwi4GQ',
						time:'2023-06-21 15:39'
					},
				]
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
		methods: {
			toWord(url){
				uni.navigateTo({
					url: '/pages/wordInfo/wordInfo?url='+url
				});
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.content{
	padding: 10px;
	box-sizing: border-box;
}
.box{
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	border-radius: 12px;
	padding: 13px;
	box-sizing: border-box;
	margin-bottom: 10px;
}
.title{
	color: $uni-color-title;
	font-size: $uni-font-size-alg;
	font-weight: $uni-font-weight;
}
.footer{
	margin-top: 15px;
}
.footer-time{
	color: $uni-text-color-grey;
	font-size: $uni-font-size-base;
}
.footer-name{
	color: $uni-text-color-grey;
	font-size: $uni-font-size-base;
}
</style>
