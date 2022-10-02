import React from 'react';
function Footer() {
    return (
        <div style={{display:'flex',alignItem:'center',justifyContent:'center'}}>
            <button className="btn btn-outline-info" style={{margin:'10% auto'}} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">🕵️‍♀️More Info</button>
                <div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel" style={{height:'40%'}}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel" style={{color:'GrayText'}}>About Us</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body small" style={{fontFamily:'monospace'}}>
                    We create easiers way to sell and buy goods and services online for students around Rongo university. Once you add an item for sell on this platform, an affiliate link with be sent to you to market your good or service,
                    then copy the link or share the link to friends who might be your potential buyers.
                    <br/><br/>
                       <div>
                            <div style={{color:'GrayText'}}>Our Social Media Links<br/>
                            <a href='https://wa.me/+254754423664' rel="noreferrer" target='_blank'>whatsapp</a><br/>
                            <a href='https://mailto:imranmat254@gmail.com' rel="noreferrer" target='_blank'>Email</a><br/>
                            <a href='https://instagram.com/imrany00' rel="noreferrer" target='_blank'>Instagram</a><br/>
                            <a href='https://twitter.com/imran_matano' rel="noreferrer" target='_blank'>Twitter</a><br/>
                        </div>
                      </div>
                     
                </div>
                </div>
        </div>
    );
}

export default Footer;