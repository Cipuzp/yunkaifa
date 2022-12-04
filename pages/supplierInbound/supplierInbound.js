// pages/supplierInbound/supplierInbound.js
Page({

    data: {
        activeValues: [0],
        backTopTheme: 'round',
        backTopText: '顶部',
    },
    onLoad(options) {

    },
    handleChange(e) {
        this.setData({
            activeValues: e.detail.value,
        });
    }
})