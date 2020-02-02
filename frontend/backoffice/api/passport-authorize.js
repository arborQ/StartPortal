var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
const fs = require('fs');
const path = require('path');

var privateKey = fs.readFileSync(path.join(__dirname, '../cert/jwtRS256.key'), 'utf8');
// var publicKEY  = fs.readFileSync('../cert/jwtRS256.key.pub', 'utf8');

var jwtFromRequest = function (req) {
    if (req && req.headers) {
        var token = req.headers['authorization'];
        console.log( { token });
        return token;
    }

    return null;
};

var opts = {
    jwtFromRequest,
    secretOrKey: privateKey, 
    algorithms: [ 'RS256' ]
}
// opts.jwtFromRequest = headerExtractor;
// // opts.jwtFromRequest = ExtractJwt.fromHeader('Authorization');
// opts.secretOrKey = privateKey;
// opts.issuer = 'arbor@o2.pl';
// opts.audience = 'http://localhost:3000';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log({ jwt_payload });
    return done(null, { firstName: 'admin' });
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));

module.exports = passport.authenticate('jwt', { session: false });