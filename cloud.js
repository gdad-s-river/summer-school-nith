(function(){
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelRequestAnimationFrame = window[vendors[x]+
			'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

			if (!window.cancelAnimationFrame){
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			}
		}())

	var layers = [], // clouds render here
		objects = [], // cloud hinge points 
		world = document.getElementById( 'world' ), //the world view
		viewport = document.getElementById( 'viewport' ), //viewport litarlly
		d = 0, // z distance from the viewer
		p = 400, //viewport's perspective
		worldXAngle = 0, //x angle to aid perspective towards and away from the reader titling around x axis
		worldYAngle = 0; //y angle to aid perspective towards and away from the reader titling around y axis
		
		viewport.style.webkitPerspective = p;
		viewport.style.MozPerspective = p;
		viewport.style.oPerspective = p;
		
	generate();  //generate the cloud hinges

	function generate() {
		objects = []; //start afresh : clear hinge points in javascript
		/*start afresh : clear hinge points in html*/
		if ( world.hasChildNodes() ) {
			while ( world.childNodes.length >= 1 ) {
				world.removeChild(world.firstChild );       
			} 
		}
		/*after clean up create hinge points make 5 new ones and push in javascript hinges (objects array)*/
		for( var j = 0; j < 5; j++ ) {
			objects.push( createCloud() );
		}
	}

	/*
		purpose: create clouds
		note: runs 5 times in generate() => 5 hinges are created
		*/
		function createCloud() {

		var div = document.createElement('div'),  //cloud hinge element
		x = 256 - ( Math.random() * 512 ),
		y = 256 - ( Math.random() * 512 ),
		z = 256 - ( Math.random() * 512 ),
			t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px )'; //put them in a particular random point in space

		div.className = 'cloudBase';  //hinge element classname

		/*transform = translate(t)*/
		div.style.webkitTransform = t; 
		div.style.MozTransform = t;
		div.style.oTransform = t;
		
		world.appendChild( div ); //put the hinge in the dom

		/* for every hinge [5,15] clouds render*/
		for( var j = 0; j < 5 + Math.round( Math.random() * 10 ); j++ ) {
			var cloud = document.createElement( 'img' ); //cloud element
			cloud.className = 'cloudLayer'; //cloud element classname
			cloud.src = 'cloud.png'
			
			/*x, y, z for translate, a (angle) for rotate and s for scale */
			var x = 256 - ( Math.random() * 512 ); 
			var y = 256 - ( Math.random() * 512 );
			var z = 100 - ( Math.random() * 200 );
			var a = Math.random() * 360; // a ∈ [0.360] degrees
			var s = .25 + Math.random(); // s ∈ [0.0.25] degrees

			x *= .2; y *= .2;

			cloud.data = { 
				x: x,
				y: y,
				z: z,
				a: a,
				s: s,
				speed: .3 * Math.random()
			};

			var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ( ' + a + 'deg ) scale( ' + s + ' )';
			cloud.style.webkitTransform = t;
			cloud.style.MozTransform = t;
			cloud.style.oTransform = t;

			div.appendChild( cloud );
			layers.push( cloud );
		}

		return div;
	}

	window.addEventListener( 'mousewheel', onContainerMouseWheel );
	window.addEventListener( 'DOMMouseScroll', onContainerMouseWheel ); 

	/*On moving mouse change the world x and y angles which reflects in the updateView() */
	window.addEventListener( 'mousemove', function( e ) {
		worldYAngle = -( .5 - ( e.clientX / window.innerWidth ) ) * 180;
		worldXAngle = ( .5 - ( e.clientY / window.innerHeight ) ) * 180;
		updateView();
	} );


	function updateView() {
		var t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
		world.style.webkitTransform = t;
		world.style.MozTransform = t;
		world.style.oTransform = t;
		world.style.transform = t;
	}

	function onContainerMouseWheel( event ) {
		event = event ? event : window.event;
		d = d - ( event.detail ? event.detail * -5 : event.wheelDelta / 8 );
		updateView();
	}

/*
    Iterate layers[], update the rotation and apply the
    inverse transformation currently applied to the world.
    Notice the order in which rotations are applied.
    */
    function update (){

    	for( var j = 0; j < layers.length; j++ ) {
    		var layer = layers[ j ];
    		layer.data.a += layer.data.speed;
    		var t = 'translateX( ' + layer.data.x + 'px ) \
    		translateY( ' + layer.data.y + 'px ) \
    		translateZ( ' + layer.data.z + 'px ) \
    		rotateY( ' + ( - worldYAngle ) + 'deg ) \
    		rotateX( ' + ( - worldXAngle ) + 'deg ) \
    		rotateZ( ' + layer.data.a + 'deg ) \
    		scale( ' + layer.data.s + ')';
    		layer.style.transform = t;
    		layer.style.webkitTransform = t;
    		layer.style.MozTransform = t;
    		layer.style.oTransform = t;
    	}

    	requestAnimationFrame( update );

    }

    update();
})();

