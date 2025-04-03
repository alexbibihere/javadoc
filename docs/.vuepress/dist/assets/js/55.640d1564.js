(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{461:function(t,e,i){"use strict";i.r(e);var r=i(2),a=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"stream"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#stream"}},[t._v("#")]),t._v(" stream")]),t._v(" "),e("p",[t._v("Java 8 API添加了一个新的抽象称为流Stream，可以让你以一种声明的方式处理数据。")]),t._v(" "),e("p",[t._v("Stream 使用一种类似用 SQL 语句从数据库查询数据的直观方式来提供一种对 Java 集合运算和表达的高阶抽象。")]),t._v(" "),e("h2",{attrs:{id:"_0-数据统计"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_0-数据统计"}},[t._v("#")]),t._v(" 0.数据统计")]),t._v(" "),e("p",[t._v('List<Map<String, Object>> valueList = new ArrayList<>();\nMap max = valueList.stream().max(Comparator.comparing(s -> (Double)s.get("value"))).get();\nMap min = valueList.stream().min(Comparator.comparing(s -> (Double)s.get("value"))).get();\nDouble avg = valueList.stream().mapToDouble(s -> (Double)s.get("value")).average().orElse(0D);\nDouble sum = valueList.stream().mapToDouble(s -> (Double)s.get("value")).sum();')]),t._v(" "),e("h2",{attrs:{id:"_1-过滤元素-filter"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-过滤元素-filter"}},[t._v("#")]),t._v(" 1.过滤元素 - filter()")]),t._v(" "),e("p",[t._v("filter()方法根据给定的条件筛选出符合条件的元素，返回一个新的流。")]),t._v(" "),e("p",[t._v("示例：")]),t._v(" "),e("p",[t._v("List"),e("Dictionaries",[t._v(' dictionaries = list.stream().filter( s -> s.getType().equals("0")).collect(Collectors.toList());')])],1),t._v(" "),e("h2",{attrs:{id:"_2-去重元素-distinct"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-去重元素-distinct"}},[t._v("#")]),t._v(" 2.去重元素 - distinct()")]),t._v(" "),e("p",[t._v("distinct()方法对流中的元素进行去重")]),t._v(" "),e("p",[t._v("示例：")]),t._v(" "),e("p",[t._v("// 去重\nList"),e("Dictionaries",[t._v(" dictionaries = list.stream().distinct().collect(Collectors.toList());")])],1),t._v(" "),e("p",[t._v("// 根据名称去重\nList"),e("Dictionaries",[t._v(" dictionaries = list.stream().collect(\nCollectors.collectingAndThen(\nCollectors.toCollection(() -> new TreeSet<>(Comparator.comparing(Work::getRepairDepart))), ArrayList::new)\n);")])],1),t._v(" "),e("h2",{attrs:{id:"_3-排序元素-sorted"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-排序元素-sorted"}},[t._v("#")]),t._v(" 3.排序元素 - sorted()")]),t._v(" "),e("p",[t._v("sorted()方法对流中的元素进行排序，默认是按照自然顺序排序，也可以传入自定义的比较器；")]),t._v(" "),e("p",[t._v("示例：")]),t._v(" "),e("p",[t._v("// 升序排序\nList"),e("Dictionaries",[t._v(" dictionaries = list.stream().sorted().collect(Collectors.toList());")])],1),t._v(" "),e("p",[t._v("// 降序排序\nList"),e("Dictionaries",[t._v(" dictionaries = list.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());")])],1),t._v(" "),e("p",[t._v("// 定制升序排序\nList"),e("Dictionaries",[t._v(" dictionaries = list.stream().sorted(Comparator.comparing(Student::getAge)).collect(Collectors.toList());")])],1),t._v(" "),e("p",[t._v("// 比对排序\nList"),e("Dictionaries",[t._v(" dictionaries = list.stream().sorted(Comparator.comparing(Student::getAge).thenComparing(Student::getName)).collect(Collectors.toList());")])],1),t._v(" "),e("p",[t._v("// 定制降序排序\nList"),e("Dictionaries",[t._v(" dictionaries = list.stream().sorted(Comparator.comparing(Student::getAge).reverseOrder()).collect(Collectors.toList());")])],1),t._v(" "),e("h2",{attrs:{id:"_4-收集结果-collect"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-收集结果-collect"}},[t._v("#")]),t._v(" 4.收集结果-collect()")]),t._v(" "),e("p",[t._v("collect()方法将流中的元素收集到一个集合中。")]),t._v(" "),e("p",[t._v("示例：")]),t._v(" "),e("p",[t._v("（1）按时间统计：")]),t._v(" "),e("p",[t._v('// 按小时统计\nMap<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM-dd HH").format(item.getTime()), Collectors.summingDouble(Sensorrealtime::getValue)));')]),t._v(" "),e("p",[t._v('// 按天统计\nMap<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM-dd").format(item.getTime()), Collectors.summingDouble(Sensorrealtime::getValue)));')]),t._v(" "),e("p",[t._v("// 按周统计\nMap<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> getWeekNumber(item.getTelTime()), Collectors.summingDouble(Sensorrealtime::getValue)));")]),t._v(" "),e("p",[t._v('// 按月统计\nMap<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM").format(item.getTime()), Collectors.summingDouble(Sensorrealtime::getValue)));')]),t._v(" "),e("p",[t._v('// 按年统计\nMap<String, Double> stationHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy").format(item.getTime()), Collectors.summingDouble(Sensorrealtime::getValue)));')]),t._v(" "),e("p",[t._v("// 获取周数\npublic String getWeekNumber(Date date){\nLocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();\nint weekNumber = localDate.get(WeekFields.ISO.weekOfMonth());\nreturn Integer.toString(weekNumber);\n}\n（2）按时间分组：")]),t._v(" "),e("p",[t._v("// 按小时分组\nMap<String, List"),e("CallRecords",[t._v('> listHH = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM-dd HH").format(item.getTelTime())));')])],1),t._v(" "),e("p",[t._v("// 按天分组\nMap<String, List"),e("CallRecords",[t._v('> listDD = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM-dd").format(item.getTelTime())));')])],1),t._v(" "),e("p",[t._v("// 按周分组\nMap<String, List"),e("CallRecords",[t._v("> listWW = list.stream().collect(Collectors.groupingBy(item -> getWeekNumber(item.getTelTime())));")])],1),t._v(" "),e("p",[t._v("// 按月分组\nMap<String, List"),e("CallRecords",[t._v('> listWW = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy-MM").format(item.getTelTime())));')])],1),t._v(" "),e("p",[t._v("// 按年分组\nMap<String, List"),e("CallRecords",[t._v('> listWW = list.stream().collect(Collectors.groupingBy(item -> new SimpleDateFormat("yyyy").format(item.getTelTime())));')])],1),t._v(" "),e("h1",{attrs:{id:"optional"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#optional"}},[t._v("#")]),t._v(" Optional")]),t._v(" "),e("h2",{attrs:{id:"用法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#用法"}},[t._v("#")]),t._v(" 用法")]),t._v(" "),e("ul",[e("li",[t._v("Optional.ofNullable(xx).orElse();")])])])}),[],!1,null,null,null);e.default=a.exports}}]);