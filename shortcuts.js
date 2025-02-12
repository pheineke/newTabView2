// Beim Start werden vorhandene Icons aus localStorage geladen
var links = JSON.parse(localStorage.getItem("links")) || [];

const overview = document.getElementsByClassName('overview')[0];
const add = document.getElementById('add');

// Funktion zum Erzeugen des Icon-Divs
function createIconDiv(item) {
    var div = document.createElement('div');
    div.classList.add('icon');

    var title = document.createElement('p');
    title.innerHTML = item.name

    div.appendChild(title);


    var img = document.createElement('img');
    img.setAttribute('width', 64);
    img.setAttribute('src', item.img_url);
    div.appendChild(img);

    // Beim Klick weiterleiten
    div.addEventListener("click", function() {
        window.location.href = item.link;
    });

    div.addEventListener("contextmenu", function(e) {
        e.preventDefault(); // Standard-Kontextmenü unterbinden
        if (confirm("Soll dieser Link gelöscht werden?")) {
        // Element aus dem DOM entfernen
        div.remove();
        // Den Eintrag aus dem links Array löschen
        links = links.filter(function(it) {
            return it.link !== item.link;
        });
        // localStorage aktualisieren
        localStorage.setItem("links", JSON.stringify(links));
        }
    });
    return div;
}

// Zeige beim Laden der Seite alle gespeicherten Icons an
window.addEventListener("DOMContentLoaded", function() {
  links.forEach(function(item) {
    overview.appendChild(createIconDiv(item));
  });
});

// Öffnen des Modals beim Klick auf den Plus-Button
add.addEventListener("click", function (e) {
  var modal = document.getElementById('add_modal');
  modal.style.display = "block";

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});

// Füge den submit-Listener NUR EINMAL hinzu
document.getElementById("adder").addEventListener("submit", function(e) {
  e.preventDefault();
  
  var formData = new FormData(this);
  var name = formData.get('name');
  var link = formData.get('link');
  const img_url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${link}&size=64`;
  
  // Neues Icon-Objekt
  var newIcon = { name: name, link: link, img_url: img_url };
  
  // Füge das Objekt zum Array hinzu und speichere es
  links.push(newIcon);
  localStorage.setItem("links", JSON.stringify(links));
  
  // Erstelle und hänge das neue DIV an
  overview.appendChild(createIconDiv(newIcon));
  
  // Schließe den Modal
  document.getElementById('add_modal').style.display = "none";
  
  // Optional: Formular zurücksetzen
  this.reset();
});