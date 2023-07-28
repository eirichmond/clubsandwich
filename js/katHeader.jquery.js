/**  * SlideDeck 1.3.6 Pro - 2012-04-05  *  * More information on this project:  * http://www.slidedeck.com/  *  * Requires: jQuery v1.3+  *  * Full Usage Documentation: http://www.slidedeck.com/usage-documentation  * Usage:  *     $(el).slidedeck(opts);  *  * @param {HTMLObject} el    The <DL> element to extend as a SlideDeck  * @param {Object} opts      An object to pass custom override options to  */ /* Copyright 2012 digital-telepathy  (email : support@digital-telepathy.com) This file is part of SlideDeck. SlideDeck is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. SlideDeck is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with SlideDeck.  If not, see <http://www.gnu.org/licenses/>. */ var SlideDeck;var SlideDeckSkin={};var SlideDeckLens={};(function($){window.SlideDeck=function(B,C){var D=this,B=$(B);var E="1.3.6";this.options={speed:500,transition:'swing',start:1,activeCorner:true,index:true,scroll:false,keys:true,autoPlay:false,autoPlayInterval:5000,hideSpines:false,cycle:false,slideTransition:'slide',touchThreshold:{x:50,y:30},touch:true,controlProgress:false};this.classes={slide:'slide',spine:'spine',label:'label',index:'index',active:'active',indicator:'indicator',activeCorner:'activeCorner',disabled:'disabled',vertical:'slidesVertical',previous:'previous',next:'next'};this.current=1;this.deck=B;this.former=-1;this.spines=B.children('dt');this.slides=B.children('dd');this.controlTo=1;this.session=[];this.disabledSlides=[];this.pauseAutoPlay=false;this.isLoaded=false;var F=navigator.userAgent.toLowerCase();this.browser={chrome:F.match(/chrome/)?true:false,firefox:F.match(/firefox/)?true:false,firefox2:F.match(/firefox\/2/)?true:false,firefox30:F.match(/firefox\/3\.0/)?true:false,msie:F.match(/msie/)?true:false,msie6:(F.match(/msie 6/)&&!F.match(/msie 7|8/))?true:false,msie7:F.match(/msie 7/)?true:false,msie8:F.match(/msie 8/)?true:false,msie9:F.match(/msie 9/)?true:false,chromeFrame:(F.match(/msie/)&&F.match(/chrome/))?true:false,opera:F.match(/opera/)?true:false,safari:(F.match(/safari/)&&!F.match(/chrome/))?true:false};for(var b in this.browser){if(this.browser[b]===true){this.browser._this=b}}if(this.browser.chrome===true&&!this.browser.chromeFrame){this.browser.version=F.match(/chrome\/([0-9\.]+)/)[1]}if(this.browser.firefox===true){this.browser.version=F.match(/firefox\/([0-9\.]+)/)[1]}if(this.browser.msie===true){this.browser.version=F.match(/msie ([0-9\.]+)/)[1]}if(this.browser.opera===true){this.browser.version=F.match(/version\/([0-9\.]+)/)[1]}if(this.browser.safari===true){this.browser.version=F.match(/version\/([0-9\.]+)/)[1]}var G;var H;var I,spine_outer_width,slide_width,spine_half_width;this.looping=false;var J="";switch(D.browser._this){case"firefox":case"firefox3":J="-moz-";break;case"chrome":case"safari":J="-webkit-";break;case"opera":J="-o-";break}var K=function(a){if(D.browser.msie&&!D.browser.msie9){var b=a.css('background-color');var c=b;if(c=="transparent"){b="#ffffff"}else{if(c.match('#')){if(c.length<7){var t="#"+c.substr(1,1)+c.substr(1,1)+c.substr(2,1)+c.substr(2,1)+c.substr(3,1)+c.substr(3,1);b=t}}}b=b.replace("#","");var d={r:b.substr(0,2),g:b.substr(2,2),b:b.substr(4,2)};var e="#";var f="01234567890ABCDEF";for(var k in d){d[k]=Math.max(0,(parseInt(d[k],16)-1));d[k]=f.charAt((d[k]-d[k]%16)/16)+f.charAt(d[k]%16);e+=d[k]}a.find('.'+D.classes.index).css({'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation=1) chroma(color='+e+')',backgroundColor:e})}};var L=function(){if(typeof(Cufon)!="undefined"){Cufon.DOM.ready(function(){if(typeof(D.options.cufonRefresh)!="undefined"){var a=[];if(typeof(D.options.cufonRefresh)=="string"){a.push(D.options.cufonRefresh)}else{a=D.options.cufonRefresh}for(var i=0;i<a.length;i++){Cufon.refresh(a[i])}}if(D.options.hideSpines===false){var b=0;if(D.browser.msie8&&!D.browser.chromeFrame){b=Math.floor(($(D.spines[0]).outerWidth()-$($(D.spines[0]).find('cufon')[0]).height())/2)}if(D.browser.safari||D.browser.chrome||D.browser.chromeFrame){if(document.doctype.publicId.toLowerCase().match(/transitional/)){b=Math.floor(($(D.spines[0]).outerHeight()-$($(D.spines[0]).find('cufon')[0]).height())/2)}}D.spines.find('>cufon').css('margin-top',b)}})}};var M=false;var N=function(){var a=document.getElementsByTagName('script');for(var i=0;i<a.length;i++){var b=a[i].src;if(b.match(/slidedeck\.jquery(\.(pro|profree))?(\.pack)?\.js/)){var c=b.split('?');if(c.length>1){if(c[1].match(/noping/)){M=true}}}}if(M===false){M=true;var d=new Image();d.src=(document.location.protocol=="https:"?"https:":"http:")+"//www.slidedeck.com/6885858486f31043e5839c735d99457f045affd0/"+E+"/pro"}};var O=function(){if(D.options.controlProgress===true){for(var i=0;i<D.spines.length;i++){if(i<D.controlTo){$(D.spines[i]).removeClass(D.classes.disabled)}else{$(D.spines[i]).addClass(D.classes.disabled)}}}};var P=function(a){var b=false;if(typeof(D.verticalSlides)!='undefined'){if(typeof(D.vertical().options)!='undefined'){if(D.vertical().options.scroll===true&&$(a.target).parents('.'+D.classes.vertical).length>0){b=true}}}return b};var Q={timestamp:function(){var a=new Date();var b=a.getUTCFullYear()+"-"+a.getUTCMonth()+"-"+a.getUTCDate()+" "+a.getUTCHours()+":"+a.getUTCMinutes()+":"+a.getUTCSeconds();var c=(0-a.getTimezoneOffset()/60);var d=Math.floor(c);var e="00";if(d!=c){e=(c-d)*60}return b+d+":"+e},track:function(a){if(D.session.length===0||D.session[D.session.length-1].slide!=a){D.session.push({slide:a,timestamp:this.timestamp()})}}};var R=function(){var c=false,resetVertical=false;var d=function(){c=false;if(D.pauseAutoPlay===false&&D.options.autoPlay===true){if(typeof(D.vertical())!='undefined'){if(D.vertical().navChildren){if(D.vertical().current+1!=D.vertical().slides.length){c=true}}}var b=true;if(D.options.cycle===false&&D.current==D.slides.length){if(c===true){if(D.vertical().current+1===D.vertical().slides.length){b=false}}else{b=false}}if(b===false){D.pauseAutoPlay=true}else{if(c===true){if(D.vertical().current+2==D.vertical().slides.length){c=false;resetVertical=D.current}D.vertical().next()}else{if(D.slides.length==1&&D.current==D.slides.length){if(resetVertical!==false){D.resetVertical(resetVertical,false);resetVertical=false}}else{if(D.former!=-1){if(typeof(D.verticalSlides[D.former])!='undefined'){if(typeof(D.verticalSlides[D.former].navChildren)!='undefined'){D.resetVertical(D.former+1)}}}D.next(function(a){if(resetVertical!==false){a.resetVertical(resetVertical);resetVertical=false}})}}}}setTimeout(d,D.options.autoPlayInterval)};setTimeout(d,D.options.autoPlayInterval)};var S=function(a,i){var b={display:'block'};b[J+'transform-origin']="50% 50%";b[J+'transform']="";if(i<D.current){var c=i*spine_outer_width;if(D.options.hideSpines===true){if(i==D.current-1){c=0}else{c=0-(D.options.start-i-1)*B.width()}}}else{var c=i*spine_outer_width+slide_width;if(D.options.hideSpines===true){c=(i+1-D.options.start)*B.width()}}switch(a){case"stack":case"fade":b.zIndex=D.slides.length-i;b.left=0;break;case"flip":b.zIndex=D.slides.length-i;b.left=0;if(i!=(D.current-1)){b[J+'transform']="scaleY(0)"}break;case"flipHorizontal":b.zIndex=D.slides.length-i;b.left=0;if(i!=(D.current-1)){b[J+'transform']="scaleX(0)"}break;case"slide":default:b.left=c;b.zIndex=1;break}D.slides.eq(i).css(J+'transition',"").css(b);return c};var T=function(){if($.inArray(B.css('position'),['position','absolute','fixed'])){B.css('position','relative')}B.css('overflow','hidden');for(var i=0;i<D.slides.length;i++){var f=$(D.slides[i]);if(D.spines.length>i){var g=$(D.spines[i])}var h={top:parseInt(f.css('padding-top'),10),right:parseInt(f.css('padding-right'),10),bottom:parseInt(f.css('padding-bottom'),10),left:parseInt(f.css('padding-left'),10)};var j={top:parseInt(f.css('border-top-width'),10),right:parseInt(f.css('border-right-width'),10),bottom:parseInt(f.css('border-bottom-width'),10),left:parseInt(f.css('border-left-width'),10)};for(var k in j){j[k]=isNaN(j[k])?0:j[k]}if(i<D.current){if(i==D.current-1){if(D.options.hideSpines!==true){g.addClass(D.classes.active)}f.addClass(D.classes.active)}}D.slide_width=(slide_width-h.left-h.right-j.left-j.right);var l={position:'absolute',height:(H-h.top-h.bottom-j.top-j.bottom)+"px",width:"100%",margin:0,paddingLeft:h.left+spine_outer_width+"px"};var m=S(D.options.slideTransition,i);f.css(l).addClass(D.classes.slide).addClass(D.classes.slide+"_"+(i+1));if(D.options.hideSpines!==true){var n={top:parseInt(g.css('padding-top'),10),right:parseInt(g.css('padding-right'),10),bottom:parseInt(g.css('padding-bottom'),10),left:parseInt(g.css('padding-left'),10)};for(var k in n){if(n[k]<10&&(k=="left"||k=="right")){n[k]=10}}var o=n.top+"px "+n.right+"px "+n.bottom+"px "+n.left+"px";var p={position:'absolute',zIndex:3,display:'block',left:m,width:(H-n.left-n.right)+"px",height:I+"px",padding:o,rotation:'270deg','-webkit-transform':'rotate(270deg)','-webkit-transform-origin':spine_half_width+'px 0px','-moz-transform':'rotate(270deg)','-moz-transform-origin':spine_half_width+'px 0px','-o-transform':'rotate(270deg)','-o-transform-origin':spine_half_width+'px 0px',textAlign:'right'};if(!D.browser.msie9){p.top=(D.browser.msie)?0:(H-spine_half_width)+"px";p.marginLeft=((D.browser.msie)?0:(0-spine_half_width))+"px";var q=document.getElementsByTagName('html')[0].dir;if(q.toLowerCase()=="rtl"&&D.browser.msie8===true){p.marginLeft=(0-H+spine_half_width*2)+"px"}p.filter='progid:DXImageTransform.Microsoft.BasicImage(rotation=3)'}g.css(p).addClass(D.classes.spine).addClass(D.classes.spine+"_"+(i+1));if(D.browser.msie9){g[0].style.msTransform='rotate(270deg)';g[0].style.msTransformOrigin=Math.round(parseInt(B[0].style.height,10)/2)+'px '+Math.round(parseInt(B[0].style.height,10)/2)+'px'}}else{if(typeof(g)!="undefined"){g.hide()}}if(i==D.slides.length-1){f.addClass('last');if(D.options.hideSpines!==true){g.addClass('last')}}if(D.options.activeCorner===true&&D.options.hideSpines===false){var r=document.createElement('DIV');r.className=D.classes.activeCorner+' '+(D.classes.spine+'_'+(i+1));g.after(r);g.next('.'+D.classes.activeCorner).css({position:'absolute',top:'25px',left:m+spine_outer_width+"px",overflow:"hidden",zIndex:"20000"}).hide();if(g.hasClass(D.classes.active)){g.next('.'+D.classes.activeCorner).show()}}if(D.options.hideSpines!==true){var s=document.createElement('DIV');s.className=D.classes.index;if(D.options.index!==false){var t;if(typeof(D.options.index)!='boolean'){t=D.options.index[i%D.options.index.length]}else{t=""+(i+1)}s.appendChild(document.createTextNode(t))}g.append(s);g.find('.'+D.classes.index).css({position:'absolute',zIndex:2,display:'block',width:I+"px",height:I+"px",textAlign:'center',bottom:((D.browser.msie)?0:(0-spine_half_width))+"px",left:((D.browser.msie)?5:20)+"px",rotation:"90deg",'-webkit-transform':'rotate(90deg)','-webkit-transform-origin':spine_half_width+'px 0px','-moz-transform':'rotate(90deg)','-moz-transform-origin':spine_half_width+'px 0px','-o-transform':'rotate(90deg)','-o-transform-origin':spine_half_width+'px 0px'});if(D.browser.msie9){g.find('.'+D.classes.index)[0].style.msTransform='rotate(90deg)'}K(g)}}N();if(D.options.hideSpines!==true){D.spines.bind('click',function(a){a.preventDefault();D.goTo(D.spines.index(this)+1)})}$(document).bind('keydown',function(a){if(D.options.keys!==false){if($(a.target).parents().index(D.deck)==-1){if(a.keyCode==39){D.pauseAutoPlay=true;D.next()}else if(a.keyCode==37){D.pauseAutoPlay=true;D.prev()}}}});if(typeof($.event.special.mousewheel)!="undefined"){B.bind("mousewheel",function(a,b){if(D.options.scroll!==false){if(!P(a)){var c=a.detail?a.detail:a.wheelDelta;if(typeof(c)=='undefined'){c=0-b}var d=false;if($(a.originalTarget).parents(D.deck).length){if($.inArray(a.originalTarget.nodeName.toLowerCase(),['input','select','option','textarea'])!=-1){d=true}}if(d!==true){if(c>0){switch(D.options.scroll){case"stop":a.preventDefault();break;case true:default:if(D.current<D.slides.length||D.options.cycle===true){a.preventDefault()}break}D.pauseAutoPlay=true;D.next()}else{switch(D.options.scroll){case"stop":a.preventDefault();break;case true:default:if(D.current!=1||D.options.cycle===true){a.preventDefault()}break}D.pauseAutoPlay=true;D.prev()}}}}})}if((D.browser.msie!==true)&&(D.options.touch!==false)){var u={x:0,y:0};var v={x:0,y:0};var w=D.options.touchThreshold;B[0].addEventListener('touchstart',function(a){u.x=a.targetTouches[0].pageX;u.y=a.targetTouches[0].pageY},false);B[0].addEventListener('touchmove',function(a){a.preventDefault();v.x=a.targetTouches[0].pageX;v.y=a.targetTouches[0].pageY},false);B[0].addEventListener('touchend',function(a){var b=u.x-w.x;var c=u.x+w.x;var d=u.y-w.y;var e=u.y+w.y;if(v.x!=0){if(v.x<=b){D.pauseAutoPlay=true;D.next()}else if(v.x>=c){D.pauseAutoPlay=true;D.prev()}}if(v.y!=0){if(v.y<=d){D.pauseAutoPlay=true;D.vertical().next()}else if(v.y>=e){D.pauseAutoPlay=true;D.vertical().prev()}}u={x:0,y:0};v={x:0,y:0}},false)}$(D.spines[D.current-2]).addClass(D.classes.previous);$(D.spines[D.current]).addClass(D.classes.next);L();O();Q.track(D.current);R();D.isLoaded=true};var U=function(a){a=Math.max(1,a-1);if($.inArray(a,D.disabledSlides)!=-1){if(a==1){a=1}else{a=U(a)}}return a};var V=function(a){a=Math.min(D.slides.length,a+1);if($.inArray(a,D.disabledSlides)!=-1){if(a==D.slides.length){a=D.current}else{a=V(a)}}return a};var W=function(a){a=Math.min(D.slides.length,Math.max(1,a));if($.inArray(a,D.disabledSlides)!=-1){if(a<D.current){a=U(a)}else{a=V(a)}}return a};var X=function(a){var b=[];if(typeof(D.options.complete)=="function"){b.push(function(){D.options.complete(D)})}switch(typeof(a)){case"function":b.push(function(){a(D)});break;case"object":b.push(function(){a.complete(D)});break}Q.track(D.current);var c=function(){D.looping=false;for(var z=0;z<b.length;z++){b[z](D)}};return c};var Y={fade:function(a,b,c){var d=D.slides.eq(D.current-1);D.slides.not(d).stop().animate({opacity:0},D.options.speed,function(){this.style.display="none"});d.css({display:'block',opacity:0}).stop().animate({opacity:1},D.options.speed,function(){this.style.display="block";X(b)()})},flip:function(b,c,d,e){var f=(D.options.speed/1000)/2;var g=D.slides.eq(D.former-1);var h=D.slides.eq(D.current-1);if(typeof(e)=='undefined'){e=false}var i=e==true?"X":"Y";var j={position:'absolute',zIndex:999,top:0,right:0,bottom:0,left:0,width:'100%',height:'100%',opacity:0};var k=g.find('.slidedeck-slide-mask');if(k.length){k.remove()}g.append('<div class="slidedeck-slide-mask mask-out"></div>');k=g.find('.slidedeck-slide-mask').css(j);var l=h.find('.slidedeck-slide-mask');if(l.length){k.remove()}h.append('<div class="slidedeck-slide-mask mask-in"></div>');j.opacity=1;l=h.find('.slidedeck-slide-mask').css(j);var m={};m[J+'transition']="";m[J+'transform-origin']="50% 50%";m[J+'transform']="scale"+i+"(0)";D.slides.not(g).css(m);var n={};n[J+'transform-origin']="50% 50%";n[J+'transform']="scale"+i+"(0)";g.css(J+'transition',J+'transform '+f+'s ease-out').css(n);k.animate({opacity:1},{duration:D.options.speed/2,complete:function(){k.remove()}});l.animate({opacity:1},{duration:D.options.speed/2,complete:function(){n[J+'transform']="scale"+i+"(1)";h.addClass(D.classes.active).css(J+'transition',J+'transform '+f+'s ease-out').css(n);l.animate({opacity:0},{dureation:D.options.speed/2,complete:function(){D.slides.css(J+'transition',"");var a={};a[J+'transform-origin']="50% 50%";a[J+'transform']="scale"+i+"(1)";D.slides.eq(D.current-1).css(a);X(c)();k.remove();l.remove()}})}})},flipHorizontal:function(a,b,c){this.flip(a,b,c,true)},stack:function(b,c,d){if((D.current==D.slides.length&&D.former==1)||(D.former==D.slides.length&&D.current==1)){D.looping=true}for(var i=0;i<D.slides.length;i++){var e=0;var f=D.slides.eq(i);if(D.looping===false){if(i<D.current-1){if(i==(D.current-1)){f.addClass(D.classes.active);L()}e=(0-G)}else{e=0}}else{if(D.former==D.slides.length&&D.current==1){if(i==(D.current)-1){f.css({left:0,zIndex:5}).addClass(D.classes.active);L();e=0}else{if(i==(D.former-1)){f.css('z-index',10);e=0-G}else{f.css('z-index',1);e=0}}}else if(D.former==1&&D.current==D.slides.length){if(i!=D.former-1){if(i==(D.current-1)){f.css({left:(0-G),zIndex:100});f.addClass(D.classes.active);L();e=0}}}}var g={duration:D.options.speed,easing:D.options.transition};if(i==(d===true&&D.current-1)||i==(d===false&&D.current)){if(i==D.current-1){g.complete=function(){if(D.looping===true){D.slides.each(function(a){if(a!=(D.current-1)){this.style.left=(D.current==1?0:(0-G))+"px"}this.style.zIndex=D.slides.length-a})}X(c)()}}}f.stop().animate({left:e,width:D.slide_width},g)}},slide:function(a,b,c){for(var i=0;i<D.slides.length;i++){var d=0;if(D.options.hideSpines!==true){var e=$(D.spines[i])}var f=$(D.slides[i]);if(i<D.current){if(i==(D.current-1)){f.addClass(D.classes.active);if(D.options.hideSpines!==true){e.addClass(D.classes.active);e.next('.'+D.classes.activeCorner).show()}L()}d=i*spine_outer_width}else{d=i*spine_outer_width+slide_width}if(D.options.hideSpines===true){d=(i-D.current+1)*B.width()}var g={duration:D.options.speed,easing:D.options.transition};if(i==(c===true&&D.current-1)||i==(c===false&&D.current)){if(i===0){g.complete=X(b)}}f.stop().animate({left:d+"px",width:D.slide_width+"px"},g);if(D.options.hideSpines!==true){K(e);if(e.css('left')!=d+"px"){e.stop().animate({left:d+"px"},{duration:D.options.speed,easing:D.options.transition});e.next('.'+D.classes.activeCorner).stop().animate({left:d+spine_outer_width+"px"},{duration:D.options.speed,easing:D.options.transition})}}}}};var Z=function(a,b){a=W(a);if((a<=D.controlTo||D.options.controlProgress!==true)&&D.looping===false){var c=true;if(a<D.current){c=false}var d=[D.classes.active,D.classes.next,D.classes.previous].join(' ');D.former=D.current;D.current=a;if(typeof(D.options.before)=="function"){D.options.before(D)}if(typeof(b)!="undefined"){if(typeof(b.before)=="function"){b.before(D)}}if(D.current!=D.former){D.spines.removeClass(d);D.slides.removeClass(d);B.find('.'+D.classes.activeCorner).hide();D.spines.eq(D.current-2).addClass(D.classes.previous);D.spines.eq(D.current).addClass(D.classes.next);var e='slide';if(typeof(Y[D.options.slideTransition])!='undefined'){e=D.options.slideTransition}Y[e](a,b,c)}N()}};var bh=function(a,b){var c=a;if(typeof(a)==="string"){c={};c[a]=b}for(var d in c){b=c[d];switch(d){case"speed":case"start":b=parseFloat(b);if(isNaN(b)){b=D.options[d]}break;case"autoPlay":if(typeof(b)!=="boolean"){b=D.options[d]}D.pauseAutoPlay=false;break;case"scroll":case"keys":case"activeCorner":case"controlProgress":case"hideSpines":case"cycle":if(typeof(b)!=="boolean"){b=D.options[d]}break;case"cufonRefresh":case"transition":if(typeof(b)!=="string"){b=D.options[d]}break;case"complete":case"before":if(typeof(b)!=="function"){b=D.options[d]}break;case"index":if(typeof(b)!=="boolean"){if(!$.isArray(b)){b=D.options[d]}}break;case"slideTransition":for(var k in Y){if(b==k){switch(D.browser._this){case"msie":case"msie7":case"msie8":case"msie9":switch(b){case"flip":case"flipHorizontal":b="fade";break}break}D.options.slideTransition=b;for(var i=0;i<D.slides.length;i++){S(D.options.slideTransition,i)}}}break}D.options[d]=b}};var bi=function(a){if($.inArray(a,D.disabledSlides)==-1&&a!==1&&a!==0){D.disabledSlides.push(a)}};var bj=function(a){var b=$.inArray(a,D.disabledSlides);if(b!=-1){D.disabledSlides.splice(b,1)}};var bk=function(l,m,n){var o=this;var l=$(l);var p=l.children();if(l[0].nodeName=="DL"){p=l.children('dd');var q=l.children('dt').hide()}var r=p.length;var s=l.parents('dd.slide');var t=l.parent();var u=s.innerHeight();var w=100;if(m.deck.find('.'+m.classes.activeCorner).length){w=m.deck.find('.'+m.classes.activeCorner).css('z-index')-1}this.navParent=null;this.navChildren=null;this.current=0;this.slides=p;this.options={speed:500,scroll:true,continueScrolling:m.options.continueScrolling};if(typeof(n)=='object'){for(var k in n){this.options[k]=n[k]}}this.classes={navContainer:'verticalSlideNav',arrow:'arrow',prefix:'verticalSlide'};var x=function(a,b,c){if(typeof(o.options.before)=='function'){o.options.before(o)}if(typeof(c)=='object'){if(typeof(c.before)=='function'){c.before(o)}}o.current=a;var d=o.options.speed;if(typeof(b)!='undefined'){d=0}s.find('ul.'+o.classes.navContainer+' li.'+o.classes.arrow).stop().animate({top:$(o.navChildren[o.current]).position().top+'px'},250);o.navChildren.removeClass('active');$(o.navChildren[o.current]).addClass('active');l.stop().animate({top:0-(o.current*u)+'px'},d,m.options.transition,function(){if(typeof(o.options.complete)=='function'){o.options.complete(o)}if(typeof(c)=='object'){if(typeof(c.complete)=='function'){c.complete(o)}}else if(typeof(c)=='function'){c(m)}})};var y=function(){var b=document.createElement('UL');b.className=o.classes.navContainer;b.style.position='absolute';b.style.zIndex=w;b.style.listStyleType='none';for(var a=0;a<r;a++){var c=document.createElement('LI');c.className='nav_'+(a+1)+(a===0?' active':'');c.style.listStyleType='none';var d=document.createElement('A');if(p[a].id){d.href="#"+p[a].id}else{d.href="#"+(a+1)}d.className='nav_'+(a+1);var e="Nav "+(a+1);if(typeof(q)!='undefined'){e=q.eq(a).html()}d.innerHTML=e;c.appendChild(d);b.appendChild(c)}var f=document.createElement('LI');f.className=o.classes.arrow;f.style.top=0;f.appendChild(document.createTextNode(' '));b.appendChild(f);s.append(b);o.navChildren=s.find('.'+b.className+' li');s.find('.'+b.className+' li a').click(function(a){a.preventDefault();m.pauseAutoPlay=true;x(this.className.match('nav_([0-9]+)')[1]-1)})};this.goTo=function(v,h,a){v=Math.min(r-1,Math.max(0,v-1));h=Math.min(m.slides.length-1,Math.max(0,v));$(m.slides[h]).find('.'+this.classes.navContainer+' a:eq('+v+')').addClass(m.classes.active).siblings().removeClass(m.classes.active);x(v,a)};this.next=function(a){x(Math.min(r-1,o.current+1),undefined,a)};this.prev=function(a){x(Math.max(0,o.current-1),undefined,a)};this.snapTo=function(v,a){x(Math.max(0,Math.min(r-1,v)),true,a)};var z=function(){if(!s.find('.'+o.classes.navContainer).length){var f=(((m.browser.msie!==true)||m.browser.msie9)?$(m.spines[0]).outerHeight():$(m.spines[0]).outerWidth());if(m.options.hideSpines===true){f=0}l.css({position:'absolute',zIndex:w-1,top:'0px',left:f,listStyleType:'none',padding:'0px',margin:'0px',width:t.innerWidth()-f,height:u*r});var g={top:parseInt(p.css('padding-top'),10),right:parseInt(p.css('padding-right'),10),bottom:parseInt(p.css('padding-bottom'),10),left:parseInt(p.css('padding-left'),10)};var h={top:parseInt(p.css('border-top-width'),10),right:parseInt(p.css('border-right-width'),10),bottom:parseInt(p.css('border-bottom-width'),10),left:parseInt(p.css('border-left-width'),10)};for(var k in h){if(isNaN(h[k])){h[k]=0}}var i=u-g.top-g.bottom-h.top-h.bottom;var j=l.width()-g.right-g.left-h.right-h.left;p.each(function(a,e){$(e).css({listStyleType:'none',position:'absolute',top:a*u,width:j,height:i}).addClass(o.classes.prefix+'_'+(a+1))});t.css({overflow:'hidden'});y();if(typeof($.event.special.mousewheel)!="undefined"){l.bind("mousewheel",function(a,b){if(o.options.scroll!==false){var c=a.detail?a.detail:a.wheelDelta;if(typeof(c)=='undefined'){c=0-b}var d=false;if($(a.originalTarget).parents(o.deck).length){if($.inArray(a.originalTarget.nodeName.toLowerCase(),['input','select','option','textarea'])!=-1){d=true}}if(d!==true){var e,lastSlide=false;if(o.options.continueScrolling===true){if((o.current+1)==1){e=true}else if((o.current+1)==o.slides.length){lastSlide=true}}if(c>0){a.preventDefault();m.pauseAutoPlay=true;if(lastSlide){m.next();return false}else{o.next()}}else{a.preventDefault();m.pauseAutoPlay=true;if(e){m.prev();return false}else{o.prev()}}}}})}}};if(u>0){z()}else{var A;A=setInterval(function(){l=$(l);p=l.children();r=p.length;s=l.parents('dd.slide');t=l.parent();u=s.innerHeight();if(u>0){clearInterval(A);z()}},20)}};var bl=function(){H=B.height();G=B.width();B.css('height',H+"px");I=0;spine_outer_width=0;if(D.options.hideSpines!==true&&D.spines.length>0){I=$(D.spines[0]).height();spine_outer_width=$(D.spines[0]).outerHeight()}slide_width=G-spine_outer_width*D.spines.length;if(D.options.hideSpines===true){slide_width=G}spine_half_width=Math.ceil(I/2)};var bm=function(a){if((D.browser.opera&&D.browser.version<"10.5")||D.browser.msie6||D.browser.firefox2||D.browser.firefox30){if(typeof(console)!="undefined"){if(typeof(console.error)=="function"){console.error("This web browser is not supported by SlideDeck. Please view this page in a modern, CSS3 capable browser or a current version of Inernet Explorer")}}return false}if(typeof(a)!="undefined"){for(var b in a){D.options[b]=a[b]}}if(D.spines.length<1){D.options.hideSpines=true}switch(D.browser._this){case"msie":case"msie7":case"msie8":case"msie9":switch(D.options.slideTransition){case"flip":case"flipHorizontal":D.options.slideTransition="fade";break}break}switch(D.options.slideTransition){case"flip":case"flipHorizontal":case"fade":case"stack":D.options.hideSpines=true;break}if(D.options.hideSpines===true){D.options.activeCorner=false}D.current=Math.min(D.slides.length,Math.max(1,D.options.start));if(B.height()>0){bl();T()}else{var c;c=setTimeout(function(){bl();if(B.height()>0){clearInterval(c);bl();T()}},20)}};var bn=function(a){var b;b=setInterval(function(){if(D.isLoaded===true){clearInterval(b);a(D)}},20)};this.loaded=function(a){bn(a);return D};this.next=function(a){var b=Math.min(D.slides.length,(D.current+1));if(D.options.cycle===true){if(D.current+1>D.slides.length){b=1}}Z(b,a);return D};this.prev=function(a){var b=Math.max(1,(D.current-1));if(D.options.cycle===true){if(D.current-1<1){b=D.slides.length}}Z(b,a);return D};this.goTo=function(a,b){D.pauseAutoPlay=true;if(typeof(a)=="string"){if(a==":first"){a=D.slides.filter(':first')}else if(a==":last"){a=D.slides.filter(':last')}else if(!a.match(/^\#/)){a="#"+a}var c=D.slides.index($(a));if(c!=-1){a=c+1}else{return false}}Z(Math.min(D.slides.length,Math.max(1,a)),b);return D};this.progressTo=function(a,b){D.pauseAutoPlay=true;D.updateControlTo(a);D.goTo(a,b);return D};this.updateControlTo=function(a){D.controlTo=a;O();return D};this.disableSlide=function(a){bi(a);return D};this.enableSlide=function(a){bj(a);return D};this.setOption=function(a,b){bh(a,b);return D};this.vertical=function(a){var b=this;if(typeof(this.verticalSlides)=='undefined'){this.verticalSlides={};for(var i=0;i<this.slides.length;i++){var c=$(this.slides[i]).find('.'+this.classes.vertical);var v={next:function(){return false},prev:function(){return false},goTo:function(){return false}};if(c.length){v=new bk(c,this,a)}this.verticalSlides[i]=v}}else{return this.verticalSlides[this.current-1]}};this.goToVertical=function(v,h){if(typeof(h)!='undefined'){if(this.verticalSlides[h-1]!==false){if(this.current==h){this.vertical().goTo(v)}else{this.verticalSlides[h-1].goTo(v,h,true);this.goTo(h)}}}else{this.vertical().goTo(v)}};this.resetVertical=function(h,a){if(typeof(a)=='undefined'){a=true}if(typeof(h)=='undefined'){h=this.current}if(a==true){this.verticalSlides[h-1].snapTo(0)}else{this.verticalSlides[h-1].goTo(0)}};bm(C)};$.fn.slidedeck=function(a){var b=[];for(var i=0;i<this.length;i++){if(!this[i].slidedeck){this[i].slidedeck=new SlideDeck(this[i],a)}b.push(this[i].slidedeck)}return b.length>1?b:b[0]}})(jQuery); 

jQuery(document).ready(function(){ 

	// jQuery('.slider').slidedeck({autoPlay: true, speed:1000, cycle: true, slideTransition:'fade', touch: false}); 
	// jQuery('#sliderHome').slidedeck({autoPlay: true, speed:1000, cycle: true, slideTransition:'fade', touch: false}); 

	// jQuery('#textSlider').slidedeck({autoPlay: false, speed:1000, cycle: true, slideTransition:'slide', touch: false}); 
	// jQuery('#next').click(function() {
	// 	jQuery('#textSlider').slidedeck().pauseAutoPlay = true;
	// 	jQuery('#textSlider').slidedeck().next();
	// });
	// jQuery('#previous').click(function() {
	// 	jQuery('#textSlider').slidedeck().pauseAutoPlay = true;
	// 	jQuery('#textSlider').slidedeck().prev();
	// });
	
	// jQuery('#periodChooser .dropdown-menu a').click(function() { jQuery('#periodChooser').find('input[type=hidden]').val(jQuery(this).data('value')).change(); jQuery('#textToChange').text(jQuery(this).text()); }); 
}); 