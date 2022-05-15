export default {
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  loading: '加载中...',
  noCoupon: '暂无优惠券',
  nameEmpty: '请填写姓名',
  addContact: '添加联系人',
  telInvalid: '请填写正确的电话',
  vanCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: function monthTitle(year, month) {
      return year + "\u5E74" + month + "\u6708";
    },
    rangePrompt: function rangePrompt(maxRange) {
      return "\u6700\u591A\u9009\u62E9 " + maxRange + " \u5929";
    }
  },
  vanCascader: {
    select: '请选择'
  },
  vanPagination: {
    prev: '上一页',
    next: '下一页'
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...'
  },
  vanSubmitBar: {
    label: '合计:'
  },
  vanCoupon: {
    unlimited: '无门槛',
    discount: function discount(_discount) {
      return _discount + "\u6298";
    },
    condition: function condition(_condition) {
      return "\u6EE1" + _condition + "\u5143\u53EF\u7528";
    }
  },
  vanCouponCell: {
    title: '优惠券',
    count: function count(_count) {
      return _count + "\u5F20\u53EF\u7528";
    }
  },
  vanCouponList: {
    exchange: '兑换',
    close: '不使用',
    enable: '可用',
    disabled: '不可用',
    placeholder: '输入优惠码'
  },
  vanAddressEdit: {
    area: '地区',
    postal: '邮政编码',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    postalEmpty: '邮政编码不正确',
    addressDetail: '详细地址',
    defaultAddress: '设为默认收货地址'
  },
  vanAddressList: {
    add: '新增地址'
  }
};