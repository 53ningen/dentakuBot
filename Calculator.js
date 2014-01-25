
var Calculator = {
    /* Execute */ 
    run : function(str){ 
    var temp = str;
    temp = this.toLowerCase(temp);
    temp = this.removeUnevaluableChars(temp);
    return temp;
    },

    /* Parse Function */
    toLowerCase : function(str){
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);   
        });                                                    
    },
    removeUnevaluableChars : function(str){
        return str.replace(/[^0-9+\-*/.\(\)]/g, '');
    }
}

module.exports = Calculator;
