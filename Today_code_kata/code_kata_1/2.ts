class StringCalculator {
  /**
   * 文字列の数式を計算し結果を返す
   * @param expression 計算する数式文字列(例: '1 + 2')
   * @returns 計算結果の数値
   * @throws {Error} 無効な式の場合にエラーをスローする
   */

  calculate(expression: string): number {
    try {
      // 組み込みのeval関数は関数セキュリティリスクがあるため、
      // Functionコンストラクタを使用する
      const fn = new Function('return' + expression);
      const result = fn();

      if (typeof result !== 'number' || !Number.isFinite(result)) {
        throw new Error("Invalid expression or result is not a finite number.");
      }
      return result;
    } catch (error) {
      throw new Error('Invalid expression : ${expression}. Error: ${error.message}');
    }
  }
}

const calculate = new StringCalculator();

try {
  const result1 = calculate.calculate("1 + 2");
  console.log("Result 1: ${result1}");

  // const result2 = calculate.calculate("(1 + 2) * 3");
  // console.log("Resault 2: ${result2}");

  // const result3 = calculate.calculate("10 / 2 - 1");
  // console.log("Result 3: ${result3}");

  // const result4 = calculate.calculate("10 / 0");
  // console.log("Result 4: ${result4}");

  // const result5 = calculate.calculate("1 + 2 + *");
  // console.log("Result 5: ${result5}");

  // const result6 = calculate.calculate("1 + a");
  // console.log("Result 6: ${result6}");

} catch (error) {
  console.error((error as Error).message);
}