/**
 * Created by xiaohu on 2017/9/28.
 */
(function($){
    var Slide = function(ele, options){
        this._defaultOpt = {
            imgNo: 5
        };
        this.opts = $.extend({}, this._defaultOpt, options);
        this.$doc = $(document);
        this.$body = $("body");
        this.$ele = $(ele);
        this.$imgBox = this.$ele.children().eq(0);
        this.$imgList = null;
        this.$dotBox = this.$ele.children().eq(1);
        this.$dotList = null;
        this._init();
    };
    Slide.prototype = {
        constructor: Slide,
        _init: function(){
            
        },
        
    };
    $.fn.slide = function(options){
        return this.each(function(){
            var $this = $(this);
            var data = $this.data("slide");
            if(!data){
                $this.data("slide", new Slide(this, options));
            }
        });
    };
    $.fn.slide.constructor = Slide;
})(window.jQuery);