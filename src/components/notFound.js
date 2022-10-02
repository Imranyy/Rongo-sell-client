import { Link } from "react-router-dom";
const notFound=()=>{
    return(
        <div>
            <div style={{display:'flex',alignItem:'center',justifyContent:'center',margin:'12% auto'}}>
            <h2 style={{fontFamily:'monospace',}}>Oops!...Page Not Found</h2>
            <h2>🎃</h2>
            </div>
            <div style={{display:'flex',alignItem:'center',justifyContent:'center'}}>
                <Link to='/'><button type='button' className="btn btn-outline-dark">Back</button></Link>
            </div>
        </div>
    )
}
export default notFound;