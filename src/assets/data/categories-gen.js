[
  '{{repeat(12)}}',
  {
    id: '{{index() + 1}}',
    name: function (tags, index) {
      var names = [
        'Nồi cơm điện',
        'Lò nướng',
        'Quạt',
        'Bàn ủi',
        'Bếp điện từ',
        'Máy xay sinh tố',
        'Máy lọc nước',
        'Máy nước nóng',
        'Lò vi sóng',
        'Máy đánh trứng',
        'Máy hút bụi',
        'Máy sấy tóc'
      ];
      return names[index];
    },
    img: 'assets/img/50px.png'
  }
]