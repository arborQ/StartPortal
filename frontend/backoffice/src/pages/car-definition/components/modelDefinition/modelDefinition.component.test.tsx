import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { ModelDefinitionComponent } from './modelDefinition.component';
import { ModelDefinitionContainer } from './modelDefinition.component.styles';

describe('ModelDefinition Component: ', () => {
    test('can be disabled', () => {
        // Arrange
        // Act
        const { container } = render(<ModelDefinitionComponent name={'ModelDefinitionComponent'} />);

        // Assert
        const item = container.querySelector(ModelDefinitionContainer);
        expect(item).not.toBeNull();
    });
});
