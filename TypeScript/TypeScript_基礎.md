## TypeScript学習ドキュメント

### 1. はじめに (TypeScriptとは)

TypeScriptは、Microsoftが開発したJavaScriptのスーパーセットです。JavaScriptに静的な型付けを追加することで、大規模なアプリケーション開発をより安全に、そして効率的に行うことを目指しています。

#### JavaScriptとの違い

JavaScriptは動的型付け言語であり、変数の型は実行時に決定されます。これにより、柔軟なコーディングが可能になる一方で、予期せぬエラーが発生しやすいという側面もあります。

一方、TypeScriptは静的型付け言語であり、コンパイル時に変数の型をチェックします。これにより、開発段階で多くのエラーを検出できるため、実行時のエラーを減らすことができます。

#### 利用するメリット

TypeScriptを利用する主なメリットは以下の通りです。

*   **高い保守性:** 型情報によりコードの意図が明確になり、大規模な開発でも変更や修正が容易になります。
*   **早期エラー検出:** コンパイル時に型エラーを検出できるため、実行時のエラーを減らすことができます。
*   **優れた開発体験:** 型情報に基づいたコード補完やエラーチェックにより、開発効率が向上します。
*   **最新のJavaScript機能の利用:** TypeScriptコンパイラは、最新のJavaScript機能を古いブラウザでも動作するように変換できます。

#### 解決する課題

TypeScriptは、JavaScriptが抱える以下のような課題を解決します。

*   **大規模開発における複雑さ:** コード量が増えるほど、JavaScriptの動的型付けはエラーの原因となりやすくなります。
*   **実行時エラー:** JavaScriptでは、実行時に予期せぬエラーが発生する可能性があります。
*   **コードの可読性:** 型情報がないため、コードの意図を理解するのに時間がかかる場合があります。

#### 最新動向と将来性

TypeScriptは、JavaScriptエコシステムにおいて重要な役割を果たしており、その人気はますます高まっています。React、Angular、Vue.jsなどの主要なフレームワークもTypeScriptをサポートしており、今後もその重要性は増していくと考えられます。

### 2. 開発環境の構築

TypeScriptの開発環境を構築する手順は以下の通りです。

#### Node.jsとnpm (またはyarn) のインストール

Node.jsはJavaScriptの実行環境であり、npm (Node Package Manager) はパッケージ管理ツールです。TypeScriptの開発には必須のツールですので、公式サイトからインストールしてください。

#### TypeScriptコンパイラ (tsc) のインストールと設定

TypeScriptコンパイラ (tsc) は、TypeScriptコードをJavaScriptコードに変換するツールです。以下のコマンドでインストールします。

```bash
npm install -g typescript
```

#### Visual Studio Code (VSCode) などのエディタ設定

Visual Studio Code (VSCode) は、TypeScript開発に最適なエディタの一つです。TypeScriptのサポートが充実しており、コード補完やエラーチェックなどの機能が利用できます。

#### 最初のTypeScriptプロジェクトを作成し、コンパイルして実行するまでの手順

1.  新しいディレクトリを作成し、`package.json`ファイルを作成します。

    ```bash
    mkdir my-typescript-project
    cd my-typescript-project
    npm init -y
    ```

2.  TypeScriptの設定ファイル (`tsconfig.json`) を作成します。

    ```bash
    tsc --init
    ```

3.  TypeScriptファイル (`index.ts`など) を作成し、コードを記述します。

4.  TypeScriptコンパイラでコンパイルします。

    ```bash
    tsc
    ```

5.  生成されたJavaScriptファイルを実行します。

    ```bash
    node index.js
    ```

### 3. TypeScriptの基本

#### 型

TypeScriptでは、様々な型を利用できます。

*   **プリミティブ型:** number, string, boolean, null, undefined, symbol, bigint
*   **リテラル型:** 特定の値のみを許容する型 (例: `type Color = "red" | "blue"`)
*   **オブジェクト型:** オブジェクトの形状を定義する型 (例: `interface Person { name: string; age: number; }`)
*   **配列型:** 配列の要素の型 (例: `number[]`)
*   **タプル型:** 固定長の配列で、各要素の型が異なる場合 (例: `[string, number]`)
*   **any型:** 任意の型 (型のチェックを行わない)
*   **unknown型:** 任意の型 (any型とは異なり、使用前に型チェックが必要)
*   **void型:** 関数が値を返さないことを表す型
*   **never型:** 決して到達しない型 (例: 例外をスローする関数の返り値)
*   **型エイリアス:** 型に別名をつける (例: `type Name = string`)
*   **ユニオン型:** 複数の型のいずれか (例: `string | number`)
*   **インターセクション型:** 複数の型のすべて (例: `string & { length: number }`)
*   **オプショナル型 (?):** プロパティが必須でないことを表す (例: `name?: string`)
*   **readonly修飾子:** プロパティが変更不可であることを表す (例: `readonly name: string`)

#### 変数と定数

*   **変数の宣言:** `let` (再代入可能), `var` (再代入可能, スコープに注意), `const` (再代入不可)
*   **スコープ:** 変数の有効範囲 (ブロックスコープが推奨)
*   **定数の宣言とイミュータブル性:** `const`で宣言された変数は再代入できませんが、オブジェクトの場合はプロパティの変更が可能です。

#### 演算子

