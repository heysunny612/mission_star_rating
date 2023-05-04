// do something!

// 최대 갯수를 넘지 않는 별DOM 생성 후 리턴
const makeStarRatingDOM = (maxRating) => {
  const $starRatingCon = document.createElement('div');
  $starRatingCon.className = 'star-rating-container';

  for (let i = 0; i < maxRating; i++) {
    const $star = document.createElement('i');
    $star.dataset.id = i + 1;
    $star.className = 'bx bxs-star';
    $starRatingCon.appendChild($star);
  }
  return $starRatingCon;
};

//공통 이벤트
//이벤트는 동일, 클래스명만 달라 인수로 넘겨줌
const onStarEvent = (event, className) => {
  const $stars = Array.from(event.currentTarget.children);
  const starId = event.target.dataset.id;
  $stars.forEach((star) => {
    if (star.dataset.id <= starId) {
      star.classList.add(className);
    } else {
      star.classList.remove(className);
    }
  });
};
//커스텀 이벤트생성
const onCustomEvent = (event, $container) => {
  const starScore = event.target.dataset.id;
  const customEvent = new CustomEvent('rating-change', {
    detail: starScore,
  });
  $container.dispatchEvent(customEvent);
};


const setEventListeners = ($container) => {
  const $starRatingCon = $container.children[0];
//클릭시 이벤트 (이벤트 위임사용)
  $starRatingCon.addEventListener('click', (event) => {
    if (event.target.className == 'star-rating-container') return; //불필요한 이벤트 early return
    onStarEvent(event, 'selected');
    onCustomEvent(event, $container);
  });

  //마우스오버시 이벤트
  $starRatingCon.addEventListener('mouseover', (event) =>
    onStarEvent(event, 'hovered')
  );
};

// maxRating에 값이 없거나 0 일경우
const informError = (maxRating) => {
  if (maxRating === '0' || maxRating === '') {
    throw new Error(
      `Star-rating 컴포넌트의 max-rating 어트리뷰트 값은 1 이상이어야 합니다.`
    );
  }
};

const StarRating = ($container) => {
  const maxRating = $container.dataset.maxRating;

  const $starRatingCon = makeStarRatingDOM(maxRating);
  $container.appendChild($starRatingCon);

  informError(maxRating);
  setEventListeners($container);
};

export default StarRating;
