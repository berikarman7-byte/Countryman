const countries = [
  {name:"Казахстан",capital:"Астана",gdp:260,pop:20,military:75,resource:"Нефть, газ, уран"},
  {name:"США",capital:"Вашингтон",gdp:27000,pop:334,military:100,resource:"Нефть, технологии"},
  {name:"Китай",capital:"Пекин",gdp:17700,pop:1410,military:95,resource:"Промышленность"},
  {name:"Россия",capital:"Москва",gdp:2000,pop:144,military:90,resource:"Газ, нефть"},
  {name:"Германия",capital:"Берлин",gdp:4400,pop:84,military:75,resource:"Технологии"},
  {name:"Франция",capital:"Париж",gdp:3000,pop:68,military:80,resource:"Промышленность"},
  {name:"Великобритания",capital:"Лондон",gdp:3300,pop:68,military:85,resource:"Финансы"},
  {name:"Япония",capital:"Токио",gdp:4200,pop:124,military:75,resource:"Технологии"},
  {name:"Индия",capital:"Нью-Дели",gdp:3700,pop:1420,military:85,resource:"Текстиль, технологии"},
  {name:"Турция",capital:"Анкара",gdp:1100,pop:85,military:80,resource:"Промышленность"},
  {name:"Венгрия",capital:"Будапешт",gdp:210,pop:10,military:45,resource:"Машиностроение"},
  {name:"Италия",capital:"Рим",gdp:2200,pop:59,military:70,resource:"Промышленность"},
  {name:"Испания",capital:"Мадрид",gdp:1600,pop:48,military:65,resource:"Туризм"},
  {name:"Бразилия",capital:"Бразилиа",gdp:2100,pop:216,military:65,resource:"Сельское хозяйство"},
  {name:"Канада",capital:"Оттава",gdp:2100,pop:40,military:65,resource:"Нефть, газ"},
  {name:"Австралия",capital:"Канберра",gdp:1700,pop:27,military:65,resource:"Уголь, железо"},
  {name:"Южная Корея",capital:"Сеул",gdp:1700,pop:52,military:80,resource:"Электроника"},
  {name:"Саудовская Аравия",capital:"Эр-Рияд",gdp:1000,pop:36,military:75,resource:"Нефть"},
  {name:"ОАЭ",capital:"Абу-Даби",gdp:500,pop:10,military:65,resource:"Нефть, финансы"},
  {name:"Польша",capital:"Варшава",gdp:800,pop:38,military:70,resource:"Промышленность"},
  {name:"Украина",capital:"Киев",gdp:180,pop:37,military:75,resource:"Зерно"},
  {name:"Норвегия",capital:"Осло",gdp:580,pop:5,military:55,resource:"Нефть, газ"},
  {name:"Швеция",capital:"Стокгольм",gdp:590,pop:10,military:65,resource:"Технологии"},
  {name:"Нидерланды",capital:"Амстердам",gdp:1100,pop:18,military:55,resource:"Торговля"},
  {name:"Египет",capital:"Каир",gdp:400,pop:112,military:75,resource:"Суэцкий канал"},
  {name:"ЮАР",capital:"Претория",gdp:380,pop:62,military:55,resource:"Золото, алмазы"},
  {name:"Мексика",capital:"Мехико",gdp:1800,pop:129,military:60,resource:"Нефть"},
  {name:"Аргентина",capital:"Буэнос-Айрес",gdp:600,pop:46,military:50,resource:"Сельское хозяйство"},
  {name:"Индонезия",capital:"Джакарта",gdp:1400,pop:277,military:65,resource:"Уголь, газ"},
  {name:"Иран",capital:"Тегеран",gdp:400,pop:89,military:80,resource:"Нефть, газ"}
];

const projects = [
  {name:"Промышленный кластер",cost:800,months:5,effect:"gdp",amount:100},
  {name:"Железная дорога",cost:500,months:3,effect:"stability",amount:8},
  {name:"Национальный университет",cost:400,months:4,effect:"research",amount:15},
  {name:"Энергетический комплекс",cost:700,months:5,effect:"gdp",amount:150},
  {name:"Морской порт",cost:600,months:4,effect:"trade",amount:2},
  {name:"Цифровое правительство",cost:300,months:2,effect:"stability",amount:5}
];

