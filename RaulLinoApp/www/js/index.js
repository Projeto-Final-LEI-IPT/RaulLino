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
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onBackKeyDown() {
}

var onGPSSuccess = function (position) {
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
        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 14);
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
            .bindPopup('<strong> GPS</strong>')
            .openPopup();
    } else {
        map = L.map('map').setView([abrantesLat, abrantesLong], 14);
        L.marker([abrantesLat, abrantesLong]).addTo(map)
            .bindPopup('<strong> Centro Abrantes</strong>')
            .openPopup();
    }

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        // Handle the back button
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    fetch("dados.json")
        .then(response => response.json())
        .then(json => {
            var i = 0;
            json.dados.forEach(element => {
                L.marker([element.coordenadas[0], element.coordenadas[1]]).addTo(map)
                    .bindPopup('<a onclick="carrega_pagina(' + i + ');">' + element.titulo + '</a>');
                i++;
            });
        });


    // centra o map
    map.setView(new L.LatLng([abrantesLat, abrantesLong]), 5);


};

function onGPSError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    gpsSucess = false;
}

function GPSDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const teta1 = lat1 * Math.PI / 180; // φ, λ in radians
    const teta2 = lat2 * Math.PI / 180;
    const deltat = (lat2 - lat1) * Math.PI / 180;
    const deltae = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltat / 2) * Math.sin(deltat / 2) +
        Math.cos(teta1) * Math.cos(teta2) *
        Math.sin(deltae / 2) * Math.sin(deltae / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d;

}

function carrega_pagina(id) {

    fetch("dados.json")
        .then(response => response.json())
        .then(json => {

            var carr =
                '<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">' +
                '<div class="carousel-inner">';
            json.dados[id].imagens.forEach(element => {
                carr += '<center><div class="carousel-item active" ><img  style="max-width:1000px; max-height:800px;" src="' + element + '" class="d-block w-100" ></div></center>'
            });
            carr += '</div>' +
                '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"' +
                'data-bs-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                '<span class="visually-hidden">Previous</span>' +
                '</button>' +
                '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"' +
                'data-bs-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                '<span class="visually-hidden">Next</span>' +
                '</button>' +
                '</div>';

            document.getElementById("carImag").innerHTML = carr;

            document.getElementById("pagina_titulo").textContent = json.dados[id].titulo;
            document.getElementById("pagina_ano").textContent = json.dados[id].ano;
            document.getElementById("pagina_localizacao").textContent = json.dados[id].localizacao;
            document.getElementById("pagina_tipologia").textContent = json.dados[id].tipologia;
            document.getElementById("pagina_informacao").textContent = json.dados[id].info;
        });


    document.getElementById("map").style.display = "none";
    document.getElementById("pagina").style.display = "block";
}

function descarrega_pagina() {
    document.getElementById("map").style.display = "block";
    document.getElementById("pagina").style.display = "none";
}
