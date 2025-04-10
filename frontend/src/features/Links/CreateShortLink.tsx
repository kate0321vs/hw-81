import FormLink from "../components/FormLink/FormLink.tsx";
import {Container, Typography} from "@mui/material";


const CreateShortLink = () => {
    return (
        <Container>
            <Typography marginY={3} textAlign='center' component='div' variant='h4'>Shorten your link!</Typography>
            <FormLink/>
        </Container>
    );
};

export default CreateShortLink;