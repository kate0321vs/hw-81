import {Button, CircularProgress, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {LinkWithoutShortLink} from "../../../types";
import {useState} from "react";
import {createLink} from "../../Links/LinksThunk.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCreateLoading} from "../../Links/LinksSlice.ts";

const FormLink = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreateLoading);
    const [state, setState] = useState<LinkWithoutShortLink>({
        originalLink: '',
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createLink(state));
        setState({originalLink: ''});
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    return (
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
                        endIcon={loading && <CircularProgress size={24} />}
                        size="small"
                        disabled={loading}
                        variant="contained"
                        type="submit"
                    >
                        Shorten
                    </Button>
                </Grid>
                </Grid>
        </form>
    );
};

export default FormLink;