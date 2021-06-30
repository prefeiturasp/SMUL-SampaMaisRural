var initLat = -23.5528;
var initLong = -46.6307;
var addressApi = 'http://photon.komoot.de/api/?q=';
var globalMap = null;

function initMap() {
  var lat = ($('input[name*=lat]')[0].value || initLat);
  var lon = ($('input[name*=lon]')[0].value || initLong);
  globalMap = L.map('map').setView([lat, lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(globalMap);

  L.Control.geocoder().addTo(globalMap);

  var marker = L.marker([lat, lon], {draggable: ($('#map').data('draggable') || false) }).addTo(globalMap)
    .openPopup();

  marker.on('dragend', function(event) {
    var latlng = event.target.getLatLng();
    L.Control.Geocoder.nominatim().reverse(latlng, 1, function(e) {
      var result = e[0];
      var address = result.properties.address;
      var center = result.center;
      fillAddress(address.road, address.city, address.postcode, center.lng, center.lat);
    })
  });

  var popup = L.popup();
}

function onSearch(input) {
  autocomplete('input[name*=full_address]', { hint: false }, [
    {
      source: function(request, response) {
	var term = $('input[name*=full_address]').val();
	$.ajax({
	  url: (addressApi + term + '&lat=' + initLat + '&lon=' + initLong),
	  data: "",
	  dataType: "json",
	  type: "GET",
	  contentType: "application/json; charset=utf-8",
	  success: function(data) {
	    response(data['features']);
	  },
	  error: function(response) {
	  },
	  failure: function(response) {
	  }
	});
      },
      displayKey: 'full_address',
      templates: {
	suggestion: function(suggestion) {
	  var properties = suggestion.properties;
	  return properties.name + ', ' + properties.city + ' - ' + properties.country;
	}
      }
    }
  ]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
    var properties = suggestion.properties;
    var geometry = suggestion.geometry;
    fillAddress(properties.name, properties.city, properties.postcode, geometry.coordinates[0], geometry.coordinates[1]);
  });

  $('.algolia-autocomplete').css('display', 'block');
}

function fillAddress(address, city, postcode, lon, lat) {
  var isComplete = (address && city && postcode);
  if (isComplete) {
    $('.address-not-found').hide();
  } else {
    $('.address-not-found').show();
  }
  $('input[name*=full_address]').blur();
  $('input[name*=full_address]')[0].value = address || '';
  $('input[name*=city]')[1].value = city || '';
  $('input[name*=zip_code]')[0].value = postcode || '';
  $('input[name*=lon]')[0].value = lon;
  $('input[name*=lat]')[0].value = lat;
  globalMap.panTo(new L.LatLng(lat, lon));
}

let currentStatus;

$(document).ready(function() {
  if ($('#map').length) { initMap(); }
  var addressInput = $('input[name*=full_address]');
  if (addressInput.length) { onSearch(addressInput); }
});
