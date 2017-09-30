/**
 * Created by xiaohu on 2017/9/28.
 */
(function($){
    var Slide = function(ele, options){
        this._defaultOpt = {
            percent: "%",
            dotCls: "dot",
            activeCls: "active",
            ml10Cls: "ml10",
            timeGap: 3000,
            clickGap: 1000,
            animateTime: 400
        };
        this.opts = $.extend({}, this._defaultOpt, options);
        this.$ele = $(ele);
        this.$imgBox = this.$ele.children().eq(0);
        this.$imgList = this.$imgBox.children();
        this.imgNo = this.$imgList.length;
        this.$dotBox = this.$ele.children().eq(1);
        this.$dotList = null;
        this.curNo = 0;
        this.timer = null;
        this.clickTimer = null;
        this._init();
    };
    Slide.prototype = {
        constructor: Slide,
        _init: function(){
            this.renderImgBox();
            this.renderDotBox();
            this.slideInit();
            this.autoSlide();
            this.bindEvents();
        },
        bindEvents: function(){
            this.$dotBox.on("click", $.proxy(this.dotClick, this));
        },
        dotClick: function(e){
            if(this.clickTimer){
                window.clearTimeout(this.clickTimer);
                this.clickTimer = null;
            }
            if(this.timer){
                window.clearInterval(this.timer);
                this.timer = null;
            }
            var $li = $(e.target);
            var idx = $li.index();
            this.dotToggleActive(false);
            this.curNo = idx;
            this.slideInit();
            this.clickTimer = window.setTimeout($.proxy(this.autoSlide, this), this.opts.clickGap);
        },
        renderImgBox: function(){
            this.$imgBox.css({width: (this.imgNo * 100) + this.opts.percent});
            this.$imgList.css({width: (100 / this.imgNo).toFixed(5) + this.opts.percent});
        },
        renderDotBox: function(){
            this.$dotBox.append(this.dotDom());
            this.$dotList = this.$dotBox.children();
            this.dotStyle();
        },
        dotDom: function(){
            //dot string
            var liStr = "";
            for(var i = 0; i < this.imgNo; i++){
                var ml10 = i == 0 ? "" : " " + this.opts.ml10Cls;
                liStr += "<li class='"+this.opts.dotCls+ ml10 +"'></li>";
            }
            return liStr;
        },
        dotStyle: function(){
            var width = this.$dotBox.width();
            this.$dotBox.css({marginLeft: -width/2 + "px"});
        },
        slideInit: function(){
            this.$ele.attr("slide-page", this.curNo);
            this.$imgBox.animate({"margin-left": -(this.curNo * 100) + "" +this.opts.percent}, this.opts.animateTime);
            this.dotToggleActive(true);
        },
        dotToggleActive: function(flag){
            if(flag){
                this.$dotList.eq(this.curNo).addClass("active");
            }else{
                this.$dotList.eq(this.curNo).removeClass("active");
            }
        },
        autoSlide: function(){
            this.timer = window.setInterval($.proxy(this.autoGo, this), this.opts.timeGap);
        },
        autoGo: function(){
            this.dotToggleActive(false);
            this.recordNo();
            this.slideInit();
        },
        recordNo: function(){
            this.curNo++;
            if(this.curNo == this.imgNo){
                this.curNo = 0;
            }
        }
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