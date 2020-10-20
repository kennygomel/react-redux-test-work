import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
    createStyles({
        buttonLink: {
            textDecoration: 'none !important',
        },
        form: {
            maxWidth: '480px',
            margin: '0 auto',
        },
        fullWidth: {
            width: '100%',
        },
    });

export const useStyles = makeStyles(styles, { name: 'BaseForm' });
export default styles;
