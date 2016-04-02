$.ajaxPrefilter(function(options) {

    if (options.crossDomain && jQuery.support.cors) {

        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');

        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;

        //options.url = "http://cors.corsproxy.io/url=" + options.url;

    }

});

var timeToInterval = 5000;

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

        // var maxID = 0;

        var maxPosition = $('#viewer img').length > 0 ? $('#viewer img').attr('data-position') : 0;

        dataChotot = new Array();

        var buffData = new Object();

        console.log(dataLoading);

        if (maxPosition != 0) {

            let src = '';

            let alt = '';

            for (let i = 0; i < dataLoading.length; i++) {

                src = $(dataLoading[i]).attr('src');

                alt = $(dataLoading[i]).attr('alt');

                if ($('#viewer img').attr('src') == src && $('#viewer img').attr('alt') == alt) {

                    dataLoading = dataLoading.splice(i+1, dataLoading.length);
                    console.log('---dataLoading');
                    console.log(dataLoading);
                    break;
                }

                src = '';

                alt = '';
            }

        }

        $("#viewer").prepend(dataLoading);

        var srcImage = '';

        $("#viewer img").each(function(index) {

            srcImage = $(this).attr($(this).attr('data-original') === 'undefined' ? 'src' : 'data-original');

            $(this).attr('src', srcImage);

        });

        $("#viewer img").each(function(index) {

            // buffData.id = maxID;

            buffData.link = $(this).attr('src');

            buffData.description = $(this).attr('alt');

            buffData.position = maxPosition;

            $(this).attr('data-position', maxPosition);
            // maxID++;

            maxPosition++;

            dataChotot.push(buffData);

            buffData = {};

        });

        saveDataFirstLoad(dataChotot);

    });

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
            // console.log(JSON.stringify(data));
        },
        error: function(textstatus, errorThrown) {
            console.log('text status ' + textstatus + ', err ' + errorThrown);
        }

    });

}
