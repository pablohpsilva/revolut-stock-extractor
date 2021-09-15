# revolut-stock-extractor

## Why would I use this for?

Well, Revolut doesn't provide an API for us and DriveWealth API is not for... peasants. Fortunately, Revolut offer us a nice web interface.
The whole point here is to be able to extract and handle your data. Afterall, that's your data anyways.

You can upload this data elsewhere into other apps if you wish.

## How to make it work?

1. Open you web revolut account;
2. Click on Stocks tabs;
3. Scroll all the way down to `Transactions` and click on `See all` option;
4. Open your devtools;
5. In this repository, copy and paster the code inside `script.js` file;
6. You will see your screen scrolling down on its own until it reaches the very beginning of all your transations;
7. Once it's done, the data will be available in your clipboard.

## How does the data looks like?

```json
[
  {
    "ticker": "XOM",
    "action": "Buy",
    "sharesBought": "1",
    "moneySpent": -55.63,
    "date": "2001-09-13T14:30:00.000Z"
  },
  {
    "ticker": "none",
    "action": "One-off",
    "sharesBought": -1,
    "moneySpent": 334.3,
    "date": "2001-09-13T11:42:00.000Z"
  },
  {
    "ticker": "XOM",
    "action": "Dividend",
    "sharesBought": -1,
    "moneySpent": 28.1,
    "date": "2001-09-13T04:36:00.000Z"
  },
  ...
]
```

## Known bugs

Since Revolut doesn't provide the year of the Puchase/Sell/Dividend, all years are extracted with `2001` year. The upside is the fact that we have the correct day and time.
