let name = ''
let price = ''

Page({
    data: {
        list: []
    },
    onLoad() {},
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
        // console.log('详情',e.currentTarget.dataset.id)
        // console.log('详情',e)
    },
    getName(e) {
        name = e.detail.value
        // console.log('获取商品名',name)
        console.log('getName  e代表：',e)
    },
    getPrice(e) {
        price = e.detail.value
        // console.log('获取商品价格',price)
    },
    cleanInput() {
        var setName = {
            sendInfo: this.data.name
        }
        var setPrice = {
            sendInfo: this.data.price
        }
        this.setData(setName)
        this.setData(setPrice)
    },
    addGood(e) {
        // console.log('addGood  e代表：',e)

        if (name == '' && e.price != '') {
            wx.showToast({
                title: '请输入商品名称',
                icon: 'error'
            })
        } else if (price == '' && name != '') {
            wx.showToast({
                title: '请输入商品价格',
                icon: 'error'
            })
        } else if (name == '' && price == '') {
            wx.showModal({
                title: '',
                showCancel: false,
                content: '请输入商品名称和价格',
                confirmText: '我知道了'
            })
        } else {
            // console.log('keyile')
            wx.cloud.database().collection('goods')
                .add({
                    data: {
                        name,
                        price
                    }
                })
                .then(res => {
                    // console.log('成功')
                    this.getList();
                    wx.showToast({
                        title: '添加成功~',
                    })
                })
                .catch(err => {
                    // console.log('失败')
                })
        }
    },
    onShareAppMessage() {
        return {
            title: '一起添加商品吧~',
            imageUrl: '' // 图片 URL
        }
    }
})