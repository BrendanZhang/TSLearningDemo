{
    var Claculator = /** @class */ (function () {
        function Claculator() {
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = null;
            this.keys = [
                ["Clear", "÷"],
                ["7", "8", "9", "×"],
                ["4", "5", "6", "-"],
                ["1", "2", "3", "+"],
                ["0", ".", "="]
            ];
            this.createContainer();
            this.createOutput();
            this.createButtons();
            this.bindEvents();
        }
        // 声明创建按钮函数
        Claculator.prototype.createButton = function (text, container, className) {
            var button = document.createElement("button");
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            container.appendChild(button);
        };
        Claculator.prototype.createContainer = function () {
            // 创建 container
            var container = document.createElement("div");
            container.classList.add("calculator");
            document.body.appendChild(container);
            this.container = container;
        };
        Claculator.prototype.createButtons = function () {
            var _this = this;
            // 按钮放到 container 里
            this.keys.forEach(function (textList) {
                var div = document.createElement("div");
                div.classList.add("row");
                textList.forEach(function (text) {
                    _this.createButton(text, div, "button text-" + text);
                });
                _this.container.appendChild(div);
            });
        };
        Claculator.prototype.createOutput = function () {
            // 创建 output
            var output = document.createElement("div");
            output.classList.add("output");
            var span = document.createElement("span");
            span.textContent = "0";
            output.appendChild(span);
            this.container.appendChild(output);
            this.output = output;
            this.span = span;
        };
        Claculator.prototype.bindEvents = function () {
            var _this = this;
            this.container.addEventListener("click", function (event) {
                if (event.target instanceof HTMLButtonElement) {
                    var button = event.target;
                    var text = button.textContent;
                    _this.updateNumberOrOperator(text);
                    // 判断字符类型
                }
            });
        };
        Claculator.prototype.updateNumber = function (name, text) {
            if (this[name]) {
                // 更新 n1
                this[name] += text;
            }
            else {
                this[name] = text;
            }
            this.span.textContent = this[name].toString();
        };
        Claculator.prototype.updateNumbers = function (text) {
            if (this.operator) {
                this.updateNumber("n2", text);
                // 更新 n2
                // 如果有操作符
            }
            else {
                this.updateNumber("n1", text);
                // 如果没有操作符
            }
        };
        Claculator.prototype.updateResult = function () {
            var result;
            var n1 = parseFloat(this.n1);
            var n2 = parseFloat(this.n2);
            if (this.operator === "+") {
                result = n1 + n2;
            }
            else if (this.operator === "-") {
                result = n1 + n2;
            }
            else if (this.operator === "×") {
                result = n1 * n2;
            }
            else if (this.operator === "÷") {
                result = n1 / n2;
            }
            result = result
                .toPrecision(20)
                .replace(/0+$/g, "")
                .replace(/0+e/g, "e");
            if (n2 === 0 || this.operator === "÷") {
                result = "不是数字";
            }
            this.span.textContent = result;
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = result;
        };
        Claculator.prototype.updateOperator = function (text) {
            if (this.n1 === null) {
                this.n1 = this.result;
            }
            // 更新 operator
            this.operator = text;
        };
        Claculator.prototype.updateNumberOrOperator = function (text) {
            if ("0123456789.".indexOf(text) >= 0) {
                this.updateNumbers(text);
            }
            else if ("+-×÷".indexOf(text) >= 0) {
                this.updateOperator(text);
            }
            else if ("=".indexOf(text) >= 0) {
                // 更新结果
                this.updateResult();
            }
            else if (text === "Clear") {
                this.n1 = null;
                this.n2 = null;
                this.operator = null;
                this.result = null;
                this.span.textContent = "0";
            }
        };
        return Claculator;
    }());
    new Claculator();
}
