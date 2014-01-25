var twitter = require('twitter');
var bot     = require('./settings.js');

bot.stream('user', function(stream){
    stream.on('data', function(data){
        if(!('text' in data)) return;
        
        var twitterUserId   = data.user.screen_name;
        var statusId        = data.id_str;
        var isMention       = (data.in_reply_to_user_id !== null);
        var inputExpression = data.text.replace(/[^0-9+\-*/.\(\)]/g, '');
        
        if(!isMention || twitterUserId === bot.BOT_ID) return;
        if(inputExpression == "") return;

        var result = eval(inputExpression);
        var replyString = '@'+twitterUserId+' '+inputExpression+' = '+result;
        var params = {
            in_reply_to_status_id : statusId
        };
       
        bot.updateStatus(replyString, params, function(data){
            console.log('[TWEET] '+replyString+' // '+statusId);
        });
    });
});

console.log('[INFO] dentakuBot.js v0.0.2 READY ');
