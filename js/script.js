"use strict";
//IIFE
(() => {
  class Card {
    constructor(name, link, likeLength, idCard, developerName, likesName) {
      this.name = name;
      this.link = link;
      this.idCard = idCard;
      this.likesLength = likeLength;
      this.developerName = developerName;
      this.likesName = likesName;
      this.cardDom = this.create();
      this.cardDom.addEventListener("click", this.like);
      this.cardDom.addEventListener("click", this.remove);
    }
    create() {
      const placeCard = document.createElement("div");
      placeCard.classList.add("place-card");
      placeCard.id = this.idCard;

      const placeCardImage = document.createElement("div");
      placeCardImage.classList.add("place-card__image");
      placeCardImage.style.backgroundImage = "url(" + this.link + ")";
      placeCard.appendChild(placeCardImage);

      const placeCardDeleteIcon = document.createElement("button");
      placeCardDeleteIcon.classList.add("place-card__delete-icon");
      placeCardImage.appendChild(placeCardDeleteIcon);

      const placeCardDescription = document.createElement("div");
      placeCardDescription.classList.add("place-card__description");
      placeCard.appendChild(placeCardDescription);

      const placeCardName = document.createElement("h3");
      placeCardName.classList.add("place-card__name");
      placeCardName.textContent = this.name;
      placeCardDescription.appendChild(placeCardName);

      const likeIconAndNumber = document.createElement("div");
      likeIconAndNumber.classList.add("place-card__like-number");
      placeCardDescription.appendChild(likeIconAndNumber);

      const placeCardLikeIcon = document.createElement("button");
      placeCardLikeIcon.classList.add("place-card__like-icon");
      likeIconAndNumber.appendChild(placeCardLikeIcon);

      const placeCardLikeNumber = document.createElement("div");
      placeCardLikeNumber.classList.add("place-card__number");
      placeCardLikeNumber.textContent = this.likesLength;
      likeIconAndNumber.appendChild(placeCardLikeNumber);
      return placeCard;
    }

    like(event) {
      if (event.target.classList.contains("place-card__like-icon")) {
        const placeCard = event.target.parentNode.parentNode.parentNode;
        const likesOnServer = event.target.parentNode.querySelector(
          ".place-card__number"
        );

        const doLike = new Api(url, token, placeCard.id); // Добавление лайка
        // удаление лайка
        let activeLike = event.target.classList.toggle(
          "place-card__like-icon_liked"
        );
        if (activeLike) {
          doLike.likeCard().then(result => {
            likesOnServer.textContent = result.likes.length;
          });
        } else {
          doLike.delLike().then(result => {
            likesOnServer.textContent = result.likes.length;
          });
        }
      }
    }

    remove(event) {
      if (event.target.classList.contains("place-card__delete-icon")) {
        const delIcon = event.target;
        const imgCard = delIcon.parentNode;
        const placeCard = imgCard.parentNode;

        let result = window.confirm(
          "Вы действительно хотите удалить эту картинку?"
        );
        if (result) {
          const delCardApi = new Api(url, token, placeCard.id);
          delCardApi.delCard().then(res => {
            if (res.ok) {
              placeCard.parentNode.removeChild(placeCard);
            } else {
              alert("Это не моя картинка!");
            }
          });
        }
      }
    }
  }

  class CardList {
    constructor(container, arrayCards) {
      this.container = container;
      this.arrayCards = arrayCards;
      this.cards = [];
      this.addcard();
    }

    addcard() {
      for (let i = 0; i < this.arrayCards.length; i++) {
        const card = new Card(
          this.arrayCards[i].name,
          this.arrayCards[i].link,
          this.arrayCards[i].likes.length,
          this.arrayCards[i]._id,
          this.arrayCards[i].owner.name,
          this.arrayCards[i].likes
        );
        // при загрузке активные мои иконки лайка

        card.likesName.forEach(element => {
          if (element.name === "Denis Romanenko") {
            card.cardDom
              .querySelector(".place-card__like-icon")
              .classList.add("place-card__like-icon_liked");
          }
        });
        // при загрузке активные мои иконки удаления
        if (card.developerName === "Denis Romanenko") {
          const doDelIconActiv = card.cardDom.querySelector(
            ".place-card__delete-icon"
          );
          doDelIconActiv.style.display = "block";
          this.cards.push(card.cardDom);
        } else {
          this.cards.push(card.cardDom);
        }
      }
      return this.cards;
    }
    render() {
      this.cards.forEach(element => {
        this.container.appendChild(element);
      });
    }
  }

  class Popup {
    constructor(
      textTitle,
      nameForm,
      inputNameId,
      inputNamePlaceholder,
      idPopupErrorName,
      inputType,
      inputLinkPlaceholder,
      inputMinlength,
      inputMaxlength,
      idPopupErrorLink,
      idPopupButton,
      buttonTextcontent,
      btnDefaul
    ) {
      this.body = this.popupBody(
        textTitle,
        nameForm,
        inputNameId,
        inputNamePlaceholder,
        idPopupErrorName,
        inputType,
        inputLinkPlaceholder,
        inputMinlength,
        inputMaxlength,
        idPopupErrorLink,
        idPopupButton,
        buttonTextcontent,
        btnDefaul
      );
    }

    popupBody(
      textTitle,
      nameForm,
      inputNameId,
      inputNamePlaceholder,
      idPopupErrorName,
      inputType,
      inputLinkPlaceholder,
      inputMinlength,
      inputMaxlength,
      idPopupErrorLink,
      idPopupButton,
      buttonTextcontent,
      btnDefaul
    ) {
      const popup = document.createElement("div");
      popup.classList.add("popup");

      const popupContent = document.createElement("div");
      popupContent.classList.add("popup__content");
      popup.appendChild(popupContent);

      const popupClaseImg = document.createElement("img");
      popupClaseImg.classList.add("popup__close");
      popupClaseImg.src = "./images/close.svg";
      popupClaseImg.alt = "close";
      popupContent.appendChild(popupClaseImg);

      const popupTitle = document.createElement("h3");
      popupTitle.classList.add("popup__title");
      popupTitle.textContent = textTitle; //менять (новое место) || (редактировать профиль)
      popupContent.appendChild(popupTitle);

      const popupForm = document.createElement("form");
      popupForm.classList.add("popup__form");
      popupForm.name = nameForm; // менять (new || edit)
      popupContent.appendChild(popupForm);

      const labelName = document.createElement("label");
      popupForm.appendChild(labelName);

      const inputName = document.createElement("input");
      inputName.classList.add("popup__input");
      inputName.classList.add("popup__input_type_name");
      inputName.id = inputNameId; //менять (popup-name || "")
      inputName.type = "text";
      inputName.name = "name";
      inputName.placeholder = inputNamePlaceholder; // менять (название) ||( имя)
      inputName.autocomplete = "off";
      inputName.setAttribute("minlength", "2");
      inputName.setAttribute("maxlength", "30");
      inputName.setAttribute("required", "");
      labelName.appendChild(inputName);

      const popupErrorName = document.createElement("span");
      popupErrorName.classList.add("popup__error");
      popupErrorName.id = idPopupErrorName; // менять (new-error-name) || (error-name)
      labelName.append(popupErrorName);

      const labelLink = document.createElement("label");
      popupForm.appendChild(labelLink);

      const inputlink = document.createElement("input");
      inputlink.classList.add("popup__input");
      inputlink.classList.add("popup__input_type_link-url");
      inputlink.id = "popup-link";
      inputlink.type = inputType; //менять  (url) || (text)
      inputlink.name = "link";
      inputlink.placeholder = inputLinkPlaceholder; // менять (Ссылка на картинку) (О себе)
      inputlink.autocomplete = "off";
      inputlink.setAttribute("minlength", inputMinlength); //minlength = inputMinlength; // менять "" || 2
      inputlink.setAttribute("maxlength", inputMaxlength); // менять "" || 30
      inputlink.setAttribute("required", "");
      labelLink.appendChild(inputlink);

      const popupErrorLink = document.createElement("span");
      popupErrorLink.classList.add("popup__error");
      popupErrorLink.id = idPopupErrorLink; //менять (new-error-link) || (error-job)
      labelLink.append(popupErrorLink);

      const button = document.createElement("button");
      button.classList.add("button");
      button.classList.add("popup__button");
      button.id = idPopupButton; // менять (popup-button) || (form-edit)
      button.disabled = btnDefaul; // менять true || false
      button.textContent = buttonTextcontent; // поменять ('+") || (Сохранить)
      popupForm.appendChild(button);

      return popup;
    }

    renderPopup() {
      const root = document.querySelector(".root");
      root.appendChild(this.body);
    }
    anRenderPopup() {
      const root = document.querySelector(".root");
      const popupEdit = document.querySelector(".popup");
      root.removeChild(popupEdit);
    }
    openPopup() {
      const popup = document.querySelector(".popup");
      popup.classList.add("popup_is-opened");
    }
    closePopup() {
      const popup = document.querySelector(".popup");
      popup.classList.remove("popup_is-opened");
    }

    popupInfoDefault() {
      const name = document.querySelector(".user-info__name");
      const job = document.querySelector(".user-info__job");
      const form = document.forms.edit;

      form.elements.name.value = name.textContent;
      form.elements.link.value = job.textContent;
    }

    patchProfile(form) {
      const formName = form.elements.name;
      const formAboutMyself = form.elements.link;

      let profile = {
        name: formName.value,
        about: formAboutMyself.value
      };
      return profile;
    }
    postProfile(form) {
      const formName = form.elements.name;
      const formAboutMyself = form.elements.link;

      let profile = {
        name: formName.value,
        link: formAboutMyself.value
      };
      return profile;
    }

    renderLoading(isLoading) {
      const loading = document.querySelector(".popup__button");
      if (isLoading) {
        loading.textContent = "Загрузка...";
      } else {
        loading.textContent = "Сохранить";
      }
    }
    renderLoadingNew(isLoading) {
      const loading = document.querySelector(".popup__button");
      if (isLoading) {
        loading.textContent = "Загрузка...";
      } else {
        loading.textContent = "+";
      }
    }
  }
  class PopupProfile extends Popup {
    constructor() {
      super();
      this.body = this.popupProfileBody();
    }
    popupProfileBody() {
      const body = `<div class="popup">
      <div class="popup__content">
        <img src="./images/close.svg" alt="" class="popup__close" />
        <h3 class="popup__title">Обновить аватар</h3>
        <form class="popup__form" name="avatar">
        <label>
          <input
            id="popup-link"
            type="url"
            name="link"
            class="popup__input popup__input_type_link-url"
            placeholder="Ссылка на аватар"
            autocomplete="off"
            pattern="https://.*"
            required
          />
          <span class="popup__error" id="new-error-link"></span>
          </label>
          <button
            id="popup-button"
             disabled="true"
            class="button popup__button popup__button-avatar"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>`;
      let element = document.createElement("div");
      element.insertAdjacentHTML("beforeend", body.trim());
      return element.firstChild;
    }
    renderPopupProfile() {
      const root = document.querySelector(".root");
      root.appendChild(this.body);
    }
    openPopupProfile() {
      super.openPopup();
    }
    renderLoadingAvatar(isLoading) {
      super.renderLoading(isLoading);
    }
    pathProfileAvatar(form) {
      const formLink = form.elements.link;
      let profile = {
        avatar: formLink.value
      };
      return profile;
    }
  }

  class XXLImage {
    fullscreenImageOpen(event) {
      const fullscreenImage = document.querySelector(".image-fullscreen");
      const src = event.target.style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "");
      document.getElementById("fullscreen").src = src;
      fullscreenImage.classList.add("image-fullscreen_is-opened");
    }
    fullscreenImageClose() {
      const fullscreen = document.querySelector(".image-fullscreen");
      fullscreen.classList.remove("image-fullscreen_is-opened");
    }
  }

  class ValidForms {
    btnActive(form) {
      const btn = form.querySelector("button");
      btn.style.backgroundColor = "#000000";
      btn.style.color = "#ffffff";
      btn.disabled = false;
      btn.style.cursor = "pointer";
    }
    btnInactive(form) {
      const btn = form.querySelector("button");
      btn.style.backgroundColor = "#ffffff";
      btn.style.color = "rgba(0, 0, 0, 0.2)";
      btn.disabled = true;
      btn.style.cursor = "auto";
    }
    validityForm(form) {
      if (form.checkValidity()) {
        validity.btnActive(form);
      } else {
        validity.btnInactive(form);
      }
    }
    validityInputEdit(name, error) {
      if (!name.checkValidity()) {
        if (event.target.value.length === 0) {
          error.textContent = "Это обязательное поле";
        } else {
          if (event.target.validity.tooShort) {
            error.textContent = "Должно быть от 2 до 30 символов";
          } else {
            error.textContent = "";
          }
        }
      } else error.textContent = "";
    }
    validityInputUrl(name, error) {
      if (event.target.value.length === 0) {
        error.textContent = "Это обязательное поле";
      } else {
        if (!event.target.checkValidity()) {
          error.textContent = "Это должна быть ссылка";
        } else {
          error.textContent = "";
        }
      }
    }
  }

  class Api {
    constructor(url, token, ipCards) {
      this.url = url;
      this.token = token;
      this.ipCards = ipCards;
    }
    getProfile() {
      return fetch(`${this.url}/users/me`, {
        method: "GET",
        headers: { authorization: `${this.token}` }
      })
        .then(res => {
          if (res.ok) {
            return Promise.resolve(res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })

        .catch(err => {
          console.log(err);
        });
    }
    getCards() {
      return fetch(`${this.url}/cards`, {
        method: "GET",
        headers: { authorization: `${this.token}` }
      })
        .then(res => {
          if (res.ok) {
            return Promise.resolve(res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })

        .catch(err => {
          console.log(err);
        });
    }
    postCards(data) {
      return fetch(`${this.url}/cards`, {
        method: "POST",
        headers: {
          authorization: `${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            return Promise.resolve(res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
    delCard() {
      return fetch(`${this.url}/cards/${this.ipCards}`, {
        method: "DELETE",
        headers: {
          authorization: `${this.token}`,
          "Content-Type": "application/json"
        }
      });
    }
    likeCard() {
      // likeCard более читаемо
      return fetch(`${this.url}/cards/like/${this.ipCards}`, {
        method: "PUT",
        headers: {
          authorization: `${this.token}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.ok) {
            return Promise.resolve(res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })

        .catch(err => {
          console.log(err);
        });
    }
    delLike() {
      return fetch(`${this.url}/cards/like/${this.ipCards}`, {
        method: "DELETE",
        headers: {
          authorization: `${this.token}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.ok) {
            return Promise.resolve(res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })

        .catch(err => {
          console.log(err);
        });
    }
    setAvatar(data) {
      return fetch(`${this.url}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: `${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            return Promise.resolve(res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
    updateProfile(data) {
      return fetch(`${this.url}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: `${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  }

  //-------- запрос ---------
  const url = "http://95.216.175.5/cohort2";
  const token = "405e1703-0e09-4ead-ad1e-c5465f11f208";
  const api = new Api(url, token);

  // получил первоначальный профиль с сервера
  api.getProfile().then(result => {
    document.querySelector(".user-info__name").textContent = result.name;
    document.querySelector(".user-info__job").textContent = result.about;
    document.querySelector(".user-info__photo").style.backgroundImage =
      "url(" + result.avatar + ")";
  });
  // получил карты с сервера
  api.getCards().then(result => {
    const cardList = new CardList(
      document.querySelector(".places-list"),
      result
    );
    cardList.render();
  });

  //------------

  // переменные
  const root = document.querySelector(".root");
  const xxlImage = new XXLImage();
  const validity = new ValidForms();
  // создал 2 popup

  const popupNew = new Popup(
    "Новое место",
    "new",
    "popup-name",
    "Название",
    "new-error-name",
    "url",
    "Ссылка на картинку",
    "0",
    "",
    "new-error-link",
    "popup-button",
    "+",
    true
  );
  const popupEdit = new Popup(
    "Редактировать профиль",
    "edit",
    "",
    "Имя",
    "error-name",
    "text",
    "О себе",
    "2",
    "30",
    "error-job",
    "form-edit",
    "Сохранить",
    false
  );
  const popupProfile = new PopupProfile();

  //-----------------
  //// слушатели ///
  root.addEventListener("click", function(event) {
    // popup изменения аватара
    if (event.target.classList.contains("user-info__photo")) {
      popupProfile.renderPopupProfile();
      popupProfile.openPopupProfile();

      const form = document.forms.avatar;
      form.addEventListener("input", function(event) {
        event.preventDefault();
        const link = form.elements.link;
        const errorLink = form.querySelector("#new-error-link");
        validity.validityForm(form);
        if (event.target === link) {
          validity.validityInputUrl(link, errorLink);
        }
      });
      const submitAvatar = event => {
        event.preventDefault();
        popupProfile.renderLoadingAvatar(true);
        let profileAvatar = popupProfile.pathProfileAvatar(form);

        api.setAvatar(profileAvatar).then(result => {
          // отдельно от класса
          document.querySelector(".user-info__photo").style.backgroundImage =
            "url(" + result.avatar + ")";
          console.log(result.avatar);
          popupProfile.renderLoadingAvatar(false); //отмана "загузка..."

          popupNew.closePopup();
          form.reset();
          popupNew.anRenderPopup();
        });

        form.removeEventListener("submit", submitAvatar);
      };
      form.addEventListener("submit", submitAvatar);
    }

    if (event.target.classList.contains("user-info__button")) {
      //работа  с popup NEW
      popupNew.renderPopup();
      popupNew.openPopup();

      const form = document.forms.new;
      // validat----------------

      form.addEventListener("input", function(event) {
        event.preventDefault();

        const name = form.elements.name;
        const link = form.elements.link;
        const errorName = form.querySelector("#new-error-name");
        const errorLink = form.querySelector("#new-error-link");
        validity.validityForm(form);

        if (event.target === name) {
          validity.validityInputEdit(name, errorName);
        }

        if (event.target === link) {
          validity.validityInputUrl(link, errorLink);
        }
      });
      ///-------------- добавление картинки
      const submitNew = event => {
        event.preventDefault();
        popupNew.renderLoadingNew(true); // загрузка
        let profile = popupEdit.postProfile(form);

        // положил на сервер -> отрисовал
        api
          .postCards(profile)
          .then(result => {
            console.log(result);
            const placesList = document.querySelector(".places-list");
            const cardExtra = new Card(
              result.name,
              result.link,
              result.likes.length,
              result._id
            );
            // иконка удаления активна
            const doDelIconActivExtra = cardExtra.cardDom.querySelector(
              ".place-card__delete-icon"
            );
            doDelIconActivExtra.style.display = "block";
            placesList.appendChild(cardExtra.cardDom);
          })
          .then(() => {
            popupNew.renderLoadingNew(false); //отмана "загузка..."

            popupNew.closePopup();
            form.reset();
            popupNew.anRenderPopup();
          });

        form.removeEventListener("submit", submitNew); // Хорошо
      };
      form.addEventListener("submit", submitNew);
    }

    if (event.target.classList.contains("user-info__button-edit")) {
      // работа с popup EDIT
      popupEdit.renderPopup();
      popupEdit.openPopup();
      popupEdit.popupInfoDefault(); // по умолчанию
      const form = document.forms.edit;

      // validat----------------
      form.addEventListener("input", function(event) {
        event.preventDefault();

        const name = form.elements.name;
        const link = form.elements.link;
        const errorName = form.querySelector("#error-name");
        const errorLink = form.querySelector("#error-job");

        validity.validityForm(form);
        if (event.target === name) {
          validity.validityInputEdit(name, errorName);
        }

        if (event.target === link) {
          validity.validityInputEdit(link, errorLink);
        }
      });
      //-------- изменение профиля
      const submitEdit = event => {
        event.preventDefault();
        popupEdit.renderLoading(true); /// "загрузка..."
        //---- Запись на сервер профиля и считывание для отображения
        let profile = popupEdit.patchProfile(form);

        api.updateProfile(profile).then(() => {
          api.getProfile().then(result => {
            document.querySelector(".user-info__name").textContent =
              result.name;
            document.querySelector(".user-info__job").textContent =
              result.about;
            document.querySelector(".user-info__photo").style.backgroundImage =
              "url(" + result.avatar + ")";
            popupEdit.closePopup();
            popupEdit.renderLoading(false);
            popupEdit.anRenderPopup();
          });
        });
        //----

        form.removeEventListener("submit", submitEdit);
      };
      form.addEventListener("submit", submitEdit);
    }
    // закрытие
    if (
      event.target.classList.contains("popup__close") &&
      event.target.parentNode.classList.contains("image-fullscreen__content")
    ) {
      xxlImage.fullscreenImageClose(event);
    } else if (
      event.target.classList.contains("popup__close") &&
      document.querySelector(".popup__title").textContent === "Новое место"
    ) {
      popupNew.closePopup();
      popupNew.anRenderPopup();
    } else if (
      event.target.classList.contains("popup__close") &&
      document.querySelector(".popup__title").textContent ===
        "Редактировать профиль"
    ) {
      popupEdit.closePopup();
      popupEdit.anRenderPopup();
    } else if (
      event.target.classList.contains("popup__close") &&
      document.querySelector(".popup__title").textContent === "Обновить аватар"
    ) {
      popupEdit.closePopup();
      popupEdit.anRenderPopup();
    }
    // открытие большой карты
    if (event.target.classList.contains("place-card__image")) {
      xxlImage.fullscreenImageOpen(event);
    }
  });
})();
