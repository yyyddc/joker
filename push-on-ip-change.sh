#!/bin/bash
# 清空 node.log
echo '' > job.log
# 开启监听
node push-on-ip-change.js >> job.log 2>&1 &