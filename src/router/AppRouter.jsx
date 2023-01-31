import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth"
import { JournalPage } from "../journal"
import { CheckingAuth } from "../ui"
import { useCheckAuth } from "../hooks"


export const AppRouter = () => {

    const { status } = useCheckAuth()

    if( status === 'checking' ){
        return <CheckingAuth />
    }


    return (
        <Routes>

            {
                (status === 'authenticated')
                ?<Route path='/*' element={ <JournalPage /> } />
                :<Route path='/auth/*' element={ <AuthRoutes /> } />
            }

            <Route path='/*' element={ <Navigate to='/auth/login' /> } />

            {/* Login y Registro */}
            {/* <Route path='/auth/*' element={ <AuthRoutes /> } /> */}

            {/* JournalApp */}
            {/* <Route path='/*' element={ <JournalPage /> } /> */}
        

        </Routes>
    )
}
