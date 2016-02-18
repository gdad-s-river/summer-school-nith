var tl_1 = new TimelineMax();

/* Click event on the Cross button on the Youtube modal*/
document.querySelector('.fa.fa-times-circle').addEventListener('click', function(){
	document.querySelector('.info-4').style.display = 'none';
	showInfo();
});

document.addEventListener('keyup', function(e){
	if(e.keyCode === 27){
		document.querySelector('.info-4').style.display = 'none';
		showInfo();
	}
});


/*When the video ends show the text*/
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-video', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
		if(event.data === 0) {
				document.querySelector('.info-4').style.display = 'none';
				showInfo();
		}
}
/* END: When the video ends show the text*/

/*detect the route, if !route = user has hit the root url (else)*/
if(window.location.hash === "#info"){
	$( ".pane, .bg, .retrigger, audio" ).remove();
	showVideo();
}
else{
	tl_1.to('.logo', 2, {
		left: -900,
		ease: Bounce.easeOut,
		delay: 7
	});
	tl_1.to('body', 2, {
		backgroundColor: "#000000",
		ease: Power0.easeNone
	});
	tl_1.to('.logo', 0.5, {
		left: 0,
		text: "THIS",
		ease: Bounce.easeOut
	});
	tl_1.to('.logo', 0.0001, {
		text: "IS",
		delay: 1
	});
	tl_1.to('.logo', 0.0001, {
		text: "YOUR",
		delay: 1
	});
	tl_1.to('.logo', 0.0001, {
		text: "CHANCE",
		delay: 1
	});
	tl_1.to('.logo', 0.0001, {
		text: "TO",
		delay: 1
	});
	tl_1.to('.logo', 0.0001, {
		text: "BECOME",
		delay: 1
	});
	tl_1.to('.logo', 0.0001, {
		text: "A",
		delay: 1
	});
	tl_1.to('.logo', 3, {
		text: "SUPERHERO!",
		color: "rgb(255,0,0)",
		delay: 1
	});
	tl_1.to('.logo',1, {
		scale:1.3
	});
	tl_1.to('body', 2, {
		backgroundColor: "#ffffff",
		ease: Power0.easeNone,
		delay: -0.5,
		onComplete: removeNodes
	});

function removeNodes(){
		$( ".pane, .bg, .retrigger" ).remove();
		if(window.location.hash != "#info"){
			window.location.href = window.location.href + "#info";
			showVideo();
		}
	}

}

function showVideo(){
	document.querySelector('body').style.background = "transparent";
	tl_1.to(".info-4", 1, {
		display: "block",
	});

};

function showInfo(){

	tl_1.to("#viewport", 1, {
		display: "block",
	});

	tl_1.to(".info-1, .info-2", 1.5, {
		display: "block",
		top: 0,
		ease: Elastic.easeOut.config(1, 0.3)
	});

	tl_1.to(".info-links", 0.5, {
		display: "block",
		top: "50%",
		ease: Elastic.easeOut.config(1, 0.3)
	});

	tl_1.to(".info-3", 1, {
		display: "block",
		bottom: "-6%",
		ease: Elastic.easeOut.config(1, 0.3)
	});
	tl_1.to(".author", 1, {
		display: "block",
		scale:2,
		right:"10%",
		ease: Elastic.easeOut.config(1, 0.3)
	});
	tl_1.to(".author", 1, {
		scale:1,
		right:"5%",
		ease: Elastic.easeOut.config(1, 0.3)
	});
}
