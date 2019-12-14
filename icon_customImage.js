ymaps.ready(function () {
    CitiesData = getCitiesData();

    // Создаем собственный макет с информацией о выбранном геообъекте.
    var customBalloonContentLayout = ymaps.templateLayoutFactory.createClass([
            '<ul class=list>',
            // Выводим в цикле список всех геообъектов.
            '{% for geoObject in properties.geoObjects %}',
                '<li>{{ geoObject.properties.balloonContent }}</li>',
            '{% endfor %}',
            '</ul>'
        ].join(''));


    // jQuery(document).on( "click", "a.list_item", function() {
    //     // Определяем по какой метке произошло событие.
    //     var selectedPlacemark = placemarks[jQuery(this).data().placemarkid];
    //     alert( selectedPlacemark.properties.get('balloonContentBody') );
    // });

    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 9,
            behaviors: ['default', 'scrollZoom']
        }, {
            searchControlProvider: 'yandex#search'
        }),
            clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: false,//true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
            clusterBalloonContentLayout: customBalloonContentLayout
        }),
            getPointOptions = function () {
            return {
                preset: 'islands#violetIcon'
            };
        },
        geoObjects = [];

    for(var i = 0, len = CitiesData.length; i < len; i++) {
        crds = [CitiesData[i].coords['lat'], CitiesData[i].coords['lon']]
        workername = {balloonContent: i,//CitiesData[i].name,
                      //balloonContentBody: 'q12',
                      clusterCaption: CitiesData[i].name
                      };
        geoObjects[i] = new ymaps.Placemark(crds, workername, getPointOptions());
    }

    clusterer.options.set({
        gridSize: 80,
        clusterDisableClickZoom: true
    });

    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);

    myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
    });
});


function getCitiesData() {
  r = new XMLHttpRequest();
  r.open("GET", 'https://archius11.github.io/data.json', false);
  r.send();
  jsontext = r.response;
  citiesArray = JSON.parse(jsontext);

  return citiesArray;
}
