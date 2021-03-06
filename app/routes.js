var QCRequest = require('./models/qcrequest');

module.exports = function(app) {

    // server routes ===========================================================

    // Get all QCRequests that are not completed
    app.get('/api/qcrequests', function(req, res) {
        // use mongoose to get all requests in the database
        QCRequest.find({ 'completed' : false }).limit(50).exec(function(err, requests) {
            if (err == null) {
                res.status(200).json(requests);
            } else {
                return next(err);
            }
        });
    });

    // Create a new QCRequest
    app.post('/api/qcrequests', function(req, res) {
        var name = req.body.name;
        var netID = req.body.netID;
        var location = req.body.location;
        var notes = req.body.notes;

        var newRequest = new QCRequest({
            name: name,
            netID: netID,
            location: location,
            notes: notes,
            completed : false,
        });

        newRequest.save(function (err, savedRequest) {
            if (err) res.send(err);

            //send the OK, QCRequest created
            res.status(201).json(JSON.stringify(savedRequest));
        })
    });


    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)


    // frontend routes =========================================================
    // By default, GET <path> returns the file with path /public/<path>
    // GET / returns index.html (default behavior)
    app.get('/manageRequests', function(req, res, next) {res.sendfile(__dirname + '/public/manageRequests.html');});
    app.get('/track', function(req, res, next) {res.sendfile(__dirname + '/public/student.html');});
};
