import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/user/authSlice";
// import { jwtDecode } from "jwt-decode";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const localAuth = localStorage?.getItem("auth");
       
        if (localAuth) {
            const auth = JSON.parse(localAuth);
            // if(auth.accessToken){
                // const decoded=jwtDecode(auth.accessToken)
                // if(decoded.exp*1000>Date.now()){
                if (auth?.accessToken && auth?.user) {
                    dispatch(
                        userLoggedIn({
                            accessToken: auth.accessToken,
                            user: auth.user,
                        })
                    );
                // }
            // }

        }
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}
