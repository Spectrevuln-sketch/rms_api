const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UdaraSchema = new Schema({
  no_sp: {
    type: Schema.Types.ObjectId,
    ref: "surat_pengiriman_datas"
  },
  nama_vendor: {
    type: String
  },
  nomor_smu: {
    type: String
  },
  ongkos_kirim: {
    type: String
  },
  nama_bandara: {
    type: String
  },
  tanggal_eta: {
    type: Date
  },
  tanggal_etd: {
    type: Date
  },
  nama_agen: {
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

const UdaraModels = mongoose.model("udara_datas", UdaraSchema);
module.exports = { UdaraModels }

