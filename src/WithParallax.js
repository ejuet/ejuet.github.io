import React from 'react';
import { Background, Parallax } from 'react-parallax';

//TODO parallax macht table of contents zu headings springen pautt
//TODO parallax macht toc sticky kaputt

export function WithParallax({ children }) {
    /*
    return <Parallax strength={1000} bgImage='img/sterne.png' style={{backgroundColor:"black"}}>
        {children}
    </Parallax>
    */
    /*
    return <>
        <Parallax pages={1} style={{ top: '0', left: '0', overflow:"auto" }}>
            <ParallaxLayer offset={0} speed={2.5}>
            <div style={{
                    width: "100vw",
                    height: "2000vh",
                    backgroundImage: 'url(' + require('./sterne.png') + ')',
                    backgroundSize: "50%",
                    filter: "brightness(80%)"
                }}>

                </div>
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={2.5} style={{overflow: "auto"}} id="parallaxcontent">
                {children}
            </ParallaxLayer>
        </Parallax>

    </>
     */
    /*
    return <ParallaxProvider>
        <div>
            <ParallaxBanner style={{overflow:"auto !important"}}>
                
            <ParallaxBannerLayer speed={-50}>
                    <div style={{
                        width: "100%",
                        height: "1000vh",
                        backgroundImage: 'url(' + require('./sterne.png') + ')',
                        backgroundSize: "50%",
                        filter: "brightness(80%)",
                    }} />
                </ParallaxBannerLayer>

                {
                    
                    

<ParallaxBannerLayer speed={-20}>
                    <div style={{
                        width: "90vw",
                        height: "2000vh",
                        backgroundImage: 'url(' + require('./sterne.png') + ')',
                        backgroundSize: "90%",
                        filter: "brightness(80%)",
                        overflow:"hidden"
                    }} />
                </ParallaxBannerLayer>
                    
                }
                
                <ParallaxBanner style={{
                        overflow:"visible"
                    }} id="parallaxcontent">
                    {children}
                </ParallaxBanner>
            </ParallaxBanner>
        </div>

    </ParallaxProvider>
    */
    
    return <>
        <Parallax strength={1700} style={{ backgroundColor: "#19132A", overflow:"visible !important" }}>
            <Background>
                <div style={{
                    width: "100vw",
                    height: "2000vh",
                    backgroundImage: 'url(' + require('./sterne.png') + ')',
                    backgroundSize: "50%",
                    filter: "brightness(80%)"
                }}>

                </div>
            </Background>
            <Parallax strength={700} style={{overflow:"visible !important"}}>
                <Background>
                    <div style={{
                        width: "100vw",
                        height: "2000vh",
                        backgroundImage: 'url(' + require('./sterne.png') + ')',
                        backgroundSize: "100%",
                        filter: "brightness(80%)"
                    }}>

                    </div>
                </Background>
                <div style={{ minHeight: "100vh" }} id="parallaxcontent"> {
                    // Page should always take up the full screen
                }
                    {children}
                </div>
            </Parallax>
        </Parallax>
    </>;
    
}
