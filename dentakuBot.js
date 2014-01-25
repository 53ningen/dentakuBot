var bot     = require('./settings.js');
var calc    = require('./Calculator.js');
var VERSION = '0.0.5';

bot.stream('user', function(stream){
    stream.on('data', function(data){
        //Guard: BOT was mentioned in this tweet?
        //Guard: Empty tweet?
        if(!new RegExp('@'+bot.BOT_ID+' ').test(data.text)) return;
        if(!('text' in data)) return;

        var twitterUserId   = data.user.screen_name;
        var statusId        = data.id_str;
        var isMention       = (data.in_reply_to_user_id !== null);
        //Guard: not to react self tweet
        if(!isMention || twitterUserId === bot.BOT_ID) return;
        
        //String formatting
        var inputExpression = calc.run(data.text);
        if(inputExpression == "") return;
        
        var result;
        try{
            result = eval(inputExpression);
        }
        catch(e){
            result = "[ERROR] Invalid Expression";
        }

        var replyString = '@'+twitterUserId+' '+inputExpression+' = '+result;
        var params = {
            in_reply_to_status_id : statusId
        };
       
        bot.updateStatus(replyString, params, function(data){
            console.log('[TWEET] '+replyString+' // '+statusId);
        });
    });
});

console.log('[INFO] dentakuBot.js v'+VERSION+' READY ');
