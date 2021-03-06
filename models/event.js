const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const timestamps    = require('mongoose-timestamp');

const eventSchema = new Schema({
  participants:[{
    user:         {type: Schema.Types.ObjectId, ref: 'User'},
    role:         {type: String, enum: ['organizer', 'sponsor', 'performer', 'staff', 'security']}
  }], 
  organization:   {type: Schema.Types.ObjectId, ref: 'Organization',  required: true}, 
  name:           {type: String,                                      required: true, unique: true},
  type:           {type: String,                                      required: true},
  location:       {type: String,                                      required: true},
  startTime:      {type: Date,                                        required: true},
  endTime:        {type: Date,                                        required: true},
  status:         {type: String, enum: ['confirmed', 'pending', 'cancelled'],default: 'pending'},
  pictures:       [{type: String}],
  reviews:        [{type: Schema.Types.ObjectId, ref: 'Review'}],
  mainPhoto:      {type: String, default: '/assets/images/event_placeholder.png'}
});
eventSchema.plugin(timestamps);
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;