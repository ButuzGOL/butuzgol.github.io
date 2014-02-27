// Modernizr.load loading the right scripts only if you need them
Modernizr.load([
	{
    // Let's see if we need to load selectivizr
    test : Modernizr.borderradius,
    // Modernizr.load loads selectivizr for IE6-8
    nope : ['selectivizr-min.js']
	}
]);

/* imgsizer (flexible images for fluid sites) */
var imgSizer={Config:{imgCache:[],spacer:"/path/to/your/spacer.gif"},collate:function(aScope){var isOldIE=(document.all&&!window.opera&&!window.XDomainRequest)?1:0;if(isOldIE&&document.getElementsByTagName){var c=imgSizer;var imgCache=c.Config.imgCache;var images=(aScope&&aScope.length)?aScope:document.getElementsByTagName("img");for(var i=0;i<images.length;i++){images[i].origWidth=images[i].offsetWidth;images[i].origHeight=images[i].offsetHeight;imgCache.push(images[i]);c.ieAlpha(images[i]);images[i].style.width="100%";}
if(imgCache.length){c.resize(function(){for(var i=0;i<imgCache.length;i++){var ratio=(imgCache[i].offsetWidth/imgCache[i].origWidth);imgCache[i].style.height=(imgCache[i].origHeight*ratio)+"px";}});}}},ieAlpha:function(img){var c=imgSizer;if(img.oldSrc){img.src=img.oldSrc;}
var src=img.src;img.style.width=img.offsetWidth+"px";img.style.height=img.offsetHeight+"px";img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='scale')"
img.oldSrc=src;img.src=c.Config.spacer;},resize:function(func){var oldonresize=window.onresize;if(typeof window.onresize!='function'){window.onresize=func;}else{window.onresize=function(){if(oldonresize){oldonresize();}
func();}}}}

// as the page loads, cal these scripts
$(document).ready(function() {

	$("#social a, #social-mini a, #sun").hover(function() {
        $(this).animate({"opacity": "1"});
    }, function() {
        $(this).animate({"opacity": "0.7"});
    });
    
    $("#menu-main").codeline();
    
     
    $("#to_up").click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    
    if ($("#slider").length && $("#slider li").length > 3)
       $("#slider").bxSlider({
            displaySlideQty: 1,
            moveSlideQty: 1,
            controls: false,
            pager: true,
        });
    
    var paper_width_vertical = $("#ballons_vertical").width(),
        papar_height_vertical = $("#ballons_vertical").height(),
        paper_vertical = Raphael(document.getElementById("ballons_vertical"), paper_width_vertical, papar_height_vertical),
        
        paper_width_horizontal = $("#ballons_horizontal").width(),
        papar_height_horizontal = $("#ballons_horizontal").height(),
        paper_horizontal = Raphael(document.getElementById("ballons_horizontal"), paper_width_horizontal, papar_height_horizontal);
    
    var colors = new Array("#de4a6c-#a4737e", 
                           "#af5da4-#aa8aa6", 
                           "#92c841-#bfd69d",
                           "#f2ec2f-#fffc92",
                           "#7bb9d5-#6ed2ff",
                           "#ffa810-#ffdda1",
                           "#4efff0-#b8fff9",
                           "#FF3399-#FF99CC",
                           "#CCFF33-#CCFF66",
                           "#FF0066-#FF6699",
                           "#FF0033-#FF9999");
    
    var i, r, x, y, angle_gradient, color;
    
    for(i = 0; i < 15; ++i) {
        r = randomFromTo(10, 50);
        x = randomFromTo(r, paper_width_vertical - r);
        y = randomFromTo(r, papar_height_vertical - r);
        angle_gradient = randomFromTo(0, 320);
        color = randomFromTo(0, colors.length - 1);
                
        paper_vertical.circle(x, y, r)
             .attr({"stroke": 0, "fill": angle_gradient + "-" + colors[color], "fill-opacity": 0.5})
             .mousemove(function() { this.animate({"fill-opacity": 1}, 200); })
             .mouseout(function() { this.animate({"fill-opacity": 0.5}, 200); });
    }
    
    for(i = 0; i < 35; ++i) {
        r = randomFromTo(10, 50);
        x = randomFromTo(r, paper_width_horizontal - r);
        y = randomFromTo(r, papar_height_horizontal - r);
        angle_gradient = randomFromTo(0, 320);
        color = randomFromTo(0, colors.length - 1);
                
        paper_horizontal.circle(x, y, r)
             .attr({"stroke": 0, "fill": angle_gradient + "-" + colors[color], "fill-opacity": 0.5})
             .mousemove(function() { this.animate({"fill-opacity": 1}, 200); })
             .mouseout(function() { this.animate({"fill-opacity": 0.5}, 200); });
    }
   
    function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    }
    
    var degree = 0, elie = $("#logo-image a"), timer;
    elie.hover(function(){
        rotate();
    }, function() {
        clearTimeout(timer);
    });
    
    function rotate() { 
        var transform = "rotate(" + degree + "deg)";
        elie.css({
            transform: transform,
            WebkitTransform: transform,
            MozTransform: transform,
            "-ms-transform": transform
        })
        timer = setTimeout(function() {
            rotate(++degree);
        }, 10);
    }
}); /* end of as page load scripts */