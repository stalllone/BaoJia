$(function(){
  setTimeout(function(){
    $(".top .txt").fadeIn(1500);
  },500);
  function back_p(){
      var height=$(".list_pro dt").height();
      $(".list_pro dt p").height(height);
  }
   back_p();
   $(window).resize(function(){
    back_p();
  });
    
    $(window).scroll(function(){
        var top=$(window).scrollTop();
        var height=$(".nav").innerHeight();
        if(top>height){
            $(".nav").addClass("on");
            $(".nav .menu span").addClass("on");
            $(".back_top2").show();
        }else{
          $(".nav ").removeClass("on");
          $(".nav .menu span").removeClass("on");
          $(".back_top2").hide();
        }
    });
    $(".menu").click(function(){
      $(".aside_mask").css("display","block");
      $(".aside").animate({
        right:0
      },500);
    });
    function aside_dis(){
      $(".aside").animate({
        right:"-300"
      },500,function(){
        $(".aside_mask").css("display","none");
      });
    }
    $(".aside_mask").click(function(){
      aside_dis();
    })
    function actmove_left(obj){
       $(document).scroll(function(){
         obj.each(function(){
           var win_height=$(window).height()*1.1;
           var scroll_t=$(window).scrollTop();
           var offset_t=$(this).offset().top;
           if(scroll_t+win_height>offset_t){
             obj.animate({
              width:"0"
             },2000);
             
           }
 
         })
       })
     }
     function actmove_right(obj){
       $(document).scroll(function(){
         obj.each(function(){
           var win_height=$(window).height()*1.1;
           var scroll_t=$(window).scrollTop();
           var offset_t=$(this).offset().top;
           if(scroll_t+win_height>offset_t){
             obj.animate({
              width:"0"
             },2000);
             
           }
 
         })
       })
     }

     actmove_left($(".line_left1"));
     actmove_right($(".line_right1"));
     actmove_left($(".line_left2"));
     actmove_right($(".line_right2"));
     actmove_left($(".line_left3"));
     actmove_right($(".line_right3"));
     actmove_left($(".line_left4"));
     actmove_right($(".line_right4"));
     actmove_left($(".line_left5"));
     actmove_right($(".line_right5"));


     $(".aside a").click(function(e){
      if(e.target.className=="home"){
        $("html,body").animate({
          scrollTop:0
        },1000);
        aside_dis();
      }else if(e.target.className=="industry"){
        $("html,body").animate({
          scrollTop:$(".solution").offset().top
        },1000);
        aside_dis();
      }else if(e.target.className=="s_service"){
        $("html,body").animate({
          scrollTop:$(".service").offset().top
        },1000);
        aside_dis();
      }else if(e.target.className=="hardware"){
        $("html,body").animate({
          scrollTop:$(".carEquirement").offset().top
        },1000);
        aside_dis();
      }else if(e.target.className=="operateCase"){
        $("html,body").animate({
          scrollTop:$(".caseOperate").offset().top
        },1000);
        aside_dis();
      }else if(e.target.className=="ContactUs"){
        $("html,body").animate({
          scrollTop:$(".Contact_us").offset().top
        },1000);
        aside_dis();
      }
     });
     $(".logo").click(function(){
      $("html,body").animate({
          scrollTop:0
        },1000);
     })

     $(".back_top").click(function(){
      $("html,body").animate({
            scrollTop:0
          },1000,function(){
            $(".back_top2").hide();
          })
     });
      
     

    
})