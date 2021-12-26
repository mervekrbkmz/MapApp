var _Map, _Draw, _Source, _Layer;
window.onload = function () { 
    $.ajax({
        url: 'Home/GetCordinates',
        type: 'GET',
        dataType: 'json',
        success: function (gelenveri) {
            setPoint(gelenveri)
        },
       
    }); 
};
setPoint = function (data) {
    var _features = [];
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        var id = data[i].Number;
        var _geo = new ol.geom.Point([data[i].xCordinate, data[i].yCordinate]);
        var featurething = new ol.Feature({
            name: data[i].Name,
            geometry: _geo,
        });
        featurething.setId(id)
        var _style = new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: 'rgba(0,0,255,0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#4271AE',
                    scale: 0.1,
                }),
                radius: 10
            }),
        });
        featurething.setStyle(_style);
        _features.push(featurething);
    }
    var _pointSource = _Layer.getSource();

    _pointSource.addFeatures(_features);
}
showModal = function () {
    $(document).ready(function () {
        $("#myModal").modal('show');

    });
}
appendModal = function (data) {
    var count = data.lenght;
    var t = $('#dTable').DataTable();
    data.forEach(element => t.row.add([
        element.Name,
        element.Number,
        element.xCordinate,
        element.yCordinate,
    ]).draw(false));




}
showQueryModal = function (data) {
    $(document).ready(function () {
        $("#queryModal").modal('show');
    });
    appendModal(data);
}
closeModal = function () {
    alert("Kaydedildi");
};
postCoordinates = function () {
    let isValidName = false;
    let isValidNumber = false;
    var sendData = {};
    if (document.getElementById("Name").value != "") {
        sendData.Name = document.getElementById("Name").value;
        isValidName = true;
      
    }
    if (document.getElementById("Number").value!="") {
        sendData.Number = document.getElementById("Number").value;
        isValidNumber = true;
    }
    sendData.Number = document.getElementById("Number").value;
    sendData.xCordinate = document.getElementById("Xcoordinate").value;
    sendData.yCordinate = document.getElementById("Ycoordinate").value;
    $(document).ready(function () {
        if (isValidName == true && isValidNumber == true) {
            $.ajax({
                url: 'Home/PointCreate',
                type: 'POST',
                dataType: 'json',
                data: sendData,
                success: function (gelenveri) {
                    alert("Success Added");
                },
                error: function (hata) {
                    alert("Error!")
                }
            });
            location.reload();

        }
        else {
            isValidName == false ? alert("Name is required!") : alert("Number is required!");

        }
    });
}
getCoordinates = function () {
    var data = {};
        data.Name = document.getElementById("Name").value; //""
    data.Number = document.getElementById("Number").value; //"" tüm alanlarý doldur
    data.xCordinate = document.getElementById("Xcoordinate").value;
    data.yCordinate = document.getElementById("Ycoordinate").value;
   
    $(document).ready(function () {
        
            $.ajax({
                url: 'Home/GetCordinates',
                type: 'GET',
                dataType: 'json',
                success: function (gelenveri) {
                    showQueryModal(gelenveri);
                },
                error: function (hata) {
                    alert("Error!")
                }
            });
        
    });
}
InitializeMap = () => {

    _Source = new ol.source.Vector({ wrapX: false });

    _Layer = new ol.layer.Vector({
        source: _Source,
    });

    _Map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            _Layer
        ],
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7
        })
    });
}
AddInteraction = () => {

    _Draw = new ol.interaction.Draw({
        source: _Source,
        type: "Point"
    });

    _Map.addInteraction(_Draw);

    _Draw.setActive(false);
    _Draw.on(
        "drawend",
        (_event) => {

            console.log(_event.feature.getGeometry().getCoordinates());

            _Draw.setActive(false);
            var cordinates = _event.feature.getGeometry().getCoordinates();
            document.getElementById("Xcoordinate").value = cordinates[0]
            document.getElementById("Ycoordinate").value = cordinates[1]
            showModal();
        });
}
AddPoint = () => {

    _Draw.setActive(true);
}



