module.exports = function(app, router, logger) {
    logger.info('module cide');
    var fork = require('child_process').fork;
    var c,fpga;

    router.get('/', function(req, res) {
        res.json({
            cide: '/c/',
            fpgadesign: '/c/'
        });
    });

    router.get('/c/start', function(req, res) {
        c = fork('../ArduinoIDE/server.js',['']);
        res.json({
            message: 'start the c ide!'
        });
    });

    router.get('/c/stop', function(req, res) {
        c.kill('SIGHUP');
        res.json({
            message: 'stop the c ide!!'
        });
    });

    router.get('/fpga/start', function(req, res) {
        fpga = fork('../FPGAdesigner/server.js',['']);
        res.json({
            message: 'start the fpga ide!'
        });
    });

    router.get('/fpga/stop', function(req, res) {
        fpga.kill('SIGHUP');
        res.json({
            message: 'stop the fpga ide!!'
        });
    });

    app.use('/ide', router);

}
