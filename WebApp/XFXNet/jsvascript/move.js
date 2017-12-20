//运动函数
function startMove(obj,iTarget,attr,fn){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var cur=0;
        if(attr=="opacity"){
            cur=parseFloat(getStyle(obj,attr))*100;  //0.3  30
            speed=(iTarget-cur)/20;
        }else{
            cur=parseInt(getStyle(obj,attr));
            speed=(iTarget-cur)/8;
        }

        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        if(cur==iTarget){
            clearInterval(obj.timer);
            if(fn) fn()
        }else{
            if(attr=="opacity"){
                obj.style[attr]=(cur+speed)/100;
            }else{
                obj.style[attr]=cur+speed+"px";
            }

        }
    },30)
}
//获取非行内样式函数
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}