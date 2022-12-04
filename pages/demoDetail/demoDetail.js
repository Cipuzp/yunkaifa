Page({
    data: {
        good: {},
        updateGoodPrice: ''
    },
    onLoad(options) {
        // console.log('onload this', this)
        // console.log('on options', options)
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
    checkNum(e) {
        // console.log('e',e)
        // let val = (!isNaN(e)) ? e.replace(/(^\s*)|(\s*$)/g, "") : null;
        // console.log('checkNum val', val);
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
        // console.log('val', val);
        return val
    },
    formSubmit(e) {
        // console.log('e.detail.value.updatePrice',e.detail.value.updatePrice)
        if (e.detail.value.updatePrice == '') {
            wx.showToast({
                title: '请输入商品价格',
                icon: 'error'
            })
        } else {
            // console.log('updatePrice this',this)
            // console.log('up options',this.options)
            // console.log('e.detail.value.updatePrice',e.detail.value.updatePrice)
            if (this.checkNum(e.detail.value.updatePrice) && this.checkNum(e.detail.value.updatePrice) == e.detail.value.updatePrice) {
                
                wx.cloud.database().collection('goods')
                    .doc(this.options.id)
                    .update({
                        data: {
                            price: this.checkNum(e.detail.value.updatePrice)
                        }
                    })
                    .then(res => {
                        // console.log('价格更新成功',res)

                        wx.cloud.database().collection('goods')
                            .doc(this.options.id)
                            .get()
                            .then(res => {
                                // console.log('updateGoodPrice',this.updateGoodPrice)
                                // console.log('商品详情页请求成功',res)
                                
                                this.setData({
                                    good: res.data,
                                })
                                // console.log('good', good)
                            })
                            .catch(err => {
                                // console.log('商品详情页请求失败', err)
                            })

                        wx.showToast({
                            title: '价格修改成功',
                        })

                        this.setData({
                            updateGoodPrice: ''
                        })
                    })
                    .catch(err => {
                        // console.log('价格更新失败', err)
                    })
            } else {
                wx.showModal({
                    title: '',
                    showCancel: false,
                    content: '价格只能为整数或「2位及以内小数点」的小数，请重新输入',
                    confirmText: '我知道了'
                })
                this.setData({
                    updateGoodPrice: ''
                })
            }
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