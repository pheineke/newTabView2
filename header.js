var header = document.getElementsByTagName('header')[0];

var ul = header.getElementsByTagName('ul')[0];

header.addEventListener('mouseover', (e) => {
    header.style.fontSize = '2rem';
});

header.addEventListener('mouseout', (e) => {
    header.style.fontSize = '1.2rem';
});

var radio_button = document.getElementById('radio')
var radio = document.getElementsByClassName('radio')[0];
var radio_enabled = false;
radio_button.addEventListener('click', (e) => {
    if (radio_enabled) {
        radio.style.display = 'flex';
    } else {
        radio.style.display = 'none';
    }

    radio_enabled = !radio_enabled
    
});