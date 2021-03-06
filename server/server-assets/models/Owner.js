var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var schemaName = 'Owner'
const SALT = 12
var ObjectId = Schema.Types.ObjectId

//geoLocation
var geoLocationSchema = new Schema({
  location:{
    lat: {type: Number, required:true, default: 43.6150},
    lng: {type: Number, requried:true, default: -116.2023}
  }
})
// Food Truck 
var foodtrucksSchema = new Schema({
  name: {type: String, required: true},
  businessName: {type: String, required: true},
  truckPic:{type: String},
  menu: {type: Array},
  hours: {type: String},
  cuisine: {type: String},
  // default location to their GPS location
  location: [geoLocationSchema],
  address: {type: String},
  city: {type: String},
  description: {type: String},
  rating: {type: String, required: true, default: 0},
  value:{type: String, required: true, default: 0},
  created:{type:Number, required: true, default: Date.now()},
  parentId: {type: ObjectId, ref:"Owner", required: true}
})

// Owner
var ownerSchema = new Schema({
  username: {type:String,required:true,unique:true},
  businessName: {type:String, required: true},
  email: {type:String,required: true,},
  password:{type:String,required:true},
  foodtrucks: [foodtrucksSchema],
  created:{type:Number, required: true, default: Date.now()}
})

ownerSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

ownerSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

ownerSchema.pre('save', function(next){
  this.markModified('foodtrucks')
  next()
})

module.exports = mongoose.model(schemaName, ownerSchema)