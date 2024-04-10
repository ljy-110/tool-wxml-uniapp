<template>
	<view>
		<view class="u-p-30">
			<!-- <u-search placeholder="请输入ip" v-model="ip" :clearabled="true"></u-search> -->
			<u-input v-model="ip" type="text" placeholder="请输入ip" :border="true" 
			clearable height="140" :placeholder-style="placeholderStyle" :custom-style="customStyle" class="input" />
			<u-button type="primary" class="u-m-t-40" @click="getLocalIP">查询</u-button>
		</view>
		<view class="u-m-t-20"></view>
		
		<view class="page-section page-section-gap" id="container">
			<map style="width: 100%; height: 300px;" class="map" :latitude="localInfo.lat" :longitude="localInfo.lng" 
			:markers="covers" :theme="'satellite'" :scale="scaleMap" :show-location="true">
			</map>
		</view>
		
		<u-cell-group title="ip信息">
			<u-cell-item title="IP" :value="ip" :arrow="false"></u-cell-item>
			<u-cell-item title="坐标" :arrow="false">
				<text slot="right-icon">
					{{ipData.location.lat}},{{ipData.location.lng}}
				</text>
			</u-cell-item>
			<u-cell-item title="简要地址" :arrow="false">
				<text slot="right-icon">
					{{ipData.ad_info.nation}},{{ipData.ad_info.province}},{{ipData.ad_info.city}},{{ipData.ad_info.district}}
				</text>
			</u-cell-item>
			<u-cell-item title="区域编码" :arrow="false">
				<text slot="right-icon">
					{{ipData.ad_info.adcode}}
				</text>
			</u-cell-item>
		</u-cell-group>
		
		<u-cell-group title="经纬度地址">
			<u-cell-item title="地址" :value="addressInfo.address" :arrow="false"></u-cell-item>
			<u-cell-item title="地址描述" :value="addressInfo.formatted_addresses.recommend" :arrow="false"></u-cell-item>
			<u-cell-item title="粗略位置描述" :value="addressInfo.formatted_addresses.rough" :arrow="false"></u-cell-item>
			<u-cell-item title="地址" :value="addressInfo.formatted_addresses.standard_address" :arrow="false"></u-cell-item>
		</u-cell-group>
		<!-- <text>{{standard_address}}</text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				localInfo:{
					lng:'',lat:''
				},
				addressInfo:'',
				distance:0,
				standard_address:'',
				ip:'',
				placeholderStyle:'fontSize:20px;',
				customStyle:{
					'fontWeight':'600',
				},
				ipData:{
					location:{
						lng:'',lat:''
					}
				},
				covers: [
						// {
						// 	latitude: 23.36525,
						// 	longitude: 116.7054,
						// 	// theme:'normal',
						// 	iconPath: require('../static/image/person-local.png'),
						// 	width:40,
						// 	height:40
							
						// }
				],
				circles:null,
				scaleMap:14,
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
			this.getLocalIP()
		},
		methods: {
			getLocalIP(){ //ip定位
				let that = this
				uni.request({
					url: 'https://apis.map.qq.com/ws/location/v1/ip',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key:that.$TXMAPKEY,
						ip:that.ip
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						console.log(res);
						if (res.data.status == 0) {
							that.localInfo = {
								lat:res.data.result.location.lat,
								lng:res.data.result.location.lng
							}
							that.ipData = res.data.result
							that.ip = res.data.result.ip
							// that.formSubmit(res.data.result.location.lat,res.data.result.location.lng)
							that.getAddress(res.data.result.location.lat,res.data.result.location.lng)
							that.covers = [
								{
									latitude: res.data.result.location.lat,
									longitude: res.data.result.location.lng,
									// theme:'normal',
									iconPath: require('../static/image/person-local.png'),
									width:40,
									height:40
									
								}
							]
						} else{
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
							title: '获取IP定位失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {
					},
				});
			},
			// 逆地址解析
			getAddress(x,y){
				let that = this;
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/',
					// dataType: "json",
					// responseType: "json",
					method: 'GET',
					data: {
						key:that.$TXMAPKEY,
						location:x+','+y
					},
					timeout: 6000,
					sslVerify: false,
					withCredentials: false,
					firstIpv4: false,
					success(res) {
						// console.log(res.data.result);
						// console.log(res.data.result.address);
						that.addressInfo = res.data.result
						that.standard_address = res.data.result.formatted_addresses.standard_address
					},
					fail(err) {
						
						uni.hideLoading();
						uni.showToast({
							title: '获取地址失败！',
							icon: 'error',
							mask: true,
							duration: 2000
						});
					},
					complete() {
						uni.hideLoading()
					},
				});
			},
		},
		
	}
</script>

<style lang="scss" scoped>
.input /deep/ .uni-input-input{
	font-size: 20px;
}
.input{
	padding: 30px 10px;
	box-sizing: border-box;
}
</style>
