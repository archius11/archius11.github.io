window.onload = function() {
  cities = ['Москва', 'Чита', 'Казань'];
  cities.forEach(function (item, i, arr){
      crd = getCityCoords(item);
      console.log(crd);
    }
  );

  getCitiesData();
}

function getCityCoords(Cityname) {
  coords = ''

  r = new XMLHttpRequest();
  r.open("GET", 'https://geocode-maps.yandex.ru/1.x/?apikey=115a3177-7f09-478b-87bb-f3f75e76869a&format=json&geocode=' + Cityname + '&kind=locality', false);
  r.send();
  json = JSON.parse(r.responseText);
  strcoords = json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
  coords = getCoordStruct(strcoords[0], strcoords[1]);
  return coords;
}

function getCoordStruct(lon, lat) {
  return {lon: lon, lat: lat};
}

function getCitiesData() {
  // r = new XMLHttpRequest();
  // r.open("GET", 'https://archius11.github.io/cities.csv', false);
  // r.send();
  // text = r.response;
  // d3.csv.parse(text, function(data) {
  //   console.log(data[0]);
  //   });
  d3.csv('https://archius11.github.io/cities.csv', function(data) {
      console.log(data[0]);
    });
}
