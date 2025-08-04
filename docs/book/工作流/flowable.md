---
icon: pen-to-square
date: 2024-8-3
category:
  - note
tag:
  - red
  - small
  - round
---


# Flowable 工作流
## BPMN基本概念：
● 流程定义(Process Definition)：业务流程的静态模型
● 流程实例(Process Instance)：流程定义的运行时执行实例
● 任务(Task)：流程中的工作单元，通常需要人工处理
● 网关(Gateway)：控制流程执行路径的节点
● 流程变量(Process Variable)：存储和传递流程数据的容器
## 表结构

● ACT_RE_*：'RE'表示repository，这些表包含流程定义和流程静态资源
● ACT_RU_*：'RU'表示runtime，这些表存储流程运行时的数据
● ACT_HI_*：'HI'表示history，这些表存储历史数据
● ACT_ID_*：'ID'表示identity，这些表存储身份信息
● ACT_GE_*：'GE'表示general，这些表存储通用数据
● ACT_APP_*：'APP'表示application，这些表存储应用级别的信息
● ACT_CMMN_*：'CMMN'表示Case Management，这些表存储案例管理相关数据
● ACT_DMN_*：'DMN'表示Decision Management，这些表存储决策管理相关数据
● FLW_*：'FLW'表示Flowable特定的扩展表

## 流程流转涉及的表
###  创建表单
● wf_form
###  创建流程模型
● wf_deploy_form
● act_re_model
● act_re_deployment
### 部署流程定义
● act_re_procdef
### 启动流程实例
● act_hi_actinst 流程实例执行历史
● act_hi_identitylink 流程的参与用户的历史信息
● act_hi_procinst 流程实例历史信息
● act_hi_taskinst 流程任务历史信息
● act_ru_execution 流程执行信息
● act_ru_identitylink 流程的参与用户信息
● act_ru_task 任务信息


## Service
service流转


### RuntimeService
● 主要用于管理运行中的流程实例
// 启动流程实例
ProcessInstance processInstance = runtimeService.createProcessInstanceBuilder()
    .processDefinitionKey("helpDeskProcess")
    .variables(variables)
    .start();

// 触发信号事件
runtimeService.signalEventReceived("signalName");

// 设置流程变量
runtimeService.setVariable(processInstanceId, "varName", value);

// 删除流程实例
runtimeService.deleteProcessInstance(processInstanceId, "reason");
TaskService
● 负责管理和操作用户任务
// 查询任务
List<Task> tasks = taskService.createTaskQuery()
    .taskAssignee("john")
    .active()
    .list();

// 完成任务
taskService.complete(taskId);

// 认领任务
taskService.claim(taskId, userId);

// 设置任务变量
taskService.setVariable(taskId, "varName", value);
RepositoryService
● 管理流程定义和部署
// 部署流程定义
Deployment deployment = repositoryService.createDeployment()
    .addClasspathResource("processes/helpdesk.bpmn20.xml")
    .deploy();

// 查询流程定义
ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
    .processDefinitionKey("helpDeskProcess")
    .latestVersion()
    .singleResult();
HistoryService
● 访问历史数据
// 查询历史流程实例
List<HistoricProcessInstance> historicProcessInstances = historyService
    .createHistoricProcessInstanceQuery()
    .finished()
    .list();

// 查询历史任务
List<HistoricTaskInstance> historicTasks = historyService
    .createHistoricTaskInstanceQuery()
    .taskAssignee("john")
    .finished()
    .list();
IdentityService
FormService
ManagementService
ProcessEngine
查询 API 的通用方法
Flowable 的查询 API 提供了丰富的链式调用方法：
// 通用的查询方法
.asc()/.desc()           // 排序
.listPage(start, size)   // 分页查询
.count()                 // 计数
.singleResult()          // 获取单个结果
.list()                  // 获取列表结果

// 时间相关查询
.before(date)            // 在指定时间之前
.after(date)             // 在指定时间之后

// 排序方法
.orderByTaskCreateTime()
.orderByProcessInstanceId()
.orderByCaseInstanceId()
PageResult