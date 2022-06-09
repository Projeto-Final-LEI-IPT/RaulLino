/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

var gpsPosition, gpsSucess;
var abrantesLat = 39.46332002046439;
var abrantesLong = -8.199677027352164;



document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);
}

var onGPSSuccess = function(position) {
   /* alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
    gpsSucess = true;
    gpsPosition = position.coords; 

   /* var mapclient = L1.mapclient('mapclient').setView([position.coords.latitude , position.coords.longitude ], 13);
    L1.tileLayer1('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapclient);

     L1.marker1([position.coords.latitude , position.coords.longitude ]).addTo(mapclient)
     .bindPopup('<strong> estou no ipt</strong>')
     .openPopup();

*/

    distancia = GPSDistance(position.coords.latitude, position.coords.longitude, abrantesLat, abrantesLong); 
    var map;

    if (distancia < 5000) {
        alert("estou em abrantes");
        map = L.map('map').setView([position.coords.latitude,  position.coords.longitude], 14);
        L.marker([position.coords.latitude , position.coords.longitude ]).addTo(map)
        .bindPopup('<strong> GPS</strong>')
        .openPopup();
    } else {
        alert("não estou em abrantes");
        map = L.map('map').setView([abrantesLat, abrantesLong], 14);
        L.marker([abrantesLat , abrantesLong ]).addTo(map)
        .bindPopup('<strong> Centro Abrantes</strong>')
        .openPopup();
    }
 

 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

   

    L.marker([39.456233, -8.189917 ]).addTo(map)
    .bindPopup('<a onclick="avportagempaiol();">AV. Portagem/AV. Paiol</a>');

    L.marker([39.461142, -8.199598]).addTo(map)
    .bindPopup('<a onclick="rlcamoes();">Rua Luis de Camões</a>');

    L.marker([39.452866, -8.248377 ]).addTo(map)
    .bindPopup('<a onclick="rfnova();">Rua da Fonte Nova</a>');

    L.marker([39.461466, -8.198790 ]).addTo(map)
    .bindPopup('<a onclick="lgamrma();">Largo General Avelar Machado e Rua Montepio Abrantino</a>');

    L.marker([39.462793, -8.196086 ]).addTo(map)
    .bindPopup('<a onclick="rsp();">Rua de S. Pedro, nº 8</a>');

    L.marker([39.463610, -8.201411 ]).addTo(map)
    .bindPopup('<a onclick="rdah();">Rua D. Afonso Henriques, nº 25</a>');

    L.marker([39.461228, -8.198713 ]).addTo(map)
    .bindPopup('<a onclick="lgam();">Largo General Avelar Machado</a>');

    L.marker([39.461644, -8.197661 ]).addTo(map)
    .bindPopup('<a onclick="rtv();">Rua Tenente Valadim, nº 3 e 5</a>');

    L.marker([39.462735, -8.196801]).addTo(map)
    .bindPopup('<a onclick="ra();">Rua do Arcediago, nº 19</a>');

    L.marker([39.463106, -8.197944 ]).addTo(map)
    .bindPopup('<a onclick="rgmam();">Rua General Manuel António Mourato, nº 11</a>');

    L.marker([39.463001, -8.198164 ]).addTo(map)
    .bindPopup('<a onclick="rje();">Rua José Estevão, nº 20</a>');

    L.marker([39.463001, -8.198164 ]).addTo(map)
    .bindPopup('<a onclick="rje();">Rua José Estevão, nº 20 </a>');

    L.marker([39.461810, -8.197334 ]).addTo(map)
    .bindPopup('<a onclick="rsi();">Rua de Santa Isabel nº 28 e 30 </a>');

    L.marker([39.469188, -8.188591 ]).addTo(map)
    .bindPopup('<a onclick="rpt();">Alferrarede, Rua do Porto Taínho, nº 24 </a>');

    L.marker([39.463790, -8.200921 ]).addTo(map)
    .bindPopup('<a onclick="rah();">Rua Afonso Henriques nº 9 a 11 </a>');

    L.marker([39.463567, -8.201586 ]).addTo(map)
    .bindPopup('<a onclick="ah();">Afonso Henriques (ao lado do nº 25)</a>');

    L.marker([39.463702, -8.201182 ]).addTo(map)
    .bindPopup('<a onclick="rah2();">Rua Afonso Henriques nº 13 a 15</a>');

    L.marker([39.464757, -8.197524 ]).addTo(map)
    .bindPopup('<a onclick="r5o();">Rua 5 de outubro de 1910, nº 16 </a>');

    L.marker([39.417387, -8.210650 ]).addTo(map)
    .bindPopup('<a onclick="csmrt();">Cemitério de S. Miguel do Rio Torto, Carvalhal </a>');
    
    // centra o map
    map.setView(new L.LatLng([abrantesLat, abrantesLong]), 5);


};

function onGPSError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    gpsSucess = false;
}

function GPSDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const teta1 = lat1 * Math.PI/180; // φ, λ in radians
    const teta2 = lat2 * Math.PI/180;
    const deltat = (lat2-lat1) * Math.PI/180;
    const deltae = (lon2-lon1) * Math.PI/180;
    
    const a = Math.sin(deltat/2) * Math.sin(deltat/2) +
              Math.cos(teta1) * Math.cos(teta2) *
              Math.sin(deltae/2) * Math.sin(deltae/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const d = R * c; // in metres

    return d;

}
