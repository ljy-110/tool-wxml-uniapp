<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="资源" prop="keysearch">
				<u-input v-model="form.keysearch" placeholder="请输入资源" />
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box" @click="toRS(item)">
				<view class="">
					{{item.title}}
				</view>
				<view class="u-m-t-20 addr url-wrap">
					地址：{{item.data_url}}
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
					keysearch: '与凤行',
				},
				rules: {
					msg: [{
						required: true,
						message: '请输入资源',
						trigger: 'blur,change'
					}]
				},
				info:{},
				list:[],
				wordList:[],
				showWord:false,
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
					url: 'https://www.hhlqilongzhu.cn/api/ziyuan_nanfeng.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.list = res.data.data
						uni.hideLoading();
						// if (res.data.code == 200) {
						// 	let parts = res.data.split('\n');
						// 	that.info = res.data
						// } else {
						// 	uni.showToast({
						// 		title: res.data.message,
						// 		icon: 'error',
						// 		mask: true,
						// 		duration: 2000
						// 	});
						// }
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
				this.content = '地址：'+ item.data_url + ''
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
	box-sizing: border-box;
	margin-top: 15px;
	border: #ccc 1px solid;
	border-radius: 12px;
	box-sizing: border-box;
}
.play-music{
	position: fixed;
	bottom: 15px;
	width: 100%;
}
.center{
	box-sizing: border-box;
}
// .addr{
// 	box-sizing: border-box;
// 	width: 95%;
// 	white-space:pre-wrap;
// 	overflow-wrap:anywhere;
// }
</style>