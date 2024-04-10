<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="排行榜" prop="id">
				<u-input v-model="form.idName" type="select" @click="show = true" />
				<u-select v-model="show" :list="list5" @confirm="confirm"></u-select>
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box flex" @click="toSeries(item)">
				<view class="flex1">
					<image :src="item.covel" mode="aspectFit" style="width: 100%;height: 300rpx;"></image>
				</view>
				<view class="flex2 u-m-l-15">
					<view class="c-title">
						{{item.title}}
					</view>
					<view class="u-m-t-15">
						{{item.latest_comic_title}}
					</view>
					<view class="u-m-t-15 u-line-5">
						{{item.description}}
					</view>
				</view>
			</view>
			
		</view>
		
		<u-modal v-model="showDetail" :title="titleDialog" :show-confirm-button="false"
				:show-cancel-button="true" cancel-text="关闭"
				 :content="content"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					id:'10',
					idName:'日漫榜'
				},
				rules: {
					name: [{
						required: true,
						message: '请选择排行榜',
						trigger: 'blur,change'
					}]
				},
				show: false,
				list5:[
					{value: '9',label: '人气榜'},
					{value: '2',label: '新作榜'},
					{value: '7',label: '飙升榜'},
					{value: '4',label: '畅销榜'},
					{value: '11',label: '韩漫榜'},
					{value: '10',label: '日漫榜'},
					{value: '6',label: '恋爱榜'},
					{value: '25',label: '剧情榜'},
					{value: '13',label: '投稿榜'},
					{value: '12',label: '完结榜'},
					{value: '28',label: '免费榜'},
					{value: '29',label: '等免榜'},
					{value: '27',label: '月票榜'},
				],
				list:[],
				content:'',
				titleDialog:'',
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
				this.form.id = e[0].value
				this.form.idName = e[0].label
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
					url: 'https://www.hhlqilongzhu.cn/api/kuaikan_manhua_phb.php',
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
							uni.hideLoading();
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
				this.titleDialog = item.title
				this.content = item.link
				this.showDetail = true;
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