import React, { useEffect } from 'react';

const MyPage = () => {
  useEffect(() => {
    
    (function($, wp, wps, window, undefined){
        '$:nomunge';
        
        var $w = $(window),
        
        
        eventName = 'waypoint.reached',
      
        triggerWaypoint = function(way, dir) {
            way.element.trigger(eventName, dir);
            if (way.options.triggerOnce) {
                way.element[wp]('destroy');
            }
        },
        
        waypointIndex = function(el, context) {
            if (!context) return -1;
            var i = context.waypoints.length - 1;
            while (i >= 0 && context.waypoints[i].element[0] !== el[0]) {
                i -= 1;
            }
            return i;
        },
        
     
        contexts = [],
       
        Context = function(context) {
            $.extend(this, {
                element: $(context),
                oldScroll: 0,
                
               
                'waypoints': [],
                
                didScroll: false,
                didResize: false,
        
                doScroll: $.proxy(function() {
                    var newScroll = this.element.scrollTop(),
                    
                   
                   
                    isDown = newScroll > this.oldScroll,
                    that = this,
    
                   
                    pointsHit = $.grep(this.waypoints, function(el, i) {
                        return isDown ?
                            (el.offset > that.oldScroll && el.offset <= newScroll) :
                            (el.offset <= that.oldScroll && el.offset > newScroll);
                    }),
                    len = pointsHit.length;
                    
                   
                    if (!this.oldScroll || !newScroll) {
                        $[wps]('refresh');
                    }
    
                    
                    this.oldScroll = newScroll;
    
                    
                    if (!len) return;
    
                    
                    if (!isDown) pointsHit.reverse();
    
                    
                    $.each(pointsHit, function(i, point) {
                        if (point.options.continuous || i === len - 1) {
                            triggerWaypoint(point, [isDown ? 'down' : 'up']);
                        }
                    });
                }, this)
            });
            
            
            $(context).bind('scroll.waypoints', $.proxy(function() {
                if (!this.didScroll) {
                    this.didScroll = true;
                    window.setTimeout($.proxy(function() {
                        this.doScroll();
                        this.didScroll = false;
                    }, this), $[wps].settings.scrollThrottle);
                }
            }, this)).bind('resize.waypoints', $.proxy(function() {
                if (!this.didResize) {
                    this.didResize = true;
                    window.setTimeout($.proxy(function() {
                        $[wps]('refresh');
                        this.didResize = false;
                    }, this), $[wps].settings.resizeThrottle);
                }
            }, this));
            
            $w.load($.proxy(function() {
               
                this.doScroll();
            }, this));
        },
        
        getContextByElement = function(element) {
            var found = null;
            
            $.each(contexts, function(i, c) {
                if (c.element[0] === element) {
                    found = c;
                    return false;
                }
            });
            
            return found;
        },
        
       
        methods = {
            
            init: function(f, options) {
                
                this.each(function() {
                    var cElement = $.fn[wp].defaults.context,
                    context,
                    $this = $(this);
    
                   
                    if (options && options.context) {
                        cElement = options.context;
                    }
    
                    
                    if (!$.isWindow(cElement)) {
                        cElement = $this.closest(cElement)[0];
                    }
                    context = getContextByElement(cElement);
    
                  
                    if (!context) {
                        context = new Context(cElement);
                        contexts.push(context);
                    }
                    
                   
                    var ndx = waypointIndex($this, context),
                    base = ndx < 0 ? $.fn[wp].defaults : context.waypoints[ndx].options,
                    opts = $.extend({}, base, options);
                    
                   
                    opts.offset = opts.offset === "bottom-in-view" ?
                        function() {
                            var cHeight = $.isWindow(cElement) ? $[wps]('viewportHeight')
                                : $(cElement).height();
                            return cHeight - $(this).outerHeight();
                        } : opts.offset;
    
                    
                    if (ndx < 0) {
                        context.waypoints.push({
                            'element': $this,
                            'offset': null,
                            'options': opts
                        });
                    }
                    else {
                        context.waypoints[ndx].options = opts;
                    }
                    
                  
                    if (f) {
                        $this.bind(eventName, f);
                    }
                  
                    if (options && options.handler) {
                        $this.bind(eventName, options.handler);
                    }
                });
                
                
                $[wps]('refresh');
                
                return this;
            },
            
            remove: function() {
                return this.each(function(i, el) {
                    var $el = $(el);
                    
                    $.each(contexts, function(i, c) {
                        var ndx = waypointIndex($el, c);
    
                        if (ndx >= 0) {
                            c.waypoints.splice(ndx, 1);
    
                            if (!c.waypoints.length) {
                                c.element.unbind('scroll.waypoints resize.waypoints');
                                contexts.splice(i, 1);
                            }
                        }
                    });
                });
            },
           
            destroy: function() {
                return this.unbind(eventName)[wp]('remove');
            }
        },
       
        jQMethods = {
           
            refresh: function() {
                $.each(contexts, function(i, c) {
                    var isWin = $.isWindow(c.element[0]),
                    contextOffset = isWin ? 0 : c.element.offset().top,
                    contextHeight = isWin ? $[wps]('viewportHeight') : c.element.height(),
                    contextScroll = isWin ? 0 : c.element.scrollTop();
                    
                    $.each(c.waypoints, function(j, o) {
                       
                        if (!o) return;
    
                       
                        var adjustment = o.options.offset,
                        oldOffset = o.offset;
                        
                        // Set adjustment to the return value if offset is a function.
                        if (typeof o.options.offset === "function") {
                            adjustment = o.options.offset.apply(o.element);
                        }
                        // Calculate the adjustment if offset is a percentage.
                        else if (typeof o.options.offset === "string") {
                            var amount = parseFloat(o.options.offset);
                            adjustment = o.options.offset.indexOf("%") ?
                                Math.ceil(contextHeight * (amount / 100)) : amount;
                        }
    
                        /* 
                        Set the element offset to the window scroll offset, less
                        all our adjustments.
                        */
                        o.offset = o.element.offset().top - contextOffset
                            + contextScroll - adjustment;
    
                        if (o.options.onlyOnScroll) return;
    
                        if (oldOffset !== null && c.oldScroll > oldOffset && c.oldScroll <= o.offset) {
                            triggerWaypoint(o, ['up']);
                        }
                        else if (oldOffset !== null && c.oldScroll < oldOffset && c.oldScroll >= o.offset) {
                            triggerWaypoint(o, ['down']);
                        }
                        /* For new waypoints added after load, check that down should have
                        already been triggered */
                        else if (!oldOffset && c.element.scrollTop() > o.offset) {
                            triggerWaypoint(o, ['down']);
                        }
                    });
                    
                    // Keep waypoints sorted by offset value.
                    c.waypoints.sort(function(a, b) {
                        return a.offset - b.offset;
                    });
                });
            },
            
            viewportHeight: function() {
                return (window.innerHeight ? window.innerHeight : $w.height());
            },
            
           
            aggregate: function() {
                var points = $();
                $.each(contexts, function(i, c) {
                    $.each(c.waypoints, function(i, e) {
                        points = points.add(e.element);
                    });
                });
                return points;
            }
        };
    
        $.fn[wp] = function(method) {
            
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            }
            else if (typeof method === "function" || !method) {
                return methods.init.apply(this, arguments);
            }
            else if (typeof method === "object") {
                return methods.init.apply(this, [null, method]);
            }
            else {
                $.error( 'Method ' + method + ' does not exist on jQuery ' + wp );
            }
        };
        
        $.fn[wp].defaults = {
            continuous: true,
            offset: 0,
            triggerOnce: false,
            context: window
        };
        
        
        
        
        
       
        $[wps] = function(method) {
            if (jQMethods[method]) {
                return jQMethods[method].apply(this);
            }
            else {
                return jQMethods['aggregate']();
            }
        };
       
        */
        $[wps].settings = {
            resizeThrottle: 200,
            scrollThrottle: 100
        };
        
        $w.load(function() {
           
            $[wps]('refresh');
        });
    })(jQuery, 'waypoint', 'waypoints', window);
    
    
   
    (function( $ ){
    
        $.fn.hoverFlow = function(type, prop, speed, easing, callback) {
            // only allow hover events
            if ($.inArray(type, ['mouseover', 'mouseenter', 'mouseout', 'mouseleave']) == -1) {
                return this;
            }
        
            // build animation options object from arguments
            // based on internal speed function from jQuery core
            var opt = typeof speed === 'object' ? speed : {
                complete: callback || !callback && easing || $.isFunction(speed) && speed,
                duration: speed,
                easing: callback && easing || easing && !$.isFunction(easing) && easing
            };
            
            // run immediately
            opt.queue = false;
                
            // wrap original callback and add dequeue
            var origCallback = opt.complete;
            opt.complete = function() {
                // execute next function in queue
                $(this).dequeue();
                // execute original callback
                if ($.isFunction(origCallback)) {
                    origCallback.call(this);
                }
            };
            
            // keep the chain intact
            return this.each(function() {
                var $this = $(this);
            
                // set flag when mouse is over element
                if (type == 'mouseover' || type == 'mouseenter') {
                    $this.data('jQuery.hoverFlow', true);
                } else {
                    $this.removeData('jQuery.hoverFlow');
                }
                
                // enqueue function
                $this.queue(function() {				
                    // check mouse position at runtime
                    var condition = (type == 'mouseover' || type == 'mouseenter') ?
                        // read: true if mouse is over element
                        $this.data('jQuery.hoverFlow') !== undefined :
                        // read: true if mouse is _not_ over element
                        $this.data('jQuery.hoverFlow') === undefined;
                        
                    // only execute animation if condition is met, which is:
                    // - only run mouseover animation if mouse _is_ currently over the element
                    // - only run mouseout animation if the mouse is currently _not_ over the element
                    if(condition) {
                        $this.animate(prop, opt);
                    // else, clear queue, since there's nothing more to do
                    } else {
                        $this.queue([]);
                    }
                });
    
            });
        };
    
    })( jQuery );
    
    (function( $ ){
    
        var items = new Array(),
            errors = new Array(),
            onComplete = function() {},
            current = 0;
        
        var jpreOptions = {
            splashVPos: '35%',
            loaderVPos: '75%',
            splashID: '#jpreContent',
            showSplash: true,
            showPercentage: true,
            debugMode: false,
            splashFunction: function() {}
        }
        
        var getImages = function(element) {
            $(element).find('*:not(script)').each(function() {
                var url = "";
    
                if ($(this).css('background-image').indexOf('none') == -1) {
                    url = $(this).css('background-image');
                    if(url.indexOf('url') != -1) {
                        var temp = url.match(/url\((.*?)\)/);
                        url = temp[1].replace(/\"/g, '');
                    }
                } else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined' && $(this).hasClass('preload')) {
                    url = $(this).attr('src');
                }
                //console.log(url);
                
                if (url.length > 0) {
                    items.push(url);
                }
            });
        }
    
        var preloading = function() {
            for (var i = 0; i < items.length; i++) {
                loadImg(items[i]);
            }
        }
        
        var loadImg = function(url) {
            var imgLoad = new Image();
            $(imgLoad)
            .load(function() {
                completeLoading();
            })
            .error(function() {
                errors.push($(this).attr('src'));
                completeLoading();
            })
            .attr('src', url);
        }
        
        var completeLoading = function() {
            current++;
    
            var per = Math.round((current / items.length) * 100);
            $(jBar).stop().animate({
                height: per + '%'
            }, 0, 'linear'); // changed duration from 500 to zero
            
            if(jpreOptions.showPercentage) {
                $(jPer).text(per+"%");
            }
            
            if(current >= items.length) {
            
                current = items.length;
                
                if (jpreOptions.debugMode) {
                    var error = debug();
                    
                } 
                loadComplete();
            }
        }
        
        var loadComplete = function() {
            $(jBar).stop().animate({
                height: '100%'
            }, 0, 'linear', function() { // changed duration from 500 to zero
                $(jOverlay).animate({opacity: '0'},0, function() { // changed duration from 500 to zero
                    $(jOverlay).remove();
                    onComplete();
                });
            });	
        }
        
        var debug = function() {
            if(errors.length > 0) {
                var str = 'ERROR - IMAGE FILES MISSING!!!\n\r'
                str	+= errors.length + ' image files cound not be found. \n\r';	
                str += 'Please check your image paths and filenames:\n\r';
                for (var i = 0; i < errors.length; i++) {
                    str += '- ' + errors[i] + '\n\r';
                }
                return true;
            } else {
                return false;
            }
        }
        
        // create the splash screen overlay
        var createContainer = function(tar) {
    
            jOverlay = $('<div></div>')
            .attr('id', 'jpreOverlay')
            .appendTo('body');
            
            if(jpreOptions.showSplash) {
                jContent = $('<div></div>')
                .attr('id', 'jpreSlide')
                .appendTo(jOverlay);
                
                var conWidth = $(window).width() - $(jContent).width();
                $(jContent).html($(jpreOptions.splashID).wrap('<div/>').parent().html());
                $(jpreOptions.splashID).remove();
                jpreOptions.splashFunction()			
            }
            
            jLoader = $('<div></div>')
            .attr('id', 'jpreLoader')
            .appendTo(jOverlay);
            
            jBar = $('<div></div>')
            .attr('id', 'jpreBar')
            .appendTo(jLoader);
            
            if(jpreOptions.showPercentage) {
                jPer = $('<div></div>')
                .attr('id', 'jprePercentage')
                .appendTo(jLoader)
                .html('Loading...');
            }
        }
        
        $.fn.jpreLoader = function(options, callback) {
            if(options) {
                $.extend(jpreOptions, options );
            }
            if(typeof callback == 'function') {
                onComplete = callback;
            }
            
            createContainer(this);
            getImages(this);
            preloading();
            return this;
        };
    
    })( jQuery );
    
    jQuery.easing['jswing'] = jQuery.easing['swing'];
    
    jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    });
    
    
    
    
    /*
     * CUSTOM FUNCTIONS
     */
    
    
    /* 
    * Function to fade in image sprites on hover
    */
    $.fn.fadeSprite = function() { 	
    
        this.mouseenter(function(e){
    
            $(this).find('a').hoverFlow(e.type, {opacity:1}, 300);
                
        }).mouseleave(function(e){
    
            $(this).find('a').hoverFlow(e.type, {opacity:0}, 300);
    
        });	
    };
    
    
    /* 
    * Function to animate image thumbnails on hover
    */
    $.fn.hoverThumb = function() { 	
          
        // only animate for large desktop browsers
        var pageWidth = window.innerWidth || document.body.clientWidth;
    
          if(pageWidth >= 1140){
    
              this.mouseenter(function(e){
            
                $(this).find('.arrow-r').hoverFlow(e.type, {opacity:1, right:0}, 500);
                //$(this).stop().animate({'opacity':'1'}, 300).siblings().stop().animate({'opacity':'0.5'}, 500);
                $(this).stop().animate({'opacity':'1'}, 300);
    
            }).mouseleave(function(e){
    
                $(this).find('.arrow-r').hoverFlow(e.type, {opacity:0, right:10}, 500);
    
            });	 
    
            // once the mouse leaves the whole thumbs div
            $('#thumbs').mouseleave(function(e){
    
                // we reset the thumbs 
                $('#thumbs li').stop().animate({'opacity':'1'}, 500);
    
            });	
    
        }
    };		
    
    /* 
    * Function to bring in portfolio gallery items one by one
    */
    $.fn.animateGallery = function() { 	
    
        $(this).stop().delay(1000).each(function(i){
            $(this).delay(i * 150).animate({'opacity':'1'}, 300, 'easeOutExpo');
        });
    };
    
    /* 
    * Function to animate leaving a page
    */
    $.fn.leavePage = function() { 	
          
        this.click(function(event){
    
            event.preventDefault();
            linkLocation = this.href;
    
            $('#header').animate({'opacity':'0', 'top':'-92px'}, 500, 'easeOutExpo');
            $('body').fadeOut(500, function(){
                window.location = linkLocation;
            });      
        }); 
    };
    
    /* 
    * Function to animate content details
    */
    function animateContent() { 
    
        // show the rest of the content		
        $('#content-detail').css({'opacity':'0', 'top':'50px'}).stop().animate({'opacity':'1', 'top':'0px'}, 500, 'easeOutExpo');
        $('#footer').css({'opacity':'0', 'top':'50px'}).stop().animate({'opacity':'1', 'top':'0px'}, 500, 'easeOutExpo');
    };
    
    /* 
    * Function to switch face on browser resize
    */
    $.fn.resizeFace = function() { 
    
        $(window).resize(function() {
    
            var pageWidth = window.innerWidth || document.body.clientWidth;
            //console.log(pageWidth);	
    
              // Show large face
              if(pageWidth >= 1140) {
                  
                  $('#designer-img').css({'opacity':'1'});
                  $('#coder-img').css({'opacity':'1'});
                  $('#designer-bg').css({'opacity':'1'});
                  $('#coder-bg').css({'opacity':'1'});
                  $('#designer').css({'opacity':'1'});
                  $('#coder').css({'opacity':'1'});
    
              } else { // Show smaller face image
    
                  $('#face-img').css({'opacity':'1'});
                  $('#designer').css({'opacity':'1'});
                  $('#coder').css({'opacity':'1'});
              }
    
        });
    };
    
    /* 
    * Function to animate home page
    */
    $.fn.animateHome = function() { 
    
        // only animate for large desktop browsers
        var pageWidth = window.innerWidth || document.body.clientWidth;
    
        if(pageWidth >= 1140){
    
              $('#content').animate({'opacity':'1'}, 500, 'easeOutExpo');
              $('#designer-img').css({'left':'-500px'}).stop().animate({'opacity':'1', 'left':'100px'}, 1000, 'easeOutExpo');
              $('#coder-img').css({'right':'-500px'}).stop().animate({'opacity':'1', 'right':'100px'}, 1000, 'easeOutExpo');
              $('#designer-bg').css({'left':'-500px'}).stop().animate({'opacity':'1', 'left':'100px'}, 1500, 'easeOutBack');
              $('#coder-bg').css({'right':'-500px'}).stop().animate({'opacity':'1', 'right':'100px'}, 1500, 'easeOutBack');
              $('#designer').delay(1500).animate({'opacity':'1'}, 500, 'easeOutExpo');
              $('#coder').delay(1500).animate({'opacity':'1'}, 500, 'easeOutExpo', function(){ animateFace(); });
    
        }else{
            
            $('#content').animate({'opacity':'1'}, 500, 'easeOutExpo');
            $('#face-img').animate({'opacity':'1'}, 2000, 'easeOutExpo');
            $('#designer').delay(1000).animate({'opacity':'1'}, 500, 'easeOutExpo');
            $('#coder').delay(1000).animate({'opacity':'1'}, 500, 'easeOutExpo', function(){ animateContent(); });
    
        }
    }; 
    
    
    /* 
    * Function to animate main section
    */
    function animateMain() { 
    
        $('#text-main').css({'visibility':'visible', 'right':'50%'}).stop().animate({'opacity':'1', 'right':'0%'}, 1000, 'easeOutExpo');
        $('#img-main').css({'visibility':'visible', 'left':'50%'}).stop().delay(100).animate({'opacity':'1', 'left':'0%'}, 1000, 'easeOutExpo');
        
        $('#snaps').css({'visibility':'visible', 'opacity':'1'});
        $('#snaps-1').css({'visibility':'visible', 'top':'50px'}).stop().delay(300).animate({'opacity':'1', 'top':'0px'}, 200, 'easeOutBack');
        $('#snaps-2').css({'visibility':'visible', 'top':'50px'}).stop().delay(500).animate({'opacity':'1', 'top':'0px'}, 200, 'easeOutBack');
        $('#snaps-3').css({'visibility':'visible', 'top':'50px'}).stop().delay(700).animate({'opacity':'1', 'top':'0px'}, 200, 'easeOutBack');
        $('#snaps-4').css({'visibility':'visible', 'top':'50px'}).stop().delay(900).animate({'opacity':'1', 'top':'0px'}, 200, 'easeOutBack');
        $('#snaps-5').css({'visibility':'visible', 'top':'50px'}).stop().delay(1100).animate({'opacity':'1', 'top':'0px'}, 200, 'easeOutBack');
        $('#snaps-6').css({'visibility':'visible', 'top':'50px'}).stop().delay(1300).animate({'opacity':'1', 'top':'0px'}, 200, 'easeOutBack',  function(){ animateContent(); });
    
    };
    
    
    /* 
    * Function to animate pages (e.g. single-portfolio.php)
    */
    function animatePage() { 
    
        $('#text-main').css({'visibility':'visible', 'right':'50%'}).stop().animate({'opacity':'1', 'right':'0%'}, 1000, 'easeOutExpo');
        $('#img-main').css({'visibility':'visible', 'left':'50%'}).stop().delay(100).animate({'opacity':'1', 'left':'0%'}, 1000, 'easeOutExpo', function(){ animateContent(); });
        
    };
    
    /* 
    * Function to animate contact page (no longer used)
    */
    function animateContact() { 
    
        var navi = $('#navi');
        // var pageWidth = window.innerWidth || document.body.clientWidth;
    
        navi.stop().delay(2000).animate({'opacity':'1'}, 1000, 'easeOutQuad', function(){ 
            
            // if(pageWidth >= 1140){
            // 	navi.imageLens({ imageSrc: "https://www.adhamdannaway.com/wp-content/themes/dannaway/images/adham-dannaway-sky-people.jpg" });
            // }
        });
        
    };
    
    /* 
    * Function to animate about page
    */
    function animateAbout() { 
    
        // Animate section 0 (if window height is small enough)
        if($(window).height() <= 880){
    
            $('#img-0').waypoint(function(event, direction) {
    
               $('#img-0').css({'visibility':'visible', 'top': '500px'}).stop().animate({'opacity':'1', 'top':'0px'}, 1000, 'easeOutExpo');
    
            }, {
               offset: '80%',
               triggerOnce: true
            });
    
        }else{
    
            $('#img-0').css({'visibility':'visible', 'opacity':'1'});
        }
    
        // Animate Section 1
        $('#img-1').waypoint(function(event, direction) {
    
            $('#img-1').css({'visibility':'visible', 'right': '50%'}).stop().animate({'opacity':'1', 'right':'0%'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    
        // Animate Chart
        $('.bar-chart').waypoint(function(event, direction) {
    
           $('#aqua').css({'visibility':'visible', 'height': '0%'}).stop().delay(200).animate({'opacity':'1', 'height':'95%'}, 1000, 'easeOutExpo');
           $('#pink').css({'visibility':'visible', 'height': '0%'}).stop().delay(400).animate({'opacity':'1', 'height':'90%'}, 1000, 'easeOutExpo');
           $('#yellow').css({'visibility':'visible', 'height': '0%'}).stop().delay(600).animate({'opacity':'1', 'height':'95%'}, 1000, 'easeOutExpo');
           $('#brown').css({'visibility':'visible', 'height': '0%'}).stop().delay(800).animate({'opacity':'1', 'height':'75%'}, 1000, 'easeOutExpo');
           $('#red').css({'visibility':'visible', 'height': '0%'}).stop().delay(1000).animate({'opacity':'1', 'height':'40%'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    
        // Animate Featured in
        $('#img-2').waypoint(function(event, direction) {
    
            $('#img-2').css({'visibility':'visible', 'left': '50%'}).stop().animate({'opacity':'1', 'left':'0%'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    
        // Animate My book
        $('#img-3').waypoint(function(event, direction) {
    
            $('#img-3').css({'visibility':'visible', 'right': '50%'}).stop().animate({'opacity':'1', 'right':'0%'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    
        // Animate My story
        $('#img-4').waypoint(function(event, direction) {
    
            $('#img-4').css({'visibility':'visible', 'left': '50%'}).stop().animate({'opacity':'1', 'left':'0%'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    };
    
    
    /* 
    * Function to animate featured page
    */
    function animateFeatured() { 
    
        // Animate section 0 (if window height is small enough)
        if($(window).height() <= 880){
    
            $('#img-0').waypoint(function(event, direction) {
    
               $('#img-0').css({'visibility':'visible', 'right': '50%'}).stop().animate({'opacity':'1', 'right':'0%'}, 1000, 'easeOutExpo');
    
            }, {
               offset: '80%',
               triggerOnce: true
            });
    
        }else{
    
            $('#img-0').css({'visibility':'visible', 'opacity':'1'});
        }
    
        // Animate section 1
        $('#img-1').waypoint(function(event, direction) {
    
           $('#img-1').css({'visibility':'visible', 'left': '50%'}).stop().animate({'opacity':'1', 'left':'0%'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    
        // Animate section 2
        $('#img-2').waypoint(function(event, direction) {
    
           $('#img-2').css({'visibility':'visible', 'right': '50%'}).stop().animate({'opacity':'1', 'right':'0%'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    
        // Animate section 3
        $('#img-3').waypoint(function(event, direction) {
    
           $('#img-3').css({'visibility':'visible', 'left': '50%'}).stop().animate({'opacity':'1', 'left':'0%'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    
        // Animate section 4
        $('#icons').waypoint(function(event, direction) {
    
           $('#icons').css({'visibility':'visible', 'top': '250px'}).stop().animate({'opacity':'1', 'top':'0px'}, 1000, 'easeOutExpo');
    
        }, {
           offset: '80%',
           triggerOnce: true
        });
    
    };
    
    /* 
    * Function to animate face
    */
    function animateFace() {
    
        var designerImg 	= $('#designer-img');
        var coderImg 		= $('#coder-img');
        var designerHover	= $('#designer');
        var coderHover		= $('#coder');
        var designerDesc	= $('#designer-desc');
        var coderDesc		= $('#coder-desc');	
        var designerArrow	= $('#designer-arrow');
        var coderArrow		= $('#coder-arrow');		
        var designerBg		= $('#designer-bg');
        var coderBg			= $('#coder-bg');
        var face 			= $('#face');
        var section 		= $('#section');
        var duration 		= 500;
    
        var mouseX = 0;
        var relMouseX = 520;
        var xp = 520;
        var loop = 0;
        frameRate =  30;
        timeInterval = Math.round( 1000 / frameRate );		
    
       
        animateContent();
    
        section.mouseenter(function(e){
    
            // Get mouse position
            section.mousemove(function(e){
    
                   // raw mouse position
                   mouseX = e.pageX;
    
                   // mouse position relative to face div
                   relMouseX = mouseX - face.offset().left;
    
            });
            
            
            loop = setInterval(function(){
    
              
                xp += (relMouseX - xp) / 12;
    
                designerImg.css({width:420 + (520 - xp) * 0.5, left: 100 + (520 - xp) * 0.1});
                coderImg.css({width:420 + (xp - 520) * 0.5, right: 100 - (520 - xp) * 0.1});
    
                designerBg.css({left: 100 + (520 - xp) * 0.05, opacity: ((1040 - xp)/520)});
                coderBg.css({right:  100 + (xp - 520) * 0.05, opacity: (xp/520)});
    
                designerDesc.css({opacity: ((1040 - xp)/520)});
                coderDesc.css({opacity: (xp/520)});
    
            }, timeInterval );
    
        }).mouseleave(function(e){ 
    
            
            clearInterval(loop);
            xp 			= 520;
            mouseX 		= 0;
            relMouseX 	= 520;
    
            designerImg.hoverFlow(e.type, {width: 420, left: 100}, duration, 'easeOutQuad');
            coderImg.hoverFlow(e.type, {width: 420, right: 100}, duration, 'easeOutQuad');
            coderDesc.hoverFlow(e.type, {opacity: 1}, duration, 'easeOutQuad');
            designerDesc.hoverFlow(e.type, {opacity: 1}, duration, 'easeOutQuad');
            coderBg.hoverFlow(e.type, {right:100, opacity: 1}, duration, 'easeOutQuad');
            designerBg.hoverFlow(e.type, {left:100, opacity: 1}, duration, 'easeOutQuad');
    
        }); 
        
    }; 
    
    
     
    var ie = (function(){
     
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
     
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
     
        return v > 4 ? v : undef;
     
    }());
    
    
    
    /* 
    * Function to print IE page
    */
    function ieMessage() {
    
        // define the HTML of the page
        var page  = "<div id='ie' class='clearfix'>";
        page 	 += "<section class='main nopad-b'>";
        page 	 += "<div class='row'>";
        page 	 += "<div class='col-5'>";
        page 	 += "<h1>Ummm ...</h1>";
        page 	 += "<p class='intro'>Well this is awkward. It looks like you're using an old browser.</p>";
        page 	 += "<p>Old browsers including Internet Explorer 6, 7 and 8 can't handle some of the new stuff I've packed into this website. If you'd like to see the full website you'll need to download one of the nice new browsers below. It will also make your life much easier when browsing the net later on.</p>";
        page 	 += "<p>";
        page 	 += "<a href='https://www.google.com/chrome' target='_blank' class='icon-browser chrome'></a>";
        page 	 += "<a href='https://www.mozilla.org/en-US/firefox/new/' target='_blank' class='icon-browser firefox'></a>";
        page 	 += "<a href='https://www.apple.com/au/safari/'' target='_blank' class='icon-browser safari'></a>";
        page 	 += "</p>";
        page 	 += "</div>";
        page 	 += "<div class='col-7 last'>";
        page 	 += "<img class='major' src='https://www.adhamdannaway.com/wp-content/themes/dannaway/images/about-adham-dannaway.jpg' alt='adham dannaway ui designer'>";
        page 	 += "</div>";
        page 	 += "</div>";
        page 	 += "</section>";
        page 	 += "</div>";		
        
        // Print the page
        $('.content').replaceWith(page);
    
    }
    
    
    
     }, []);



  return (
    <div>
      {/* محتوای صفحه‌ی شما در اینجا */}
    </div>
  );
};

export default MyPage;
