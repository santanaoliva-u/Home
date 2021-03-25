$(document).ready(function () {
    $('.AAShwHdd-lnk').on('click',function(){var shwhdd=$(this).attr('data-shwhdd');$(this).toggleClass('on');$("#"+shwhdd).toggleClass('show');});
    $('.lgtbx').click(function(event){event.preventDefault();$('body').toggleClass('lgtbx-on');});
    $('.lgtbx-lnk').click(function(event){event.preventDefault();$('body').toggleClass('lgtbx-on');});
    $('.anime_muti_link li').click(function (e) {e.preventDefault();var link = $(this).attr('data-video');if ($(this).hasClass("active")) {return false;}else{$(".load-video iframe").attr('src',link); };$('.anime_muti_link li').removeClass('active');$(this).addClass('active');});
    $('.report-ajax').click(function (e) {e.preventDefault();$(".mask").fadeIn();$('.reportForm').fadeIn();});
    $('.mask').click(function () {$(".mask").fadeOut();$('.reportForm').fadeOut();});       
    $(".btngui").click(function(e) {dulieu = $("#contact-form").serialize();$.post(base_url+"/report.html",dulieu, xuly);}); 
    $('.dropdown-toggle').click(function () {if ($(this).parent().hasClass("open")) {$('.btn-group').removeClass('open');}else{$('.btn-group').removeClass('open');$(this).parent().addClass('open');  }}); 
    $('input[name=order]').click(function () {var text = $(this).attr('data-text');$(".load_order").html(text);$(this).parent().parent().parent().parent().find('.tmp').removeClass('active');$(this).parent().parent().parent().addClass('active');}); 
    $('input[name=status]').click(function () {var text = $(this).attr('data-text');$(".load_status").html(text);$(this).parent().parent().parent().parent().find('.tmp').removeClass('active');$(this).parent().parent().parent().addClass('active');});   
    $('input[name=year]').click(function () {var text = $(this).attr('data-text');$(".load_year").html(text);$(this).parent().parent().parent().parent().find('.tmp').removeClass('active');$(this).parent().parent().parent().addClass('active');});
    $('input[name=Tipo]').click(function () {var text = $(this).attr('data-text');$(".load_Tipo").html(text);$(this).parent().parent().parent().parent().find('.tmp').removeClass('active');$(this).parent().parent().parent().addClass('active');});
    $('.genre-ids').click(function () {
        var totalPoints = 0;
        var totalText = 0;
        $('.section-genres').each(function(){
            $(this).find('input').each(function(){
                if($(this).is(':checked')) {
                    totalPoints += 1;
                }
            });
             
        });
        if(totalPoints < 4){
            if($(this).parent().parent().parent().find('input').is(':checked')) {
                $(this).parent().parent().parent().addClass('active');
            }else{
               $(this).parent().parent().parent().removeClass('active');
            }
        }else{
            if($(this).parent().parent().parent().find('input').is(':checked')) {
                $(this).removeAttr('checked');
            }else{
                $(this).parent().parent().parent().removeClass('active');
            }
        }
        totalText = totalPoints;
        if(totalPoints == 4) totalText = 3;
        $(".load_gneres").html(totalText + ' seleccionados');
    });
});
function xuly(data){if (data=="OK"){ $("#contact-form input:text").val('');$("#contact-form input:text").val('');$("#contact-form input:radio").prop( "checked", false);$("#contact-form textarea").val('');$("#contact-form").hide();$("#msg_eror").html('Gracias por el informe. Revisaremos y arreglaremos este episodio lo antes posible.');setTimeout(function(){ $('.mask').fadeOut();$('.reportForm').fadeOut(); }, 3000);}else{$("#msg_eror").html(data);}}
function filterMovies(){
    var genres = [];
    $('.genre-ids:checked').each(function () {
      genres.push($(this).val());
    });
    if (genres.length > 0) {
      genres = genres.join('-');
    } else {
      genres = 'all';
    }
    var year = $('input[name=year]:checked').val();
    var status = $('input[name=status]:checked').val();
    var Tipo = $('input[name=Tipo]:checked').val();
    var order = $('input[name=order]:checked').val();
    var url = base_url + 'browse?genres='  + genres + '&year='  + year + '&status='  + status + '&order='  + order + '&Tipo='  + Tipo;
    window.location.href = url;
}
function ajaxBookmark(id, url, callback){$.ajax({dataType: 'json',type: 'post',async: false,data: {id: id,_csrf: $("meta[name=csrf-token]").attr('content')},url: url,success: function (response) {callback(response);}});}
function ajaxBookmarkEpisode(id, sort, keyword, url, callback){$.ajax({dataType: 'html',type: 'post',async: false,data: {id: id,sort:sort,keyword:keyword, _csrf: $("meta[name=csrf-token]").attr('content')},url: url,success: function (response) {callback(response);}});}
function removeBookmark(elm, id, url) {$.ajax({type: 'post',dataType: 'json',async: false,url: url,data: {id: id,_csrf: $("meta[name=csrf-token]").attr('content')},success: function (response) {if (response) {$(elm).parent().parent().remove();}}});}