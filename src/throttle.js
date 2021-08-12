export default cb => {
    let animationFrame = null;

    return () => {
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
