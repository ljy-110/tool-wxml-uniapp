<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="音乐名称" prop="gm">
				<u-input v-model="form.gm" placeholder="请输入音乐名称" />
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box" @click="toMusic(item.songname,index+1)">
				<view class="">
					{{item.n}}.{{item.songname}}--{{item.singer}}
				</view>
			</view>
			
		</view>
		<view class="u-p-30 play-music">
			<view class="u-m-t-40" style="text-align: center;">
				<audio style="text-align: left" :src="info.music_url" :poster="info.cover" 
				:name="info.title" :author="info.singer" :action="{
					method: 'pause'
				}" controls></audio>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					gm: '偷心',
					type:'JSON',
					n:'',
					br:2,
					num:''
				},
				rules: {
					gm: [{
						required: true,
						message: '请输入音乐名称',
						trigger: 'blur,change'
					}]
				},
				info:{},
				list:[],
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
					url: 'https://www.hhlqilongzhu.cn/api/dg_bdmusic.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// let parts = res.data.split('\n');
						// that.list = parts
						// uni.hideLoading();
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
			toMusic(name,index){
				let that = this
				// let aname = name.split(index+'.')
				uni.showLoading({title:'加载中...'})
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/dg_wyymusic.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						gm: name,
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