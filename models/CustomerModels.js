const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  customer_name: {
    type: String
  },
  customer_alamat: {
    type: String
  },
  customer_notlp: {
    type: String
  }
})

const CustomerData = mongoose.model("customer_datas", CustomerSchema);
module.exports = { CustomerData }

