---
title: '외부 API를 연동하여 뉴스 뷰어 만들기'
date: 2020-2-3 16:21:13
category: 'react'
description: 'axios, Promise, async를 이용하여 뉴스 뷰어를 만들어보자'
---

<ul>
    <li>비동기 작업의 이해</li>
    <li>axio로 API 호출해서 데이터 받아오기</li>
    <li>newsapi API 키 발급받기</li>
    <li>뉴스뷰어 UI 만들기</li>
    <li>데이터 연동하기</li>
    <li>카테고리 기능 구현하기</li>
    <li>리액트 라우터 적용하기</li>
    <li>usePromise 커스텀 Hook 만들기</li>
</ul>

### `비동기 작업의 이해`

<img src="https://dojang.io/pluginfile.php/14098/mod_page/content/7/047003.png" width="500px">
<br>
동기: 직렬적으로 태스크를 수행한다. 요청 후 응답될 때까지 이후 태스크들이 블로킹된다.<br>
비동기: 병렬적으로 태스크를 수행한다. 태스크가 종료되지 않은 상태여도 다음 태스크를 실행한다.

#### `콜백함수`

    function printMe() {
        console.log("Hello World!");
    }
    setTimeout(printMe,3000);
    console.log("대기중..");

다음은 3초 후 printMe를 호출하는 코드다.
setTimeout이 사용되는 시점에서 코드가 3초동안 멈추는 것이 아니라, 코드가 위부터 아래까지 다 호출되고 3초 뒤에 printMe가 호출된다.

자바스크립트에서 비동기 작업을 할 때 가장 흔히 사용되는 방법은 콜백함수이다.
위 코드에서 setTimeout()의 인자로 printMe() 함수를 전달해주었는데, 이를 콜백함수라고 한다.

```
function increase(number,callback) {
    setTimeout(() => {
        const result = number + 10;
        if(callback) callback(result);
    },1000);
}

console.log("작업 시작");
increase(0,result => {
    console.log(result);
    increase(result,result => {
        console.log(result);
        increase(result,result => {
            console.log(result);
                increase(result,result => {
                console.log(result);
                console.log("작업 완료");
            });
        });
    });
});
```

콜백을 남발하면 위와 같이 가독성이 나빠지는데, 이러한 형태를 콜백지옥이라고 부른다. 웬만하면 지양해야한다.

#### `Promise`

Promise는 콜백 지옥의 방안으로 ES6에 도입된 기능이다.
위에서 콜백함수를 사용하여 만든 코드를 Promise로 바꿔보자.

```
function increase(number) {
    const promise = new Promise((resolve, reject) => {
        // resolve: 성공 reject: 실패
        setTimeout(() => {
            const result = number + 10;
            if(result > 30) {
                // 50보다 높으면 에러 발생
                const e = new Error("NumberTooBig");
                return reject(e);
            }
            resolve(result); // number값에 +10 후 성공 처리
        },1000);
    });
    return promise;
}

increase(0)
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .then(number => {
        console.log(number);
        return increase(number);
    })
    .catch(e => {
        // 도중에 에러가 발생하면 .catch를 통해 알 수 있다.
        // 에러 시 동작을 멈춘다.
        console.log(e);
    });

```

콜백함수보다 훨씬 가독성이 높아졌고, 더불어 에러처리도 할 수 있게 되었다.

#### `async/await`

async/await은 Promise를 더욱 쉽게 사용할 수 있도록 해주는 ES8문법이다.
이 문법을 사용하려면 함수의 앞부분에 async 키워드를 추가하고, 해당 함수 내부에서 Promise의 앞부분에 await 키워드를 사용한다. 이렇게 하면 Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```
function increment(number) {
    const promise = new Promise((resolve, reject) => {
        // resolve: 성공 reject: 실패
        setTimeout(() => {
            const result = number + 10;
            if(result > 30) {
                // 50보다 높으면 에러 발생
                const e = new Error("NumberTooBig");
                return reject(e);
            }
            resolve(result); // number값에 +10 후 성공 처리
        },1000);
    });
    return promise;
}

async function runTasks() {
    try { // try/catch 구문을 사용하여 에러처리
        let result = await increment(0);
        console.log(result);
        result = await increment(result);
        console.log(result);
        result = await increment(result);
        console.log(result);
        result = await increment(result);
        console.log(result);
        result = await increment(result);
        console.log(result);
        result = await increment(result);
    } catch(e) {
        console.log(e);
    }
}

runTasks();
```

<hr>

## axois로 API 호출해서 데이터 받아오기

axios는 현재 가장 많이 사용되는 HTTP 클라이언트 라이브러리이다.<br>
특징은 Promise를 기반으로 처리한다는 점이다.

비슷한 라이브러리인 Fetch API와의 차이점은 아래와 같다.

<ol>
    <li>구형 브라우저 지원</li>
    <li>요청 중단 가능</li>
    <li>응답 시간 초과 설정</li>
    <li>CSRF 보호 기능 내장</li>
    <li>JSON 데이터 자동 변환</li>
</ol>

`사용법`

기본 사용법은 jQuery의 ajax와 비슷하다.

```
    axois({
        url: 'https://localhost/api...',
        method: 'get,
        data: {
            text : 'text'
        }
    });

    axios.get();
    axios.post();
    axios.delete();
    ...
```

하지만 대부분 위의 방법보다 Promise나 async/await을 이용한 방법으로 사용한다.

```

    // Promise 구문을 사용한 방법
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
       return response.data;
    });

    // async/await 구문을 사용한 방법
    const getData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1);
            return resopose.data;
        } catch(e) {
            console.error(e);
        }
    };
```
