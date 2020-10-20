import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        buttonLink: {
            textDecoration: 'none !important',
        },
        textCenter: {
            textAlign: 'center',
        },
        headline: {
            marginBottom: '32px',
            textAlign: 'center',
        },
        table: {
            margin: '32px 0',
        },
    });

export const useStyles = makeStyles(styles, { name: 'App' });
export default styles;
