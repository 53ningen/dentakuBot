var twitter = require('twitter');
var bot     = require('./settings.js');
var BOT_ID  = 'dentaku__Bot';

bot.stream('user', function(stream){
    stream.on('data', function(data){
        //Streaming APIからデータ受信時のイベント処理
        if(!('text' in data)) {
            //console.error("[ERROR] INVARID DATA");
            return;
        }
        
        var twitterUserId   = data.user.screen_name;
        var statusId        = data.id_str;
        var isMention       = (data.in_reply_to_user_id !== null);
        var inputExpression = data.text.replace(/[^0-9+\-*/.\(\)]/g, '');
        
        if(!isMention || twitterUserId === BOT_ID) return;
        if(inputExpression == "") return;

        var replyString = '@'+twitterUserId+' '+inputExpression+' = '+eval(inputExpression);
        var params = {
            in_reply_to_status_id : statusId
        };
       
        bot.updateStatus(replyString, params, function(data){
            console.log('[TWEET] '+replyString+' // '+statusId);
        });
    });
});

console.log('[INFO] dentakuBot.js v0.0.1 READY ');
