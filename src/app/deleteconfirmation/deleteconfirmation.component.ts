import { Component, OnInit ,Input, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-deleteconfirmation',
  templateUrl: './deleteconfirmation.component.html',
  styleUrls: ['./deleteconfirmation.component.css']
})
export class DeleteconfirmationComponent implements OnInit {

@Input() item:string|symbol;
@Output() onDelete = new EventEmitter();
@Output() onCancel = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
delete()
{
  this.onDelete.emit(this.item);
  alert("Deleteing....");
}
cancel()
{
   this.onCancel.emit();
  alert("Canceling....");
}

}
