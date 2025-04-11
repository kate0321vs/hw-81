import {Button, CircularProgress, Link, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {LinkWithoutShortLink} from "../../types";
import {useState} from "react";
import {createLink, fetchOneLink} from "./LinksThunk.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCreateLoading, selectFetchOneLoading, selectLink} from "./LinksSlice.ts";
import {apiUrl} from "../../constants.ts";

const FormLink= () => {
    const dispatch = useAppDispatch();
    const createLoading = useAppSelector(selectCreateLoading);
    const link = useAppSelector(selectLink);
    const fetchLinkLoading  = useAppSelector(selectFetchOneLoading);
    const [state, setState] = useState<LinkWithoutShortLink>({
        originalLink: '',
    });


    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createLink(state));
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const onClick = () => {
        if (link) {
            dispatch(fetchOneLink(link.shortLink))
        }
    };

    return (
        <>
            <Typography marginY={3} textAlign='center' component='div' variant='h4'>Shorten your link!</Typography>
            <form
                autoComplete="off"
                onSubmit={submitFormHandler}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid>
                        <TextField
                            fullWidth
                            id="originalLink" label="Link"
                            value={state.originalLink}
                            onChange={inputChangeHandler}
                            name="originalLink"
                        />
                    </Grid>
                    <Grid sx={{textAlign: "center", my: 3}}>
                        <Button
                            endIcon={createLoading && <CircularProgress size={24}/>}
                            size="small"
                            disabled={createLoading}
                            variant="contained"
                            type="submit"
                        >
                            Shorten
                        </Button>
                    </Grid>
                    {fetchLinkLoading ? <CircularProgress size={24}/> :
                        link ?
                            <>
                                <Typography marginY={2} textAlign='center' component='div' variant='h6'>Your link now looks like this:</Typography>
                                <Link
                                    textAlign="center"
                                    href={apiUrl + '/links/' + link.shortLink}
                                    target='_blank'
                                    onClick={onClick}
                                >{`http://localhost:8000/${link.shortLink}`}</Link>
                            </>
                            : null
                    }

                </Grid>
            </form>

        </>

    );
};

export default FormLink;