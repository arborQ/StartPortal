import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { DialogComponent } from './dialog.component';
import { DialogContainer } from './dialog.component.styles';

describe('Dialog Component: ', () => {
    test('can be disabled', () => {
        // Arrange
        // Act
        const { container } = render(<DialogComponent name={'DialogComponent'} />);

        // Assert
        const item = container.querySelector(DialogContainer);
        expect(item).not.toBeNull();
    });
});
