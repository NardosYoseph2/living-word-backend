const express = require('express');
const router = express.Router();
const passport= require("../middleware/passport")

const eventController = require('../controllers/event_controllers');

router.post('/create',passport.authenticate('jwt', { session: false }),eventController.createEvent);
router.get('/allEvents', eventController.fetchEvent);
router.post('/event',passport.authenticate('jwt', { session: false }),eventController.fetchEventbyID);
router.get('/search',passport.authenticate('jwt', { session: false }),eventController.searchEvent);
router.post('/delete',passport.authenticate('jwt', { session: false }),eventController.deleteEvent);


module.exports = router;