var twitter = require('twitter');
var bot     = require('./settings.js');

bot.stream('user', function(stream){
    stream.on('data', function(data){
        //Guard: BOT was mentioned in this tweet?
        //Guard: Empty tweet?
        if(!new RegExp('@'+bot.BOT_ID+' ').test(data.text)) return;
        if(!('text' in data)) return;

        var twitterUserId   = data.user.screen_name;
        var statusId        = data.id_str;
        var isMention       = (data.in_reply_to_user_id !== null);
        var inputExpression;
        inputExpression = data.text;
        inputExpression = ToLowerCase(inputExpression);
        inputExpression = inputExpression.replace(/[^0-9+\-*/.\(\)]/g, '');
        
        
        if(!isMention || twitterUserId === bot.BOT_ID) return;
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

console.log('[INFO] dentakuBot.js v0.0.2 READY ');

ToLowerCase = function(str){
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
};
