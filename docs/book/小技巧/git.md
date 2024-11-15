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

# Git开发小技巧


# Git命令
## 1. 显示当前分支
```
git branch
```

## 2. 切换分支
```
git checkout <branch-name>
```

## 3. 创建新分支
```
git branch <branch-name>
```

## 4. 删除分支
```
git branch -d <branch-name>
```

## 5. 合并分支
```
git merge <branch-name>
```

# Git配置         
## 1. 设置用户名
```
git config --global user.name "your-name"
```

## 2. 设置邮箱
```
git config --global user.email "your-email"
```

    # Git使用技巧         
    ## 1. 显示提交历史
    ```
    git log --oneline --graph --decorate --all
    ```

    ## 2. 撤销上一次提交
    ```
    git reset --soft HEAD^
    ```

    ## 3. 撤销所有未提交的修改
    ```
    git reset --hard
    ```

    ## 4. 显示当前状态
    ```
    git status
    ```

    ## 5. 显示文件修改详情
    ```
    git diff
    ```

    ## 6. 显示文件修改统计
    ```
    git diff --stat
    ```

    ## 7. 显示文件修改统计（包括新增、删除、修改）
    ```
    git diff --stat --summary
    ```

    ## 8. 显示文件修改统计（包括新增、删除、修改）
    ```
    git log --stat --summary
    ```

    ## 9. 显示文件修改历史
    ```
    git log --follow -- <file-name>
    ```

