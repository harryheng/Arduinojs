module.exports = function(app, express, Set) {
    console.log('module api');
    var router = express.Router();
    var set = new Set(["a", "b"]);
    console.log(set.toJSON());
    router.get('/', function(req, res) {
        res.json({
            message: 'hooray! welcome to our fpga api!'
        });
    });

    router.get('/device', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/device', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    app.use('/api', router);

}