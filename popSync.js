var tl_1 = new TimelineMax();
if(window.location.hash === "#info"){
	$( ".pane, .bg, .retrigger, audio" ).remove();
	showInfo();
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
		}
	}
	showInfo();
}

function showInfo(){
	tl_1.to("#viewport", 1, {
		display: "block",
	});

	tl_1.to(".info-1, .info-2", 1.5, {
		display: "block",
		top: 0,	
		ease: Elastic.easeOut.config(1, 0.3)
	});
	tl_1.to(".info-3", 1, {
		display: "block",
		bottom: "0",	
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