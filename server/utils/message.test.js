var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate correct message object',() => {

        var from = "bhargav";
        var text = "message";
        var message = generateMessage(from,text);

        expect(message).toInclude({
            from,
            text
        });
        expect(message.createdAt).toBeA('number');

    });

});

describe('generateLocationMessage',() => {
    it('should generate correct location message',() => {
        var from = "admin";
        var lat = 1;
        var long = 1;
        var message = generateLocationMessage(from,lat,long);

        expect(message).toInclude({
            from,url
        });
        expect(message.createdAt).toBeA('number');
        expect(message.url).toBe('https://www.google.com/maps?q=1,1');
    });
})