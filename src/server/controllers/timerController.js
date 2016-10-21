var model = require('../model/models.js'),
    _ = require('lodash')    

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

function convert_ms_to_minutes(ms){
    return (ms / 1000) / 60.0
}

function format_labels(timings){
    return _.map(timings, (i) => i.startTime.toLocaleString()) 
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

        var chartData = { labels: format_labels(timings),
                          datasets: [{
                              data: _.map(timings, (i) => convert_ms_to_minutes(i.duration)),
                              backgroundColor: 'rgb(255, 0, 0, 0.2)',
                              borderColor: 'rgb(0, 255, 0, 0.2)',
                              borderWidth: 3
                          }]
                        }

        console.log("CHART DATA is")
        console.log(chartData)
        res.json(chartData)
    }
           )
}

