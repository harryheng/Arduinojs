module.exports = function(app, logger, io, db, argv) {
    var fs = require("fs");
    var express = require('express');
    var router = express.Router();
    var fpga = new Object;
    fpga.led = function(id, r, b, g) {
        logger.info("led on");
    };
    fpga.add = function(a, b) {
        return (a + b)
    };
    fpga.sleep = function(i) {
        logger.info("sleep")
    };
    fpga.fpga_open = function() {
        logger.info("open fpga")
    };
    logger.info("Initial fpga module");

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


    router.get('/memory', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/memory', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.get('/config', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/config', function(req, res) {
        res.json({
            message: 'Write file success'
        });
    });

    router.get('/api/list/', function(req, res) {
        var method = [];
        for (m in fpga) {
            method.push(m.toString);
        }
        req.json({
            "method": method
        });
    });

    router.get('/api/list/:method', function(req, res) {
        var method = req.params.method;
        if (fpga[method]) {
            req.json({
                "method": fpga[method]
            });
        }
    });

    router.post('/api/call/:method', function(req, res) {
        var method = req.params.method;
        var paramter = req.body;
        fpga.fpga_open();
        switch (paramter.length) {
            case 0:
                fpga[method]();
                break;
            case 1:
                fpga[method](paramter[0]);
                break;
            case 2:
                fpga[method](paramter[0], paramter[1]);
                break;
            case 3:
                fpga[method](paramter[0], paramter[1], paramter[2]);
                break;
            case 4:
                fpga[method](paramter[0], paramter[1], paramter[2], paramter[3]);
                break;
            case 5:
                fpga[method](paramter[0], paramter[1], paramter[2], paramter[3], paramter[4]);
                break;
            case 6:
                fpga[method](paramter[0], paramter[1], paramter[2], paramter[3], paramter[4], paramter[5]);
                break;
            case 7:
                fpga[method](paramter[0], paramter[1], paramter[2], paramter[3], paramter[4], paramter[5], paramter[6]);
                break;
            case 8:
                fpga[method](paramter[0], paramter[1], paramter[2], paramter[3], paramter[4], paramter[5], paramter[6], paramter[7]);
                break;
            default:
                logger.error("too manay arguments");
        }
        logger.info("method is " + method);
        res.json({
            message: 'hooray! welcome to our api!'
        });
        fpga.fpga_close();
    });


    io.sockets.on('connection', function(socket) {
        socket.emit('news', {
            hello: 'world'
        });
        socket.on('my other event', function(data) {
            console.log(data);
        });
    });

    app.use('/fpga', router);

}