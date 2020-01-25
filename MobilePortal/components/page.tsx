import React from 'react';
import { Text, Layout } from '@ui-kitten/components';

interface IPageProps {
    children: React.ReactFragment;
}

export function Page({ children }: IPageProps) {
    return (
        <Layout style={{ flex: 1, padding: 20 }}>
            {children}
        </Layout>
    );
}
