---
icon: pen-to-square
date: 2025-04-20
category:
  - Cherry
tag:
  - red
  - small
  - round
---
# SQL写法

## 日期函数

### 查询2020年8月之前创建的课程：
```
SELECT
name,Date( created_at) as created_date
FROM
courses
where 
created_at <'2020-08-01'
```

### 统计2020年1月到5月的课程
```
SELECT
COUNT(*) as count
FROM
courses
WHERE
created_at >= '2020-01-01' AND created_at < '2020-06-01'
```

### 查询所有课程表的课程名和创建时间的秒数
```
SELECT
name,
extract(second from created_at) as created_time_seconds
FROM
courses
```
### 查询每个部门的平均薪水
```
SELECT
department,
AVG(salary) as avg_salary
FROM
employees
GROUP BY
department
order by
avg_salary DESC
```
### 统计不同教师id的数量
```
SELECT
count(DISTINCT teacher_id) as teacher_count
FROM
courses
```
### 查询来自中国的教师名称以及所教课程名称
```
SELECT
c.name as course_name,t.name as teacher_name
FROM
teachers t
left join
courses c
on c.teacher_id = t.id
WHERE
t.country='CN'
```

### 查询教师id不为1或3的课程
```
SELECT
name
FROM
courses
WHERE
teacher_id NOT IN (1,3)
`````
### 查询为腾讯邮箱且国籍为中国的老师
```
SELECT
*
FROM
teachers
where 
email like '%@qq.com'
and
country ='CN'
```

### 插入xiexun的信息
```
BEGIN;

-- 插入 Xie Xun 的信息 --
-- Write your SQL Query here --
insert into teachers
(name,age,country)
values('Xie Xun',49,'CN');

COMMIT;
```

### 查询制定教师授课的课程信息
并将结果集按教师 id 升序排列，如果教师 id 相同，则按照课程创建时间降序排列。
```
SELECT
name, teacher_id ,created_at
FROM
courses
WHERE
teacher_id in (1,2,3)
order by teacher_id asc,created_at desc
```

### 找到挂科最多的同学 student_id
```
 select student_id
 from exams
 where is_pass = 0
 group by student_id
 order by count(student_id) desc
 limit 1;
```

### 分别查询出课程表的课程创建时间中的日期与时间
```
SELECT
Date(created_at) as created_date, Time(created_at) as created_time
FROM
courses
```

### 查询课程创建日期按 ‘年-月-日 时:分:秒’ 显示
```
SELECT
date_format(created_at,'%Y-%m-%d %H:%i:%s')  as DATE_FORMAT
FROM
courses;
```

### 判断教师是否拥有邮箱
isnull 判断是否为空
ifnull 两个参数，为空返回第二个
coalesce 多个参数，第一个不为空返回第一个，否则返回最后一个
```
SELECT
name,email,
isnull(email) as isnull_email,
ifnull(email,0) as ifnull_email,
coalesce(email,0) as coalesce_email
FROM
teachers
```

### 查询20岁以上教师的平均年龄 保留四位小数
```
SELECT
round(avg(age),0) as avg_teacher_age
FROM
teachers
WHERE
age >20
```

### 修改教师Eastern Heretic创建的课程信息
```
UPDATE
courses 
set
name = 'PHP', student_count = 300
where
teacher_id =(
    select id 
    from 
    teachers t
    where
    t.name = 'Eastern Heretic'
);
```

###  被同一个人至少使用过三次的共享单车
``` 
 SELECT
bike_id,user_id
FROM
shared_bicycles
group by bike_id,user_id
having count(bike_id) >=3
 
 ```

### 硬币翻面
```
update
coins
set
side = if(side='p','n','p')
```

### 超过3名球员所得的分数
```
select score
from scores
group by score
having count(distinct player)>=3
```
### 查询不同年龄教师的人数
```
SELECT
age,count(age) as count
FROM
teachers
GROUP BY age
order by age desc
```

### 增长的疫情感染人数
查找比前一天日期相比更高的所有日期的id
```
SELECT
t1.id 
FROM
new_cases t1
inner join
new_cases t2
on t1.date= date_add(t2.date,interval 1 day)
WHERE 
t1.increased_count> t2.increased_count

```

