/**
 * @author - Ronak Patel.
 * @description - create class for crad component.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card.model';

@Component({
  selector: 'ims-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public card: Card;
  constructor() { }

  ngOnInit() {
  }

}
