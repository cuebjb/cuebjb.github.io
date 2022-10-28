(function () {
    
    var osGallery = function (container, params) {
        if (!(this instanceof osGallery)) return new osGallery(container, params);

        var defaults = {
            minImgEnable : 1,
            spaceBetween: 2.5,
            minImgSize: 200,
            numColumns: 3,
            showImgTitle: '',
            showImgDescription: '',
            limEnd: 5,
            galId: 1,
            galIdRandom: 1,
            imgCountCat: '',
            load_more_background: '',
            os_fancybox_background: '',
            showLoadMore: '',
            juri: '',
            itemId: '',
            layout: 'default',
            albumSublayout: 'defaultTabs',
            modId: 0,
            searchText: '',
            thumbWidth: '600',
            thumbHeight: '400',
            //sleduyus4ie 2 svoystva byli dobavleny s cel`u uyti ot globalnyh peremennyh, 
            //no ostavit vozmognost` dostupa i izmeneniya iz luboy 4asti algoritma
            curCatId: '',
            imgBlockW: 0,
            fancSettings:{
                wrapCSS: 'os-os_fancybox-window',
                animationEffect: false,
                animationDuration: '500',
                transitionEffect: false,
                transitionDuration: '800',
                loop: false,
                arrows: true,
                clickContent: 'zoom',
                wheel : false,
                slideShow : {
                    autoStart : false,
                    speed     : 4000
                },
                clickSlide : 'close',
                thumbs : {
                    autoStart : true,
                    axis : 'y'
                },
                buttons : [
                'slideShow',
                'fullScreen',
                'thumbs',
                'share',
                'download',
                'zoom',
                'arrowLeft',
                'arrowRight',
                'close'
                ],
                share : {
                    tpl : ''
                },
                infobar : true,
                baseClass : 'thumb_right',
                idleTime: 60
            }
        };

        for (var param in defaults) {
          if (!params[param] && params[param] != 0){
            params[param] = defaults[param];
          }
        }
        // gallery settings
        var osg = this;
        // Params
        osg.params = params || defaults;
        
        osg.getImgBlockWidth = function (numColumns){
            
            if(typeof(numColumns) == 'undefined'){
                numColumns = osg.params.numColumns
                osg.params.currentNumColumns = numColumns
            };
            var checkSpaceBetween = osg.params.spaceBetween;
            spaceBetween = osg.params.spaceBetween*2;
            mainBlockW = jQuerOs(container).width();
            
            if(osg.params.layout == 'masonry' || (osg.params.layout == 'album' && osg.params.albumSublayout == 'masonry')){
                
                var percentGridSizer = 100/numColumns;
                var gridSizer = mainBlockW/numColumns;
                imgBlockWpx = (mainBlockW - (spaceBetween*numColumns))/numColumns;
                
                var imgBlockW = percentGridSizer * imgBlockWpx/gridSizer - 0.25;

                if(!checkSpaceBetween) imgBlockW = percentGridSizer;

                jQuerOs(".grid-sizer-"+osg.params.galIdRandom).css('width', percentGridSizer + "%");
                jQuerOs("#grid-"+osg.params.galIdRandom).css('width', imgBlockW + "%");
                var sizeAwesome = ((imgBlockW*mainBlockW)/100)/11+"px";
                jQuerOs(container +" .andrea-effect .andrea-zoom-in").css({'width': sizeAwesome, 'height': sizeAwesome });

                var fontSizetext = ((imgBlockW*mainBlockW)/100)/15+"px";
                jQuerOs(container +" .grid-item").css({'font-size': fontSizetext, 'line-height': fontSizetext });
                if(osg.params.minImgEnable){
                    if( ((imgBlockW*mainBlockW)/100) < osg.params.minImgSize ){
                        numColumns--;
                        osg.params.currentNumColumns = numColumns;
                        osg.getImgBlockWidth(numColumns);
                    }
                }

                return imgBlockW;
            //}else if(osg.params.layout == 'fitRows' || osg.params.layout == 'allInOneRow' || (osg.params.layout == 'album' && osg.params.albumSublayout == 'fit_rows')){
            }else if(osg.params.layout == 'fitRows' || (osg.params.layout == 'album' && osg.params.albumSublayout == 'fit_rows')){
                
                imgBlockK = 1 / numColumns;
                var images = jQuerOs("#grid-item-"+osg.params.galIdRandom);
                
                jQuerOs.each(images, function(){
                    var img = jQuerOs(this).find("img");
                    var w_ = jQuerOs(img).prop('naturalWidth');
                    var h_ = jQuerOs(img).prop('naturalHeight');

                    w_ = w_ * imgBlockK;
                    h_ =  h_ * imgBlockK ;
                    
                    img.css('width', w_ + "px");
//                    jQuerOs(this).css('width', w_ + "px");
                    img.css('height', h_ + "px");
//                    jQuerOs(this).css('height', h_ + "px");

                }); 
                
                spaceBetween = osg.params.spaceBetween*2;
                mainBlockW = jQuerOs(container).width();
                var imgBlockW = ( (((mainBlockW-(spaceBetween*numColumns))/numColumns) )*100)/mainBlockW  ;

                var sizeAwesome = ((imgBlockW*mainBlockW)/100)/11+"px";
                jQuerOs(container +" .andrea-effect .andrea-zoom-in").css({'width': sizeAwesome, 'height': sizeAwesome });

                var fontSizetext = ((imgBlockW*mainBlockW)/100)/15+"px";
                jQuerOs(container +" .img-block").css({'font-size': fontSizetext, 'line-height': fontSizetext });

                jQuerOs("#gutter-sizer-"+osg.params.galIdRandom).css('width', "0%");
                jQuerOs(".os-gallery-tabs-main-"+osg.params.galIdRandom+" .os-cat-tab-images .grid .img-block").css('height', "");
                jQuerOs(".os-gallery-tabs-main-"+osg.params.galIdRandom+" .os-cat-tab-images .grid .img-block").css('width', "");
                
                var sizeAwesome = ((imgBlockW*mainBlockW)/100)/11+"px";
                jQuerOs(container +" .andrea-effect .andrea-zoom-in").css({'width': sizeAwesome, 'height': sizeAwesome });

                var fontSizetext = ((imgBlockW*mainBlockW)/100)/15+"px";
                jQuerOs(container +" .img-block").css({'font-size': fontSizetext, 'line-height': fontSizetext });
                return imgBlockW;
            }else{
                var imgBlockW = ( (((mainBlockW-(spaceBetween*numColumns))/numColumns) )*100)/mainBlockW  ;
                
                if(osg.params.minImgEnable && ((imgBlockW*mainBlockW)/100) < osg.params.minImgSize){
                    numColumns--;
                    osg.params.currentNumColumns = numColumns;
                    return osg.getImgBlockWidth(numColumns);
                    
                }else{
                    var sizeAwesome = ((imgBlockW*mainBlockW)/100)/11+"px";
                    jQuerOs(container +" .andrea-effect .andrea-zoom-in").css({'width': sizeAwesome, 'height': sizeAwesome });
                    var fontSizetext = ((imgBlockW*mainBlockW)/100)/15+"px";
                    jQuerOs(container +" .img-block").css({'font-size': fontSizetext, 'line-height': fontSizetext });
                    return imgBlockW;
                }
            }
        }
        osg.setImgBlockHeight = function (reinit){
            if(jQuerOs(container +" .img-block:first").hasClass('tjava-effect') || 
                    jQuerOs(container +" .img-block:first").hasClass('vadim-effect') || 
                    jQuerOs(container +" .img-block:first").hasClass('vlados-effect')){ 
            }else{
                return;
            }
            
            numColumns = osg.params.currentNumColumns
            spaceBetween = osg.params.spaceBetween*2;
            mainBlockW = jQuerOs(container).width();
            imgBlockWpx = (mainBlockW - (spaceBetween*numColumns))/numColumns;
            
            var bottom_height = jQuerOs('.os-gallery-caption-bottom:first').height();
            if(!bottom_height) bottom_height = 0
            
            
            var src = jQuerOs(container +" .img-block img:first").attr('src')
            var img = osg.imgSize(src);
            var imgW = img.width
            var imgH = img.height
            
            var imgBlockH = (imgH * (imgBlockWpx / imgW));
            if(!imgBlockH){
                imgBlockH = jQuerOs(container +" .img-block:first").height()
            }

            if(osg.params.layout == 'default' || osg.params.layout == 'search'){
                jQuerOs(container +" .img-block").css('height', imgBlockH+'px')
            }else if(osg.params.layout == 'allInOne'){
                
                jQuerOs(container+" .all-in-one-block .img-block:first-child").css('height', imgBlockH+'px')
//                jQuerOs(container+" .all-in-one-block .img-block a").css('height', imgBlockH+'px')
            }
            else if(osg.params.layout == 'album'){
                
                if(osg.params.albumSublayout == 'fit_rows'){
                    
                    jQuerOs(container +" .album-main-image").parent().css('height', imgBlockH+'px')
                }else if(osg.params.albumSublayout == 'defaultTabs'){
                    
                    jQuerOs(container +" .img-block").css('height', imgBlockH+'px')
                }else if(osg.params.albumSublayout == 'masonry'){
                    jQuerOs(container +" .album-main-image").parent().css('height', imgBlockH+'px')
                    jQuerOs(container +" .grid .img-block").each(function(){
                        var src = jQuerOs(this).find("img:first").attr('src')
                        var img = osg.imgSize(src);
                        var imgW = img.width
                        var imgH = img.height
                        
                        var imgBlockH = imgH * (imgBlockWpx / imgW);
                        
                        jQuerOs(this).css('height', imgBlockH+'px');
                    })
                }
//                jQuerOs(container+" .all-in-one-block .img-block a").css('height', imgBlockH+'px')
            }else if(osg.params.layout == 'masonry'){
                if(reinit) var selector = ".load-more-hidden"
                else var selector = '';
                jQuerOs(container +" .img-block"+selector).each(function(){
                    var src = jQuerOs(this).find("img:first").attr('src')
                    if(reinit){
    
                        var img = new Image();
                        img.src = src;
                        var self = this;
                        img.onload = function() {
                            var imgW = img.width
                            var imgH = img.height


                            var imgBlockH = imgH * (imgBlockWpx / imgW);

                            jQuerOs(self).css('height', imgBlockH+'px');
                        }
                    }else{
                        var img = osg.imgSize(src);
                        var imgW = img.width
                        var imgH = img.height
                        var imgBlockH = imgH * (imgBlockWpx / imgW);

                        jQuerOs(this).css('height', imgBlockH+'px');
                    }
                })
            }
            
        }
        


        osg.imgSize = function(href){
            var img = new Image();
            img.src = href;

            img.onload = function() {
                 return img;
            };

            return img;
        }
        
        osg.imageWidthCalculation = function(catId, numColumns){
            if(typeof(numColumns) == 'undefined'){
                numColumns = osg.params.numColumns;
                osg.params.currentNumColumns = numColumns;
            }
            
            var mainBlockW = jQuerOs(container).width();
            var imgBlockK = 1 / numColumns;
            //var result = [];
            var images = jQuerOs.makeArray(jQuerOs("#cat-"+ catId +"-"+osg.params.galIdRandom+" .img-block a img"));
            var images_a = jQuerOs("#cat-"+ catId +"-"+osg.params.galIdRandom+" .img-block a").find("img:first");
            
            images = jQuerOs.makeArray(images_a)
            
            var min = jQuerOs(images[0]).prop('naturalHeight') * imgBlockK;
            
            //var countImg = mainBlockW/min;
            //var counter = images.length;
            spaceBetween = osg.params.spaceBetween*2;

            var copyImages = images.slice();
            var arr_1 = [];
            var arr_2 = [];
            var arr_3 = [];
            var widthRows = 0;
            var k_height = 0 ;
            
            while(copyImages.length > 0){
                arr_1 = copyImages.splice(0, numColumns);
                //суммирование длин картинок в массиве arr_1
                for(var i = 0; i < arr_1.length; i++){
                    widthRows += (jQuerOs(arr_1[i]).prop('naturalWidth'));
                }
                var k = (mainBlockW - ((numColumns) * spaceBetween) - (numColumns) ) / (widthRows );
                if (k_height == 0 ) k_height = k ;
                
                //set k for last images
                if(k_height > 0 && arr_1.length < numColumns && k > k_height){
                    k = k_height;
                }
                
                

                for(var i = 0; i < arr_1.length; i++){
                    arr_2.push((jQuerOs(arr_1[i]).prop('naturalWidth')) * k);
                    arr_3.push((jQuerOs(arr_1[i]).prop('naturalHeight')) * k_height);
                }
                widthRows = 0;
                //clear array
                arr_1 = [];
            }

            var imag = jQuerOs("#cat-"+ catId +"-"+osg.params.galIdRandom+" .img-block a img");
            imag = jQuerOs("#cat-"+ catId +"-"+osg.params.galIdRandom+" .img-block a[class^=os_fancybox]");
            
            if(jQuerOs(container +" .img-block:first").hasClass('tjava-effect') || 
                    jQuerOs(container +" .img-block:first").hasClass('vadim-effect') || 
                    jQuerOs(container +" .img-block:first").hasClass('vlados-effect')){ 
                
            }else{
                var bottom_height = jQuerOs('.os-gallery-caption-bottom:first').height();
            }
            
            if(!bottom_height) bottom_height = 0
            
            var j = 0;
            
            jQuerOs.each(imag, function(){
                var img = jQuerOs(this).find("img");
                
                var w_ = arr_2[j];
                var h_ = arr_3[j];
                

                img.css('width', w_ + "px");
                jQuerOs(this).css('width', w_ + "px");
                if(osg.params.layout == 'album' && osg.params.albumSublayout == 'fit_rows'){
                    jQuerOs(this).parents('.img-block').css('width', w_ + "px");
                }

                jQuerOs(this).find(".os-gallery-caption-top").css('width', w_ + "px");
                jQuerOs(this).find(".os-gallery-caption-bottom").css('width', w_ + "px");
                img.css('height', h_ + "px");
                jQuerOs(this).css('height', h_ + "px");
                jQuerOs(this).parent().css('height', h_ + bottom_height +"px");

                j++;
            });

            var imgBlockWpx = (mainBlockW - (spaceBetween*numColumns))/numColumns;
            if(osg.params.minImgEnable){
                if(((imgBlockWpx*mainBlockW)/100) < osg.params.minImgSize){
                    numColumns--;
                    osg.params.currentNumColumns = numColumns;
                    osg.sortImg(catId, numColumns);
                }
            }
        }

        osg.fitRowsIsotope = function(curCatId){
            jQuerOs("#cat-"+curCatId+"-"+osg.params.galIdRandom).imagesLoaded(function(){
                osg.imageWidthCalculation(curCatId);
                jQuerOs("#cat-"+ curCatId+ "-"+osg.params.galIdRandom+" .fitrow-more-hidden").removeClass("fitrow-more-hidden");
            });
        }
        
        osg.isotope = function(){
            jQuerOs(container + ' .grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '#grid-sizer-'+osg.params.galIdRandom                                
                },
            });
        }

        osg.reloadIsotope = function(){
            //VlaDOS 11.01.2021 Commented out due to a jump when LoadMore images.
//            jQuerOs(container + ' .grid').isotope( 'destroy' );
            //VlaDOS 11.01.2021//
            jQuerOs(container + ' .grid').isotope();
        } 

        osg.reloadAfterLazyLoad = function(){
            jQuerOs('.grid').isotope('reloadItems');
            osg.resizeGallery();
            jQuerOs(container + ' .grid').imagesLoaded(function(){
                osg.isotope();
            });
        }
        
        // Функция для установки изображений, предшествующих активному
            osg.loopPrev = function (el, cssleft) {
                  if (jQuerOs(el).prev().hasClass("visible-block")) {
                    var imgprev_id = parseInt(jQuerOs(el).find('img:last').attr("slide_id"));

                    if (jQuerOs(el).prev().find('img').attr("slide_id") != "1") {
                        jQuerOs(el).prev().animate({
                            left: cssleft[imgprev_id - 2][1]
                        }, 300);
                    }
                    osg.loopPrev(jQuerOs(el).prev(), cssleft);
                }
            }

        //Функция установки изображений, следующих за активным 
            osg.loopNext = function (el, cssleft) {
                if (jQuerOs(el).next().hasClass("visible-block")) {
                    var imgnext_id = parseInt(jQuerOs(el).find('img:last').attr("slide_id"));
                    
                    jQuerOs(el).next().animate({
                        left: cssleft[imgnext_id][2]
                    }, 300);
                    osg.loopNext(jQuerOs(el).next(), cssleft);
                }
            }
            osg.initAccordeon = function (curCatId) {
                
                var cwidth = parseInt(jQuerOs(container + ".os-gallery-tabs-all-in-one-row .os-cat-tab-images").css("width").replace("px", ""));  // Получаем ширину контейнера с изображениями
                
                var img_count = osg.params.numColumns;          // Количество изображений

                var img_width = jQuerOs(container + ".os-gallery-tabs-all-in-one-row .os-cat-tab-images #cat-"+curCatId+"-"+osg.params.galIdRandom+" .visible-block").width();                 // Ширина одного изображения
                jQuerOs(container + '.os-gallery-tabs-all-in-one-row .os-cat-tab-images #cat-'+curCatId+'-'+osg.params.galIdRandom).css("width", ((img_count * img_width) + 500) + "px")
                
                var divider = cwidth / img_count;                       // Ширина полоски, выделяемой для изображения в отсутствии курсора мыши над контейнером
                var small_space = (cwidth - img_width) / (img_count - 1);       // Ширина полоски, выделяемой для изобржаения при наличии курсора мыши над контейнером

                var timer = null;                                                       // Таймер

                // Устанавливаем позиции изображений
                var cssleft = Array();                         


//                    jQuerOs(".os-gallery-tabs-all-in-one-row .os-cat-tab-images #cat-"+curCatId+"-"+osg.params.galIdRandom+" .visible-block img").each(function(index) {
                jQuerOs(container + ".os-gallery-tabs-all-in-one-row .os-cat-tab-images #cat-"+curCatId+"-"+osg.params.galIdRandom+" .visible-block").each(function(index) {
                    // Координаты хранятся в массиве
                    cssleft[index] = new Array();              
                    // Вычисляем и устанавливаем позицию изображения при отсутстсвии курсора мыши над контейнером
                    cssleft[index][0] = (index * divider) - (index * img_width);
                    jQuerOs(this).css("left", cssleft[index][0] + "px");

                    // Вычисляем позицию изображения при наведенном на него курсоре мыши
                    cssleft[index][1] = (index * small_space) - (index * img_width);

                    // Вычисляем координату правого угла изобржаения
                    var index2 = index;
                    if (index2 == 0) {
                        index2++;
                    }
                    cssleft[index][2] = cssleft[index2 - 1][1];
                });

                // Курсор мыши над изображением
                jQuerOs(container + ".os-gallery-tabs-all-in-one-row .os-cat-tab-images #cat-"+curCatId+"-"+osg.params.galIdRandom+" .visible-block").mouseenter(function() {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }

                    var self = this;

                    // Таймер используется для предотвращения "дергания" при быстром перемещении курсора мыши
                    // над контейнером с изображениями
                    timer = setTimeout(function() {
                        
                        var img_id = parseInt(jQuerOs(self).find('img:last').attr("slide_id").replace("img", "")) - 1;
                        
                        if (jQuerOs(self).find('img').attr("slide_id") != "1") {
                            jQuerOs(self).animate({
                                left: cssleft[img_id][1]
                            }, 300);
                        }               
                        osg.loopNext(self, cssleft);
                        osg.loopPrev(self, cssleft);
                    }, 200)

                });

            // Когда курсор мыши покидает контейнер изображений, возвращаем все в исходное состояние
                jQuerOs(container + ".os-gallery-tabs-all-in-one-row #cat-"+curCatId+"-"+osg.params.galIdRandom+" .grid").mouseleave(function() {
                    if (timer){
                        clearTimeout(timer);
                        timer = null;
                    }

                    jQuerOs(container + ".os-gallery-tabs-all-in-one-row .os-cat-tab-images #cat-"+curCatId+"-"+osg.params.galIdRandom+" .visible-block").each(function(index) {
                        jQuerOs(this).animate({
                            left: cssleft[index][0]
                        }, 300);
                    });
                });
            }

        //wE CREATEd UNICAL TIMER_id NAME FROM GALERRY id, i KNOW HOW DO THIS ONLY AS CLASS KEY    
        var checkingInterval = "checkingInterval"+osg.params.galIdRandom;
        var timeoutHandle = "timeoutHandle"+osg.params.galIdRandom;
        var os_check_timer = {} ;
        
        //Funkcija zagruzki izobrageniy//selector - dopolnitelniy put' kotoriy peredaetsya dlya nahogdeniya izobrageniy(za4astuyu razniy dlya raznih leyoutov i situaciy takih kak LoadMore)
        osg.imgLoad = function(selector){
            //Objavlyaem obeschaniya dlya slushatelya(moment gde obyavlena funkciya)
            return new Promise(function(resolve, reject) {
                if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
                if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                //Obyavlyaem taymaut, esli ogydanie zagruzki izobrageniya bolshe 15 sekund - to zacanchivaem 
                //jdat i stroim galereyu dalshe iz togo 4to est'(4toby izbegat blokirovki zaprosa serverom i ne jdat 5 minut)
                os_check_timer[timeoutHandle] = setTimeout(function(){
                    //ubivaem taimaut pered otpravkoy otveta
	            if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
	            if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                    //otpravlyaem otvet
                    resolve(true);
                }, 15000);
                //opredelyaem koli4estvo izobrajeniy kotorye est' po dannomu selektoru
                var count = jQuerOs(container + selector + ' img[data-src*=http]').length
                //ustanavlivaem shetchik dlya koli4estva zagrujenyh izobrageniy
                var lm = 0;
                //esly, po dannomu selektoru net izobrajeniy - srazu otpravlyaem otvet
                if(count == 0){
                    //ubivaem taymaut pered otpravkoy otveta
                    if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
                    if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                    //otpravlyaem otvet
                    resolve(true);
                }
                //nachinaem perebor izobrajeniy
                jQuerOs(container + selector + ' img[data-src*=http]').each(function(index){
                    //dobavlyaem atribut src k tegu izobrajeniya
                    jQuerOs(this).attr('src', jQuerOs(this).attr('data-src'))
                    //udalyaem atribut data-src, 4toby pri dogruzke izobrajeniy ne trogalo uze zagrujennye
                    jQuerOs(this).removeAttr('data-src')
                    //jdem polnoy zagruzki izobrajeniya
                    jQuerOs(this).load(function(){
                        //esly stranica peregrugena, to na leyaute massonry moget ne uspet poschitat vysotu, vyzyvaem etu funkciyu dlya ispravleniya
                        osg.checkHeight(this)
                            .then(function(returns) {
                            //esli izobrageniye zagruzilos i funkciya poschitala visotu - pereopredelyaem taymaut i ustanavlivaem vremya ots4eta obratno na 15 sekund.
                            if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
                            if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                            os_check_timer[timeoutHandle] = setTimeout(function(){
                                if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
                                if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                                resolve(true);
                            }, 15000);
                        })
                        //uvelichivaem schetchik zagrujenyh izobrageniy
                        lm++

                        //proveryaem, esli vse izobrageniya zagrujeny - ubivaem timout i otpravlyaem otvet
                        if(lm == count){
                            if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
                            if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                            resolve(true);
                        }
                        this.removeEventListener('load',arguments.callee,false);
                            
                    })
                })
                
            })
        }
        // v processe sozdaniya funkcii zagruzki izobrageniy stolknulsya s problemoy na tyajeloy stranice
        // nesmotrya na to, 4to kartinki vse byli zagrujeny, layout massonry ne uspeval pos4itat vysotu
        // eta funkciya prednazna4ena dlya ispravleniya etoy oshibki
        osg.checkHeight = function(selector){
            return new Promise(function(resolve, reject) {
               if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
               if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                os_check_timer[timeoutHandle] = setTimeout(function(){
                    if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
                    if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                    resolve(true);
                }, 15000);
                if(jQuerOs(selector).height()>0){
               	    if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
                    if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                    resolve(true)
                }else{
                    os_check_timer[checkingInterval] = setInterval(function() {
                      if(jQuerOs(selector).height()>0){
                	    if(typeof os_check_timer[checkingInterval] !== 'undefined') clearInterval(os_check_timer[checkingInterval])
                    	    if(typeof os_check_timer[timeoutHandle] !== 'undefined') clearTimeout(os_check_timer[timeoutHandle])
                            resolve(true)
                        }
                    }, 500);
                }

                
            })
        }
        
              
        
        
        osg.resizeGallery = function (){
            osg.params.imgBlockW = osg.getImgBlockWidth();
            jQuerOs(container+" .img-block").css("width",osg.params.imgBlockW+"%");
        }
        //function reinit for load more functions
        osg.reinit = function(catId, limEnd){
                
                if(limEnd != 0) jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom+" a.active").attr('data-end', limEnd);

                if(catId){

                    jQuerOs(container+" .os-cat-tab-images div[id^='cat-']").find(".os_fancybox-"+catId ).os_fancybox({
                        beforeShow: function(){
                            // resize html block to image width
                            if (this.os_image_id){
                                var id = this.os_image_id;
                            }
                            else {
                                var id = this.opts.$orig.attr('id');
                            }
                            id = id.split('-')[1];//get scalar id
                            var naturalWidth = jQuerOs('.htmlWidthAsImage#data-html-'+id+' .imgInHtml img').prop('naturalWidth');
                            if(naturalWidth){  
                                jQuerOs('.htmlWidthAsImage#data-html-'+id).css({'padding' : 0, 'width' : naturalWidth});
                                jQuerOs('.htmlWidthAsImage#data-html-'+id+' .contentInHtml').css({'padding' : 15});
                            }
                            jQuerOs('.os_fancybox-bg').css('backgroundColor', osg.params.os_fancybox_background);

                            if (this.os_image_id){
                                var id = this.os_image_id;
                            }    
                            else {
                                var id = this.opts.$orig.attr('id');
                            }
                            var href = window.location.href;
                            if(!from_history){
                                if (href.indexOf('&os_image_id') > -1) {

                                    history.pushState (null, null, href.substring(0, href.indexOf('&os_image_id') )+ "&" + id);}
                                else if (href.indexOf('?os_image_id') > -1) {

                                    history.pushState (href, null, href.substring(0, href.indexOf('?os_image_id')) + "?" + id);}
                                else if (href.indexOf('?') > -1 && href.indexOf('&') > -1 && href.indexOf('&os_image_id') == -1){

                                    history.pushState(null, null, href + '&' + id);}
                                else if ( href.indexOf('&') == -1 && href.indexOf('?os_image_id') == -1 && href.indexOf('?') == -1){

                                    history.pushState(null, null, href + '?' + id);}
                                else if (href.indexOf('?') > -1 && href.indexOf('os_image_id') == -1 ){
                                    history.pushState(null, null, href + '&' + id);
                                }

                            }
//                                        



                        },
                        beforeClose: function(){
                            var href = window.location.href;

                            if (href.indexOf('&os_image_id') > -1){
                                history.pushState (href, null, href.substring(0, href.indexOf('&os_image_id')));
                            }else{
                                history.pushState (href, null, href.substring(0, href.indexOf('?os_image_id')));
                            }
                            //return value scroll for load more function

                            
                        },
                        beforeLoad: function() {
                            //not use because call many times for one image
                        },
                        afterShow: function() {
                            var href = window.location.href;
                            var os_fancy_box_getInst = jQuerOs.os_fancybox.getInstance();
                            //get the length of the array
                            var os_fb_group_count = os_fancy_box_getInst.group.length;
                            //get the current position
                            var os_now = os_fancy_box_getInst.currIndex;

                            var os_show_load_more = osg.params.showLoadMore;
                            //if there are less than 3 pictures left before the end of the array and if load more is possible, we call the load
                            var catId = jQuerOs('.os-cat-tab-images .active').attr('data-cat-id');
                            var data_end = jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-end');
                            if(data_end == undefined){
                                data_end = 0
                            }

                            if ((Number(os_now) + 4) > os_fb_group_count && data_end > 0 && os_show_load_more !== null && os_show_load_more != 0){ 
                                


                                
                                jQuerOs(".os_fancybox-button--arrow_right").attr('disabled', 'true');
                                jQuerOs(".os_fancybox-button--arrow_left").attr('disabled', 'true');
                                var html = jQuerOs("<div class='os_fancybox-loading'></div>")
                                jQuerOs(".os_fancybox-slide").append(html)
                                

                            }

                            if (Number(os_now) == os_fb_group_count && jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-end') > -1){
                                jQuerOs(".os_fancybox-button--arrow_right").attr('disabled', 'true');
                            }


                        },
                        afterLoad: function(){
                            //not use because call many times for one image

                        },  
                        wrapCSS    : osg.params.fancSettings.wrapCSS,

                        animationEffect : osg.params.fancSettings.animationEffect,
                        animationDuration : osg.params.fancSettings.animationDuration,
                        transitionEffect : osg.params.fancSettings.transitionEffect,
                        transitionDuration : osg.params.fancSettings.transitionDuration,
                        loop: osg.params.fancSettings.loop,
                        arrows: osg.params.fancSettings.arrows,
                        clickContent : function( current, event ) {
                            return current.type === 'image' ? osg.params.fancSettings.clickContent : false;
                        },
                        wheel : osg.params.fancSettings.wheel,
                        slideShow : {
                            autoStart : osg.params.fancSettings.slideShow.autoStart,
                            speed     : osg.params.fancSettings.slideShow.speed
                        },

                        clickSlide : osg.params.fancSettings.clickSlide,
                        thumbs : {
                            autoStart : osg.params.fancSettings.thumbs.autoStart,
                            axis      : osg.params.fancSettings.thumbs.axis
                        },
                        buttons : [
                            osg.params.fancSettings.buttons.slideShow,
                            osg.params.fancSettings.buttons.fullScreen,
                            osg.params.fancSettings.buttons.thumbs,
                            osg.params.fancSettings.buttons.share,
                            osg.params.fancSettings.buttons.download,
                            osg.params.fancSettings.buttons.zoom,
                            osg.params.fancSettings.buttons.arrowLeft,
                            osg.params.fancSettings.buttons.arrowRight,
                            osg.params.fancSettings.buttons.close,
                        ],
                        share : {
                            tpl : osg.params.fancSettings.share.tpl
                        },
                        infobar: osg.params.fancSettings.infobar, //counter on/off
                        baseClass : osg.params.fancSettings.baseClass, //add appropriate class to set thumbnails position {thumb_bottom},{thumb_right}
                        loadmore : osg.params.showLoadMore,
                        idleTime: 60
                    });
                }
        }


        //initialize function
        osg.init = function(limEnd){ 
            inProgressAjax = false;
            if(osg.params.juri.slice(-1) == '/'){
                osg.params.juri = osg.params.juri.slice(0, -1);
            }
            if(limEnd != 0) jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom+" a.active").attr('data-end', limEnd);

            osg.params.imgBlockW = osg.getImgBlockWidth();
