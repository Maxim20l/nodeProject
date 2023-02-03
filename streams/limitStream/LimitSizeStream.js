const stream = require('stream');
const LimitExceededError = require('./LImitExceededError');

class LimitSizeStream extends stream.Transform {
    constructor({ limit }) {
        super()
        this.limit = limit,
        this.length = 0
    }
    _transform(chunk, encoding, callback) {
        this.length += chunk.length;
        if (this.length > this.limit) {
            callback(new LimitExceededError());
        } else if (this.length <= this.limit) {
            callback(null, chunk)    
        }
        
    }
}

module.exports = LimitSizeStream;