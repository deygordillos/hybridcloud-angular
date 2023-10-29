import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    TagModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    MessagesModule,
    SkeletonModule,
  ],
})
export class PrimeNgModule {}
