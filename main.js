const provider = new GeoSearch.OpenStreetMapProvider();
const map = L.map("map").setView([59.3293, 18.0686], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const searchCotrol = new GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
  style: "bar",
  notFoundMessage: "Adressen kunde inte hittas",
  showMarker: false,
  searchLabel: "Sök adress",
});

//custom marker

var LeafletIcon = L.Icon.extend({
  options: {
    iconSize: [33, 44],
  },
});

var reserve = new LeafletIcon({ iconUrl: "img/Bookning.png" }),
  cableFault = new LeafletIcon({ iconUrl: "img/Kabelfel.png" }),
  inspec = new LeafletIcon({ iconUrl: "img/inspektion.png" }),
  brokenLamps = new LeafletIcon({ iconUrl: "img/Trasiga lampa.png" }),
  collapsedPole = new LeafletIcon({ iconUrl: "img/påkörd stolpe.png" });

const arrayMarkers = [collapsedPole, cableFault, reserve, inspec, brokenLamps];


//select workOptions
function selectedWork() {
  const select = document.getElementById("workOptions-input");
  const selectOption = select.options[select.selectedIndex].value;

  markerOptions.icon = arrayMarkers[select.selectedIndex];
  const markerClass = document.getElementsByClassName("leaflet-marker-icon");
  const lastMarkerClass = markerClass[markerClass.length - 1];
  lastMarkerClass.src = arrayMarkers[select.selectedIndex].options.iconUrl;


  //Id selector
  const selectId = document.getElementById("id-input");
  const dinamicClass = document.getElementsByClassName(selectOption.slice(0, 2).toUpperCase());
  selectId.value = "";
  const selectBrackle = selectOption.slice(0, 2).toUpperCase();
  selectId.value = `${selectBrackle}-${dinamicClass.length + 1}`;
  lastMarkerClass.classList.remove(lastMarkerClass.classList[lastMarkerClass.classList.length - 1]);
  lastMarkerClass.classList.add(selectBrackle);
}


var markerOptions = {
  icon: arrayMarkers[0],
};

let arrayInformation = [];

//Skicka Button function
function getFormInformation() {
  const formObj = {};
  const formular = document.getElementsByClassName("formular");
  for (let i = 0; i < formular.length; i++) {
    const strLabel = document.getElementById(`${formular[i].id}-label`).innerText;
    const strInput = document.getElementById(`${formular[i].id}-input`).value;
    Object.assign(formObj, { [strLabel.slice(0, strLabel.indexOf(":"))]: strInput });
  }

  document.getElementById("observation-input").value = "";
  document.getElementById("clientName-input").value = "";
  document.getElementById("comunClient-input").value = "";
  
  

  Object.assign(formObj, { "lat": arrayMarker[0], "lng": arrayMarker[1] });
  arrayMarker = [];
  console.log(formObj);

  const markerClass = document.getElementsByClassName("leaflet-marker-icon");
  const lastMarkerClass = markerClass[markerClass.length - 1];
  lastMarkerClass.classList.add("resolved");

  const markerClassResolved = document.getElementsByClassName("resolved");
  const list = document.getElementById("list");
  list.classList.remove("list-active");
  arrayMarkerClick[0].dragging._draggable._enabled = false;
  arrayMarkerClick = [];
console.log("");
  //Id  accountant
  const select = document.getElementById("workOptions-input");
  const selectOption = select.options[select.selectedIndex].value;
  const selectBrackle = selectOption.slice(0, 2).toUpperCase();
  const arrayIdInput = document.getElementsByClassName(selectBrackle);
  lastMarkerClass.classList.add(`${selectBrackle}-${arrayIdInput.length}`);

}

let arrayMarkerClick = [];

let arrayMarker = [];

//Add marker to map on click
map.on("click", function (e) {
  markerOptions.icon = arrayMarkers[0];
  document.getElementById("collapsedPole").selected = true;
  const markerClass = document.getElementsByClassName("leaflet-marker-icon");
  const markerPane = document.getElementsByClassName("leaflet-marker-pane");
  const lastMarkerClass = markerClass[markerClass.length - 1];
  if (markerPane[0].children.length === 0 || lastMarkerClass.classList.contains("resolved")) {
    var markerClick = new L.Marker([e.latlng.lat, e.latlng.lng], markerOptions).addTo(map);
    markerClick.dragging.enable();
    arrayMarkerClick.push(markerClick);
    const select = document.getElementById("workOptions-input");
    const selectOption = select.options[select.selectedIndex].value;
    arrayMarker.push(e.latlng.lat, e.latlng.lng);

    //Id selector PÅ
    const selectId = document.getElementById("id-input");
    const lastMarkerClass = markerClass[markerClass.length - 1];
    const classPA = document.getElementsByClassName("PÅ");
    selectId.value = "";
    selectId.value = `${selectOption.slice(0, 2).toUpperCase()}-${classPA.length + 1}`;
    lastMarkerClass.classList.add("PÅ");
    lastMarkerClass.id = `marker${markerClass.length - 1}`;
  }
});
map.addControl(searchCotrol);

const list = document.getElementById("list");
const mapForm = document.getElementById("map");
map.addEventListener("click", () => {
  list.classList.add("list-active");
});
