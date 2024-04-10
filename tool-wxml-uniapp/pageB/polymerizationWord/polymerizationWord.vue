<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="语录" prop="id">
				<u-input v-model="form.idName" type="select" @click="show = true" />
				<u-select v-model="show" :list="list5" @confirm="confirm"></u-select>
			</u-form-item>
		</u-form>
		<u-input v-model="text" type="textarea"  placeholder="" :border="true" height="200" />
		<u-button @click="getApi" type="primary" class="u-m-t-20">下一句</u-button>
		
		<view class="u-m-30">
			<view v-for="(item,index) in list" :key="index">
				<view class="u-m-t-20">
					{{index + 1}} 、{{item}}
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
					id:'4',
					idName:'古言语录',
					type:'json'
				},
				rules: {
					name: [{
						required: true,
						message: '请选择语录',
						trigger: 'blur,change'
					}]
				},
				text:'',
				list:[],
				show: false,
				list5:[
					{value: '1',label: '爱情语录'},
					{value: '2',label: '傲娇语录'},
					{value: '3',label: '毒鸡汤'},
					{value: '4',label: '古言语录'},
					{value: '5',label: '火星语录'},
					{value: '6',label: '经典语录'},
					{value: '7',label: '健康知识语录'},
					{value: '8',label: '情诗语录'},
					{value: '9',label: '情话语录'},
					{value: '10',label: '人间语录'},
					{value: '11',label: '人生话语'},
					{value: '12',label: '伤感语录'},
					{value: '13',label: '失恋语录'},
					{value: '14',label: '舔狗语录'},
					{value: '15',label: '温柔语录'},
					{value: '16',label: '随机一言'},
					{value: '17',label: '中英语录'},
					{value: '18',label: '随机对联'},
				],
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
		onShow(){
			this.getApi();
		},
		onReady() {
					this.$refs.uForm.setRules(this.rules);
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
					url: 'https://www.hhlqilongzhu.cn/api/yl_juhe.php',
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						that.text = res.data
						that.list.push(res.data)
						uni.hideLoading();
					},
					fail(err) {
						uni.showToast({
							title: '获取失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
						uni.hideLoading();
					},
					complete() {},
				});
			},
		},
		
	}
</script>

<style lang="scss" scoped>

</style>
