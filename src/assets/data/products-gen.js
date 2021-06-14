[
  '{{repeat(100)}}',
  {
    id: '{{index() + 1}}',
    categoryId: '{{integer(1, 12)}}',
    name: function (tags) {
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
      return names[this.categoryId - 1] + ' ' + tags.company();
    },
    price: '{{integer(250000, 20000000)}}',
    img: 'assets/img/200px.png',
    saleDate: '{{date(new Date(2020, 1, 1), new Date(2021, 6, 1), "YYYY-MM-dd")}}',
    totalBuy: '{{integer(10, 500)}}',
    ratingScore: '{{floating(1.5, 5, 2)}}',
    brand: '{{random("Sharp", "Toshiba", "Panasonic", "Midea")}}',
    imgs: ['assets/img/570px-1.png', 'assets/img/570px-2.png', 'assets/img/570px-3.png'],
    ratingNumber: function (tags) {
      var rnd = Math.floor(Math.random() * (this.totalBuy - 0 + 1)) + 0;
      return this.totalBuy - rnd;
    },
    oldPrice: function (tags) {
      if (this.id % 2 === 0) {
        return 0;
      } else {
        var rnd = Math.floor(Math.random() * (this.price / 3 - 0 + 1)) + 0;
        return this.price + rnd;
      }
    },
    timeToDelivery: '2-5 ngày',
    status: 'còn hàng',
    quantity: '{{integer(10, 50)}}',
    description: '{{lorem(2, "paragraphs")}}'
  }
]