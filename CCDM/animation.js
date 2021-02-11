// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


//Window
var w = window.innerWidth; //Largura
var h = window.innerHeight; //Altura
var svgrect = document.querySelector("#svgrect");
var rect = document.querySelector("#rect");
var background = document.getElementById("background");
var main = document.getElementById("main");
var firstLetter = document.getElementById("firstLetter");
var secondLetter = document.getElementById("secondLetter");

var pageLocation = location.hash;;

var changeZoom = false;

var pageOpen;

var info = 1;


if (pageLocation == "#sobre") {
    pageOpen = "sobre";
} else if (pageLocation == "#intervenientes") {
    pageOpen = "intervenientes";
} else if (pageLocation == "#locais") {
    pageOpen = "locais";
} else if (pageLocation == "#contactos") {
    pageOpen = "contactos";
} else {
    pageOpen = "home";
    infoChangeAuto = setInterval(infoAuto, 3000);
}

$("#content").load(pageOpen + ".html");


$("#" + pageOpen).addClass("selected");


rect.setAttribute("x", w/2-w*0.05)
rect.setAttribute("y", h/2-w*0.05)

viewBox();

var refreshrect;

function refreshRect() {
    rect.style.animationFillMode = "forwards";
    clearInterval(refreshrect);
}

//ViewBox
function viewBox() {
    svgrect.setAttribute("viewBox", "0 0 " + w + " " + h);
    rect.style.animationFillMode = "none";
    refreshrect = setInterval(refreshRect, 0.01);
}

//Resize
window.onresize = function () {
    w = window.innerWidth;
    h = window.innerHeight;
    viewBox();

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};


//Animação Inicial
var RectStop;
var RectZoom;
var timerRandom = Math.floor((Math.random() * 3000) + 1);

function stopRect() {
    rect.style.animationPlayState = "Running, Paused";
    clearInterval(RectStop);
    main.classList.add("opacity");
}

var zoomRect;
zoomRect = setInterval(zoom, timerRandom);

function zoom() {
    if (changeZoom) {
        rect.classList.remove("zoomout");
        main.classList.remove("imediato");
        changeZoom = false;
    }
    rect.classList.add("zoom");
    firstLetter.classList.add("after");
    firstLetter.style.transition = "all 2s ease-in-out";
    secondLetter.classList.add("after");
    secondLetter.style.transition = "all 2s ease-in-out";
    clearInterval(zoomRect);
    RectStop = setInterval(stopRect, 2000);
}

//Mudar conteudo
function zoomRectReverse() {
    rect.style.animationPlayState = "Running";
    main.classList.remove("opacity");
    main.classList.add("imediato");
    rect.classList.remove("zoom");
    rect.classList.add("zoomout");
    firstLetter.classList.remove("after");
    firstLetter.style.transition = "";
    secondLetter.classList.remove("after");
    secondLetter.style.transition = "";
    changeZoom = true;
    zoomRect = setInterval(zoom, 2000);
};

//Atualizar conteudo
$("#home").click(function () {
    if (pageOpen != "home") {
        zoomRectReverse();
        pageChange(pageOpen, "home");
        infoChangeAuto = setInterval(infoAuto, 3000);
    }
});

$("#sobre").click(function () {
    if (pageOpen != "sobre") {
        zoomRectReverse();
        pageChange(pageOpen, "sobre");
        clearInterval(infoChangeAuto);
    }
});

$("#intervenientes").click(function () {
    if (pageOpen != "intervenientes") {
        zoomRectReverse();
        pageChange(pageOpen, "intervenientes");
        clearInterval(infoChangeAuto);
    }
});

$("#locais").click(function () {
    if (pageOpen != "locais") {
        zoomRectReverse();
        pageChange(pageOpen, "locais");
        clearInterval(infoChangeAuto);
    }
});

$("#contactos").click(function () {
    if (pageOpen != "contactos") {
        zoomRectReverse();
        pageChange(pageOpen, "contactos");
        clearInterval(infoChangeAuto);
    }
});

function pageChange(antigo, novo) {
    $("#" + antigo).removeClass("selected");
    $("#" + novo).addClass("selected");
    $("#content").load(novo + ".html");
    pageOpen = novo;
    info = 1;
}

function infoScrollChange() {
    var position = document.getElementById('interv').scrollTop;
    var info2 = document.getElementById('info2').offsetTop;
    var info3 = document.getElementById('info3').offsetTop;
    var info4 = document.getElementById('info4').offsetTop;

    if (position < info2) {
        document.getElementById("button" + info).classList.remove("selected");
        document.getElementById("button" + 1).classList.add("selected");
        info = 1;
    } else if (position < info3) {
        document.getElementById("button" + info).classList.remove("selected");
        document.getElementById("button" + 2).classList.add("selected");
        info = 2;
    } else if (position < info4) {
        document.getElementById("button" + info).classList.remove("selected");
        document.getElementById("button" + 3).classList.add("selected");
        info = 3;
    } else if (position >= info4) {
        document.getElementById("button" + info).classList.remove("selected");
        document.getElementById("button" + 4).classList.add("selected");
        info = 4;
    }
}

function infoChange(atual, scrolls) {
    if (scrolls === true) {
        var topPos = document.getElementById('info' + atual).offsetTop;
        document.getElementById('interv').scrollTop = topPos;
    } else {
        document.getElementById("info" + info).classList.remove("display");
        document.getElementById("info" + atual).classList.add("display");

        clearInterval(infoChangeAuto);
        infoChangeAuto = setInterval(infoAuto, 3000);
    }

    document.getElementById("button" + info).classList.remove("selected");
    document.getElementById("button" + atual).classList.add("selected");



    info = atual;
}

function scrollID(move) {
    var topPos = document.getElementById("info"+move+"").offsetTop;
    document.getElementById('about').scrollTop = topPos;
}

var infoChangeAuto;

function infoAuto() {
    var auto;
    if (info == 4) {
        auto = 1;
    } else {
        auto = info + 1;
    }
    infoChange(auto, false);
}