//            console.log('111111111111', imgBlockW)
            jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween + "px");
            jQuerOs("#button-"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween + "px");
            
            //if(osg.params.layout == 'default' || osg.params.layout == 'allInOneRow' || osg.params.layout == 'search'){
            
            jQuerOs(container+" .os-cat-tab-images div[id^='cat-']").each(function(index, el) {
                
                catId = jQuerOs(this).data("cat-id");
                catId1 = jQuerOs(this).data("cat-id");
                
                if(catId){

                    var os_fancy_box = jQuerOs(this).find(".os_fancybox-"+catId ).os_fancybox({


                        
                       beforeShow: function(){
                           
                            // resize html block to image width
                            if (this.os_image_id){
                                var id = this.os_image_id;
                            }
                            else {
                                var id = this.opts.$orig.attr('id');
                            }
                            id = id.split('-')[1];//get scalar id
                            var naturalWidth = jQuerOs('.htmlWidthAsImage#data-html-'+id+' .imgInHtml img').prop('naturalWidth');
                            if(naturalWidth){  
                                jQuerOs('.htmlWidthAsImage#data-html-'+id).css({'padding' : 0, 'width' : naturalWidth});
                                jQuerOs('.htmlWidthAsImage#data-html-'+id+' .contentInHtml').css({'padding' : 15});
                            }
                            jQuerOs('.os_fancybox-bg').css('backgroundColor', osg.params.os_fancybox_background);

                            if (this.os_image_id){
                                var id = this.os_image_id;
                            }    
                            else {
                                var id = this.opts.$orig.attr('id');
                            }

                            var href = window.location.href;

                            if(!from_history){


                                if (href.indexOf('&os_image_id') > -1) {

                                    history.pushState (null, null, href.substring(0, href.indexOf('&os_image_id') )+ "&" + id);
                                }
                                else if (href.indexOf('?os_image_id') > -1) {

                                    history.pushState (href, null, href.substring(0, href.indexOf('?os_image_id')) + "?" + id);}
                                else if (href.indexOf('?') > -1 && href.indexOf('&') > -1 && href.indexOf('&os_image_id') == -1){

                                    history.pushState(null, null, href + '&' + id);}
                                else if ( href.indexOf('&') == -1 && href.indexOf('?os_image_id') == -1 && href.indexOf('?') == -1){

                                    history.pushState(null, null, href + '?' + id);}
                                else if (href.indexOf('?') > -1 && href.indexOf('os_image_id') == -1 ){

                                    history.pushState(null, null, href + '&' + id);
                                }

                            }
//                                        
//                                       



                        },
                        beforeClose: function(){

                            var href = window.location.href;

                            if (href.indexOf('&os_image_id') > -1){
                                history.pushState (href, null, href.substring(0, href.indexOf('&os_image_id')));
                            }else{
                                history.pushState (href, null, href.substring(0, href.indexOf('?os_image_id')));
                            } 
                            //return value scroll for load more function
                            if (osg.params.showLoadMore == 'scroll'){
                                osg.loadMore(osg.params.showLoadMore);
                            }
                            jQuerOs('.os-cat-tab-images .active').removeClass('active');
                        },
                        beforeLoad: function() {
                            //not use because call many times for one image



                        },
                        afterShow: function() {

                            
                            var iframe_content = jQuerOs('.os_fancybox-content');
                            if(iframe_content.length > 0){

                            }
                            var href = window.location.href;
                            var os_fancy_box_getInst = jQuerOs.os_fancybox.getInstance();
                            //get the length of the array
                            var os_fb_group_count = os_fancy_box_getInst.group.length;
                            //get the current position
                            var os_now = os_fancy_box_getInst.currIndex;
//                            if(os_now == undefined){
//                                var cat_id = jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-cat-id');
//                                os_now = jQuerOs("#cat-"+cat_id+"-"+osg.params.galIdRandom + " .img-block").length;
//                            } 
                            var os_show_load_more = osg.params.showLoadMore;
                            //if there are less than 3 pictures left before the end of the array and if load more is possible, we call the load
                            
                            var catId = jQuerOs('.os-cat-tab-images .active').attr('data-cat-id');
                            var data_end = jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-end');
                            if(data_end == undefined){
                                data_end = 0
                            }

                            if ((Number(os_now) + 4) > os_fb_group_count && data_end > 0  && os_show_load_more !== null && os_show_load_more != 0){ 
                                
                                jQuerOs(".os_fancybox-button--arrow_right").attr('disabled', 'true');
                                jQuerOs(".os_fancybox-button--arrow_left").attr('disabled', 'true');
                                var html = jQuerOs("<div class='os_fancybox-loading'></div>")
                                jQuerOs(".os_fancybox-slide").append(html)
                                

                            }

                            if (Number(os_now) == os_fb_group_count && jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-end') > -1){
                                jQuerOs(".os_fancybox-button--arrow_right").attr('disabled', 'true');
                            }


                        },
                        afterLoad: function(){
                            //not use because call many times for one image
                        },        


                        wrapCSS    : osg.params.fancSettings.wrapCSS,

                        animationEffect : osg.params.fancSettings.animationEffect,
                        animationDuration : osg.params.fancSettings.animationDuration,
                        transitionEffect : osg.params.fancSettings.transitionEffect,
                        transitionDuration : osg.params.fancSettings.transitionDuration,
                        loop: osg.params.fancSettings.loop,
                        arrows: osg.params.fancSettings.arrows,
                        //VlaDOS 28.05.2021
                        //This function checks if the object is a picture, this option is triggered, if any other element (video, html, etc.), then no. After the client has contacted and verified, the function is not needed, fancybox defines it itself.
//                        clickContent : function( current, event ) {

//                            return current.type === 'image' ? osg.params.fancSettings.clickContent : false;
//                        },
                        //VlaDOS 28.05.2021
                        clickContent : osg.params.fancSettings.clickContent,
                        wheel : osg.params.fancSettings.wheel,
                        slideShow : {
                            autoStart : osg.params.fancSettings.slideShow.autoStart,
                            speed     : osg.params.fancSettings.slideShow.speed
                        },

                        clickSlide : osg.params.fancSettings.clickSlide,
                        thumbs : {
                            autoStart : osg.params.fancSettings.thumbs.autoStart,
                            axis      : osg.params.fancSettings.thumbs.axis
                        },
                        buttons : [
                            osg.params.fancSettings.buttons.slideShow,
                            osg.params.fancSettings.buttons.fullScreen,
                            osg.params.fancSettings.buttons.thumbs,
                            osg.params.fancSettings.buttons.share,
                            osg.params.fancSettings.buttons.download,
                            osg.params.fancSettings.buttons.zoom,
                            osg.params.fancSettings.buttons.arrowLeft,
                            osg.params.fancSettings.buttons.arrowRight,
                            osg.params.fancSettings.buttons.close,
                        ],
                        share : {
                            tpl : osg.params.fancSettings.share.tpl
                        },
                        infobar: osg.params.fancSettings.infobar, //counter on/off
                        baseClass : osg.params.fancSettings.baseClass, //add appropriate class to set thumbnails position {thumb_bottom},{thumb_right}
                        loadmore : osg.params.showLoadMore,
                        idleTime: 60

                    });
                }
            });
            
            width = jQuerOs(window).width();
            if(osg.params.imgCountCat != ''){
                var img_count_cat = JSON.parse(osg.params.imgCountCat);
            }else{
                var img_count_cat = '';
            }
            
            if(osg.params.layout != 'allInOne'){
                jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom+" a").click(function(e) {
                    
                    e.preventDefault();
                    jQuerOs('#os_progres_img-'+osg.params.galIdRandom+':last' ).addClass('img-block1'); 
                    jQuerOs('li a').removeClass("active");
                    jQuerOs(container+" .os-cat-tab-images>div").hide();
                    jQuerOs(this).addClass("active");
                    osg.params.curCatId = jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom+" a.active").attr('data-cat-id');
                    osg.imgLoad(" div#cat-"+osg.params.curCatId + '-' + osg.params.galIdRandom)
                        .then(function(returns) {
                        osg.params.imgBlockW = osg.getImgBlockWidth();
                        if(osg.params.layout == 'default' || osg.params.layout == 'search'){
                            jQuerOs(container+" .img-block").css("width",osg.params.imgBlockW+"%");
                            osg.setImgBlockHeight()

                        }else if(osg.params.layout == 'allInOne'){

                            jQuerOs(container+" .all-in-one-block .img-block:first-child").css("width",osg.params.imgBlockW+"%");
                            osg.setImgBlockHeight()
                            jQuerOs(container+" .os-cat-tab-images").show();
                        }else if(osg.params.layout == 'masonry'){

                            jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+"px");
                            jQuerOs("#button-"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+"px");
                            jQuerOs(container+" #grid-"+osg.params.galIdRandom).css("width",osg.params.imgBlockW+"%");
                            osg.setImgBlockHeight()
            //            }else if(osg.params.layout == 'fitRows'|| osg.params.layout == 'allInOneRow' ){
                        }else if(osg.params.layout == 'fitRows'){
                            jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+"px");
                            jQuerOs("#button-"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+"px");
                        }else if(osg.params.layout == 'allInOneRow'){
            //                jQuerOs(container+" .img-block").css("width","100%");
                        }
                        
                        var href = window.location.href;
                        if (!from_history && href.indexOf('os_image_id') == -1){

                            if (href.indexOf('?cat-') > -1) {

                                history.pushState (null, null, href.substring(0, href.indexOf('?cat-') ) + '?cat-' + osg.params.curCatId);
                            }else if (href.indexOf('&cat-') > -1) {

                                history.pushState (null, null, href.substring(0, href.indexOf('&cat-') ) + '&cat-' + osg.params.curCatId);
                            }else if (href.indexOf('?') > -1){

                                history.pushState(null, null, href + '&cat-' + osg.params.curCatId);
                            }else {

                                history.pushState(null, null, href + '?cat-' + osg.params.curCatId);
                            }
                        }

                        jQuerOs("#cat-"+osg.params.curCatId+"-"+osg.params.galIdRandom).show();
                        jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-cat-id', osg.params.curCatId);
                        curEnd = jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom+" a.active").attr('data-end');
                        
                        if(osg.params.layout != 'allInOneRow' && osg.params.layout != 'allInOne' && osg.params.showLoadMore == 'button'){
                            
                            if(img_count_cat != '' && jQuerOs('#cat-' + osg.params.curCatId +'-'+osg.params.galIdRandom).children().length >= Number(img_count_cat[osg.params.curCatId])){

                                jQuerOs("#load-more-"+osg.params.galIdRandom+"[data-cat-id="+osg.params.curCatId+"]").hide();
                            }else{

                                jQuerOs("#load-more-"+osg.params.galIdRandom+"[data-cat-id="+osg.params.curCatId+"]").show();
    //                            jQuerOs("#load-more-"+osg.params.galIdRandom+"[data-cat-id="+osg.params.curCatId+"]").parent().show()
                            }
                        }
                        if(curEnd != -1){
                            jQuerOs("#load-more-"+osg.params.galIdRandom).removeAttr("disabled");
                            jQuerOs("#load-more-"+osg.params.galIdRandom).css("background", osg.params.load_more_background);
                        }
                        limEnd = curEnd
                        jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-end', curEnd);
                        
                        
                        jQuerOs(jQuerOs(this).attr("href")).fadeTo(500, 1);
                        var href = window.location.href;
                        var img_el_id = '';
                        var pos1 = href.indexOf('os_image_id'); 
                        var pos2 = href.lastIndexOf('#'); 
                        var os_show_load_more = osg.params.showLoadMore;
                        if (pos1 > -1 && pos2 > - 1) {
                            img_el_id = href.substring(pos1, pos2); 
                        }else if(pos1 > -1 && pos2 == -1){
                            img_el_id = href.substring(pos1);
                        }
                        os_fancy_box_getInst = jQuerOs.os_fancybox.getInstance(); 

                        if(!os_fancy_box_getInst){
                            
                            if(img_el_id && img_el_id.indexOf('os_image_id') > -1)  {
                                
                                if(document.getElementById(img_el_id) == null){
                                    

                                }

                                else {
                                    jQuerOs('#' + img_el_id).trigger('click');
                                }
                            }
                        }
                        jQuerOs('#os_progres_img-'+osg.params.galIdRandom+':last' ).removeClass('img-block1'); 
                        
                        
                        if(osg.params.layout == 'masonry'){
                            osg.isotope();
                            osg.reloadIsotope();
//                        }else if(osg.params.layout == 'fitRows' || osg.params.layout == 'allInOneRow'){
                        }else if(osg.params.layout == 'fitRows'){
                            osg.fitRowsIsotope(osg.params.curCatId);
                        }else if(osg.params.layout == 'allInOneRow'){
//                            setTimeout(function(){ 

                                osg.initAccordeon(osg.params.curCatId)
                                
                                
//                            }, 3000);
                            

                        }
                    })

                });
            }else{
                jQuerOs('.img-block').on('click', function(){
                    //e.preventDefault();
                    jQuerOs('li a').removeClass("active");
                    jQuerOs(this).parent().addClass('active');
                    osg.params.curCatId = jQuerOs(this).parent().attr('data-cat-id');
                    var href = window.location.href;
                    //???????
                    if (!from_history && href.indexOf('os_image_id') == -1){
                        if (href.indexOf('?cat-') > -1) {

                            history.pushState (null, null, href.substring(0, href.indexOf('?cat-') ) + '?cat-' + osg.params.curCatId);
                        }else if (href.indexOf('&cat-') > -1) {

                            history.pushState (null, null, href.substring(0, href.indexOf('&cat-') ) + '?cat-' + osg.params.curCatId);
                        }else if (href.indexOf('?') > -1){

                            history.pushState(null, null, href + '&cat-' + osg.params.curCatId);
                        }else {

                            history.pushState(null, null, href + '?cat-' + osg.params.curCatId);
                        }
                    }
                    //????????
                    jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-cat-id', osg.params.curCatId);
                    curEnd = jQuerOs('a#cat-'+osg.params.curCatId+osg.params.galIdRandom).attr('data-end');

                    jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-end', curEnd);


                });
                
                
            }
            var href = window.location.href;
            var position_gallery = href.indexOf('cat');
            var gallery_cat_id = '';
            var gallery_cat_id = href.substring(position_gallery);
            if(gallery_cat_id.indexOf('&') > -1){
                gallery_cat_id = gallery_cat_id.substr(0, gallery_cat_id.indexOf('&'));
            }
            var cat_id = gallery_cat_id.replace(/cat-/i, '');
            
            
            if(gallery_cat_id && gallery_cat_id.indexOf('cat-') > -1 && gallery_cat_id.indexOf('=') == -1 && osg.params.layout != 'album' && img_count_cat[cat_id] !== undefined){
                jQuerOs('#' + gallery_cat_id + osg.params.galIdRandom).trigger('click');
            }else{
                if(osg.params.layout == 'album'){
                    
                    //начинаем загрузку изображений
                    osg.imgLoad(" .album-main-image")
                      .then(function(returns) {
                          if(osg.params.layout == 'album'){

                                if(osg.params.albumSublayout == 'fit_rows'){
                                    var numColumns = osg.params.numColumns
                                    osg.params.imgBlockW = ( (((mainBlockW-(spaceBetween*numColumns))/numColumns) )*100)/mainBlockW  ;
                                    if(osg.params.minImgEnable){
                                        if(((osg.params.imgBlockW*mainBlockW)/100) < osg.params.minImgSize){
                                            numColumns--;
                                            osg.getImgBlockWidth(numColumns);
                                        }
                                    }
                                    var sizeAwesome = ((osg.params.imgBlockW*mainBlockW)/100)/11+"px";
                                    jQuerOs(container +" .andrea-effect .andrea-zoom-in").css({'width': sizeAwesome, 'height': sizeAwesome });
                                    var fontSizetext = ((osg.params.imgBlockW*mainBlockW)/100)/15+"px";
                                    jQuerOs(container +" .img-block").css({'font-size': fontSizetext, 'line-height': fontSizetext });
                                }
                                jQuerOs("#button-"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+'px');
                                jQuerOs(container+" .album-block .img-block").css("width",osg.params.imgBlockW+"%");
                                osg.setImgBlockHeight()
                                jQuerOs(container+" .os-cat-tab-images").show();

                            }

    //                " div#cat-"+osg.params.curCatId + '-' + osg.params.galIdRandom
                            jQuerOs(container+" .album-main-image").click(function(event) {
                                albumId = jQuerOs(this).data("cat-id");
                                osg.imgLoad(" div#cat-"+albumId + '-' + osg.params.galIdRandom)
                                    .then(function(returns) {
                                        var href = window.location.href;
                                        if (!from_history && href.indexOf('os_image_id') == -1){
                                            if (href.indexOf('?cat-') > -1) {

                                                history.pushState (null, null, href.substring(0, href.indexOf('?cat-') ) + '?cat-' + albumId);
                                            }else if (href.indexOf('&cat-') > -1) {

                                                history.pushState (null, null, href.substring(0, href.indexOf('&cat-') ) + '&cat-' + albumId);
                                            }else if (href.indexOf('?') > -1){

                                                history.pushState(null, null, href + '&cat-' + albumId);
                                            }else {

                                                history.pushState(null, null, href + '?cat-' + albumId);
                                            }
                                        }

                                        jQuerOs("#back-"+osg.params.galIdRandom).css("margin", osg.params.spaceBetween +"px");
                                        osg.params.curCatId = jQuerOs("#cat-"+albumId+"-"+osg.params.galIdRandom).attr('data-cat-id');
                                        jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-cat-id', osg.params.curCatId);

                                        var curEnd = jQuerOs("#cat-"+albumId+"-"+osg.params.galIdRandom).attr('data-end');


                                        jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-end', curEnd);

                                        jQuerOs(container+" .back-to-albums").data("cat-id", albumId);
                                        //show album
                                        jQuerOs(container+" .os-gallery-album-"+albumId).parent().fadeTo( "slow", 1 );
                                        jQuerOs(container+" .os-gallery-album-"+albumId+","+container+" .back-to-albums").fadeTo( "slow", 1 );

                                        if(osg.params.showLoadMore == 'button'){
                                            jQuerOs("#load-more-"+osg.params.galIdRandom).fadeTo( "slow", 1 );

                                        }

                                        //hide albums main image
                                        jQuerOs(container+" .album-main-image").parent().hide();

                                        jQuerOs("#cat-"+albumId+"-"+osg.params.galIdRandom+" .grid").show();
                                        jQuerOs("#cat-"+albumId+"-"+osg.params.galIdRandom+" .img-block:not(:first)").show();
                                        window.stopAlbum = true;
                                        
                                        if(osg.params.imgCountCat != ''){
                                            var img_count_cat = JSON.parse(osg.params.imgCountCat);
                                        }else{
                                            var img_count_cat = '';
                                        }
                                        
                                        if(img_count_cat != '' && (jQuerOs('#cat-' + osg.params.curCatId +'-'+osg.params.galIdRandom + ' .grid .album-images-block').children().length) >= Number(img_count_cat[osg.params.curCatId])){
                                            
                                            jQuerOs("#load-more-"+osg.params.galIdRandom+"[data-cat-id="+osg.params.curCatId+"]").hide();

                                        }else{
                                            if(osg.params.showLoadMore == 'button'){
                                                jQuerOs("#load-more-"+osg.params.galIdRandom+"[data-cat-id="+osg.params.curCatId+"]").show();
                                            }
                                        }
                                        if(curEnd != -1){
                                            jQuerOs("#load-more-"+osg.params.galIdRandom).removeAttr("disabled");
                                            jQuerOs("#load-more-"+osg.params.galIdRandom).css("background", osg.params.load_more_background);
                                        }
                                        var href = window.location.href;
                                        var img_el_id = '';
                                        var pos1 = href.indexOf('os_image_id'); 
                                        var pos2 = href.lastIndexOf('#'); 
                                        var catId = '';
                                        var cat_pos1 = href.indexOf('os_fancybox');
                                        var cat_pos = href.substring(cat_pos1, href.lastIndexOf('-'));
                                        var cat_pos = cat_pos.substring(cat_pos.lastIndexOf('-'));
                                        var os_show_load_more = osg.params.showLoadMore;
                                        if (pos1 > -1 && pos2 > - 1) {
                                            img_el_id = href.substring(pos1, pos2); 
                                        }else if(pos1 > -1 && pos2 == -1){
                                            img_el_id = href.substring(pos1);
                                        }

                                        os_fancy_box_getInst = jQuerOs.os_fancybox.getInstance(); 

                                        if(!os_fancy_box_getInst){
                                            if(img_el_id && img_el_id.indexOf('os_image_id') > -1)  {

                                                if(document.getElementById(img_el_id) == null){
                                                    

                                                }

                                                else {
                                                    jQuerOs('#' + img_el_id).trigger('click');
                                                }
                                            }
                                        }
                                        if(osg.params.albumSublayout == 'masonry'){
                                            osg.isotope();
//                                            osg.reloadIsotope();
                                        }else if(osg.params.albumSublayout == 'fit_rows'){
                                            osg.resizeGallery();
                                            osg.fitRowsIsotope(osg.params.curCatId);
                                        }

                                    })

                            });

                            jQuerOs(container+" .back-to-albums").unbind('click');
                            jQuerOs(container+" .back-to-albums").click(function(event) {
                                //hide images
                                albumId = jQuerOs(this).data("cat-id");
                                var href = window.location.href;

                                if (href.indexOf('&cat-') > -1){

                                    history.pushState (href, null, href.substring(0, href.indexOf('&cat-')));
                                }else if (href.indexOf('?cat-') > -1){

                                    history.pushState (href, null, href.substring(0, href.indexOf('?cat-')));
                                }

                                jQuerOs(container+" .os-gallery-album-"+albumId).parent().hide();
                                jQuerOs(container+" .os-gallery-album-"+albumId+","+container+" .back-to-albums").hide();
                                jQuerOs("#cat-"+albumId+"-"+osg.params.galIdRandom+" .img-block").hide();
                                jQuerOs("#cat-"+albumId+"-"+osg.params.galIdRandom+" .grid").hide();
                                jQuerOs("#load-more-"+osg.params.galIdRandom).hide();

                                //show albums
                                window.stopAlbum = false;
                                //jQuerOs(container+" .album-main-image").parent().fadeIn( 2000 );
                                jQuerOs(container+" .album-main-image").parent().show();
                                jQuerOs('#os_lm_progres_img-'+osg.params.galIdRandom+':last' ).hide();

                            });
                            if(gallery_cat_id && gallery_cat_id.indexOf('cat-') > -1 && gallery_cat_id.indexOf('=') == -1){
                                jQuerOs('#' + gallery_cat_id +'-'+ osg.params.galIdRandom +' .album-main-image').trigger('click');
                            }
                            
                      })

                }else{
    //                osg.imgLoad();
                    
                    jQuerOs(container+" .os-cat-tab-images div:first-child").show();
                    jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom+" li:first-child a").addClass("active");
                    if(osg.params.layout == 'allInOne'){
                        osg.params.curCatId = jQuerOs(container+" .cat-"+osg.params.galIdRandom).attr('data-cat-id');
                    }else{
                        osg.params.curCatId = jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom+" a.active").attr('data-cat-id');    
                    }
                    
                    if(osg.params.layout == 'allInOne'){
                        var selector = "";
                    }else{
                        var selector = " div#cat-"+osg.params.curCatId + '-' + osg.params.galIdRandom;
                    }

                    if(osg.params.curCatId == ''){
                        osg.params.curCatId = 1
                    }
                    var curEnd = jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom+" a.active").attr('data-end');
                    if(curEnd === undefined){
                        curEnd = osg.params.limEnd;
                    }

                    jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-cat-id', osg.params.curCatId);
                    jQuerOs("#load-more-"+osg.params.galIdRandom).attr('data-end', curEnd);
                    if(osg.params.layout == 'default' || osg.params.layout == 'search'){
                        jQuerOs(container+" .img-block").css("width",osg.params.imgBlockW+"%");
                        osg.setImgBlockHeight()

                    }
                    osg.imgLoad(selector)
                      .then(function(returns) { // `delay` returns a promise

    //                  })

    //                if(osg.imgLoad(" div#cat-"+osg.params.curCatId + '-' + osg.params.galIdRandom)){

                        if(returns == true){ 
                            osg.params.imgBlockW = osg.getImgBlockWidth();
                            if(osg.params.layout == 'default' || osg.params.layout == 'search'){
                                jQuerOs(container+" .img-block").css("width",osg.params.imgBlockW+"%");
                                osg.setImgBlockHeight()

                            }else if(osg.params.layout == 'allInOne'){

                                jQuerOs(container+" .all-in-one-block .img-block:first-child").css("width",osg.params.imgBlockW+"%");
                                osg.setImgBlockHeight()
                                jQuerOs(container+" .os-cat-tab-images").show();
                            }else if(osg.params.layout == 'masonry'){

                                jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+"px");
                                jQuerOs("#button-"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+"px");
                                jQuerOs(container+" #grid-"+osg.params.galIdRandom).css("width",osg.params.imgBlockW+"%");
                                osg.setImgBlockHeight()
                //            }else if(osg.params.layout == 'fitRows'|| osg.params.layout == 'allInOneRow' ){
                            }else if(osg.params.layout == 'fitRows'){
                                jQuerOs(container+" .osgalery-cat-tabs#"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+"px");
                                jQuerOs("#button-"+osg.params.galIdRandom).css("padding", osg.params.spaceBetween+"px");
                            }else if(osg.params.layout == 'allInOneRow'){
                //                jQuerOs(container+" .img-block").css("width","100%");
                            }






                            if(img_count_cat != '' && jQuerOs('#cat-' + osg.params.curCatId +'-'+osg.params.galIdRandom).children().length >= img_count_cat[osg.params.curCatId]){
                                jQuerOs("#load-more-"+osg.params.galIdRandom+"[data-cat-id="+osg.params.curCatId+"]").hide();
                            }else if(img_count_cat != '' && !Array.isArray(img_count_cat) && jQuerOs('#cat-1-'+osg.params.galIdRandom).children().length >= img_count_cat){
                                jQuerOs("#load-more-"+osg.params.galIdRandom).hide();
                            }

                            if(osg.params.layout == 'masonry'){
                                //fix animate CSS and images appear error for old browsers
                                jQuerOs('.tab-click-loadMore').click(function() {

                                   setTimeout(function(){ 
                                        osg.reloadIsotope();
                                    }, 2000);
                                });  
                            }
                            if(osg.params.layout == 'allInOne'){
                                var href = window.location.href;
                                var img_el_id = '';
                                var pos1 = href.indexOf('os_image_id'); 
                                var pos2 = href.lastIndexOf('#'); 
                                var os_show_load_more = osg.params.showLoadMore;
                                if (pos1 > -1 && pos2 > - 1) {
                                    img_el_id = href.substring(pos1, pos2); 
                                }else if(pos1 > -1 && pos2 == -1){
                                    img_el_id = href.substring(pos1);
                                }
                                os_fancy_box_getInst = jQuerOs.os_fancybox.getInstance(); 

                                if(!os_fancy_box_getInst){

                                    if(img_el_id && img_el_id.indexOf('os_image_id') > -1)  {

                                        if(document.getElementById(img_el_id) == null){
                                            

                                        }

                                        else {
                                            jQuerOs('#' + img_el_id).trigger('click');
                                        }
                                    }
                                }
                            }
                            
                            

                        }
                    }).finally(() => {
                        if(osg.params.layout == 'masonry' || (osg.params.layout == 'album' && osg.params.albumSublayout == 'masonry')){
                                
                                osg.isotope();
//                               osg.reloadIsotope(); 
                //            }else if(osg.params.layout == 'fitRows' || osg.params.layout == 'allInOneRow'){
                //            }else if(osg.params.layout == 'fitRows' || osg.params.layout == 'allInOneRow'){
                            }else if(osg.params.layout == 'fitRows'){    
                                osg.resizeGallery();
                                osg.fitRowsIsotope(osg.params.curCatId);
                            }else if(osg.params.layout == 'allInOneRow'){

                                var href = window.location.href;
                                var position_gallery = href.indexOf('cat');
                                var gallery_cat_id = '';
                                var gallery_cat_id = href.substring(position_gallery);
                                if(gallery_cat_id.indexOf('&') > -1){
                                    gallery_cat_id = gallery_cat_id.substr(0, gallery_cat_id.indexOf('&'));
                                }
                                var cat_id = gallery_cat_id.replace(/cat-/i, '');
            
                                
                                if(gallery_cat_id && gallery_cat_id.indexOf('cat-') > -1 && gallery_cat_id.indexOf('=') == -1 && img_count_cat[cat_id] !== undefined){
//                                if(gallery_cat_id && gallery_cat_id.indexOf('cat-') > -1 && gallery_cat_id.indexOf('=') == -1){
    //                                jQuerOs(container + ' #' + gallery_cat_id + osg.params.galIdRandom).trigger('click');
                                }else{
                                    osg.initAccordeon(osg.params.curCatId)
                                }

                            }
                            
                            //VlaDOS 2021/09/14 Added for fixes in version 6.0. A possible problem is the preloader.
                            if(osg.params.layout == 'default'){
                                osg.resizeGallery();
                            }
                            //VlaDOS end
                    })
                }
            }
            
            
            jQuerOs(window).resize(function(event) {
                
                if(osg.params.layout == 'masonry' || (osg.params.layout == 'album' && osg.params.albumSublayout == 'masonry')){
                    osg.resizeGallery();
                    if(jQuerOs(window).width() != width){
                        width = jQuerOs(window).width();
                        osg.reloadIsotope();
                    }
//                }else if(osg.params.layout == 'fitRows' || osg.params.layout == 'allInOneRow' || (osg.params.layout == 'album' && osg.params.albumSublayout == 'fitRows')){
                }else if(osg.params.layout == 'fitRows' || (osg.params.layout == 'album' && osg.params.albumSublayout == 'fitRows')){
                    osg.fitRowsIsotope(osg.params.curCatId);
                }else{
                    osg.resizeGallery();
                }
//                if(osg.params.layout != 'fitRows' && osg.params.layout != 'masonry'){
//                    osg.resizeGallery();
//                }else if(osg.params.layout == 'masonry'){
//                    osg.resizeGallery();
//                    osg.reloadIsotope();
//                }else{
//                    osg.fitRowsIsotope(osg.params.curCatId);
//                }
            });
            
            
            
        }
        osg.init();
        //VlaDOS 25.09.2020
        //This line was added in 2018 or 2019 to fix the Masonry Layout error on iPhone 4. 
        //Commented on 09/25/2020 to fix the error of framing the first image in the Fitrow Layout
//        setTimeout(osg.resizeGallery, 200);
        //VlaDOS end

        
        
        osg.fileExists = function(url) {
            if(url){
                var client = new XMLHttpRequest();
                client.onload = function() {
                    // in case of network errors this might not give reliable results
//                    return this.status==200
                    
                  if ( this.status === 200 ) {
                    return true;
                  }
                  else {
                    return false;
                  }
                }
                client.open( "HEAD", url, true );
                client.send();

            } else {
                return false;
            }
        }
        
        

    }
    window.osGallery = osGallery;
})();
