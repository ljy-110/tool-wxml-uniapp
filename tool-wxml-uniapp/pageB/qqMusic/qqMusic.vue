<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<!-- <u-form-item label="音乐名称" prop="gm">
				<u-input v-model="form.gm" placeholder="请输入音乐名称" />
			</u-form-item> -->
			<u-form-item label="歌曲榜" prop="id">
				<u-input v-model="form.idName" type="select" @click="show2 = true" />
				<u-select v-model="show2" :list="list2" @confirm="confirm2"></u-select>
			</u-form-item>
			<u-form-item label="类型" prop="type">
				<u-input v-model="form.typeName" type="select" @click="show = true" />
				<u-select v-model="show" :list="list5" @confirm="confirm"></u-select>
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box" @click="toMusic(item,index+1)">
				<view class="">
					{{index + 1}}.{{item.title}} -- {{item.singer}}
				</view>
			</view>
			
		</view>
		<view class="u-p-30 play-music">
			<view class="u-m-t-40" style="text-align: center;">
				<audio style="text-align: left" :src="info.song_url" :poster="info.song_cover" 
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
					id: '1',
					type:'0',
					typeName:'列表',
					idName:'热歌榜'
				},
				show: false,
				show2: false,
				list5:[
					{
						value: '0',
						label: '列表'
					},{
						value: '1',
						label: '随机音乐信息'
					},
				],
				list2: [
					{
						value: '1',
						label: '热歌榜'
					},
					{
						value: '2',
						label: '新歌榜'
					},
					{
						value: '3',
						label: '飙升榜'
					},
					{
						value: '4',
						label: '游戏音乐榜'
					},
					{
						value: '5',
						label: '动漫音乐榜'
					},
					{
						value: '6',
						label: '国风热歌榜'
					},
					{
						value: '7',
						label: '网络歌曲榜'
					},
				],
				rules: {
					id: [{
						required: true,
						message: '请选择歌曲榜',
						trigger: 'blur,change'
					}],
					type: [{
						required: true,
						message: '请选择返回类型',
						trigger: 'blur,change'
					}],
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
			confirm(e) {
				this.form.type = e[0].value
				this.form.typeName = e[0].label
			},
			confirm2(e) {
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
					url: 'https://www.hhlqilongzhu.cn/api/dg_QQphb.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						if (that.form.type == '0') {
							that.list = res.data.data
						} else{
							that.info = res.data
						}
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