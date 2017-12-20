var mo=function(e){e.preventDefault();};
        function stop(){
                document.body.style.overflow='hidden';        
                document.addEventListener("touchmove",mo,false);//禁止页面滑动
        }
        function move(){
                document.body.style.overflow='';//出现滚动条
                document.removeEventListener("touchmove",mo,false);        
        }