
$(document).ready(function(){

//Scrolling Text
	$(function(){
		//Initial Settings
		var marquee = $('#scrolling-text');
		marquee
			.wrapInner('<span>');
		marquee
			.find('span')
			.css({'width':'50%', 'display':'inline-block', 'text-align':'center'});
		marquee
			.append(
				marquee
					.find('span')
					.clone()
			);
		marquee
			.wrapInner('<div>');
		marquee
			.find('div')
			.css('width', '200%');
		//
		var reset = function(){
          //alert(жreset);
			$(this)
				.css('margin-left', '0%');
			$(this)
				.animate({'margin-left': '-100%'}, 25000, 'linear', reset);
		};
		//
		reset.call(
          marquee.find('div') 
        );
	
      //Stop/Start Scrolling
      marquee.find('div').hover(
        function(){
            $(this).stop(false,false);
        },
                                             
        function(){     
          var time=25000+parseInt( $(this).css('margin-left') )/($(this).width()/2)*25000;          
           $(this).animate({'margin-left': '-100%'}, time, 'linear',reset);
        });                                
    });


});





