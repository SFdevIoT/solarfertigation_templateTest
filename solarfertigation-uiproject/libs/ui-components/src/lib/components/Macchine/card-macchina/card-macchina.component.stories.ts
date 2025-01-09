import { Meta, StoryObj } from '@storybook/angular';
import { CardMacchinaComponent } from './card-macchina.component';

const meta: Meta<CardMacchinaComponent> = {
  title: 'Components/Macchine/CardMacchina',
  component: CardMacchinaComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CardMacchinaComponent>;

export const Active: Story = {
  args: {
    machine: {
      id: '1',
      name: 'Macchina 1',
      isActive: true,
      statusText: 'In funzione',
      fertilizers: [
        {
          label: 'Azoto',
          percentage: 75,
          capacity: 100,
          color: '#4CAF50'
        },
        {
          label: 'Fosforo',
          percentage: 45,
          capacity: 80,
          color: '#2196F3'
        }
      ]
    }
  }
};

export const Inactive: Story = {
  args: {
    machine: {
      id: '2',
      name: 'Macchina 2',
      isActive: false,
      statusText: 'Inattiva',
      fertilizers: [
        {
          label: 'Azoto',
          percentage: 30,
          capacity: 100,
          color: '#4CAF50'
        },
        {
          label: 'Fosforo',
          percentage: 60,
          capacity: 80,
          color: '#2196F3'
        }
      ]
    }
  }
};
