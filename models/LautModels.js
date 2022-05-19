const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LautSchema = new Schema({
  no_sp: {
    type: Schema.Types.ObjectId,
    ref: "surat_pengiriman_datas"
  },
  nama_pelayaran: {
    type: String
  },
  ongkos_kirim: {
    type: String
  },
  nama_pelabuhan: {
    type: String
  },
  eta: {
    type: Date
  },
  etd: {
    type: Date
  },
  nama_agen: {
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
  tanggal_pengiriman: {
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
    updatedAt: "update_at"
  }
}
)

const LautModels = mongoose.model("laut_datas", LautSchema);
module.exports = { LautModels }

