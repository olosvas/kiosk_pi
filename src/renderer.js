// src/renderer.js
window.addEventListener('DOMContentLoaded', () => {
  const i18n = require('i18next');
  const en = require('../locales/en.json');
  const sk = require('../locales/sk.json');

  let lang = 'en';

  const drinks = [
    {
      id: 'drink1',
      name: { sk: 'Pilsner', en: 'Pilsner' },
      imageUrl: 'https://via.placeholder.com/100',
      alcoholic: true,
      availableVolumes: [300, 500],
      stock: 50000,
      gpio: { relayPin: 17, flowSensorPin: 27 }
    },
    {
      id: 'drink2',
      name: { sk: 'Kofola', en: 'Kofola' },
      imageUrl: 'https://via.placeholder.com/100',
      alcoholic: false,
      availableVolumes: [300, 500],
      stock: 30000,
      gpio: { relayPin: 22, flowSensorPin: 23 }
    }
  ];

  const cart = [];

  function renderDrinks() {
    const grid = document.getElementById('drink-grid');
    grid.innerHTML = '';
    drinks.forEach(drink => {
      const item = document.createElement('div');
      item.className = 'drink';
      item.innerHTML = `
        <img src="${drink.imageUrl}" />
        <h3>${drink.name[lang]}</h3>
        ${drink.availableVolumes.map(v => `<button onclick="addToCart('${drink.id}', ${v})">${v} ml</button>`).join('<br>')}
      `;
      grid.appendChild(item);
    });
  }

  window.addToCart = (id, volume) => {
    const index = cart.findIndex(i => i.id === id && i.volume === volume);
    if (index >= 0) cart[index].quantity += 1;
    else cart.push({ id, volume, quantity: 1 });
    renderCart();
  };

  function renderCart() {
    const container = document.getElementById('cart');
    container.innerHTML = '<h2>Cart</h2>';
    cart.forEach((item, idx) => {
      const drink = drinks.find(d => d.id === item.id);
      const div = document.createElement('div');
      div.innerHTML = `
        ${drink.name[lang]} ${item.volume}ml
        <button onclick="updateCart(${idx}, -1)">−</button>
        ${item.quantity}
        <button onclick="updateCart(${idx}, 1)">+</button>
      `;
      container.appendChild(div);
    });
  }

  window.updateCart = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    renderCart();
  };

  window.setLang = (lng) => {
    lang = lng;
    document.getElementById('title').textContent = lng === 'sk' ? sk.title : en.title;
    renderDrinks();
    renderCart();
  };

  setLang('en');
});
