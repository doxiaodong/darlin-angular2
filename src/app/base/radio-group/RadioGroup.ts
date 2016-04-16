import {
    Component, Input, Output, EventEmitter, Host, Directive, ElementRef, HostBinding,
    HostListener, Optional, OnInit
} from "angular2/core";

@Component({
    selector: "radio-group",
    template: `<div class="radio-group"><ng-content></ng-content></div>`
})
export class RadioGroup {

    @Output()
    modelChange = new EventEmitter();

    @Input()
    model: any;

    change(value: any) {
        this.model = value;
        this.modelChange.emit(value);
    }

}

@Component({
    selector: "radio-item",
    template: `
<div class="radio-item" (click)="check()">
    <input type="radio" [checked]="isChecked()" [disabled]="disabled"/> <ng-content></ng-content>
</div>`
})
export class RadioItem {

    @Input()
    value: any;

    @Input()
    disabled: boolean;

    constructor(@Host() private radioGroup: RadioGroup) {
    }

    check() {
        this.radioGroup.change(this.value);
    }

    isChecked() {
        return this.radioGroup.model === this.value;
    }
}

@Directive({
    selector: "[radio-box]"
})
export class RadioBox {

    @HostBinding("type")
    type = "radio";

    @Output()
    modelChange = new EventEmitter();

    @Input()
    model: any;

    constructor(private element: ElementRef, @Optional() @Host() private radioGroup: RadioGroup) {
    }

    @HostBinding("checked")
    get checked() {
        const element: HTMLInputElement = this.element.nativeElement;
        return this.radioGroup ? this.radioGroup.model === element.value : this.model === element.value;
    }

    @HostListener("click")
    check() {
        const element: HTMLInputElement = this.element.nativeElement;
        if (this.radioGroup) {
            this.radioGroup.change(element.value);
        } else {
            this.model = element.value;
            this.modelChange.emit(element.value);
        }
    }

}
