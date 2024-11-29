(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{455:function(a,t,r){"use strict";r.r(t);var s=r(2),e=Object(s.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"jvm的组成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jvm的组成"}},[a._v("#")]),a._v(" JVM的组成")]),a._v(" "),t("h2",{attrs:{id:"jvm的组成主要分为三个部分-类加载器、运行时数据区、执行引擎。"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jvm的组成主要分为三个部分-类加载器、运行时数据区、执行引擎。"}},[a._v("#")]),a._v(" JVM的组成主要分为三个部分： 类加载器、运行时数据区、执行引擎。")]),a._v(" "),t("h2",{attrs:{id:"类加载器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#类加载器"}},[a._v("#")]),a._v(" 类加载器")]),a._v(" "),t("p",[a._v("类加载器是 JVM 的重要组成部分，负责加载类文件并将类文件转换为运行时数据区的运行时数据结构。 JVM 自带的类加载器有：启动类加载器、扩展类加载器、系统类加载器。")]),a._v(" "),t("h3",{attrs:{id:"启动类加载器-bootstrap-class-loader"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#启动类加载器-bootstrap-class-loader"}},[a._v("#")]),a._v(" 启动类加载器（Bootstrap Class Loader）")]),a._v(" "),t("p",[a._v("启动类加载器是 JVM 自带的类加载器，它负责加载 Java 运行环境中的核心类库，如 java.lang.String。启动类加载器的父类为 null，它使用 C++ 编写，是虚拟机自身的一部分。")]),a._v(" "),t("h3",{attrs:{id:"扩展类加载器-extension-class-loader"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#扩展类加载器-extension-class-loader"}},[a._v("#")]),a._v(" 扩展类加载器（Extension Class Loader）")]),a._v(" "),t("p",[a._v("扩展类加载器是 JVM 自带的类加载器，它负责加载 Java 运行环境的扩展类库，如 javax.swing.JButton。扩展类加载器的父类为启动类加载器。")]),a._v(" "),t("h3",{attrs:{id:"系统类加载器-system-class-loader"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#系统类加载器-system-class-loader"}},[a._v("#")]),a._v(" 系统类加载器（System Class Loader）")]),a._v(" "),t("p",[a._v("系统类加载器是 JVM 自带的类加载器，它负责加载用户类路径（classpath）上指定的类库，如 java.util.ArrayList。系统类加载器的父类为扩展类加载器。")]),a._v(" "),t("h2",{attrs:{id:"运行时数据区"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#运行时数据区"}},[a._v("#")]),a._v(" 运行时数据区")]),a._v(" "),t("p",[a._v("运行时数据区包括方法区、堆、虚拟机栈、程序计数器。")]),a._v(" "),t("h3",{attrs:{id:"方法区-method-area"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#方法区-method-area"}},[a._v("#")]),a._v(" 方法区（Method Area）")]),a._v(" "),t("p",[a._v("方法区是 JVM 运行时数据区的一种，用于存储类信息、常量、静态变量、即时编译器编译后的代码等。方法区的大小在 JVM 启动时确定，并且在虚拟机生命周期内不会发生垃圾回收。")]),a._v(" "),t("h3",{attrs:{id:"堆-heap"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#堆-heap"}},[a._v("#")]),a._v(" 堆（Heap）")]),a._v(" "),t("p",[a._v("堆是 JVM 运行时数据区的另一种，用于存储对象实例和数组。堆的大小也是在 JVM 启动时确定，并且可以动态扩展。当堆中没有足够的内存空间进行分配时，JVM 会抛出 OutOfMemoryError 异常。")]),a._v(" "),t("h3",{attrs:{id:"虚拟机栈-vm-stack"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#虚拟机栈-vm-stack"}},[a._v("#")]),a._v(" 虚拟机栈（VM Stack）")]),a._v(" "),t("p",[a._v("虚拟机栈是 JVM 运行时数据区的第三种，用于存储方法调用信息。每个方法在执行时都会创建一个栈帧，用于存储局部变量表、操作数栈、动态链接、方法出口等信息。")]),a._v(" "),t("h3",{attrs:{id:"程序计数器-program-counter-register"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#程序计数器-program-counter-register"}},[a._v("#")]),a._v(" 程序计数器（Program Counter Register）")]),a._v(" "),t("p",[a._v("程序计数器是 JVM 运行时数据区的第四种，是一个指针，指向当前线程执行的字节码指令。当线程切换时，PC 寄存器的值也会发生变化。")]),a._v(" "),t("h2",{attrs:{id:"执行引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#执行引擎"}},[a._v("#")]),a._v(" 执行引擎")]),a._v(" "),t("p",[a._v("执行引擎是 JVM 的核心，它负责解释字节码并执行程序。JVM 实现的执行引擎有：解释器、JIT 编译器、垃圾回收器。")]),a._v(" "),t("h3",{attrs:{id:"解释器-interpreter"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解释器-interpreter"}},[a._v("#")]),a._v(" 解释器（Interpreter）")]),a._v(" "),t("p",[a._v("解释器是 JVM 的执行引擎，它逐条解释字节码，执行程序。解释器的执行速度较慢，但它占用内存少，适用于执行较小的程序。")]),a._v(" "),t("h3",{attrs:{id:"jit-编译器-just-in-time-compiler"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jit-编译器-just-in-time-compiler"}},[a._v("#")]),a._v(" JIT 编译器（Just-In-Time Compiler）")]),a._v(" "),t("p",[a._v("JIT 编译器是 JVM 的执行引擎，它将热点代码编译成机器码，并缓存起来，以便下次执行时直接使用。JIT 编译器的执行速度较快，但它占用内存多，适用于执行较大的程序。")]),a._v(" "),t("h3",{attrs:{id:"垃圾回收器-garbage-collector"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收器-garbage-collector"}},[a._v("#")]),a._v(" 垃圾回收器（Garbage Collector）")]),a._v(" "),t("p",[a._v("垃圾回收器是 JVM 的执行引擎，它负责回收不再需要的内存，以便为新对象分配内存。JVM 实现的垃圾回收器有：串行垃圾回收器、并行垃圾回收器、并发垃圾回收器。")])])}),[],!1,null,null,null);t.default=e.exports}}]);