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

# stream

Java 8 API添加了一个新的抽象称为流Stream，可以让你以一种声明的方式处理数据。

Stream 使用一种类似用 SQL 语句从数据库查询数据的直观方式来提供一种对 Java 集合运算和表达的高阶抽象。

## 0.数据统计

List<Map<String, Object>> valueList = new ArrayList<>();
Map max = valueList.stream().max(Comparator.comparing(s -> (Double)s.get("value"))).get();
Map min = valueList.stream().min(Comparator.comparing(s -> (Double)s.get("value"))).get();
Double avg = valueList.stream().mapToDouble(s -> (Double)s.get("value")).average().orElse(0D);
Double sum = valueList.stream().mapToDouble(s -> (Double)s.get("value")).sum();

## 1.过滤元素 - filter()

filter()方法根据给定的条件筛选出符合条件的元素，返回一个新的流。

示例：

List<Dictionaries> dictionaries = list.stream().filter( s -> s.getType().equals("0")).collect(Collectors.toList());

## 2.去重元素 - distinct()

distinct()方法对流中的元素进行去重

示例：

// 去重
List<Dictionaries> dictionaries = list.stream().distinct().collect(Collectors.toList());

// 根据名称去重
List<Dictionaries> dictionaries = list.stream().collect(
Collectors.collectingAndThen(
Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(Work::getRepairDepart))), ArrayList::new)
);

## 3.排序元素 - sorted()

sorted()方法对流中的元素进行排序，默认是按照自然顺序排序，也可以传入自定义的比较器；

示例：

// 升序排序
List<Dictionaries> dictionaries = list.stream().sorted().collect(Collectors.toList());

// 降序排序
List<Dictionaries> dictionaries = list.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());

// 定制升序排序
List<Dictionaries> dictionaries = list.stream().sorted(Comparator.comparing(Student::getAge)).collect(Collectors.toList());

// 定制降序排序
List<Dictionaries> dictionaries = list.stream().sorted(Comparator.comparing(Student::getAge).reverseOrder()).collect(Collectors.toList());

## 4.收集结果-collect()

collect()方法将流中的元素收集到一个集合中。

示例：

（1）按时间统计：


// 按小时统计
Map<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM-dd HH").format(item.getTime()), Collectors.summingDouble(Sensorrealtime::getValue)));

// 按天统计
Map<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM-dd").format(item.getTime()), Collectors.summingDouble(Sensorrealtime::getValue)));

// 按周统计
Map<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> getWeekNumber(item.getTelTime()), Collectors.summingDouble(Sensorrealtime::getValue)));

// 按月统计
Map<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM").format(item.getTime()), Collectors.summingDouble(Sensorrealtime::getValue)));

// 按年统计
Map<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy").format(item.getTime()), Collectors.summingDouble(Sensorrealtime::getValue)));

// 获取周数
public String getWeekNumber(Date date){
LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
int weekNumber = localDate.get(WeekFields.ISO.weekOfMonth());
return Integer.toString(weekNumber);
}
（2）按时间分组：


// 按小时分组
Map<String, List<CallRecords>> listHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM-dd HH").format(item.getTelTime())));

// 按天分组
Map<String, List<CallRecords>> listDD = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM-dd").format(item.getTelTime())));

// 按周分组
Map<String, List<CallRecords>> listWW = list.stream().collect(Collectors.groupingBy(item -> getWeekNumber(item.getTelTime())));

// 按月分组
Map<String, List<CallRecords>> listWW = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM").format(item.getTelTime())));

// 按年分组
Map<String, List<CallRecords>> listWW = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy").format(item.getTelTime())));


