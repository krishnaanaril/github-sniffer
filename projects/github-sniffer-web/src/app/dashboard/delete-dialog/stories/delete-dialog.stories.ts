import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { DeleteDialogComponent } from '../delete-dialog.component';
import { MaterialModule } from '../../../material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { button, text, withKnobs } from '@storybook/addon-knobs';

import { Button } from '@storybook/angular/demo';

export default {
  title: 'Components/Delete Dialog',
  component: DeleteDialogComponent,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        MaterialModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: { full_name: 'test' } }
      ]
    }), 
    withKnobs
  ],
} as Meta;

const Template: Story<DeleteDialogComponent> = (args: DeleteDialogComponent) => ({
  props: args,
    
});

export const Primary = Template.bind({});
Primary.args = {
  button: button('test button', ()=>{ alert('Hi'); return false})
}

export const withKnobsEx = () => ({
  component: DeleteDialogComponent,
  props: {
    button: button('test button', ()=>{ alert('Hi'); return false}), // The first param of the knob function has to be exactly the same as the component input.
  },
});