import {
    Component, Input, Output, EventEmitter, Host, Directive, HostBinding, ElementRef,
    Optional, HostListener
} from "angular2/core";

@Component({
    selector: "checkbox-group",
    template: `<div class="checkbox-group"><ng-content></ng-content></div>`
})
export class CheckboxGroup {

    @Output()
    modelChange = new EventEmitter();

    @Input()
    model: any[];

    addOrRemoveValue(value: any) {
        if (this.hasValue(value)) {
            this.model.splice(this.model.indexOf(value), 1);
        } else {
            this.model.push(value);
        }
        this.modelChange.emit(this.model);
    }

    hasValue(value: any) {
        if (this.model instanceof Array) {
            return this.model.indexOf(value) !== -1;
        } else {
            return this.model === value;
        }
    }

}

@Component({
    selector: "checkbox-item",
    template: `
<div class="checkbox-item" (click)="check()">
    <input type="checkbox" [checked]="isChecked()"/> <ng-content></ng-content>
</div>`
})
export class CheckboxItem {

    @Input()
    value: any;

    constructor(@Host() private checkboxGroup: CheckboxGroup) {
    }

    check() {
        this.checkboxGroup.addOrRemoveValue(this.value);
    }

    isChecked() {
        return this.checkboxGroup.hasValue(this.value);
    }
}

@Directive({
    selector: "[check-box]"
})
export class CheckBox {

    @HostBinding("type")
    type = "checkbox";

    @Output()
    modelChange = new EventEmitter();

    @Input()
    model: any;

    @Input()
    value: any;

    @Input()
    uncheckedValue: any = null;

    constructor(@Optional() @Host() private checkboxGroup: CheckboxGroup) {
    }

    @HostBinding("checked")
    get checked() {
        return this.checkboxGroup ? this.checkboxGroup.hasValue(this.value) : this.hasModelValue();
    }

    @HostListener("click")
    check() {
        if (this.checkboxGroup) {
            this.checkboxGroup.addOrRemoveValue(this.value);
        } else {
            this.addOrRemoveValue();
        }
    }

    private hasModelValue() {
        if (this.model instanceof Array) {
            return this.model.indexOf(this.value) !== -1;
        } else {
            return this.model === this.value;
        }
    }

    private addOrRemoveValue() {
        if (this.model instanceof Array) {
            if (this.hasModelValue()) {
                this.model.splice(this.model.indexOf(this.value), 1);
            } else {
                this.model.push(this.value);
            }
        } else {
            if (this.model === this.value) {
                this.model = this.uncheckedValue;
            } else {
                this.model = this.value;
            }
        }
        this.modelChange.emit(this.model);
    }

}
