[
  '{{repeat(3)}}',
  {
    id: '{{index() + 1}}',
    username: '{{company().toLowerCase()}}',
    fullname: '{{firstName()}}' + ' ' + '{{surname()}}',
    email: '{{email()}}',
    phone: '{{phone()}}',
    gender: '{{gender() === "male" ? 0 : 1}}',
    address: '{{integer(1, 50)}}' + ' ' + '{{street()}}' + ', ' + '{{city()}}' + ', ' + '{{country()}}',
    password: 12345
  }
]