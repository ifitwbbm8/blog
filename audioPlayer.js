document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.cmp_play');
    const nextButton = document.querySelector('.cmp_next');
    const rewindButton = document.querySelector('.cmp_rewind');
    const muteButton = document.querySelector('.cmp_mute'); // Mute button
    const audio = document.querySelector('audio'); // Ensure this is not null
    const volumeControl = document.querySelector('.volume-slider'); // Volume control slider
    const infoDisplay = document.querySelector('.cmp_info'); // Element to display track info
    const progressControl = document.querySelector('.progressControl'); // Progress bar element
    const thumb = document.querySelector('.thumb'); // Thumb element
    const thumbVolume = document.querySelector('.thumb_1'); // Volume thumb element

    const tracks = ['songs/song1.mp3', 'songs/pizza.mp3', 'songs/Tudo_que_eu_sempre_sonhei.mp3']; // Array of audio files
    const coverImages = ['songsImgs/disco.png', 'songsImgs/pizza.jpg', 'songsImgs/tudoQueEuSempreSonhei.jpg']; // Array of cover images

    let currentTrackIndex = 0;
    let isDragging = false; // Flag to track dragging state
    let isVolumeDragging = false; // Flag to track volume dragging state

    playTrack()
    audio.pause()
    audio.currentTime = 0;
    progressControl.style.width = '0%';

    // Check if audio element exists
    if (!audio) {
        console.error('Audio element not found!'); // Debugging log
        return; // Exit if audio element is not found
    }

    // Function to play the current track
    function playTrack() {
        audio.src = tracks[currentTrackIndex];
        document.querySelector('.cmp_cover').style.background = `url(${coverImages[currentTrackIndex]}) round`; // Set background image from coverImages
        infoDisplay.textContent = `${tracks[currentTrackIndex]}`; // Update track info
        progressControl.style.display = 'block'; // Ensure progress bar is visible
    }

    // Play/Pause functionality
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play(); // Just play if the same track
        } else {
            audio.pause(); // Pause the audio
        }
    });

    // Next track functionality
    nextButton.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Loop back to the first track
        playTrack();
    });

    // Previous track functionality
    rewindButton.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Loop back to the last track
        playTrack();
    });

    // Mute functionality
    muteButton.addEventListener('click', function() {
        audio.muted = !audio.muted; // Toggle mute state
        muteButton.textContent = audio.muted ? 'm' : 'M'; // Update button text
    });

    // Update progress bar and thumb position
    audio.addEventListener('timeupdate', function() {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100; // Calculate progress percentage
            progressControl.style.width = progress + '%'; // Update progress bar width
            
            // Update thumb position
            const thumbPosition = (audio.currentTime / audio.duration) * 100; // Calculate thumb position percentage
            thumb.style.left = thumbPosition + '%'; // Update thumb position
        }
    });

    // Dragging functionality for the thumb
    thumb.addEventListener('mousedown', function() {
        isDragging = true; // Set dragging flag
    });

    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            const rect = progressControl.parentElement.getBoundingClientRect(); // Get the bounding rect of the progress bar
            const offsetX = event.clientX - rect.left; // Calculate the offset from the left
            const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1); // Calculate percentage
            audio.currentTime = percentage * audio.duration; // Update audio current time
            progressControl.style.width = percentage * 100 + '%'; // Update progress bar width
            thumb.style.left = percentage * 100 + '%'; // Update thumb position
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false; // Reset dragging flag
    });

    // Volume dragging functionality for the volume thumb
    thumbVolume.addEventListener('mousedown', function() {
        isVolumeDragging = true; // Set volume dragging flag
    });

    document.addEventListener('mousemove', function(event) {
        if (isVolumeDragging) {
            const rect = thumbVolume.parentElement.getBoundingClientRect(); // Get the bounding rect of the volume control
            const offsetY = rect.bottom - event.clientY; // Calculate the offset from the bottom
            const percentage = Math.min(Math.max(offsetY / rect.height, 0), 1); // Calculate percentage
            audio.volume = percentage; // Update audio volume
            thumbVolume.style.bottom = (percentage * 90) + 'px'; // Update volume thumb position to 90px for 100%
        }
    });

    document.addEventListener('mouseup', function() {
        isVolumeDragging = false; // Reset volume dragging flag
    });
});
