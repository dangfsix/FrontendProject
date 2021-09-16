[
  '{{repeat(150)}}',
  {
    commentId: '{{integer(1000000000, 9999999999)}}',
    productId: '{{integer(1, 100)}}',
    userId: '{{integer(1, 3)}}',
    date: '{{date(new Date(2018, 1, 1), new Date(), "YYYY-MM-dd")}}',
    ratingScore: '{{integer(1, 5)}}',
    commentText: '{{lorem(2, "sentences")}}'
  }
]