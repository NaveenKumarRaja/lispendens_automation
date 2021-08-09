import { LightningElement, track } from 'lwc';

export default class ConditionalRenderingExample extends LightningElement {
    @track displayDiv = false;

    @track cityList = ['Tirupur', 'Erode', 'CBE', 'Salem']

    ShowDivHandler(event){
        this.displayDiv = event.target.checked;
    }
}