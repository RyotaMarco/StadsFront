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

function selectedWork() {
  const select = document.getElementById("workOptions-input");
  const selectOption = select.options[select.selectedIndex].value;

  markerOptions.icon = arrayMarkers[select.selectedIndex];
  const markerClass = document.getElementsByClassName("leaflet-marker-icon");
  markerClass[markerClass.length - 1].src =
    arrayMarkers[select.selectedIndex].options.iconUrl;
}


var markerOptions = {
  icon: arrayMarkers[0],
  draggable: true,
};

let arrayInformation = [];

//Skicka Button function
function getFormInformation() {
  const formObj = {};
  const formular = document.getElementsByClassName("formular");
  for (let i = 0; i < formular.length; i++) {
    const strLabel = document.getElementById(
      `${formular[i].id}-label`
    ).innerText;
    Object.assign(formObj, {
      [strLabel.slice(0, strLabel.indexOf(":"))]: document.getElementById(
        `${formular[i].id}-input`
      ).value,
    });
  }
  const markerClass = document.getElementsByClassName("leaflet-marker-icon");
  markerClass[markerClass.length - 1].classList.add("resolved");

  const markerClassResolved = document.getElementsByClassName("resolved");
  const list = document.getElementById("list");
  list.classList.remove("list-active");
}

//Add marker to map on click
map.on("click", function (e) {
  const markerClass = document.getElementsByClassName("leaflet-marker-icon");
  const markerPane = document.getElementsByClassName("leaflet-marker-pane");
  if (
    markerPane[0].children.length === 0 ||
    markerClass[markerClass.length - 1].classList.contains("resolved")
  ) {
    var markerClick = new L.Marker(
      [e.latlng.lat, e.latlng.lng],
      markerOptions
    ).addTo(map);
    const select = document.getElementById("workOptions-input");
    markerClass[markerClass.length - 1].id = `marker${markerClass.length - 1}`;
  }
});
map.addControl(searchCotrol);

const list = document.getElementById("list");
const mapForm = document.getElementById("map");
map.addEventListener("click", () => {
  list.classList.add("list-active");
});
