const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MasterArmada = [
  { via: "darat" },
  { via: "laut" },
  { via: "udara" }
]

var ArmadaSchema = new Schema({
  no_sp: [{
    type: Schema.Types.ObjectId,
    ref: "surat_pengiriman_datas"
  }],
  via: {
    type: String
  }
})

const ArmadaModels = mongoose.model("armada_datas", ArmadaSchema);

for (let i = 0; i < MasterArmada.length; i++) {
  const DataArmada = MasterArmada[i];
  ArmadaModels.findOne({ via: DataArmada.via })
    .then(results => {
      if (results === null) {

        let CreateNewArmada = new ArmadaModels({
          via: DataArmada.via
        })
        CreateNewArmada.save()
      }
    }).catch(err => {
      console.log(err)
    })
}


module.exports = { ArmadaModels }

