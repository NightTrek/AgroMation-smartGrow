const router = require('express').Router();
const GrowRoomController = require("../../controllers/GrowRoomController");

const passportService = require('../../services/passport');
const authMiddleware = require('../../middlewares/authMiddlewares');

// /api/c

router.route('/addroom')//uses Passport JWT as its auth method.
    .post(authMiddleware.requireAuth, GrowRoomController.addGrowRoom);

//gets grow rooms and their statuses
router.route('/getgrowrooms')//uses Passport JWT as its auth method.
    .post(authMiddleware.requireAuth, GrowRoomController.getGrowRoomsForUser);

router.route('/recent')
    .post(authMiddleware.requireAuth, GrowRoomController.getGrowRoomDataForID);



module.exports = router;
