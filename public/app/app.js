$.ajaxPrefilter(function(options) {

  if (options.crossDomain && jQuery.support.cors) {

    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');

    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;

    //options.url = "http://cors.corsproxy.io/url=" + options.url;

  }

});

if ($('#viewer img') > 0) {

  setInterval(function() {

    getAllData();

  }, 20000);

} else {

  getAllData();

}

function getAllData() {

  $.get('http://www.chotot.vn/tp-ho-chi-minh/mua-ban/', function(response) {

    var dataLoading = $(response).find('.listing_thumbs .listing_thumbs_image img');

    var maxID = 0;

    dataChotot = new Array();

    var buffData = new Object();

    $("#viewer").html(dataLoading);

    var srcImage = '';

    $("#viewer img").each(function(index) {

      srcImage = $(this).attr($(this).attr('data-original') === 'undefined' ? 'src' : 'data-original');

      $(this).attr('src', srcImage);

    });

    $("#viewer img").each(function(index) {

      buffData.id = maxID;

      buffData.link = $(this).attr('src');

      buffData.description = $(this).attr('alt');

      buffData.position = 0;

      maxID++;

      dataChotot.push(buffData);

      buffData = {};

    });

    console.log(dataChotot);
    saveDataFirstLoad(dataChotot);

    //convert data to json

    //send data to server

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
      console.log(JSON.stringify(data));
    },
    error: function(textstatus, errorThrown) {
      console.log('text status ' + textstatus + ', err ' + errorThrown);
    }

  });

}
