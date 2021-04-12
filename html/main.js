var currentSize = 25

const ANIMATEDCLASSNAME = "animated";
const ELEMENTS = document.querySelectorAll(".HOVER");
const ELEMENTS_SPAN = [];

ELEMENTS.forEach((element, index) => {
	let addAnimation = false;
	// Elements that contain the "FLASH" class, add a listener to remove
	// animation-class when the animation ends
	if (element.classList[1] == "FLASH") {
		element.addEventListener("animationend", e => {
			element.classList.remove(ANIMATEDCLASSNAME);
		});
		addAnimation = true;
	}

	// If The span element for this element does not exist in the array, add it.
	if (!ELEMENTS_SPAN[index])
		ELEMENTS_SPAN[index] = element.querySelector("span");

	element.addEventListener("mouseover", e => {
		ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + "px";
		ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + "px";

		// Add an animation-class to animate via CSS.
		if (addAnimation) element.classList.add(ANIMATEDCLASSNAME);
	});

	element.addEventListener("mouseout", e => {
		ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + "px";
		ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + "px";
	});
});


function SetCrosshairURL(url) {
    var element = document.getElementById("crosshair"); 
    var input = document.getElementById("url-tab-ui");
    input.value = url;
    element.setAttribute("src", url)
    if (input.value != "") {
        SetCrosshairStatus(true)
    }
    else {
        SetCrosshairStatus(false)
    }
    SetCrosshairSize(currentSize)
}

function SetCrosshairSize(size) {
    var element = document.getElementById("crosshair");
    var input = document.getElementById("size-tab-ui");
    input.value = size;
    currentSize = size;
    element.setAttribute("width", size)
    element.setAttribute("height", size)
}

function SetCrosshairStatus(bool) {
    var element = document.getElementById("crosshair");
    element.style.display = bool ? "block" : "none";
}

function SetConfigDisplay(bool) {
    var element = document.getElementById("menu-ui-main");
    element.style.display = bool ? "block" : "none";
    if (bool == false) {
        fetch(`https://${GetParentResourceName()}/CloseCrosshairConfig`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(["a"])
        }).then(resp => resp.json()).then(resp => console.log(resp));
    }
}

function UpdateCrosshairData() {
    var url = document.getElementById("url-tab-ui").value
    var size = document.getElementById("size-tab-ui").value
    SetCrosshairURL(url)
    SetCrosshairSize(size)
    fetch(`https://${GetParentResourceName()}/UpdateCrosshairData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            url: url, 
            size: size,
        })
    }).then(resp => resp.json()).then(resp => console.log(resp));
    SetConfigDisplay(false)
}

function CloseMenu() {
    SetConfigDisplay(false)
}

document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('message', function(event) {
        if (event.data != null) {
            var data = event.data.data;
            var toggleUI = event.data.toggleUI;
            if (data != null) {
                var url = data.url;
                var size = data.size;
                SetCrosshairURL(url);
                SetCrosshairSize(size);
            }
            else if (toggleUI != null) {
                SetConfigDisplay(toggleUI);
            }
        }
    });
});