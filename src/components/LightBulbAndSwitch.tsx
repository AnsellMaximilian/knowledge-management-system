import { makeStyles } from '@material-ui/core';
import React, {useState} from 'react'

const useStyles = makeStyles(theme => ({
    
    lightOn: {
        fill: "#FFFDE7",
    },
    lightOff: {

    },

    switchButton: {
        cursor: 'pointer'
    },

    switchButtonOn: {
        
    },
    switchButtonOff: {
        transform: 'rotate(180deg)',
        transformOrigin: '56.46945px 306.142px'
    },
    shine: {
        transition: 'all 1s'
    },

    shineOn:{
        opacity: "0.487864",
        transition: 'all 1s'
    },

    shineOff: {
        opacity: 0
    }
}))

export default function LightBulbAndSwitch() {

    const [isOn, setIsOn] = useState(false);
    const classes = useStyles();

    const switchLightState = () => setIsOn(!isOn);

    return (
        <svg width="432" height="367" viewBox="0 0 432 367" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="container">
                <g id="lightbulb">
                    <path id="shine3" className={`${isOn ? classes.shineOn : classes.shineOff}`} d="M272.095 311.564C360.408 311.564 432 241.818 432 155.782C432 69.7459 360.408 0 272.095 0C183.782 0 112.19 69.7459 112.19 155.782C112.19 241.818 183.782 311.564 272.095 311.564Z" fill="#FFFFA8"/>
                    <path id="shine2" className={`${isOn ? classes.shineOn : classes.shineOff}`} d="M272.095 289.127C347.688 289.127 408.969 229.426 408.969 155.782C408.969 82.1374 347.688 22.4369 272.095 22.4369C196.501 22.4369 135.22 82.1374 135.22 155.782C135.22 229.426 196.501 289.127 272.095 289.127Z" fill="#FFFFDC"/>
                    <path id="shine1" className={`${isOn ? classes.shineOn : classes.shineOff}`} d="M272.095 264.881C333.943 264.881 384.082 216.036 384.082 155.782C384.082 95.528 333.943 46.6827 272.095 46.6827C210.246 46.6827 160.108 95.528 160.108 155.782C160.108 216.036 210.246 264.881 272.095 264.881Z" fill="white"/>
                    <path 
                        id="bulb"
                        className={isOn ? classes.lightOn : classes.lightOff}
                        d="M272.072 67.3763C221.558 67.389 180.615 108.342 180.615 158.855C180.615 170.255 182.746 181.555 186.898 192.172L230.518 308.556H313.671L357.294 192.172H357.291C361.443 181.555 363.574 170.255 363.575 158.855C363.574 108.333 322.618 67.3769 272.096 67.3763H272.072Z" stroke="black" strokeWidth="0.2794"
                    />
                    <path id="rect888" d="M230.519 308.556H313.671V352.619C313.671 353.868 313.175 355.067 312.291 355.95C311.408 356.834 310.209 357.33 308.96 357.33H235.23C234.611 357.33 233.998 357.208 233.427 356.972C232.855 356.735 232.336 356.388 231.898 355.95C231.461 355.513 231.114 354.993 230.877 354.422C230.64 353.85 230.519 353.238 230.519 352.619V308.556Z" fill="#999999" stroke="black" strokeWidth="0.2794"/>
                    <path id="rect890" d="M300.155 357.33H244.034V366H300.155V357.33Z" fill="#999999" stroke="black" strokeWidth="0.2794"/>
                    <g id="g920">
                        <path id="path892" d="M256.61 187.352C260.886 187.352 264.352 178.718 264.352 168.068C264.352 157.418 260.886 148.784 256.61 148.784C252.334 148.784 248.868 157.418 248.868 168.068C248.868 178.718 252.334 187.352 256.61 187.352Z" stroke="black" strokeWidth="0.529167"/>
                        <path id="ellipse894" d="M272.095 187.352C276.371 187.352 279.837 178.718 279.837 168.068C279.837 157.418 276.371 148.784 272.095 148.784C267.819 148.784 264.352 157.418 264.352 168.068C264.352 178.718 267.819 187.352 272.095 187.352Z" stroke="black" strokeWidth="0.529167"/>
                        <path id="ellipse896" d="M287.58 187.352C291.856 187.352 295.322 178.718 295.322 168.068C295.322 157.418 291.856 148.784 287.58 148.784C283.304 148.784 279.837 157.418 279.837 168.068C279.837 178.718 283.304 187.352 287.58 187.352Z" stroke="black" strokeWidth="0.529167"/>
                        <path id="path907" d="M256.61 187.352L272.095 308.556L287.579 187.352" stroke="black" strokeWidth="0.529167"/>
                    </g>
                    <path id="path925" opacity="0.56068" d="M298.269 102.076C313.028 113.468 330.536 120.86 337.375 118.586C344.213 116.312 337.792 105.234 323.032 93.8426C308.273 82.451 290.765 75.0595 283.927 77.3332C277.089 79.6069 283.51 90.6848 298.269 102.076Z" fill="white"/>
                    <path id="rect927" opacity="0.371359" d="M300.155 357.33H244.034V360.712H300.155V357.33Z" fill="black"/>
                    <path id="path929" d="M226.779 316.758H317.411" stroke="black" strokeWidth="0.276226"/>
                    <path id="path931" d="M226.779 349.79H317.411" stroke="black" strokeWidth="0.276226"/>
                    <path id="path933" d="M226.779 325.016H317.411" stroke="black" strokeWidth="0.276226"/>
                    <path id="path935" d="M226.779 341.532H317.411" stroke="black" strokeWidth="0.276226"/>
                    <path id="path937" d="M226.779 333.274H317.411" stroke="black" strokeWidth="0.276226"/>
                </g>
                <g id="switch">
                    <path id="rect833" d="M111.939 250.246H1V362.038H111.939V250.246Z" fill="#F9F9F9" stroke="black" strokeWidth="0.529167"/>
                    <path id="rect839" d="M38.2528 278.694C38.2528 297.16 38.2528 315.626 38.2528 334.091C50.3975 334.091 62.5421 334.091 74.6867 334.091C74.6867 315.459 74.6867 296.827 74.6867 278.194C62.5421 278.194 50.3975 278.194 38.2528 278.194C38.2528 278.361 38.2528 278.527 38.2528 278.694V278.694Z" fill="black"/>
                    <g 
                        className={`${classes.switchButton} ${isOn ? classes.switchButtonOn : classes.switchButtonOff}`}
                        id="switchButton" 
                        onClick={switchLightState}
                        // transform={isOn ? '' : `rotate(180 56.46945 306.142)`}
                    >
                        <path id="rect835" d="M73.1884 289.683H39.7505V332.593H73.1884V289.683Z" fill="white" stroke="#999999" strokeWidth="0.529167"/>
                        <path id="rect847" d="M41.2945 279.691L39.7505 289.683H73.1884L71.6445 279.691H41.2945Z" fill="white" stroke="#808080" strokeWidth="0.529167"/>
                        <path id="rect844" opacity="0.32767" d="M73.1884 314.981H39.7505V332.593H73.1884V314.981Z" fill="url(#paint0_linear)"/>
                        <path id="path870" d="M41.2945 279.691L39.7505 289.683H73.1884L71.6445 279.691H41.2945Z" fill="url(#paint1_linear)"/>
                    </g>
                </g>
            </g>
            <defs>
                <linearGradient id="paint0_linear" x1="58.4467" y1="332.527" x2="58.2933" y2="314.891" gradientUnits="userSpaceOnUse">
                    <stop stopOpacity="0.398058"/>
                    <stop offset="1" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="56.4695" y1="279.691" x2="56.4695" y2="284.922" gradientUnits="userSpaceOnUse">
                    <stop stopOpacity="0.526699"/>
                    <stop offset="1" stopOpacity="0"/>
                </linearGradient>
            </defs>
        </svg>


    )
}
