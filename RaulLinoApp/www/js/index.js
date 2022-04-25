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
    alert(GPSDistance(position.coords.latitude, position.coords.longitude, 39.467931, -8.201624));
  /*  
    function gps(){
        if (GPSDistance >= 3000) {
            var map = L.map('map').setView([39.467931, -8.201624], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
        } else {
            var map = L.map('map').setView([position.coords.latitude , position.coords.longitude ], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        
        }
       

    }
*/
    var map = L.map('map').setView([39.467931, -8.201624], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([position.coords.latitude , position.coords.longitude ]).addTo(map)
    .bindPopup('<strong> GPS</strong>')
    .openPopup();

    L.marker([39.456233, -8.189917 ]).addTo(map)
    .bindPopup('<a onclick="avportagempaiol();">AV. Portagem/AV. Paiol</a>')
    .openPopup();

    L.marker([39.461142, -8.199598]).addTo(map)
    .bindPopup('<a onclick="rlcamoes();">Rua Luis de Camões</a>')
    .openPopup();

    L.marker([39.452866, -8.248377 ]).addTo(map)
    .bindPopup('<a onclick="rfnova();">Rua da Fonte Nova</a>')
    .openPopup();

    L.marker([39.507931, -8.201624 ]).addTo(map)
    .bindPopup('<strong> estou carvalhal</strong>')
    .openPopup();

    L.marker([39.567931, -8.251624 ]).addTo(map)
    .bindPopup('<strong> estou carvalhal</strong>')
    .openPopup();



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
