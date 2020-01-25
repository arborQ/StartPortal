import React, { useRef, useEffect } from 'react';
import { Text, Input } from '@ui-kitten/components';
import { Page } from '../../components/page';

export function SearchCarPage() {
    // const inputRef = useRef();
    // useEffect(() => {
    //     if (inputRef && inputRef?.current) {
    //         inputRef?.current?.blur();
    //     }
    // }, []);
    return (
        <Page >
            <Input size='large' />
        </Page>
    );
}
