import React from 'react';
import {
    Container,
    Icon,
    makeStyles,
    Paper,
    Typography,
    Button,
} from '@material-ui/core';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        // transition: 'ease all 1s',
        display: 'flex',
        height: '100%',
        alignItems: 'start',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'center',
        },
    },
    container: {
        // background: lighten(theme.palette.background, .3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2rem auto 0',
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 500,
            margin: '0 auto',
        },
    },
    heading: {
        margin: '2rem auto',
    },
    title: {
        marginBottom: '1rem',
    },
    icon: {
        height: '6em',
        width: '6em',
        // fontSize: '3em',
    },
    content: {
        textAlign: 'center',
        '& p, & h6': {
            color: theme.palette.getContrastText(theme.palette.background.paper),
        },
        padding: '0 1.5rem',
        margin: '0 auto 2rem',
    },
    btn: {
        marginTop: '2rem',
    },
}));

export default function UnauthorizedPage() {
    const classes = useStyles();
    const { t } = useTranslation('pages');

    return (
        <Container className={classes.root}>
            <Paper elevation={3} className={classes.container}>
                <div className={classes.heading}>
                    <Icon>
                        <MoodBadIcon className={classes.icon} />
                    </Icon>
                </div>
                <div className={classes.content}>
                    <Typography className={classes.title} variant={'h3'}>
                        {t('unauthorized.title', { ns: 'pages' })}
                    </Typography>
                    <Typography variant={'body1'}>
                        {t('unauthorized.description', { ns: 'pages' })}
                    </Typography>

                    <Button
                        href={t('urls.oauth', { ns: 'translation' })}
                        variant={'contained'}
                        className={classes.btn}
                        color={'primary'}
                    >
                        {t('unauthorized.button', { ns: 'pages' })}
                    </Button>
                </div>
            </Paper>
        </Container>
    );
}
