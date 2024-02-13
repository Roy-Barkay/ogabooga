function onYouTubeIframeAPIReady() {
  // Create a new player instance
  var player = new YT.Player("videoBackground", {
    videoId: "a54mP2ZJi0U",
    playerVars: {
      controls: 0, // Hide player controls
      disablekb: 1, // Disable keyboard controls
      iv_load_policy: 3, // Hide video annotations
      modestbranding: 1, // Enable modest branding
    },
  });
}
