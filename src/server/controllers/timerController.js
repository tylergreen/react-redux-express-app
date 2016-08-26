var model = require('../model/models.js')

module.exports.record = function(req, res) {
    console.log("REQ IS")
    console.log(req)
    console.log("RESP")
    console.log(res)
    var newTimeRecord = {
        UserId: req.user.id,
        label: req.body.label,
        startTime: req.body.startTime,
        duration: req.body.duration
    }

    model.TimeRecord.create(newTimeRecord).then((timeRecord) => {
        res.send('OK')
    })
}

module.exports.timings = function(req, res) {
    // get all timings with from user with label
    model.TimeRecord.findAll({
        where: {
            UserId: req.user.id,
            label: req.body.label
        }
    }).then((timings) => {
        console.log("timings")
        console.log(timings)
        res.json(timings)
    }
           )
}
