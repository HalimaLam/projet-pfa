import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-change-date-dialog',
  templateUrl: './change-date-dialog.component.html',
  styleUrls: ['./change-date-dialog.component.scss']
})
export class ChangeDateDialogComponent {
  selectedDate: Date;

  constructor(
    public dialogRef: MatDialogRef<ChangeDateDialogComponent>,private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedDate = new Date(data.releaseDate);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.selectedDate);
  }
  openDialog(): void {
    this.dialog.open( ChangeDateDialogComponent, {
      width: '1000px',  // Définissez la largeur souhaitée
      height: '400px'  // Définissez la hauteur souhaitée (optionnel)
    });
  }
}