``` 
select n2.id
from new_cases as n1
join new_cases as n2
where DATEDIFF(n2.date, n1.date) = 1 
and n2.increased_count > n1.increased_count
```


### 找出从不充值的玩家
```
SELECT
player
FROM
users u
LEFT JOIN
recharges r
ON u.id = r.user_id
WHERE
u.id not in (SELECT user_id FROM recharges)
```

### 网课上课情况分析
```
SELECT
student_id,min(date) as earliest_course_date
from
online_class_situations
where
course_number>0
group by student_id
```

### 查询教师表 teachers 中除了年龄 age 在 20 岁以上 (不包括 20 岁) 的中国 (CN) 教师以外所有教师信息
```
SELECT
*
FROM
teachers
WHERE
id not in
(SELECT id FROM
teachers WHERE
age>20 and country='CN')
```
###  查询不同国家教师的人数

```
select
country,count(country) as teacher_count
from
teachers
group by country
order by teahcer_count,country
```

### 查询字母D 到 O 开的头的课程
正则取区间
```
select
name
from
courses
where
name REGEXP '^[D-O]'
```

### 所有学生都选修的课程
```
SELECT
course_id
FROM
courses
group by course_id
having count(distinct student_id)=(SELECT count(distinct student_id) FROM courses) （这句是核心，判断当前去重过得学生数是否等于总学生数）
order by course_id
```

### 存储过程
创建一个存储过程，实现按教师 id 返回教师所教授的课程数。
```
create PROCEDURE get_Total_By_teacher_id(IN Teacher INT,OUT total INT)
BEGIN
    select count(1) INTO total FROM courses WHERE teacher_id = Teacher;
END;

CALL get_Total_By_teacher_id(3,@total);

select @total;
```

#### 删除重复的姓名
如果直接select第二个括号的内容会报错，需要在外面在嵌套一个select并为内层结果命名
```
delete from
contacts
where id not in 
(
select * from (
 select min(id) as id from contacts group by name
) as t
)
```

### 统计每个老师教授课程的数量
```
SELECT
t.name as teacher_name,COUNT(c.teacher_id) as course_count
FROM
courses c
right join
teachers t
on c.teacher_id = t.id
GROUP BY t.id
order by course_count desc,teacher_name asc
```

### 查询年龄不大于20岁的教师所教的课程名字
```
SELECT
c.name as course_name
FROM
courses c
INNER JOIN
teachers t
ON c.teacher_id = t.id
WHERE
t.age <= 20 and age is not null


select name from courses where teacher_id in (select id from teachers where age <=20); 
```

### 查询 'U' 字开头且学生总数在 2000 到 5000 之间的教师国籍和该国籍教师的学生总数

```
SELECT
t.country,sum(c.student_count) student_count
FROM
courses c 
right join 
teachers t 
on c.teacher_id = t.id
where t.country like 'U%'
group by t.country
having student_count between 2000 and 5000
order by student_count desc,country asc
```

### 查询每位同学第一次登录平台听课的设备ID
```
SELECT
student_id,device_id
FROM`
online_class_situations` s1
WHERE   
s1.date = (SELECT MIN(date) FROM online_class_situations s2 WHERE s1.student_id = s2.student_id and s2.course_number > 0)
```

### 连续的空箱子
```
select id from boxes where id in (
    select b1.id from boxes b1,boxes b2
    where (b1.is_empty = 1 and b2.is_empty=1 and ( 
         b1.id + 1= b2.id or b2.id +1 = b1.id
      )
    ) 
) order by id
```

### 查询没有给阿里巴巴投简历的学生
```
SELECT
s.name as student_name
from students 
where id not in (
select student_id from recording where company_id  = (select id from companies where name = 'Alibaba')
)
```

### 找只出现过一次最高的身高
在只出现过一次的身高中，找出最高的身高，如果找不到，请返回 null
```
SELECT
ifnull((SELECT
height
FROM
student_heights
group by height
having count(height)=1
order by height desc 
limit 1),null) as height
```

### 将教师表中所有的数据复制到另一张表中
```
CREATE TABLE teacher_copy AS SELECT * FROM teachers;
```

