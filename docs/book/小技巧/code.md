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

# 数组去重
## 1.用set去重  然后array.sort()排序
```java
public static int[] removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
        return nums;
    }
    Set<Integer> set = new HashSet<>();
    int[] result = new int[nums.length];
    int index = 0;
    for (int i = 0; i < nums.length; i++) {
        if (!set.contains(nums[i])) {
            set.add(nums[i]);
            result[index++] = nums[i];
        }
    }
    return Arrays.copyOf(result, index);
}
```

## 2.list去重  然后array.sort()排序
```java
public static int[] removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
        return nums;
    }
    List<Integer> list = new ArrayList<>();
    for (int i = 0; i < nums.length; i++) {
        if (!list.contains(nums[i])) {
            list.add(nums[i]);
        }
    }
    int[] result = new int[list.size()];
    for (int i = 0; i < list.size(); i++) {
        result[i] = list.get(i);
    }
    return result;
}
```

## 3.stream去重排序
```java
public static int[] removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
        return nums;
    }
    return Arrays.stream(nums).distinct().sorted().toArray(int[]::new);
}
```

### 复制指定元素到另个数组
```java
public static int[] copyElements(int[] nums, int[] indexes) {
    if (nums == null || nums.length == 0 || indexes == null || indexes.length == 0) {
        return new int[0];
    }
    int[] result = new int[indexes.length];
    for (int i = 0; i < indexes.length; i++) {
        result[i] = nums[indexes[i]];
    }
    return result;
}
```