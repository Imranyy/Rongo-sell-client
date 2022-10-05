import { createContext } from "react";

export const AuthContext=createContext();

const AuthContextProvider=()=>{
    state={
        isLoggedIn:true
    }
    toggleLoggedIn=()=>{
        this.setState({isLoggedIn:!this.state.isLoggedIn})
    }
    return(
        <AuthContext.Provider value={{...this.state,toggleLoggedIn:this.toggleLoggedIn}}>
            {this.props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;