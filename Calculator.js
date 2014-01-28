var Calculator = {
    /* Execute */ 
    run : function(str){ 
    var temp = str;
    temp = this.toSingleByteChars(temp);
    temp = this.removeUnevaluableChars(temp);
    return temp;
    },

    /* Parse Function */
    toSingleByteChars: function(str){
        var temp = str;
        temp =  temp.replace(/[＋|－|×|÷|＝|＊|／|（|）]/g,function(s){
            switch (s){
                case "＋": return "+";
                case "－": return "-";
                case "×": return "*";
                case "÷": return "/";
                case "＝": return "=";
                case "＊": return "*";
                case "／": return "/";
                case "）": return ")";
                case "（": return "(";
 
                default : break;
            }
        });
        temp = temp.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
           return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);   
        });
        return temp;
    },

    removeUnevaluableChars : function(str){
        return str.replace(/[^0-9+\-*/.\(\)]/g, '');
    }
}

module.exports = Calculator;
