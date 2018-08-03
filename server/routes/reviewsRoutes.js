const express           = require('express');
const router            = express.Router();
const Review            = require('../models/review');

// POST ROUTE FOR CREATING A NEW REVIEW (OF AN ORG OR AN EVENT)
router.post('/create', (req, res, next) => {
  let newReview = new Review ({
    author:     req.body.author,
    content:    req.body.content,
    eventID:    req.body.eventID,
    orgID:      req.body.orgID
  });
  newReview.save(error => {
    if(error)                  {res.status(400).json(error);} 
    else if(newReview.eventID) {res.redirect(307, `/api/events/${newReview.eventID}/addReview/${newReview._id}`)}
    else                       {res.redirect(307, `/api/orgs/${newReview.orgID}/addReview/${newReview._id}`)}
  });
});

// ---------------------------------------------------------------------------------------------------------

// POST ROUTE FOR UPDATING ONE REVIEW
router.post('/edit/:reviewID', (req, res, next) => {
    const reviewID = req.params.reviewID;
    if(!req.body.content || req.body.content === '') {res.status(400).json({message: 'Review content is required'}); return;}
    Review.findByIdAndUpdate(reviewID, req.body, {new: true}, (err, theReview) => {
        if(err)             {res.status(400).json(err)}
        else if(!theReview) {res.status(400).json({message: 'Review does not exist'})}
        else                {res.status(200).json(theReview)}
    });
});

// ---------------------------------------------------------------------------------------------------------

// POST ROUTE FOR DELETING ONE REVIEW
router.post('/delete/:reviewID', (req, res, next) => {
    const reviewID = req.params.reviewID;
    Review.findByIdAndRemove(reviewID, (err, theReview) => {
        if(err)             {res.status(400).json(err)}
        else if(!theReview) {res.status(400).json({message: 'Review does not exist'})}
        else                {res.status(200).json({message: 'Success'})}
    });
});

// ---------------------------------------------------------------------------------------------------------
  
// GET ROUTE FOR GETTING ONE REVIEW
router.get('/:reviewID', (req, res, next) => {
    const reviewID = req.params.reviewID;
    Review.findById(reviewID, (err, theReview) => {
    if(err)               {res.status(400).json(err)}
    else if (!theReview)  {res.status(400).json({message: 'Review does not exist'})}
    else                  {res.status(200).json(theReview)}
    });
});

module.exports = router;