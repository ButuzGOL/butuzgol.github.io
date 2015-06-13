
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

// CodeStar
(function($){
    $.fn.codeline=function(settings){
        this.settings=$.extend({},settings);
        var line=this.attr("class")+"_cline";
        $(this).find("li").each(function(){
            $(this).bind("line_trig",function(event,t){
                c_class=$(this).hasClass("current_page_item");
                v_class=$(this).hasClass("current_page_ancestor");
                s_class=$(this).hasClass("current-menu-ancestor");
                r_class=$(this).hasClass("current-page-item");
                if(c_class==true||v_class==true||s_class==true||r_class==true){
                    c_pos=$(this).position();
                    c_width=$(this).width();
                    if(t=="anime"){
                        jQuery("."+line).stop().animate({
                            "width":c_width,
                            "left":c_pos.left
                            },500,"easeOutExpo");
                     
                    }else{
                        jQuery("."+line).css({
                            "width":c_width,
                            "left":c_pos.left
                            });
                    }
                }
            });
        //$(this).trigger("line_trig");
        var that = this;
        setTimeout(function(){$(that).trigger("line_trig");},100);
    });
$(this).find("li").hover(function(){
    a_pad=20;
    a_pos=$(this).position();
    a_width=$(this).find("a").width()+a_pad;
    jQuery("."+line).stop().animate({
        "width":a_width,
        "left":a_pos.left
        },500,"easeOutExpo");
});
$(this).mouseleave(function(){
    $(this).find("li.current_page_item").trigger("line_trig",["anime"]);
    $(this).find("li.current-page-item").trigger("line_trig",["anime"]);
});


};
})(jQuery);