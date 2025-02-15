/**
 * 文字列の数式を計算する関数
 * @param expression 計算する数式文字列 (例: "1 + 2 * 3")
 * @returns 計算結果の数値。エラーが発生した場合は null を返す。
 */
function calculateStringExpression(expression) {
    try {
        // 1. 式をトークンに分割 (数値、演算子、括弧)
        var tokens = tokenize(expression);
        if (!tokens) {
            return null; // トークン化に失敗
        }
        // 2. トークンを逆ポーランド記法 (RPN) に変換
        var rpnTokens = convertToRPN(tokens);
        if (!rpnTokens) {
            return null; // RPN 変換に失敗
        }
        // 3. RPN を計算
        var result_1 = evaluateRPN(rpnTokens);
        return result_1;
    }
    catch (error) {
        console.error("Error during calculation:", error);
        return null; // エラーが発生した場合
    }
}
/**
 * 文字列をトークンに分割する関数
 * @param expression 数式文字列
 * @returns トークンの配列。エラー時は null
 */
function tokenize(expression) {
    var tokens = [];
    var currentNumber = "";
    for (var _i = 0, expression_1 = expression; _i < expression_1.length; _i++) {
        var char = expression_1[_i];
        if (/[0-9.]/.test(char)) { // 数字または小数点の場合
            currentNumber += char;
        }
        else if (/[+\-*/()]/.test(char)) { // 演算子または括弧の場合
            if (currentNumber !== "") {
                tokens.push(parseFloat(currentNumber)); // 現在の数値をトークンに追加
                currentNumber = "";
            }
            tokens.push(char); // 演算子または括弧をトークンに追加
        }
        else if (char !== " ") {
            //空白以外の文字で数字、演算子、()以外の文字が来た場合はエラー
            console.error("Invalid character found: ".concat(char));
            return null;
        }
        // 空白は無視
    }
    // 最後の数値を処理
    if (currentNumber !== "") {
        tokens.push(parseFloat(currentNumber));
    }
    return tokens;
}
/**
 * トークン配列を逆ポーランド記法 (RPN) に変換
 * @param tokens トークン配列
 * @returns RPN形式のトークン配列。エラー時はnull
 */
function convertToRPN(tokens) {
    var outputQueue = [];
    var operatorStack = [];
    var precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === 'number') {
            outputQueue.push(token); // 数値は出力キューに直接追加
        }
        else if (token in precedence) { // 演算子の場合
            while (operatorStack.length > 0 &&
                operatorStack[operatorStack.length - 1] !== '(' &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                outputQueue.push(operatorStack.pop()); // 優先順位が高い演算子を出力キューに移動
            }
            operatorStack.push(token); // 現在の演算子をスタックにプッシュ
        }
        else if (token === '(') {
            operatorStack.push(token); // '(' はスタックにプッシュ
        }
        else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop()); // '(' に出会うまで演算子を出力キューに移動
            }
            if (operatorStack.length === 0) {
                console.error("Mismatched parentheses");
                return null; //括弧の対応がおかしい
            }
            operatorStack.pop(); // '(' をスタックから削除
        }
    }
    // スタックに残っている演算子を全て出力キューに移動
    while (operatorStack.length > 0) {
        if (operatorStack[operatorStack.length - 1] === '(') {
            // "("が残っていたら括弧の対応がおかしい
            console.error("Mismatched parentheses");
            return null;
        }
        outputQueue.push(operatorStack.pop());
    }
    return outputQueue;
}
/**
 * 逆ポーランド記法 (RPN) のトークン配列を計算
 * @param rpnTokens RPN形式のトークン配列
 * @returns 計算結果
 */
function evaluateRPN(rpnTokens) {
    var stack = [];
    for (var _i = 0, rpnTokens_1 = rpnTokens; _i < rpnTokens_1.length; _i++) {
        var token = rpnTokens_1[_i];
        if (typeof token === 'number') {
            stack.push(token); // 数値はスタックにプッシュ
        }
        else {
            // 演算子の場合、スタックから2つの値を取り出して計算
            var operand2 = stack.pop();
            var operand1 = stack.pop();
            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    if (operand2 === 0) {
                        throw new Error("Division by zero");
                    }
                    stack.push(operand1 / operand2);
                    break;
            }
        }
    }
    return stack.pop(); // 最終的にスタックに残った値が計算結果
}
// 使用例
var expression = "1 + 2 * (3 - 1) / 2";
var result = calculateStringExpression(expression);
if (result !== null) {
    console.log("Result of \"".concat(expression, "\" is: ").concat(result)); // 出力: Result of "1 + 2 * (3 - 1) / 2" is: 3
}
var expression2 = "1 + 2 * (3 - 1 / 2";
var result2 = calculateStringExpression(expression2); //括弧の対応が正しくないのでエラー
