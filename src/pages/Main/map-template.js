export default `
<div>
    <style>
            html, body {
                margin: 0;
            }

            #map {
                height: 100%;
                width: 100%;
            }
            #marker {
                background-image: url("https://picsum.photos/200/300");
                background-size: cover;
                width: 50px;
                height: 70px;
              }
    </style>
    
    <div id='map' class='map'></div>

    <!-- load TomTom Maps Web SDK from CDN -->
    <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
    <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

    <script>
        // create the map
        let longLat = [106.97549, -6.268437];
    
        tt.setProductInfo('Hayuq Driver', '1.0');
        let map = tt.map({
            key: 'ofnucdLMJLOSMQGAB0Q3ur7B0yKfBMWv',
            container: 'map',
            center: longLat,
            zoom: 25
        });
        
        map.on('dragend', function() {
            let center = map.getCenter();
            window.ReactNativeWebView.postMessage(center.lng.toFixed(3) + ", " + center.lat.toFixed(3));
        })
        var marker = new tt.Marker().setLngLat(longLat).addTo(map)
        // var element = document.createElement("div")
        // element.id = "marker"

        // var marker = new tt.Marker({ element: element })
        // .setLngLat(longLat)
        // .addTo(map)
       
    </script>
</div>
`;
