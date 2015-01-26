var   mongoose = require('mongoose')
    , User = mongoose.model('User')
    , fs = require('fs');

// Get dashboard
exports.assets = function(req, res){
    User.findById(req.user.id, function (err, user) {
        return res.json(user.assets);
    });
}

exports.userCuota = function(req, res){
    User.findById(req.user.id, function (err, user) {
        cuota = {
                cuota_used : user.cuota_used,
                cuota : user.cuota
            };
        return res.json(cuota);
    });
}

exports.assetsDelete= function(req, res){
    User.findById(req.user.id, function (err, user) {
        fs.unlink(__dirname + '/../../public'+ user.assets.id(req.body.id).path, function (err) {
            tipo = user.assets.id(req.body.id).tipo.split('/')[0];
            if (tipo == 'image') {
                user.cuota_used = user.cuota_used - user.assets.id(req.body.id).size;
                user.assets.id(req.body.id).remove();
                user.save(function (err) {
                    res.status(200).send('OK');
                });
            } else {
                fs.unlink(__dirname + '/../../public' + user.assets.id(req.body.id).thumbnail, function (err) {
                    user.cuota_used = user.cuota_used - user.assets.id(req.body.id).size;
                    user.assets.id(req.body.id).remove();
                    user.save(function (err) {
                        res.status(200).send('OK');
                    });
                });
            }
        });
    });
}
