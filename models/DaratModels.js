const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DaratSchema = new Schema({
  no_sp: {
    type: Schema.Types.ObjectId,
    ref: "surat_pengiriman_datas"
  },
  identitas_armada: {
    type: String
  },
  nomor_kontrak: {
    type: String
  },
  ongkos_kirim_darat: {
    type: String
  },
  tanggal_eta: {
    type: Date
  },
  tanggal_etd: {
    type: Date
  },
  agen_dooring: {
    type: String
  },
  ongkos_dooring: {
    type: String
  },
  tanggal_diterima: {
    type: Date
  },
  nama_penerima: {
    type: String
  },
  ongkos_bongkar: {
    type: String
  },
  history_pengiriman: [],
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const DaratModels = mongoose.model("darat_datas", DaratSchema);
module.exports = { DaratModels }

