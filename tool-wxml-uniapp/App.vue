<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {
			let that = this
			// https://zhgdxcx.ccqm.cn:8001/bigdata/loginRest/changeValue  POST
			// {"configCode":"wx_shenhe","configValue":"1"// 0开启、1关闭}
			uni.showLoading({title:'加载中...'})
			uni.request({
				url: 'https://zhgdxcx.ccqm.cn:8001/bigdata/loginRest/systemConfig/3',
				dataType: "json",
				// responseType: "json",
				method: 'GET',
				data: {},
				timeout: 6000,
				sslVerify: false,
				withCredentials: false,
				firstIpv4: false,
				headers:{
					'Cache-Control': 'no-cache'
				},
				success(res) {
					console.log(res);
					if (res.data.success) {
						uni.setStorageSync('wx_shenhe', res.data.data.wx_shenhe);// 0开启、1关闭
						uni.showToast({
							title: '欢迎您'+res.data.data.wx_shenhe,
							icon: 'none',
							mask: true,
							duration: 2000
						});
					}
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
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
