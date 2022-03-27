export function moneyMask(amount) {
  if (amount == undefined || amount == null) {
    return '0 ₫';
  } else {
    return formatText(amount, ' ₫');
  }
}

export function moneyMaskInput(amount) {
  while (/(\d+)(\d{3})/.test(amount.toString())) {
    amount = amount.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
  }
  return amount;
}

export function formatText(amount, suffix) {
  while (/(\d+)(\d{3})/.test(amount.toString())) {
    amount = amount.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
  }
  return amount + suffix;
}
