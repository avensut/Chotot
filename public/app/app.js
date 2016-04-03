$.ajaxPrefilter(function(options) {

    if (options.crossDomain && jQuery.support.cors) {

        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');

        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;

        //options.url = "http://cors.corsproxy.io/url=" + options.url;

    }

});

var timeToInterval = 20000;

$(document).ready(function() {

    if ($('#viewer img') > 0) {

        setInterval(function() {

            getAllData();

        }, timeToInterval);

    } else {

        getAllData();

        setInterval(function() {

            getAllData();

        }, timeToInterval);

    }

});

function getAllData() {

    $.get('http://www.chotot.vn/tp-ho-chi-minh/mua-ban/', function(response) {

        var dataLoading = $(response).find('.listing_thumbs .listing_thumbs_image img');

        var maxPosition = $('#viewer img').length > 0 ? (+$('#viewer img').attr('data-position') + 1) : 0;

        dataChotot = new Array();

        var buffData = new Object();

        if (maxPosition != 0) {

            let src = '';

            let alt = '';

            dataLoading.splice(4, dataLoading.length);

            for (let i = 0; i < dataLoading.length; i++) {

                if (!checkDuplicateItem(dataLoading[i], $("#viewer img"))) {

                    dataLoading.splice(i, 1);

                    i--;
                }

            }

        }

        for (let i = 0; i < dataLoading.length; i++) {

            $(dataLoading[i]).addClass('img_new img_new_animation');

        }

        $("#viewer").prepend(dataLoading);

        wrapImgDiv();

        var srcImage = '';

        $("#viewer img.img_new").each(function(index) {

            srcImage = $(this).attr($(this).attr('data-original') === 'undefined' ? 'src' : 'data-original');

            $(this).attr('src', srcImage);

        });

        $($("#viewer img.img_new").get().reverse()).each(function(index) {

            buffData.link = $(this).attr('src');

            buffData.description = $(this).attr('alt');

            buffData.position = maxPosition;

            $(this).attr('data-position', maxPosition);

            maxPosition++;

            dataChotot.push(buffData);

            buffData = {};

        });

        $("#viewer img.img_new").removeClass('img_new');

        saveDataFirstLoad(dataChotot);

    });

}

function checkDuplicateItem(item, listItem) {

    let src = '';

    let alt = '';

    for (let i = 0; i < listItem.length; i++) {

        src = $(listItem[i]).attr('src');

        alt = $(listItem[i]).attr('alt');

        if ($(item).attr('src') == src && $(item).attr('alt') == alt) {

            return false;

        }

        src = '';

        alt = '';
    }

    return true;
}

function saveDataFirstLoad(dataChotot) {

    var data = dataChotot;

    $.ajax({

        type: 'POST',

        data: JSON.stringify(data),

        contentType: 'application/json',

        url: '/saveDataFirstLoad',

        success: function(data) {

            console.log('success');
        },
        error: function(textstatus, errorThrown) {

            console.log('text status ' + textstatus + ', err ' + errorThrown);

        }

    });

}

function wrapImgDiv() {

    $("#viewer img").each(function(index) {

        if (!$(this).parent().hasClass('wrap_img')) {

            $(this).wrap('<div class="wrap_img"></div>');

        }

        $(this).attr({

            'draggable': 'true',

            'ondragenter': 'dragenter(event)',

            'ondragstart': 'dragstart(event)'

        });

    });

}

var source;

function isbefore(a, b) {

    if (a.parentNode == b.parentNode) {

        for (var cur = a; cur; cur = cur.previousSibling) {

            if (cur === b) {

                return true;

            }

        }

    }

    return false;
}

function dragenter(e) {

    if (isbefore(source, e.target)) {

        let child = e.target.parentNode.insertBefore(source, e.target);

        setItemByDiv();

    } else {

        let child = e.target.parentNode.insertBefore(source, e.target.nextSibling);

        setItemByDiv();
    }

    checkEmpty();

}

function dragstart(e) {

    source = e.target;

    e.dataTransfer.effectAllowed = 'move';

}

function checkEmpty() {

    $('#viewer .wrap_img').each(function(index) {

        if ($(this).is(':empty')) {

            $(this).remove();

        }

    })

}

function setItemByDiv() {

    $('#viewer .wrap_img').each(function(index) {

        if ($(this).find('img').length > 1) {

            let buffFirst = $($(this).find('img')[0]).wrap('<div class="wrap_img"></div>');

            let buffSecond = $($(this).find('img')[1]).wrap('<div class="wrap_img"></div>');

            $(buffFirst).insertAfter($($('#viewer .wrap_img')[index - 1]));

            $(buffSecond).insertAfter($($('#viewer .wrap_img')[index]));

            $(this).remove();
        }

    })
}
