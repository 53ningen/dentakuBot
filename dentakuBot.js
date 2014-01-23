var twitter = require('twitter');
var bot     = require('./settings.js');
var BOT_ID  = 'dentaku__Bot';

bot.stream('user', function(stream){
    stream.on('data', function(data){
        //Streaming APIからデータ受信時のイベント処理
        if(!('text' in data)) {
            console.error("[ERROR] INVARID DATA");
            return;
        }
        
        var twitterUserId   = data.user.screen_name;
        var isMention       = (data.in_reply_to_user_id !== null);
        var inputExpression = data.text.replace(/[^0-9+\-*/.\(\)]/g, '');
        
        if(!isMention || twitterUserId === BOT_ID) return;
        bot.updateStatus(
            '@'+twitterUserId+' '+inputExpression+' = '+eval(inputExpression), 
            function(err,data){
                if(err){
                    //tweet消去などのときに例外が発生する模様
                    //特に処理する必要がないと思われる
                    return;
                }
                console.log('[REPLY] @'+twitterUserId+' '+inputExpression+' = '+eval(inputExpression)); 
            });
    });
});

console.log("[INFO] READY...");
