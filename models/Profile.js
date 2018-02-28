var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true },
    password: { type: String, default: '', trim: true }
  },
  { timestamps: true }
);

ProfileSchema.methods.summary = function() {
  var summary = {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    createdAt: this.createdAt
  };

  return summary;
};

module.exports = mongoose.model('ProfileSchema', ProfileSchema);
