import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { SpeedDialComponent } from './speedDial.component';
import { SpeedDialContainer } from './speedDial.component.styles';

describe('SpeedDial Component: ', () => {
    test('can be disabled', () => {
        // Arrange
        // Act
        const { container } = render(<SpeedDialComponent name={'SpeedDialComponent'} />);

        // Assert
        const item = container.querySelector(SpeedDialContainer);
        expect(item).not.toBeNull();
    });
});
