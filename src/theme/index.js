import { extendTheme } from "@chakra-ui/react";


export const theme = extendTheme({
    colors: {
        primary: {
            100 :'#8EC3B0',
            200 :'#BCEAD5',
            300 :'#9ED5C5',
        },
        secondery: {
            100 :'#EAEAEA',
            200 :'#3C4048',
            300 :'#B2B2B2',
        },
        warning : {
            100 :'#CF0A0A',
            200 :'#DC5F00',
        }
    },
  textStyle : {
        h1 : {
            fontSize : ['48px', '72px'],
            fontWeight : 'bold',
            letterSpacing: '10px'
        }
    }
});