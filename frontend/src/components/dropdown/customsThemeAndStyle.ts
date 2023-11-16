import {CSSObjectWithLabel, StylesConfig, Theme} from "react-select";

export const customTheme = (theme: Theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        neutral0: '#F5F5F5',
        neutral5: '#E0E0E0',
        neutral10: '#D2D2D2',
        neutral20: '#C3C3C3',
        neutral30: '#B4B4B4',
        neutral40: '#A6A6A6',
        neutral50: '#979797',
        neutral60: '#888888',
        neutral70: '#7A7A7A',
        neutral80: '#6B6B6B',
        neutral90: '#5C5C5C',
        neutral100: '#4E4E4E',
        primary: '#000000',
    },
});

export const customStyles : StylesConfig= {
    container: (provided: CSSObjectWithLabel, state:any) => ({
       ...provided,
        width: '100%',
        margin: '10px',
        borderRadius: '10px',
    }),
    option: (provided: CSSObjectWithLabel, state: any) => ({
        ...provided,
        color: 'black',
        width: 225,
        borderRadius: '10px',
        backgroundColor: state.isFocused ? '#D2D2D2' : 'transparent',
        ':active': {
            backgroundColor: '#C3C3C3',
        },
    }),
    control: (provided: CSSObjectWithLabel) => ({
        ...provided,
        width: 225,
        borderRadius: '10px',

    }),
    menu: (provided: CSSObjectWithLabel) => ({
        ...provided,
        width: 225,
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',

    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
        ...provided,
        color: '#6B6B6B',
    }),
    clearIndicator: (provided: CSSObjectWithLabel, state: any) => ({
        ...provided,
        color: '#4E4E4E',
        ':hover': {
            color: '#000000',
        },
    })

};
