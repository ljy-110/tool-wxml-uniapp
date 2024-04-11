<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="热搜榜" prop="type">
				<u-input v-model="form.typeName" type="select" @click="show = true" />
				<u-select v-model="show" :list="list5" @confirm="confirm"></u-select>
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box" @click="toRS(item)">
				<view class="">
					<u-badge type="error" :count="index + 1" style="position: relative;" :offset="[0,-15]"></u-badge>
					<text class="u-p-l-20">{{item.title}}</text>
					<u-tag :text="item.hot" type="error" mode="light" size="mini" style="margin-left: 15rpx;" />
				</view>
				
			</view>
			
		</view>
		
		<u-modal v-model="showDetail" :title="titleDialog" :show-confirm-button="true"
				:show-cancel-button="true" cancel-text="关闭" confirm-text="复制" @confirm="copyTextToClipboard"
				 :content="content"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					type:'douyin',
					typeName:'抖音热搜',
				},
				show: false,
				list5: [
					{
						value: 'zhihu',
						label: '知乎热榜'
					},
					{
						value: 'weibo',
						label: '微博热搜'
					},
					{
						value: 'baidu',
						label: '百度热点'
					},
					{
						value: 'history',
						label: '历史上的今天'
					},
					{
						value: 'bilihot',
						label: '哔哩哔哩热搜'
					},
					{
						value: 'biliall',
						label: '哔哩哔哩全站日榜'
					},
					{
						value: 'douyin',
						label: '抖音热搜'
					},
				],
				rules: {
					type: [{
						required: true,
						message: '请选择返回类型',
						trigger: 'blur,change'
					}],
				},
				info:{},
				list:[],
				titleDialog:'',
				content:'',
				showDetail:false
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
		methods: {
			confirm(e) {
				this.form.type = e[0].value
				this.form.typeName = e[0].label
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.getApi();
					} else {
						console.log('验证失败');
					}
				});
			},
			getApi() {
				let that = this
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/rs_juhe.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.success) {
							that.list = res.data.data
							uni.hideLoading();
						} else {
							uni.hideLoading();
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
			toMusic(name,index){
				let that = this
				let aname = name.split(index+'.')
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/dg_bdmusic.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						gm: aname,
						type:'json',
						n:index,
						br:2,
						num:''
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (res.data.code == 200) {
							that.info = res.data
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
			toRS(item){
				this.titleDialog = item.title
				this.content = '地址：'+ item.url + ''
				this.showDetail = true
			},
			copyTextToClipboard(){
				let that = this
				uni.setClipboardData({  
					data: that.content,  
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
.item-box{
	width: 100%;
	padding: 10px;
	margin-top: 15px;
	border: #ccc 1px solid;
	border-radius: 12px;
}
</style>