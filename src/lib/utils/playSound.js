export function playSound(soundName) {
    const audio = new Audio("/src/lib/sounds/" + soundName + ".ogg");
    audio.play().catch(error => {
        console.error('Error playing sound:', error);
    });
}