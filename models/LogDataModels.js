const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LogDataSchema = new Schema({
    admin_log: []
})

const LogData = mongoose.model("log_data", LogDataSchema);
module.exports = { LogData }

