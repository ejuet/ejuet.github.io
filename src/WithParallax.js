import React from 'react';
import { Parallax, Background } from 'react-parallax';

//TODO parallax macht table of contents zu headings springen pautt
//TODO parallax macht toc sticky kaputt

export function WithParallax({ children }) {
    /*
    return <Parallax strength={1000} bgImage='img/sterne.png' style={{backgroundColor:"black"}}>
        {children}
    </Parallax>
    */
    return <>
        <Parallax strength={1700} style={{ backgroundColor: "#19132A" }}>
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
            <Parallax strength={700}>
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
                <div style={{ minHeight: "100vh" }}> {/* Page should always take up the full screen */}
                    {children}
                </div>
            </Parallax>
        </Parallax>
    </>;
}