*   **算術演算子:** `+`, `-`, `*`, `/`, `%`
*   **比較演算子:** `==`, `!=`, `===`, `!==`, `>`, `<`, `>=`, `<=`
*   **論理演算子:** `&&`, `||`, `!`
*   **代入演算子:** `=`, `+=`, `-=`, `*=`, `/=`, `%=`
*   **ビット演算子:** `&`, `|`, `^`, `~`, `<<`, `>>`
*   **三項演算子:** `condition ? valueIfTrue : valueIfFalse`
*   **null合体演算子 (??):** `value ?? defaultValue` (valueがnullまたはundefinedの場合にdefaultValueを返す)
*   **チェーン演算子 (?.)** `object?.property` (objectがnullまたはundefinedの場合にundefinedを返す)

#### 制御構文

*   **if文:** 条件によって処理を分岐
*   **switch文:** 複数の条件によって処理を分岐
*   **for文:** 繰り返し処理
*   **while文:** 繰り返し処理
*   **do-while文:** 繰り返し処理 (少なくとも一度は実行される)
*   **break文:** ループから抜ける
*   **continue文:** ループの次のイテレーションに進む

#### 関数

*   **関数の定義と呼び出し:** `function name(parameters) { ... }`
*   **引数:** 必須引数、オプション引数 (例: `param?: string`)、デフォルト引数 (例: `param: string = "default"`)、レストパラメータ (例: `...params: string[]`)
*   **返り値の型:** 関数が返す値の型 (例: `function name(): string { ... }`)
*   **アロー関数:** `() => { ... }`
*   **関数型:** 関数の型 (例: `(param1: string, param2: number) => boolean`)
*   **ジェネリクス関数:** 型パラメータを持つ関数 (例: `<T>(arg: T): T`)
*   **関数のオーバーロード:** 同じ名前で異なる引数型を持つ関数を複数定義する

#### オブジェクト

*   **オブジェクトの定義とプロパティ:** `{ name: string; age: number; }`
*   **メソッド:** オブジェクトのプロパティである関数
*   **オブジェクトリテラル:** `{ name: "John"; age: 30; }`
*   **クラス:** オブジェクトの設計図
*   **インターフェース:** オブジェクトの形状を定義する
*   **抽象クラス:** インスタンス化できないクラス
*   **ポリモーフィズム:** 同じメソッド名で異なる振る舞いをすること

#### 配列

*   **配列の定義と要素へのアクセス:** `[1, 2, 3]`、`array[0]`
*   **配列のメソッド:** `push()`, `pop()`, `shift()`, `unshift()`, `map()`, `filter()`, `reduce()`, `forEach()` など
*   **スプレッド構文:** `...array`

#### モジュール

*   **モジュールのインポートとエクスポート:** `import { name } from "./module"`、`export { name }`
*   **名前空間:** グローバルスコープの汚染を防ぐ

#### 型推論

TypeScriptは、文脈から型を推論する機能を持っています。

#### 型アノテーション

明示的に型を指定することを型アノテーションといいます。

### 4. TypeScriptの応用

#### ジェネリクス

ジェネリクスは、型をパラメータとして扱う機能です。ジェネリクスを使うことで、様々な型に対応できる関数やクラスを定義できます。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let result = identity<string>("hello"); // string型
let result2 = identity<number>(123); // number型
```

#### 型ユーティリティ

型ユーティリティは、既存の型を変換したり、新しい型を作成したりするための機能です。

*   `Partial<T>`: Tのすべてのプロパティをオプショナルにする
*   `Readonly<T>`: Tのすべてのプロパティを読み取り専用にする
*   `Pick<T, K>`: Tの中からKのプロパティだけを取り出す
*   `Omit<T, K>`: Tの中からKのプロパティを除外する
*   `Record<K, T>`: Kをキー、Tを値とするオブジェクト型を作成する
*   `Exclude<T, U>`: TからUを除外した型を作成する
*   `Extract<T, U>`: TからUに合致する型を作成する
*   `NonNullable<T>`: Tからnullとundefinedを除外した型を作成する

#### デコレータ

デコレータは、クラスやメソッド、プロパティ、パラメータに付加できる機能です。デコレータを使うことで、メタプログラミングが可能になります。

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log("呼ばれたメソッド:", propertyKey);
}

class MyClass {
  @log
  myMethod() {
    // ...
  }
}
```

#### 名前空間

名前空間は、グローバルスコープの汚染を防ぐために使われます。

```typescript
namespace MyNamespace {
  export function myFunction() {
    // ...
  }
}

MyNamespace.myFunction();
```

#### tsconfig.json

`tsconfig.json`は、TypeScriptコンパイラの設定ファイルです。コンパイルオプションなどを設定できます。

#### lint設定

ESLintやPrettierなどのツールを使って、コードの品質を維持できます。

### 5. TypeScriptと他の技術

TypeScriptは、様々なフレームワークやライブラリと組み合わせて利用できます。

*   React
*   Angular
*   Vue.js
*   Node.js (Express)
*   GraphQL
*   gRPC
*   Jest, Mocha (テストフレームワーク)

### 6. TypeScriptの学習リソース

*   **公式ドキュメント:** [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
*   **オンラインコース:** Udemy, Coursera, Pluralsightなど
*   **書籍:**
    *   プログラミングTypeScript
    *   TypeScript Handbook
*   **コミュニティ:**
    *   Stack Overflow
    *   Qiita
    *   Twitter (#typescript)

このドキュメントは、TypeScriptの基本的な知識を網羅的に解説しています。さらに学習を進めたい場合は、公式ドキュメントや書籍などを参考にしてください。
