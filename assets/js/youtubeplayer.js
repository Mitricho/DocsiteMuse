function onYouTubeIframeAPIReady(){	
	renderVideoSlides();
}
function renderVideoSlides(){
	let videos = document.querySelectorAll('.carousel-inner .video-slide');
	//console.log('renderVideoSlides: ' + videos.length);
	videos.forEach(function(userItem) {
		let videocode = userItem.getAttribute('data-video');
		if(videocode !== null && typeof(videocode)!='undefined')
		{		
			let playerContainer = userItem.querySelector('.video-foreground');	
			if(playerContainer !== null && typeof(playerContainer)!=='undefined')
			{
			    let idy = playerContainer.getAttribute('id');
    			var player; player = new YT.Player(idy,{
    				videoId:videocode,// YouTube Video ID 
    				//width: 1280, // Player width (in px) 
    				//height: 720, // Player height (in px) 
    				playerVars:{
    					playlist:videocode,
    					autoplay: 1, // Auto-play the video on load 
    					disablekb: 1, 
    					controls: 0, // Hide pause/play buttons in player 
    					showinfo: 0, // Hide the video title 
    					modestbranding: 1, // Hide the Youtube Logo 
    					loop: 1, // Run the video in a loop 
    					fs: 0, // Hide the full screen button 
    					autohide:1, // Hide video controls when playing 
    					rel: 0, 
    					enablejsapi: 1,
    					suggestedQuality: 'large',
    					theme:'light',
    					mute:1
    				},
    				events:{
    					'onReady':function(e){
    						e.target.mute();
    						e.target.setVolume(0);
    						e.target.setPlaybackQuality('hd1080');
    					},
    					'onStateChange':function(e){
    					    e.target.mute();
    						if(e && e.data === 1)
    						{
    						}
    						else if(e && e.data === 0)
    						{
    							e.target.playVideo();
    							e.target.setVolume(0);
    							e.target.mute();
    						}
    					}
    				}
    			});
		    }
		}
	});
}