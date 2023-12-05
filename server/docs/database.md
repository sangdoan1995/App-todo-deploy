# Data import
1. get file from https://vn.investing.com/equities/hoa-phat-group-jsc-historical-data
2. run this command to import the prices history into table `prices`, db `node-mongo-react`
```
mongoimport --type="csv" --fields="date,last_price,opening_price,highest_price,lowest_price,volume,change_percent" --db="node-mongo-react" --collection="prices" Dữ\ liệu\ Lịch\ sử\ HPG.csv
```
