# Data import
1. get file from https://vn.investing.com/equities/hoa-phat-group-jsc-historical-data
2. run this command to import the prices history into table `prices`, db `node-mongo-react`
```
mongoimport --type="csv" --fields="Ngày,Lần cuối,Mở,Cao,Thấp,KL,% Thay Đổi" --db="node-mongo-react" --collection="prices" Dữ\ liệu\ Lịch\ sử\ HPG.csv
```
