export default {
	data() {
		return {}
	},
	//1.发送给朋友
	onShareAppMessage() {
		const promise = new Promise(resolve => {
		  setTimeout(() => {
			resolve({
			  title: '开发工具 Tool'
			})
		  }, 2000)
		})
		return {
		  title: '开发工具 Tool',
		  path: '/pages/index/index',
		  promise 
		}
	},
	//2.分享到朋友圈
	onShareTimeline() {},
}
