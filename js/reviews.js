// функция которая будет менять содержимое отзывов по клику. берем правый контейнер кликаем и в левом отображаем отзывы другого контейнера

function switchReview() {
    const rightContainer = document.querySelector('.reviews-container-review');
    const leftContainer = document.querySelector('.reviews-container-reviews');
    const rightContainerContent = rightContainer.innerHTML;
    const leftContainerContent = leftContainer.innerHTML;
    rightContainer.innerHTML = leftContainerContent;
    leftContainer.innerHTML = rightContainerContent;
}

document.addEventListener('click', switchReview);