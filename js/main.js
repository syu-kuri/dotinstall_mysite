'use strict'

console.clear();

{
  // ハンバーガーメニュー
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');

  open.addEventListener('click', () => {
    overlay.classList.add('active');
    open.classList.add('hide');
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('active');
    open.classList.remove('hide');
  });

  // 目次表示切り替え
  const contentsOpen = document.getElementById('contents-open');
  const contentsClose = document.getElementById('contents-close');
  const contentsUl = document.getElementById('contents-ul');

  contentsOpen.addEventListener('click', () => {
    contentsOpen.classList.remove('active');
    contentsClose.classList.add('active');
    contentsUl.classList.remove('active');
  });

  contentsClose.addEventListener('click', () => {
    contentsOpen.classList.add('active');
    contentsClose.classList.remove('active');
    contentsUl.classList.add('active');
  });

  // カレンダー表示
  const today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth(); // 5月

  function getCalenderHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (var i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  function getCalenderBody() {
    const dates = []; // date: 日付, day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (var i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  }

  function getCalenderTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (var i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function clearCalender() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderWeeks() {
    const dates = [
      ...getCalenderHead(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (var i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalender() {
    clearCalender();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalender();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 12) {
      year++;
      month = 0;
    }
    createCalender();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();
    createCalender();
  });

  createCalender();
}