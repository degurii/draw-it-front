export default cb => {
    let animationFrame = null;

    return e => {
        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = null;
            return;
        }
        animationFrame = window.requestAnimationFrame(() => {
            cb();
        });
    };
};