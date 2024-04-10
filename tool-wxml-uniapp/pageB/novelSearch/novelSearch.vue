<template>
	<view class="u-p-10">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="小说名称" prop="name">
				<u-input v-model="form.name" placeholder="请输入小说名称" />
			</u-form-item>
			<u-button @click="submit" type="primary">搜索</u-button>
		</u-form>
		
		<u-modal v-model="showDetail" title="下载路径" :show-confirm-button="false" 
				:show-cancel-button="true" cancel-text="关闭"
				 :content="content"></u-modal>
		
		<view class="u-p-t-20 center">
			<view v-for="(item,index) in list" :key="index" class="item-box">
				<view class="item-box-name">
					<text>小说名称：</text>
					<text>{{item.title}}</text>
				</view>
				<view class="item-box-name u-line-1">
					<text>作者：</text>
					<text>{{item.author}}</text>
				</view>
				<view class="item-box-name u-line-3">
					<text>简介：</text>
					<text>{{item.intro}}</text>
				</view>
				<view class="dow u-p-t-30 u-text-center" @click="download(item.file_id)">
					下载
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
					name: '斗破苍穹',
					file_id:''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入小说名称',
						trigger: 'blur,change'
					}]
				},
				list:[
					{
						"author": "天蚕土豆",
						"title": "《斗破苍穹》txt完结",
						"intro": "《斗破苍穹》全本[换行]完结了，三年追书，感慨！[换行][换行]第一章&nbsp;陨落的天才[换行][换行]“斗之力，三段！”[换行][换行]望着测验魔石碑上面闪亮得甚至有些刺眼的五个大字，少年面无表情，唇角有着一抹自嘲，紧握的手掌，因为大力，而导致略微尖锐的指甲深深的刺进了掌心之中，带来一阵阵钻心的疼痛…[换行][换行]“萧炎，斗之力，三段！级别：低级！”测验魔石碑之旁，一位中年男子，看了一眼碑上所显示出来的信息，语气漠然的将之公布了出来…[换行][换行]中年男子话刚刚脱口，便是不出意外的在人头汹涌的广场上带起了一阵嘲讽的骚动。[换行][换行]“三段？嘿嘿，果然不出我所料，这个“天才”这一年又是在原地踏步！”[换行][换行]“哎，这废物真是把家族的脸都给丢光了。”[换行][换行]“要不是族长是他的父亲，这种废物，早就被驱赶出家族，任其自生自灭了，哪还有机会待在家族中白吃白喝。”[换行][换行]“唉，昔年那名闻乌坦城的天才少年，如今怎么落魄成这般模样了啊？”[换行][换行]“谁知道呢，或许做了什么亏心事，惹得神灵降怒了吧…”[换行][换行]周围传来的不屑嘲笑以及惋惜轻叹，落在那如木桩待在原地的少年耳中，恍如一根根利刺狠狠的扎在心脏一般，让得少年呼吸微微急促。",
						"type": "玄幻架空",
						"file_id": 24801
					}
				],
				showDetail:false,
				content:'',
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
		onShow() {},
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
					url: 'https://www.hhlqilongzhu.cn/api/novel_2.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: that.form,
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
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
			download(id){
				let that = this
				uni.request({
					url: 'https://www.hhlqilongzhu.cn/api/novel_2.php',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						name:this.form.name,
						file_id:id
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res);
						if (res.data.code == 200) {
							that.content = '复制浏览器打开' + res.data.downloadUrl
							that.showDetail = true;
							// that.list = res.data.data
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
.item-box-name{
	margin-top: 10px;
}
.dow{
	color: #2b85e4;
}
</style>