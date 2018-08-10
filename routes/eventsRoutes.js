const express           = require('express');
const router            = express.Router();
const Event             = require('../models/event');
const Organization      = require('../models/organization');
const User              = require('../models/user');

// POST ROUTE FOR CREATING A NEW EVENT
router.post('/create/:orgId', (req, res, next) => {
  let newEvent = new Event({
    organization: req.params.orgId,
    name:         req.body.name,
    type:         req.body.type,
    location:     req.body.location,
    startTime:    new Date(req.body.startTime),
    endTime:      new Date(req.body.endTime),
    mainPhoto:    req.body.mainPhoto,
    status:       req.body.status,
    pictures:     [],
    reviews:      [],
    participants: []
  });
  // Validate fields
  if(!newEvent.name      || newEvent.name      === '') {res.status(400).json({message: 'The event name is required'       }); return}
  if(!newEvent.type      || newEvent.type      === '') {res.status(400).json({message: 'The event type is required'       }); return}
  if(!newEvent.location  || newEvent.location  === '') {res.status(400).json({message: 'The event location is required'   }); return}
  if(!newEvent.startTime || newEvent.startTime === '') {res.status(400).json({message: 'The event start time is required' }); return}
  if(!newEvent.endTime   || newEvent.endTime   === '') {res.status(400).json({message: 'The event end time is required'   }); return}
  if(!newEvent.status    || newEvent.status    === '') {res.status(400).json({message: 'The event status is required'     }); return}
  // Save new event to DB
  newEvent.save((err, event) => {
    if(err)           {res.status(400).json(err)}
    else if(!event)   {res.status(400).json({message: 'Unable to create event'})}
    else              {
      Organization.findByIdAndUpdate(req.params.orgId, {$push: {events: event._id}}, (err, org) => {
        if(err)       {res.status(400).json(err)}
        else if(!org) {res.status(400).json({message: 'Organization not found'})}
        else          {res.status(200).json(event)}
      });
    }
  });
});

// ---------------------------------------------------------------------------------------------------------

// GET ROUTE FOR GETTING ALL EVENTS
router.get('/', (req, res, next) => {
  Event.find((err, events) => {
    if(err)           {res.status(400).json(err)}
    else              {res.status(200).json(events)};
  })
});

// ---------------------------------------------------------------------------------------------------------

// POST ROUTE FOR UPDATING ONE EVENT
router.post('/:id/update', (req, res, next) => {
  // Create new object to add updates
  let updatedEvent = {};
  // Validate fields that will be updated
  if(req.body.name         !== undefined) {updatedEvent.name         = req.body.name         }
  if(req.body.type         !== undefined) {updatedEvent.type         = req.body.type         }
  if(req.body.location     !== undefined) {updatedEvent.location     = req.body.location     }
  if(req.body.startTime    !== undefined) {updatedEvent.startTime    = req.body.startTime    }
  if(req.body.endTime      !== undefined) {updatedEvent.endTime      = req.body.endTime      }
  if(req.body.status       !== undefined) {updatedEvent.status       = req.body.status       }
  if(req.body.organization !== undefined) {updatedEvent.organization = req.body.organization }
  // Save updated event
  Event.findByIdAndUpdate({_id: req.params.id}, updatedEvent, {new: true}, (err, event) => {
    if(err)           {res.status(400).json(err)}
    else              {res.status(200).json(event)}
  }); 
});

// ---------------------------------------------------------------------------------------------------------

// POST ROUTE FOR ADDING PARTICIPANTS
router.post('/:id/addParticipants', (req, res, next) => {
  let participants = req.body.participants;
  Event.findByIdAndUpdate(req.params.id, {$push: {participants: {$each: participants}}}, {new:true}, (err, event) => {
    if(err) {res.status(400).json(err)}
    else    {
      let users = req.body.participants.map(u => {return u.user})
      User.updateMany({_id: {$in: users}}, {$push: {events: event._id}}, (err, conf) => {
        if(err)        {res.status(400).json(err)}
        else if(!conf) {res.status(400).json({message: 'Something went wrong!'})}
        else           {res.status(200).json(conf)}
      })
    }
  })
});

// ---------------------------------------------------------------------------------------------------------

// POST ROUTE FOR ADDING REVIEWS
router.post('/:id/addReview/:reviewId', (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, {$push: {reviews: req.params.reviewId}}, {new:true}, (err, conf) => {
    if(err)           {res.status(400).json(err)}
    else              {res.status(200).json(conf)}
  });
});

// POST ROUTE FOR REMOVING REVIEWS
router.post('/:id/addReview/:reviewId', (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, {$push: {reviews: req.params.reviewId}}, {new:true}, (err, conf) => {
    if(err)           {res.status(400).json(err)}
    else              {res.status(200).json(conf)}
  });
});

// ---------------------------------------------------------------------------------------------------------

// POST ROUTE FOR DELETING ONE EVENT
router.post('/:id/delete', (req, res, next) => {
  // Save updated event
  Event.findByIdAndUpdate({_id: req.params.id}, {status: 'cancelled'}, {new: true}, (err, event) => {
    if(err)           {res.status(400).json(err)}
    else              {res.status(200).json(event)}
  }); 
});

// ---------------------------------------------------------------------------------------------------------
  
// GET ROUTE FOR GETTING ONE EVENT
router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id, (err, events) => {
    if(err)           {res.status(400).json(err)}
    else              {res.status(200).json(events)}
  });
});


module.exports = router;