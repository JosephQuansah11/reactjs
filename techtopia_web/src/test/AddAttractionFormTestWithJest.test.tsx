import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddAttractionDialog } from '../components/parks/AddAttractionForm';
import test, { describe } from 'node:test';
import jest from 'jest-mock';
import { expect } from '@jest/globals';

describe('AddAttractionDialog', () => {
  test('renders the form with default values', () => {
    render(<AddAttractionDialog isOpen={true} onSubmit={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByLabelText('Name')).toHaveProperty('my attraction');
    expect(screen.getByLabelText('Image')).toHaveProperty('https://neural.love/cdn/ai-photostock/1ed5ffb3-f65f-62be-a38a-7d9cad96c979/0.jpg?Expires=1704067199&Signature=w1aT~1gMecwHXyA0LuBWX45o5DHs8lOs03rw2usx2NaqHoE6hIjd4GzoVUL0DhevD6nnvVzkePJIso3FQEUH9LvXimi6OpXrCCFgIvc3jxvfTELQJZ-i9cHL2eaC5cPI-hOTfofUCK0ZtguUIYuGbPQ7XikP3MVIeqNab2Q6Tp~x-kjYmBy~NDDgft0-AQE7ihyFgtq7UkQ~mguu3KXUSXYvhtAAvXxkbYL~MC2swTVGkA5Axg5agOTr6IyhyH-CqY1z~HbJrQ4~2S-NSBTluuOt~dngPsqCbQUh~lR9Qu1kT0VEnC90TB49tiId5CcNp6vgOFztOuyeDH3VKON3kg__&Key-Pair-Id=K2RFTOXRBNSROX');
    expect(screen.getByLabelText('Position X')).toHaveProperty('367.25');
    expect(screen.getByLabelText('Position Y')).toHaveProperty('345.45');
  });

  test('submits the form with the correct values', () => {
    const onSubmit = jest.fn();
    render(<AddAttractionDialog isOpen={true} onSubmit={onSubmit} onClose={jest.fn()} />);
    userEvent.type(screen.getByLabelText('Name'), 'New Attraction');
    userEvent.type(screen.getByLabelText('Image'), 'https://example.com/image.jpg');
    userEvent.type(screen.getByLabelText('Position X'), '100');
    userEvent.type(screen.getByLabelText('Position Y'), '200');
    fireEvent.submit(screen.getByRole('form'));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'New Attraction',
      image: 'https://example.com/image.jpg',
      positionX: '100px',
      positionY: '200px',
      parkID: '',
    });
  });
});