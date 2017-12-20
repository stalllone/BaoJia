 $(function() {
     var viewHeight = $(window).height() - $("#header").innerHeight();
     $(".sysScroll").css({
         "height": viewHeight,
     });
     $(".left").css({
         "min-height": viewHeight,
         "top": $(".header").innerHeight()
     })
     $(".right").css({
         "height": viewHeight,
         "top": $(".header").innerHeight()
     })
     $(".curCont").css({
         "height": viewHeight
     })
     menuAct.init();
     document.addEventListener('touchmove', function(e) {
         e.preventDefault();
     }, false);
     
 })

 var menuAct = {
     curTree: null,
     curMenu: {},
     init: function() {
         menuAct.initDom();
     },
     initAct: function() {
         $(".togg").bind('click', function() {
             if ($(".cont").hasClass('cont2')) {
                 $(".cont").removeClass('cont2');
                 $(this).find("div").addClass('line')
             } else {
                 $(".cont").addClass('cont2');
                 $(this).find("div").removeClass('line')
             }
         })

         $(".menuList").click(function(e) {
             if (e.target.tagName == "SPAN") {
                 var objMenu = $(e.target).parents(".menu");
                 menuAct.menuOpen($(objMenu[0]));
             }
             if (e.target.tagName == "P") {
                 var objMenu = $(e.target).parents(".menu");
                 menuAct.menuOpen($(objMenu[0]));
             }
             if (e.target.tagName == "A") {
                 //menuAct.initMenu($(e.target));
                 var obj = $(e.target);
                 var menuId = obj.parent().attr("menuId");
                 var title = obj.parent().find("b").text();
                 menuAct.initMenu(menuId, title);
             }

             if (e.target.tagName == "I") {
                 var obj = $(e.target).parent();
                 var menuId = obj.parent().attr("menuId");
                 var title = obj.parent().find("b").text();
                 menuAct.initMenu(menuId, title);
             }
         });
         $(".curMenu .menuAct").click(function(e) {
             var obj = $(e.target).parents(".right");
             if (obj.hasClass('on')) {
                 obj.removeClass('on');
             } else {
                 obj.addClass('on');
             }
         });

         $(".curMenu").click(function(e) {
             if (e.target.tagName == "A") {
                 $(".curMenu a.on").removeClass('on');
                 $(e.target).addClass('on');
             }
         });
         //菜单做 Scroll 处理
         new IScroll('#menuWrapper', {
             // mouseWheel: true,
             click: false
         });
     },
     initDom: function() {
         $.ajax({
             url: '/getmenu',
             type: 'post',
             dataType: 'json',
             success: function(data) {
                 if (!data.result) {
                     alert(data.message);
                     return;
                 }
                 var urlHash = window.location.hash;
                 var iscur = false;
                 menuAct.curTree = data.data;
                 if (menuAct.curTree.length > 0) {
                     var strli = '<li><span><i class="icon {0}"></i><b>{1}</b></span><a href="javascript:void(0);">{1}</a></li>';
                     for (var i = 0, len = menuAct.curTree.length; i < len; i++) {
                         var obj = menuAct.curTree[i];
                         var $menu = $('<div class="menu cl"><span class="first"><b>' + obj.name + '</b></span><div><p>' + obj.name + '</p><ul></ul></div></div>');
                         var str = "",
                             iscurMenu = false;
                         $.each(obj.children, function(i, d) {
                             if (d.children && d.children.length > 0) {
                                 menuAct.curMenu[d.id] = d.children;
                                 if (!iscur && urlHash && urlHash !== "") {
                                     for (var j = 0, len1 = d.children.length; j < len1; j++) {
                                         if (d.children[j].url == urlHash) {
                                             $menu.find('.first').addClass('on');
                                             $menu.find('p').addClass('on');
                                             menuAct.initMenu(d.id, d.name, urlHash);
                                             iscurMenu = true
                                             iscur = true;
                                             break;
                                         }
                                     };
                                 }
                                 str += ('<li menuId="' + d.id + '"><span><i class="icon ' + "homediscripe" + '"></i><b>' + d.name + '</b></span><a href="javascript:void(0);">' + d.name + '</a></li>')
                             }
                         })
                         $menu.find('ul').html(str);
                         $(".menuList").append($menu);
                     };
                     menuAct.initAct();
                 }
             }
         });
     },
     initLi: function() {
         var obj = $(".left .cur");
         if (obj.length == 0) return;
         var objMenu = obj.parents(".menu");
         menuAct.menuOpen($(objMenu[0]));
     },
     menuOpen: function(menu) {
         if (!menu) return;
         $(".left ul").slideUp();
         $(".left .on").removeClass('on');
         var objul = menu.find('ul');
         if (!objul.is(':visible')) {
             objul.slideDown();
             menu.find("p").addClass('on');
             menu.find("span").addClass('on');
             $(".curscroller").css({
                 "transform": "translate(0px, 0px)"
             });
         }
     },
     initMenu: function(menuId, title, url) {
         $(".right").removeClass('on');
         var menu = menuAct.curMenu[menuId];
         var $menu = $(".curMenu");
         $menu.find("h1").html(title);
         var str = "";
         if (menu && menu.length > 0) {
             for (var i = 0, len = menu.length; i < len; i++) {
                 str += ' <li><a class="' + ((url && url == menu[i].url) ? "on" : "") + '"" href="' + (menu[i].url == undefined || menu[i].url == "" ? "#dev" : menu[i].url) + '">' + menu[i].name + '</a></li>';
             };
         }
         $menu.find("ul").html(str);
     },
 }
