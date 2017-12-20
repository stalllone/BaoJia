$.extend({
    openHaiwiModal:function(div_id,options){
        var defaults={                         //距离顶部的高度
            overlay:0.5,                     //遮罩度
            closeClickOverlay:false,   //点击遮罩层是否自动关闭
            isDrag:true                       //弹出框高度
        };
        // $("#haiwi-modal-overlay_"+div_id).remove();
        var zIndex =10000+$(".haiwi-modal-overlay").length*2;
        defaults=$.extend(defaults,options);
        return $("#"+div_id).each(function(){
            var o=defaults;
            var modal_id="#" + div_id;
            var modal_title ="#" +  div_id + " .sub_pop_title";
            var modal_body = "#" + div_id + " .sub_pop_body";
            var modal_bottom = "#" + div_id + " .sub_pop_bottom";
            var modal_close = "#" + div_id+" .sub_pop_close";
            if($(modal_id).outerWidth()< o.width){
                $(modal_id).css({"width":o.width});
            }
            if($(modal_id).outerHeight()<o.height){
                $(modal_id).css({"height":o.height});
            }
            var modal_width=$(modal_id).outerWidth();
            var modal_height=$(modal_id).outerHeight();
            $(modal_id).fadeTo(200,1);
            if(o.isDrag){
                //点击标题头进行拖动对话框
                var _move=false;//移动标记
                var _x= 0,_y=0;
                $(modal_title).click(function(){
                }).mousedown(function(e){
                    _move=true;
                    _x=e.pageX-parseInt($(modal_id).css("left"));
                    _y=e.pageY-parseInt($(modal_id).css("top"));
                });
                $(document).mousemove(function(e){
                    if(_move){
                        var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
                        x=x<0 ? 0 : x;
                        var y=e.pageY-_y;
                        y=y<0 ? 0 : y;
                        y=y>$(window).height()-20 ? $(window).height()-20 : y;
                        $(modal_id).css({top:y,left:x});//控件新位置
                    }
                }).mouseup(function(){
                    _move=false;
                });
            }

            // if($(modal_id).height() + o.top>$(window).height()){
            //     $(modal_id).css({"top":0});
            // }
            // if($(modal_id).height()>$(window).height()){
            //     $(modal_id).css({"height":$(window).height()-20,"top":10});
            // }
            // if($(modal_title).length==0){
            //     $(modal_body).css({"top":0});
            // }
            // if($(modal_bottom).length==0){
            //     $(modal_body).css({"bottom":0});
            // }
            if(o.closeClickOverlay){
                $("#haiwi_overlay").click(function(){
                    $.closeHaiwiModal(div_id);
                });
            }
            $(modal_close).click(function(){
                $.closeHaiwiModal(div_id);
            });
        });
    },
    closeHaiwiModal:function(div_id){
        $("#"+div_id).css({"display":"none"});
        
    }
});