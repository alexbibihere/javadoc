---
icon: pen-to-square
date: 2024-11-07
category:
  - Banana
tag:
  - yellow
  - curly
  - long
---

# 工作常用方法

## Java8 stream流

// 根据stream流分组 统计 排序 求和

````
List<IastLoopholeResultDetail> loopholeResultDetailList = new ArrayList<IastLoopholeResultDetail>();
            vulnerabilityList.forEach(v -> {
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
我们首先创建一个File对象，使用MultipartFile的getOriginalFilename方法获取文件名，并作为参数传递给File的构造函数。然后，我们使用FileUtils.writeByteArrayToFile方法将MultipartFile的内容写入到File对象中。最后，我们返回这个File对象。



## 导入导出Excel



## 正则表达式

````
String regex = "";
Pattern pattern =Pattern.compile(regex);
Matcher matcher =pattern.matcher(regex);
if(matcher.find()){
//打印匹配到的字符
}
````