let game = {
  country:countries[0],
  money:10000,
  gdp:260,
  population:20,
  army:50000,
  stability:75,
  research:10,
  tax:15,
  month:1,
  year:2026,
  relations:{},
  projects:[],
  completed:[],
  tension:20,
  tradeLinks:0
};

function showTab(id) {
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  render();
}

function money(n) {
  return Math.round(n).toLocaleString("ru-RU");
}

function render() {
  document.getElementById("countryInfo").innerHTML = `
    <div class="card">
      <h3>${game.country.name}</h3>
      Столица: ${game.country.capital}<br>
      Ресурсы: ${game.country.resource}
    </div>`;

  document.getElementById("stats").innerHTML = `
    <div class="card"><small>Бюджет</small><div class="value">${money(game.money)} млн</div></div>
    <div class="card"><small>ВВП</small><div class="value">${money(game.gdp)} млрд $</div></div>
    <div class="card"><small>Население</small><div class="value">${game.population} млн</div></div>
    <div class="card"><small>Армия</small><div class="value">${money(game.army)}</div></div>
    <div class="card"><small>Стабильность</small><div class="value">${game.stability}%</div></div>
    <div class="card"><small>Наука</small><div class="value">${game.research}</div></div>`;

  document.getElementById("goals").innerHTML = `
    <div class="card">💰 Накопить 15 000 млн: ${Math.min(100,Math.floor(game.money/15000*100))}%
    <div class="progress"><div style="width:${Math.min(100,game.money/15000*100)}%"></div></div></div>
    <div class="card">🏭 Развить ВВП до 500 млрд: ${Math.min(100,Math.floor(game.gdp/500*100))}%
    <div class="progress"><div style="width:${Math.min(100,game.gdp/500*100)}%"></div></div></div>`;

  document.getElementById("economyInfo").innerHTML = `
    <div class="card">
      Бюджет: ${money(game.money)} млн $<br>
      Налоговая ставка: ${game.tax}%<br>
      ВВП: ${money(game.gdp)} млрд $<br>
      Доход в месяц: ${money(game.gdp*game.tax/100*10)} млн $
    </div>`;

  document.getElementById("militaryInfo").innerHTML = `
    <div class="card">
      Солдаты: ${money(game.army)}<br>
      Военная мощь: ${game.country.military}/100<br>
      Расходы на армию: ${money(game.army*0.01)} млн $ в месяц
    </div>`;

  document.getElementById("diplomacyInfo").innerHTML = `
    <div class="card">
      Торговых соглашений: ${game.tradeLinks}<br>
      Мировая напряжённость: ${game.tension}%
    </div>`;

  document.getElementById("diplomacyCountry").innerHTML =
    countries.filter(c=>c.name!==game.country.name)
    .map(c=>`<option>${c.name}</option>`).join("");

  document.getElementById("projectsList").innerHTML =
    projects.map((p,i)=>`
      <div class="card">
        <h3>${p.name}</h3>
        Стоимость: ${p.cost} млн $<br>
        Срок: ${p.months} месяца<br>
        <button onclick="startProject(${i})">Начать проект</button>
      </div>`).join("")+
      `<h3>Активные проекты</h3>`+
      game.projects.map(p=>`<div class="card">${p.name}: осталось ${p.left} мес.</div>`).join("")+
      `<h3>Завершённые проекты</h3>`+
      game.completed.map(p=>`<div class="card">✅ ${p}</div>`).join("");

  document.getElementById("date").textContent =
    `Год ${game.year}, месяц ${game.month}`;
  renderCountries();
}

function renderCountries() {
  const query = (document.getElementById("searchCountry")?.value || "").toLowerCase();
  document.getElementById("countryList").innerHTML =
    countries.filter(c=>c.name.toLowerCase().includes(query))
    .map(c=>`
      <div class="country">
        <b>${c.name}</b><br>
        <small>Столица: ${c.capital}</small><br>
        <small>ВВП: ${c.gdp} млрд $</small><br>
        <button onclick="chooseCountry('${c.name}')">Выбрать страну</button>
      </div>`).join("");

  document.getElementById("worldMap").innerHTML =
    countries.map(c=>`<button class="map-marker" onclick="chooseCountry('${c.name}')">${c.name}</button>`).join("");
}

