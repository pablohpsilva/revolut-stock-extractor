/**
 * Helpers
 */
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}


/**
 * Core functions
 */


const extractStockTicker = (rootElement) => {
  const text = rootElement.querySelector('[data-testid="TransactionsItem-title"]').textContent;
//   return text.replace('Buy ', '').replace('Sell ', '');
  return getComputedStyle(rootElement.querySelector('div > div > span > div:first-child'))
    .backgroundImage
    .replace('url("https://storage.googleapis.com/revolut-prod-apps_stock-logo/', '')
    .replace('.svg")', '')
    .replace('-40x40@2x.png', '')
    .replace('")', '');
}

const extractStockAction = (rootElement) => {
  const text = rootElement.querySelector('[data-testid="TransactionsItem-title"]').textContent;
  if (!text.includes(' ')) return text;
  return text.split(' ')?.[0];
}

const extractSharesBought = (rootElement) => {
  // '3 shares · $37.60 · 6 Apr, 3:30 PM'
  // '8 Sep, 6:33 AM'
  const text = rootElement.querySelector('[data-testid="TransactionsItem-description"]').textContent;

  // Delta can get the correct value given date + time
  // TODO: determine the stock price based on purchase value
  if(!text.includes(' · ')) return -1;
  return text.split(' · ')?.[0]?.replace(' shares', '');
}

const extractMoneySpent = (rootElement) => {
  const value = rootElement.querySelector('span:nth-child(3)').textContent;
  return Number(value.replace('$','').replace(',',''));
}

const extractDate = (rootElement) => {
  // '3 shares · $37.60 · 6 Apr, 3:30 PM'
  // '8 Sep, 6:33 AM'
  const text = rootElement.querySelector('[data-testid="TransactionsItem-description"]').textContent;
  const date = (!text.includes(' · ')) ? text : text.split(' · ')?.[2];
  
  return new Date(date);
}

const compileEntries = () => {
  const stockEntries = Array.from(document.querySelectorAll('[data-testid="TransactionsItem-root"]'));

  const data = stockEntries.reduce((acc, curr) => {
    const ticker = extractStockTicker(curr);
      const action =  extractStockAction(curr);
      const sharesBought =  extractSharesBought(curr);
      const moneySpent =  extractMoneySpent(curr);
      const date =  extractDate(curr);

    return acc.concat({
      ticker,
      action,
      sharesBought,
      moneySpent,
      date,
    })
  }, []);
  
  const text = JSON.stringify(data);

  copyTextToClipboard(text);

  alert('Data copied to your clipboard & backup on console');
  console.log(text);
}

const scrollDownUntilItStops = (callback) => {
  let scrollHeight = -1;
  let intervalId = -1;
  intervalId = window.setInterval(() => {
    window.scrollTo(0, document.body.scrollHeight);
    
    if(document.body.scrollHeight === scrollHeight) {
      window.clearInterval(intervalId);
      callback?.();
      return
    }
    scrollHeight = document.body.scrollHeight;
  }, 2000);
}

scrollDownUntilItStops(compileEntries);
