# 参数列表 state(on / off) domain(ex: 127.0.0.1) port(ex: 8080)
# https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/networksetup.8.html
NWS='Wi-Fi'
echo test
if [ $1 == 'on' ];then
  # 如果设置了主机及端口，设置代理主机及端口号
  if [[ $2 != '' && $3 != '' ]];then
    sudo networksetup -setwebproxy $NWS $2 $3
    sudo networksetup -setsecurewebproxy $NWS $2 $3
  fi
  # 将自动代理配置.pac地址替换为空，当此项为on时且地址不为空，代理无效，暂时先不管吧
  # sudo networksetup -setautoproxyurl $NWS ''
  sudo networksetup -setwebproxystate $NWS on
  sudo networksetup -setsecurewebproxystate $NWS on
else
  sudo networksetup -setwebproxystate $NWS off
  sudo networksetup -setsecurewebproxystate $NWS off
fi