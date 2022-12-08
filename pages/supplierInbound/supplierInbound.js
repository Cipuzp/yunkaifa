// pages/supplierInbound/supplierInbound.js

// const order = ['scroll1', 'scroll2', 'scroll3', 'scroll4']

Page({

    data: {
        activeValues: [0],
        backTopTheme: 'round',
        backTopText: '顶部',
        originFiles: [

        ],
        originFiles2: [

        ],
        gridConfig: {
            column: 4,
            width: 160,
            height: 160,
        },
        gridConfig2: {
            column: 4,
            width: 160,
            height: 160,
        }
    },
    onLoad(options) {

    },
    formSubmit(e) {
        console.log(e)
    },
    onChange1(e) {
        console.log('radio', e.detail);
    },
    onChange2(e) {
        console.log('radio', e.detail);
    },
    handleChange(e) {
        console.log('handleChange', e);
    },

    handleSuccess(e) {
        const {
            files
        } = e.detail;
        this.setData({
            originFiles: files,
        });
    },
    handleRemove(e) {
        const {
            index
        } = e.detail;
        const {
            originFiles
        } = this.data;
        originFiles.splice(index, 1);
        this.setData({
            originFiles,
        });
    },
    handleClick(e) {
        console.log(e.detail.file);
    },

    handleSuccess2(e) {
        const {
            files
        } = e.detail;
        this.setData({
            originFiles2: files,
        });
    },
    handleRemove2(e) {
        const {
            index
        } = e.detail;
        const {
            originFiles2
        } = this.data;
        originFiles2.splice(index, 1);
        this.setData({
            originFiles2,
        });
    },
    handleClick2(e) {
        console.log(e.detail.file);
    }

})