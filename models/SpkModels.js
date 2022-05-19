const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SpkSchema = new Schema({
  no_sp: {
    type: Schema.Types.ObjectId,
    ref: 'surat_pengiriman_datas'
  },
  no_spk: {
    type: String,
  },
  pengiriman: {
    type: String,
  },
  pengambilan: {
    type: String,
  },
  no_sj: {
    type: String,
  },
  koli_jenis: {
    type: String,
  },
  kg: {
    type: String,
  },
  jenis_layanan: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  jenis_armada: {
    type: Schema.Types.ObjectId,
    ref: 'armada_datas'
  },
  dikirim_melalui: {
    type: String,
  },
  biaya_kirim: {
    type: String,
  },
  etd: {
    type: String,
  },
  eta: {
    type: String,
  },
  status: {
    type: String,
  },
  tanggal_diterima: {
    type: String,
  },
  nama_penerima: {
    type: String,
  },
  do_balik: {
    type: String,
  },
  
})

const SpkModels = mongoose.model("spk_datas", SpkSchema);
module.exports = { SpkModels }

