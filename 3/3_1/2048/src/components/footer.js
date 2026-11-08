import React from "react";

function Footer() {
    return (
        <div style={{ display: 'flex', justifyContent: "space-between"}}>
            <h2>Made By Mohit Murotiya</h2>
            <a style={{
                alignSelf: 'center', 
                justifyContent: 'center',
                color: '#776e65',
                fontWeight: 'bold'
            }} href="https://github.com/MohitMurotiya/2048">GitHub</a>
        </div>
    );
}

export default Footer;
