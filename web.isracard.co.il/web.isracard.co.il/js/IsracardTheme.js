
var theme = {
    "direction": "rtl",

    "palette": {
        "primary": {
            "main": "#4338fc"
        },
        "secondary": {
            "main": "#ffffff",
            "dark": "#020d74"
        },
        "info": {
            "main": "#020d74",
            "light": "#eaf1ff",
            "dark": "#020338"
        },
        "text": {
            "primary": "#020d74",
            "secondary": "#020338"
        },
        "error": {
            "main": "#DE0000"
        },
        "grey": {
            "main": "#c8c9c7",
            "light": "#eaf1ff",
            "dark": "#ededed"
        },
        "success": {
            "main": "#23802f"
        },
        "tdback": {  // for V2TransactionDetails component
            "main": "#f8faff" 
        }    
    },


    "typography": {
        "fontFamily": "'Assistant', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        "fontWeight": "400",
        "htmlFontSize": 18,
        "h1": {
            "fontSize": "30px",
            "fontWeight": "600"
        },
        "h2": {
            "fontSize": "26px"
        },
        "h3": {
            "fontSize": "24px"
        },
        "h6": {
            "fontSize": "14px"
        },
        "subtitle1": {
            "fontSize": "1rem"
        },
        "body1": {
            "fontSize": "1rem"
        }
    },


    "components": {
        "MuiButton": {
            "styleOverrides": {
                "root": {
                    "borderRadius": "4px",
                    "height": "50px",
                    "fontSize": "18px"
                 
                },
                "text": {
                    "color": "#4338fc",
                    "fontWeight": "600",
                    "&:hover": {
                        "boxShadow": "none",
                        "backgroundColor": "transparent"
                    },
                     "&:disabled": {
                        "color": "#4A4453"
                    }
                },
                "contained": {
                    "color": "#fefefe",
                    "backgroundColor": "#4338fc",
                    "boxShadow": "none",
                    "&:hover": {
                        "boxShadow": "none",
                        "backgroundColor": "#0A00C3"
                    },
                     "&:disabled": {
                        "backgroundColor": "#EBE9E9",
                        "color": "#4A4453",
                         "border": "solid 1px #EBE9E9",
                         "fontWeight": "600"
                    }
                },
                "containedPrimary": {
                    "&:hover": {
                        "backgroundColor": "#0A00C3"
                    }
                },
                "outlined": {
                    "color": "#352aff",
                    "backgroundColor": "#ffffff",
                    "border": "solid 2px #352aff",
                    "&:hover": {
                        "backgroundColor": "#D9E0FD",
                        "border": "solid 2px #0A00C3",
                        "color": "#0A00C3"
                    },
                     "&:disabled": {
                        "backgroundColor": "#EBE9E9",
                        "color": "#4A4453",
                        "border": "solid 1px #EBE9E9"
                    }
                }

            }
        },

        "MuiChip": {
            "styleOverrides": {
                "root": {
                    "borderRadius": "15px",
                    "backgroundColor": "#eaf1ff",
                    "color": "#020338"
                }
            }

        },

        "MuiFormControlLabel": {
            "styleOverrides": {
                "root": {
                 
                },
                "label": {
                    "fontSize": "18px"
                }
            }

        },

        "MuiLink": {
            "styleOverrides": {
                "root": {
                    "textDecoration": "none",
                    "cursor": "pointer"
                },            
            }
        },

        "MuiInputLabel": {
            "styleOverrides": {
                "root": {

                },
                "outlined": {
                    "&$shrink": {
                        "fontSize": "16px",
                        "transform": "translate(14px, -6px) scale(1)",
                    },
                },
            },

        },


    },
}