---
icon: pen-to-square
date: 2022-01-09
category:
  - Cherry
tag:
  - red
  - small
  - round
---

# Optional 用法
 optional 可以用来判空，比如：
 ···java
 if(optional.isPresent()){
   //do something
 }else{
   //do something else
 }
Optional.ofNullable(null).orElse(defaultValue) //如果optional为null，返回defaultValue
Optional.ofNullable(student).filter(s -> s.getAge() > 18).orElseThrow(IllegalArgumentException::new) //如果optional为null，抛出IllegalArgumentException
···
