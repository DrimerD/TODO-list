 $(document).ready(function(){
        function heightDetect() {
            $("main").css("height", $(window).height());
        };
        heightDetect();
        $(window).resize(function() {
            heightDetect();
        });

         var tdList = $('.tdContainer .tdList');

        function show(){
            var length = localStorage.length;
            if(length > 0){
                for(var i=0; i<length; i++){
                    var key = localStorage.key(i);
                    if(localStorage.getItem('-1') != ''){
                        $('.authorName').text(localStorage.getItem('-1'));
                    }else{
                        $('.authorName').text("Autor List");
                    }
                    if (key > -1)
                    $('<li></li>').addClass('tdItem')
                        .attr('dataItem-id', key)
                        .text(localStorage.getItem(key))
                        .append('<img src="../images/cleat.png" alt="видалити">')
                        .appendTo(tdList);
                }
            }
        }
        show();

        //input Author name

        $(this).keydown(function(e){
                if(e.keyCode == 27){
                    $('.input-author').addClass('bounceOutDown');
                    $('.input-author').removeClass('bounceInUp');
                }else if(e.keyCode == 13){
                    var name = e.target.value;
                    e.target.value = "";

                    if (name.length >0)
                        localStorage.setItem('-1', name);
                    if(localStorage.getItem('-1') != ''){
                        $('.authorName').text(localStorage.getItem('-1'));
                    }else{
                        $('.authorName').text("Autor List");
                    }
                    $('.input-author').addClass('bounceOutDown');
                    $('.input-author').removeClass('bounceInUp');
                }
            });
        //input notes
        $('.tdContainer .tdInput input').on('keydown', function(e){
			if (e.keyCode == 13) {
				var str = e.target.value;
				e.target.value = "";

                if(str.length > 0){
                    var id = 0;

                    tdList.children().each(function(index, el){
                        var realId = $(el).attr('dataItem-id');
                        if(realId > id || realId != '-1')
                            id = realId;
                    })
                    id ++;

				    localStorage.setItem(id, str);

                    $('<li></li>').addClass('tdItem')
                        .attr('dataItem-id', id)
                        .text(str)
                        .append('<img src="../images/cleat.png" alt="видалити">')
                        .appendTo(tdList);
                }

			}else{
				return;
			}
		});

        $(document).on('click', '.tdList img', function(e){
            var select = $(e.target.parentElement);
            localStorage.removeItem(select.attr('dataItem-id'));
            select.remove();
        });

        $('.prefer').on('click', function () {
            $('.input-author').removeClass('position bounceOutDown');
            $('.input-author').addClass('bounceInUp');
        });
    });
