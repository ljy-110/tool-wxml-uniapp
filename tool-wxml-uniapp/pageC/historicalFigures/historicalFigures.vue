<template>
	<view>
		<view class="u-p-15">
			<u-search placeholder="请输入" v-model="search" :show-action="true" :clearabled="true" 
			action-text="搜索" :animation="true" @custom="searchWord"></u-search>
		</view>
		<u-index-list :scrollTop="scrollTop">
			<view v-for="(item, index) in list" :key="index">
				<u-index-anchor :index="item.letter" />
				<view class="list-cell u-border-bottom" v-for="(item1, idx) in item.data" :key="idx" @click="toH(item1.name)">
					<text class="u-m-r-20">{{item1.name}}({{item1.dynasty}})</text>
					<u-icon name="man" color="#2b85e4" v-if="item1.gender == '男'"></u-icon>
					<u-icon name="woman" color="#dd6161" v-else-if="item1.gender == '女'"></u-icon>
				</view>
			</view>
		</u-index-list>
	</view>
</template>

<script>
	import indexList from '../static/js/indexList.js'
	const letterArr = indexList.list.map(val => {
		return val.letter;
	})
	export default {
		data() {
			return {
				search:'',
				scrollTop: 0,
				indexList: letterArr,
				list: indexList.list
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		beforeCreated() {},
		beforeMounted() {},
		beforeUpdated() {},
		updated() {},
		beforeDestroyed() {},
		destroyed() {},
		created() {},
		mounted() {},
		onShow() {},
		methods: {
			searchWord(val){
				this.search = val;
				this.toH(val)
			},
			toH(name){
				uni.navigateTo({
					url:'/pageC/historicalFiguresInfo/historicalFiguresInfo?name=' + name
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>