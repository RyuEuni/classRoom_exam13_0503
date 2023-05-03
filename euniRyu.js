function exampleOne(numberValue){
  function integerCheck(data){
    if(Number.isInteger(data) === true){
      return data;
    }
    else{
      return new Error('이 함수는 정수가 필요합니다.')
    }
  }

  function innerOne(one){
    return one + 1;
  }

  function innerTwo(two){
    return two + 2;
  }

  function innerThree(three){
    return three + 3;
  }

  function innerFour(four){
    return four + 4;
  }


  integerCheck(numberValue);
  const first = innerOne(numberValue);
  const second = innerTwo(first);
  const third = innerThree(second);
  const fourth = innerFour(third);
  return fourth;
}

const result = exampleOne(10);
console.log(result);

//* 답변 코드

//* Q1. 콜백지옥
function examOne(numberValue) {
  function integerCheck(data) {
    if (Number.isInteger(data) === true) {
      return data;
    } else {
      throw new Error("이 함수는 정수가 필요합니다.");
    }
  }

  function innerOne(one, cb) {
    const first = one + 1;

    cb(first, innerThree);
  }

  function innerTwo(two, cb) {
    const second = two + 2;

    cb(second, innerFour);
  }

  function innerThree(three, cb) {
    const third = three + 3;

    cb(third);
  }

  function innerFour(four) {
    return four + 4;
  }
  integerCheck(numberValue);
  innerOne(numberValue, innerTwo);
}
let result2 = examOne(10)
console.log("re", result2);


//? 콜백 함수 순차적으로 실행되는 것 같은데 undefined가 나오는 이유를 모르겠음..
//? 추가로 promise가 실행이 안되고 에러가 뜨는데 공부가 더 필요해 보임..

//* Q2. promise처리
/*
function examTwo(numberValue){
  function integerCheck(data){
    if(Number.isInteger(data) === true){
      return data;
    }
    else{
      return Promise.reject(new Error('이 함수는 정수가 필요합니다.'));
    }
  }

  function innerOne(one){
    return Promise.resolve(one + 1);
  }

  function innerTwo(two){
    return Promise.resolve(two + 2);
  }

  function innerThree(three){
    return Promise.resolve(three + 3);
  }

  function innerFour(four){
    return Promise.resolve(four + 4);
  }

  return integerCheck(numberValue)
    .then(innerOne)
    .then(innerTwo)
    .then(innerThree)
    .then(innerFour)
    .catch(error => {
      console.error(error);
    });
}

Promise.resolve(examTwo(10))
  .then(result => {
    console.log(result);
  });
*/

//* Q3. async/await처리
function examThree(numberValue){
  function integerCheck(data){
    if(Number.isInteger(data) === true){
      return data;
    }
    else{
      return new Error('이 함수는 정수가 필요합니다.')
    }
  }

  function innerOne(one){
    return new Promise(resolve => {
      setTimeout(() => resolve(one + 1), 1000);
    });
  }

  function innerTwo(two){
    return new Promise(resolve => {
      setTimeout(() => resolve(two + 2), 1000);
    });
  }

  function innerThree(three){
    return new Promise(resolve => {
      setTimeout(() => resolve(three + 3), 1000);
    });
  }

  function innerFour(four){
    return new Promise(resolve => {
      setTimeout(() => resolve(four + 4), 1000);
    });
  }

  async function exampleAsync() {
    integerCheck(numberValue);
    const first = await innerOne(numberValue);
    const second = await innerTwo(first);
    const third = await innerThree(second);
    const fourth = await innerFour(third);
    return fourth;
  }

  return exampleAsync();
}

examThree(10)
  .then(result => console.log(result))
  .catch(error => console.error(error));

//* Q4. 클래스, 인스턴스
class ExampleClass {
  constructor(numberValue) {
    this.numberValue = numberValue;
  }

  integerCheck(data) {
    if (Number.isInteger(data) === true) {
      return data;
    } else {
      return new Error("이 함수는 정수가 필요합니다.");
    }
  }

  innerOne(one) {
    return one + 1;
  }

  innerTwo(two) {
    return two + 2;
  }

  innerThree(three) {
    return three + 3;
  }

  innerFour(four) {
    return four + 4;
  }

  async execute() {
    try {
      const integerChecked = this.integerCheck(this.numberValue);
      const first = this.innerOne(integerChecked);
      const second = this.innerTwo(first);
      const third = this.innerThree(second);
      const fourth = this.innerFour(third);
      return fourth;
    } catch (err) {
      console.error(err);
    }
  }
}

const exampleInstance = new ExampleClass(10);
exampleInstance.innerOne = exampleInstance.innerOne.bind(exampleInstance);
exampleInstance.innerTwo = exampleInstance.innerTwo.bind(exampleInstance);
exampleInstance.innerThree = exampleInstance.innerThree.bind(exampleInstance);
exampleInstance.innerFour = exampleInstance.innerFour.bind(exampleInstance);
exampleInstance.execute().then((result) => {
  console.log(result);
});