/**
 * 文字列の数式を計算する関数
 * @param expression 計算する数式文字列 (例: "1 + 2 * 3")
 * @returns 計算結果の数値。エラーが発生した場合は null を返す。
 */
function calculateStringExpression(expression: string): number | null {
  try {
    // 1. 式をトークンに分割 (数値、演算子、括弧)
    const tokens = tokenize(expression);
    if (!tokens) {
      return null; // トークン化に失敗
    }

    // 2. トークンを逆ポーランド記法 (RPN) に変換
    const rpnTokens = convertToRPN(tokens);
    if (!rpnTokens) {
      return null; // RPN 変換に失敗
    }

    // 3. RPN を計算
    const result = evaluateRPN(rpnTokens);
    return result;

  } catch (error) {
    console.error("Error during calculation:", error);
    return null; // エラーが発生した場合
  }
}

/**
 * 文字列をトークンに分割する関数
 * @param expression 数式文字列
 * @returns トークンの配列。エラー時は null
 */
function tokenize(expression: string): (string | number)[] | null {
  const tokens: (string | number)[] = [];
  let currentNumber = "";

  for (const char of expression) {
    if (/[0-9.]/.test(char)) { // 数字または小数点の場合
      currentNumber += char;
    } else if (/[+\-*/()]/.test(char)) { // 演算子または括弧の場合
      if (currentNumber !== "") {
        tokens.push(parseFloat(currentNumber)); // 現在の数値をトークンに追加
        currentNumber = "";
      }
      tokens.push(char); // 演算子または括弧をトークンに追加
    } else if (char !== " ") {
      //空白以外の文字で数字、演算子、()以外の文字が来た場合はエラー
      console.error(`Invalid character found: ${char}`);
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
function convertToRPN(tokens: (string | number)[]): (string | number)[] | null {
  const outputQueue: (string | number)[] = [];
  const operatorStack: string[] = [];

  const precedence: { [key: string]: number } = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  for (const token of tokens) {
    if (typeof token === 'number') {
      outputQueue.push(token); // 数値は出力キューに直接追加
    } else if (token in precedence) { // 演算子の場合
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        outputQueue.push(operatorStack.pop()!); // 優先順位が高い演算子を出力キューに移動
      }
      operatorStack.push(token); // 現在の演算子をスタックにプッシュ
    } else if (token === '(') {
      operatorStack.push(token); // '(' はスタックにプッシュ
    } else if (token === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue.push(operatorStack.pop()!); // '(' に出会うまで演算子を出力キューに移動
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
    outputQueue.push(operatorStack.pop()!);
  }

  return outputQueue;
}

/**
 * 逆ポーランド記法 (RPN) のトークン配列を計算
 * @param rpnTokens RPN形式のトークン配列
 * @returns 計算結果
 */
function evaluateRPN(rpnTokens: (string | number)[]): number {
  const stack: number[] = [];

  for (const token of rpnTokens) {
    if (typeof token === 'number') {
      stack.push(token); // 数値はスタックにプッシュ
    } else {
      // 演算子の場合、スタックから2つの値を取り出して計算
      const operand2 = stack.pop()!;
      const operand1 = stack.pop()!;
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

  return stack.pop()!; // 最終的にスタックに残った値が計算結果
}



// 使用例
const expression = "1 + 2 * (3 - 1) / 2";
const result = calculateStringExpression(expression);

if (result !== null) {
  console.log(`Result of "${expression}" is: ${result}`); // 出力: Result of "1 + 2 * (3 - 1) / 2" is: 3
}
const expression2 = "1 + 2 * (3 - 1 / 2";
const result2 = calculateStringExpression(expression2); //括弧の対応が正しくないのでエラー