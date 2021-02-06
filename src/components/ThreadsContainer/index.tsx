import React, { ComponentType, RefObject, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Thread } from 'modmail-types';
import Alert from '../Alert';
import { MemberState, Nullable, RequiredArgs } from '../../types';

type Child = ComponentType<RequiredArgs<{ thread: Thread }>>;
type Props = {
    threads?: Thread[];
    fetchMember: (id: string) => Promise<Nullable<MemberState>>;
    itemProps?: any;
    empty?: {
        title?: React.ReactNode;
        description?: React.ReactNode;
    };
    children: Child;
    // children: (props: any) => React.Component;
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '.5rem',
        width: '100%',
        height: 400,
        [theme.breakpoints.up('md')]: {
            height: 600,
        },
    },
    alert: {
        marginTop: '.5rem',
    },
}));
type FetchMember = (id: string) => Promise<Nullable<MemberState>>;

function itemRenderer(Component: Child, fetchMember: FetchMember, itemProps: any) {
    return function Item(props: ListChildComponentProps) {
        const threads: Thread[] = props.data;
        const currentThread = threads[props.index];

        return (
            <div style={props.style}>
                <Component
                    {...itemProps}
                    fetchMember={fetchMember}
                    thread={currentThread}
                />
            </div>
        );
    };
}

function ThreadsContainer(props: Props): JSX.Element {
    const { threads, children, empty, fetchMember, itemProps } = props;
    const classes = useStyles();

    if (typeof threads === 'undefined' || threads.length === 0)
        return (
            <Alert
                className={classes.alert}
                color={'error'}
                alertTitle={empty?.title}
                alertDesc={empty?.description}
            />
        );

    const renderer = itemRenderer(children, fetchMember, itemProps);
    return (
        <Paper className={classes.root} elevation={1}>
            <AutoSizer>
                {({ height, width }) => (
                    <FixedSizeList
                        itemCount={threads.length}
                        itemData={threads}
                        itemSize={150}
                        height={height}
                        width={width}
                    >
                        {renderer}
                    </FixedSizeList>
                )}
            </AutoSizer>
        </Paper>
    );
}

export type ThreadsContainerProps = Props;
export default ThreadsContainer;
