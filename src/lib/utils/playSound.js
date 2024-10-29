export function playSound(soundName) {
    const audio = new Audio("/sounds/" + soundName + ".ogg");
    audio.play().catch(error => {
        console.error('Error playing sound:', error);
    });
}