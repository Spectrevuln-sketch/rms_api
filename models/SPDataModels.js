const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SPSchema = new Schema({
  no_sp: {
    type: Number
  },
  no_spk: {
    type: Number
  },
  ops: {
    type: String
  },
  cosigne: {
    type: String
  },
  nama_barang: {
    type: String
  },
  jumlah_barang: {
    type: Number
  },
  satuan: {
    type: String
  },
  kg: {
    type: String
  },
  packing: {
    type: String
  },
  pickup: {
    type: String
  },
  tanggal_pickup: {
    type: Date
  },
  tujuan: {
    type: String
  },
  ops: {
    type: String
  },
  tempat_pickup: {
    type: String
  },
  optrational_name: {
    type: String
  },
  jenis_layanan: {
    type: String
  },
  satuan: {
    type: String
  },
  dead_line: {
    type: Date
  },
  tanggal_sp: {
    type: Date
  },
  pengiriman_via: {
    type: Schema.Types.ObjectId,
    ref: 'armada_datas'
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'customer_datas'
  },
  do_balik: {
    type: Date,
  },
  data_sp: {},
  history_tujuan: []

})

const SPModels = mongoose.model("surat_pengiriman_datas", SPSchema);
module.exports = { SPModels }

