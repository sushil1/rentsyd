var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema(
  {
    profile: { type: mongoose.Schema.Types.Mixed, default: {} },
    image: { type: String, default: '', trim: true },
    price: { type: String, default: '', trim: true },
    beds: { type: Number, default: 0 },
    bath: { type: Number, default: 0 },
    geo: {
      type: [Number],
      index: '2d'
    },
    carpark: { type: Number, default: 0 },
    description: { type: String, default: '', trim: true },
    address: {
      street: { type: String, default: '' },
      suburb: { type: String, default: '' },
      postcode: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

PostSchema.methods.summary = function() {
  var summary = {
    id: this._id.toString(),
    profile: this.profile,
    image: this.image,
    price: this.price,
    beds: this.beds,
    bath: this.bath,
    address: this.address,
    carpark: this.carpark,
    geo: this.geo,
    description: this.description,
    createdAt:this.createdAts
  };

  return summary;
};

module.exports = mongoose.model('PostSchema', PostSchema);
