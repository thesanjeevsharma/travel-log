const router = require('express').Router();

const Log = require('../models/log.model');

router.route('/')
  .get(async (req, res, next) => {
    try {
      const logs = await Log.find();
      res.json({
        message: 'Logs found!',
        data: {
          logs,
        },
      });
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const log = new Log(req.body);
      const createdLog = await log.save();
      res.json({
        message: 'Log added!',
        data: {
          log: createdLog,
        },
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(422);
      }
      next(error);
    }
  });

module.exports = router;
