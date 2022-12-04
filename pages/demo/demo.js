Page({
    data: {
        list: [],
        goodName: '',
        goodPrice: '',
        openid: ''
    },
    onLoad() {

    },
    onShow() {
        this.getList();
    },
    getList() {
        wx.cloud.database().collection('goods')
            .get()
            .then(res => {
                this.setData({
                    list: res.data
                })
                // console.log('商品列表请求成功', res)
            })
            .catch(err => {
                // console.log('商品列表请求失败', err)
            })
    },
    goDetail(e) {
        wx.navigateTo({
            url: '/pages/demoDetail/demoDetail?id=' + e.currentTarget.dataset.id,
        })
    },
    checkNum(e) {
        let val = e.replace(/(^\s*)|(\s*$)/g, "")
        if (!val) {
            return ''
        }
        var reg = /[^\d.]/g
        // 只能是数字和小数点，不能是其他输入
        val = val.replace(reg, "")
        // // 保证第一位只能是数字，不能是点
        val = val.replace(/^\./g, "");
        // // 小数只能出现1位
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        // // 小数点后面保留2位
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        console.log('val', val);
        return val
    },
    formSubmit(e) {
        // console.log(e.detail.value.good)
        if (e.detail.value.good == '') {
            wx.showToast({
                title: '请输入商品名称',
                icon: 'error'
            })
        } else if (e.detail.value.price == '') {
            wx.showToast({
                title: '请输入商品价格',
                icon: 'error'
            })
        } else if (e.detail.value.good == '' && e.detail.value.price == '') {
            wx.showModal({
                title: '',
                showCancel: false,
                content: '请输入商品名称和价格',
                confirmText: '我知道了'
            })
        } else {
            if (this.checkNum(e.detail.value.price) && this.checkNum(e.detail.value.price) == e.detail.value.price) {
                // console.log('keyile')
                wx.cloud.database().collection('goods')
                    .add({
                        data: {
                            name: e.detail.value.good,
                            price: this.checkNum(e.detail.value.price)
                        }
                    })
                    .then(res => {
                        // console.log('成功')
                        this.getList();
                        wx.showToast({
                            title: '添加成功~',
                        })
                        // this.onLoad()
                        this.setData({
                            goodName: '',
                            goodPrice: ''

                        })
                    })
                    .catch(err => {
                        // console.log('失败')
                    })
            } else {
                wx.showModal({
                    title: '',
                    showCancel: false,
                    content: '价格只能为整数或「2位及以内小数点」的小数，请重新输入',
                    confirmText: '我知道了'
                })
                this.setData({
                    goodPrice: ''
                })

            }

        }
    },
    onShareAppMessage() {
        return {
            title: '一起添加商品吧~',
            imageUrl: '' // 图片 URL
        }
    }
})