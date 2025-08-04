---
icon: pen-to-square
date: 2024-11-07
title: 工作常用方法
---

# 工作常用方法

## Java8 stream流

根据stream流分组 统计 排序 求和 过滤 去重

List<IastLoopholeResultDetail> loopholeResultDetailList = new ArrayList<IastLoopholeResultDetail>();
### 分组
````
       loopholeResultDetailList.stream().collect(Collectors.groupingBy(IastLoopholeResultDetail::getLanguage));
````            
### 统计
````
Map<String, Long> countMap = loopholeResultDetailList.stream().collect(Collectors.groupingBy(IastLoopholeResultDetail::getLanguage, Collectors.counting()));
````
### 排序
````
List<IastLoopholeResultDetail> sortedList = loopholeResultDetailList.stream().sorted(Comparator.comparing(IastLoopholeResultDetail::getLanguage)).collect(Collectors.toList());
````
### 求和
````
long count = loopholeResultDetailList.stream().count();
````
### 过滤
````
List<IastLoopholeResultDetail> filteredList = loopholeResultDetailList.stream().filter(item -> item.getLanguage().equals("Java")).collect(Collectors.toList());
````
### 去重
````
List<IastLoopholeResultDetail> distinctList = loopholeResultDetailList.stream().distinct().collect(Collectors.toList());
````

## 文件io
````
 public static void readFile(String filePath) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(filePath));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (FileNotFoundException e) {
            System.out.println("文件未找到，请检查文件路径。");
        } catch (IOException e) {
            System.out.println("发生错误：" + e.getMessage());
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                System.out.println("关闭文件时发生错误：" + e.getMessage());
            }
        }
    }
````



## 上传文件
````
private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
 File file = new File(multipartFile.getOriginalFilename());
        FileUtils.writeByteArrayToFile(file, multipartFile.getBytes());
        return file;
````
我们首先创建一个File对象，使用MultipartFile的getOriginalFilename方法获取文件名，
并作为参数传递给File的构造函数。然后，我们使用FileUtils.writeByteArrayToFile方法将MultipartFile的内容写入到File对象中。最后，我们返回这个File对象。



## 导入导出Excel

````
public static void exportExcel(List<Object[]> dataList, String sheetName, String fileName) {
        try {
            // 创建工作簿
            HSSFWorkbook workbook = new HSSFWorkbook();
            // 创建工作表
            HSSFSheet sheet = workbook.createSheet(sheetName);
            // 创建表头样式
            HSSFCellStyle headStyle = workbook.createCellStyle();
            // 设置表头样式
            headStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            headStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            // 创建表头
            HSSFRow headRow = sheet.createRow(0);
            // 设置表头内容
            headRow.createCell(0).setCellValue("姓名");
            headRow.createCell(1).setCellValue("年龄");
            headRow.createCell(2).setCellValue("性别");
            // 设置表头样式
            for (int i = 0; i < 3; i++) {
                HSSFCell cell = headRow.getCell(i);
                cell.setCellStyle(headStyle);
            }
            // 创建数据样式
            HSSFCellStyle dataStyle = workbook.createCellStyle();
            // 设置数据样式
            dataStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            dataStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            // 写入数据
            for (int i = 0; i < dataList.size(); i++) {
                Object[] data = dataList.get(i);
                HSSFRow dataRow = sheet.createRow(i + 1);
                dataRow.createCell(0).setCellValue((String) data[0]);
                dataRow.createCell(1).setCellValue((Integer) data[1]);
                dataRow.createCell(2).setCellValue((String) data[2]);
                // 设置数据样式
                for (int j = 0; j < 3; j++) {
                    HSSFCell cell = dataRow.getCell(j);
                    cell.setCellStyle(dataStyle);
                }
                }
            // 保存文件
            FileOutputStream outputStream = new FileOutputStream(fileName);
            workbook.write(outputStream);
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
````
我们首先创建一个HSSFWorkbook对象，创建一个HSSFSheet对象，创建一个表头样式和数据样式。然后，我们创建表头和数据，并设置样式。最后，我们写入数据，保存文件。



## 正则表达式

\\d 匹配任意数字，
\\w 匹配任意字母或数字，
\\s 匹配任意空白字符，
. 匹配任意字符，* 匹配0个或多个，+ 匹配1个或多个，? 匹配0个或1个，{n} 匹配n个，{n,} 匹配n个或更多，{n,m} 匹配n-m个。

````
String regex = "";
Pattern pattern =Pattern.compile(regex);
Matcher matcher =pattern.matcher(regex);
if(matcher.find()){
//打印匹配到的字符
}
````

