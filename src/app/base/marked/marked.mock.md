## 使用场景

在一个规模较大的表单中，如果其中的一部分（数量较多）需要单独验证的情况。

## 基本思路

在 $scope.Form 和 $scope.Form.input 中间添加一层参数来判断这一组是否验证通过

## Github

* https://github.com/doxiaodong/angularjs-form-group-validation

## 使用方法

* html

```html
<form name="testForm" ng-submit="submit()" class="form-horizontal">
    ...

    <div class="form-group" form-group-validation="testForm" name="list"
         ng-class="{ 'has-error': testForm.list.$invalid }">
        <div ng-repeat="item in form.list">
            <div class="col-xs-offset-2 col-xs-10">
                <p>testForm.{{ item.name }}.$valid: {{ testForm[item.name].$valid }}</p>
                <p>testForm.{{ item.name }}.$dirty: {{ testForm[item.name].$dirty }}</p>
            </div>
            <label class="col-xs-2 control-label">{{ item.name }}:</label>
            <div class="col-xs-10">
                <input form-group-item class="form-control" type="text" name="{{ item.name }}" ng-model="item.model"
                       required minlength="2">
            </div>
        </div>
    </div>

    ...

</form>
```
```
1. form-group-validation: 整个表单的 name
2. name: form-group-validation 中间层的 name 不填不起作用
3. form-group-item: 需要分组校验的子元素
4. 中间层检验状态只有： $valid, $invalid, $dirty
```

## 在线测试

* http://example.darlin.me/form-group-validation/index.html

## 代码展示

* form-group-validation.directive.js

```javascropt
(function (angular) {

    angular.module('formGroup.validation', ['formGroup.validation.service', 'formGroup.item'])

        .directive('formGroupValidation', function () {
            return {
                restrict: 'AE',
                scope: {
                    _formGroupForm: '=formGroupValidation'
                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

                    _formGroup = {
                        name: $attrs.name,
                        list: []
                    };

                    if (!_formGroup.name) {
                        return;
                    }

                    $scope._formGroupForm[_formGroup.name] = {};

                    this.init = function () {
                        return {
                            form: $scope._formGroupForm,
                            formGroup: _formGroup
                        };
                    };
                }]
            };
        });

})(angular);

```

* form-group-validation.service.js

```javascript
(function (angular) {

    angular.module('formGroup.item', [])
        .service('formGroupValidationService', function () {
            this.validationCheck = function (arrList) {
                var res = {
                    invalid: false,
                    dirty: false
                };
                angular.forEach(arrList, function (value) {
                    if (value.$invalid) {
                        res.invalid = true;
                    }
                    if (value.$dirty) {
                        res.dirty = true;
                    }
                });
                return res;
            };
        });

})(angular);
```

* form-group-item.directive.js

```javascript
(function (angular) {

    angular.module('formGroup.validation.service', [])

        .directive('formGroupItem', ['formGroupValidationService', function (formGroupValidationService) {
            return {
                restrict: 'A',
                require: ['^formGroupValidation', '?ngModel'],
                link: function (scope, element, attrs, ctrls) {

                    var formGroupValidationCtrl = ctrls[0];
                    var ngModelCtrl = ctrls[1];

                    if (!formGroupValidationCtrl.init) {
                        return;
                    }

                    var init = formGroupValidationCtrl.init();

                    var _form = init.form;
                    var _formGroup = init.formGroup;
                    _formGroup.list.push(ngModelCtrl);

                    var formGroupNg = _form[_formGroup.name];

                    ngModelCtrl.$validators.formGroupItem = function (modelValue, viewValue) {
                        validationChecked = formGroupValidationService.validationCheck(_formGroup.list);
                        formGroupNg.$valid = !validationChecked.invalid;
                        formGroupNg.$invalid = validationChecked.invalid;

                        formGroupNg.$dirty = validationChecked.dirty;

                        return true; // always return true to ensure no effect by formGroupItem
                    };

                }
            };
        }]);

})(angular);
```
