
dust.filters['time'] = function(a){
  //  console.log(a);
//    var date = $.datepicker.formatDate('dd.mm.yy', new Date(Date.parse(a)));
//    var date_short = $.datepicker.formatDate('d.m', new Date(Date.parse(a)));
//    var hours = (new Date(Date.parse(a))).getHours();
//    var minutes = (new Date(Date.parse(a))).getMinutes();
//    if(minutes < 10)
//        minutes = "0" + minutes;
//    var time = hours + ":" + minutes;
//
//    return date + " " + time;
    return a.format("default")
};
dust.filters['tt'] = function(a){
    var date= new Date(a.replace(" ","T"));
     date.setHours(date.getHours()-2);
  //  console.log(a);
    //  console.log(date);
    return date.format("default")
};
dust.filters['timestamp'] = function(a){
    var date= new Date(a.replace(" ","T"));
     date.setHours(date.getHours()-2);
    return date.getTime();
}
dust.filters['size_short'] = function(size){
    size=size.replace(/SIZE/g, '');
    switch(size)
    {
    case "LARGE": return "L";
    case "EXTRA EXTRA SMALL": return "XXS";
    case "MEDIUM": return "M";
    case "SMALL": return "S";
    case "EXTRA LARGE": return "XL";
    case "EXTRA SMALL": return "XS";

    default:
      return size
    }
}

dust.filters['color_short'] = function(color){
  if(color.length>17){
      return color.substring(0,15)+"...";
  }else{
      return  color;
  }
}

dust.filters['time_only'] = function(a){

    var hours = (new Date(Date.parse(a))).getHours();
    var minutes = (new Date(Date.parse(a))).getMinutes();
    if(minutes < 10)
        minutes = "0" + minutes;
    return hours + ":" + minutes;

};

dust.filters['round'] = function(num){
    return Math.round(num);
};

dust.filters['date'] = function(a){
    return $.datepicker.formatDate('dd.mm.yy', new Date(Date.parse(a)));
};

dust.filters['date_short'] = function(a){
    return $.datepicker.formatDate('d.m', new Date(Date.parse(a)));
};

dust.filters['length'] = function(arr) {
    return arr.length;
};

dust.filters['grade'] = function(grade) {
    return Math.round(grade * 100)/100;
};
dust.filters['price'] = function(price) {
    if(Math.round(price) ==price){
        return price
    }else{
       return (Math.round(price * 100) / 100).toFixed(2);  
    }
   
};

var tags_replace = {
    'b' : 'b',
    'i' : 'i',
    'u' : 'u',
    's': 's'
};

dust.filters['tags'] = function(text) {
    $.each(tags_replace,function(key,value) {
        text = text.replace(RegExp('\\[' + key + '\\]','g'),'<' + value + '>').replace(RegExp('\\[\\/' + key +  '\\]','g'),'</' + value + '>')
    });
    text = text.replace(/\[list\]/g,'<ul><li>').replace(/\[\/list\]/g,'</li></ul>');
    text = text.replace(/\[\*\]/g,'</li><li>').replace(/<ul><li>(.|\n)*?<\/li>/g,'<ul>');
    text = text.replace(/\[url(?:=([^\]]*))\]((?:.|\n)*)?\[\/url\]/,'<a href="$1" target="_blank">$2</a>')
    text = text.replace(/([^"]\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
    text = text//eplace(/\[url\]((?:.|\n)*)?\[\/url\]/,'<a href="$1" target="_blank">$1</a>')

    return text;
};



dust.renderArray = function(template,arr,callback,endCallback)
{
    var out_arr = [];
    var _err = null;
    for(var i=0; i<arr.length; i++)
    {
        dust.render(template,arr[i],function(err,out){
            if(callback)
                callback(err,out);
            if(err)
                _err = err;
            out_arr.push(out);
        });
    }
    if(endCallback)
        endCallback(_err,out_arr.join(''));
};