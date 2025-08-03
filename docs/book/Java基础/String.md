---
icon: pen-to-square
date: 2022-01-01
category:
  - Java基础
tag:
  - red
  - big
  - round
---

String 类使用 final 修饰，是所谓的不可变类，无法被继承。


## 字符串拼接

1. 使用 + 运算符进行字符串拼接。
   - 注意：字符串拼接的效率低下，应尽量避免使用。
   - 建议：使用 StringBuilder 进行字符串拼接。
2. 使用 StringBuilder 进行字符串拼接。
```
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append("World");
String str = sb.toString();
```

## 字符串比较
1. 使用 == 运算符进行字符串比较。
   - 注意：== 运算符比较的是内存地址，比较两个字符串是否指向同一个内存地址，因此比较的结果可能不准确。
2. 使用 equals() 方法进行字符串比较。
```
String str1 = "Hello";
String str2 = "Hello";
System.out.println(str1 == str2); // false
System.out.println(str1.equals(str2)); // true
```
## 字符串截取
1. 使用 substring() 方法进行字符串截取。
```
String str = "Hello World";
String subStr = str.substring(6);
System.out.println(subStr); // "World"
```
2. 使用 charAt() 方法进行字符串截取。
```
String str = "Hello World";
char c = str.charAt(6);
System.out.println(c); // "W"
```
## 字符串替换
1. 使用 replace() 方法进行字符串替换。
```
String str = "Hello World";
String newStr = str.replace("World", "Java");
System.out.println(newStr); // "Hello Java"
```
2. 使用 StringBuilder 进行字符串替换。
```
StringBuilder sb = new StringBuilder();
sb.append("Hello World");
sb.replace(6, 11, "Java");
String newStr = sb.toString();
System.out.println(newStr); // "Hello Java"
```
## 字符串大小写转换
1. 使用 toUpperCase() 方法进行字符串全部大写转换。
```
String str = "Hello World";
String upperStr = str.toUpperCase();
System.out.println(upperStr); // "HELLO WORLD"
```
2. 使用 toLowerCase() 方法进行字符串全部小写转换。
```
String str = "HELLO WORLD";
String lowerStr = str.toLowerCase();
System.out.println(lowerStr); // "hello world"
```
3. 使用 StringBuilder 进行字符串大小写转换。
```
StringBuilder sb = new StringBuilder();
sb.append("Hello World");
sb.setCharAt(0, 'h');
sb.setCharAt(1, 'e');
sb.setCharAt(2, 'l');
sb.setCharAt(3, 'l');
sb.setCharAt(4, 'o');
sb.setCharAt(5, 'W');
sb.setCharAt(6, 'o');
sb.setCharAt(7, 'r');
sb.setCharAt(8, 'l');
sb.setCharAt(9, 'd');
String newStr = sb.toString();
System.out.println(newStr); // "hello world"
```
## 字符串查找
1. 使用 indexOf() 方法进行字符串查找。
```
String str = "Hello World";
int index = str.indexOf("World");
System.out.println(index); // 6
```
2. 使用 lastIndexOf() 方法进行字符串查找。
```
String str = "Hello World";
int index = str.lastIndexOf("l");
System.out.println(index); // 9
```
3. 使用 contains() 方法进行字符串查找。
```
String str = "Hello World";
boolean contains = str.contains("l");
System.out.println(contains); // true
```
## 字符串长度
1. 使用 length() 方法获取字符串长度。
```
String str = "Hello World";
int length = str.length();
System.out.println(length); // 11
```
## 字符串拆分
1. 使用 split() 方法进行字符串拆分。
```
String str = "Hello,World";
String[] arr = str.split(",");
System.out.println(Arrays.toString(arr)); // [Hello, World]
```