### 修改教师Western Venom创建的课程名称
``` 
UPDATE
courses c
set c.name ='Java'
where
c.teacher_id in(
    select id from teachers t where name = 'Western Venom' and c.teacher_id = t.id
)
```
### 查询上课学生人数均超过 Western Venom 老师所教课程的课程信息预
all 关键字： all 关键字用于比较一个值与子查询返回的所有值。在这个例子中，student_count > all(...) 确保了只有那些学生人数大于 Western Venom 所教授的所有课程学生人数的课程才被选中。
```
 SELECT * from courses where student_count >
  all(SELECT student_count from courses where teacher_id =(SELECT id from teachers where name='Western Venom'))
```

### 查询学生上课人数超过 'Eastern Heretic' 的任意一门授课人数的课程信息
```
SELECT
*
FROM
courses
WHERE
teacher_id !=(SELECT id from teachers where name ='Eastern Heretic') and
student_count > ( SELECT min(student_count) from courses where teacher_id = (SELECT id from teachers where name = 'Eastern Heretic'))
```

### 查询不同国家最大年龄教师
```
SELECT
name ,age, country
FROM
teachers
where  
(country,age) in (SELECT country,max(age) from teachers group by country)
```

### 2066 · 查询课程学生数超过最年长教师所有课程学生数的课程信息预发布
``` 
select * from courses where student_count >
 (select max(student_count) from courses where teacher_id in
  (select id from teachers where age = (select max(age) from teachers)))
```

### 查询每个教师授课学生人数最高的课程名称和上课人数
``` 
 SELECT
name,student_count
FROM
courses
where 
(teacher_id,student_count) in (
    SELECT teacher_id,max(student_count) from courses
    group by teacher_id
)
 ```

###  根据国家平均年龄查询教师信息
把平均年龄大于总平均年龄的国家，把这个国家的所有教师信息查出来
``` 
SELECT
*
FROM
teachers 
where country in
(SELECT country FROM teachers
group by country 
having avg(age) > (SELECT avg(age) FROM teachers))
```

### 统计每个老师教授课程的学生总数
如果没有学生参加课程，则学生总数为0
```
SELECT
t.name as teacher_name, sum(CASE WHEN c.student_count IS NULL THEN 0 ELSE c.student_count END) as student_count
FROM
teachers t 
left join 
courses c 
on c.teacher_id= t.id
group by t.name
```

### 查询课程创建时间晚于指定教师任意一门课程创建时间的课程名称
左边所有非指定教师课程的创建时间都比右边所有指定教师课程的创建时间晚
```
SELECT
name
FROM
courses
WHERE
teacher_id not in(select id from teachers where name = 'Southern Emperor')
and
created_at>
(
SELECT min(created_at) from courses where teacher_id = (SELECT min(id) from teachers where name = 'Southern Emperor')
)
```

### 存储过程参数
``` 
create PROCEDURE getTeacherNumByCountry (IN teacherCountry VARCHAR(20),OUT total INT)
BEGIN
    SELECT count(1) into total from teachers 
    WHERE country = teacherCountry;
END    ;
call getTeacherNumByCountry('CN',@total);
SELECT @total;
```

### 数据新增备份触发器
``` 
create trigger backup_teachers before insert on teachers
for each row
begin

```

### 招聘信息统计表的更新数据处理
请编写 SQL 语句，实现简历投递数据表更新数据时的以下处理：

若更新数据中的 student_id 在 students 表中不存在或company_id 在 companies 表中不存在时，不允许更新该条数据。
当 student_id 不存在时，则不更新该值
当 company_id 不存在时，则不更新该值
``` 
create trigger update_recruits before update on recruits
for each row
begin
    if not exists(select 1 from students where id = new.student_id) or not exists(select 1 from companies where id = new.company_id) then
        signal sqlstate '45000' set message_text = 'Invalid student_id or company_id';
    end if;
    if not exists(select 1 from students where id = new.student_id) then
        set new.student_id = old.student_id;
    end if;
    if not exists(select 1 from companies where id = new.company_id) then
        set new.company_id = old.company_id;
    end if;
end;
```