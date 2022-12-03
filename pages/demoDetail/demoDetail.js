let updatePrice = ''

Page({
    data: {
        good: {}
    },
    onLoad(options) {
        // console.log('onload this', this)
        console.log('on options', options)
        wx.cloud.database().collection('goods')
            .doc(options.id)
            .get()
            .then(res => {
                // console.log('商品详情页请求成功',res)
                this.setData({
                    good: res.data
                })
            })
            .catch(err => {
                // console.log('商品详情页请求失败', err)
            })
    },
    getUpdatePrice(e) {
        updatePrice = e.detail.value
        // console.log('更新价格输入成功', e.detail.value)
    },
    cleanInput() {
        var setUpdatePrice = {
            sendInfo: this.data.updatePrice
        }
        this.setData(setUpdatePrice)
    },
    updatePrice() {
        if (updatePrice == '') {
            wx.showModal({
                showCancel: false,
                content: '请输入商品价格',
                confirmText: '我知道了'
            })
        } else {
            // console.log('updatePrice this',this)
            // console.log('up options',this.options)

            wx.cloud.database().collection('goods')
                .doc(this.options.id)
                .update({
                    data: {
                        price: updatePrice
                    }
                })
                .then(res => {
                    // console.log('价格更新成功',res)
                    wx.cloud.database().collection('goods')
                        .doc(this.options.id)
                        .get()
                        .then(res => {
                            // console.log('商品详情页请求成功',res)
                            this.setData({
                                good: res.data
                            })
                        })
                        .catch(err => {
                            // console.log('商品详情页请求失败', err)
                        })

                    wx.showToast({
                        title: '价格修改成功',
                    })
                })
                .catch(err => {
                    // console.log('价格更新失败', err)
                })
        }
    },
    deleteGood() {
        wx.showModal({
            title: '确认删除此商品？',
            content: '删除后无法恢复，请谨慎操作',
            cancelText: '暂不删除',
            confirmText: '确认删除',
            confirmColor: '#FF0000',
            complete: (res) => {
                if (res.cancel) {
                    // console.log('暂不删除')
                }
                if (res.confirm) {
                    // console.log('确认删除')
                    console.log('删除 options', this.options)
                    wx.cloud.database().collection('goods')
                        .doc(this.options.id)
                        .remove()
                        .then(res => {
                            console.log('删除成功', res)
                        })
                        .catch(err => {
                            console.log('删除失败', err)
                        })
                    wx.showToast({
                        title: '已删除此商品',
                    })
                    wx.navigateBack({
                        url: '/pages/demo/demo',
                    })
                }
            }
        })
    }
})