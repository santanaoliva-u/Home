$(document).ready(function () {
    var id = -1;
    $("#search-form #q").keyup(function (e) {
        var keyword = $(this).val();
        //var keyword_replace = $('#q_search_replace').val();
        var keyword_replace = '';
        if (keyword_replace != keyword) {
            preload(keyword, id);
            $('#q_search_replace').val('');
            //$("#key_pres").val('');
        }
    });
    $("#search-form #q").focus(function (e) {
        var keyword = $(this).val();
        preload(keyword, id);
    });
    $("#search-form #q").blur(function () {
        if ($("#header_search_autocomplete").is(':hover') === true) {
        } else {
            var keyword = '';
            preload(keyword, id);
        }
    });
    $("#search-form #q").keydown(function (e) {
        var keyword = $(this).val();
        var key_pres = '';
        if (e.keyCode == 13) {
            e.preventDefault();
            if (key_pres != '') {
                ///var alias = $('#link_alias').val();
                //window.location.href = 'http://gogoanime.se/info/' + alias;
            } else {
                //window.location.href = 'https://gogoanime.se/search.html?keyword=' + keyword;
            }
        }
        if ($('#header_search_autocomplete_body:visible').length > 0) {
            var items = $('#header_search_autocomplete_body').children();
            var nextElement = null;
            var current_index = -1;
            var link_alias = '';
            event_id = $("#key_pres").val();
            if (event_id != '') {
                if (event_id.substring(0, 'header_search_autocomplete_item_'.length) == 'header_search_autocomplete_item_') {
                    current_index = parseInt(event_id.replace('header_search_autocomplete_item_', ''));
                    $('#header_search_autocomplete_body div').removeClass('focused');
                }
            }
            if (e.keyCode == 38) {
                e.preventDefault();
                current_index = Math.max(0, current_index - 1);
                nextElement = $('#header_search_autocomplete_item_' + current_index);
            } else if (e.keyCode == 40) {
                e.preventDefault();
                current_index = Math.min(items.length - 1, current_index + 1);
                nextElement = $('#header_search_autocomplete_item_' + current_index);
            }
            if (nextElement) {
                nextElement.stop(true, true);
                $('#header_search_autocomplete_item_' + current_index).focus();
                $('#header_search_autocomplete_item_' + current_index).stop(true, true).addClass('focused');
                $("#key_pres").val('header_search_autocomplete_item_' + current_index);
                var link_alias = $('#header_search_autocomplete_item_' + current_index + ' a').attr('rel');
                //$("#link_alias").val(link_alias);
                $("#q_search_replace").val(keyword);
                id = current_index;
            }
        }
    });
});
function preload(keyword, id) {
    $.ajax({
        type: "get",
        url: base_url + "search.html",
        //dataType: 'json',
        data: {q: keyword, id: id},
        success: function (data, response) {
            $("#header_search_autocomplete").html(data);
        }
    });
}
function do_search() {
    var keyword = $("#search-form #q").val();
    keyword = keyword.replace(/\s+/g, '-');
    if(keyword.length > 2) {
        window.location.href = base_url + 'browse?q=' + keyword;
    }else{
        //$("#search-form #q").focus();
    }
    
    return false;
}