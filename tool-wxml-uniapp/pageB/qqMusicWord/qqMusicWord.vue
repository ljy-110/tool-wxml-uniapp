<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="音乐名称" prop="msg">
				<u-input v-model="form.msg" placeholder="请输入音乐名称" />
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box" @click="toMusic(item,index+1)">
				<view class="">
					{{item}}
				</view>
			</view>
			
		</view>
		
		<u-popup v-model="showWord" mode="bottom" border-radius="14" height="500px" closeable>
			<scroll-view scroll-y="true" style="height: 500px;">
				<view v-for="(item,index) in wordList" :key="index" class="u-p-15" @click="toMusic(item,index+1)">
					<view class="">
						{{item}}
					</view>
				</view>
			</scroll-view>
			
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					msg: '红日',
					type:'2',
					n:''
				},
				rules: {
					msg: [{
						required: true,
						message: '请输入音乐名称',
						trigger: 'blur,change'
					}]
				},
				info:{},
				list:[],
				wordList:[],
				showWord:false
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
					url: 'https://www.hhlqilongzhu.cn/api/dg_geci.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						let parts = res.data.split('\n');
						that.list = parts
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
			toMusic(name,index){
				let that = this
				// let aname = name.split(index+'.')
				this.form.n = index
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/dg_geci.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						msg: that.form.msg,
						type:'2',
						n:index
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						that.showWord = true
						let parts = res.data.split('\n');
						that.wordList = parts
						uni.hideLoading();
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
.play-music{
	position: fixed;
	bottom: 15px;
	width: 100%;
}
</style>