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
    "sharesAmount": "1",
    "moneyUsed": -55.63,
    "date": "2001-09-13T14:30:00.000Z"
  },
  {
    "ticker": "XOM",
    "action": "Sell",
    "sharesAmount": "37",
    "moneyUsed": 2150.09,
    "date": "2021-07-30T13:45:00.000Z"
  },
  {
    "ticker": "XOM",
    "action": "Dividend",
    "sharesAmount": -1,
    "moneyUsed": 28.1,
    "date": "2001-09-13T04:36:00.000Z"
  },
  {
    "ticker": "none",
    "action": "One-off",
    "sharesAmount": -1,
    "moneyUsed": 334.3,
    "date": "2001-09-13T11:42:00.000Z"
  },
  {
    "ticker": "none",
    "action": "Custody",
    "sharesAmount": -1,
    "moneyUsed": -4.14,
    "date": "2021-09-01T08:44:00.000Z"
  },
  ...
]
```

## Can I use this forever?

I highly don't encourage it. Soon the script will be smart enough to know from where to pick it from. But that's not the point.
Use this script only to collect ou data as a backup. 

**PLEASE READ THE `KNOWN BUGS` PART OF THIS DOCUMENTATION.**

## Known bugs

Since Revolut doesn't provide the year of the Puchase/Sell/Dividend, all years are extracted with `2001` year. The upside is the fact that we have the correct day and time.
