'use strict'

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
}