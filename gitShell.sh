# shell user ===> show current user
# shell checkout ===> checkout user
# shell push <commit> ===> push origin
if [ $1 == "user" ];then
  git config user.name
  git config user.email
fi

if [ $1 == "checkout" ];then
  function toggle () {
    if [ $1 == "hz9527" ];then
      git config user.name "huangzhong03"
      git config user.email "huangzhong03@meituan.com"
    else
      git config user.name "hz9527"
      git config user.email "981379316@qq.com"
    fi
  }
  toggle git config user.name
fi

if [ $1 == "push" ];then
  git status
  git add .
  git commit -m $2
  git pull origin master
  if [ $? == 0 ];then
    git push origin
  fi
fi