zhaowendao
==========

ZhaoWenDao is a detailed introduction of every industry

How to run it

Install node.js and mongoDB

MAC:

1 Lanuch terminal ,input :open -e ~/.bash_profile
2 Append text:export MONGODB_PATH=/Users/xxxx/Desktop/mac_tool/mongodb-osx-x86_64-2.6.6/bin
export PATH=$MONGODB_PATH:$PATH
3 Restart terminal ,input :cd "current path"
4 input :mongod -dbpath "current path"
5 input :supervisor app.js