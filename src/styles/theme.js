const size = {
    mobile: '767px',
    tablet: '1023px',
};

export default {
    color: {
        backgroundGray: '#f1f3f4',
        hoverGray: '#f9fafa',
        activeGray: '#E9EAEC',
        lineGray: '#dbdde1',
        black: '#333',
        white: '#FFF',
        red: 'rgb(220, 38, 38)',
        yellow: 'rgb(252, 211, 77)',
        green: 'rgb(52, 211, 153)',
        blue: 'rgb(37, 99, 235)',
        purple: 'rgb(124, 58, 237)',
    },
    fontSize: {},

    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width: ${size.tablet})`,
};
