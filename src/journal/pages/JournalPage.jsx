import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../view"




export const JournalPage = () => {

    const { isSaving, active }= useSelector( state => state.journal )
    const dispatch = useDispatch()

    const onClickNewNote = ()=> {
        dispatch( startNewNote() )
    }

    return (
        <JournalLayout>
            {
                ( active === null )
                ?<NothingSelectedView /> 
                : <NoteView />
            }
    
            

            {/* <NoteView /> */}

            <IconButton
                onClick={onClickNewNote}
                disabled={ isSaving }
                size="large"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                    fontSize: 20
                }}
            >
                <i className="bi bi-plus-lg"></i>
            </IconButton>


        </JournalLayout>
    )
}
