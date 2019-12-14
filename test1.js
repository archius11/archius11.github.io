window.onload = function() {
  cities = getCitiesData();
  cities.forEach(function (item, i, arr){
      crd = getCityCoords(item.city);
      cities[i]['coords'] = crd;
    }
  );
  console.log(cities)
  document.write(JSON.stringify(cities))
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
  r = new XMLHttpRequest();
  r.open("GET", 'https://archius11.github.io/cities.csv', false);
  r.send();
  text = r.response;
  rows = text.split('\n');

  citiesArray = []
  rows.forEach(function (item, i, arr) {
    row_data = item.split(';');
    if (row_data[0] != '')
      //citiesArray.push({name: row_data[0], city: row_data[1]});
      citiesArray.push({name: i, city: row_data[1]});
  });

  return citiesArray;

}