function chooseCountry(name) {
  const c = countries.find(x=>x.name===name);
  if (!confirm(`Начать новую игру за ${c.name}? Текущий прогресс будет сброшен.`)) return;

  game = {
    country:c,
    money:10000,
    gdp:c.gdp,
    population:c.pop,
    army:50000,
    stability:75,
    research:10,
    tax:15,
    month:1,
    year:2026,
    relations:{},
    projects:[],
    completed:[],
    tension:20,
    tradeLinks:0
  };
  saveGame();
  render();
  showTab("overview");
}

function changeTax(n) {
  game.tax = Math.max(0,Math.min(50,game.tax+n));
  render();
}

function invest() {
  if(game.money<500) return alert("Недостаточно денег!");
  game.money-=500;
  game.gdp+=10;
  alert("Инвестиции успешно сделаны!");
  render();
}

function buyArmy() {
  if(game.money<200) return alert("Недостаточно денег!");
  game.money-=200;
  game.army+=1000;
  render();
}

function upgradeArmy() {
  if(game.money<500) return alert("Недостаточно денег!");
  game.money-=500;
  game.country.military=Math.min(100,game.country.military+5);
  render();
}

function improveRelations() {
  const name=document.getElementById("diplomacyCountry").value;
  game.relations[name]=(game.relations[name]||0)+10;
  game.money-=100;
  if(game.money<0) game.money=0;
  alert(`Отношения с ${name} улучшены!`);
  render();
}

function trade() {
  if(game.money<300) return alert("Нужно 300 млн $");
  game.money-=300;
  game.tradeLinks++;
  game.gdp+=5;
  alert("Торговое соглашение заключено!");
  render();
}

function startProject(i) {
  const p=projects[i];
  if(game.money<p.cost) return alert("Недостаточно средств!");
  if(game.projects.some(x=>x.name===p.name)||game.completed.includes(p.name))
    return alert("Этот проект уже запущен или завершён!");

  game.money-=p.cost;
  game.projects.push({...p,left:p.months});
  render();
}

function nextMonth() {
  game.month++;
  if(game.month>12) {
    game.month=1;
    game.year++;
  }

  const income=game.gdp*game.tax/100*10;
  const armyCost=game.army*0.01;
  game.money+=income-armyCost-100;

  game.gdp+=game.tradeLinks*0.5;
  game.research+=1;

  if(Math.random()<0.2) {
    const events=[
      "📈 Экономика выросла благодаря инвестициям!",
      "🌧️ Неурожай повлиял на экономику.",
      "🤝 Международное сотрудничество укрепилось.",
      "⚡ Энергетический кризис увеличил расходы.",
      "🎓 Образование стало доступнее."
    ];
    alert(events[Math.floor(Math.random()*events.length)]);
  }

  game.projects.forEach(p=>p.left--);

  const finished=game.projects.filter(p=>p.left<=0);
  finished.forEach(p=>{
    if(p.effect==="gdp") game.gdp+=p.amount;
    if(p.effect==="stability") game.stability=Math.min(100,game.stability+p.amount);
    if(p.effect==="research") game.research+=p.amount;
    if(p.effect==="trade") game.tradeLinks+=p.amount;
    game.completed.push(p.name);
    alert(`🏗️ Проект завершён: ${p.name}`);
  });

  game.projects=game.projects.filter(p=>p.left>0);

  if(game.stability<30) alert("⚠️ В стране нестабильная ситуация!");
  if(game.money<0) {
    game.money=0;
    game.stability=Math.max(0,game.stability-5);
  }

  render();
  saveGame();
}

function saveGame() {
  localStorage.setItem("countrySimulatorV2",JSON.stringify(game));
}

function loadGame() {
  const saved=localStorage.getItem("countrySimulatorV2");
  if(saved) {
    try {
      game={...game,...JSON.parse(saved)};
      const selected=countries.find(c=>c.name===game.country.name);
      if(selected) game.country=selected;
    } catch(e) {
      console.error("Ошибка загрузки сохранения",e);
    }
  }
}

function resetGame() {
  if(!confirm("Начать новую игру?")) return;
  localStorage.removeItem("countrySimulatorV2");
  location.reload();
}

loadGame();
render();
