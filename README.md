# web-file-mail
## 登入虛擬主機
登入遠端連線 <br>
主機名稱為公開ip <br>
port為22 <br>
將金鑰輸入進去 <br>

# 重啟需要設定
### 開啟使用nvm
```
nvm use 8.9.4
```
### port 80 redirect 8080
```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```
---------------------------------------
### 終止forever
```
forever stopall
```
### 完整移除資料夾
```
rm -rf web-file-mail/
```
----------------------------------------

### clone github資料
```
git clone https://github.com/nowvan/web-file-mail.git
```
### npm安裝套件
```
npm install
```
### forever 啟動
```
forever start -c "npm start" ./ 
```
### 列出forever
```
forever list
```
[安裝使用nvm]<http://kejyun.github.io/node-js-learning-notes/install/install-nvm.html><br>
[安裝使用forever]<http://yijiebuyi.com/blog/1a642c7b277bc213d3250e946073f045.html>


