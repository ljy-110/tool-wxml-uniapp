<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="动漫名称" prop="name">
				<u-input v-model="form.name" placeholder="请输入动漫名称" />
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box flex" @click="toSeries(item)">
				<view class="flex1">
					<image :src="item.cover" mode="aspectFit" style="width: 100%;height: 300rpx;"></image>
				</view>
				<view class="flex2 u-m-l-15">
					<view class="c-title">
						{{item.title}}
					</view>
					<view class="u-m-t-15">
						{{item.status}}
					</view>
					<view class="u-m-t-15">
						{{item.tags}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '海贼王',
					ACG_id:'',
					n:''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入动漫名称',
						trigger: 'blur,change'
					}]
				},
				list:[]
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
					url: 'https://www.hhlqilongzhu.cn/api/ziyuan_ACG.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
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
			toSeries(item){
				uni.navigateTo({
					url:'/pageB/cartoonSeries/cartoonSeries?ACG_id=' + item.ACG_id + '&name=' + item.title
				})
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