# [제로베이스 자바스크립트 미션과제] 3. 별점  

<p align="center">
    <img src="https://user-images.githubusercontent.com/127499117/236470342-4d28b0c3-48ca-404f-88d9-078f1f16afa3.gif" alt="2312">
</p>


> STAR DOM을 생성할 때, 앞 전에 배운 dataset을 사용하여, id의 값을 index로 부여해 주었는데, DOM의 length로도 접근할 수 있을 것 같다는 아이디어가 전부 구현하고 생각났다!.. 그래도 dataset도 한 번 더 복습해 볼 수 있는 시간이었고... 내게 너무 그저 '생소'해서 시간을 많이 잡아먹었던 custom 이벤트도 공부하고 나서 적용해 보니... 별거? 아니었는데.. 많은 시간을 들인 거 같아서 조금 허무했다.(웃음) STAR DOM에 전부 onclick 이벤트를 주지 않고 부모 요소에 이벤트를 한 번만 주는 이벤트 위임을 사용하여 구현하였다. 

<br/>
<br/>

## 새로 배운 것들

 <br/>

```js
const setEventListeners = ($container) => {
  const $starRatingCon = $container.children[0];
  //클릭시 이벤트 (이벤트 위임사용)
  $starRatingCon.addEventListener('click', (event) => {
    //불필요한 이벤트 early return
    if (event.target.className == 'star-rating-container') return;
    onStarEvent(event, 'selected');
    onCustomEvent(event, $container);
  });

  //마우스오버시 이벤트
  $starRatingCon.addEventListener('mouseover', (event) =>
    onStarEvent(event, 'hovered')
  );
};
```

## 1.이벤트 위임 
- 가령 사용자가 웹페이지의 어떤 네비게이션을 클릭할 때마다, 특정 이벤트가 발생한다고하면, 클릭 대상이되는 요소에 이벤트를 등록 할 수 있다. 만일 그 요소가 100개라면 100개의 이벤트 핸들러를 등록해야한다. 이 경우, 많은 DOM요소에 이벤트 핸들러를 등록하므로 성능 저하의 원인이 될 뿐더라 유지보수에도 부적합한 코드를 생산하게 된다.

- 이벤트 위임은(Event delegation)은 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신 하나의 상위 DOM요소에 이벤트 핸들러를 등록하는 방법이다. (이것은 이벤트 전파를 통해 가능하다.) 

 <br/>

```js
const setEventListeners = ($container) => {
  const $starRatingCon = $container.children[0];
  //클릭시 이벤트 (이벤트 위임사용)
  $starRatingCon.addEventListener('click', (event) => {
    //불필요한 이벤트 early return
    if (event.target.className == 'star-rating-container') return;
    onStarEvent(event, 'selected');
    onCustomEvent(event, $container);
  });

  //마우스오버시 이벤트
  $starRatingCon.addEventListener('mouseover', (event) =>
    onStarEvent(event, 'hovered')
  );
};
```





 
 ## 2.customEvent 커스텀이벤트 생성 
 - 이벤트가 발생하면 이벤트에 관련한 다양한 정보를 담고 있는 이벤트 객체가 동적으로 생성된다. 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다. 이벤트가 발생하면 암묵적으로 생성되는 이벤트 객체는 발생한 이벤트의 종류에 따라 이벤트 타입이 결정되지만, Event, UIEvent, MouseEvent 같은 이벤트 생성자 함수를 호출하여 명시적으로 생성한 이벤트 객체는 임의의 이벤트 타입을 정할 수 있다. 이처럼 개발자의 의도로 생성된 이벤트를 커스텀 이벤트라한다.  이때 이벤트 타입을 나타내는 문자열은 기존 이벤트 타입을 사용할 수 도있고, 기존 이벤트 타입이 아닌 임의의 문자열을 사용하여 새로운 이벤트 타입을 지정할 수 도 있다.

 <br/>
 
 ## 3.dispathchEvent커스텀이벤트 디스패치
- 생성된 커스텀 이벤트는 dispatchEvent 메서드로 디스패치(이벤트를 발생시키는 행위)할 수 있다. dispatchEvent 메서드에 이벤트 객체를 인수로 전달하면서 호출하면 인수로 전달한 이벤트 타입의 이벤트가 발생한다. 
<br/>

 
