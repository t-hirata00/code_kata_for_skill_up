function caluculator(expression) {
    // 1.式をトークンに分割
    var tokens = expression.split(" ");
    // 2. トークンを評価して計算結果を返す
    var result = parseFloat(tokens[0]);
    for (var i = 1; i < tokens.length; i += 2) {
        var operatar = tokens[i];
        var opreand = parseFloat(tokens[i + 1]);
        switch (operatar) {
            case "+":
                result += opreand;
                break;
            case "-":
                result -= opreand;
                break;
            case "*":
                result *= opreand;
                break;
            case "/":
                result /= opreand;
                break;
            default:
                throw new Error('Invalid operator: ' + operatar);
        }
    }
    return result;
}
// テスト
console.log(caluculator("1 + 2")); // 3
console.log(caluculator("10 - 5")); // 5
console.log(caluculator("2 * 3")); // 6
console.log(caluculator("10 / 2")); // 5
console.log(caluculator("1 + 2 * 3")); // 7
