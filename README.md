# Проект: Место

## Обзор
### I. Разрешение экрана:
* Версия для компьютера 1280px;
* Переходное значение 680px;
* Мобильная версия 320px; <br>

### II. HTML, CSS

* Секция header состоит из логотипа который меняется при наведении (псевдокласс hover) на черный цвет.
* Секция profile сверстана с помощью свойства flex. Кнопки при наведении (псевдокласс hover) становятся прозрачнее с помощью свойства opacity, время анимации задано с помощью свойства transition. При изменении разрешения на 680px и ниже, секция переходит с строчного вида в колонку.
* Секция places сверстана с помощью свойства grid и имееет структуру списка. При уменьшении разрешения меняется количество карточек в строку. При 1280px - 3 карточки, 880px - 2 карточки, 680px - 1 карточка. Размер карточки имеет точный размер и не изменяется при разных разрешениях. Карточки добавлены через template.
* Секция footer имеет только один параграф.
* Чтобы все модальные окна открывались плавно были применены свойство transition с помощью которого можно задать длительность работы и opacity с помощью которого задаётся прозрачность.<br>

### III. JavaScript

* При нажатии на кнопку profile__button появляется окошко popup, а при нажатии на крестик окошко скрывается. Это стало возможным с помощью метода addEventListener и метода togglePopup() класса FormValidator в которой добавляется и убирается класс с display:none при клике мышкой по кнопке.
* В окошке popup находятся поля ввода (input) при изменении которых происходит изменение текста имени и профессии с помощью свойства textContent. С помощью свойства value мы собираем значения с поля ввода. При отправки формы пользуемся событием submit.
* Карточки добавляются JavaScript из массива
* При нажатии на кнопку .profile__add-button появляется popup с помощью которого можно добавить новую карточку вводя собственные данные через форму.
* Карточки можно лайкать достаточно нажать на сердечко. Это было реализовано при помощи интерфейса event и нажатия обработчика события addEventListener('click').
* Карточку можно удалить нажав на иконку корзины. При нажатии срабатывает обработчик события addEventListener('click') и при помощи метода remove() удаляется нужная карточка.
* Нажав на картинку карточки можно отдельно увидеть картинку с названием. Для этого были применены: обработчик события addEventListener('click'), интерфейс event.
* Сделана валидация форм с использыванием стандартных браузерных текстов ошибок.
* Добавлено закрытие модальных окон с помощью кнопки Esc и нажатия на оверлей.

* Был произведен рефакторинг кода. Создано семь классов:
  +    Card - отвечает за создание карточек
  +    FormValidator - отвечает за валидацию форм
  +    Popup - открытие и закрытие модального окна
  +    PopupWithForm - работа с модальными окнами
  +    PopupWithImage - открытие модального окна карточки
  +    Section -отрисовка элементов на странице
  +    UserInfo - управление отображением информации о пользователе на странице
* За сборку модулей отвечает Webpack.
* Преобразованием кода в более ранние версии браузеров занимается компилятор Babel.

**Ссылки**

* [Ссылка на макет в Figma (вёрстка)](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Ссылка на макет в Figma (JS часть 1)](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)
* [Ссылка на макет в Figma (JS часть 2)](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1)

* [Ссылка на страницу](https://ninam2013.github.io/mesto/)
