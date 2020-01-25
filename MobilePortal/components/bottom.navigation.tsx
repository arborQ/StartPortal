import React from 'react';
import {
    BottomNavigation,
    BottomNavigationTab,
} from '@ui-kitten/components';

export interface IBottomNavBarProps {
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    options: string[];
}

export function BottomNavBar({ selectedIndex, setSelectedIndex, options }: IBottomNavBarProps) {
    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}>
                {
                    options.map((o) => <BottomNavigationTab key={o} title={o} />)
                }
        </BottomNavigation>
    );
}